import { DOCUMENT, isPlatformBrowser, NgTemplateOutlet }                                                                                                                                           from "@angular/common";
import { afterRender, Component, computed, effect, type EffectCleanupRegisterFn, type ElementRef, inject, model, type ModelSignal, PLATFORM_ID, signal, type Signal, type TemplateRef, viewChild } from "@angular/core";
import { takeUntilDestroyed, toObservable, toSignal }                                                                                                                                              from "@angular/core/rxjs-interop";
import { ElevatedDirective, FlexboxContainerDirective, GlassDirective, RoundedDirective }                                                                                                          from "@standard/directives";
import { type SymbolPaths }                                                                                                                                                                        from "@standard/interfaces";
import loadSymbolPaths                                                                                                                                                                             from "@standard/symbol-paths";
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll }                                                                                                                            from "body-scroll-lock";
import { delayWhen, fromEvent, map, type Observable, timer }                                                                                                                                       from "rxjs";
import { fromPromise }                                                                                                                                                                             from "rxjs/internal/observable/innerFrom";


@Component(
  {
    host:           {
      "[class.openOrClosing]": "openOrClosing$()",
      "[class.open]":          "openModelWithTransform$()",
    },
    hostDirectives: [
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
    imports:        [
      NgTemplateOutlet,
    ],
    selector:       "standard--sheet",
    standalone:     true,
    styleUrls:      [
      "SheetComponent.sass",
    ],
    templateUrl:    "SheetComponent.html",
  },
)
export class SheetComponent {

  constructor() {
    afterRender(
      (): void => this.roundedDirective.htmlElementRef$.set(this.htmlDivElementRef$()),
    );

    if (isPlatformBrowser(this.platformId))
      effect(
        (effectCleanupRegisterFn: EffectCleanupRegisterFn): void => {
          if (this.openOrClosing$())
            setTimeout(
              (): void => {
                disableBodyScroll(this.htmlDialogElementRef$().nativeElement);

                this.htmlDialogElementRef$().nativeElement.showModal();
                this.htmlDialogElementRef$().nativeElement.focus();
              },
              0,
            );
          else
            setTimeout(
              (): void => {
                enableBodyScroll(this.htmlDialogElementRef$().nativeElement);

                this.htmlDialogElementRef$().nativeElement.focus();
                this.htmlDialogElementRef$().nativeElement.close();
              },
              0,
            );

          effectCleanupRegisterFn(
            (): void => clearAllBodyScrollLocks(),
          );
        },
      );

    fromEvent<KeyboardEvent>(
      this.document,
      "keydown",
    ).pipe<KeyboardEvent>(
      takeUntilDestroyed<KeyboardEvent>(),
    ).subscribe(
      (keyboardEvent: KeyboardEvent): void => {
        this.keydown(keyboardEvent);
      },
    );
  }

  private readonly document: Document                                           = inject<Document>(DOCUMENT);
  private readonly htmlDialogElementRef$: Signal<ElementRef<HTMLDialogElement>> = viewChild.required<ElementRef<HTMLDialogElement>>("htmlDialogElement");
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>       = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  private readonly platformId: NonNullable<unknown>                             = inject<NonNullable<unknown>>(PLATFORM_ID);

  protected readonly arrowUpAndDownAndArrowLeftAndRightSymbolPaths$: Signal<SymbolPaths | undefined> = toSignal<SymbolPaths>(
    fromPromise<SymbolPaths>(
      loadSymbolPaths("ArrowUpAndDownAndArrowLeftAndRight"),
    ),
  );

  public readonly openModelWithTransform$: Signal<boolean | undefined> = computed<boolean | undefined>(
    (): boolean | undefined => {
      const open: "" | boolean | `${ boolean }` | undefined = this.openModel$();

      return open !== undefined ? open === "" || open === true || open === "true" || open !== "false" && false : undefined;
    },
  );

  protected readonly openOrClosing$: Signal<boolean | undefined> = isPlatformBrowser(this.platformId) ? toSignal<boolean | undefined>(
    toObservable<boolean | undefined>(this.openModelWithTransform$).pipe<boolean | undefined, boolean | undefined>(
      delayWhen<boolean | undefined>(
        (open?: boolean): Observable<number> => open ? timer(0) : timer(180),
      ),
      map<boolean | undefined, boolean | undefined>(
        (): boolean | undefined => this.openModelWithTransform$(),
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly roundedDirective: RoundedDirective          = inject<RoundedDirective>(RoundedDirective);

  public readonly dragControlTemplateRef$: Signal<TemplateRef<never>>                = viewChild.required<TemplateRef<never>>("dragControlTemplate");
  public readonly openModel$: ModelSignal<"" | boolean | `${ boolean }` | undefined> = model<"" | boolean | `${ boolean }` | undefined>(
    false,
    {
      alias: "open",
    },
  );

  protected keydown(keyboardEvent: KeyboardEvent): true | void {
    if (keyboardEvent.key !== "Escape")
      keyboardEvent.stopPropagation();

    return (keyboardEvent.key === "Escape" && this.openOrClosing$() ? this.openModel$.set(false) : true) || keyboardEvent.preventDefault();
  }

}
