import { EventAttende, LocationProperty } from "./interfaces/outlook";

export const getLocationString = (
  location: LocationProperty | null
): string => {
  if (!location) return "";

  if (!location.address) return "";

  const { street, city, state, countryOrRegion } = location.address;

  let street2 = street ? street + ", " : "";
  let state2 = state ? state + ", " : "";
  let city2 = city ? city + ", " : "";
  let countryOrRegion2 = countryOrRegion ? countryOrRegion : "";

  const newLocation = `${street2}${state2}${city2}${countryOrRegion2}`;

  return newLocation;
};

export const getAttendeesOutlook = (attendees: EventAttende[] | []) => {
  const attendeesObj = {
    firstAttende: "",
    listattendes: "",
    hasAttendes: false,
  };
  if (attendees.length == 0) {
    return attendeesObj;
  }

  for (let index = 0; index < attendees.length; index++) {
    const attende = attendees[index];
    const email = attende.emailAddress.address;

    if (index === 0) {
      attendeesObj.firstAttende = email;
      attendeesObj.hasAttendes = true;
    } else {
      let commaToAdd = "";
      if (index > 1) {
        commaToAdd = ",";
      }
      attendeesObj.listattendes += commaToAdd + email;
    }
  }

  return attendeesObj;
};
