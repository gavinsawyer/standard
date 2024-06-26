import { Injector, NgModule }                                                                                                          from "@angular/core";
import { Analytics, getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService }                                       from "@angular/fire/analytics";
import { FirebaseApp, initializeApp, provideFirebaseApp }                                                                              from "@angular/fire/app";
import { AppCheck, initializeAppCheck, provideAppCheck }                                                                               from "@angular/fire/app-check";
import { Auth, getAuth, provideAuth }                                                                                                  from "@angular/fire/auth";
import { AngularFirestoreModule }                                                                                                      from "@angular/fire/compat/firestore";
import { Firestore, getFirestore, provideFirestore }                                                                                   from "@angular/fire/firestore";
import { Functions, getFunctions, provideFunctions }                                                                                   from "@angular/fire/functions";
import { ReactiveFormsModule }                                                                                                         from "@angular/forms";
import { BrowserModule, provideClientHydration }                                                                                       from "@angular/platform-browser";
import { BrowserAnimationsModule }                                                                                                     from "@angular/platform-browser/animations";
import { RouterModule }                                                                                                                from "@angular/router";
import * as brand                                                                                                                      from "@standard/brand";
import { FlexboxComponent }                                                                                                            from "@standard/components";
import { BRAND, ENVIRONMENT, GIT_INFO, PACKAGE_VERSION }                                                                               from "@standard/injection-tokens";
import { routes as standardRoutes }                                                                                                    from "@standard/route-components";
import { AppCheckOptionsService }                                                                                                      from "@standard/services";
import { NgxMaskDirective, provideEnvironmentNgxMask, provideNgxMask }                                                                 from "ngx-mask";
import project                                                                                                                         from "../../../../project.json";
import { gitInfo }                                                                                                                     from "../../../.git-info";
import { packageVersion }                                                                                                              from "../../../.package-version";
import { environment }                                                                                                                 from "../../../environment";
import { AsideComponent, AudioFooterComponent, FooterComponent, HeaderComponent, LocaleDialogComponent, MainComponent, RootComponent } from "../../components";
import { LOCALE_IDS }                                                                                                                  from "../../injection tokens";
import { routes as websiteRoutes }                                                                                                     from "../../route components";


@NgModule({
  bootstrap:    [
    RootComponent,
  ],
  declarations: [
    RootComponent,
  ],
  imports:      [
    AngularFirestoreModule.enablePersistence(),
    AsideComponent,
    AudioFooterComponent,
    BrowserAnimationsModule,
    BrowserModule,
    FlexboxComponent,
    FooterComponent,
    HeaderComponent,
    LocaleDialogComponent,
    MainComponent,
    NgxMaskDirective,
    provideAnalytics(
      (): Analytics => getAnalytics(),
    ),
    provideAppCheck(
      (injector: Injector): AppCheck => initializeAppCheck(
        undefined,
        injector.get(AppCheckOptionsService).appCheckOptions,
      ),
    ),
    provideAuth(
      (): Auth => getAuth(),
    ),
    provideFirebaseApp(
      (): FirebaseApp => initializeApp(environment.firebase),
    ),
    provideFirestore(
      (): Firestore => getFirestore(),
    ),
    provideFunctions(
      (): Functions => getFunctions(),
    ),
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        ...websiteRoutes,
        ...standardRoutes,
      ],
      {
        bindToComponentInputs: true,
        initialNavigation:     "enabledBlocking",
      },
    ),
  ],
  providers:    [
    {
      provide:  BRAND,
      useValue: brand,
    },
    {
      provide:  ENVIRONMENT,
      useValue: environment,
    },
    {
      provide:  GIT_INFO,
      useValue: gitInfo,
    },
    {
      provide:  LOCALE_IDS,
      useValue: ([
        "en-US",
        ...Object.keys(
          project.i18n.locales,
        ),
      ]),
    },
    {
      provide:  PACKAGE_VERSION,
      useValue: packageVersion,
    },
    provideClientHydration(),
    provideEnvironmentNgxMask(),
    provideNgxMask(),
    ScreenTrackingService,
    UserTrackingService,
  ],
})
export class WebsiteBrowserModule { }
