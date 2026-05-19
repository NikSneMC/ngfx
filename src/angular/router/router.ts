import { inject, Injectable, type Signal } from "@angular/core";
import {
  Router as NgRouter,
  type Event,
  RouterState,
  RouteReuseStrategy,
  type OnSameUrlNavigation,
  type Routes,
  type Navigation,
  type UrlCreationOptions,
  UrlTree,
  type NavigationBehaviorOptions,
  type NavigationExtras,
  type IsActiveMatchOptions,
} from "@angular/router";
import type { Stream } from "effect";

import { observableToStream } from "../../observables";
import { unexpectedObservableError } from "../error-handlers";

@Injectable({ providedIn: "root" })
export class Router {
  constructor(private readonly router: NgRouter = inject(NgRouter)) {}

  get source(): NgRouter {
    return this.router;
  }

  get events(): Stream.Stream<Event> {
    return observableToStream<Event, never>(
      this.router.events,
      unexpectedObservableError,
    );
  }

  get routerState(): RouterState {
    return this.router.routerState;
  }

  get navigated(): boolean {
    return this.router.navigated;
  }

  set navigated(value: boolean) {
    this.router.navigated = value;
  }

  get routeReuseStrategy(): RouteReuseStrategy {
    return this.router.routeReuseStrategy;
  }

  set routeReuseStrategy(value: RouteReuseStrategy) {
    this.router.routeReuseStrategy = value;
  }

  get onSameUrlNavigation(): OnSameUrlNavigation {
    return this.router.onSameUrlNavigation;
  }

  set onSameUrlNavigation(value: OnSameUrlNavigation) {
    this.router.onSameUrlNavigation = value;
  }

  get config(): Routes {
    return this.router.config;
  }

  set config(value: Routes) {
    this.router.config = value;
  }

  get componentInputBindingEnabled(): boolean {
    return this.router.componentInputBindingEnabled;
  }

  get currentNavigation(): Signal<Navigation | null> {
    return this.router.currentNavigation;
  }

  initialNavigation(): void {
    return this.router.initialNavigation();
  }

  setUpLocationChangeListener(): void {
    return this.router.setUpLocationChangeListener();
  }

  get url(): string {
    return this.router.url;
  }

  getCurrentNavigation(): Navigation | null {
    return this.router.getCurrentNavigation();
  }

  get lastSuccessfulNavigation(): Signal<Navigation | null> {
    return this.router.lastSuccessfulNavigation;
  }

  resetConfig(config: Routes): void {
    return this.router.resetConfig(config);
  }

  ngOnDestroy(): void {
    return this.router.ngOnDestroy();
  }

  dispose(): void {
    return this.router.dispose();
  }

  createUrlTree(
    commands: readonly any[],
    navigationExtras?: UrlCreationOptions,
  ): UrlTree {
    return this.router.createUrlTree(commands, navigationExtras);
  }

  navigateByUrl(
    url: string | UrlTree,
    extras?: NavigationBehaviorOptions,
  ): Promise<boolean> {
    return this.router.navigateByUrl(url, extras);
  }

  navigate(
    commands: readonly any[],
    extras?: NavigationExtras,
  ): Promise<boolean> {
    return this.router.navigate(commands, extras);
  }

  serializeUrl(url: UrlTree): string {
    return this.router.serializeUrl(url);
  }

  parseUrl(url: string): UrlTree {
    return this.router.parseUrl(url);
  }

  isActive(url: string | UrlTree, exact: boolean): boolean;

  isActive(
    url: string | UrlTree,
    matchOptions: Partial<IsActiveMatchOptions>,
  ): boolean;

  /**
   * @internal
   */
  isActive(
    url: string | UrlTree,
    matchOptions: boolean | Partial<IsActiveMatchOptions>,
  ): boolean {
    return typeof matchOptions === "boolean"
      ? this.router.isActive(url, matchOptions)
      : this.router.isActive(url, matchOptions);
  }
}
