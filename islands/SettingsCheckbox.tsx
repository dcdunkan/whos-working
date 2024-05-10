import { ComponentChildren } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Settings, settings } from "../utilities/settings.ts";

interface SettingsCheckboxProps {
  id: keyof Settings;
  children: ComponentChildren;
  disabled?: boolean;
}

export default function SettingsCheckbox(props: SettingsCheckboxProps) {
  if (!IS_BROWSER) return <div>Not a browser</div>;
  
  const id = `settings-${props.id}`;
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={settings.value[props.id]}
        disabled={props.disabled}
        onChange={(e) =>
          settings.value = {
            ...settings.value,
            [props.id]: e.currentTarget.checked,
          }}
      />
      <label for={id} class="ms-2 text-sm select-none">
        {props.children}
      </label>
    </div>
  );
}
