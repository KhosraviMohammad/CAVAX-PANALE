import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setHeaderInfo } from "@/store/actions";
import { TransactionsKpiCards } from "@/components/transactions/TransactionsKpiCards";
import { TransactionsHeaderControls } from "@/components/transactions/TransactionsHeaderControls";
import { TransactionsTable } from "@/components/transactions/TransactionsTable";

const TransactionsPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setHeaderInfo({
        title: "مدیریت تراکنش‌ها",
        description:
          "مشاهده و پایش تمامی رویدادها و تراکنش‌های مالی سیستم، واریزها، تبدیل‌ها و کارمزدها",
      }),
    );
  }, [dispatch]);

  return (
    <Box sx={{ p: 3, maxWidth: 1800, margin: "0 auto" }}>
      {/* 1. KPI Statistic Summary Cards */}
      <TransactionsKpiCards />

      {/* 2. Control Panel Header */}
      <TransactionsHeaderControls />

      {/* 3. Main Transactions Content (Table View) */}
      <TransactionsTable />
    </Box>
  );
};

export default TransactionsPage;
