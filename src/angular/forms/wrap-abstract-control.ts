import {
  FormArray as NgFormArray,
  FormControl as NgFormControl,
  FormGroup as NgFormGroup,
} from "@angular/forms";

import {
  AbstractControl,
  registerAbstractControlWrapper,
  type AnyNgAbstractControl,
} from "./abstract-control";
import { FormArray } from "./form-array";
import { FormControl } from "./form-control";
import { FormGroup } from "./form-group";

export function wrapAbstractControl(
  control: AnyNgAbstractControl,
): AbstractControl {
  if (control instanceof NgFormControl) {
    return new FormControl(control);
  }

  if (control instanceof NgFormGroup) {
    return new FormGroup(control);
  }

  if (control instanceof NgFormArray) {
    return new FormArray(control);
  }

  return new AbstractControl(control);
}

registerAbstractControlWrapper(wrapAbstractControl);
