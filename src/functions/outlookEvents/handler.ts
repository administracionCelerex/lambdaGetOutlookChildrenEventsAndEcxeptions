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
  const NO_QUERY_PARAMS = "NO_QUERY_PARAMS";

  const responseObj: responseFull = {
    children: [],
    childrenEcxeptions: [],
    error: { isError: true, msg: "" },
  };
  const queryParams = event.queryStringParameters;

  if (!queryParams) {
    console.log(NO_QUERY_PARAMS);
    responseObj.error.msg = NO_QUERY_PARAMS;
    return formatJSONResponseError({
      responseObj,
    });
  }

  const mongoServer = process.env.MONGOSERVER;
  const mongoDBName = process.env.MONGODBNAME;

  const { email, idFather, startDateTime, endDateTime, pageSize } = queryParams;

  if (!email || !idFather || !startDateTime || !endDateTime) {
    console.log(ALL_PARAMETERS_ARE_NEEDED);

    responseObj.error.msg = ALL_PARAMETERS_ARE_NEEDED;
    return formatJSONResponseError({
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

    const childrenEcxeptions: EventZoho[] = getChildrenEcxeptions([
      ...childrenEventsInstances,
    ]);

    /* console.log(childrenEcxeptions); */

    responseObj.children = childrenSiblings;
    responseObj.childrenEcxeptions = childrenEcxeptions;
    responseObj.error.isError = false;

    return formatJSONResponse({
      responseObj,
    });
  } catch (err) {
    responseObj.error.msg = CRITICAL_ERROR + " " + err;
    console.log(CRITICAL_ERROR + err);
    return formatJSONResponseError({
      responseObj,
    });
  }
};

export const main = middyfy(outlookEvents);
