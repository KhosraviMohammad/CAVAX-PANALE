import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setHeaderInfo } from "@/store/actions";
import { WalletsKpiCards } from "@/components/wallets/WalletsKpiCards";
import {
  WalletsHeaderControls,
  type WalletStatusFilter,
} from "@/components/wallets/WalletsHeaderControls";
import { WalletsTable } from "@/components/wallets/WalletsTable";

const WalletsPage: React.FC = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<WalletStatusFilter>("ALL");
  const [refetchKey, setRefetchKey] = useState(0);

  useEffect(() => {
    dispatch(
      setHeaderInfo({
        title: "مدیریت کیف پول‌ها",
        description: "مشاهده و مدیریت کیف پول‌های کاربری، موجودی‌ها و وضعیت دارایی‌ها",
      }),
    );
  }, [dispatch]);

  return (
    <Box sx={{ p: 3, maxWidth: 1800, margin: "0 auto" }}>
      {/* 1. KPI Statistic Summary Cards */}
      <WalletsKpiCards />

      {/* 2. Control Panel Header */}
      <WalletsHeaderControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onRefresh={() => setRefetchKey((prev) => prev + 1)}
      />

      {/* 3. Main Wallets Content (Table View) */}
      <WalletsTable
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        refetchTrigger={refetchKey}
      />
    </Box>
  );
};

export default WalletsPage;
