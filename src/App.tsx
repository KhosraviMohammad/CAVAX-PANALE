import React, { Suspense, lazy } from "react";
import { CssBaseline, GlobalStyles, Box, CircularProgress } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const SamplePage = lazy(() => import("@/pages/SamplePage"));

const PageLoader = () => (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
    <CircularProgress />
  </Box>
);

function App() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            width: "100vw",
            height: "100vh",
            scrollbarWidth: "none",
          },
          "#root": {
            margin: 0,
            width: "100%",
            height: "100%",
          },
          html: {
            margin: 0,
            width: "100vw",
            height: "100vh",
            scrollbarWidth: "none",
          },
        }}
      />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<SamplePage />} />
            <Route path="sample" element={<SamplePage />} />
            <Route path="samples" element={<SamplePage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
