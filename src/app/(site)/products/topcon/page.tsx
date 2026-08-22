import { ProductDetailPage } from "@/components/pages/ProductDetailPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("product-topcon");

export default function Page() {
  return <ProductDetailPage productType="topcon" />;
}
