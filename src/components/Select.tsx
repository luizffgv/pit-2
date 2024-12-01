import React from "react";

type Option = {
  id: string;
  name: string;
};

type BasicProps = {
  label: string;
  options: Option[];
};

type Props = BasicProps &
  Exclude<React.SelectHTMLAttributes<HTMLSelectElement>, keyof BasicProps>;

export function Select({ label, options, ...rest }: Props): JSX.Element {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold">{label}</label>
      <select
        className="rounded-md border-4 border-orange-950 bg-orange-100 px-4 py-2"
        {...rest}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id} >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
