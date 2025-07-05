import { useState } from "react";
import { Button } from "../ui/button";
import DateRangeDialog from "./DateRangeDialog";
import LaunchStatusDropdown from "./LaunchStatusDropdown";
import { useFilters } from "../../contexts/FilterContext";

const Filters = () => {
  const [isDateDialogOpen, setIsDateDialogOpen] = useState(false);
  const {
    filters,
    presetLabel,
    updateDateRange,
    updateLaunchStatus,
    updatePresetLabel,
  } = useFilters();

  const formatDateRange = () => {
    if (presetLabel) {
      return presetLabel;
    }

    if (!filters.dateRange.startDate && !filters.dateRange.endDate) {
      return "Select Date Range";
    }

    if (filters.dateRange.startDate && !filters.dateRange.endDate) {
      return `From ${filters.dateRange.startDate.toLocaleDateString()}`;
    }

    if (filters.dateRange.startDate && filters.dateRange.endDate) {
      return `${filters.dateRange.startDate.toLocaleDateString()} - ${filters.dateRange.endDate.toLocaleDateString()}`;
    }

    return "Select Date Range";
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 sm:space-x-4">
        <Button
          variant="outline"
          onClick={() => setIsDateDialogOpen(true)}
          className="text-filter-text font-medium w-full sm:w-auto justify-start sm:justify-center"
        >
          <svg
            className="w-4 h-4 mr-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="truncate">{formatDateRange()}</span>
          <svg
            className="w-4 h-4 ml-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>

        <div className="w-full sm:w-auto">
          <LaunchStatusDropdown
            selectedStatus={filters.launchStatus}
            onStatusChange={updateLaunchStatus}
          />
        </div>
      </div>
      <DateRangeDialog
        open={isDateDialogOpen}
        onOpenChange={setIsDateDialogOpen}
        dateRange={filters.dateRange}
        onDateRangeChange={updateDateRange}
        onPresetChange={updatePresetLabel}
      />
    </div>
  );
};

export default Filters;
