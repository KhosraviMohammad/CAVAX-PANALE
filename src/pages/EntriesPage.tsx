import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setHeaderInfo } from "@/store/actions";
import { EntriesKpiCards } from "@/components/entries/EntriesKpiCards";
import {
  EntriesHeaderControls,
  type EntryDirectionFilter,
} from "@/components/entries/EntriesHeaderControls";
import { EntriesTable } from "@/components/entries/EntriesTable";

const EntriesPage: React.FC = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [directionFilter, setDirectionFilter] = useState<EntryDirectionFilter>("ALL");
  const [minAmount, setMinAmount] = useState("");
  const [refetchKey, setRefetchKey] = useState(0);

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
      <EntriesHeaderControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        directionFilter={directionFilter}
        onDirectionFilterChange={setDirectionFilter}
        minAmount={minAmount}
        onMinAmountChange={setMinAmount}
        onRefresh={() => setRefetchKey((prev) => prev + 1)}
      />

      {/* 3. Main Entries Content (Table View) */}
      <EntriesTable
        searchTerm={searchTerm}
        directionFilter={directionFilter}
        minAmount={minAmount}
        refetchTrigger={refetchKey}
      />
    </Box>
  );
};

export default EntriesPage;
