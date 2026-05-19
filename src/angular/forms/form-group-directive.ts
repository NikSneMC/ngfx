import { inject } from "@angular/core";
import { FormGroupDirective as NgFormGroupDirective } from "@angular/forms";

import { AbstractFormDirective } from "./abstract-form-directive";
import { FormGroup } from "./form-group";

export class FormGroupDirective extends AbstractFormDirective {
  constructor(
    protected readonly directive: NgFormGroupDirective = inject(
      NgFormGroupDirective,
    ),
  ) {
    super(directive);
  }

  override get source(): NgFormGroupDirective {
    return this.directive;
  }

  override get control(): FormGroup {
    return new FormGroup(this.directive.control);
  }

  override get form(): FormGroup {
    return new FormGroup(this.directive.form);
  }
}
