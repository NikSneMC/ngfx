import { inject, Injectable } from "@angular/core";
import { SwPush as NgSwPush } from "@angular/service-worker";
import type { Stream } from "effect";

import { observableToStream } from "../../observables";
import { errorHandler, unexpectedObservableError } from "../error-handlers";

type NotificationEventPayload = {
  action: string;
  notification: NotificationOptions & {
    title: string;
  };
};

type PushSubscriptionChange = {
  oldSubscription: PushSubscription | null;
  newSubscription: PushSubscription | null;
};

@Injectable({ providedIn: "root" })
export class SwPush {
  constructor(private readonly swPush: NgSwPush = inject(NgSwPush)) {}

  get source(): NgSwPush {
    return this.swPush;
  }

  get isEnabled(): boolean {
    return this.swPush.isEnabled;
  }

  get messages(): Stream.Stream<object> {
    return observableToStream<object, never>(
      this.swPush.messages,
      unexpectedObservableError,
    );
  }

  get notificationClicks(): Stream.Stream<NotificationEventPayload> {
    return observableToStream<NotificationEventPayload, never>(
      this.swPush.notificationClicks,
      unexpectedObservableError,
    );
  }

  get notificationCloses(): Stream.Stream<NotificationEventPayload> {
    return observableToStream<NotificationEventPayload, never>(
      this.swPush.notificationCloses,
      unexpectedObservableError,
    );
  }

  get pushSubscriptionChanges(): Stream.Stream<PushSubscriptionChange> {
    return observableToStream<PushSubscriptionChange, never>(
      this.swPush.pushSubscriptionChanges,
      unexpectedObservableError,
    );
  }

  get subscription(): Stream.Stream<PushSubscription | null, Error> {
    return observableToStream<PushSubscription | null, Error>(
      this.swPush.subscription,
      errorHandler,
    );
  }

  requestSubscription(options: {
    serverPublicKey: string;
  }): Promise<PushSubscription> {
    return this.swPush.requestSubscription(options);
  }

  unsubscribe(): Promise<void> {
    return this.swPush.unsubscribe();
  }
}
