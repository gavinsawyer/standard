import { NgTemplateOutlet }                                                                                 from "@angular/common";
import { afterRender, ChangeDetectionStrategy, Component, type ElementRef, inject, type Signal, viewChild } from "@angular/core";
import { ElevatedDirective, FlexboxContainerDirective, GlassDirective, WellRoundedDirective }               from "@standard/directives";


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
        directive: WellRoundedDirective,
        inputs:    [
          "level",
        ],
      },
    ],
    imports:         [
      NgTemplateOutlet,
    ],
    selector:        "standard--box",
    styleUrl:        "BoxComponent.sass",
    templateUrl:     "BoxComponent.html",

    standalone: true,
  },
)
export class BoxComponent {

  constructor() {
    afterRender(
      (): void => this.wellRoundedDirective.htmlElementRef$.set(this.htmlDivElementRef$()),
    );
  }

  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");

  protected readonly wellRoundedDirective: WellRoundedDirective = inject<WellRoundedDirective>(WellRoundedDirective);

}
