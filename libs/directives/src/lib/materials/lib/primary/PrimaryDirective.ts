import { Directive, inject, signal, type Signal } from "@angular/core";
import { BRAND }                                  from "@bowstring/injection-tokens";
import { type Color }                             from "@bowstring/interfaces";
import type * as brandLib                         from "@bowstring/brand";


@Directive(
  {
    host: {
      "[style.--bowstring--primary-directive--brand-primary-background-dark]":  "brandPrimaryBackgroundDark$()",
      "[style.--bowstring--primary-directive--brand-primary-background-light]": "brandPrimaryBackgroundLight$()",
      "[style.--bowstring--primary-directive--brand-primary-foreground-dark]":  "brandPrimaryForegroundDark$()",
      "[style.--bowstring--primary-directive--brand-primary-foreground-light]": "brandPrimaryForegroundLight$()",
    },

    standalone: true,
  },
)
export class PrimaryDirective {

  private readonly brand: typeof brandLib = inject<typeof brandLib>(BRAND);

  protected readonly brandPrimaryBackgroundDark$: Signal<`hsl(${ number }, ${ number }%, ${ number }%)`>  = signal<`hsl(${ number }, ${ number }%, ${ number }%)`>(((color: Color): `hsl(${ number }, ${ number }%, ${ number }%)` => `hsl(${ color.hue }, ${ 100 * Math.max(0, Math.min(1, (1 - 0.0625) * color.saturation)) }%, ${ 100 * Math.max(0, Math.min(1, (1 - 0.0625) * color.lightness)) }%)`)(this.brand.primaryColor));
  protected readonly brandPrimaryBackgroundLight$: Signal<`hsl(${ number }, ${ number }%, ${ number }%)`> = signal<`hsl(${ number }, ${ number }%, ${ number }%)`>(((color: Color): `hsl(${ number }, ${ number }%, ${ number }%)` => `hsl(${ color.hue }, ${ 100 * Math.max(0, Math.min(1, (1 + 0.0625) * color.saturation)) }%, ${ 100 * Math.max(0, Math.min(1, (1 + 0.0625) * color.lightness)) }%)`)(this.brand.primaryColor));
  protected readonly brandPrimaryForegroundDark$: Signal<`hsl(${ number }, ${ number }%, ${ number }%)`>  = signal<`hsl(${ number }, ${ number }%, ${ number }%)`>(((color: Color): `hsl(${ number }, ${ number }%, ${ number }%)` => `hsl(${ color.hue }, ${ 100 * Math.max(0, Math.min(1, Math.pow(color.saturation, color.lightness >= 0.5 ? 2.9375 : 0.1875))) }%, ${ 100 * Math.max(0, Math.min(1, Math.pow(color.lightness, color.lightness >= 0.5 ? 2.9375 : 0.1875))) }%)`)(this.brand.primaryColor));
  protected readonly brandPrimaryForegroundLight$: Signal<`hsl(${ number }, ${ number }%, ${ number }%)`> = signal<`hsl(${ number }, ${ number }%, ${ number }%)`>(((color: Color): `hsl(${ number }, ${ number }%, ${ number }%)` => `hsl(${ color.hue }, ${ 100 * Math.max(0, Math.min(1, Math.pow(color.saturation, color.lightness >= 0.5 ? 2.8125 : 0.0625))) }%, ${ 100 * Math.max(0, Math.min(1, Math.pow(color.lightness, color.lightness >= 0.5 ? 2.8125 : 0.0625))) }%)`)(this.brand.primaryColor));

}
