interface HeaderProps {
  title: string;
  right?: React.ReactNode;
}

export function Header({ title, right }: HeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-100 px-4">
      <h1 className="text-h2">{title}</h1>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </header>
  );
}
