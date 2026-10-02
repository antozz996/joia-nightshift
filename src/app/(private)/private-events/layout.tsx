export default function PrivateEventsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div data-world="private">{children}</div>;
}
