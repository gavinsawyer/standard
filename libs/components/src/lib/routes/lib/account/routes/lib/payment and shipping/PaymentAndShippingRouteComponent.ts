import { Component }                       from "@angular/core";
import { HeaderComponent, RouteComponent } from "../../../../../../../";


@Component(
  {
    imports:     [
      HeaderComponent,
    ],
    standalone:  true,
    styleUrls:   [
      "PaymentAndShippingRouteComponent.sass",
    ],
    templateUrl: "PaymentAndShippingRouteComponent.html",
  },
)
export class PaymentAndShippingRouteComponent
  extends RouteComponent {
}
