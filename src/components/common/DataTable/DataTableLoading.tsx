import React from "react";
import { TableRow, TableCell, Skeleton, alpha } from "@mui/material";

interface DataTableLoadingProps {
  colSpan: number;
  rowsCount?: number;
}

export const DataTableLoading: React.FC<DataTableLoadingProps> = ({ colSpan, rowsCount = 5 }) => {
  return (
    <>
      {Array.from({ length: rowsCount }).map((_, rowIndex) => {
        const isLastRow = rowIndex === rowsCount - 1;
        return (
          <TableRow key={rowIndex}>
            {Array.from({ length: colSpan }).map((_, colIndex) => (
              <TableCell
                key={colIndex}
                sx={{
                  py: 1.75,
                  px: 2,
                  borderBottom: (theme) =>
                    isLastRow ? "none" : `1px solid ${alpha(theme.palette.divider, 0.6)}`,
                }}
              >
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  height={22}
                  sx={{
                    borderRadius: "6px",
                    width:
                      colIndex === 0
                        ? "65%"
                        : colIndex === colSpan - 1
                          ? "35%"
                          : `${Math.floor(60 + ((colIndex * 17) % 30))}%`,
                  }}
                />
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </>
  );
};
