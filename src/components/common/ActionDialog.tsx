import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
  useTheme,
  alpha,
  type DialogProps,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export interface ActionDialogProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: DialogProps["maxWidth"];
  fullWidth?: boolean;
  actions?: React.ReactNode;
  submitText?: string;
  cancelText?: string;
  onSubmit?: (e?: React.FormEvent) => void | Promise<void>;
  isLoading?: boolean;
  submitColor?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  submitDisabled?: boolean;
  hideCloseButton?: boolean;
}

export const ActionDialog: React.FC<ActionDialogProps> = ({
  open,
  onClose,
  title,
  subtitle,
  icon,
  children,
  maxWidth = "sm",
  fullWidth = true,
  actions,
  submitText = "تایید",
  cancelText = "انصراف",
  onSubmit,
  isLoading = false,
  submitColor = "primary",
  submitDisabled = false,
  hideCloseButton = false,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      {/* Header */}
      {title && (
        <>
          <DialogTitle
            sx={{
              m: 0,
              px: 3,
              py: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {icon && (
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1.5,
                    bgcolor: alpha(
                      theme.palette[submitColor === "inherit" ? "primary" : submitColor]?.main ||
                        theme.palette.primary.main,
                      0.12,
                    ),
                    color: `${submitColor === "inherit" ? "primary" : submitColor}.main`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </Box>
              )}
              <Box>
                {typeof title === "string" ? (
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
                    {title}
                  </Typography>
                ) : (
                  title
                )}
                {subtitle && (
                  <Typography variant="caption" color="text.secondary">
                    {subtitle}
                  </Typography>
                )}
              </Box>
            </Box>
            {!hideCloseButton && (
              <IconButton
                onClick={onClose}
                disabled={isLoading}
                size="small"
                sx={{ color: "text.secondary" }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </DialogTitle>
          <Divider />
        </>
      )}

      {/* Form or Body Content */}
      <Box
        component="form"
        onSubmit={(e) => {
          if (onSubmit) {
            e.preventDefault();
            onSubmit(e);
          }
        }}
      >
        <DialogContent sx={{ p: 3, bgcolor: "background.paper" }}>{children}</DialogContent>

        {/* Footer Actions */}
        <Divider />
        <DialogActions
          sx={{
            p: 2,
            px: 3,
            bgcolor: alpha(theme.palette.background.default, 0.5),
          }}
        >
          {actions ? (
            actions
          ) : (
            <>
              {cancelText && (
                <Button
                  onClick={onClose}
                  disabled={isLoading}
                  color="inherit"
                  variant="outlined"
                  sx={{ borderRadius: 1 }}
                >
                  {cancelText}
                </Button>
              )}
              {submitText && (
                <Button
                  type="submit"
                  variant="contained"
                  color={submitColor}
                  disabled={isLoading || submitDisabled}
                  startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : null}
                  sx={{ borderRadius: 1, px: 3, fontWeight: 700 }}
                >
                  {submitText}
                </Button>
              )}
            </>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
};
