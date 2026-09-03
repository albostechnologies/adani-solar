import { ApplicantPaymentPage } from "@/components/pages/ApplicantPaymentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata("application-status"),
  title: "Partnership Payment | Adani Solar",
  description: "View bank details and submit payment proof for your Adani Solar partnership application.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ApplicantPaymentPage />;
}
