import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { socials } from "@/lib/socials";
import { formatDate } from "@/lib/utils";
import { LEGAL_UPDATED } from "../updated";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What this site collects, what it does not, and how to reach me about it. No analytics, no trackers, no cookies.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicy() {
  return (
    <>
      <h1 className="md-h1 text-2xl uppercase md:text-3xl">privacy policy</h1>
      <p className="mt-4 text-xs text-muted-foreground tabular-nums">
        last updated{" "}
        <time dateTime={LEGAL_UPDATED}>{formatDate(LEGAL_UPDATED)}</time>
      </p>

      <p className="mt-8">
        This is a personal portfolio. It has no accounts, no forms, no comments,
        no analytics, no advertising, and no third-party trackers. Nothing you
        do here is profiled, and no data about you is sold or shared for
        marketing. What follows is the full account of the little that is
        processed anyway.
      </p>

      <h2 className="md-h2 mt-10 text-base uppercase">who is responsible</h2>
      <p>
        Gaya KACI, based in {socials.location}, runs this site as an individual
        and is the data controller for it. Contact:{" "}
        <a href={`mailto:${socials.email}`}>{socials.email}</a>.
      </p>

      <h2 className="md-h2 mt-10 text-base uppercase">server logs</h2>
      <p>
        The web server in front of this site writes an access log entry for
        every request. Each entry holds your IP address, the time of the
        request, the method and path requested, the response status and size,
        the request duration, and the <code>User-Agent</code> and{" "}
        <code>Referer</code> headers your browser sent.
      </p>
      <p>
        These logs exist to keep the site running and to investigate abuse:
        spotting errors, tracing outages, and recognising scanning or
        brute-force traffic. The legal basis is legitimate interest, GDPR
        article 6(1)(f), in operating and securing a service I am responsible
        for. The logs are never used to build a profile of a visitor or to
        measure audience.
      </p>
      <p>
        Log files rotate automatically and old ones are deleted, so an entry
        lives at most 90 days.
      </p>

      <h2 className="md-h2 mt-10 text-base uppercase">
        the theme setting in your browser
      </h2>
      <p>
        When you switch between the light and dark theme, the choice is written
        to your browser&rsquo;s local storage under the key <code>theme</code>,
        so the site does not flash the wrong colours on your next visit. It is
        one word, <code>light</code> or <code>dark</code>. It stays on your
        device, is never sent to the server, and identifies nothing about you.
        The <Link href="/cookies">cookies policy</Link> covers how to clear it.
      </p>

      <h2 className="md-h2 mt-10 text-base uppercase">if you email me</h2>
      <p>
        The address published on this site is a forwarding alias run by{" "}
        <a href="https://addy.io" target="_blank" rel="noreferrer">
          addy.io
        </a>
        <span className="sr-only"> (opens in new tab)</span>, which relays mail
        to my real mailbox. Sending to it means addy.io and my mail provider
        handle the message, and I keep whatever you write for as long as the
        conversation is useful to either of us. I use it to reply to you and
        nothing else. Ask and I will delete the thread.
      </p>

      <h2 className="md-h2 mt-10 text-base uppercase">who else sees anything</h2>
      <ul>
        <li>
          <strong>The hosting provider</strong> that operates the server this
          site runs on, which necessarily carries the traffic and stores the
          logs described above.
        </li>
        <li>
          <strong>addy.io and my mail provider</strong>, and only for mail you
          choose to send.
        </li>
      </ul>
      <p>
        There is no one else. The project and contribution data on the home page
        is fetched from the GitHub API by the server, before the page reaches
        you, so your browser never contacts GitHub for it. Every script, style,
        font, and image is served from this domain; the site&rsquo;s content
        security policy blocks off-origin loads outright.
      </p>
      <p>
        Links out to GitHub, LinkedIn, X, and other sites are ordinary links.
        Once you follow one you are on that service, under its privacy policy,
        not this one.
      </p>

      <h2 className="md-h2 mt-10 text-base uppercase">your rights</h2>
      <p>
        Under the GDPR you may ask for access to the personal data held about
        you, its correction or erasure, a restriction on how it is processed, a
        copy in a portable format, and you may object to processing based on
        legitimate interest. Write to{" "}
        <a href={`mailto:${socials.email}`}>{socials.email}</a> and I will
        answer within a month.
      </p>
      <p>
        Be aware that server logs are keyed to IP addresses and nothing else, so
        a request about them has to include the address and rough time window
        you used. Without that I cannot find your entries, and I will not
        collect more data about you in order to try.
      </p>
      <p>
        If my answer does not satisfy you, you can complain to your national
        data protection authority. In France that is the{" "}
        <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">
          CNIL
        </a>
        <span className="sr-only"> (opens in new tab)</span>.
      </p>

      <h2 className="md-h2 mt-10 text-base uppercase">children</h2>
      <p>
        The site is not aimed at children and asks no one for their age, because
        it asks for nothing at all.
      </p>

      <h2 className="md-h2 mt-10 text-base uppercase">changes</h2>
      <p>
        If the site starts doing something this page does not describe, this
        page changes first and the date at the top moves with it. There is no
        mailing list to notify, so the date is the honest signal.
      </p>

      <Button
        variant="outline"
        size="sm"
        className="mt-10"
        render={<Link href="/cookies" />}
      >
        <span className="bracketed">cookies policy</span>
      </Button>
    </>
  );
}
