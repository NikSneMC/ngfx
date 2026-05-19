import {
  AbstractControl as NgAbstractControl,
  FormGroup as NgFormGroup,
  type AbstractControlOptions,
  type AsyncValidatorFn,
  type ValidatorFn,
} from "@angular/forms";

import {
  AbstractControl,
  type AbstractControlLike,
  unwrapAbstractControl,
} from "./abstract-control";
import { wrapAbstractControl } from "./wrap-abstract-control";

const unwrapControls = (controls: Record<string, AbstractControlLike>) =>
  Object.fromEntries(
    Object.entries(controls).map(([key, control]) => [
      key,
      unwrapAbstractControl(control),
    ]),
  ) as Record<string, NgAbstractControl>;

export class FormGroup extends AbstractControl {
  constructor(group: NgFormGroup);
  constructor(
    controls: Record<string, AbstractControlLike>,
    validatorsOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  );
  constructor(
    controlsOrGroup: NgFormGroup | Record<string, AbstractControlLike>,
    validatorsOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    const ngGroup =
      controlsOrGroup instanceof NgFormGroup
        ? controlsOrGroup
        : new NgFormGroup(
            unwrapControls(controlsOrGroup),
            validatorsOrOpts,
            asyncValidators,
          );

    super(ngGroup);
  }

  override get source(): NgFormGroup {
    return this.control as NgFormGroup;
  }

  get controls(): Record<string, AbstractControl> {
    return Object.fromEntries(
      Object.entries(this.source.controls).map(([key, control]) => [
        key,
        wrapAbstractControl(control),
      ]),
    ) as Record<string, AbstractControl>;
  }

  addControl(name: string, control: AbstractControlLike, opts?: any): void {
    this.source.addControl(name, unwrapAbstractControl(control), opts);
  }

  at(controlName: string): AbstractControl | null {
    return this.get(controlName);
  }

  contains(controlName: string): boolean {
    return this.source.contains(controlName);
  }

  override get(path: (string | number)[] | string): AbstractControl | null {
    const control = this.source.get(path);
    return control ? wrapAbstractControl(control) : null;
  }

  override getRawValue(): any {
    return this.source.getRawValue();
  }

  override patchValue(value: Record<string, any>, options?: any): void {
    this.source.patchValue(value, options);
  }

  removeControl(name: string, opts?: any): void {
    this.source.removeControl(name, opts);
  }

  setControl(name: string, control: AbstractControlLike, opts?: any): void {
    this.source.setControl(name, unwrapAbstractControl(control), opts);
  }

  override setValue(value: Record<string, any>, options?: any): void {
    this.source.setValue(value, options);
  }
}
