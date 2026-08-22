import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="editorial-section min-h-[70vh] flex items-center bg-[#f7f7f5]">
        <div className="editorial-section-inner max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-solar-green mb-4">404</p>
          <EditorialHeading as="h1" size="section" className="mb-5">
            This page has lost the sunlight.
          </EditorialHeading>
          <p className="editorial-body text-muted-foreground mb-8">
            The page you requested is not available. Return to the homepage or contact our team for assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="editorial-btn-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
            >
              Return Home
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-solar-green transition-colors">
              Contact us →
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
