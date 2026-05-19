import { QueryList as NgQueryList } from "@angular/core";
import { Stream } from "effect";

import { observableToStream } from "../../observables";
import { unexpectedObservableError } from "../error-handlers";

export class QueryList<T> implements Iterable<T> {
  private readonly queryList: NgQueryList<T>;

  constructor(queryList?: NgQueryList<T>);
  constructor(emitDistinctChangesOnly?: boolean);
  constructor(
    queryListOrEmitDistinctChangesOnly: NgQueryList<T> | boolean = false,
  ) {
    this.queryList =
      queryListOrEmitDistinctChangesOnly instanceof NgQueryList
        ? queryListOrEmitDistinctChangesOnly
        : new NgQueryList(queryListOrEmitDistinctChangesOnly);
  }

  get source(): NgQueryList<T> {
    return this.queryList;
  }

  get changes(): Stream.Stream<QueryList<T>> {
    return observableToStream<NgQueryList<T>, never>(
      this.queryList.changes,
      unexpectedObservableError,
    ).pipe(Stream.map((queryList) => new QueryList(queryList)));
  }

  get dirty(): boolean {
    return this.queryList.dirty;
  }

  get first(): T {
    return this.queryList.first;
  }

  get last(): T {
    return this.queryList.last;
  }

  get length(): number {
    return this.queryList.length;
  }

  destroy(): void {
    this.queryList.destroy();
  }

  filter<S extends T>(
    predicate: (value: T, index: number, array: readonly T[]) => value is S,
  ): S[];
  filter(
    predicate: (value: T, index: number, array: readonly T[]) => unknown,
  ): T[];
  filter(
    predicate: (value: T, index: number, array: readonly T[]) => unknown,
  ): T[] {
    return this.queryList.filter(predicate);
  }

  find(
    predicate: (item: T, index: number, array: T[]) => boolean,
  ): T | undefined {
    return this.queryList.find(predicate);
  }

  forEach(fn: (item: T, index: number, array: T[]) => void): void {
    this.queryList.forEach(fn);
  }

  get(index: number): T | undefined {
    return this.queryList.get(index);
  }

  map<U>(fn: (item: T, index: number, array: T[]) => U): U[] {
    return this.queryList.map(fn);
  }

  notifyOnChanges(): void {
    this.queryList.notifyOnChanges();
  }

  reduce<U>(
    fn: (previous: U, current: T, index: number, array: T[]) => U,
    initial: U,
  ): U {
    return this.queryList.reduce(fn, initial);
  }

  reset(
    resultsTree: Array<T | any[]>,
    identityAccessor?: (value: T) => unknown,
  ): void {
    this.queryList.reset(resultsTree, identityAccessor);
  }

  setDirty(): void {
    this.queryList.setDirty();
  }

  some(fn: (value: T, index: number, array: T[]) => boolean): boolean {
    return this.queryList.some(fn);
  }

  toArray(): T[] {
    return this.queryList.toArray();
  }

  toString(): string {
    return this.queryList.toString();
  }

  [Symbol.iterator](): Iterator<T> {
    return this.queryList[Symbol.iterator]();
  }
}

export const wrapQueryList = <T>(queryList: NgQueryList<T>): QueryList<T> =>
  new QueryList(queryList);
