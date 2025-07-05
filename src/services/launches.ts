import type {
  Launch,
  LaunchDetail,
  LaunchDetailResponse,
  LaunchQueryParams,
} from "@/types/launch";
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
export const getLaunchDetail = async (launchId: string) => {
  try {
    const response = await axiosInstance.post<LaunchDetailResponse>(
      "/launches/query",
      {
        query: {
          _id: launchId,
        },
        options: {
          limit: 1,
          select: {
            name: 1,
            rocket: 1,
            success: 1,
            links: 1,
            details: 1,
            flight_number: 1,
            payloads: 1,
            date_utc: 1,
            launchpad: 1,
          },
          populate: [
            {
              path: "rocket",
              select: {
                name: 1,
                type: 1,
              },
            },
            {
              path: "payloads",
              select: {
                type: 1,
                manufacturers: 1,
                nationalities: 1,
                orbit: 1,
              },
            },
            {
              path: "launchpad",
              select: {
                name: 1,
              },
            },
          ],
        },
      }
    );

    return {
      success: true,
      message: "Launch details fetched successfully",
      data: response.data.docs?.[0] || null,
    };
  } catch (error: unknown) {
    const err = error as Error;
    return {
      success: false,
      message: "Failed to fetch launch details",
      error: err.message || "Unknown error",
      data: null,
    };
  }
};

export const getLaunchObject = (data: LaunchDetail) => {
  const image = data.links.patch.small || data.links.patch.large;

  const name = data.name;

  const status =
    data.success === true
      ? "Success"
      : data.success === false
      ? "Failed"
      : "Upcoming";

  const rocketName = data.rocket.name;

  const rocketType = data.rocket.type;

  const details = data.details ?? null;

  const articleLink = data.links.article ?? null;

  const wikipediaLink = data.links.wikipedia ?? null;

  const youtubeLink = data.links.webcast;

  const flightNumber = data.flight_number;

  const missionName = data.name;

  const manufacturer = data.payloads[0]?.manufacturers?.[0] ?? null;

  const nationality = data.payloads[0]?.nationalities?.[0] ?? null;

  const launchDate = data.date_utc;

  const payloadType = data.payloads[0]?.type ?? null;

  const orbit = data.payloads[0]?.orbit ?? null;

  const launchSite = data.launchpad.name;

  return {
    image,
    name,
    status,
    rocketName,
    rocketType,
    details,
    articleLink,
    wikipediaLink,
    youtubeLink,
    flightNumber,
    missionName,
    manufacturer,
    nationality,
    launchDate,
    payloadType,
    orbit,
    launchSite,
  };
};
