import { inject } from "@angular/core";
import { FormControlDirective as NgFormControlDirective } from "@angular/forms";
import type { Stream } from "effect";

import { observableToStream } from "../../observables";
import { AbstractControlDirective } from "./abstract-control-directive";
import { FormControl } from "./form-control";

export class FormControlDirective extends AbstractControlDirective {
  constructor(
    protected readonly directive: NgFormControlDirective = inject(
      NgFormControlDirective,
    ),
  ) {
    super(directive);
  }

  override get source(): NgFormControlDirective {
    return this.directive;
  }

  override get control(): FormControl | null {
    return this.directive.control
      ? new FormControl(this.directive.control)
      : null;
  }

  get update(): Stream.Stream<any, unknown> {
    return observableToStream(this.directive.update);
  }
}
