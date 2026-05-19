import { inject } from "@angular/core";
import { NgModelGroup as NgNgModelGroup } from "@angular/forms";

import { AbstractControlDirective } from "./abstract-control-directive";
import { FormGroup } from "./form-group";

export class NgModelGroup extends AbstractControlDirective {
  constructor(
    protected readonly directive: NgNgModelGroup = inject(NgNgModelGroup),
  ) {
    super(directive);
  }

  override get source(): NgNgModelGroup {
    return this.directive;
  }

  override get control(): FormGroup {
    return new FormGroup(this.directive.control);
  }
}
