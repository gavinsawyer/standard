import compression = require("compression");
import express = require("express");

import { getI18nRequestHandler } from "./request handlers";
import { type LocaleId }         from "./types";


express().use(
  compression(),
).set(
  "view engine",
  "html",
).set(
  "views",
  `${ process.cwd() }/dist/apps/website/browser`,
).get(
  "*.*",
  getI18nRequestHandler(
    ({ staticRoot }: { staticRoot: string }): express.RequestHandler => express.static(
      staticRoot,
      {
        maxAge: "1y",
      },
    ),
  ),
).get(
  "*",
  getI18nRequestHandler(
    ({ localeId }: { localeId: LocaleId }): express.RequestHandler => require(
      `${ process.cwd() }/dist/apps/website/server/${ String(localeId) }/main.js`,
    )["getAppRequestHandler"](localeId),
  ),
).listen(
  process.env["PORT"] || 4000,
  (): void => console.log(`Node Express server listening on http://localhost:${ process.env["PORT"] || 4000 }`),
);
