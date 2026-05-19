import { NgZone as NgNgZone, inject, Injectable } from "@angular/core";
import type { Stream } from "effect";

import { observableToStream } from "../../observables";

@Injectable({ providedIn: "root" })
export class NgZone {
  constructor(private readonly zone: NgNgZone = inject(NgNgZone)) {}

  static isInAngularZone(): boolean {
    return NgNgZone.isInAngularZone();
  }

  static assertInAngularZone(): void {
    NgNgZone.assertInAngularZone();
  }

  static assertNotInAngularZone(): void {
    NgNgZone.assertNotInAngularZone();
  }

  get source(): NgNgZone {
    return this.zone;
  }

  get hasPendingMacrotasks(): boolean {
    return this.zone.hasPendingMacrotasks;
  }

  get hasPendingMicrotasks(): boolean {
    return this.zone.hasPendingMicrotasks;
  }

  get isStable(): boolean {
    return this.zone.isStable;
  }

  get onError(): Stream.Stream<any, unknown> {
    return observableToStream(this.zone.onError);
  }

  get onMicrotaskEmpty(): Stream.Stream<any, unknown> {
    return observableToStream(this.zone.onMicrotaskEmpty);
  }

  get onStable(): Stream.Stream<any, unknown> {
    return observableToStream(this.zone.onStable);
  }

  get onUnstable(): Stream.Stream<any, unknown> {
    return observableToStream(this.zone.onUnstable);
  }

  run<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[]): T {
    return this.zone.run(fn, applyThis, applyArgs);
  }

  runGuarded<T>(
    fn: (...args: any[]) => T,
    applyThis?: any,
    applyArgs?: any[],
  ): T {
    return this.zone.runGuarded(fn, applyThis, applyArgs);
  }

  runOutsideAngular<T>(
    fn: (...args: any[]) => T,
    applyThis?: any,
    applyArgs?: any[],
  ): T {
    return this.zone.runOutsideAngular(() =>
      fn.apply(applyThis, applyArgs ?? []),
    );
  }

  runTask<T>(
    fn: (...args: any[]) => T,
    applyThis?: any,
    applyArgs?: any[],
    name?: string,
  ): T {
    return this.zone.runTask(fn, applyThis, applyArgs, name);
  }
}
