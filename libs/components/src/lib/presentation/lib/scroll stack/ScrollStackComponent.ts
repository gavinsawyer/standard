import { isPlatformBrowser, NgTemplateOutlet }                                                                                                                                                                                            from "@angular/common";
import { ChangeDetectionStrategy, Component, contentChildren, type ElementRef, inject, Injector, input, type InputSignalWithTransform, numberAttribute, PLATFORM_ID, runInInjectionContext, signal, type Signal, TemplateRef, viewChild } from "@angular/core";
import { toObservable, toSignal }                                                                                                                                                                                                         from "@angular/core/rxjs-interop";
import { ContainerDirective, ScrollStackItemDirective }                                                                                                                                                                                   from "@standard/directives";
import { ViewportService }                                                                                                                                                                                                                from "@standard/services";
import { combineLatestWith, fromEvent, map, Observable, type Observer, startWith, switchMap, type TeardownLogic }                                                                                                                         from "rxjs";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    host:            {
      "[style.--standard--scroll-stack--minimum-aspect-ratio-input]": "minimumAspectRatioInput$()",
      "[style.--standard--scroll-stack--scroll-left]":                "scrollLeft$()",
      "[style.--standard--scroll-stack--viewport-vertical-offset]":   "viewportVerticalOffset$()",
      "[style.--standard--scroll-stack--width]":                      "width$()",
    },
    hostDirectives:  [
      {
        directive: ContainerDirective,
        inputs:    [
          "alignSelf",
          "aspectRatio",
          "marginBottom",
          "marginSides",
          "marginTop",
          "overflowX",
          "overflowY",
          "paddingBottom",
          "paddingSides",
          "paddingTop",
          "position",
          "positionBottom",
          "positionLeft",
          "positionRight",
          "positionTop",
          "scrollSnapAlign",
          "scrollSnapStop",
          "scrollSnapType",
        ],
      },
    ],
    imports:         [
      NgTemplateOutlet,
    ],
    selector:        "standard--scroll-stack",
    styleUrl:        "ScrollStackComponent.sass",
    templateUrl:     "ScrollStackComponent.html",

    standalone: true,
  },
)
export class ScrollStackComponent {

  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>      = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  private readonly innerHtmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("innerHtmlDivElement");
  private readonly platformId: NonNullable<unknown>                            = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly injector: Injector                                          = inject<Injector>(Injector);

  protected readonly itemTemplateRefs$: Signal<readonly TemplateRef<ScrollStackItemDirective>[]> = contentChildren<ScrollStackItemDirective, TemplateRef<ScrollStackItemDirective>>(
    ScrollStackItemDirective,
    {
      read: TemplateRef,
    },
  );
  protected readonly scrollLeft$: Signal<number | undefined>                                     = isPlatformBrowser(this.platformId) ? toSignal<number>(
    toObservable<ElementRef<HTMLDivElement>>(this.innerHtmlDivElementRef$).pipe<number>(
      switchMap<ElementRef<HTMLDivElement>, Observable<number>>(
        ({ nativeElement: innerHtmlDivElement }: ElementRef<HTMLDivElement>): Observable<number> => fromEvent<Event>(
          innerHtmlDivElement,
          "scroll",
        ).pipe<Event | null, number>(
          startWith<Event, [ null ]>(null),
          map<Event | null, number>(
            (): number => innerHtmlDivElement.scrollLeft,
          ),
        ),
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly viewportService: ViewportService                                            = inject<ViewportService>(ViewportService);
  protected readonly viewportVerticalOffset$: Signal<number | undefined>                         = isPlatformBrowser(this.platformId) ? toSignal<number | undefined>(
    toObservable<ElementRef<HTMLDivElement>>(this.htmlDivElementRef$).pipe<number | undefined>(
      switchMap<ElementRef<HTMLDivElement>, Observable<number | undefined>>(
        ({ nativeElement: htmlDivElement }: ElementRef<HTMLDivElement>): Observable<number | undefined> => runInInjectionContext<Observable<number | undefined>>(
          this.injector,
          (): Observable<number | undefined> => toObservable<number | undefined>(this.viewportService.height$).pipe<[ number | undefined, number | undefined, number | undefined ], number | undefined>(
            combineLatestWith<number | undefined, [ number | undefined, number | undefined ]>(
              toObservable<number | undefined>(this.viewportService.width$),
              toObservable<number | undefined>(this.viewportService.scrollTop$),
            ),
            map<[ number | undefined, number | undefined, number | undefined ], number | undefined>(
              ([ viewportHeight ]: [ number | undefined, number | undefined, number | undefined ]): number | undefined => {
                const domRect: DOMRect | undefined = htmlDivElement.getBoundingClientRect();

                if (domRect === undefined)
                  return undefined;

                return domRect.top + domRect.height / 2 - (viewportHeight || 0) / 2;
              },
            ),
          ),
        ),
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly width$: Signal<number | undefined>                                          = isPlatformBrowser(this.platformId) ? toSignal<number>(
    toObservable<ElementRef<HTMLDivElement>>(this.htmlDivElementRef$).pipe<number>(
      switchMap<ElementRef<HTMLDivElement>, Observable<number>>(
        ({ nativeElement: htmlDivElement }: ElementRef<HTMLDivElement>): Observable<number> => new Observable<number>(
          (widthObserver: Observer<number>): TeardownLogic => {
            const resizeObserver: ResizeObserver = new ResizeObserver(
              ([ { target: { clientWidth } } ]: ResizeObserverEntry[]): void => widthObserver.next(clientWidth),
            );

            resizeObserver.observe(htmlDivElement);

            return (): void => resizeObserver.disconnect();
          },
        ),
      ),
    ),
  ) : signal<undefined>(undefined);

  public readonly minimumAspectRatioInput$: InputSignalWithTransform<number, number | `${ number }`> = input.required<number, number | `${ number }`>(
    {
      alias:     "minimumAspectRatio",
      transform: numberAttribute,
    },
  );

}
