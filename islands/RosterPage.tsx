import { useSignal } from "@preact/signals";
import Roster from "./Roster.tsx";
import { DayData, MonthData, OffReason } from "../types.ts";
import { getMonth } from "../utilities/date.ts";
import SettingsCheckbox from "./SettingsCheckbox.tsx";
import { Button } from "../components/Button.tsx";
import PeopleEditor from "./PeopleEditor.tsx";
import { useEffect, useState } from "preact/hooks";
import { column } from "../utilities/people.ts";
import StaffEditor from "./StaffEditor.tsx";
import { PEOPLE } from "../utilities/people.ts";

export default function RosterPage(data: MonthData) {
  const year = useSignal(data.year);
  const month = useSignal(data.month);
  const [entries, setEntries] = useState<DayData[]>(
    new Array(getMonth(data.year, data.month).days)
      .fill(null)
      .map(() => ({
        first: [],
        dental: [],
        ct: [],
        second: [],
        night: [],
        off: [],
      })),
  );
  const [offReasons, setOffReasons] = useState<OffReason[][]>(
    new Array(entries.length).fill(null).map(() => []),
  );
  const [staffs, setStaffs] = useState<string[]>(PEOPLE);
  const [hydrated, setHydrated] = useState(false);
  const [showStaffEditor, setShowStaffEditor] = useState(false);

  useEffect(() => {
    const staffs = localStorage.getItem("staffs");
    if (staffs == null) {
      localStorage.setItem("staffs", JSON.stringify(PEOPLE));
    } else {
      setStaffs(JSON.parse(staffs));
    }

    const monthData = localStorage.getItem(`${data.year}-${data.month}`);
    if (monthData == null) {
      localStorage.setItem(
        `${data.year}-${data.month}`,
        JSON.stringify({ entries, offReasons }),
      );
      console.log("written initial state to storage");
    } else {
      const { entries, offReasons } = JSON.parse(monthData);
      setEntries(entries);
      setOffReasons(offReasons);
      console.log("read from storage");
    }
    setHydrated(true);
  }, []);

  return (
    <div class="flex flex-row h-screen">
      <div class="w-2/12 h-full flex max-h-screen overflow-y-auto flex-col flex-grow border-r-2 border-slate-700 bg-slate-200 p-4 select-none print:hidden">
        <div class="m-2 flex-grow">
          <h1 class="text-3xl font-bold text-center">
            {getMonth(data.year, data.month).name} {data.year}
          </h1>
          <div class="text-md font-light text-slate-800 flex flex-row">
            {data.year >= 2024 && data.month >= 1 && (
              <a
                class="underline underline-offset-2 flex-grow"
                href={`/${data.month < 1 ? data.year - 1 : data.year}-${
                  data.month < 1 ? "12" : data.month.toString().padStart(2, "0")
                }`}
              >
                prev
              </a>
            )}{" "}
            <a
              class="underline underline-offset-2"
              href={`/${data.month + 2 > 12 ? data.year + 1 : data.year}-${
                data.month + 2 > 12
                  ? "01"
                  : (data.month + 2).toString().padStart(2, "0")
              }`}
            >
              next
            </a>
          </div>

          <div class="mt-4 mb-6">
            <h3 class="font-semibold py-2 text-lg">Settings</h3>
            <SettingsCheckbox id="showWeekDay">Show weekdays</SettingsCheckbox>
            <SettingsCheckbox id="showFullDayName">
              Show weekdays in full form
            </SettingsCheckbox>
            <SettingsCheckbox id="showMonth">
              Show month
            </SettingsCheckbox>
            <SettingsCheckbox id="showYear">
              Show year
            </SettingsCheckbox>
          </div>

          {!showStaffEditor && (
            <div class="my-1">
              <PeopleEditor
                year={year}
                month={month}
                entries={entries}
                setEntries={setEntries}
                offReasons={offReasons}
                setOffReasons={setOffReasons}
                staffs={staffs}
              />
            </div>
          )}

          {showStaffEditor && (
            <StaffEditor
              staffs={staffs}
              setStaffs={setStaffs}
              entries={entries}
              setEntries={setEntries}
              offReasons={offReasons}
              setOffReasons={setOffReasons}
            />
          )}
        </div>
        <div class="flex gap-1">
          <Button
            onClick={() => (setShowStaffEditor(!showStaffEditor),
              column.value = null)}
          >
            {(showStaffEditor ? "Close" : "Open") + " Staff Editor"}
          </Button>
        </div>
        <div class="flex gap-1">
          <Button onClick={() => globalThis.print()}>
            Print
          </Button>
        </div>
        <div class="font-light text-xs">
          The print output PDF will only contain the formatted table and the
          header.
        </div>
      </div>
      <div class="w-10/12 max-h-screen overflow-y-auto print:max-h-none print:overflow-y-visible select-none print:w-full">
        <div class="text-center text-2xl uppercase my-3 font-bold hidden print:grid">
          DUTY ROSTER {getMonth(data.year, data.month).name} {data.year}
        </div>
        <Roster
          month={month}
          year={year}
          entries={entries}
          hydrated={hydrated}
          setShowStaffEditor={setShowStaffEditor}
          offReasons={offReasons}
          staffs={staffs}
        />
      </div>
    </div>
  );
}
