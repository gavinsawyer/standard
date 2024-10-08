import { NgTemplateOutlet }                                                  from "@angular/common";
import { booleanAttribute, Component, input, type InputSignalWithTransform } from "@angular/core";
import { FlexboxContainerDirective }                                         from "@standard/directives";


@Component(
  {
    host:           {
      "[class.styleFirstLetter]":    "styleFirstLetter$()",
      "[class.styleFirstParagraph]": "styleFirstParagraph$()",
    },
    hostDirectives: [
      {
        directive: FlexboxContainerDirective,
        inputs:    [
          "alignContent",
          "alignItems",
          "flexDirection",
          "flexWrap",
          "gapColumn",
          "gapRow",
          "justifyContent",
        ],
      },
    ],
    imports:        [
      NgTemplateOutlet,
    ],
    selector:       "standard--heading-group",
    standalone:     true,
    styleUrls:      [
      "HeadingGroupComponent.sass",
    ],
    templateUrl:    "HeadingGroupComponent.html",
  },
)
export class HeadingGroupComponent {

  public readonly styleFirstLetter$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`>    = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "styleFirstLetter",
      transform: booleanAttribute,
    },
  );
  public readonly styleFirstParagraph$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`> = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "styleFirstParagraph",
      transform: booleanAttribute,
    },
  );

}
