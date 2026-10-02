export default function NightlifeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div data-world="night">{children}</div>;
}
