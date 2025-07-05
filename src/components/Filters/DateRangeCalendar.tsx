import { useState } from "react";
import type { DateRange } from "../../types/filters";

interface DateRangeCalendarProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

const DateRangeCalendar = ({
  dateRange,
  onDateRangeChange,
}: DateRangeCalendarProps) => {
  const [leftMonth, setLeftMonth] = useState(new Date());
  const [rightMonth, setRightMonth] = useState(() => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  });

  const handleDateClick = (date: Date) => {
    if (!dateRange.startDate || (dateRange.startDate && dateRange.endDate)) {
      onDateRangeChange({ startDate: date, endDate: null });
    } else {
      if (date >= dateRange.startDate) {
        onDateRangeChange({ ...dateRange, endDate: date });
      } else {
        onDateRangeChange({ startDate: date, endDate: null });
      }
    }
  };

  const isDateInRange = (date: Date) => {
    if (!dateRange.startDate || !dateRange.endDate) return false;
    return date >= dateRange.startDate && date <= dateRange.endDate;
  };

  const isDateSelected = (date: Date) => {
    return (
      (dateRange.startDate &&
        date.toDateString() === dateRange.startDate.toDateString()) ||
      (dateRange.endDate &&
        date.toDateString() === dateRange.endDate.toDateString())
    );
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (
    direction: "prev" | "next",
    side: "left" | "right"
  ) => {
    if (side === "left") {
      setLeftMonth((prev) => {
        const newDate = new Date(prev);
        if (direction === "prev") {
          newDate.setMonth(newDate.getMonth() - 1);
        } else {
          newDate.setMonth(newDate.getMonth() + 1);
        }
        return newDate;
      });
    } else {
      setRightMonth((prev) => {
        const newDate = new Date(prev);
        if (direction === "prev") {
          newDate.setMonth(newDate.getMonth() - 1);
        } else {
          newDate.setMonth(newDate.getMonth() + 1);
        }
        return newDate;
      });
    }
  };

  const changeMonth = (direction: "up" | "down", side: "left" | "right") => {
    const setter = side === "left" ? setLeftMonth : setRightMonth;
    setter((prev) => {
      const newDate = new Date(prev);
      if (direction === "up") {
        newDate.setMonth(newDate.getMonth() + 1);
      } else {
        newDate.setMonth(newDate.getMonth() - 1);
      }
      return newDate;
    });
  };

  const changeYear = (direction: "up" | "down", side: "left" | "right") => {
    const setter = side === "left" ? setLeftMonth : setRightMonth;
    setter((prev) => {
      const newDate = new Date(prev);
      if (direction === "up") {
        newDate.setFullYear(newDate.getFullYear() + 1);
      } else {
        newDate.setFullYear(newDate.getFullYear() - 1);
      }
      return newDate;
    });
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const CalendarMonth = ({
    date,
    side,
  }: {
    date: Date;
    side: "left" | "right";
  }) => (
    <div className="flex-1 min-w-0">
      {/* Month/Year Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <button
          onClick={() => navigateMonth("prev", side)}
          className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex items-center space-x-2 sm:space-x-4 flex-1 justify-center">
          {/* Month Selector */}
          <div className="flex items-center">
            <span className="text-xs sm:text-sm font-medium px-1 sm:px-2 py-1 min-w-[60px] sm:min-w-[80px] text-center">
              {months[date.getMonth()]}
            </span>
            <div className="flex flex-col ml-1">
              <button
                onClick={() => changeMonth("up", side)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>
              <button
                onClick={() => changeMonth("down", side)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg
                  className="w-3 h-3"
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
              </button>
            </div>
          </div>

          {/* Year Selector */}
          <div className="flex items-center">
            <span className="text-xs sm:text-sm font-medium px-1 sm:px-2 py-1 min-w-[50px] sm:min-w-[60px] text-center">
              {date.getFullYear()}
            </span>
            <div className="flex flex-col ml-1">
              <button
                onClick={() => changeYear("up", side)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>
              <button
                onClick={() => changeYear("down", side)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg
                  className="w-3 h-3"
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
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigateMonth("next", side)}
          className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div
            key={day}
            className="text-center text-xs text-gray-500 py-1 sm:py-2 font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {getDaysInMonth(date).map((day, index) => (
          <div key={index} className="aspect-square">
            {day && (
              <button
                onClick={() => handleDateClick(day)}
                className={`w-full h-full text-xs sm:text-sm rounded-md flex items-center justify-center font-medium transition-colors ${
                  isDateSelected(day)
                    ? "bg-blue-500 text-white"
                    : isDateInRange(day)
                    ? "bg-blue-100 text-blue-900"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {day.getDate()}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      <CalendarMonth date={leftMonth} side="left" />
      <div className="lg:hidden">
        <CalendarMonth date={rightMonth} side="right" />
      </div>
      <div className="hidden lg:block">
        <CalendarMonth date={rightMonth} side="right" />
      </div>
    </div>
  );
};

export default DateRangeCalendar;
