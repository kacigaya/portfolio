export function About() {
  return (
    <section id="about" className="mt-32">
      <h2 className="text-sm text-muted">
        <span aria-hidden>$</span> cat about.md
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed max-w-2xl">
        <p>
          Cybersecurity-focused developer, dual background in network/system
          administration and modern web development.
        </p>
        <p>
          Day job at{" "}
          <span className="text-white">Société Générale Assurance</span>: Python
          automation against complex web targets, session and identity
          management, Cloud provisioning across Azure and AWS.
        </p>
        <p>
          Off-hours: building small CLIs, browser tools, and AI side projects.
          Comfortable across Linux, macOS, and Windows. Always reading source
          over docs.
        </p>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-muted">
          <li>
            <span className="text-white">role</span> · web dev · cybersecurity
          </li>
          <li>
            <span className="text-white">degree</span> · M. cybersecurity, ESGI
            Paris
          </li>
          <li>
            <span className="text-white">location</span> · Paris, FR
          </li>
          <li>
            <span className="text-white">langs</span> · fr · en
          </li>
        </ul>
      </div>
    </section>
  );
}
