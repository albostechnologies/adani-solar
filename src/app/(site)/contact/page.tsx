import { ContactPage } from "@/components/pages/ContactPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("contact");

export default function Page() {
  return <ContactPage />;
}
