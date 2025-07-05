import type { TableColumn } from "../types/table";

export const LAUNCH_TABLE_COLUMNS: TableColumn[] = [
  {
    key: "no",
    label: "No:",
    width: "w-16",
    align: "left"
  },
  {
    key: "date_utc", 
    label: "Launched (UTC)",
    sortable: true,
    width: "w-48",
    align: "left"
  },
  {
    key: "launchpad",
    label: "Location", 
    width: "w-40",
    align: "left"
  },
  {
    key: "name",
    label: "Mission",
    width: "w-44",
    align: "left"
  },
  {
    key: "orbit",
    label: "Orbit",
    width: "w-24",
    align: "left"
  },
  {
    key: "status",
    label: "Launch Status",
    width: "w-32",
    align: "left"
  },
  {
    key: "rocket",
    label: "Rocket",
    width: "w-28",
    align: "left"
  }
];

export const LAUNCH_TABLE_EMPTY_STATE = {
  message: "No launch data available",
  subMessage: "Click \"Fetch Launches\" to load SpaceX mission data"
};