import { Effect, Fiber, Stream } from "effect";
import { Observable } from "rxjs";

export const streamToObservable = <A, E>(
  stream: Stream.Stream<A, E>,
): Observable<A> =>
  new Observable((subscriber) => {
    const fiber = Stream.runForEach(stream, (value) =>
      Effect.sync(() => subscriber.next(value)),
    ).pipe(
      Effect.catch((error) => Effect.sync(() => subscriber.error(error))),
      Effect.ensuring(Effect.sync(() => subscriber.complete())),
      Effect.runFork,
    );

    return () => {
      fiber.pipe(Fiber.interrupt, Effect.runFork);
    };
  });
