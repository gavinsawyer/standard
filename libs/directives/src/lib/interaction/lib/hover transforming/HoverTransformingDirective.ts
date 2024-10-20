import { DOCUMENT, isPlatformBrowser }                                                                                          from "@angular/common";
import { computed, Directive, type ElementRef, inject, Injector, PLATFORM_ID, type Signal, signal, type WritableSignal }        from "@angular/core";
import { toObservable, toSignal }                                                                                               from "@angular/core/rxjs-interop";
import { PointerService }                                                                                                       from "@standard/services";
import { combineLatestWith, delayWhen, filter, fromEvent, map, merge, type Observable, startWith, switchMap, takeUntil, timer } from "rxjs";


@Directive(
  {
    host:       {
      "[class.focusedOrUnfocusing]":                                          "focusedOrUnfocusing$()",
      "[class.focused]":                                                      "focused$()",
      "[class.pressedOrUnpressing]":                                          "pressedOrUnpressing$()",
      "[class.pressed]":                                                      "pressed$()",
      "[class.transformedOrUntransforming]":                                  "transformedOrUntransforming$()",
      "[class.transformed]":                                                  "transformed$()",
      "[style.--standard--hover-transforming-directive--last-translation-x]": "lastTranslationX$()",
      "[style.--standard--hover-transforming-directive--last-translation-y]": "lastTranslationY$()",
      "[style.--standard--hover-transforming-directive--translation-x]":      "translationX$()",
      "[style.--standard--hover-transforming-directive--translation-y]":      "translationY$()",
    },
    standalone: true,
  },
)
export class HoverTransformingDirective {

  private readonly document: Document               = inject<Document>(DOCUMENT);
  private readonly injector: Injector               = inject<Injector>(Injector);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly pointerService: PointerService   = inject<PointerService>(PointerService);

  public readonly htmlElementRef$: WritableSignal<ElementRef<HTMLElement> | undefined> = signal<undefined>(undefined);

  private readonly translation$: Signal<{ "x": number, "y": number } | undefined> = isPlatformBrowser(this.platformId) ? toSignal<{ "x": number, "y": number } | undefined>(
    toObservable<ElementRef<HTMLElement> | undefined>(this.htmlElementRef$).pipe<ElementRef<HTMLElement>, { "x": number, "y": number } | undefined>(
      filter<ElementRef<HTMLElement> | undefined, ElementRef<HTMLElement>>(
        (htmlElementRef?: ElementRef<HTMLElement>): htmlElementRef is ElementRef<HTMLDivElement> => !!htmlElementRef,
      ),
      switchMap<ElementRef<HTMLElement>, Observable<{ "x": number, "y": number } | undefined>>(
        (htmlElementRef: ElementRef<HTMLElement>): Observable<{ "x": number, "y": number } | undefined> => toObservable<PointerEvent | undefined>(
          this.pointerService.pointerEvent$,
          {
            injector: this.injector,
          },
        ).pipe<PointerEvent, { "x": number, "y": number } | undefined>(
          filter<PointerEvent | undefined, PointerEvent>(
            (pointerEvent?: PointerEvent): pointerEvent is PointerEvent => !!pointerEvent,
          ),
          map<PointerEvent, { "x": number, "y": number } | undefined>(
            (pointerEvent: PointerEvent): { "x": number, "y": number } | undefined => ((domRect?: DOMRect): { "x": number, "y": number } | undefined => {
              if (htmlElementRef.nativeElement.contains(document.elementFromPoint(
                pointerEvent.x,
                pointerEvent.y,
              )) && domRect && pointerEvent.x >= domRect.left && pointerEvent.x <= domRect.right && pointerEvent.y >= domRect.top && pointerEvent.y <= domRect.bottom)
                return {
                  x: ((2 * ((pointerEvent.x - domRect.left) / domRect.width)) - 1) / 8,
                  y: ((2 * ((pointerEvent.y - domRect.top) / domRect.height)) - 1) / 8,
                };
              else
                return undefined;
            })(htmlElementRef.nativeElement.getBoundingClientRect()),
          ),
        ),
      ),
    ),
  ) : signal<undefined>(undefined);

