import {
  inject,
  type ComponentRef,
  type EnvironmentInjector,
  type Signal,
} from "@angular/core";
import {
  ActivatedRoute as NgActivatedRoute,
  RouterOutlet as NgRouterOutlet,
  type Data,
} from "@angular/router";
import type { Stream } from "effect";

import { observableToStream } from "../../observables";
import { ActivatedRoute } from "./activated-route";

export class RouterOutlet {
  constructor(
    private readonly outlet: NgRouterOutlet = inject(NgRouterOutlet),
  ) {}

  get source(): NgRouterOutlet {
    return this.outlet;
  }

  get activateEvents(): Stream.Stream<unknown, unknown> {
    return observableToStream(this.outlet.activateEvents);
  }

  get activatedRoute(): ActivatedRoute | null {
    return this.outlet.activatedRoute
      ? new ActivatedRoute(this.outlet.activatedRoute)
      : null;
  }

  get activatedRouteData(): Data {
    return this.outlet.activatedRouteData;
  }

  get attachEvents(): Stream.Stream<unknown, unknown> {
    return observableToStream(this.outlet.attachEvents);
  }

  get component(): object {
    return this.outlet.component;
  }

  get deactivateEvents(): Stream.Stream<unknown, unknown> {
    return observableToStream(this.outlet.deactivateEvents);
  }

  get detachEvents(): Stream.Stream<unknown, unknown> {
    return observableToStream(this.outlet.detachEvents);
  }

  get isActivated(): boolean {
    return this.outlet.isActivated;
  }

  get name(): string {
    return this.outlet.name;
  }

  set name(value: string) {
    this.outlet.name = value;
  }

  get routerOutletData(): Signal<unknown> {
    return this.outlet.routerOutletData;
  }

  get supportsBindingToComponentInputs(): true | undefined {
    return this.outlet.supportsBindingToComponentInputs;
  }

  activateWith(
    activatedRoute: ActivatedRoute | NgActivatedRoute,
    environmentInjector: EnvironmentInjector,
  ): void {
    this.outlet.activateWith(
      activatedRoute instanceof ActivatedRoute
        ? activatedRoute.source
        : activatedRoute,
      environmentInjector,
    );
  }

  attach(
    ref: ComponentRef<unknown>,
    activatedRoute: ActivatedRoute | NgActivatedRoute,
  ): void {
    this.outlet.attach(
      ref,
      activatedRoute instanceof ActivatedRoute
        ? activatedRoute.source
        : activatedRoute,
    );
  }

  deactivate(): void {
    this.outlet.deactivate();
  }

  detach(): ComponentRef<unknown> {
    return this.outlet.detach();
  }
}
