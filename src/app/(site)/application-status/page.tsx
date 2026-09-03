import { ApplicationStatusPage } from "@/components/pages/ApplicationStatusPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata("application-status"),
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ApplicationStatusPage />;
}

