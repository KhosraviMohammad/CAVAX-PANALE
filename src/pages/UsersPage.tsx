import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setHeaderInfo } from "@/store/actions";

import { UsersKpiCards } from "@/components/users/UsersKpiCards";
import { UsersHeaderControls } from "@/components/users/UsersHeaderControls";
import { UsersTable } from "@/components/users/UsersTable";
import { UserFormDialog } from "@/components/users/UserFormDialog";

const UsersPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setHeaderInfo({
        title: "مدیریت کاربران",
        description: "مشاهده و مدیریت حساب‌های کاربری، ایجاد کاربر جدید و اطلاعات احراز هویت",
      }),
    );
  }, [dispatch]);

  return (
    <Box sx={{ p: 3, maxWidth: 1800, margin: "0 auto" }}>
      {/* 1. KPI Statistic Summary Cards */}
      <UsersKpiCards />

      {/* 2. Control Panel Header */}
      <UsersHeaderControls />

      {/* 3. Main Users Content (Table View) */}
      <UsersTable />

      {/* 4. Self-Contained Create User Dialog */}
      <UserFormDialog />
    </Box>
  );
};

export default UsersPage;
