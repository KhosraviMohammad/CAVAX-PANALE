import type { TypographyOptions } from "@mui/material/styles/createTypography";

export const typography: TypographyOptions = {
  fontFamily: ["Vazirmatn", "Space Grotesk", "sans-serif"].join(","),
  h1: {
    fontWeight: 900,
    fontSize: "3.5rem",
  },
  h2: {
    fontWeight: 800,
    fontSize: "2.25rem",
  },
  h3: {
    fontWeight: 700,
    fontSize: "1.75rem",
  },
  h4: {
    fontWeight: 700,
    fontSize: "1.5rem",
  },
  h5: {
    fontWeight: 600,
    fontSize: "1.25rem",
  },
  h6: {
    fontWeight: 600,
    fontSize: "1rem",
  },
  body1: {
    fontSize: "1rem",
    lineHeight: 1.6,
  },
  body2: {
    fontSize: "0.875rem",
    lineHeight: 1.5,
  },
  button: {
    fontWeight: 700,
    textTransform: "none",
  },
};
