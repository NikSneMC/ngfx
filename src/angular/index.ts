export * as common from "./common";
export * as core from "./core";
export * as forms from "./forms";
export * as router from "./router";
export * from "./error-handlers";

export const neverFn = (error: unknown): never => {
  throw error;
};
