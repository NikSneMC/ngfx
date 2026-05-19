import { HttpErrorResponse } from "@angular/common/http";

export function unexpectedObservableError(error: unknown): never {
  throw error;
}

export function errorHandler(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error));
}

export function httpErrorHandler(error: unknown): HttpErrorResponse {
  if (error instanceof HttpErrorResponse) {
    return error;
  }

  throw error;
}

export const throwError = unexpectedObservableError;
