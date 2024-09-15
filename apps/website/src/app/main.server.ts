import { APP_BASE_HREF }                          from "@angular/common";
import { LOCALE_ID }                              from "@angular/core";
import { CommonEngine }                           from "@angular/ssr";
import * as express                               from "express";
import { existsSync }                             from "fs";
import "zone.js/node";
import { environment }                            from "../environment";
import { WebsiteServerModule as AppServerModule } from "./modules";
import { getI18nRequestHandler }                  from "./request handlers";
import { LocaleId }                               from "./types";


function getAppRequestHandler(localeId: LocaleId): express.RequestHandler {
  return (
    request: express.Request,
    response: express.Response,
    nextFunction: express.NextFunction,
  ): Promise<void> => new CommonEngine(
    {
      bootstrap:                 AppServerModule,
      enablePerformanceProfiler: !environment.production,
      providers:                 [
        {
          provide:  APP_BASE_HREF,
          useValue: `/${ String(localeId) }`,
        },
        {
          provide:  LOCALE_ID,
          useValue: localeId,
        },
      ],

    },
  ).render(
    {
      documentFilePath: `${ process.cwd() }/dist/apps/website/browser/${ String(localeId) }/${ existsSync(`${ process.cwd() }/dist/apps/website/browser/${ localeId }/index.original.html`) ? "index.original.html" : "index.html" }`,
      url:              `${ request.protocol }://${ request.headers.host }${ request.originalUrl }`,
      publicPath:       `${ process.cwd() }/dist/apps/website/browser/${ String(localeId) }`,
    },
  ).then<void>(
    (html: string): void => response.send(html) && void (0),
  ).catch<void>(
    (err): void => nextFunction(err),
  );
}


export {
  AppServerModule,
  getAppRequestHandler,
};


declare const __non_webpack_require__: NodeRequire;

((moduleFilename: string): boolean => moduleFilename === __filename || moduleFilename.includes("iisnode"))(
  ((mainModule: NodeJS.Module | undefined): string => mainModule && mainModule.filename || "")(
    __non_webpack_require__.main,
  ),
) && express().set(
  "view engine",
  "html",
).set(
  "views",
  `${ process.cwd() }/dist/apps/website/browser`,
).get(
  "*.*",
  getI18nRequestHandler(
    (
      { staticRoot }: {
        staticRoot: string,
      },
    ): express.RequestHandler => express.static(
      staticRoot,
      {
        maxAge: "1y",
      },
    ),
  ),
).get(
  "*",
  getI18nRequestHandler(
    (
      { localeId }: {
        localeId: LocaleId,
      },
    ): express.RequestHandler => getAppRequestHandler(localeId),
  ),
).listen(
  process.env["PORT"] || 4000,
  (): void => console.log(`Node Express server listening on http://localhost:${ process.env["PORT"] || 4000 }`),
);
