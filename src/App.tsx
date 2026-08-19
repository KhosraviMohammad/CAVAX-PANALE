import React, { Suspense, lazy } from "react";
import { CssBaseline, GlobalStyles, Box, CircularProgress } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { ProtectedRoute, PublicOnlyRoute } from "@/components/common/AuthGuard";

const SamplePage = lazy(() => import("@/pages/SamplePage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const UsersPage = lazy(() => import("@/pages/UsersPage"));

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
          {/* Public Routes (Only accessible when not logged in) */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Protected Routes (Require authentication) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<UsersPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="sample" element={<SamplePage />} />
              <Route path="samples" element={<SamplePage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
