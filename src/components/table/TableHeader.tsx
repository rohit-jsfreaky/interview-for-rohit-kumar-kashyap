import type { TableColumn } from "../../types/table";

interface TableHeaderProps {
  columns: TableColumn[];
}

const TableHeader = ({ columns }: TableHeaderProps) => {
  return (
    <thead className="bg-table-header-bg">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className={`px-6 py-3 text-${
              column.align || "left"
            } text-xs font-medium text-table-header-text uppercase tracking-wider ${
              column.width || ""
            }`}
          >
            <div className="flex items-center space-x-1 font-medium">
              <span>{column.label}</span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
