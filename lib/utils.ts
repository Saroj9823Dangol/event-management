import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Capitalizes the first letter of a string and converts the rest to lowercase
 * @param s - String to capitalize
 * @returns Capitalized string
 */
export const capitalize = (s: string): string => {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
};

export const formatDate = (date: string) => {
  return moment(date).format("Do MMMM, YYYY");
};

export const formatDateTime = (date: string) => {
  return moment(date).format("Do MMMM, YYYY | hh:mm A");
};

export const formatTime = (date: string) => {
  return moment(date).format("hh:mm A");
};

export const calculateDuration = (
  startTime: string,
  endTime: string
): string => {
  const start = moment(startTime);
  const end = moment(endTime);
  const duration = moment.duration(end.diff(start));
  return duration.humanize();
};
