import { Signal } from "@preact/signals";
import { column, KEYS, SECTIONS } from "../utilities/people.ts";
import { getMonth } from "../utilities/date.ts";
import { DayData, OFF_REASONS, OffReason } from "../types.ts";
import { StateUpdater } from "preact/hooks";

interface EditorProps {
  year: Signal<number>;
  month: Signal<number>;
  entries: DayData[];
  setEntries: StateUpdater<DayData[]>;
  offReasons: OffReason[][];
  setOffReasons: StateUpdater<OffReason[][]>;
  staffs: string[]
}

export default function PeopleEditor(props: EditorProps) {
  if (column.value == null) {
    return (
      <div class="py-2 text-lg font-light text-slate-700">
        Click on a column to edit
      </div>
    );
  }

  return (
    <div>
      <div>
        <span class="font-medium py-2 text-md">
          {new Date(props.year.value, props.month.value, column.value.day)
            .toLocaleString("default", { weekday: "long" })}
        </span>,{" "}
        <span class="font-medium py-2 text-md">
          {getMonth(props.year.value, props.month.value).name}{" "}
          {column.value.day}
        </span>
      </div>

      <div class="font-semibold text-xl">
        {SECTIONS[column.value.section]}
      </div>

      <div
        class="font-light text-xs text-slate-700 underline cursor-pointer underline-offset-2 mb-4"
        onClick={() => column.value = null}
      >
        clear selection
      </div>

      {KEYS[column.value.section] === "off" && (
        <>
          <div class="text-xs font-bold my-2">
            ASSIGNED ({props
              .entries[column.value.day - 1][KEYS[column.value.section]]
              .length})
          </div>
          <ul>
            {props.entries[column.value.day - 1][KEYS[column.value.section]]
              .map(
                (person, i) => {
                  return (
                    <li class="flex item-center justify-between gap-1 py-1 px-2 cursor-pointer hover:bg-red-100">
                      <div
                        class="flex-1"
                        onClick={() => {
                          if (column.value == null) return;
                          const updated = [...props.entries];
                          updated[column.value.day - 1][
                            KEYS[column.value.section]
                          ]
                            .splice(i, 1);
                          props.setEntries(updated);
                          const updatedReasons = [...props.offReasons];
                          updatedReasons[column.value.day - 1].splice(i, 1);
                          props.setOffReasons(updatedReasons);
                        }}
                      >
                        - {person}
                      </div>
                      <select
                        onChange={(e) => {
                          if (column.value == null || KEYS[column.value.section] !== "off") return;
                          const updatedReasons = [...props.offReasons];
                          updatedReasons[column.value.day - 1].splice(i, 1, e.currentTarget.value as OffReason);
                          props.setOffReasons(updatedReasons);
                        }}
                        class="appearance-none px-3 bg-slate-300 rounded-md"
                      >
                        {OFF_REASONS.map((reason) => <option>{reason}</option>)}
                      </select>
                    </li>
                  );
                },
              )}
          </ul>

          <div class="text-xs font-bold mb-2 mt-4">
            AVAILABLE ({props.staffs.filter((person) =>
              column.value &&
              !Object.values(props.entries[column.value.day - 1]).flat()
                .includes(person)
            )
              .length})
          </div>
          <ul>
            {props.staffs
              .filter((person) =>
                column.value &&
                !Object.values(props.entries[column.value.day - 1]).flat()
                  .includes(person)
              )
              .map((person) => (
                <li class="flex item-center justify-between gap-1 py-1 px-2 cursor-pointer hover:bg-green-100">
                  <div
                    class="flex-1"
                    onClick={() => {
                      if (column.value == null) return;
                      const updated = [...props.entries];
                      updated[column.value.day - 1][KEYS[column.value.section]]
                        .push(person);
                      props.setEntries(updated);
                      const updatedReasons = [...props.offReasons];
                      updatedReasons[column.value.day - 1].push(OFF_REASONS[0]); // first one is set in options by default
                      props.setOffReasons(updatedReasons);
                    }}
                  >
                    + {person}
                  </div>
                </li>
              ))}
          </ul>
        </>
      )}

      {KEYS[column.value.section] !== "off" && (
        <>
          <div class="text-xs font-bold my-2">
            ASSIGNED ({props
              .entries[column.value.day - 1][KEYS[column.value.section]]
              .length})
          </div>
          <ul>
            {props.entries[column.value.day - 1][KEYS[column.value.section]]
              .map(
                (person, i) => {
                  return (
                    <li
                      class="flex item-center justify-between gap-1 py-1 px-2 cursor-pointer hover:bg-red-100"
                      onClick={() => {
                        if (column.value == null) return;
                        const updated = [...props.entries];
                        updated[column.value.day - 1][
                          KEYS[column.value.section]
                        ]
                          .splice(i, 1);
                        props.setEntries(updated);
                      }}
                    >
                      <div class="flex-1">- {person}</div>
                    </li>
                  );
                },
              )}
          </ul>

          <div class="text-xs font-bold mb-2 mt-4">
            AVAILABLE ({props.staffs.filter((person) =>
              column.value &&
              !Object.values(props.entries[column.value.day - 1]).flat()
                .includes(person)
            )
              .length})
          </div>
          <ul>
            {props.staffs
              .filter((person) =>
                column.value &&
                !Object.values(props.entries[column.value.day - 1]).flat()
                  .includes(person)
              )
              .map((person) => (
                <li
                  class="flex item-center justify-between gap-1 py-1 px-2 cursor-pointer hover:bg-green-100"
                  onClick={() => {
                    if (column.value == null) return;
                    const updated = [...props.entries];
                    updated[column.value.day - 1][KEYS[column.value.section]]
                      .push(person);
                    props.setEntries(updated);
                  }}
                >
                  <div class="flex-1">+ {person}</div>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
