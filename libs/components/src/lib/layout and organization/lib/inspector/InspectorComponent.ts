import { NgTemplateOutlet }                                                                                 from "@angular/common";
import { afterRender, ChangeDetectionStrategy, Component, type ElementRef, inject, type Signal, viewChild } from "@angular/core";
import { ElevatedDirective, FlexboxContainerDirective, GlassDirective, RoundedDirective }                   from "@standard/directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives:  [
      {
        directive: ElevatedDirective,
        inputs:    [
          "level",
          "materialOpacity",
        ],
      },
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
      {
        directive: GlassDirective,
        inputs:    [
          "materialOpacity",
        ],
      },
      {
        directive: RoundedDirective,
        inputs:    [
          "level",
        ],
      },
    ],
    imports:         [
      NgTemplateOutlet,
    ],
    selector:        "standard--inspector",
    styleUrls:       [
      "InspectorComponent.sass",
    ],
    templateUrl:     "InspectorComponent.html",

    standalone: true,
  },
)
export class InspectorComponent {

  constructor() {
    afterRender(
      (): void => this.roundedDirective.htmlElementRef$.set(this.htmlDivElementRef$()),
    );
  }

  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");

  protected readonly roundedDirective: RoundedDirective = inject<RoundedDirective>(RoundedDirective);

}
