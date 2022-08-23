export interface EventZoho {
  calendarId: string;
  endUTC: string;
  eventId: string;
  hasAttendes: boolean;
  icalUID: string;
  isRecurrentEvent: boolean;
  location: string;
  notes: string;
  principalAttende: string;
  recurrenceRule: string | null;
  secondariesAttendes: string;
  service: string;
  startUTC: string;
  title: string;
  wasDeleted: boolean;
}

export interface EventChildren {
  childrenId: string;
  occurrneceId: string;
  startTimeUtc: string;
  endTimeUtc: string;
}
