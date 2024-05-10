import { Signal } from "@preact/signals";
import { Td } from "../components/Td.tsx";
import { DayData, OffReason } from "../types.ts";
import { settings } from "../utilities/settings.ts";
import { column } from "../utilities/people.ts";
import { SelectableTd } from "../components/SelectableTd.tsx";
import { StateUpdater } from "preact/hooks";

interface RosterEntryProps {
  year: Signal<number>;
  month: Signal<number>;
  day: number;
  entries: DayData[];
  setShowStaffEditor: StateUpdater<boolean>;
  offReasons: OffReason[][];
}

export function RosterEntry(props: RosterEntryProps) {
  const date = new Date(props.year.value, props.month.value, props.day);
  const isSunday = date.getDay() === 0;

  return (
    <tr
      class={(isSunday ? "text-red-700" : "") + " " +
        (column.value && column.value.day === props.day ? "bg-slate-100" : "")}
    >
      <Td
        class="text-center max-w-fit"
        onMouseOver={(e) =>
          e.currentTarget.parentElement?.classList.add("bg-slate-50")}
        onMouseLeave={(e) =>
          e.currentTarget.parentElement?.classList.remove("bg-slate-50")}
      >
        {props.day.toString().padStart(2, "0")}
        {settings.value.showMonth
          ? `/${(props.month.value + 1).toString().padStart(2, "0")}`
          : ""}
        {settings.value.showYear ? `/${props.year}` : ""}{" "}
        {!isSunday && settings.value.showWeekDay
          ? "(" +
            date.toLocaleString("default", {
              weekday: settings.value.showFullDayName ? "long" : "short",
            }) + ")"
          : ""}
      </Td>
      <SelectableTd
        day={props.day}
        section={0}
        entries={props.entries}
        isSunday={isSunday}
        setShowStaffEditor={props.setShowStaffEditor}
        offReasons={props.offReasons}
      />
      <SelectableTd
        day={props.day}
        section={1}
        entries={props.entries}
        isSunday={isSunday}
        setShowStaffEditor={props.setShowStaffEditor}
        offReasons={props.offReasons}
      />
      <SelectableTd
        day={props.day}
        section={2}
        entries={props.entries}
        isSunday={isSunday}
        setShowStaffEditor={props.setShowStaffEditor}
        offReasons={props.offReasons}
      />
      <SelectableTd
        day={props.day}
        section={3}
        entries={props.entries}
        isSunday={isSunday}
        setShowStaffEditor={props.setShowStaffEditor}
        offReasons={props.offReasons}
      />
      <SelectableTd
        day={props.day}
        section={4}
        entries={props.entries}
        isSunday={isSunday}
        setShowStaffEditor={props.setShowStaffEditor}
        offReasons={props.offReasons}
      />
      <SelectableTd
        day={props.day}
        section={5}
        entries={props.entries}
        isSunday={isSunday}
        setShowStaffEditor={props.setShowStaffEditor}
        offReasons={props.offReasons}
      />
    </tr>
  );
}
