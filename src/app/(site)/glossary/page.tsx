import { GlossaryPage } from "@/components/pages/GlossaryPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("glossary");

export default function Page() {
  return <GlossaryPage />;
}
