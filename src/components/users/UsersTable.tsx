import React, { useState, useMemo } from "react";
import { Box, Typography, Chip, IconButton, Tooltip, alpha } from "@mui/material";
import { useDispatch } from "react-redux";
import { openEditUserForm } from "@/store/actions";
import { EditIcon } from "@/assets/icons";
import { useGetUsersQuery, type User } from "@/store/api/usersApi";
import { DataTable, type Column } from "@/components/common/DataTable";

interface UsersTableProps {
  onUserClick?: (user: User) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({ onUserClick }) => {
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

  const columns = useMemo<Column<User>[]>(
    () => [
      {
        id: "username",
        label: "نام کاربری",
        render: (user) => (
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {user.username || "-"}
          </Typography>
        ),
      },
      {
        id: "name",
        label: "نام و نام خانوادگی",
        render: (user) => {
          const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ") || "-";
          return (
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              {fullName}
            </Typography>
          );
        },
      },
      {
        id: "phone_number",
        label: "شماره تلفن",
        render: (user) => (
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {user.phone_number || "-"}
          </Typography>
        ),
      },
      {
        id: "national_code",
        label: "کد ملی",
        render: (user) => (
          <Typography variant="body2" sx={{ fontWeight: 500, fontFamily: "monospace" }}>
            {user.national_code || "-"}
          </Typography>
        ),
      },
      {
        id: "status",
        label: "وضعیت",
        align: "center",
        render: (user) => (
          <Box
            sx={{
              display: "flex",
              gap: 0.75,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Chip
              label={user.is_active ? "فعال" : "غیرفعال"}
              color={user.is_active ? "success" : "default"}
              size="small"
              sx={{ fontWeight: 600, borderRadius: "6px" }}
            />
            {user.is_admin && (
              <Chip
                label="مدیر"
                color="warning"
                size="small"
                sx={{ fontWeight: 600, borderRadius: "6px" }}
              />
            )}
            {user.verified && (
              <Chip
                label="احراز شده"
                color="info"
                size="small"
                sx={{ fontWeight: 600, borderRadius: "6px" }}
              />
            )}
            {user.two_fa_enabled && (
              <Chip
                label="2FA"
                color="secondary"
                size="small"
                variant="outlined"
                sx={{ fontWeight: 600, borderRadius: "6px" }}
              />
            )}
          </Box>
        ),
      },
      {
        id: "actions",
        label: "عملیات",
        align: "center",
        render: (user) => (
          <Tooltip title="ویرایش کاربر" arrow>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(openEditUserForm(user.uuid));
                onUserClick?.(user);
              }}
              sx={{
                borderRadius: "8px",
                border: (theme) => `1px solid ${theme.palette.divider}`,
                color: "text.secondary",
                transition: "all 0.15s ease",
                "&:hover": {
                  borderColor: "primary.main",
                  color: "primary.main",
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    [dispatch, onUserClick],
  );

  return (
    <DataTable
      columns={columns}
      data={users}
      keyExtractor={(user) => user.uuid}
      isLoading={isLoading}
      isError={isError}
      errorMessage="خطا در دریافت لیست کاربران. لطفاً اتصال سرور و توکن دسترسی را بررسی نمایید."
      emptyMessage="هیچ کاربری یافت نشد."
      page={page}
      rowsPerPage={rowsPerPage}
      totalCount={totalCount}
      onPageChange={setPage}
      itemLabel="کاربر"
    />
  );
};

export default UsersTable;
