import React from "react";
import DatePicker, { DateObject, type Value } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  useTheme,
  alpha,
  type TextFieldProps,
} from "@mui/material";
import { CalendarMonth as CalendarIcon } from "@mui/icons-material";

// Ensure compatibility with different bundler export resolutions
const ResolvedDatePicker =
  (DatePicker as unknown as { default?: typeof DatePicker }).default || DatePicker;

interface PersianDateInputProps {
  value?: string;
  openCalendar?: () => void;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  textFieldProps?: Partial<TextFieldProps>;
}

const PersianDateInput: React.FC<PersianDateInputProps> = ({
  value,
  openCalendar,
  disabled,
  label,
  placeholder,
  error,
  helperText,
  size,
  fullWidth,
  textFieldProps,
}) => {
  const theme = useTheme();

  return (
    <TextField
      {...textFieldProps}
      fullWidth={fullWidth}
      size={size}
      label={label}
      placeholder={placeholder}
      value={value || ""}
      onClick={openCalendar}
      error={error}
      helperText={helperText}
      disabled={disabled}
      slotProps={{
        input: {
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={openCalendar}
                disabled={disabled}
                size="small"
                sx={{ color: theme.palette.text.secondary }}
              >
                <CalendarIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
          ...textFieldProps?.slotProps?.input,
        },
      }}
    />
  );
};

export interface PersianDatePickerProps {
  value?: Value;
  onChange?: (date: DateObject | null) => void;
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  disabled?: boolean;
  format?: string;
  textFieldProps?: Partial<TextFieldProps>;
}

export const PersianDatePicker: React.FC<PersianDatePickerProps> = ({
  value,
  onChange,
  label = "انتخاب تاریخ",
  placeholder = "۱۴۰۳/۰۱/۰۱",
  error = false,
  helperText,
  size = "medium",
  fullWidth = true,
  disabled = false,
  format = "YYYY/MM/DD",
  textFieldProps,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        width: fullWidth ? "100%" : "auto",
        "& .rmdp-container": {
          width: fullWidth ? "100%" : "auto",
          display: "block",
        },
        "& .rmdp-wrapper": {
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "14px",
          boxShadow: isDark
            ? "0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)"
            : "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
          fontFamily: theme.typography.fontFamily,
          overflow: "hidden",
        },
        "& .rmdp-calendar": {
          fontFamily: theme.typography.fontFamily,
        },
        "& .rmdp-header": {
          padding: "10px 8px",
          fontSize: "14px",
          fontWeight: 600,
          color: theme.palette.text.primary,
        },
        "& .rmdp-header-values": {
          color: theme.palette.text.primary,
          fontWeight: 700,
        },
        "& .rmdp-arrow-container": {
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
          },
          "& .rmdp-arrow": {
            borderColor: theme.palette.text.primary,
          },
        },
        "& .rmdp-week-day": {
          color: theme.palette.text.secondary,
          fontWeight: 600,
          fontSize: "12px",
        },
        "& .rmdp-day": {
          color: theme.palette.text.primary,
          transition: "all 0.15s ease-in-out",
          borderRadius: "8px",
          "&:hover:not(.rmdp-disabled):not(.rmdp-day-hidden)": {
            backgroundColor: alpha(theme.palette.primary.main, 0.15),
            color: theme.palette.primary.main,
          },
          "&.rmdp-selected span:not(.highlight)": {
            backgroundColor: theme.palette.primary.main,
            color: "#ffffff",
            boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.4)}`,
            borderRadius: "8px",
          },
          "&.rmdp-today span": {
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
            color: theme.palette.primary.main,
            fontWeight: 700,
            borderRadius: "8px",
          },
          "&.rmdp-disabled": {
            color: theme.palette.text.disabled,
          },
        },
        "& .rmdp-month-picker, & .rmdp-year-picker": {
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <ResolvedDatePicker
        value={value}
        onChange={onChange}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        format={format}
        disabled={disabled}
        portal
        zIndex={1500}
        render={
          <PersianDateInput
            label={label}
            placeholder={placeholder}
            error={error}
            helperText={helperText}
            size={size}
            fullWidth={fullWidth}
            disabled={disabled}
            textFieldProps={textFieldProps}
          />
        }
      />
    </Box>
  );
};

export const presianDatePicker = PersianDatePicker;
export default PersianDatePicker;
