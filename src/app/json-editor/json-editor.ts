import { Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef, Directive } from '@angular/core';
import { SchemaValidatorService } from './schema-validator.service';
import { JSONEditorSchema } from './json-editor.helper';

/**
 * Debounce a function
 * @param func      function to executoe
 * @param wait      wait duration
 * @param immediate wait or immediate executue
 */
export function debounce(func: () => void, wait: number, immediate?: boolean) {
  let timeout: any;
  let args: IArguments;
  let context: any;
  let timestamp: Date;
  let result: any;

  return function () {
    context = this;
    args = arguments;
    timestamp = new Date();

    function later() {
      const now = new Date();
      const last = now.getTime() - timestamp.getTime();

      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
        }
      }
    }

    const callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }

    if (callNow) {
      result = func.apply(context, args);
    }

    return result;
  };
}


export function debounceable(duration: number, immediate?: boolean) {
  return function innerDecorator(_: any, key: string, descriptor: any) {
    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function getter() {
        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: debounce(descriptor.value, duration, immediate)
        });

        return this[key];
      }
    };
  };
}


@Directive()
export class JsonEditor implements OnChanges {
  @Input() model: any;

  @Input() schema: JSONEditorSchema;

  @Input() label: string;

  @Input() typeCheckOverrides?: any;

  @Input() schemaValidator?: (schema: any, ...args: any[]) => any[];

  @Input() showKnownProperties = false;

  @Output() modelChange: EventEmitter<any> = new EventEmitter();

  @Output() schemaUpdate: EventEmitter<JSONEditorSchema> = new EventEmitter();

  errors: any[];

  constructor(protected schemaValidatorService: SchemaValidatorService, protected cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.schema) {
      this.schema = JSON.parse(JSON.stringify(this.schema));
    }

    if (!this.schema) {
      this.schema = {
        type: 'object'
      };
    }
    if (!this.schema.type) {
      this.schema.type = 'object';
    }
  }

  /**
   * Model change callback. Validates the model and emits a change event
   * @param model
   */
  modelChangedCallback(model: any) {
    this.validate(this.schema, model);
    this.modelChange.emit(model);
  }

  /**
   * Validates the model based on the schema
   * @param schema
   * @param model
   */
  @debounceable(120)
  validate(schema: any, model: any): boolean {
    this.errors = this.schemaValidator
      ? this.schemaValidator(schema, model)
      : this.schemaValidatorService.validate(schema, model);
    this.cdr.markForCheck();

    return this.errors && this.errors.length > 0;
  }
}
