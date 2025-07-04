export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  flight_number: number;
  success: boolean | null;
  upcoming: boolean;

  rocket: {
    id: string;
    name: string;
  };

  launchpad: {
    id: string;
    name: string;
  };

  payloads: Array<{
    id: string;
    orbit: string;
  }>;
}

export interface LaunchQueryParams {
  page?: number;
  limit?: number;
}
