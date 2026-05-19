import { inject } from "@angular/core";
import {
  RouterLink,
  RouterLinkActive as NgRouterLinkActive,
  type IsActiveMatchOptions,
} from "@angular/router";
import type { Stream } from "effect";

import { observableToStream } from "../../observables";
import { QueryList } from "../core";

export class RouterLinkActive {
  constructor(
    private readonly routerLinkActive: NgRouterLinkActive = inject(
      NgRouterLinkActive,
    ),
  ) {}

  get source(): NgRouterLinkActive {
    return this.routerLinkActive;
  }

  get ariaCurrentWhenActive():
    | "page"
    | "step"
    | "location"
    | "date"
    | "time"
    | true
    | false
    | undefined {
    return this.routerLinkActive.ariaCurrentWhenActive;
  }

  set ariaCurrentWhenActive(
    value:
      | "page"
      | "step"
      | "location"
      | "date"
      | "time"
      | true
      | false
      | undefined,
  ) {
    this.routerLinkActive.ariaCurrentWhenActive = value;
  }

  get isActive(): boolean {
    return this.routerLinkActive.isActive;
  }

  get isActiveChange(): Stream.Stream<boolean, unknown> {
    return observableToStream(this.routerLinkActive.isActiveChange);
  }

  get links(): QueryList<RouterLink> {
    return new QueryList(this.routerLinkActive.links);
  }

  get routerLinkActiveOptions():
    | { exact: boolean }
    | Partial<IsActiveMatchOptions> {
    return this.routerLinkActive.routerLinkActiveOptions;
  }

  set routerLinkActiveOptions(
    value: { exact: boolean } | Partial<IsActiveMatchOptions>,
  ) {
    this.routerLinkActive.routerLinkActiveOptions = value;
  }
}
