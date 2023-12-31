import { isPlatformBrowser }                      from "@angular/common";
import { Component, inject, OnInit, PLATFORM_ID } from "@angular/core";
import { RESPONSE }                               from "@standard/injection-tokens";
import { PathService }                            from "@standard/services";
import { Response }                               from "express";
import { CardComponent }                          from "../../../card/CardComponent";
import { RouteComponent }                         from "../../../route/RouteComponent";


@Component({
  standalone:  true,
  templateUrl: "./OtherwiseRouteComponent.html",
  imports:     [
    CardComponent,
  ],
})
export class OtherwiseRouteComponent extends RouteComponent implements OnInit {

  private readonly platformId: object          = inject<object>(PLATFORM_ID);
  private readonly response:   Response | null = inject<Response | null>(
    RESPONSE,
    {
      optional: true,
    },
  );

  public readonly pathService: PathService = inject<PathService>(PathService);

  override ngOnInit(): void {
    super
      .ngOnInit();

    isPlatformBrowser(this.platformId) || this
      .response
      ?.status(404);
  }

}
