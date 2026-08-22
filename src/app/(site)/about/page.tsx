import { AboutPage } from "@/components/pages/AboutPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("about");

export default function Page() {
  return <AboutPage />;
}
