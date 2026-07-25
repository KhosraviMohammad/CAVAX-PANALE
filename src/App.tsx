import { CssBaseline, GlobalStyles } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";

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
            // '&::-webkit-scrollbar': {
            //   display: 'none',
            // },
          },
          "#root": {
            margin: 0,
            width: "100%",
            height: "100%",
            // scrollbarWidth: 'none',
            // '&::-webkit-scrollbar': {
            //   display: 'none',
            // },
          },
          html: {
            margin: 0,
            width: "100vw",
            height: "100vh",
            scrollbarWidth: "none",
            // '&::-webkit-scrollbar': {
            //   display: 'none',
            // },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<DashboardLayout />} />
      </Routes>
    </>
  );
}

export default App;
