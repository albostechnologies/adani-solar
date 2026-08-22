import { ProductDetailPage } from "@/components/pages/ProductDetailPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("product-monoperc");

export default function Page() {
  return <ProductDetailPage productType="monoperc" />;
}
