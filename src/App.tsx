import { useState } from "react";
import { getLaunches } from "./services/launches";
import type { Launch } from "./types/launch";
import LaunchTable from "./components/table/LaunchTable";
import Filters from "./components/Filters/Filters";

const App = () => {
  const [launches, setLaunches] = useState<Launch[] | null>([]);
  const [loading, setLoading] = useState(false);

  const handleFetchLaunches = async () => {
    setLoading(true);
    const { data, success, error } = await getLaunches({
      page: 1,
      limit: 12,
    });

    if (!success || !data) {
      console.error(error);
      setLoading(false);
      return;
    }

    setLaunches(data.docs);
    setLoading(false);
  };

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            SpaceX Launches
          </h1>
          <button
            onClick={handleFetchLaunches}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {loading ? "Loading..." : "Fetch Launches"}
          </button>
        </div>

        <Filters />
        {/* Launch Table */}
        <LaunchTable launches={launches} loading={loading} />
      </div>
    </div>
  );
};

export default App;
