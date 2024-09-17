import { Component, effect, type ElementRef, inject, input, type InputSignal, type Signal, viewChild }                    from "@angular/core";
import { ContainerDirective, FlexboxChildDirective }                                                                      from "@standard/directives";
import { type DistributedAlignment, type GridPositionalAlignment, type Inherit, type NormalAlignment, type ScalarString } from "@standard/types";


@Component(
  {
    host:           {
      "[style.--standard--grid--align-content]":   "alignContentInput$()",
      "[style.--standard--grid--align-items]":     "alignItemsInput$()",
      "[style.--standard--grid--column-gap]":      "columnGapInput$()",
      "[style.--standard--grid--justify-content]": "justifyContentInput$()",
      "[style.--standard--grid--row-gap]":         "rowGapInput$()",
    },
    hostDirectives: [
      {
        directive: ContainerDirective,
        inputs:    [
          "aspectRatio",
          "alignSelf",
          "bottomPosition",
          "hideScrollbar",
          "leftPosition",
          "marginBottom",
          "marginSides",
          "marginTop",
          "overflowX",
          "overflowY",
          "paddingBottom",
          "paddingSides",
          "paddingTop",
          "position",
          "rightPosition",
          "scrollSnapAlign",
          "scrollSnapStop",
          "scrollSnapType",
          "topPosition",
        ],
      },
      {
        directive: FlexboxChildDirective,
        inputs:    [
          "flexBasis",
          "flexGrow",
          "flexShrink",
        ],
      },
    ],
    selector:       "standard--grid",
    standalone:     true,
    styleUrls:      [
      "GridComponent.sass",
    ],
    templateUrl:    "GridComponent.html",
  },
)
export class GridComponent {

  constructor() {
    effect(
      (): void => this.containerDirective.htmlElementRef$.set(
        this.htmlDivElementRef$(),
      ),
      {
        allowSignalWrites: true,
      },
    );
  }

  private readonly containerDirective: ContainerDirective                 = inject<ContainerDirective>(ContainerDirective);
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");

  public readonly alignContentInput$: InputSignal<DistributedAlignment | GridPositionalAlignment | NormalAlignment | undefined>   = input<DistributedAlignment | GridPositionalAlignment | NormalAlignment | undefined>(
    undefined,
    {
      alias: "alignContent",
    },
  );
  public readonly alignItemsInput$: InputSignal<DistributedAlignment | GridPositionalAlignment | NormalAlignment | undefined>     = input<DistributedAlignment | GridPositionalAlignment | NormalAlignment | undefined>(
    undefined,
    {
      alias: "alignItems",
    },
  );
  public readonly columnGapInput$: InputSignal<ScalarString | Inherit | undefined>                                                = input<ScalarString | Inherit | undefined>(
    undefined,
    {
      alias: "columnGap",
    },
  );
  public readonly justifyContentInput$: InputSignal<DistributedAlignment | GridPositionalAlignment | NormalAlignment | undefined> = input<DistributedAlignment | GridPositionalAlignment | NormalAlignment | undefined>(
    undefined,
    {
      alias: "justifyContent",
    },
  );
  public readonly rowGapInput$: InputSignal<ScalarString | Inherit | undefined>                                                   = input<ScalarString | Inherit | undefined>(
    undefined,
    {
      alias: "rowGap",
    },
  );

}
