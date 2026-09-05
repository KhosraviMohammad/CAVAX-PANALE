import React from "react";
import { Paper, Box, useTheme, alpha, type SxProps, type Theme } from "@mui/material";

export interface HeaderControlsWrapperProps {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const HeaderControlsWrapper: React.FC<HeaderControlsWrapperProps> = ({
  leftContent,
  rightContent,
  children,
  sx,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 1,
        background:
          theme.palette.mode === "dark"
            ? alpha(theme.palette.background.paper, 0.9)
            : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(
                theme.palette.primary.main,
                0.02,
              )} 100%)`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
        ...sx,
      }}
    >
      {leftContent !== undefined || rightContent !== undefined ? (
        <>
          {leftContent && (
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                alignItems: "center",
                flexWrap: "wrap",
                flexGrow: 1,
              }}
            >
              {leftContent}
            </Box>
          )}
          {rightContent && (
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                alignItems: "center",
              }}
            >
              {rightContent}
            </Box>
          )}
          {children}
        </>
      ) : (
        children
      )}
    </Paper>
  );
};
