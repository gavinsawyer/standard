import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ReactiveFormsModule }                        from "@angular/forms";
import { AccountService }                             from "@bowstring/services";
import { AccountChildRouteComponent }                 from "../../../child/AccountChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      ReactiveFormsModule,
    ],
    styleUrl:        "HomeAccountChildRouteComponent.sass",
    templateUrl:     "HomeAccountChildRouteComponent.html",

    standalone: true,
  },
)
export class HomeAccountChildRouteComponent
  extends AccountChildRouteComponent {

  protected readonly accountService: AccountService = inject<AccountService>(AccountService);

}
