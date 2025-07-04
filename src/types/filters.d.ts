export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface LaunchFilters {
  dateRange: DateRange;
  launchStatus: LaunchStatus;
}

export type LaunchStatus = 'all' | 'upcoming' | 'success' | 'failed';

export interface FilterOption {
  value: LaunchStatus;
  label: string;
  count?: number;
}

export interface DatePreset {
  label: string;
  value: string;
  getDateRange: () => DateRange;
}