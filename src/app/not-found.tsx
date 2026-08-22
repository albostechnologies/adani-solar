import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="min-h-[60vh] flex items-center justify-center px-4 py-24">
        <div className="max-w-lg text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-solar-green mb-3">
            404
          </p>
          <h1 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Page not found
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The page you requested is not available. Return to the homepage or
            contact our team for assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-solar-green hover:bg-solar-green-dark">
              <Link href="/">Return home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
