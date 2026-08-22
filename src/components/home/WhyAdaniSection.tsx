import { homeContent } from "@/content/home";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";

const advantages = [
  {
    title: "Vertical Integration",
    description: "From raw materials to advanced modules across an integrated Mundra campus.",
  },
  {
    title: "Advanced Technology",
    description: "TOPCon and MonoPERC platforms engineered for India's diverse climate conditions.",
  },
  {
    title: "Quality & Reliability",
    description: "Certified for demanding environments with rigorous IEC and in-house testing.",
  },
  {
    title: "Global Standards",
    description: "ISO, BIS, ALMM, Bloomberg Tier-1 and Kiwa PVEL Top Performer recognition.",
  },
];

export function WhyAdaniSection() {
  return (
    <section className="editorial-section bg-white">
      <div className="editorial-section-inner">
        <SectionEyebrow number="06" label="Why Adani Solar" className="mb-6" />
        <EditorialHeading size="statement" className="max-w-3xl mb-12 sm:mb-16">
          Engineering trust at scale.
        </EditorialHeading>

        <div className="divide-y divide-border/70">
          {advantages.map((item, index) => (
            <div
              key={item.title}
              className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 md:gap-8 py-7 sm:py-9"
            >
              <p className="text-sm tabular-nums text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="font-[family-name:var(--font-poppins)] text-xl sm:text-2xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="editorial-body text-muted-foreground max-w-2xl">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 editorial-body text-muted-foreground max-w-2xl">
          {homeContent.trustBadges.subtitle}
        </p>
      </div>
    </section>
  );
}
