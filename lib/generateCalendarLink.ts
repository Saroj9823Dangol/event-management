import { IEvent } from "@/types";
import { format, parseISO } from "date-fns";

export const generateCalendarLinks = (event: IEvent) => {
  if (!event.lineups?.[0]) return null;

  const lineup = event.lineups[0];
  const startDate = parseISO(lineup.start_date || event.start_date!);
  const endDate = lineup.end_date
    ? parseISO(lineup.end_date)
    : new Date(startDate.getTime() + 4 * 60 * 60 * 1000);

  const venueName = lineup.custom_fields?.venue_name || "Dubai";
  const venueLink = lineup.custom_fields?.google_map_link || "";
  const title = event.name || "Event";

  // THIS IS THE KEY: Use HTML <a> tag + plain URL fallback
  const description = [
    (event.description || "").trim(),
    " ",
    `Get your tickets: <a href="${window.location.href}">Click here to book</a>`,
    " ",
    `Event link:  <a href="${window.location.href}">${window.location.href}</a>`,
    " ",
    `Location: <a href="${venueLink}">${venueName}</a>`,
    " ",
  ]
    .filter(Boolean)
    .join("\n");

  const formatForICS = (date: Date) => format(date, "yyyyMMdd'T'HHmmss");

  const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${formatForICS(startDate)}/${formatForICS(
    endDate
  )}&location=${encodeURIComponent(venueName)}&details=${encodeURIComponent(
    description
  )}&sf=true&output=xml`;

  // For .ics file (also supports basic HTML in some clients)
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `URL:${document.location.href}`,
    `DTSTART:${formatForICS(startDate)}`,
    `DTEND:${formatForICS(endDate)}`,
    `SUMMARY:${title.replace(/\n/g, " ")}`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
    `LOCATION:${venueName}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");

  const icsUrl =
    "data:text/calendar;charset=utf8," + encodeURIComponent(icsContent);

  return { google, icsUrl };
};
