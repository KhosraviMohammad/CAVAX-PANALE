import React, { useState } from "react";
import {
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Typography,
  Chip,
  useTheme,
  IconButton,
  CircularProgress,
  Alert,
  Link,
  Tooltip,
} from "@mui/material";
import { ChevronRightIcon, ChevronLeftIcon } from "@/assets/icons";
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
  const theme = useTheme();
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
    refetch,
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

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 8 }}>
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert
        severity="error"
        action={
          <IconButton color="inherit" size="small" onClick={() => refetch()}>
            تلاش مجدد
          </IconButton>
        }
        sx={{ borderRadius: 1 }}
      >
        خطا در دریافت درخواست‌های واریز. لطفاً اتصال سرور و توکن دسترسی را بررسی نمایید.
      </Alert>
    );
  }

  return (
    <>
      <Card elevation={2} sx={{ overflow: "hidden" }}>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 950 }}>
            <TableHead sx={{ bgcolor: "action.hover" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>کد پیگیری</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>دارایی (Asset)</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>حساب بانکی مبدأ / مقصد</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  مبلغ واریز
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  رسید
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  وضعیت
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>توضیحات / علت رد</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  تاریخ ایجاد
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  عملیات
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests && requests.length > 0 ? (
                requests.map((req: DepositRequest) => {
                  const bank = req.bank_account;
                  const bankText = bank
                    ? `${bank.bank_name || ""} - ${bank.account_holder || ""}`.trim()
                    : "-";
                  const cardText = bank?.card_number || bank?.iban || bank?.account_number || "";
                  const isPending = req.status === "pending";
                  const isActionBusy = actionLoadingId === req.uuid;

                  return (
                    <TableRow key={req.uuid} hover>
                      {/* Tracking ID */}
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 700, fontFamily: "monospace", fontSize: "0.85rem" }}
                        >
                          {req.tracking_id || "-"}
                        </Typography>
                      </TableCell>

                      {/* Asset */}
                      <TableCell>
                        <Chip
                          label={req.asset || "IRR"}
                          color="primary"
                          variant="outlined"
                          size="small"
                          sx={{ fontWeight: 700, borderRadius: 1 }}
                        />
                      </TableCell>

                      {/* Bank Account */}
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {bankText || "-"}
                        </Typography>
                        {cardText && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block" }}
                          >
                            {cardText}
                          </Typography>
                        )}
                      </TableCell>

                      {/* Amount */}
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontWeight: 700, color: "success.main" }}>
                          {formatAmount(req.amount)}
                        </Typography>
                      </TableCell>

                      {/* Receipt */}
                      <TableCell align="center">
                        {req.receipt ? (
                          <Tooltip title="مشاهده رسید">
                            <IconButton
                              component={Link}
                              href={req.receipt}
                              target="_blank"
                              rel="noopener noreferrer"
                              size="small"
                              color="primary"
                            >
                              <ReceiptIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          "-"
                        )}
                      </TableCell>

                      {/* Status */}
                      <TableCell align="center">
                        <Chip
                          label={getStatusLabel(req.status)}
                          color={getStatusChipColor(req.status)}
                          size="small"
                          sx={{ fontWeight: 600, borderRadius: 1 }}
                        />
                      </TableCell>

                      {/* Rejection Reason */}
                      <TableCell>
                        <Typography variant="body2" color="error.main" sx={{ fontWeight: 500 }}>
                          {req.rejection_reason || "-"}
                        </Typography>
                      </TableCell>

                      {/* Created At */}
                      <TableCell align="center">
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(req.created_at)}
                        </Typography>
                      </TableCell>

                      {/* Actions */}
                      <TableCell align="center">
                        {isPending ? (
                          <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
                            <Tooltip title="تایید درخواست واریز">
                              <IconButton
                                color="success"
                                size="small"
                                disabled={isActionBusy}
                                onClick={() => handleApprove(req)}
                                sx={{ borderRadius: 1 }}
                              >
                                {isActionBusy ? (
                                  <CircularProgress size={18} color="inherit" />
                                ) : (
                                  <ApproveIcon fontSize="small" />
                                )}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="رد درخواست واریز">
                              <IconButton
                                color="error"
                                size="small"
                                disabled={isActionBusy}
                                onClick={() => handleOpenRejectDialog(req)}
                                sx={{ borderRadius: 1 }}
                              >
                                <RejectIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">هیچ درخواست واریزی یافت نشد.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Integrated Table Footer / Pagination */}
        {(() => {
          const from = totalCount === 0 ? 0 : page * rowsPerPage + 1;
          const to = Math.min((page + 1) * rowsPerPage, totalCount);
          const totalPages = Math.max(1, Math.ceil(totalCount / rowsPerPage));

          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                p: 1.5,
                px: 2.5,
                borderTop: `1px solid ${theme.palette.divider}`,
                bgcolor: "background.paper",
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                نمایش <b>{from}</b> تا <b>{to}</b> از <b>{totalCount}</b> درخواست واریز
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  size="small"
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                  sx={{ borderRadius: 1 }}
                >
                  <ChevronRightIcon fontSize="small" />
                </IconButton>

                <Typography variant="caption" sx={{ px: 0.5, fontWeight: "bold" }}>
                  {page + 1} / {totalPages}
                </Typography>

                <IconButton
                  size="small"
                  disabled={(page + 1) * rowsPerPage >= totalCount}
                  onClick={() => setPage(page + 1)}
                  sx={{ borderRadius: 1 }}
                >
                  <ChevronLeftIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          );
        })()}
      </Card>

      {/* Reject Deposit Dialog */}
      <RejectDepositDialog
        open={isRejectDialogOpen}
        request={rejectTarget}
        onClose={handleCloseRejectDialog}
      />
    </>
  );
};
