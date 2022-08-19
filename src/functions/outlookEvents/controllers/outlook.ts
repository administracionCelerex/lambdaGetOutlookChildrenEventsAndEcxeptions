import {
  AuthProvider,
  AuthProviderCallback,
  Client,
  ClientOptions,
  Options,
} from "@microsoft/microsoft-graph-client";
import { InstanceEvents } from "../interfaces/outlook";

export const getAllInstances = async (
  token: string,
  { idFather, startDateTime, endDateTime, pageSize }
): Promise<InstanceEvents> => {
  try {
    const authProvider: AuthProvider = (callback: AuthProviderCallback) => {
      const error = "";
      const accessToken = token;
      callback(error, accessToken);
    };

    let options: Options = {
      authProvider: authProvider,
    };

    const client = Client.init(options);
    const instancesOfEvent: InstanceEvents = (await client
      .api(
        `https://graph.microsoft.com/v1.0/me/events/${idFather}/instances?startDateTime=${startDateTime}&endDateTime=${endDateTime}&$top=${pageSize}`
      )
      .get()) as InstanceEvents;

    return instancesOfEvent;
  } catch (err) {
    console.log(err);
    return {
      "@odata.context": "null",
      value: [],
    };
  }
};
