import { Component, Input, signal, WritableSignal } from "@angular/core";
import { RouterLink, RouterLinkActive }             from "@angular/router";
import * as symbolAspectRatios                      from "@standard/symbol-aspect-ratios";
import { SymbolComponent }                          from "../symbol/SymbolComponent";


@Component({
  imports: [
    RouterLink,
    RouterLinkActive,
    SymbolComponent,
  ],
  selector:    "standard--button",
  standalone:  true,
  styleUrls:   [
    "ButtonComponent.sass",
  ],
  templateUrl: "ButtonComponent.html",
})
export class ButtonComponent {

  @Input({
    required: true,
  })
  public text!: string;

  @Input() public disabled?: boolean;
  @Input() public symbol?:   keyof typeof symbolAspectRatios;
  @Input() public tabindex?: number;
  @Input() public url?:      string;

  public readonly mouseenter:           () => void                                             = (): void => setTimeout(
    (): void => this.transitionTranslate$.set(false),
    200,
  ) && void (0);
  public readonly mouseleave:           () => void                                             = (): void => {
    this
      .transitionTranslate$
      .set(true);

    this
      .translation$
      .set(
        {
          x: 0,
          y: 0,
        },
      );
  };
  public readonly mousemove:            (mouseEvent: MouseEvent, host: HTMLDivElement) => void = (mouseEvent: MouseEvent, container: HTMLDivElement): void => ((hostBindingClientRect: DOMRect): void => this.translation$.set(
    {
      x: ((2 * ((mouseEvent.clientX - hostBindingClientRect.left) / container.offsetWidth)) - 1) / 8,
      y: ((2 * ((mouseEvent.clientY - hostBindingClientRect.top) / container.offsetHeight)) - 1) / 8,
    },
  ))(container.getBoundingClientRect());
  public readonly transitionTranslate$: WritableSignal<boolean>                                = signal<boolean>(true);
  public readonly translation$:         WritableSignal<{ x: number, y: number }>               = signal<{ x: number, y: number }>(
    {
      x: 0,
      y: 0,
    },
  );

}
