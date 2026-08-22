import { WhatWeDoPage } from "@/components/pages/WhatWeDoPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("about-what-we-do");

export default function Page() {
  return <WhatWeDoPage />;
}
