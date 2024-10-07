import { isPlatformBrowser, Location }                                                                                                                                                                                                                                                                                                                                                      from "@angular/common";
import { inject, Injectable, LOCALE_ID, PLATFORM_ID, signal, type Signal }                                                                                                                                                                                                                                                                                                                  from "@angular/core";
import { toSignal }                                                                                                                                                                                                                                                                                                                                                                         from "@angular/core/rxjs-interop";
import { type ActivationEnd, type ActivationStart, type ChildActivationEnd, type ChildActivationStart, type GuardsCheckEnd, type GuardsCheckStart, type NavigationCancel, NavigationEnd, type NavigationError, type NavigationStart, type ResolveEnd, type ResolveStart, type RouteConfigLoadEnd, type RouteConfigLoadStart, Router, type RouterEvent, type RoutesRecognized, type Scroll } from "@angular/router";
import { filter, map }                                                                                                                                                                                                                                                                                                                                                                      from "rxjs";


@Injectable(
  {
    providedIn: "root",
  },
)
export class PathService {

  private readonly localeId: string                 = inject<string>(LOCALE_ID);
  private readonly location: Location               = inject<Location>(Location);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly router: Router                   = inject<Router>(Router);

  public readonly path$: Signal<string> = isPlatformBrowser(this.platformId) ? toSignal<string, string>(
    this.router.events.pipe<NavigationEnd, string>(
      filter<RouterEvent | NavigationStart | NavigationEnd | NavigationCancel | NavigationError | RoutesRecognized | GuardsCheckStart | GuardsCheckEnd | RouteConfigLoadStart | RouteConfigLoadEnd | ChildActivationStart | ChildActivationEnd | ActivationStart | ActivationEnd | Scroll | ResolveStart | ResolveEnd, NavigationEnd>(
        (routerEvent: RouterEvent | NavigationStart | NavigationEnd | NavigationCancel | NavigationError | RoutesRecognized | GuardsCheckStart | GuardsCheckEnd | RouteConfigLoadStart | RouteConfigLoadEnd | ChildActivationStart | ChildActivationEnd | ActivationStart | ActivationEnd | Scroll | ResolveStart | ResolveEnd): routerEvent is NavigationEnd => routerEvent instanceof NavigationEnd,
      ),
      map<NavigationEnd, string>(
        (navigationEnd: NavigationEnd): string => `/${ this.localeId }${ navigationEnd.url.split("?")[0] }`,
      ),
    ),
    {
      initialValue: `/${ this.localeId }${ this.location.path() }`,
    },
  ) : signal<`/${ string }${ string }`>(`/${ this.localeId }${ this.location.path() }`);

}
