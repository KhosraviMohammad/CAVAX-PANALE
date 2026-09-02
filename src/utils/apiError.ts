export interface ParsedApiError {
  /** Map of field name to field error message */
  fieldErrors: Record<string, string>;
  /** Single general/non-field error message */
  generalError: string | null;
}

/**
 * Parses RTK Query / Axios error objects into a structured format:
 * - Status 5xx / Server errors: returns fallbackMessage in generalError.
 * - Status 4xx / Client errors:
 *   - General keys ("detail", "message", "non_field_errors", "error") -> generalError
 *   - Form field keys -> fieldErrors
 */
export const parseApiError = (
  err: unknown,
  knownFields?: string[],
  fallbackMessage = "خطا در ارتباط با سرور",
): ParsedApiError => {
  const result: ParsedApiError = {
    fieldErrors: {},
    generalError: null,
  };

  if (!err || typeof err !== "object") {
    result.generalError = fallbackMessage;
    return result;
  }

  const errorObj = err as {
    data?: Record<string, unknown>;
    status?: number | string;
    originalStatus?: number | string;
    statusNumber?: number;
  };

  const statusNumber =
    typeof errorObj.statusNumber === "number"
      ? errorObj.statusNumber
      : Number(errorObj.statusNumber);

  // Handle 5xx server errors
  if (statusNumber >= 500) {
    result.generalError = fallbackMessage;
    return result;
  }

  const errorData = errorObj.data;

  // Handle 4xx client errors
  if (errorData && typeof errorData === "object" && !Array.isArray(errorData)) {
    const generalKeys = ["detail", "message", "non_field_errors", "error"];

    Object.entries(errorData).forEach(([key, val]) => {
      let message = "";
      if (Array.isArray(val) && val.length > 0) {
        message = typeof val[0] === "string" ? val[0] : String(val[0]);
      } else if (typeof val === "string" || typeof val === "number") {
        message = String(val);
      }

      if (!message) return;
      const isKnownField = knownFields ? knownFields.includes(key) : false;

      if (isKnownField) {
        result.fieldErrors[key] = message;
      } else if (generalKeys.includes(key)) {
        result.generalError = message;
        return;
      }
    });
  } else if (typeof errorData === "string") {
    result.generalError = errorData;
  }

  // Fallback if no error messages were parsed and no field errors exist
  if (Object.keys(result.fieldErrors).length === 0 && !result.generalError) {
    result.generalError = fallbackMessage;
  }

  return result;
};
