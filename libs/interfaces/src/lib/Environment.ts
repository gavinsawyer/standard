export interface Environment {
  "firebase": {
    "apiKey": string,
    "appId": string,
    "authDomain": string,
    "measurementId"?: string,
    "messagingSenderId": string,
    "projectId": string,
    "storageBucket": string
  },
  "production": boolean,
  "project": "website",
  "recaptchaKeyID": string,
  "stripe": {
    "apiKey": string,
  },
}
