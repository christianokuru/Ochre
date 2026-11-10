import type { Metadata } from "next";

import { PageTitle } from "@/components/app/bits";
import { SettingsForm } from "@/components/app/settings-form";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-[1100px]">
      <PageTitle title="Settings" sub="Imole Studio · Studio plan, renews Jan 14, 2027" />
      <SettingsForm />
    </div>
  );
}
