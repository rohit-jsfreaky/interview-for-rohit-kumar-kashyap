import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { LAUNCH_STATUS_OPTIONS } from '../../config/filterConfig';
import type { LaunchStatus } from '../../types/filters';

interface LaunchStatusDropdownProps {
  selectedStatus: LaunchStatus;
  onStatusChange: (status: LaunchStatus) => void;
  launchCounts?: Record<LaunchStatus, number>;
}

const LaunchStatusDropdown = ({ 
  selectedStatus, 
  onStatusChange,
  launchCounts 
}: LaunchStatusDropdownProps) => {
  const getStatusLabel = (status: LaunchStatus) => {
    const option = LAUNCH_STATUS_OPTIONS.find(opt => opt.value === status);
    return option?.label || 'All Launches';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-filter-text">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {getStatusLabel(selectedStatus)}
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {LAUNCH_STATUS_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onStatusChange(option.value)}
            className={selectedStatus === option.value ? 'bg-blue-50' : ''}
          >
            <div className="flex items-center justify-between w-full">
              <span>{option.label}</span>
              {launchCounts && launchCounts[option.value] && (
                <span className="text-xs text-gray-500">
                  ({launchCounts[option.value]})
                </span>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LaunchStatusDropdown;