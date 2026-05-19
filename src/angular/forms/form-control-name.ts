import { inject } from "@angular/core";
import { FormControlName as NgFormControlName } from "@angular/forms";
import type { Stream } from "effect";

import { observableToStream } from "../../observables";
import { AbstractControlDirective } from "./abstract-control-directive";
import { FormControl } from "./form-control";

export class FormControlName extends AbstractControlDirective {
  constructor(
    protected readonly directive: NgFormControlName = inject(NgFormControlName),
  ) {
    super(directive);
  }

  override get source(): NgFormControlName {
    return this.directive;
  }

  override get control(): FormControl {
    return new FormControl(this.directive.control);
  }

  get update(): Stream.Stream<any, unknown> {
    return observableToStream(this.directive.update);
  }
}
