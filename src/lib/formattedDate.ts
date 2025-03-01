import { formatDistanceToNow } from "date-fns";

export const dateFromNow = (dateString: any) => {
  try {
    const date = new Date(dateString) || Date.now();
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    return null;
  }
};
