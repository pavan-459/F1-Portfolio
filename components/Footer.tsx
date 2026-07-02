export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-carbon overflow-hidden">
      <div className="pointer-events-none absolute -right-10 -top-10 select-none font-display text-[10rem] font-bold text-white/5">
        1
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-silver/60">
        <p className="font-display uppercase tracking-widest">
          Pavan Krishna Nimmakuri — Never Give Up.
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/pavan-459"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rb-yellow transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/pavan-krishnan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rb-yellow transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:chinu321nimmakuri@gmail.com"
            className="hover:text-rb-yellow transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
