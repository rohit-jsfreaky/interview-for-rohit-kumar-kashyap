import { createContext, useContext, useState } from 'react';
import type { LaunchFilters, LaunchStatus, DateRange } from '../types/filters';
import type { ReactNode } from 'react';

interface FilterContextType {
  filters: LaunchFilters;
  presetLabel: string | null;
  updateDateRange: (dateRange: DateRange) => void;
  updateLaunchStatus: (status: LaunchStatus) => void;
  updatePresetLabel: (label: string | null) => void;
  clearFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const defaultFilters: LaunchFilters = {
  dateRange: { startDate: null, endDate: null },
  launchStatus: 'all'
};

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<LaunchFilters>(defaultFilters);
  const [presetLabel, setPresetLabel] = useState<string | null>('Past 6 Months');

  const updateDateRange = (dateRange: DateRange) => {
    setFilters(prev => ({ ...prev, dateRange }));
  };

  const updateLaunchStatus = (launchStatus: LaunchStatus) => {
    setFilters(prev => ({ ...prev, launchStatus }));
  };

  const updatePresetLabel = (label: string | null) => {
    setPresetLabel(label);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setPresetLabel(null);
  };

  return (
    <FilterContext.Provider value={{
      filters,
      presetLabel,
      updateDateRange,
      updateLaunchStatus,
      updatePresetLabel,
      clearFilters
    }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};