import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { setHeaderInfo } from "@/store/actions";
import { useGetUsersQuery } from "@/store/api/usersApi";
import type { User } from "@/store/api/usersApi";

import { UsersKpiCards } from "@/components/users/UsersKpiCards";
import { UsersHeaderControls, type UserStatusFilter } from "@/components/users/UsersHeaderControls";
import { UsersTable } from "@/components/users/UsersTable";

const UsersPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setHeaderInfo({
        title: "مدیریت کاربران",
        description: "مشاهده و برسی وضعیت حساب‌های کاربری، فیلترها و اطلاعات احراز هویت",
      }),
    );
  }, [dispatch]);

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<UserStatusFilter>("ALL");
  const [page, setPage] = useState(0);
  const rowsPerPage = 20;

  // RTK Query API Call
  const {
    data: usersResponse,
    isLoading,
    isError,
    refetch,
  } = useGetUsersQuery({
    page: page + 1,
    page_size: rowsPerPage,
  });

  const rawUsers = usersResponse?.results || [];

  // Filter Users locally for search & status filters
  const filteredUsers = rawUsers.filter((user) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      user.username?.toLowerCase().includes(term) ||
      user.phone_number?.toLowerCase().includes(term) ||
      user.first_name?.toLowerCase().includes(term) ||
      user.last_name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.national_code?.toLowerCase().includes(term);

    let matchesStatus = true;
    if (statusFilter === "ACTIVE") matchesStatus = user.is_active;
    else if (statusFilter === "ADMIN") matchesStatus = user.is_admin;
    else if (statusFilter === "VERIFIED") matchesStatus = user.verified;

    return matchesSearch && matchesStatus;
  });

  const totalFilteredCount = usersResponse?.count || filteredUsers.length;

  return (
    <Box sx={{ p: 3, maxWidth: 1400, margin: "0 auto" }}>
      {/* 1. KPI Statistic Summary Cards */}
      <UsersKpiCards users={rawUsers} totalCount={usersResponse?.count} />

      {/* 2. Control Panel Header (Search, Status Filter, Refresh Button) */}
      <UsersHeaderControls
        searchTerm={searchTerm}
        onSearchChange={(val) => {
          setSearchTerm(val);
          setPage(0);
        }}
        statusFilter={statusFilter}
        onStatusFilterChange={(status) => {
          setStatusFilter(status);
          setPage(0);
        }}
        onRefresh={() => refetch()}
      />

      {/* 3. Main Users Content (Table View) */}
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 8 }}>
          <CircularProgress size={48} />
        </Box>
      ) : isError ? (
        <Alert severity="error" sx={{ borderRadius: 1 }}>
          خطا در دریافت لیست کاربران. لطفاً اتصال سرور و توکن دسترسی را بررسی نمایید.
        </Alert>
      ) : (
        <UsersTable
          users={filteredUsers}
          totalFilteredCount={totalFilteredCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
        />
      )}
    </Box>
  );
};

export default UsersPage;
