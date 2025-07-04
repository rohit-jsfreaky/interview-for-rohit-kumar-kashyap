import type { Launch } from "../types/launch";

export const getStatusBadge = (
  success: boolean | null,
  upcoming: boolean
): string => {
  if (upcoming) return "bg-upcoming-status-bg text-upcoming-status-text";
  if (success === true) return "bg-success-status-bg text-success-status-text";
  if (success === false) return "bg-failed-status-bg text-failed-status-text";
  return "bg-gray-100 text-gray-800";
};

export const getStatusText = (
  success: boolean | null,
  upcoming: boolean
): string => {
  if (upcoming) return "Upcoming";
  if (success === true) return "Success";
  if (success === false) return "Failed";
  return "Unknown";
};

export const formatLaunchDate = (dateUtc: string): string => {
  const date = new Date(dateUtc);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${formattedDate} at ${formattedTime}`;
};

export const renderLaunchCell = (
  launch: Launch,
  columnKey: string,
  index: number
): React.ReactNode => {
  switch (columnKey) {
    case "no":
      return <span className="">{String(index + 1).padStart(2, "0")}</span>;

    case "date_utc":
      return formatLaunchDate(launch.date_utc);

    case "launchpad":
      return launch.launchpad.name;

    case "name":
      return launch.name;

    case "orbit":
      return launch.payloads && launch.payloads.length > 0
        ? launch.payloads[0].orbit
        : "N/A";

    case "status":
      return (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
            launch.success,
            launch.upcoming
          )}`}
        >
          {getStatusText(launch.success, launch.upcoming)}
        </span>
      );

    case "rocket":
      return launch.rocket.name;

    default:
      return null;
  }
};
