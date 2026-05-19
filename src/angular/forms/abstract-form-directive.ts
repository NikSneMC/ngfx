import { AbstractFormDirective as NgAbstractFormDirective } from "@angular/forms";
import type { Stream } from "effect";

import { observableToStream } from "../../observables";
import { type AbstractControl } from "./abstract-control";
import { AbstractControlDirective } from "./abstract-control-directive";
import { wrapAbstractControl } from "./wrap-abstract-control";

export class AbstractFormDirective extends AbstractControlDirective {
  constructor(protected readonly directive: NgAbstractFormDirective) {
    super(directive);
  }

  override get source(): NgAbstractFormDirective {
    return this.directive;
  }

  override get control(): AbstractControl {
    return wrapAbstractControl(this.directive.control);
  }

  get form(): AbstractControl {
    return wrapAbstractControl(this.directive.form);
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

  resetForm(value?: any, options?: any): void {
    this.directive.resetForm(value, options);
  }
}
