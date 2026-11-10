import type { Metadata } from "next";

import { PageTitle } from "@/components/app/bits";
import { ProjectBoard } from "@/components/app/project-board";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1280px]">
      <PageTitle title="Projects" sub="Everything from first hello to final invoice." />
      <ProjectBoard />
    </div>
  );
}
