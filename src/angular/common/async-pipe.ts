import { AsyncPipe as NgAsyncPipe } from "@angular/common";
import { inject } from "@angular/core";
import type { Stream } from "effect";

import { streamToObservable } from "../../observables";

const isPromiseLike = (value: unknown): value is PromiseLike<unknown> =>
  typeof value === "object" && value !== null && "then" in value;

export class AsyncPipe {
  constructor(private readonly pipe: NgAsyncPipe = inject(NgAsyncPipe)) {}

  get source(): NgAsyncPipe {
    return this.pipe;
  }

  transform<T>(obj: Stream.Stream<T, unknown>): T | null;
  transform<T>(obj: Stream.Stream<T, unknown> | null | undefined): T | null;
  transform<T>(obj: Stream.Stream<T, unknown> | PromiseLike<T>): T | null;
  transform<T>(
    obj: Stream.Stream<T, unknown> | PromiseLike<T> | null | undefined,
  ): T | null {
    if (obj == null || isPromiseLike(obj)) {
      return this.pipe.transform(obj);
    }

    return this.pipe.transform(streamToObservable(obj));
  }

  ngOnDestroy(): void {
    this.pipe.ngOnDestroy();
  }
}
