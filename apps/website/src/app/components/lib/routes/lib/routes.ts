/// <reference types="@angular/localize" />

import { type Type }                      from "@angular/core";
import { type DefaultExport, type Route } from "@angular/router";
import { description, title }             from "@standard/brand";


const routes: Route[] = [
  {
    data:          {
      description: $localize`:@@apps--Website--Components--Routes--Design--MetaDescription:...`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./design/DesignRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      ({ DesignRouteComponent }: typeof import("./design/DesignRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => DesignRouteComponent,
    ),
    path:          "design",
    pathMatch:     "full",
    title:         `${ $localize`:@@apps--Website--Components--Routes--Design--MetaTitle:Design` } - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@apps--Website--Components--Routes--Develop--MetaDescription:...`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./develop/DevelopRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      ({ DevelopRouteComponent }: typeof import("./develop/DevelopRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => DevelopRouteComponent,
    ),
    path:          "develop",
    pathMatch:     "full",
    title:         `${ $localize`:@@apps--Website--Components--Routes--Develop--MetaTitle:Develop` } - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@apps--Website--Components--Routes--News--MetaDescription:...`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./news/NewsRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      ({ NewsRouteComponent }: typeof import("./news/NewsRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => NewsRouteComponent,
    ),
    path:          "news",
    pathMatch:     "full",
    title:         `${ $localize`:@@apps--Website--Components--Routes--News--MetaTitle:News` } - ${ title }`,
  },
  {
    data:          {
      description: description,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./home/HomeRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      ({ HomeRouteComponent }: typeof import("./home/HomeRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => HomeRouteComponent,
    ),
    path:          "",
    pathMatch:     "full",
    title:         title,
  },
];
export default routes;
