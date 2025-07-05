import type { LaunchFilters } from "@/types/filters";

export const getQuery = (filters: LaunchFilters): Record<string, unknown> => {
  if (!filters.dateRange.startDate || !filters.dateRange.endDate) {
    if (filters.launchStatus === "all") {
      return {};
    } else if (filters.launchStatus === "upcoming") {
      return { upcoming: true };
    } else if (filters.launchStatus === "success") {
      return { success: true };
    } else if (filters.launchStatus === "failed") {
      return { success: false, upcoming: false };
    } else {
      console.error("Invalid launch status:", filters.launchStatus);
      return {};
    }
  } else {
    console.log("Using date range:", filters.dateRange);
    console.log("Date range is set");
    return {
      date_utc: {
        $gte: filters.dateRange.startDate.toISOString(),
        $lte: filters.dateRange.endDate.toISOString(),
      },
    };
  }
};
