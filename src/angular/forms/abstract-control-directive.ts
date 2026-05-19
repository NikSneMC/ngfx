import {
  AbstractControlDirective as NgAbstractControlDirective,
  type AsyncValidatorFn,
  type ValidationErrors,
  type ValidatorFn,
} from "@angular/forms";
import type { Stream } from "effect";

import { observableToStream } from "../../observables";
import { unexpectedObservableError } from "../error-handlers";
import { type AbstractControl } from "./abstract-control";
import { wrapAbstractControl } from "./wrap-abstract-control";

export class AbstractControlDirective {
  constructor(protected readonly directive: NgAbstractControlDirective) {}

  get source(): NgAbstractControlDirective {
    return this.directive;
  }

  get asyncValidator(): AsyncValidatorFn | null {
    return this.directive.asyncValidator;
  }

  get control(): AbstractControl | null {
    return this.directive.control
      ? wrapAbstractControl(this.directive.control)
      : null;
  }

  get dirty(): boolean | null {
    return this.directive.dirty;
  }

  get disabled(): boolean | null {
    return this.directive.disabled;
  }

  get enabled(): boolean | null {
    return this.directive.enabled;
  }

  get errors(): ValidationErrors | null {
    return this.directive.errors;
  }

  get invalid(): boolean | null {
    return this.directive.invalid;
  }

  get path(): string[] | null {
    return this.directive.path;
  }

  get pending(): boolean | null {
    return this.directive.pending;
  }

  get pristine(): boolean | null {
    return this.directive.pristine;
  }

  get status(): string | null {
    return this.directive.status;
  }

  get statusChanges(): Stream.Stream<any> | null {
    return this.directive.statusChanges
      ? observableToStream<any, never>(
          this.directive.statusChanges,
          unexpectedObservableError,
        )
      : null;
  }

  get touched(): boolean | null {
    return this.directive.touched;
  }

  get untouched(): boolean | null {
    return this.directive.untouched;
  }

  get valid(): boolean | null {
    return this.directive.valid;
  }

  get validator(): ValidatorFn | null {
    return this.directive.validator;
  }

  get value(): any {
    return this.directive.value;
  }

  get valueChanges(): Stream.Stream<any> | null {
    return this.directive.valueChanges
      ? observableToStream<any, never>(
          this.directive.valueChanges,
          unexpectedObservableError,
        )
      : null;
  }

  getError(errorCode: string, path?: Array<string | number> | string): any {
    return this.directive.getError(errorCode, path);
  }

  hasError(errorCode: string, path?: Array<string | number> | string): boolean {
    return this.directive.hasError(errorCode, path);
  }

  reset(value?: any): void {
    this.directive.reset(value);
  }
}
