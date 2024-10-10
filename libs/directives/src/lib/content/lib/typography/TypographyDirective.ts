import { Directive, input, type InputSignalWithTransform, numberAttribute } from "@angular/core";


@Directive(
  {
    host:       {
      "[style.--standard--typography-directive--font-size-exponent-input]": "fontSizeExponentInput$()",
    },
    standalone: true,
  },
)
export class TypographyDirective {

  public readonly fontSizeExponentInput$: InputSignalWithTransform<number | undefined, "" | number | `${ number }`> = input<number | undefined, "" | number | `${ number }`>(
    undefined,
    {
      alias:     "fontSizeExponent",
      transform: numberAttribute,
    },
  );

}