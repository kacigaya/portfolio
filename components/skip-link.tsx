// Every page puts a fixed nav ahead of its content, so each one needs a way
// past it. Visible only while focused.
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-3 focus:py-1"
    >
      skip to content
    </a>
  );
}
