import { AboutPage } from "@/components/pages/AboutPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("about-what-we-do");

export default function Page() {
  return <AboutPage />;
}
