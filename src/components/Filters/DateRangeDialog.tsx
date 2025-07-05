import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import DateRangeCalendar from "./DateRangeCalendar";
import { DATE_PRESETS } from "../../config/filterConfig";
import type { DateRange } from "../../types/filters";

interface DateRangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onPresetChange: (presetLabel: string | null) => void;
}

const DateRangeDialog = ({
  open,
  onOpenChange,
  dateRange,
  onDateRangeChange,
  onPresetChange,
}: DateRangeDialogProps) => {
  const [tempDateRange, setTempDateRange] = useState<DateRange>(dateRange);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setTempDateRange(dateRange);
    }
  }, [open, dateRange]);

  const handlePresetClick = (preset: (typeof DATE_PRESETS)[0]) => {
    const range = preset.getDateRange();
    setTempDateRange(range);
    setSelectedPreset(preset.label);

    onDateRangeChange(range);
    onPresetChange(preset.label);
    onOpenChange(false);

    console.log("Applied Date Filter (Preset):", {
      preset: preset.label,
      dateRange: range,
      startDate: range.startDate?.toISOString(),
      endDate: range.endDate?.toISOString(),
    });
  };

  const handleCustomDateChange = (range: DateRange) => {
    setTempDateRange(range);
    setSelectedPreset(null);
  };

  const handleApply = () => {
    onDateRangeChange(tempDateRange);
    onPresetChange(selectedPreset);
    onOpenChange(false);

    console.log("Applied Date Filter (Custom):", {
      preset: selectedPreset,
      dateRange: tempDateRange,
      startDate: tempDateRange.startDate?.toISOString(),
      endDate: tempDateRange.endDate?.toISOString(),
    });
  };

  const handleClear = () => {
    setTempDateRange({ startDate: null, endDate: null });
    setSelectedPreset(null);

    onDateRangeChange({ startDate: null, endDate: null });
    onPresetChange(null);
    onOpenChange(false);

    console.log("Cleared Date Filter");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[50vw] max-w-none">
        <DialogHeader>
          <DialogTitle>Select Date Range</DialogTitle>
        </DialogHeader>

        <div className="flex">
          <div className="w-48 pr-6 border-r">
            <div className="space-y-2">
              {DATE_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => handlePresetClick(preset)}
                  className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                    selectedPreset === preset.label
                      ? "bg-blue-100 text-blue-900 font-medium"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
              <button
                onClick={handleClear}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="flex-1 pl-6">
            <DateRangeCalendar
              dateRange={tempDateRange}
              onDateRangeChange={handleCustomDateChange}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleApply}>Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DateRangeDialog;
