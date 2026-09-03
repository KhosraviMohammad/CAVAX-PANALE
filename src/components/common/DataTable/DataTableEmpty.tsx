import React from "react";
import { TableRow, TableCell, Box, Typography, alpha } from "@mui/material";
import { Inbox as EmptyIcon } from "@mui/icons-material";

interface DataTableEmptyProps {
  colSpan: number;
  message?: string;
}

export const DataTableEmpty: React.FC<DataTableEmptyProps> = ({
  colSpan,
  message = "هیچ داده‌ای یافت نشد.",
}) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center" sx={{ py: 8, border: "none" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: (theme) => alpha(theme.palette.text.secondary, 0.08),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary",
            }}
          >
            <EmptyIcon sx={{ fontSize: 28, opacity: 0.7 }} />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {message}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
};
