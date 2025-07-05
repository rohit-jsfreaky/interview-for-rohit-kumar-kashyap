import type { FilterOption, DatePreset } from "../types/filters";

export const LAUNCH_STATUS_OPTIONS: FilterOption[] = [
  { value: "all", label: "All Launches" },
  { value: "upcoming", label: "Upcoming Launches" },
  { value: "success", label: "Successful Launches" },
  { value: "failed", label: "Failed Launches" },
];

export const DATE_PRESETS: DatePreset[] = [
  {
    label: "Past Week",
    value: "past_week",
    getDateRange: () => ({
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    }),
  },
  {
    label: "Past Month",
    value: "past_month",
    getDateRange: () => ({
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    }),
  },
  {
    label: "Past 3 Months",
    value: "past_3_months",
    getDateRange: () => ({
      startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    }),
  },
  {
    label: "Past 6 Months",
    value: "past_6_months",
    getDateRange: () => ({
      startDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    }),
  },
  {
    label: "Past Year",
    value: "past_year",
    getDateRange: () => ({
      startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    }),
  },
  {
    label: "Past 2 Years",
    value: "past_2_years",
    getDateRange: () => ({
      startDate: new Date(Date.now() - 730 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    }),
  },
];
