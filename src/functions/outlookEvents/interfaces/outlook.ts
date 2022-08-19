export interface EventAttende {
  type: string;
  status: { response: string; time: string };
  emailAddress: { name: string; address: string };
}

interface EventBodyProperty {
  contentType: string;
  content: string;
}

interface DateTimeTimeZone {
  dateTime: string;
  timeZone: string;
}

interface PhysicalAddressProperty {
  city: string;
  countryOrRegion: string;
  postalCode: string;
  state: string;
  street: string;
}
interface OutlookGeoCoordinates {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  latitude: number;
  longitude: number;
}

export interface LocationProperty {
  address: PhysicalAddressProperty;
  coordinates: OutlookGeoCoordinates;
  displayName: string;
  locationEmailAddress: string;
  locationUri: string;
  locationType: string;
  uniqueId: string;
  uniqueIdType: string;
}

interface PhoneResType {
  number: string;
  type: string;
}

interface OnlineMeetingInfo {
  conferenceId: string;
  joinUrl: string;
  phones: PhoneResType[];
  quickDial: string;
  tollFreeNumbers: string[];
  tollNumber: string;
}
interface EmailAddressResourceType {
  address: string;
  name: string;
}
interface RecipientResourceType {
  emailAddress: EmailAddressResourceType;
}

interface RecurrencePatternResourceType {
  dayOfMonth: number;
  daysOfWeek: String[];
  firstDayOfWeek: String;
  index: String;
  interval: number;
  month: number;
  type: String;
}
interface RecurrenceRangeResourceType {
  endDate: string;
  numberOfOccurrences: number;
  recurrenceTimeZone: string;
  startDate: string;
  type: string;
}

interface PatternedRecurrenceResource {
  pattern: RecurrencePatternResourceType;
  range: RecurrenceRangeResourceType;
}

interface ResponseStatusResourceType {
  response: string;
  time: string;
}

export interface Event {
  allowNewTimeProposals: boolean;
  attendees: [] | EventAttende[];
  body: EventBodyProperty | {};
  bodyPreview: string;
  categories: string[];
  changeKey: string;
  createdDateTime: string;
  end: DateTimeTimeZone;
  hasAttachments: boolean;
  hideAttendees: boolean;
  iCalUId: string;
  id: string;
  importance: string;
  isAllDay: boolean;
  isCancelled: boolean;
  isDraft: boolean;
  isOnlineMeeting: boolean;
  isOrganizer: boolean;
  isReminderOn: boolean;
  lastModifiedDateTime: string;
  location: LocationProperty | null;
  locations: LocationProperty[] | [];
  onlineMeeting: OnlineMeetingInfo | null;
  onlineMeetingProvider: string;
  onlineMeetingUrl: string;
  organizer: RecipientResourceType | null;
  originalEndTimeZone: string;
  originalStart: string;
  originalStartTimeZone: string;
  occurrenceId: string;
  recurrence: PatternedRecurrenceResource | null;
  reminderMinutesBeforeStart: number;
  responseRequested: boolean;
  responseStatus: ResponseStatusResourceType | null;
  sensitivity: string;
  seriesMasterId: string;
  showAs: string;
  start: DateTimeTimeZone;
  subject: string;
  type: string;
  webLink: string;
  wasDeleted: boolean;

  /* attachments: [{ "@odata.type": "microsoft.graph.attachment" }];
  calendar: { "@odata.type": "microsoft.graph.calendar" };
  extensions: [{ "@odata.type": "microsoft.graph.extension" }];
  instances: [{ "@odata.type": "microsoft.graph.event" }];
  singleValueExtendedProperties: [
    { "@odata.type": "microsoft.graph.singleValueLegacyExtendedProperty" }
  ];
  multiValueExtendedProperties: [
    { "@odata.type": "microsoft.graph.multiValueLegacyExtendedProperty" }
  ]; */
}

export interface InstanceEvents {
  "@odata.context": string;
  value: Event[];
}
