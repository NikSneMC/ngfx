import { inject } from "@angular/core";
import { FormArrayDirective as NgFormArrayDirective } from "@angular/forms";

import { AbstractFormDirective } from "./abstract-form-directive";
import { FormArray } from "./form-array";

export class FormArrayDirective extends AbstractFormDirective {
  constructor(
    protected readonly directive: NgFormArrayDirective = inject(
      NgFormArrayDirective,
    ),
  ) {
    super(directive);
  }

  override get source(): NgFormArrayDirective {
    return this.directive;
  }

  override get control(): FormArray {
    return new FormArray(this.directive.control);
  }

  override get form(): FormArray {
    return new FormArray(this.directive.form);
  }
}
