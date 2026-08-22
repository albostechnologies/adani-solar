import { SustainabilityPage } from "@/components/pages/SustainabilityPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("sustainability");

export default function Page() {
  return <SustainabilityPage />;
}
