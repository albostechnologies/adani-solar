import { CareersPage } from "@/components/pages/CareersPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("careers");

export default function Page() {
  return <CareersPage />;
}
