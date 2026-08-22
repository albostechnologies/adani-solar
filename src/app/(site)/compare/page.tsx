import { ComparePage } from "@/components/pages/ComparePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("compare");

export default function Page() {
  return <ComparePage />;
}
