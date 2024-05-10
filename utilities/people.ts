import { signal } from "@preact/signals";
import { DayData } from "../types.ts";

export const PEOPLE = [
  "Placeholder 0",
  "Placeholder 1",
  "Placeholder 2",
].sort();

export const SECTIONS = [
  "First shift",
  "Dental shift",
  "CT shift",
  "Second shift",
  "Night shift",
  "Off duty list",
];

export const KEYS: (keyof DayData)[] = [
  "first",
  "dental",
  "ct",
  "second",
  "night",
  "off",
];

export const column = signal<{ section: number; day: number } | null>(null);
