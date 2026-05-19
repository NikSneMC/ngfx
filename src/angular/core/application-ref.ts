import {
  ApplicationRef as NgApplicationRef,
  inject,
  Injectable,
  type ComponentRef,
  type EnvironmentInjector,
  type Type,
  type ViewRef,
} from "@angular/core";
import type { Stream } from "effect";

import { observableToStream } from "../../observables";
import { unexpectedObservableError } from "../error-handlers";

@Injectable({ providedIn: "root" })
export class ApplicationRef {
  constructor(
    private readonly applicationRef: NgApplicationRef = inject(
      NgApplicationRef,
    ),
  ) {}

  get source(): NgApplicationRef {
    return this.applicationRef;
  }

  get components(): ComponentRef<any>[] {
    return this.applicationRef.components;
  }

  get componentTypes(): Type<any>[] {
    return this.applicationRef.componentTypes;
  }

  get destroyed(): boolean {
    return this.applicationRef.destroyed;
  }

  get injector(): EnvironmentInjector {
    return this.applicationRef.injector;
  }

  get isStable(): Stream.Stream<boolean> {
    return observableToStream<boolean, never>(
      this.applicationRef.isStable,
      unexpectedObservableError,
    );
  }

  get viewCount(): number {
    return this.applicationRef.viewCount;
  }

  attachView(viewRef: ViewRef): void {
    this.applicationRef.attachView(viewRef);
  }

  bootstrap<C>(
    component: Type<C>,
    rootSelectorOrNode?: string | Element,
  ): ComponentRef<C> {
    return this.applicationRef.bootstrap(component, rootSelectorOrNode);
  }

  destroy(): void {
    this.applicationRef.destroy();
  }

  detachView(viewRef: ViewRef): void {
    this.applicationRef.detachView(viewRef);
  }

  onDestroy(callback: () => void): VoidFunction {
    return this.applicationRef.onDestroy(callback);
  }

  tick(): void {
    this.applicationRef.tick();
  }

  whenStable(): Promise<void> {
    return this.applicationRef.whenStable();
  }
}
