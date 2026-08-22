import { ManufacturingPage } from "@/components/pages/ManufacturingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("manufacturing");

export default function Page() {
  return <ManufacturingPage />;
}
