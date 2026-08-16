import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHeaderInfo } from "@/store/actions";
import {
  useGetCategoriesQuery,
  useGetSamplesQuery,
  useCreateSampleMutation,
  useUpdateSampleValueMutation,
} from "@/store/api/sampleApi";
import type { Sample } from "@/store/api/sampleApi";

import { SampleKpiCards } from "@/components/sample/SampleKpiCards";
import { SampleHeaderControls } from "@/components/sample/SampleHeaderControls";
import { SampleTable } from "@/components/sample/SampleTable";

import { SampleFormDialog } from "@/components/sample/SampleFormDialog";
import { SampleValueDialog } from "@/components/sample/SampleValueDialog";
import type { SampleFormData } from "@/schemas/sampleSchemas";

const SamplePage: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilterParam = searchParams.get("category_id");

  useEffect(() => {
    dispatch(
      setHeaderInfo({
        title: "صفحه نمونه (Sample Page)",
        description: "مشاهده لیست داده‌های نمونه، فیلترها و اعمال تغییرات به عنوان الگوی صفحات",
      }),
    );
  }, [dispatch]);

  const { data: categories } = useGetCategoriesQuery();
  const { data: samples, isLoading, isError, refetch } = useGetSamplesQuery();

  const [createSample, { isLoading: isCreatingSample }] = useCreateSampleMutation();
  const [updateSampleValue, { isLoading: isUpdatingValue }] = useUpdateSampleValueMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "ALL">(
    categoryFilterParam ? Number(categoryFilterParam) : "ALL",
  );

  // Pagination State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  // Dialog State
  const [openSampleDialog, setOpenSampleDialog] = useState(false);
  const [openValueDialog, setOpenValueDialog] = useState(false);
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);

  const handleOpenValueDialog = (sample: Sample) => {
    setSelectedSample(sample);
    setOpenValueDialog(true);
  };

  const handleSampleSubmit = async (data: SampleFormData) => {
    try {
      await createSample(data).unwrap();
      setOpenSampleDialog(false);
    } catch (err) {
      console.error("Failed to create sample:", err);
    }
  };

  const handleValueSubmit = async (sampleId: number, value: number) => {
    try {
      await updateSampleValue({ id: sampleId, value }).unwrap();
      setOpenValueDialog(false);
      setSelectedSample(null);
    } catch (err) {
      console.error("Failed to update sample value:", err);
    }
  };

  const handleCategorySelect = (categoryId: number | "ALL") => {
    setSelectedCategoryId(categoryId);
    setPage(0);
    if (categoryId === "ALL") {
      searchParams.delete("category_id");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category_id: String(categoryId) });
    }
  };

  // Filter Samples
  const filteredSamples = samples?.filter((sample) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      sample.name.toLowerCase().includes(term) ||
      sample.code.toLowerCase().includes(term) ||
      sample.category_name.toLowerCase().includes(term);

    const matchesCategory =
      selectedCategoryId === "ALL" || sample.category_id === selectedCategoryId;

    return matchesSearch && matchesCategory;
  });

  // Paginated Samples
  const paginatedSamples = filteredSamples?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const totalFilteredCount = filteredSamples?.length || 0;

  return (
    <Box sx={{ p: 3, maxWidth: 1400, margin: "0 auto" }}>
      {/* 1. KPI Statistic Summary Cards */}
      <SampleKpiCards samples={samples} />

      {/* 2. Control Panel Header (Search, Filters, Refresh, Add Button) */}
      <SampleHeaderControls
        searchTerm={searchTerm}
        onSearchChange={(val) => {
          setSearchTerm(val);
          setPage(0);
        }}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={handleCategorySelect}
        categories={categories}
        onRefresh={() => refetch()}
        onAddSampleClick={() => setOpenSampleDialog(true)}
      />

      {/* 3. Main Samples Content (Table View) */}
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 8 }}>
          <CircularProgress size={48} />
        </Box>
      ) : isError ? (
        <Alert severity="error" sx={{ borderRadius: 1 }}>
          خطا در دریافت لیست داده‌های نمونه. لطفاً اتصال بک‌اند را بررسی کنید.
        </Alert>
      ) : (
        <SampleTable
          samples={paginatedSamples}
          totalFilteredCount={totalFilteredCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={(newRows) => {
            setRowsPerPage(newRows);
            setPage(0);
          }}
          onEditValueClick={handleOpenValueDialog}
        />
      )}

      {/* 4. Dialogs */}
      <SampleFormDialog
        open={openSampleDialog}
        categories={categories}
        selectedCategoryId={selectedCategoryId === "ALL" ? undefined : selectedCategoryId}
        isLoading={isCreatingSample}
        onClose={() => setOpenSampleDialog(false)}
        onSubmit={handleSampleSubmit}
      />

      <SampleValueDialog
        open={openValueDialog}
        sample={selectedSample}
        isLoading={isUpdatingValue}
        onClose={() => setOpenValueDialog(false)}
        onSubmit={handleValueSubmit}
      />
    </Box>
  );
};

export default SamplePage;
