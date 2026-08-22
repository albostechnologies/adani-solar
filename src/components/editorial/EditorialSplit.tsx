import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { RevealImage } from "@/components/editorial/RevealImage";
import { cn } from "@/lib/utils";

interface EditorialSplitProps {
  eyebrow?: string;
  eyebrowNumber?: string;
  title: string;
  children: React.ReactNode;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  tone?: "white" | "muted";
}

export function EditorialSplit({
  eyebrow,
  eyebrowNumber,
  title,
  children,
  image,
  imageAlt,
  reverse = false,
  tone = "white",
}: EditorialSplitProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center",
        reverse && "lg:[&>*:first-child]:order-2"
      )}
    >
      <RevealImage src={image} alt={imageAlt} aspectClass="aspect-[4/3] lg:aspect-[5/6]" />
      <div className={cn(reverse ? "lg:pr-4 xl:pr-10" : "lg:pl-4 xl:pl-10")}>
        {eyebrow && eyebrowNumber && (
          <SectionEyebrow number={eyebrowNumber} label={eyebrow} className="mb-5" />
        )}
        <EditorialHeading size="statement" className="mb-5">
          {title}
        </EditorialHeading>
        <div className="space-y-4 editorial-body text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
