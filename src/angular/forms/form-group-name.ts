import { inject } from "@angular/core";
import { FormGroupName as NgFormGroupName } from "@angular/forms";

import { AbstractControlDirective } from "./abstract-control-directive";
import { FormGroup } from "./form-group";

export class FormGroupName extends AbstractControlDirective {
  constructor(
    protected readonly directive: NgFormGroupName = inject(NgFormGroupName),
  ) {
    super(directive);
  }

  override get source(): NgFormGroupName {
    return this.directive;
  }

  override get control(): FormGroup {
    return new FormGroup(this.directive.control);
  }
}
