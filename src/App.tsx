import { useEffect, useState } from "react";
import {
  getLaunchDetail,
  getLaunches,
  getLaunchObject,
} from "./services/launches";
import type { Launch } from "./types/launch";
import LaunchTable from "./components/table/LaunchTable";
import Filters from "./components/Filters/Filters";
import { useFilters } from "./contexts/FilterContext";
import { getQuery } from "./services/getQuery";
import PaginationComponent from "./components/Pagination/Pagination";
import PaginationInfo from "./components/Pagination/PaginationInfo";
import { handleSetPaginationData } from "./services/pagination";
import DetailsDialog from "./components/Detail/DetailsDialog";
import Navbar from "./components/Layout/Navbar";

const App = () => {
  const [launches, setLaunches] = useState<Launch[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [totalDocs, setTotalDocs] = useState(0);
  const [limit, setLimit] = useState(12);
  const [launchDetail, setLaunchDetail] = useState<any>(null);
  const [launchDetailLoading, setLaunchDetailLoading] = useState(false);
  const [launchDialogOpen, setLaunchDialogOpen] = useState(false);

  const [paginationData, setPaginationData] = useState({
    totalPages: 0,
    currentPage: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null as number | null,
    nextPage: null as number | null,
  });

  const { filters } = useFilters();

  useEffect(() => {
    const responseQuery: Record<string, unknown> = getQuery(filters);

    const fetchQueryResonses = async () => {
      await handleFetchLaunches(responseQuery, 1);
    };

    fetchQueryResonses();
  }, [filters]);

  useEffect(() => {
    const fetchInitialLaunches = async () => {
      await handleFetchLaunches();
    };

    fetchInitialLaunches();
  }, []);

  const handleFetchLaunches = async (
    query?: Record<string, unknown>,
    page: number = 1
  ) => {
    setLoading(true);
    const { data, success, error } = await getLaunches({
      query,
      page,
      limit: 12,
    });

    if (!success || !data) {
      console.error(error);
      setLoading(false);
      return;
    }

    setLaunches(data.docs);
    setTotalDocs(data.totalDocs);
    setLimit(data.limit);
    setPaginationData(handleSetPaginationData(data));
    setLoading(false);
  };

  const handlePageChange = (newPage: number) => {
    const responseQuery: Record<string, unknown> = getQuery(filters);
    handleFetchLaunches(responseQuery, newPage);
  };

  const handleRowClick = async (launch: Launch) => {
    console.log("Launch ID:", launch.id);
    setLaunchDialogOpen(true);
    setLaunchDetailLoading(true);

    const { data, success, error } = await getLaunchDetail(launch.id);

    if (!success || !data) {
      console.error(error);
      setLaunchDetailLoading(false);
      return;
    }

    const LaunchObject = getLaunchObject(data);
    setLaunchDetail(LaunchObject);
    setLaunchDetailLoading(false);
  };

  return (
    <div className="min-h-screen text-white mb-10">
      <Navbar />
      <div className="container mx-auto px-4 py-4">
        <Filters />
        <LaunchTable
          launches={launches}
          loading={loading}
          onRowClick={handleRowClick}
        />

        <PaginationInfo
          paginationData={paginationData}
          totalDocs={totalDocs}
          limit={limit}
        />

        <PaginationComponent
          paginationData={paginationData}
          onPageChange={handlePageChange}
        />

        <DetailsDialog
          isOpen={launchDialogOpen}
          launchDetail={launchDetail}
          loading={launchDetailLoading}
          setIsOpen={setLaunchDialogOpen}
        />
      </div>
    </div>
  );
};

export default App;
