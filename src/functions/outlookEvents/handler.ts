import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import {
  AuthProvider,
  AuthProviderCallback,
  Client,
  ClientOptions,
  Options,
} from "@microsoft/microsoft-graph-client";

import { mongoose } from "@typegoose/typegoose";
import schema from "./schema";
import "isomorphic-fetch";
require("dotenv").config();

const outlookEvents: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const queryParams = event.queryStringParameters;
  const mongoServer = process.env.MONGOSERVER;
  const mongoDBName = process.env.MONGODBNAME;

  const { email } = queryParams;

  if (!email) {
    console.log("No email");
  }

  try {
    await mongoose.connect(`mongodb+srv://${mongoServer}/${mongoDBName}`);

    const authProvider: AuthProvider = (callback: AuthProviderCallback) => {
      const error = "";
      const accessToken = "";
      callback(error, accessToken);
    };

    let options: Options = {
      authProvider: authProvider,
    };

    const client = Client.init(options);
    /* const clientProm = client.api(`/subscriptions`); */

    console.log(email);

    return formatJSONResponse({
      /* message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`, */
      event,
    });
  } catch (err) {
    console.log(err);
  }
};

export const main = middyfy(outlookEvents);
