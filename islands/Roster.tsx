import type { Signal } from "@preact/signals";
import { getMonth } from "../utilities/date.ts";
import { RosterEntry } from "./RosterEntry.tsx";
import { Th } from "../components/Th.tsx";
import { DayData } from "../types.ts";
import { JSX } from "preact/jsx-runtime";
import { StateUpdater, useEffect } from "preact/hooks";
import { OffReason } from "../types.ts";

interface RosterProps {
  year: Signal<number>;
  month: Signal<number>;
  entries: DayData[];
  hydrated: boolean;
  setShowStaffEditor: StateUpdater<boolean>;
  offReasons: OffReason[][];
  staffs: string[];
}

export default function Roster(props: RosterProps) {
  const month = getMonth(props.year.value, props.month.value);
  const entries: JSX.Element[] = [];
  for (let i = 0; i < month.days; i++) {
    entries.push(
      <RosterEntry
        year={props.year}
        month={props.month}
        day={i + 1}
        entries={props.entries}
        offReasons={props.offReasons}
        setShowStaffEditor={props.setShowStaffEditor}
      />,
    );
  }

  useEffect(() => {
    if (!props.hydrated) return;
    localStorage.setItem(
      `${props.year}-${props.month}`,
      JSON.stringify({ entries: props.entries, offReasons: props.offReasons }),
    );
    localStorage.setItem("staffs", JSON.stringify(props.staffs));
    console.log("written updated to storage");
  }, [props.entries, props.offReasons, props.staffs]);

  return (
    <div class="my-3 mx-5">
      <table class="table-auto border border-slate-500 w-full">
        <thead>
          <tr class="table-row">
            <Th class="max-w-1">Date</Th>
            <Th>8am to 1pm</Th>
            <Th>Dental</Th>
            <Th>CT</Th>
            <Th>1pm to 6pm</Th>
            <Th>6pm to 8am</Th>
            <Th>Off</Th>
          </tr>
        </thead>
        <tbody>{...entries}</tbody>
      </table>
    </div>
  );
}
