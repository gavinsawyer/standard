import { Component, signal, type WritableSignal }                                                                                                                                                    from "@angular/core";
import { ArticleComponent, AsideComponent, BoxComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, ImageComponent, RouteComponent, ScrollStackComponent, SectionComponent } from "@standard/components";
import { ScrollStackItemDirective }                                                                                                                                                                  from "@standard/directives";


@Component(
  {
    imports:     [
      ArticleComponent,
      AsideComponent,
      BoxComponent,
      FlexboxContainerComponent,
      HeaderComponent,
      HeadingGroupComponent,
      ImageComponent,
      ScrollStackComponent,
      ScrollStackItemDirective,
      SectionComponent,
    ],
    standalone:  true,
    styleUrls:   [
      "DesignRouteComponent.sass",
    ],
    templateUrl: "DesignRouteComponent.html",
  },
)
export class DesignRouteComponent
  extends RouteComponent {

  protected readonly imageSources$: WritableSignal<string[]> = signal<string[]>(
    [
      "/assets/photos/1.webp",
      "/assets/photos/2.webp",
      "/assets/photos/3.webp",
    ],
  );

}
