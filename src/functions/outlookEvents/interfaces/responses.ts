import { EventChildren, EventZoho } from "./zoho";

export interface ErrorResponse {
  isError: boolean;
  msg: string;
}

export interface responseFull {
  children: EventChildren[];
  childrenEcxeptions: EventZoho[];
  error: ErrorResponse;
}
