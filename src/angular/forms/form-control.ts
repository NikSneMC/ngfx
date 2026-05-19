import {
  FormControl as NgFormControl,
  type AbstractControlOptions,
  type AsyncValidatorFn,
  type FormControlState,
  type ValidatorFn,
} from "@angular/forms";

import { AbstractControl } from "./abstract-control";

export class FormControl<T = any> extends AbstractControl<T> {
  constructor(control: NgFormControl<T>);
  constructor(
    formState?: FormControlState<T> | T,
    validatorsOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  );
  constructor(
    controlOrFormState?: NgFormControl<T> | FormControlState<T> | T,
    validatorsOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    const ngControl =
      controlOrFormState instanceof NgFormControl
        ? controlOrFormState
        : new NgFormControl(
            controlOrFormState,
            validatorsOrOpts,
            asyncValidators,
          );

    super(ngControl);
  }

  override get source(): NgFormControl<T> {
    return this.control as NgFormControl<T>;
  }

  override getRawValue(): T {
    return this.source.getRawValue();
  }

  override patchValue(value: T, options?: any): void {
    this.source.patchValue(value, options);
  }

  override setValue(value: T, options?: any): void {
    this.source.setValue(value, options);
  }
}
