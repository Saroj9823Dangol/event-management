export interface IPaginatedResponse<T> {
  data: T[];
  meta: {
    per_page: number;
    to: number;
    total: number;
    current_page: number;
    last_page: number;
    from: number;
  };
}

// Types
export interface IErrorResponse {
  status: number;
  data: {
    errors: {
      detail: string;
      source: {
        pointer: string;
      };
    }[];
  };
}
