import { signal } from "@preact/signals";

export interface Settings {
  showWeekDay: boolean;
  showFullDayName: boolean;
  showMonth: boolean;
  showYear: boolean;
}

export const settings = signal<Settings>({
  showWeekDay: false,
  showFullDayName: false,
  showMonth: true,
  showYear: true,
});
