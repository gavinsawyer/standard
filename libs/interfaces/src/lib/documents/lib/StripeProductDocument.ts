import { type Timestamp as AdminTimestamp } from "@google-cloud/firestore";
import { type Timestamp }                   from "firebase/firestore";


export interface StripeProductDocument {
  "active"?: boolean;
  "asyncDeleted"?: Timestamp | AdminTimestamp;
  "attributes"?: string[];
  "created"?: AdminTimestamp | Timestamp;
  "defaultPrice"?: string;
  "description"?: string;
  "id"?: string;
  "images"?: string[];
  "livemode"?: boolean;
  "marketingFeatures"?: {
    "name"?: string;
  }[];
  "name"?: string;
  "packageDimensions"?: {
    "height": number;
    "length": number;
    "weight": number;
    "width": number;
  };
  "shippable"?: boolean;
  "statementDescriptor"?: string;
  "taxCode"?: string;
  "type"?: "good" | "service";
  "unitLabel"?: string;
  "updated"?: AdminTimestamp | Timestamp;
  "url"?: string;
}
