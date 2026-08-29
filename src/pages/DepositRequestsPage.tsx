import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setHeaderInfo } from "@/store/actions";
import { DepositRequestsKpiCards } from "@/components/deposit-requests/DepositRequestsKpiCards";
import { DepositRequestsHeaderControls } from "@/components/deposit-requests/DepositRequestsHeaderControls";
import { DepositRequestsTable } from "@/components/deposit-requests/DepositRequestsTable";

const DepositRequestsPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setHeaderInfo({
        title: "درخواست‌های واریز",
        description:
          "مشاهده و مدیریت درخواست‌های واریز ریالی و ارزی کاربران، اطلاعات حساب مبدأ و رسیدها",
      }),
    );
  }, [dispatch]);

  return (
    <Box sx={{ p: 3, maxWidth: 1800, margin: "0 auto" }}>
      {/* 1. KPI Statistic Summary Cards */}
      <DepositRequestsKpiCards />

      {/* 2. Control Panel Header */}
      <DepositRequestsHeaderControls />

      {/* 3. Main Deposit Requests Content (Table View) */}
      <DepositRequestsTable />
    </Box>
  );
};

export default DepositRequestsPage;
