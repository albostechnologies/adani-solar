import { HomePage } from "@/components/pages/HomePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("home");

export default function Page() {
  return <HomePage />;
}
