/// <reference types="@angular/localize" />

import { type Type }   from "@angular/core";
import { type Routes } from "@angular/router";
import { title }       from "@standard/brand";


const children: Routes = [
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Gallery-Item--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./item/ItemGalleryChildRouteComponent").then<Type<unknown>>(
      ({ ItemGalleryChildRouteComponent }: typeof import("./item/ItemGalleryChildRouteComponent")): Type<unknown> => ItemGalleryChildRouteComponent,
    ),
    path:          ":itemId",
    title:         `${ $localize`:@@libs--Components--Routes--Gallery-Item--Meta--Title:Item` } - ${ title } ${ $localize`:@@libs--Components--Routes--Gallery--Meta--Title:Gallery` }`,
  },
];

export default children;