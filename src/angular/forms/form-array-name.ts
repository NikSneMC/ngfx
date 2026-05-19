import { inject } from "@angular/core";
import { FormArrayName as NgFormArrayName } from "@angular/forms";

import { AbstractControlDirective } from "./abstract-control-directive";
import { FormArray } from "./form-array";

export class FormArrayName extends AbstractControlDirective {
  constructor(
    protected readonly directive: NgFormArrayName = inject(NgFormArrayName),
  ) {
    super(directive);
  }

  override get source(): NgFormArrayName {
    return this.directive;
  }

  override get control(): FormArray {
    return new FormArray(this.directive.control);
  }
}
