import { StateUpdater } from "preact/hooks";
import RenameIcon from "../icons/rename.tsx";
import DeleteIcon from "../icons/delete.tsx";
import { DayData, OffReason } from "../types.ts";
import { KEYS } from "../utilities/people.ts";

interface EditorProps {
  staffs: string[];
  setStaffs: StateUpdater<string[]>;
  entries: DayData[];
  setEntries: StateUpdater<DayData[]>;
  offReasons: OffReason[][];
  setOffReasons: StateUpdater<OffReason[][]>;
}

export default function StaffEditor(props: EditorProps) {
  return (
    <div>
      <div class="text-xs font-bold mb-2 mt-4">
        STAFFS ({props.staffs.length})
      </div>
      <ul>
        {props.staffs
          .map((staff, i) => (
            <li class="flex item-center justify-between gap-1 py-1 px-2 cursor-pointer hover:bg-slate-100">
              <div class="flex-1">{staff}</div>
              <button
                class="px-1.5 border hover:border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white rounded-sm"
                onClick={() => {
                  const updatedNameInput = globalThis.prompt(
                    `Rename ${staff} to?`,
                  );
                  if (
                    updatedNameInput == null ||
                    updatedNameInput.trim().length === 0
                  ) {
                    return;
                  }
                  const updatedName = updatedNameInput.trim();
                  if (
                    props.staffs.map((x) => x.toLowerCase()).includes(
                      updatedName.toLowerCase(),
                    )
                  ) {
                    return globalThis.alert(
                      "ERROR: Staff with same name already exists.",
                    );
                  }
                  const staffs = [...props.staffs];
                  staffs.splice(i, 1, updatedName);
                  props.setStaffs(staffs.sort());
                  const updated = [...props.entries];
                  updated.map((day, i) =>
                    Object.values(day).map((shift: string[], j) => {
                      shift.map((person, k) => {
                        if (person === staff) {
                          updated[i][KEYS[j]].splice(k, 1, updatedName);
                        }
                      });
                    })
                  );
                  props.setEntries(updated);
                }}
              >
                <RenameIcon />
              </button>
              <button
                class="px-1.5 border hover:border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white rounded-sm"
                onClick={() => {
                  if (
                    !globalThis.confirm(
                      `Are you sure you want to delete the staff: ${staff}?`,
                    )
                  ) return;
                  const staffs = [...props.staffs];
                  staffs.splice(i, 1);
                  props.setStaffs(staffs);
                  const updated = [...props.entries];
                  const updatedReasons = [...props.offReasons];
                  updated.map((day, i) =>
                    Object.values(day).map((shift: string[], j) => {
                      shift.map((person, k) => {
                        if (person === staff) {
                          updated[i][KEYS[j]].splice(k, 1);
                          if (KEYS[j] === "off") {
                            updatedReasons[i].splice(k, 1);
                          }
                        }
                      });
                    })
                  );
                  props.setEntries(updated);
                  props.setOffReasons(updatedReasons);
                }}
              >
                <DeleteIcon />
              </button>
            </li>
          ))}

        <li class="flex item-center border mt-4 py-1 border-slate-900 justify-between gap-1 px-2 cursor-pointer hover:bg-slate-100">
          <div
            class="flex-1 text-center"
            onClick={() => {
              const nameInput = globalThis.prompt("Name of the staff?");
              if (
                nameInput == null ||
                nameInput.trim().length === 0
              ) return;
              const name = nameInput.trim();
              if (
                props.staffs.map((x) => x.toLowerCase()).includes(
                  name.toLowerCase(),
                )
              ) {
                return globalThis.alert(
                  "ERROR: Staff with same name already exists.",
                );
              }
              const staffs = [...props.staffs, name];
              props.setStaffs(staffs.sort());
            }}
          >
            +
          </div>
        </li>
      </ul>
    </div>
  );
}
