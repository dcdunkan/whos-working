export interface DayData {
  first: string[];
  dental: string[];
  ct: string[];
  second: string[];
  night: string[];
  off: string[];
}

export const OFF_REASONS = ["WOFF", "CL"] as const;
export type OffReason = typeof OFF_REASONS[number];

export interface MonthData {
  year: number;
  month: number;
  // entries: DayData[];
}
