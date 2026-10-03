import { NightFooter } from "@/components/nightlife/NightFooter";
import { NightMotionController } from "@/components/nightlife/NightMotionController";
import { NightNav } from "@/components/nightlife/NightNav";

export default function NightlifeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-world="night">
      <NightMotionController />
      <NightNav />
      {children}
      <NightFooter />
    </div>
  );
}
