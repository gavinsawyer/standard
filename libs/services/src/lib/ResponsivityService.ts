import { BreakpointObserver, BreakpointState }             from "@angular/cdk/layout";
import { isPlatformBrowser }                               from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, Signal } from "@angular/core";
import { toSignal }                                        from "@angular/core/rxjs-interop";
import { map }                                             from "rxjs";


@Injectable(
  {
    providedIn: "root",
  },
)
export class ResponsivityService {

  private readonly breakpointObserver: BreakpointObserver = inject<BreakpointObserver>(BreakpointObserver);
  private readonly platformId: NonNullable<unknown>       = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly pastMediumBreakpoint$: Signal<boolean> = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<boolean, boolean>(
    this.breakpointObserver.observe(`(min-width: 48rem)`).pipe<boolean>(
      map<BreakpointState, boolean>(
        (breakpointState: BreakpointState): boolean => breakpointState.matches,
      ),
    ),
    {
      initialValue: this.breakpointObserver.isMatched(`(min-width: 48rem)`),
    },
  ) : signal<true>(true);
  public readonly pastSmallBreakpoint$: Signal<boolean>  = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<boolean, boolean>(
    this.breakpointObserver.observe(`(min-width: 32rem)`).pipe<boolean>(
      map<BreakpointState, boolean>(
        (breakpointState: BreakpointState): boolean => breakpointState.matches,
      ),
    ),
    {
      initialValue: this.breakpointObserver.isMatched(`(min-width: 32rem)`),
    },
  ) : signal<true>(true);

}
