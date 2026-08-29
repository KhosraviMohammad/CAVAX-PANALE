import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setHeaderInfo } from "@/store/actions";
import { WalletsKpiCards } from "@/components/wallets/WalletsKpiCards";
import { WalletsHeaderControls } from "@/components/wallets/WalletsHeaderControls";
import { WalletsTable } from "@/components/wallets/WalletsTable";

const WalletsPage: React.FC = () => {
  const dispatch = useDispatch();

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
      <WalletsHeaderControls />

      {/* 3. Main Wallets Content (Table View) */}
      <WalletsTable />
    </Box>
  );
};

export default WalletsPage;
