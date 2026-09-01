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

export interface FilterDialogProps {
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
  resetText?: string;
  onSubmit?: () => void | Promise<void>;
  onReset?: () => void;
  isLoading?: boolean;
  submitColor?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  submitDisabled?: boolean;
  hideCloseButton?: boolean;
}

export const FilterDialog: React.FC<FilterDialogProps> = ({
  open,
  onClose,
  title,
  subtitle,
  icon,
  children,
  maxWidth = "sm",
  fullWidth = true,
  actions,
  submitText,
  cancelText = "انصراف",
  resetText,
  onSubmit,
  onReset,
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
                    bgcolor: alpha(theme.palette.primary.main, 0.12),
                    color: "primary.main",
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

      {/* Content */}
      <DialogContent sx={{ p: 3, bgcolor: "background.paper" }}>{children}</DialogContent>

      {/* Footer / Actions */}
      {(actions || submitText || onReset) && (
        <>
          <Divider />
          <DialogActions
            sx={{
              p: 2,
              px: 3,
              justifyContent: onReset ? "space-between" : "flex-end",
              bgcolor: alpha(theme.palette.background.default, 0.5),
            }}
          >
            {actions ? (
              actions
            ) : (
              <>
                {onReset && resetText && (
                  <Button
                    color="inherit"
                    onClick={onReset}
                    disabled={isLoading}
                    sx={{ borderRadius: 1 }}
                  >
                    {resetText}
                  </Button>
                )}

                <Box sx={{ display: "flex", gap: 1.5 }}>
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
                      onClick={onSubmit}
                      variant="contained"
                      color={submitColor}
                      disabled={isLoading || submitDisabled}
                      startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : null}
                      sx={{ borderRadius: 1, px: 3, fontWeight: 700 }}
                    >
                      {submitText}
                    </Button>
                  )}
                </Box>
              </>
            )}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
