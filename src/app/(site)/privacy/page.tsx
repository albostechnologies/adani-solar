import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("privacy");

export default function Page() {
  return <PrivacyPage />;
}
