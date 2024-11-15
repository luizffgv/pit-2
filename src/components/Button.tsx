import React from "react";

type Props = Exclude<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
>;

export function Button(props: Props) {
  return (
    <button
      className=":not(:disabled):hover:bg-orange-900 :not(:disabled):cursor-pointer rounded-lg bg-orange-950 px-4 py-2 font-bold text-orange-50 transition"
      {...props}
    />
  );
}
