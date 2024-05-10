import { ComponentChildren } from "preact";

interface ThProps {
  class?: string;
  children?: ComponentChildren;
}

export function Th(props: ThProps) {
  return (
    <th
      class={(props.class ? props.class + " " : "") +
        "border border-slate-600 px-4 py-2 print:py-0"}
      children={props.children}
    />
  );
}
