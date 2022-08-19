import { getModelForClass, prop } from "@typegoose/typegoose";
import * as mongoose from "mongoose";

/* require("dotenv").config(); */

export class TypeSubscription {
  @prop({ type: String })
  type: string;
  @prop({ type: String })
  resourceLink: string;
  @prop({ type: String })
  resourceName: string;
  @prop({ type: String })
  containerID: string;
}

export class UserOutlookSubscritionsSchema {
  @prop({ type: String })
  email: string;
  @prop({ type: String })
  token: string;
  @prop({ type: String })
  refreshToken: string;
  @prop({ type: String })
  name: string;
  @prop({ type: String })
  loginUserPrincipal: string;
  /* @prop({ type: () => [String] }) */
  @prop({ type: Object })
  resources: TypeSubscription[];
  @prop({ type: Boolean })
  canRenewSubscriptions: boolean;
}

export const userOutlookSubscritionsMoodel = getModelForClass(
  UserOutlookSubscritionsSchema,
  {
    schemaOptions: {
      timestamps: true,
      collection: "outlookAuth",
      autoCreate: false,
    },
  }
);

/* {
 "id": "000002",
 "email": "luiscelerex@outlook.com",
 "refreshToken": "M.R3_BL2.-Cbe1n4uImcmgWGbNt5o8QRJCtRtim2kR5SwkZEuWm1KXNVecc7gCxMPSUwO1AFae0tAFawMNMz!Sm3n4f4WGuf6JSRxhKwozhSYX4FC2ineui*yzQD9F1NppC!gklbx8BmGGqEjmYQpdJvzoFdnlJ6MMe*IZc4pA8fAv4XO8csUZ4Y2zohdd9q1bs8sQM*P6h4ftzxESewCA3!qnylBMvsNyhOGqGQoibthv3ain3b9L!iBk0Lcfs5HJODyvvPVFjU4Wo5AMkZ1SYQ6*l30ZI*z8POi8rTN9CezLDfl2rJa2nPFgZdtSe26GsFp7nm8kyfnLOxE8R*mY8QLMjKJJqLQgcrqx1CCpQEpp941o5RcC",
 "subscriptions": {
  "calendars": [
   {
    "expirationTimeUTC": "",
    "idSubscription": "",
    "resource": "me/events"
   }
  ],
  "contacts": [
   {
    "expirationTimeUTC": "2022-07-21T20:22:18Z",
    "idSubscription": "d4be7a4a-78b9-436f-80ef-1afbaafb6f7a",
    "resource": "/me/contacts"
   }
  ]
 },
 "token": "EwBwA8l6BAAUkj1NuJYtTVha+Mogk+HEiPbQo04AAeqcRKWeYS2PIFlwiei0MfAdbNjeVt0Worgq1ozFSW8nNHidzy22hWpFAvd8/s81dJ03nn++5BdM6K4bDeSO/alVfayNXOTVx5Frj0jh6SCJ3oeoMmaWw+EAgxvKD7Tl1+IBAVxOokVZ73c5k4FYaQAf9ZJLLva30yN8gpwuD0eH9aXQlPxbOfkeqsg1FDCOhBUg8OwhPWCbmc8/lxR2be4r9aIcOQoIKfgsM2Fe5vKD9zC23xLDp1lYC3kugS54vN2FvIVCwNjWa4ZVSBboR/GkVmarxGt2BlK0qhbihLRkIk+S7vL84VczLLB+tRll1SLj04uwcTFT+efX519w058DZgAACFgqio3NHu51QAL+ZolTjp8Mkjp3zzbtvWwwN0uqa3PeWmF5IwEKNBcKsJu0gm8TPX5T5dIc4mP/bah45iIg+hERjtKXD8B8ahaCcSadnHDycBfN6KgyRP660Y7L/pRNTjtiO6QPx+QqmwHbwaIvrTdTM2E7oLX/AZyDC8Y5SGRzZhohCT5vpOW710KPKTvO5cITdSAowAn/7/wNJkewN0QlIsulReLzlyQc2oYG8O9qbu9i0RelhTtJBHM2dV2qAejmYOpn0kbP2q/9sZLKaE5J8N1Rv28JfJjF3E56q8Te5C/RSqjGfo5V8SehRqduOrC2TzJfQwyalLdfw6FcD2culNqPe/jPfzlytyPtkkumg9IMM+aFbNNTKUVNKm2yEnD6jufCNP3wtevSaOtvIkRWMxVjXox8T6nJ9W7K8smA7GHW/4r9wgpBIqBxUJF6s3UJzgYcP047gFa7dB6Kas5oVBxj8osFU6NMDPkoor85+DTkua94jEK9gQJPWzJqCv8HJyJW2WCsqUWuJIU+Jyz0KFo/IcSWtWHcDmTjKMS81k2MlQmPNlf9uZrWuPPYuDsm4Ig42Qs0hSzRWJxlaJCgLmQq+hMbDkkXGuJKybAjx2tLo3rE9VrrNB++TNoeCCOd3hgq7FLGeLLS9K23sRlQRpajersMDG5TMSG8WOZc7qfBm+1p/0mXiCxj6vIWhRInGAbd6yYwsE96xa7kf5TLyrIoBNKY0a9du6Eq4C8b+TgwiGXI0q5MWRC/q0SRb+fFnz69KGpW8K+HAg==",
 "updatedAt": 1658433739473
} */
