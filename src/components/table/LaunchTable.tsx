import type { Launch } from "../../types/launch";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableEmptyState from "./TableEmptyState";
import LaunchTableLoadingSkeleton from "./LaunchTableLoadingSkeleton";
import {
  LAUNCH_TABLE_COLUMNS,
  LAUNCH_TABLE_EMPTY_STATE,
} from "../../config/launchTableConfig";
import { renderLaunchCell } from "../../utils/launchTableRenderers";

interface LaunchTableProps {
  launches: Launch[] | null;
  loading: boolean;
}

const LaunchTable = ({ launches, loading }: LaunchTableProps) => {
  const renderTableBody = () => {
    if (loading) {
      return Array.from({ length: 12 }).map((_, index) => (
        <LaunchTableLoadingSkeleton
          key={`skeleton-${index}`}
          columns={LAUNCH_TABLE_COLUMNS.length}
        />
      ));
    }

    if (!launches || launches.length === 0) {
      return (
        <TableEmptyState
          colSpan={LAUNCH_TABLE_COLUMNS.length}
          message={LAUNCH_TABLE_EMPTY_STATE.message}
          subMessage={LAUNCH_TABLE_EMPTY_STATE.subMessage}
        />
      );
    }

    return launches.map((launch, index) => (
      <TableRow
        key={launch.id}
        launch={launch}
        index={index}
        columns={LAUNCH_TABLE_COLUMNS}
        renderCell={renderLaunchCell}
      />
    ));
  };

  return (
    <div className="mt-12">
      <div className=" rounded-lg overflow-hidden shadow-lg border border-table-border">
        <div className="overflow-x-auto">
          <table className="min-w-full ">
            <TableHeader columns={LAUNCH_TABLE_COLUMNS} />
            <tbody className="bg-white  text-table-data-text">
              {renderTableBody()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LaunchTable;
