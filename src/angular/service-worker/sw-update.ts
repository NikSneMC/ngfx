import { inject, Injectable } from "@angular/core";
import {
  SwUpdate as NgSwUpdate,
  type UnrecoverableStateEvent,
  type VersionEvent,
} from "@angular/service-worker";
import type { Stream } from "effect";

import { observableToStream } from "../../observables";
import { unexpectedObservableError } from "../error-handlers";

@Injectable({ providedIn: "root" })
export class SwUpdate {
  constructor(private readonly swUpdate: NgSwUpdate = inject(NgSwUpdate)) {}

  get source(): NgSwUpdate {
    return this.swUpdate;
  }

  get isEnabled(): boolean {
    return this.swUpdate.isEnabled;
  }

  get unrecoverable(): Stream.Stream<UnrecoverableStateEvent> {
    return observableToStream<UnrecoverableStateEvent, never>(
      this.swUpdate.unrecoverable,
      unexpectedObservableError,
    );
  }

  get versionUpdates(): Stream.Stream<VersionEvent> {
    return observableToStream<VersionEvent, never>(
      this.swUpdate.versionUpdates,
      unexpectedObservableError,
    );
  }

  activateUpdate(): Promise<boolean> {
    return this.swUpdate.activateUpdate();
  }

  checkForUpdate(): Promise<boolean> {
    return this.swUpdate.checkForUpdate();
  }
}
