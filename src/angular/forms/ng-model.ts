import { inject } from "@angular/core";
import { NgModel as NgNgModel } from "@angular/forms";
import type { Stream } from "effect";

import { observableToStream } from "../../observables";
import { AbstractControlDirective } from "./abstract-control-directive";
import { FormControl } from "./form-control";

export class NgModel extends AbstractControlDirective {
  constructor(protected readonly directive: NgNgModel = inject(NgNgModel)) {
    super(directive);
  }

  override get source(): NgNgModel {
    return this.directive;
  }

  override get control(): FormControl {
    return new FormControl(this.directive.control);
  }

  get update(): Stream.Stream<any, unknown> {
    return observableToStream(this.directive.update);
  }
}
