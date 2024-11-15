type BasicProps = {
  label: string;
};

type Props = BasicProps &
  Exclude<React.InputHTMLAttributes<HTMLInputElement>, keyof BasicProps>;

export function TextInput({ label, ...rest }: Props): JSX.Element {
  return (
    <label className="flex flex-col gap-2">
      <div className="ml-2 font-bold">{label}</div>
      <input
        className="block rounded-md border-4 border-orange-950 bg-orange-100 p-2 invalid:border-red-500"
        type="text"
        {...rest}
      />
    </label>
  );
}
