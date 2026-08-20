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
  Tooltip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { openEditUserForm } from "@/store/actions";
import { ChevronRightIcon, ChevronLeftIcon, EditIcon } from "@/assets/icons";
import { useGetUsersQuery, type User } from "@/store/api/usersApi";

interface UsersTableProps {
  onUserClick?: (user: User) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({ onUserClick }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const rowsPerPage = 20;

  const {
    data: usersResponse,
    isLoading,
    isError,
  } = useGetUsersQuery({
    page: page + 1,
    page_size: rowsPerPage,
  });

  const users = usersResponse?.results || [];
  const totalCount = usersResponse?.count || users.length;

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 8 }}>
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ borderRadius: 1 }}>
        خطا در دریافت لیست کاربران. لطفاً اتصال سرور و توکن دسترسی را بررسی نمایید.
      </Alert>
    );
  }

  return (
    <Card elevation={2} sx={{ overflow: "hidden" }}>
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead sx={{ bgcolor: "action.hover" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>نام کاربری</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>نام و نام خانوادگی</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>شماره تلفن</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>کد ملی</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                وضعیت
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                عملیات
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.length > 0 ? (
              users.map((user) => {
                const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ") || "-";

                return (
                  <TableRow key={user.uuid} hover>
                    {/* Username */}
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                        {user.username ? `${user.username}` : "-"}
                      </Typography>
                    </TableCell>

                    {/* Full Name */}
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                        {fullName}
                      </Typography>
                    </TableCell>

                    {/* Phone Number */}
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {user.phone_number || "-"}
                      </Typography>
                    </TableCell>

                    {/* National Code */}
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {user.national_code || "-"}
                      </Typography>
                    </TableCell>

                    {/* Status Chips */}
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          gap: 0.5,
                          justifyContent: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <Chip
                          label={user.is_active ? "فعال" : "غیرفعال"}
                          color={user.is_active ? "success" : "default"}
                          size="small"
                          sx={{ fontWeight: 600, borderRadius: 1 }}
                        />
                        {user.is_admin && (
                          <Chip
                            label="مدیر"
                            color="warning"
                            size="small"
                            sx={{ fontWeight: 600, borderRadius: 1 }}
                          />
                        )}
                        {user.verified && (
                          <Chip
                            label="احراز شده"
                            color="info"
                            size="small"
                            sx={{ fontWeight: 600, borderRadius: 1 }}
                          />
                        )}
                        {user.two_fa_enabled && (
                          <Chip
                            label="2FA"
                            color="secondary"
                            size="small"
                            variant="outlined"
                            sx={{ fontWeight: 600, borderRadius: 1 }}
                          />
                        )}
                      </Box>
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="center">
                      <Tooltip title="ویرایش کاربر">
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => {
                            dispatch(openEditUserForm(user.uuid));
                            onUserClick?.(user);
                          }}
                          sx={{ borderRadius: 1 }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">هیچ کاربری یافت نشد.</Typography>
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
              نمایش <b>{from}</b> تا <b>{to}</b> از <b>{totalCount}</b> کاربر
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
  );
};
