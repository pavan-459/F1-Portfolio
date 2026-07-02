import DriverBadge from "@/components/DriverBadge";
import FadeInSection from "@/components/FadeInSection";
import SectionDivider from "@/components/SectionDivider";

const CHANNELS = [
  {
    label: "Email",
    value: "chinu321nimmakuri@gmail.com",
    href: "mailto:chinu321nimmakuri@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/pavan-krishnan",
    href: "https://linkedin.com/in/pavan-krishnan",
  },
  {
    label: "GitHub",
    value: "github.com/pavan-459",
    href: "https://github.com/pavan-459",
  },
  {
    label: "Location",
    value: "Hyderabad, India",
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <SectionDivider image="/images/contact-bg.webp" numeral="44">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-32">
        <FadeInSection>
          <DriverBadge label="Radio In" />
          <h1 className="mt-6 font-display text-4xl font-bold text-white md:text-6xl">
            Ready To Race?
          </h1>
          <p className="mt-6 max-w-xl text-lg text-silver/80">
            Got a role, a project, or a problem worth pushing the limit on?
            Send it over — I don&apos;t back off the throttle.
          </p>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <a
            href="mailto:chinu321nimmakuri@gmail.com"
            className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-rb-red px-8 py-4 font-display text-sm font-semibold uppercase tracking-widest text-white transition-transform hover:scale-105"
          >
            Email Me →
          </a>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="mt-16 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2">
            {CHANNELS.map((c) => (
              <div key={c.label}>
                <p className="font-display text-xs uppercase tracking-widest text-rb-yellow">
                  {c.label}
                </p>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="mt-1 block text-silver/80 hover:text-white transition-colors"
                  >
                    {c.value}
                  </a>
                ) : (
                  <p className="mt-1 text-silver/80">{c.value}</p>
                )}
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </SectionDivider>
  );
}
