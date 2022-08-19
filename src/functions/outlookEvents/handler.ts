import {
  formatJSONResponseError,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { mongoose } from "@typegoose/typegoose";
import schema from "./schema";
import "isomorphic-fetch";
import { userOutlookSubscritionsMoodel } from "./models/OutlookAuth";
import { Event, InstanceEvents } from "./interfaces/outlook";
import { responseFull } from "./interfaces/responses";
import { EventChildren, EventZoho } from "./interfaces/zoho";
import {
  getChildrenEcxeptions,
  getChildrenSiblings,
} from "./controllers/children";
import { getAllInstances } from "./controllers/outlook";

require("dotenv").config();

const outlookEvents: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const ALL_PARAMETERS_ARE_NEEDED = "ALL_PARAMETERS_ARE_NEEDED";
  const CRITICAL_ERROR = "CRITICAL_ERROR";
  const NO_USER_WAS_FOUND_IN_DB = "NO_USER_WAS_FOUND_IN_DB";

  const responseObj: responseFull = {
    children: [],
    childrenEcxeptions: [],
    error: { isError: true, msg: "" },
  };
  const queryParams = event.queryStringParameters;
  const mongoServer = process.env.MONGOSERVER;
  const mongoDBName = process.env.MONGODBNAME;

  const { email, idFather, startDateTime, endDateTime, pageSize } = queryParams;
  /* const idFather =
    "AQMkADAwATMwMAItNDdlZQAtNGNjAS0wMAItMDAKAEYAAAPJSF6JHgzGR7ZKq6xPKg0oBwDVR8q3f5wGS5opBpMMe4EJAAACAQ0AAADVR8q3f5wGS5opBpMMe4EJAAAAiHjXdwAAAA=="; */

  /* const startDateTime = "2022-08-22T09:00:00.0000000";
  const endDateTime = "2022-08-30T09:00:00.0000000"; */

  if (!email || !idFather || !startDateTime || !endDateTime) {
    console.log(ALL_PARAMETERS_ARE_NEEDED);

    responseObj.error.msg = ALL_PARAMETERS_ARE_NEEDED;
    return formatJSONResponseError({
      /* message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`, */
      responseObj,
    });
  }

  try {
    await mongoose.connect(`mongodb+srv://${mongoServer}/${mongoDBName}`);

    const user = await userOutlookSubscritionsMoodel
      .findOne({ email })
      .select({ email: 1, token: 1 });

    if (!user) {
      console.log(NO_USER_WAS_FOUND_IN_DB);

      responseObj.error.msg = NO_USER_WAS_FOUND_IN_DB + " " + email;
      return formatJSONResponseError({
        /* message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`, */
        responseObj,
      });
    }

    const { email: emailUser, token } = user;

    const paramsToMakeTheApiCall = {
      idFather,
      startDateTime,
      endDateTime,
      pageSize: pageSize ? +pageSize : 5,
    };

    const instancesOfEvent = await getAllInstances(
      token,
      paramsToMakeTheApiCall
    );

    const { value: childrenEventsInstances } = instancesOfEvent;

    console.log(childrenEventsInstances);

    if (childrenEventsInstances.length == 0) {
      console.log("Ya no hay eventos");
    }

    const childrenSiblings: EventChildren[] = getChildrenSiblings([
      ...childrenEventsInstances,
    ]);

    /* console.log(childrenSiblings); */
    console.log(childrenSiblings.length);

    const childrenEcxeptions: EventZoho[] = getChildrenEcxeptions([
      ...childrenEventsInstances,
    ]);

    /* console.log(childrenEcxeptions); */
    console.log(childrenEcxeptions.length);

    responseObj.children = childrenSiblings;
    responseObj.childrenEcxeptions = childrenEcxeptions;
    responseObj.error.isError = false;

    return formatJSONResponse({
      /* message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`, */
      responseObj,
    });
  } catch (err) {
    responseObj.error.msg = CRITICAL_ERROR + " " + err;
    console.log(CRITICAL_ERROR + err);
    return formatJSONResponseError({
      /* message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`, */
      responseObj,
    });
  }
};

export const main = middyfy(outlookEvents);
