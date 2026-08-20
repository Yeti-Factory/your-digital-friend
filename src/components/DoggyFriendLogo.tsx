import { cn } from "@/lib/utils";

type DoggyFriendLogoSize = "compact" | "card" | "hero";

interface DoggyFriendLogoProps {
  className?: string;
  size?: DoggyFriendLogoSize;
  showPoweredBy?: boolean;
}

const wordmarkSizes: Record<DoggyFriendLogoSize, string> = {
  compact: "text-[1.05rem]",
  card: "text-3xl sm:text-4xl",
  hero: "text-[2.75rem] sm:text-[3.5rem]",
};

const signatureSizes: Record<DoggyFriendLogoSize, string> = {
  compact: "text-[0.42rem]",
  card: "text-[0.56rem]",
  hero: "text-[0.68rem]",
};

const DoggyFriendLogo = ({
  className,
  size = "hero",
  showPoweredBy = true,
}: DoggyFriendLogoProps) => {
  return (
    <div
      className={cn("inline-flex flex-col items-end", className)}
      role="img"
      aria-label="Doggy Friend, powered by Yeti Lab"
    >
      <div
        aria-hidden="true"
        className={cn(
          "font-['Quicksand'] font-extrabold leading-[0.9] tracking-[-0.055em] whitespace-nowrap",
          wordmarkSizes[size],
        )}
      >
        <span className="text-brand-navy">Doggy</span>
        <span className="text-brand-orange"> Friend</span>
      </div>

      {showPoweredBy && (
        <div
          aria-hidden="true"
          className={cn(
            "mt-2 flex items-center gap-1.5 font-['Montserrat',_sans-serif] font-semibold uppercase tracking-[0.16em] text-brand-navy/65",
            signatureSizes[size],
          )}
        >
          <span>Powered by</span>
          <span className="flex items-center gap-1 tracking-normal">
            <span className="font-black tracking-[-0.08em]">
              <span className="text-brand-orange">Y</span>
              <span className="text-brand-navy">ETI</span>
            </span>
            <span className="rounded-[0.2em] bg-brand-navy px-[0.42em] py-[0.12em] font-extrabold tracking-[0.12em] text-brand-orange">
              LAB
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default DoggyFriendLogo;
