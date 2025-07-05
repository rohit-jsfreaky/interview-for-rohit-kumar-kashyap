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
  query?: Record<string, unknown>;
  page?: number;
  limit?: number;
}

export interface LaunchDetailResponse {
  docs: LaunchDetail[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface LaunchDetail {
  id: string;
  name: string;
  flight_number: number;
  date_utc: string;
  success: boolean | null;
  details: string;
  rocket: {
    id: string;
    name: string;
    type: string;
  };
  payloads: Payload[];
  launchpad: {
    id: string;
    name: string;
  };
  links: Links;
}

export interface Payload {
  id: string;
  type: string;
  orbit: string;
  manufacturers: string[];
  nationalities: string[];
}

export interface Links {
  patch: {
    small: string;
    large: string;
  };
  reddit: {
    campaign: string | null;
    launch: string | null;
    media: string | null;
    recovery: string | null;
  };
  flickr: {
    small: string[];
    original: string[];
  };
  presskit: string | null;
  webcast: string;
  youtube_id: string;
  article: string;
  wikipedia: string;
}
