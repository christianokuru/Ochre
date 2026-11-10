import type { Metadata } from "next";
import { UserPlus } from "lucide-react";

import { PageTitle } from "@/components/app/bits";
import { ClientsGrid } from "@/components/app/clients-grid";
import { Button } from "@/components/ui/button";
import { CLIENTS } from "@/lib/app-data";
import { money } from "@/lib/format";

export const metadata: Metadata = { title: "Clients" };

export default function ClientsPage() {
  const total = CLIENTS.reduce((s, c) => s + c.ltv, 0);
  return (
    <div className="mx-auto max-w-[1280px]">
      <PageTitle title="Clients" sub={`${CLIENTS.length} clients · ${money(total)} lifetime`}>
        <Button className="h-9">
          <UserPlus /> Add client
        </Button>
      </PageTitle>
      <ClientsGrid />
    </div>
  );
}
