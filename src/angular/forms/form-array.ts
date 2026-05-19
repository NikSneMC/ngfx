import {
  FormArray as NgFormArray,
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

const unwrapControls = (controls: AbstractControlLike[]) =>
  controls.map((control) => unwrapAbstractControl(control));

export class FormArray extends AbstractControl {
  constructor(array: NgFormArray);
  constructor(
    controls: AbstractControlLike[],
    validatorsOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  );
  constructor(
    controlsOrArray: NgFormArray | AbstractControlLike[],
    validatorsOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    const ngArray =
      controlsOrArray instanceof NgFormArray
        ? controlsOrArray
        : new NgFormArray(
            unwrapControls(controlsOrArray),
            validatorsOrOpts,
            asyncValidators,
          );

    super(ngArray);
  }

  override get source(): NgFormArray {
    return this.control as NgFormArray;
  }

  get controls(): AbstractControl[] {
    return this.source.controls.map((control) => wrapAbstractControl(control));
  }

  get length(): number {
    return this.source.length;
  }

  at(index: number): AbstractControl {
    return wrapAbstractControl(this.source.at(index));
  }

  clear(opts?: any): void {
    this.source.clear(opts);
  }

  override getRawValue(): any {
    return this.source.getRawValue();
  }

  insert(index: number, control: AbstractControlLike, opts?: any): void {
    this.source.insert(index, unwrapAbstractControl(control), opts);
  }

  override patchValue(value: any[], options?: any): void {
    this.source.patchValue(value, options);
  }

  push(control: AbstractControlLike | AbstractControlLike[], opts?: any): void {
    this.source.push(
      Array.isArray(control)
        ? unwrapControls(control)
        : unwrapAbstractControl(control),
      opts,
    );
  }

  removeAt(index: number, opts?: any): void {
    this.source.removeAt(index, opts);
  }

  setControl(index: number, control: AbstractControlLike, opts?: any): void {
    this.source.setControl(index, unwrapAbstractControl(control), opts);
  }

  override setValue(value: any[], options?: any): void {
    this.source.setValue(value, options);
  }
}
