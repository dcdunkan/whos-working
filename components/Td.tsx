import { JSX } from "preact";
import { ComponentChildren } from "preact";

interface TdProps extends JSX.HTMLAttributes<HTMLTableCellElement> {
}

export function Td(props: TdProps) {
  return (
    <td
      {...props}
      class={"border border-slate-600 px-4 py-2 " + props.class}
    />
  );
}
