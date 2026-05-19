import {
  HttpClient as NgHttpClient,
  HttpRequest,
  type HttpErrorResponse,
  type HttpEvent,
} from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import type { Stream } from "effect";
import { type Observable } from "rxjs";

import { observableToStream } from "../../../observables";
import { httpErrorHandler } from "../../error-handlers";

@Injectable({ providedIn: "root" })
export class HttpClient {
  constructor(private readonly http: NgHttpClient = inject(NgHttpClient)) {}

  get source(): NgHttpClient {
    return this.http;
  }

  private toStream<T>(
    observable: Observable<T>,
  ): Stream.Stream<T, HttpErrorResponse> {
    return observableToStream<T, HttpErrorResponse>(
      observable,
      httpErrorHandler,
    );
  }

  get<T>(
    url: string,
    options?: Parameters<NgHttpClient["get"]>[1],
  ): Stream.Stream<T, HttpErrorResponse> {
    return this.toStream(this.http.get<T>(url, options));
  }

  post<T>(
    url: string,
    body: unknown,
    options?: Parameters<NgHttpClient["post"]>[2],
  ): Stream.Stream<T, HttpErrorResponse> {
    return this.toStream(this.http.post<T>(url, body, options));
  }

  put<T>(
    url: string,
    body: unknown,
    options?: Parameters<NgHttpClient["put"]>[2],
  ): Stream.Stream<T, HttpErrorResponse> {
    return this.toStream(this.http.put<T>(url, body, options));
  }

  patch<T>(
    url: string,
    body: unknown,
    options?: Parameters<NgHttpClient["patch"]>[2],
  ): Stream.Stream<T, HttpErrorResponse> {
    return this.toStream(this.http.patch<T>(url, body, options));
  }

  delete<T>(
    url: string,
    options?: Parameters<NgHttpClient["delete"]>[1],
  ): Stream.Stream<T, HttpErrorResponse> {
    return this.toStream(this.http.delete<T>(url, options));
  }

  head<T = string>(
    url: string,
    options?: Parameters<NgHttpClient["head"]>[1],
  ): Stream.Stream<T, HttpErrorResponse> {
    return this.toStream(this.http.head<T>(url, options));
  }

  options<T>(
    url: string,
    options?: Parameters<NgHttpClient["options"]>[1],
  ): Stream.Stream<T, HttpErrorResponse> {
    return this.toStream(this.http.options<T>(url, options));
  }

  jsonp<T>(
    url: string,
    callbackParam: string,
  ): Stream.Stream<T, HttpErrorResponse> {
    return this.toStream(this.http.jsonp<T>(url, callbackParam));
  }

  request<R>(
    req: HttpRequest<unknown>,
  ): Stream.Stream<HttpEvent<R>, HttpErrorResponse>;
  request<R>(
    method: string,
    url: string,
    options?: unknown,
  ): Stream.Stream<R, HttpErrorResponse>;
  request<R>(
    methodOrRequest: string | HttpRequest<unknown>,
    url?: string,
    options?: unknown,
  ): Stream.Stream<R | HttpEvent<R>, HttpErrorResponse> {
    if (methodOrRequest instanceof HttpRequest) {
      return this.toStream(this.http.request<R>(methodOrRequest));
    }

    return this.toStream(
      this.http.request(
        methodOrRequest,
        url!,
        options as Parameters<NgHttpClient["request"]>[2],
      ) as Observable<R | HttpEvent<R>>,
    );
  }
}
