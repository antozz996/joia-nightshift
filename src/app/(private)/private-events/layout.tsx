import { PrivateMotionController } from "@/components/private/PrivateMotionController";
import { PrivateNav } from "@/components/private/PrivateNav";
import { WhatsAppSticky } from "@/components/private/WhatsAppSticky";

export default function PrivateEventsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-world="private">
      <PrivateMotionController />
      <PrivateNav />
      {children}
      <WhatsAppSticky />
    </div>
  );
}
