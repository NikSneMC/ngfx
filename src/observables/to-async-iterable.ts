import { Observable, type Subscribable } from "rxjs";

export function observableToAsyncIterable<A>(
  observable: Observable<A> | Subscribable<A>,
): AsyncIterable<A> {
  return {
    [Symbol.asyncIterator]() {
      const values: A[] = [];

      let done = false;
      let error: unknown = undefined;

      let resolve: ((result: IteratorResult<A>) => void) | undefined;

      let reject: ((reason?: unknown) => void) | undefined;

      const subscription = observable.subscribe({
        next(value) {
          if (resolve) {
            resolve({
              value,
              done: false,
            });

            resolve = undefined;
            reject = undefined;
          } else {
            values.push(value);
          }
        },

        error(err) {
          error = err;

          if (reject) {
            reject(err);

            resolve = undefined;
            reject = undefined;
          }
        },

        complete() {
          done = true;

          if (resolve) {
            resolve({
              value: undefined as never,
              done: true,
            });

            resolve = undefined;
            reject = undefined;
          }
        },
      });

      return {
        async next(): Promise<IteratorResult<A>> {
          if (values.length > 0) {
            return {
              value: values.shift()!,
              done: false,
            };
          }

          if (error) {
            throw error;
          }

          if (done) {
            return {
              value: undefined as never,
              done: true,
            };
          }

          return new Promise<IteratorResult<A>>((res, rej) => {
            resolve = res;
            reject = rej;
          });
        },

        async return() {
          subscription.unsubscribe();

          return {
            value: undefined as never,
            done: true,
          };
        },
      };
    },
  };
}
