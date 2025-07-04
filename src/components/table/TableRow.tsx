import type { Launch } from "../../types/launch";
import type { TableColumn } from "../../types/table";

interface TableRowProps {
  launch: Launch;
  index: number;
  columns: TableColumn[];
  renderCell: (launch: Launch, columnKey: string, index: number) => React.ReactNode;
}

const TableRow = ({ launch, index, columns, renderCell }: TableRowProps) => {
  return (
    <tr
      className="hover:bg-gray-100 transition-colors duration-150"
    >
      {columns.map((column) => (
        <td
          key={column.key}
          className={`px-6 py-4 whitespace-nowrap text-sm text-table-data-text ${column.width || ''}`}
        >
          {renderCell(launch, column.key, index)}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;