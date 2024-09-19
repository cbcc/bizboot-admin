import type {
  Method,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig
} from "axios";

export type resultType = {
  accessToken?: string;
};

export type RequestMethods = Extract<
  Method,
  "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;

export class HttpError extends Error {
  cause?: AxiosError;
  isCancelRequest?: boolean;
  status?: string;
  message?: string;
  exception?: any;
  timestamp?: Date;

  constructor(error: AxiosError) {
    super();
    this.cause = error;
    if (error.response.data) {
      this.status = error.response.data.status;
      this.message = error.response.data.message;
      this.exception = error.response.data.exception;
      this.timestamp = error.response.data.timestamp;
    } else {
      this.status = error.response.code;
      this.message = error.message;
    }
  }
}

export interface PureHttpResponse extends AxiosResponse {
  config: PureHttpRequestConfig;
}

export interface PureHttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: PureHttpRequestConfig) => void;
  beforeResponseCallback?: (response: PureHttpResponse) => void;
}

export default class PureHttp {
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: PureHttpRequestConfig
  ): Promise<T>;
  post<T, P>(
    url: string,
    params?: P,
    config?: PureHttpRequestConfig
  ): Promise<T>;
  get<T, P>(
    url: string,
    params?: P,
    config?: PureHttpRequestConfig
  ): Promise<T>;
}
