import { ResourcesPage } from "@/components/pages/ResourcesPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("resources");

export default function Page() {
  return <ResourcesPage />;
}
