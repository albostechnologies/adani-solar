import { WhySolarPage } from "@/components/pages/WhySolarPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("why-solar");

export default function Page() {
  return <WhySolarPage />;
}
