import Image from "next/image";
import { ReactNode } from "react";

export default function SectionDivider({
  image,
  numeral = "1",
  children,
}: {
  image?: string;
  numeral?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative isolate overflow-hidden bg-carbon">
      {image && (
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover opacity-35"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent), linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            maskComposite: "intersect",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent), linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskComposite: "source-in",
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-rb-navy-dark/50 via-transparent to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-carbon to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-carbon to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-display text-[16rem] font-bold leading-none text-white/5 md:text-[22rem]"
      >
        {numeral}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
