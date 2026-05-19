import { EventEmitter as NgEventEmitter } from "@angular/core";
import type { Stream } from "effect";

import { observableToStream } from "../../observables";

export class EventEmitter<T = any> {
  private readonly emitter: NgEventEmitter<T>;

  constructor(emitter: NgEventEmitter<T>);
  constructor(isAsync?: boolean);
  constructor(emitterOrIsAsync: NgEventEmitter<T> | boolean = false) {
    this.emitter =
      emitterOrIsAsync instanceof NgEventEmitter
        ? emitterOrIsAsync
        : new NgEventEmitter<T>(emitterOrIsAsync);
  }

  get source(): NgEventEmitter<T> {
    return this.emitter;
  }

  get observed(): boolean {
    return this.emitter.observed;
  }

  get stream(): Stream.Stream<T, unknown> {
    return observableToStream(this.emitter);
  }

  complete(): void {
    this.emitter.complete();
  }

  emit(value?: T): void {
    this.emitter.emit(value as T);
  }

  error(error: unknown): void {
    this.emitter.error(error);
  }
}
