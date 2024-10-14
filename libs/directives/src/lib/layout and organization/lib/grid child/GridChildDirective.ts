import { Directive, input, type InputSignal } from "@angular/core";


@Directive(
  {
    host:       {
      "[style.--standard--grid-child-directive--grid-column-end-input]":   "gridColumnEndInput$()",
      "[style.--standard--grid-child-directive--grid-column-start-input]": "gridColumnStartInput$()",
      "[style.--standard--grid-child-directive--grid-row-end-input]":      "gridRowEndInput$()",
      "[style.--standard--grid-child-directive--grid-row-start-input]":    "gridRowStartInput$()",
    },
    standalone: true,
  },
)
export class GridChildDirective {

  public readonly gridColumnEndInput$: InputSignal<string | undefined>   = input<string | undefined>(
    undefined,
    {
      alias: "gridColumnEnd",
    },
  );
  public readonly gridColumnStartInput$: InputSignal<string | undefined> = input<string | undefined>(
    undefined,
    {
      alias: "gridColumnStart",
    },
  );
  public readonly gridRowEndInput$: InputSignal<string | undefined>      = input<string | undefined>(
    undefined,
    {
      alias: "gridRowEnd",
    },
  );
  public readonly gridRowStartInput$: InputSignal<string | undefined>    = input<string | undefined>(
    undefined,
    {
      alias: "gridRowStart",
    },
  );

}
