interface TableEmptyStateProps {
  colSpan: number;
  message: string;
  subMessage?: string;
  icon?: React.ReactNode;
}

const TableEmptyState = ({ 
  colSpan, 
  message, 
  subMessage,
  icon 
}: TableEmptyStateProps) => {
  const defaultIcon = (
    <svg
      className="w-16 h-16 text-gray-600 mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H9a1 1 0 00-1 1v1m8 0H8"
      />
    </svg>
  );

  return (
    <tr>
      <td colSpan={colSpan} className="px-6 py-12 text-center text-gray-400">
        <div className="flex flex-col items-center">
          {icon || defaultIcon}
          <p className="text-lg font-medium">{message}</p>
          {subMessage && (
            <p className="text-sm mt-1">{subMessage}</p>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TableEmptyState;