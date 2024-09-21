import { Component, effect, type ElementRef, inject, type Signal, viewChild }             from "@angular/core";
import { ElevatedDirective, FlexboxContainerDirective, GlassDirective, RoundedDirective } from "@standard/directives";


@Component(
  {
    hostDirectives: [
      {
        directive: ElevatedDirective,
        inputs:    [
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
          "listenToScrollEvent",
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
          "roundnessFactor",
        ],
      },
    ],
    selector:       "standard--card",
    standalone:     true,
    styleUrls:      [
      "CardComponent.sass",
    ],
    templateUrl:    "CardComponent.html",
  },
)
export class CardComponent {

  constructor() {
    effect(
      (): void => {
        this.flexboxContainerDirective.htmlElementRef$.set(
          this.htmlDivElementRef$(),
        );
        this.roundedContainerDirective.htmlElementRef$.set(
          this.htmlDivElementRef$(),
        );
      },
      {
        allowSignalWrites: true,
      },
    );
  }

  private readonly flexboxContainerDirective: FlexboxContainerDirective   = inject<FlexboxContainerDirective>(FlexboxContainerDirective);
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");

  protected readonly roundedContainerDirective: RoundedDirective = inject<RoundedDirective>(RoundedDirective);

}
