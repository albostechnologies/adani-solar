import { TermsPage } from "@/components/pages/TermsPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("terms");

export default function Page() {
  return <TermsPage />;
}