  protected readonly focused$: Signal<boolean | undefined>                              = isPlatformBrowser(this.platformId) ? toSignal<boolean>(
    toObservable<ElementRef<HTMLElement> | undefined>(this.htmlElementRef$).pipe<ElementRef<HTMLElement>, boolean>(
      filter<ElementRef<HTMLElement> | undefined, ElementRef<HTMLElement>>(
        (htmlElementRef?: ElementRef<HTMLElement>): htmlElementRef is ElementRef<HTMLDivElement> => !!htmlElementRef,
      ),
      switchMap<ElementRef<HTMLElement>, Observable<boolean>>(
        (htmlElementRef: ElementRef<HTMLElement>): Observable<boolean> => fromEvent<FocusEvent>(
          htmlElementRef.nativeElement,
          "focusin",
        ).pipe<boolean>(
          switchMap<FocusEvent, Observable<boolean>>(
            (): Observable<boolean> => fromEvent<FocusEvent>(
              htmlElementRef.nativeElement,
              "focusout",
            ).pipe<false, boolean>(
              map<FocusEvent, false>(
                (): false => false,
              ),
              startWith<false, [ boolean ]>(true),
            ),
          ),
        ),
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly focusedOrUnfocusing$: Signal<boolean | undefined>                  = isPlatformBrowser(this.platformId) ? toSignal<boolean | undefined>(
    toObservable<boolean | undefined>(this.focused$).pipe<boolean | undefined, boolean | undefined>(
      delayWhen<boolean | undefined>(
        (focused?: boolean): Observable<number> => {
          if (focused !== undefined)
            return focused ? timer(0) : timer(200);
          else
            return timer(0);
        },
      ),
      map<boolean | undefined, boolean | undefined>(
        (): boolean | undefined => this.focused$(),
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly lastTranslation$: Signal<{ "x": number, "y": number } | undefined> = isPlatformBrowser(this.platformId) ? toSignal<{ "x": number, "y": number }>(
    toObservable<{ "x": number, "y": number } | undefined>(
      this.translation$,
    ).pipe<{ "x": number, "y": number }>(
      filter<{ "x": number, "y": number } | undefined, { "x": number, "y": number }>(
        (translation?: { "x": number, "y": number }): translation is { "x": number, "y": number } => {
          if (translation !== undefined)
            return translation.x !== 0 || translation.y !== 0;
          else
            return false;
        },
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly lastTranslationX$: Signal<number | undefined>                      = computed<number | undefined>(
    (): number | undefined => this.lastTranslation$()?.x,
  );
  protected readonly lastTranslationY$: Signal<number | undefined>                      = computed<number | undefined>(
    (): number | undefined => this.lastTranslation$()?.y,
  );
  protected readonly pressed$: Signal<boolean | undefined>                              = isPlatformBrowser(this.platformId) && this.document.defaultView ? ((window: Window & typeof globalThis): Signal<boolean | undefined> => toSignal<boolean>(
    toObservable<ElementRef<HTMLElement> | undefined>(this.htmlElementRef$).pipe<ElementRef<HTMLElement>, boolean>(
      filter<ElementRef<HTMLElement> | undefined, ElementRef<HTMLElement>>(
        (htmlElementRef?: ElementRef<HTMLElement>): htmlElementRef is ElementRef<HTMLDivElement> => !!htmlElementRef,
      ),
      switchMap<ElementRef<HTMLElement>, Observable<boolean>>(
        (htmlElementRef: ElementRef<HTMLElement>): Observable<boolean> => fromEvent<PointerEvent>(
          htmlElementRef.nativeElement,
          "pointerdown",
        ).pipe<boolean>(
          switchMap<PointerEvent, Observable<boolean>>(
            (): Observable<boolean> => merge<[ false, false, false, true ]>(
              fromEvent<PointerEvent>(
                htmlElementRef.nativeElement,
                "pointerup",
              ).pipe<false>(
                map<PointerEvent, false>(
                  (): false => false,
                ),
              ),
              fromEvent<PointerEvent>(
                htmlElementRef.nativeElement,
                "pointerleave",
              ).pipe<false>(
                map<PointerEvent, false>(
                  (): false => false,
                ),
              ),
              fromEvent<PointerEvent>(
                window,
                "scroll",
              ).pipe<false>(
                map<PointerEvent, false>(
                  (): false => false,
                ),
              ),
              fromEvent<PointerEvent>(
                htmlElementRef.nativeElement,
                "pointerenter",
              ).pipe<true, true>(
                map<PointerEvent, true>(
                  (): true => true,
                ),
                takeUntil<true>(
                  fromEvent<PointerEvent>(
                    window,
                    "pointerup",
                  ),
                ),
              ),
            ).pipe<boolean>(
              startWith<boolean, [ boolean ]>(true),
            ),
          ),
        ),
      ),
    ),
  ))(this.document.defaultView) : signal<undefined>(undefined);
  protected readonly pressedOrUnpressing$: Signal<boolean | undefined>                  = isPlatformBrowser(this.platformId) ? toSignal<boolean | undefined>(
    toObservable<boolean | undefined>(this.pressed$).pipe<boolean | undefined, boolean | undefined>(
      delayWhen<boolean | undefined>(
        (pressed?: boolean): Observable<number> => {
          if (pressed !== undefined)
            return pressed ? timer(0) : timer(50);
          else
            return timer(0);
        },
      ),
      map<boolean | undefined, boolean | undefined>(
        (): boolean | undefined => this.pressed$(),
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly translationX$: Signal<number | undefined>                          = computed<number | undefined>(
    (): number | undefined => this.translation$()?.x,
  );
  protected readonly translationY$: Signal<number | undefined>                          = computed<number | undefined>(
    (): number | undefined => this.translation$()?.y,
  );
  protected readonly transformed$: Signal<boolean | undefined>                          = isPlatformBrowser(this.platformId) ? toSignal<boolean | undefined>(
    toObservable<number | undefined>(this.translationX$).pipe<[ number | undefined, number | undefined ], boolean | undefined>(
      combineLatestWith<number | undefined, [ number | undefined ]>(
        toObservable<number | undefined>(this.translationY$),
      ),
      map<[ number | undefined, number | undefined ], boolean | undefined>(
        ([ translationX, translationY ]: [ number | undefined, number | undefined ]): boolean | undefined => {
          if (translationX !== undefined || translationY !== undefined)
            return translationX !== 0 || translationY !== 0;
          else
            return undefined;
        },
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly transformedOrUntransforming$: Signal<boolean | undefined>          = isPlatformBrowser(this.platformId) ? toSignal<boolean | undefined>(
    toObservable<boolean | undefined>(this.transformed$).pipe<boolean | undefined, boolean | undefined>(
      delayWhen<boolean | undefined>(
        (transformed?: boolean): Observable<number> => transformed ? timer(0) : timer(200),
      ),
      map<boolean | undefined, boolean | undefined>(
        (): boolean | undefined => this.transformed$(),
      ),
    ),
  ) : signal<undefined>(undefined);

}
