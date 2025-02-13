import { NgTemplateOutlet }                                            from "@angular/common";
import { ChangeDetectionStrategy, Component, input, type InputSignal } from "@angular/core";
import { ContainerDirective, InlinableDirective }                      from "@bowstring/directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives:  [
      {
        directive: ContainerDirective,
        inputs:    [
          "alignSelf",
          "aspectRatio",
          "marginBottom",
          "marginSides",
          "marginTop",
          "overflowX",
          "overflowY",
          "paddingBottom",
          "paddingSides",
          "paddingTop",
          "position",
          "positionBottom",
          "positionLeft",
          "positionRight",
          "positionTop",
          "scrollSnapAlign",
          "scrollSnapStop",
          "scrollSnapType",
        ],
      },
      {
        directive: InlinableDirective,
        inputs:    [
          "inline",
        ],
      },
    ],
    selector:        "bowstring--label",
    styleUrl:        "LabelComponent.sass",
    templateUrl:     "LabelComponent.html",
    imports:         [
      NgTemplateOutlet,
    ],

    standalone: true,
  },
)
export class LabelComponent {

  public readonly input$: InputSignal<string> = input.required<string>(
    {
      alias: "input",
    },
  );

}
