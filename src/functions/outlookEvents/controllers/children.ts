import { EventChildren } from "../interfaces/zoho";
import { Event, InstanceEvents } from "../interfaces/outlook";

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
