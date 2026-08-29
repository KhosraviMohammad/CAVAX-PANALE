import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setHeaderInfo } from "@/store/actions";
import { TransactionsKpiCards } from "@/components/transactions/TransactionsKpiCards";
import {
  TransactionsHeaderControls,
  type TransactionTypeFilter,
  type TransactionStatusFilter,
} from "@/components/transactions/TransactionsHeaderControls";
import { TransactionsTable } from "@/components/transactions/TransactionsTable";

const TransactionsPage: React.FC = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<TransactionTypeFilter>("ALL");
  const [statusFilter, setStatusFilter] = useState<TransactionStatusFilter>("ALL");
  const [refetchKey, setRefetchKey] = useState(0);

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
      <TransactionsHeaderControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onRefresh={() => setRefetchKey((prev) => prev + 1)}
      />

      {/* 3. Main Transactions Content (Table View) */}
      <TransactionsTable
        searchTerm={searchTerm}
        typeFilter={typeFilter}
        statusFilter={statusFilter}
        refetchTrigger={refetchKey}
      />
    </Box>
  );
};

export default TransactionsPage;
