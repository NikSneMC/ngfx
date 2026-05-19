import {
  AbstractControl as NgAbstractControl,
  type AsyncValidatorFn,
  type ControlEvent,
  type FormControlStatus,
  type ValidationErrors,
  type ValidatorFn,
} from "@angular/forms";
import type { Stream } from "effect";

import { observableToStream } from "../../observables";
import { unexpectedObservableError } from "../error-handlers";

export type AnyNgAbstractControl = NgAbstractControl<any, any, any>;
export type AbstractControlLike = AbstractControl | AnyNgAbstractControl;

let wrapControl = (control: AnyNgAbstractControl): AbstractControl =>
  new AbstractControl(control);

export function registerAbstractControlWrapper(
  wrapper: (control: AnyNgAbstractControl) => AbstractControl,
): void {
  wrapControl = wrapper;
}

export function unwrapAbstractControl(
  control: AbstractControlLike,
): AnyNgAbstractControl {
  return control instanceof AbstractControl ? control.source : control;
}

export class AbstractControl<TValue = any> {
  constructor(protected readonly control: AnyNgAbstractControl) {}

  get source(): AnyNgAbstractControl {
    return this.control;
  }

  get asyncValidator(): AsyncValidatorFn | null {
    return this.control.asyncValidator;
  }

  get dirty(): boolean {
    return this.control.dirty;
  }

  get disabled(): boolean {
    return this.control.disabled;
  }

  get enabled(): boolean {
    return this.control.enabled;
  }

  get errors(): ValidationErrors | null {
    return this.control.errors;
  }

  get events(): Stream.Stream<ControlEvent<TValue>> {
    return observableToStream<ControlEvent<TValue>, never>(
      this.control.events,
      unexpectedObservableError,
    );
  }

  get invalid(): boolean {
    return this.control.invalid;
  }

  get parent(): AbstractControl | null {
    return this.control.parent ? wrapControl(this.control.parent) : null;
  }

  get pending(): boolean {
    return this.control.pending;
  }

  get pristine(): boolean {
    return this.control.pristine;
  }

  get root(): AbstractControl {
    return wrapControl(this.control.root);
  }

  get status(): FormControlStatus {
    return this.control.status;
  }

  get statusChanges(): Stream.Stream<FormControlStatus> {
    return observableToStream<FormControlStatus, never>(
      this.control.statusChanges,
      unexpectedObservableError,
    );
  }

  get touched(): boolean {
    return this.control.touched;
  }

  get untouched(): boolean {
    return this.control.untouched;
  }

  get updateOn(): "change" | "blur" | "submit" {
    return this.control.updateOn;
  }

  get valid(): boolean {
    return this.control.valid;
  }

  get validator(): ValidatorFn | null {
    return this.control.validator;
  }

  get value(): TValue {
    return this.control.value;
  }

  get valueChanges(): Stream.Stream<TValue> {
    return observableToStream<TValue, never>(
      this.control.valueChanges,
      unexpectedObservableError,
    );
  }

  addAsyncValidators(validators: AsyncValidatorFn | AsyncValidatorFn[]): void {
    this.control.addAsyncValidators(validators);
  }

  addValidators(validators: ValidatorFn | ValidatorFn[]): void {
    this.control.addValidators(validators);
  }

  clearAsyncValidators(): void {
    this.control.clearAsyncValidators();
  }

  clearValidators(): void {
    this.control.clearValidators();
  }

  disable(opts?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    this.control.disable(opts);
  }

  enable(opts?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    this.control.enable(opts);
  }

  get(path: Array<string | number> | string): AbstractControl | null {
    const control = this.control.get(path);
    return control ? wrapControl(control) : null;
  }

  getError(errorCode: string, path?: Array<string | number> | string): any {
    return this.control.getError(errorCode, path);
  }

  getRawValue(): any {
    return this.control.getRawValue();
  }

  hasAsyncValidator(validator: AsyncValidatorFn): boolean {
    return this.control.hasAsyncValidator(validator);
  }

  hasError(errorCode: string, path?: Array<string | number> | string): boolean {
    return this.control.hasError(errorCode, path);
  }

  hasValidator(validator: ValidatorFn): boolean {
    return this.control.hasValidator(validator);
  }

  markAllAsDirty(opts?: { emitEvent?: boolean }): void {
    this.control.markAllAsDirty(opts);
  }

  markAllAsTouched(opts?: { emitEvent?: boolean }): void {
    this.control.markAllAsTouched(opts);
  }

  markAsDirty(opts?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    this.control.markAsDirty(opts);
  }

  markAsPending(opts?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    this.control.markAsPending(opts);
  }

  markAsPristine(opts?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    this.control.markAsPristine(opts);
  }

  markAsTouched(opts?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    this.control.markAsTouched(opts);
  }

  markAsUntouched(opts?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    this.control.markAsUntouched(opts);
  }

  patchValue(value: TValue, options?: any): void {
    this.control.patchValue(value, options);
  }

  removeAsyncValidators(
    validators: AsyncValidatorFn | AsyncValidatorFn[],
  ): void {
    this.control.removeAsyncValidators(validators);
  }

  removeValidators(validators: ValidatorFn | ValidatorFn[]): void {
    this.control.removeValidators(validators);
  }

  reset(value?: any, options?: any): void {
    this.control.reset(value, options);
  }

  setAsyncValidators(
    validators: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ): void {
    this.control.setAsyncValidators(validators);
  }

  setErrors(
    errors: ValidationErrors | null,
    opts?: { emitEvent?: boolean },
  ): void {
    this.control.setErrors(errors, opts);
  }

  setParent(parent: AbstractControlLike | null): void {
    this.control.setParent(
      (parent ? unwrapAbstractControl(parent) : null) as any,
    );
  }

  setValidators(validators: ValidatorFn | ValidatorFn[] | null): void {
    this.control.setValidators(validators);
  }

  setValue(value: any, options?: any): void {
    this.control.setValue(value, options);
  }

  updateValueAndValidity(opts?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void {
    this.control.updateValueAndValidity(opts);
  }
}
