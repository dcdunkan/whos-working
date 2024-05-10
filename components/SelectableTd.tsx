import { JSX } from "preact";
import { column, KEYS } from "../utilities/people.ts";
import { DayData } from "../types.ts";
import { StateUpdater } from "preact/hooks";
import { OffReason } from "../types.ts";

interface SelectableTdProps extends JSX.HTMLAttributes<HTMLTableCellElement> {
  day: number;
  section: number;
  isSunday: boolean;
  entries: DayData[];
  setShowStaffEditor: StateUpdater<boolean>;
  offReasons: OffReason[][];
}

export function SelectableTd(props: SelectableTdProps) {
  return (
    <td
      class={"border border-slate-600 px-4 py-2 print:py-0 " +
        (column.value && column.value.day === props.day &&
            column.value.section === props.section
          ? (props.isSunday ? "bg-slate-600" : "bg-slate-700") + " text-white "
          : " ") +
        (column.value && column.value.section === props.section
          ? "bg-slate-100"
          : "")}
      onClick={() => (column.value = {
        day: props.day,
        section: props.section,
      },
        props.setShowStaffEditor(false))}
      onMouseEnter={(e) => e.currentTarget.classList.add("bg-slate-50")}
      onMouseLeave={(e) => e.currentTarget.classList.remove("bg-slate-50")}
    >
      {KEYS[props.section] === "off" &&
        props.entries[props.day - 1][KEYS[props.section]].map((person, i) =>
          person + " (" + props.offReasons[props.day - 1][i] + ")"
        ).join(", ")}
      {KEYS[props.section] !== "off" &&
        props.entries[props.day - 1][KEYS[props.section]].join(", ")}
    </td>
  );
}
