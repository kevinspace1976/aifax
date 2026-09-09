import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { mailingAddress } from "@/lib/unsubscribe";

export const metadata: Metadata = {
  title: "Terms and Conditions | AiFax",
  description: "The terms that govern use of aifax.net and the AiFax fax and document services."
};

const EFFECTIVE_DATE = "September 9, 2026";

function H2({ children }: { children: string }) {
  return <h2 className="mt-10 text-xl font-semibold text-white">{children}</h2>;
}

export default function TermsPage() {
  const address = mailingAddress();
  return (
    <main>
      <PageHero
        title="Terms and Conditions"
        description="The agreement between you and Healthcare Utilization Consultants LLC, doing business as AiFax, for use of this website and the AiFax service."
        actions={<p className="text-sm text-slate-400">Effective date: {EFFECTIVE_DATE}</p>}
      />

      <section className="section-shell py-12 sm:py-14">
        <div className="max-w-3xl space-y-4 text-slate-300">
          <p>
            These Terms and Conditions (&quot;Terms&quot;) govern your use of www.aifax.net (the &quot;Site&quot;)
            and the AiFax fax, document reading, and related services (the &quot;Service&quot;) provided by
            Healthcare Utilization Consultants LLC, doing business as AiFax (&quot;AiFax,&quot; &quot;we,&quot;
            &quot;us&quot;). By using the Site or subscribing to the Service you agree to these Terms. If you are
            accepting on behalf of an organization, you represent that you have authority to bind it. A signed
            Service Agreement or Business Associate Agreement between AiFax and a customer controls over these
            Terms where they conflict.
          </p>

          <H2>1. The Service</H2>
          <p>
            AiFax provides cloud fax sending and receiving, AI-generated summaries and extracted information from
            received documents, an online dashboard, email delivery, and optional integration services with
            electronic health record (&quot;EHR&quot;) systems. Features vary by plan. We may improve or change
            features and will not materially reduce the core functionality of a paid plan during its current
            billing period without notice.
          </p>

          <H2>2. Accounts</H2>
          <p>
            You must provide accurate account information and keep it current. You are responsible for all
            activity under your account and for keeping credentials confidential. Notify us promptly of any
            unauthorized use. Your account email is your identity across AiFax systems; contact us to change it.
          </p>

          <H2>3. Healthcare use and HIPAA</H2>
          <p>
            If you are a covered entity or business associate under HIPAA and will transmit or store protected
            health information (&quot;PHI&quot;) through the Service, you must execute our Business Associate
            Agreement (&quot;BAA&quot;) before doing so. We provide it electronically at signup. You are responsible
            for using the Service in a manner consistent with your own HIPAA obligations, including appropriate
            workforce access, minimum-necessary practices, and verifying recipients before sending PHI.
          </p>

          <H2>4. AI-generated content</H2>
          <p>
            Summaries, extracted identifiers, patient matches, and document classifications are generated
            automatically and may contain errors or omissions. They are provided to assist review and are not
            medical advice, a diagnosis, or a substitute for reading the original document. Clinical decisions
            must be based on the original document and professional judgment. Where the Service flags an item for
            review, you are responsible for that review. AiFax does not file documents into a patient chart
            without a configured integration or a human confirmation step.
          </p>

          <H2>5. Acceptable use</H2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Use the Service only for lawful purposes and in compliance with applicable law, including the Telephone Consumer Protection Act and the Junk Fax Prevention Act; do not send unsolicited advertisements by fax.</li>
            <li>Do not send content that is illegal, infringing, harassing, or malicious, or that you lack the right to transmit.</li>
            <li>Do not attempt to access other customers&apos; data, probe or disrupt the Service, reverse engineer it, or resell it without written permission.</li>
            <li>Do not use the Service to build a competing product or to train models on our outputs.</li>
          </ul>
          <p>We may suspend accounts that violate this section, with notice where practical.</p>

          <H2>6. Fax numbers and porting</H2>
          <p>
            Numbers we assign remain with AiFax while your account is active in good standing. If you port a
            number to us, you authorize us to file the port with your current carrier on your behalf and you
            agree to keep your current service active until the port completes. Porting timelines are set by
            carriers and are outside our control; we will keep you informed. On cancellation you may port your
            number away within 30 days; numbers not ported may be released.
          </p>

          <H2>7. Plans, billing, and overages</H2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Plans are billed in advance, monthly or annually as selected, and renew automatically until cancelled.</li>
            <li>Each plan includes a monthly page allowance for sending and receiving combined. Pages beyond the allowance are billed at the additional-page rate shown on the pricing page at the time of use.</li>
            <li>Prices exclude applicable taxes. We may change prices with at least 30 days notice; changes apply at your next renewal.</li>
            <li>Payment is by the card or method on file. Failed payments may result in suspension after notice.</li>
            <li>EHR integration and custom development are separate projects quoted in writing; their fees and milestones are set in that written quote or Service Agreement.</li>
          </ul>

          <H2>8. Cancellation and refunds</H2>
          <p>
            Monthly plans may be cancelled at any time from your billing portal or by emailing us; service
            continues through the end of the paid period and is not prorated. Annual plans may be cancelled for
            the next term. Fees for a completed period are non-refundable except where required by law or where
            we have billed in error, which we will correct promptly. Duplicate or erroneous charges reported to us
            will be refunded.
          </p>

          <H2>9. Your data</H2>
          <p>
            You retain all rights to documents, patient data, and other content you submit. You grant us the
            rights needed to operate the Service for you, including processing content with our service providers
            under contract and, for PHI, under a BAA. You are responsible for having the rights and consents
            necessary to submit content. On termination you may export your data for 30 days, after which we
            delete or de-identify it subject to legal requirements and backup cycles.
          </p>

          <H2>10. Availability and support</H2>
          <p>
            We aim for continuous availability but do not guarantee uninterrupted service. Scheduled maintenance
            will be announced where practical. Support is available by email at info@aifax.net and by phone at
            954-872-1918.
          </p>

          <H2>11. Intellectual property</H2>
          <p>
            The Service, Site, software, and AiFax marks are owned by AiFax or its licensors and are protected by
            law. These Terms grant you a limited, non-exclusive, non-transferable right to use the Service during
            your subscription. Feedback you provide may be used without obligation to you.
          </p>

          <H2>12. Disclaimers</H2>
          <p>
            EXCEPT AS EXPRESSLY STATED IN A SIGNED AGREEMENT, THE SERVICE AND SITE ARE PROVIDED &quot;AS IS&quot;
            WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT AI OUTPUT WILL BE ACCURATE OR
            COMPLETE, THAT EVERY FAX WILL BE DELIVERED, OR THAT ANY THIRD-PARTY SYSTEM, INCLUDING AN EHR, WILL
            ACCEPT DOCUMENTS FROM THE SERVICE.
          </p>

          <H2>13. Limitation of liability</H2>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY LAW, AIFAX WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL,
            CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, REVENUE, OR DATA, ARISING FROM THE SERVICE OR
            THESE TERMS. OUR TOTAL LIABILITY FOR ANY CLAIM WILL NOT EXCEED THE AMOUNTS YOU PAID US FOR THE SERVICE
            IN THE 12 MONTHS BEFORE THE CLAIM. THESE LIMITS DO NOT APPLY WHERE PROHIBITED BY LAW OR TO OBLIGATIONS
            UNDER A SIGNED BAA.
          </p>

          <H2>14. Indemnification</H2>
          <p>
            You will defend and indemnify AiFax against third-party claims arising from content you transmit,
            your violation of law or these Terms, or your use of the Service in a manner not authorized by these
            Terms.
          </p>

          <H2>15. Termination</H2>
          <p>
            Either party may terminate for material breach not cured within 30 days of written notice. We may
            suspend immediately for security risks, legal requirements, or non-payment after notice. Sections that
            by their nature should survive (including 4, 9, and 11 through 17) survive termination.
          </p>

          <H2>16. Governing law and disputes</H2>
          <p>
            These Terms are governed by the laws of the State of Florida, without regard to conflict-of-law
            rules. The parties will attempt in good faith to resolve any dispute informally within 30 days before
            bringing a claim. Any action will be brought in the state or federal courts located in Broward County,
            Florida, and the parties consent to that jurisdiction.
          </p>

          <H2>17. General</H2>
          <p>
            These Terms, the Privacy Policy, and any signed Service Agreement or BAA are the entire agreement
            between you and AiFax about the Service. If any provision is unenforceable, the rest remains in
            effect. You may not assign these Terms without our consent; we may assign them in connection with a
            merger or sale. Notices to you may be sent to your account email. We may update these Terms by
            posting a new version with a new effective date; material changes will be notified to the account
            email, and continued use after the effective date is acceptance.
          </p>

          <H2>18. Contact</H2>
          <p>
            Healthcare Utilization Consultants LLC d/b/a AiFax
            <br />
            {address ? (
              <>
                {address}
                <br />
              </>
            ) : null}
            info@aifax.net
            <br />
            954-872-1918
          </p>
        </div>
      </section>
    </main>
  );
}
