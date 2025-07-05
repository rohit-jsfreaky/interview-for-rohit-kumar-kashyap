const DetailsDialogSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-6 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-16 mb-1"></div>
          <div className="h-6 bg-gray-300 rounded w-20"></div>
        </div>
      </div>

      <div className="mb-6">
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b border-gray-200"
          >
            <div className="h-4 bg-gray-300 rounded w-24"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsDialogSkeleton;
