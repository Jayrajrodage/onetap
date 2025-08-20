import { CalendarDate } from "@internationalized/date";

// helper to format CalendarDate as MM-DD-YYYY
function formatDate(date: CalendarDate): string {
  const mm = String(date.month).padStart(2, "0");
  const dd = String(date.day).padStart(2, "0");
  const yyyy = date.year;

  return `${mm}-${dd}-${yyyy}`;
}

export function getDays(
  startDate: CalendarDate,
  endDate: CalendarDate
): string[] {
  const days: string[] = [];
  let current = startDate;

  while (current.compare(endDate) <= 0) {
    days.push(formatDate(current));
    current = current.add({ days: 1 });
  }

  return days;
}

export function formatDateTime(dt: string | number | null | undefined) {
  if (!dt) return "-";
  const date = new Date(dt);

  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

export function getElapsedTime(start: string | number, end: string | number) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();

  if (diffMs < 0) return "-";

  const mins = Math.floor(diffMs / 60000);
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;

  return `${hours > 0 ? `${hours}h ` : ""}${minutes}m`;
}
