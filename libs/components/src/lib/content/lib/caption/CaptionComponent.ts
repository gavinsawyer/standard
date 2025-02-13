import { NgTemplateOutlet }                   from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ContainerDirective }                 from "@bowstring/directives";


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
    ],
    imports:         [
      NgTemplateOutlet,
    ],
    selector:        "bowstring--caption",
    styleUrl:        "CaptionComponent.sass",
    templateUrl:     "CaptionComponent.html",

    standalone: true,
  },
)
export class CaptionComponent {
}
