import { CheckStatusPage } from "@/components/pages/CheckStatusPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("check-status");

export default function Page() {
  return <CheckStatusPage />;
}
