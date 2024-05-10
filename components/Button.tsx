import { JSX } from "preact";

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {}

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      class={"p-2 my-2 border border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white w-full rounded-md " +
        (props.class ? props.class : "")}
    />
  );
}
