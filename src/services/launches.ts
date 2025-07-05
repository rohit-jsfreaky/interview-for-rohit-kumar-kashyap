import type { Launch, LaunchQueryParams } from "@/types/launch";
import type { ApiResponse } from "@/types/api";
import { axiosInstance } from "./axiosInstance";

export const getLaunches = async ({
  query,
  page,
  limit = 12,
}: LaunchQueryParams): Promise<
  ApiResponse<{
    docs: Launch[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  }>
> => {
  try {
    const response = await axiosInstance.post("/launches/query", {
      query: query || {},
      options: {
        limit,
        page,
        sort: { date_utc: "desc" },
        select: {
          flight_number: 1,
          date_utc: 1,
          launchpad: 1,
          name: 1,
          payloads: 1,
          success: 1,
          upcoming: 1,
          rocket: 1,
        },
        populate: [
          { path: "rocket", select: { name: 1 } },
          { path: "payloads", select: { orbit: 1 } },
          { path: "launchpad", select: { name: 1 } },
        ],
      },
    });

    return {
      success: true,
      message: "Launches fetched successfully",
      data: response.data,
    };
  } catch (error: unknown) {
    const err = error as Error;
    return {
      success: false,
      message: "Failed to fetch launches",
      error: err.message || "Unknown error",
      data: null,
    };
  }
};
