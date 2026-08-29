import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setHeaderInfo } from "@/store/actions";
import { EntriesKpiCards } from "@/components/entries/EntriesKpiCards";
import { EntriesHeaderControls } from "@/components/entries/EntriesHeaderControls";
import { EntriesTable } from "@/components/entries/EntriesTable";

const EntriesPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setHeaderInfo({
        title: "دفتر کل و اسناد مالی",
        description:
          "مشاهده ردیف‌های دوبل حسابداری (Double-Entry Rows)، جهت بدهکار/بستانکار و موجودی ثبتی",
      }),
    );
  }, [dispatch]);

  return (
    <Box sx={{ p: 3, maxWidth: 1800, margin: "0 auto" }}>
      {/* 1. KPI Statistic Summary Cards */}
      <EntriesKpiCards />

      {/* 2. Control Panel Header */}
      <EntriesHeaderControls />

      {/* 3. Main Entries Content (Table View) */}
      <EntriesTable />
    </Box>
  );
};

export default EntriesPage;
