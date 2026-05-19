import { Stream } from "effect";
import { Observable, type Subscribable } from "rxjs";

import { observableToAsyncIterable } from "./to-async-iterable";

const defaultOnError = (error: unknown): unknown => error;

export function observableToStream<A>(
  observable: Observable<A> | Subscribable<A>,
): Stream.Stream<A, unknown>;
export function observableToStream<A, E>(
  observable: Observable<A> | Subscribable<A>,
  onError: (error: unknown) => E,
): Stream.Stream<A, E>;
export function observableToStream(
  observable: Observable<unknown> | Subscribable<unknown>,
  onError: (error: unknown) => unknown = defaultOnError,
): Stream.Stream<unknown, unknown> {
  return Stream.fromAsyncIterable(
    observableToAsyncIterable(observable),
    onError ?? defaultOnError,
  );
}
