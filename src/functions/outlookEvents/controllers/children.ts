import { EventChildren, EventZoho } from "../interfaces/zoho";
import { Event, InstanceEvents } from "../interfaces/outlook";
import { getAttendeesOutlook, getLocationString } from "../helpers";

export const getChildrenSiblings = (
  childrenEventsInstances: Event[]
): EventChildren[] => {
  const childrenOcurrences = childrenEventsInstances.filter(
    (childEventInsta) => childEventInsta.type === "occurrence"
  );
  const childrenSiblings: EventChildren[] = childrenOcurrences.map((child) => {
    const { occurrenceId, seriesMasterId, id } = child;
    const eventChild: EventChildren = {
      childrenId: id,
      occurrneceId: occurrenceId,
    };

    return eventChild;
  });

  return childrenSiblings;
};

const transformDataToCRMEvent = (eventCalendar: Event) => {
  const {
    start,
    end,
    attendees,
    iCalUId,
    id,
    subject,
    location,
    bodyPreview,
    wasDeleted,
  } = eventCalendar;

  const startTimeUtc = start.dateTime;
  const endUtc = end.dateTime;
  let isRecurrentEvent = false;
  const locationTranformed = getLocationString(location);

  const { firstAttende, listattendes, hasAttendes } =
    getAttendeesOutlook(attendees);

  const eventZoho: EventZoho = {
    startUTC: startTimeUtc,
    endUTC: endUtc,
    eventId: id,
    icalUID: iCalUId,
    isRecurrentEvent,
    calendarId: "",
    service: "OUTLOOK",
    title: subject,
    notes: bodyPreview,
    recurrenceRule: "",
    principalAttende: firstAttende,
    secondariesAttendes: listattendes,
    location: locationTranformed,
    hasAttendes,
    wasDeleted,
  };

  return eventZoho;
};

export const getChildrenEcxeptions = (
  childrenEventsInstances: Event[]
): EventZoho[] => {
  const eventsEcxeptions = childrenEventsInstances.filter(
    (childEventInsta) => childEventInsta.type == "exception"
  );

  const childrenZoho: EventZoho[] = eventsEcxeptions.map((child) => {
    return transformDataToCRMEvent(child);
  });

  return childrenZoho;
};
