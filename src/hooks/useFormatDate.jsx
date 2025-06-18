// hooks/useFormatDate.js
import { useMemo } from "react";

export default function useFormatDate(dateInput) {
  return useMemo(() => {
    if (!dateInput) return "";
    const date = new Date(dateInput);
    return date.toLocaleDateString("default", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [dateInput]);
}
