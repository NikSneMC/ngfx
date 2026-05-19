import { inject } from "@angular/core";
import { NgForm as NgNgForm } from "@angular/forms";
import type { Stream } from "effect";

import { observableToStream } from "../../observables";
import { AbstractControl } from "./abstract-control";
import { AbstractControlDirective } from "./abstract-control-directive";
import { FormGroup } from "./form-group";
import { wrapAbstractControl } from "./wrap-abstract-control";

export class NgForm extends AbstractControlDirective {
  constructor(protected readonly directive: NgNgForm = inject(NgNgForm)) {
    super(directive);
  }

  override get source(): NgNgForm {
    return this.directive;
  }

  override get control(): FormGroup {
    return new FormGroup(this.directive.control);
  }

  get form(): FormGroup {
    return new FormGroup(this.directive.form);
  }

  get controls(): Record<string, AbstractControl> {
    return Object.fromEntries(
      Object.entries(this.directive.controls).map(([key, control]) => [
        key,
        wrapAbstractControl(control),
      ]),
    ) as Record<string, AbstractControl>;
  }

  get ngSubmit(): Stream.Stream<any, unknown> {
    return observableToStream(this.directive.ngSubmit);
  }

  get submitted(): boolean {
    return this.directive.submitted;
  }

  onReset(): void {
    this.directive.onReset();
  }

  onSubmit(event: Event): boolean {
    return this.directive.onSubmit(event);
  }

  resetForm(value?: any): void {
    this.directive.resetForm(value);
  }
}
