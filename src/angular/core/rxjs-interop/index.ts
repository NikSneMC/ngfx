import type {
  BaseResourceOptions,
  DestroyRef,
  Injector,
  OutputOptions,
  OutputRef,
  ResourceLoaderParams,
  ResourceRef,
  Signal,
} from "@angular/core";
import {
  outputFromObservable,
  outputToObservable,
  pendingUntilEvent as pendingUntilObservableEvent,
  rxResource,
  takeUntilDestroyed as takeUntilObservableDestroyed,
  toObservable,
  toSignal as toAngularSignal,
  type ToObservableOptions as AngularToObservableOptions,
  type ToSignalOptions,
} from "@angular/core/rxjs-interop";
import { Stream } from "effect";
import type { Observable, Subscribable } from "rxjs";

import { observableToStream, streamToObservable } from "../../../observables";
import { throwError } from "../../error-handlers";

type ToSignalSource<T> =
  | Stream.Stream<T, unknown>
  | Observable<T>
  | Subscribable<T>;

export type ToStreamOptions = AngularToObservableOptions;

export interface StreamResourceOptions<T, R> extends BaseResourceOptions<T, R> {
  stream: (params: ResourceLoaderParams<R>) => Stream.Stream<T, unknown>;
}

const castError = <E>(error: unknown): E => error as E;

const toObservableSource = <T>(
  source: ToSignalSource<T>,
): Observable<T> | Subscribable<T> =>
  Stream.isStream(source) ? streamToObservable(source) : source;

export function outputFromStream<T>(
  stream: Stream.Stream<T, unknown>,
  opts?: OutputOptions,
): OutputRef<T> {
  return outputFromObservable(streamToObservable(stream), opts);
}

export function outputToStream<T>(ref: OutputRef<T>): Stream.Stream<T> {
  return observableToStream<T, never>(outputToObservable(ref), throwError);
}

export function takeUntilDestroyed<A>(
  destroyRef?: DestroyRef,
): <E>(stream: Stream.Stream<A, E>) => Stream.Stream<A, E> {
  return <E>(stream: Stream.Stream<A, E>) =>
    observableToStream<A, E>(
      takeUntilObservableDestroyed<A>(destroyRef)(streamToObservable(stream)),
      castError<E>,
    );
}

export function toStream<T>(
  source: Signal<T>,
  options?: ToStreamOptions,
): Stream.Stream<T, unknown> {
  return observableToStream<T, unknown>(
    toObservable(source, options),
    castError<unknown>,
  );
}

export function toSignal<T>(source: ToSignalSource<T>): Signal<T | undefined>;
export function toSignal<T>(
  source: ToSignalSource<T>,
  options: NoInfer<ToSignalOptions<T | undefined>> & {
    initialValue?: undefined;
    requireSync?: false;
  },
): Signal<T | undefined>;
export function toSignal<T>(
  source: ToSignalSource<T>,
  options: NoInfer<ToSignalOptions<T | null>> & {
    initialValue?: null;
    requireSync?: false;
  },
): Signal<T | null>;
export function toSignal<T>(
  source: ToSignalSource<T>,
  options: NoInfer<ToSignalOptions<T>> & {
    initialValue?: undefined;
    requireSync: true;
  },
): Signal<T>;
export function toSignal<T, const U extends T>(
  source: ToSignalSource<T>,
  options: NoInfer<ToSignalOptions<T | U>> & {
    initialValue: U;
    requireSync?: false;
  },
): Signal<T | U>;
export function toSignal<T, U = undefined>(
  source: ToSignalSource<T>,
  options?: ToSignalOptions<T | U> & {
    initialValue?: U;
  },
): Signal<T | U> {
  return toAngularSignal(toObservableSource(source), options as any) as Signal<
    T | U
  >;
}

export function pendingUntilEvent<A>(
  injector?: Injector,
): <E>(stream: Stream.Stream<A, E>) => Stream.Stream<A, E> {
  return <E>(stream: Stream.Stream<A, E>) =>
    observableToStream<A, E>(
      pendingUntilObservableEvent<A>(injector)(streamToObservable(stream)),
      castError<E>,
    );
}

export function streamResource<T, R>(
  opts: StreamResourceOptions<T, R> & {
    defaultValue: NoInfer<T>;
  },
): ResourceRef<T>;
export function streamResource<T, R>(
  opts: StreamResourceOptions<T, R>,
): ResourceRef<T | undefined>;
export function streamResource<T, R>(
  opts: StreamResourceOptions<T, R>,
): ResourceRef<T | undefined> {
  return rxResource({
    ...opts,
    stream: (params) => streamToObservable(opts.stream(params)),
  });
}

export type { ToSignalOptions };
