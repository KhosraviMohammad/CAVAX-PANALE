import React, { useState, useMemo } from "react";
import { Box, Typography, Chip, IconButton, CircularProgress, Link, Tooltip } from "@mui/material";
import {
  Receipt as ReceiptIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
} from "@mui/icons-material";
import {
  useGetDepositRequestsQuery,
  useApproveDepositRequestMutation,
  type DepositRequest,
} from "@/store/api/depositRequestsApi";
import { toast } from "react-toastify";
import { parseApiError } from "@/utils/apiError";
import { DataTable, type Column } from "@/components/common/DataTable";
import { RejectDepositDialog } from "./RejectDepositDialog";

const formatAmount = (val?: string | number) => {
  if (val === undefined || val === null || val === "") return "0";
  const num = typeof val === "string" ? parseFloat(val) : val;
  if (isNaN(num)) return String(val);
  return Math.abs(num).toLocaleString("fa-IR", { maximumFractionDigits: 8 });
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
};

const getStatusChipColor = (status?: string): "success" | "warning" | "error" | "default" => {
  switch (status?.toLowerCase()) {
    case "approved":
    case "completed":
    case "success":
      return "success";
    case "pending":
      return "warning";
    case "rejected":
    case "failed":
      return "error";
    default:
      return "default";
  }
};

const getStatusLabel = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "approved":
    case "completed":
    case "success":
      return "تایید شده";
    case "pending":
      return "در انتظار بررسی";
    case "rejected":
    case "failed":
      return "رد شده";
    default:
      return status || "نامشخص";
  }
};

export const DepositRequestsTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 20;

  // Action states
  const [rejectTarget, setRejectTarget] = useState<DepositRequest | null>(null);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const [approveDepositRequest] = useApproveDepositRequestMutation();

  const {
    data: response,
    isLoading,
    isError,
  } = useGetDepositRequestsQuery({
    page: page + 1,
    page_size: rowsPerPage,
  });

  const requests = response?.results || [];
  const totalCount = response?.count || requests.length;

  const handleApprove = async (req: DepositRequest) => {
    setActionLoadingId(req.uuid);
    try {
      await approveDepositRequest(req.uuid).unwrap();
      toast.success("درخواست واریز با موفقیت تایید شد.");
    } catch (err: unknown) {
      const { generalError } = parseApiError(err, undefined, "خطا در تایید درخواست واریز.");
      if (generalError) {
        toast.error(generalError);
      }
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleOpenRejectDialog = (req: DepositRequest) => {
    setRejectTarget(req);
    setIsRejectDialogOpen(true);
  };

  const handleCloseRejectDialog = () => {
    setIsRejectDialogOpen(false);
    setRejectTarget(null);
  };

  const columns = useMemo<Column<DepositRequest>[]>(
    () => [
      {
        id: "tracking_id",
        label: "کد پیگیری",
        render: (req) => (
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, fontFamily: "monospace", fontSize: "0.85rem" }}
          >
            {req.tracking_id || "-"}
          </Typography>
        ),
      },
      {
        id: "asset",
        label: "دارایی (Asset)",
        render: (req) => (
          <Chip
            label={req.asset || "IRR"}
            color="primary"
            variant="outlined"
            size="small"
            sx={{ fontWeight: 700, borderRadius: "6px" }}
          />
        ),
      },
      {
        id: "bank_account",
        label: "حساب بانکی مبدأ / مقصد",
        render: (req) => {
          const bank = req.bank_account;
          const bankText = bank
            ? `${bank.bank_name || ""} - ${bank.account_holder || ""}`.trim()
            : "-";
          const cardText = bank?.card_number || bank?.iban || bank?.account_number || "";

          return (
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {bankText || "-"}
              </Typography>
              {cardText && (
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                  {cardText}
                </Typography>
              )}
            </Box>
          );
        },
      },
      {
        id: "amount",
        label: "مبلغ واریز",
        align: "right",
        render: (req) => (
          <Typography variant="body2" sx={{ fontWeight: 700, color: "success.main" }}>
            {formatAmount(req.amount)}
          </Typography>
        ),
      },
      {
        id: "receipt",
        label: "رسید",
        align: "center",
        render: (req) =>
          req.receipt ? (
            <Tooltip title="مشاهده رسید" arrow>
              <IconButton
                component={Link}
                href={req.receipt}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                color="primary"
                sx={{ borderRadius: "8px" }}
              >
                <ReceiptIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            "-"
          ),
      },
      {
        id: "status",
        label: "وضعیت",
        align: "center",
        render: (req) => (
          <Chip
            label={getStatusLabel(req.status)}
            color={getStatusChipColor(req.status)}
            size="small"
            sx={{ fontWeight: 600, borderRadius: "6px" }}
          />
        ),
      },
      {
        id: "rejection_reason",
        label: "توضیحات / علت رد",
        render: (req) => (
          <Typography variant="body2" color="error.main" sx={{ fontWeight: 500 }}>
            {req.rejection_reason || "-"}
          </Typography>
        ),
      },
      {
        id: "created_at",
        label: "تاریخ ایجاد",
        align: "center",
        render: (req) => (
          <Typography variant="caption" color="text.secondary">
            {formatDate(req.created_at)}
          </Typography>
        ),
      },
      {
        id: "actions",
        label: "عملیات",
        align: "center",
        render: (req) => {
          const isPending = req.status === "pending";
          const isActionBusy = actionLoadingId === req.uuid;

          if (!isPending) return "-";

          return (
            <Box sx={{ display: "flex", justifyContent: "center", gap: 0.75 }}>
              <Tooltip title="تایید درخواست واریز" arrow>
                <IconButton
                  color="success"
                  size="small"
                  disabled={isActionBusy}
                  onClick={() => handleApprove(req)}
                  sx={{
                    borderRadius: "8px",
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                >
                  {isActionBusy ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    <ApproveIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="رد درخواست واریز" arrow>
                <IconButton
                  color="error"
                  size="small"
                  disabled={isActionBusy}
                  onClick={() => handleOpenRejectDialog(req)}
                  sx={{
                    borderRadius: "8px",
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <RejectIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
    ],
    [actionLoadingId],
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={requests}
        keyExtractor={(req) => req.uuid}
        isLoading={isLoading}
        isError={isError}
        errorMessage="خطا در دریافت درخواست‌های واریز. لطفاً اتصال سرور و توکن دسترسی را بررسی نمایید."
        emptyMessage="هیچ درخواست واریزی یافت نشد."
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
        onPageChange={setPage}
        itemLabel="درخواست واریز"
        minWidth={950}
      />

      {/* Reject Deposit Dialog */}
      <RejectDepositDialog
        open={isRejectDialogOpen}
        request={rejectTarget}
        onClose={handleCloseRejectDialog}
      />
    </>
  );
};

export default DepositRequestsTable;
