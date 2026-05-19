import { inject, Injectable, Type } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ActivatedRoute as NgActivatedRoute,
  UrlSegment,
  type Data,
  type ParamMap,
  type Params,
  type Route,
} from "@angular/router";
import type { Stream } from "effect";

import { observableToStream, streamToObservable } from "../../observables";
import { unexpectedObservableError } from "../error-handlers";

@Injectable({ providedIn: "root" })
export class ActivatedRoute {
  constructor(
    private readonly route: NgActivatedRoute = inject(NgActivatedRoute),
  ) {}

  get source(): NgActivatedRoute {
    return this.route;
  }

  get outlet(): string {
    return this.route.outlet;
  }

  set outlet(value: string) {
    this.route.outlet = value;
  }

  get component(): Type<any> | null {
    return this.route.component;
  }

  set component(value: Type<any> | null) {
    this.route.component = value;
  }

  get snapshot(): ActivatedRouteSnapshot {
    return this.route.snapshot;
  }

  set snapshot(value: ActivatedRouteSnapshot) {
    this.route.snapshot = value;
  }

  get title(): Stream.Stream<string | undefined> {
    return observableToStream<string | undefined, never>(
      this.route.title,
      unexpectedObservableError,
    );
  }

  get url(): Stream.Stream<UrlSegment[]> {
    return observableToStream<UrlSegment[], never>(
      this.route.url,
      unexpectedObservableError,
    );
  }

  set url(value: Stream.Stream<UrlSegment[]>) {
    this.route.url = streamToObservable(value);
  }

  get params(): Stream.Stream<Params> {
    return observableToStream<Params, never>(
      this.route.params,
      unexpectedObservableError,
    );
  }

  set params(value: Stream.Stream<Params>) {
    this.route.params = streamToObservable(value);
  }

  get queryParams(): Stream.Stream<Params> {
    return observableToStream<Params, never>(
      this.route.queryParams,
      unexpectedObservableError,
    );
  }

  set queryParams(value: Stream.Stream<Params>) {
    this.route.queryParams = streamToObservable(value);
  }

  get fragment(): Stream.Stream<string | null> {
    return observableToStream<string | null, never>(
      this.route.fragment,
      unexpectedObservableError,
    );
  }

  set fragment(value: Stream.Stream<string | null>) {
    this.route.fragment = streamToObservable(value);
  }

  get data(): Stream.Stream<Data> {
    return observableToStream<Data, never>(
      this.route.data,
      unexpectedObservableError,
    );
  }

  set data(value: Stream.Stream<Data>) {
    this.route.data = streamToObservable(value);
  }

  get paramMap(): Stream.Stream<ParamMap> {
    return observableToStream<ParamMap, never>(
      this.route.paramMap,
      unexpectedObservableError,
    );
  }

  get queryParamMap(): Stream.Stream<ParamMap> {
    return observableToStream<ParamMap, never>(
      this.route.queryParamMap,
      unexpectedObservableError,
    );
  }

  get routeConfig(): Route | null {
    return this.route.routeConfig;
  }

  get root(): ActivatedRoute {
    return new ActivatedRoute(this.route.root);
  }

  get parent(): ActivatedRoute | null {
    const parent = this.route.parent;
    return parent ? new ActivatedRoute(parent) : null;
  }

  get firstChild(): ActivatedRoute | null {
    const child = this.route.firstChild;
    return child ? new ActivatedRoute(child) : null;
  }

  get children(): ActivatedRoute[] {
    return this.route.children.map((child) => new ActivatedRoute(child));
  }

  get pathFromRoot(): ActivatedRoute[] {
    return this.route.pathFromRoot.map((child) => new ActivatedRoute(child));
  }

  toString(): string {
    return this.route.toString();
  }
}
