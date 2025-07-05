interface LaunchTableLoadingSkeletonProps {
  columns: number;
}

const LaunchTableLoadingSkeleton = ({ columns }: LaunchTableLoadingSkeletonProps) => {
  return (
    <tr className="">
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="px-6 py-4">
          <div className="animate-pulse bg-gray-300 h-4 rounded"></div>
        </td>
      ))}
    </tr>
  );
};

export default LaunchTableLoadingSkeleton;
