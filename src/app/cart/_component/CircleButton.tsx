type Props = {
  children: React.ReactNode;
  onClick?: (() => void) | undefined;
};

export function CircleButton({ children, onClick }: Props): JSX.Element {
  return (
    <button
      className="flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-orange-950 text-orange-200 transition hover:bg-orange-900"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
