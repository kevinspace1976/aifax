import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { mailingAddress } from "@/lib/unsubscribe";

export const metadata: Metadata = {
  title: "Privacy Policy | AiFax",
  description: "How AiFax collects, uses, and protects information on aifax.net and in the AiFax service."
};

const EFFECTIVE_DATE = "September 9, 2026";

function H2({ children }: { children: string }) {
  return <h2 className="mt-10 text-xl font-semibold text-white">{children}</h2>;
}

export default function PrivacyPage() {
  const address = mailingAddress();
  return (
    <main>
      <PageHero
        title="Privacy Policy"
        description="How Healthcare Utilization Consultants LLC, doing business as AiFax, collects, uses, and protects information on this website and in the AiFax service."
        actions={<p className="text-sm text-slate-400">Effective date: {EFFECTIVE_DATE}</p>}
      />

      <section className="section-shell py-12 sm:py-14">
        <div className="max-w-3xl space-y-4 text-slate-300">
          <p>
            This Privacy Policy describes how Healthcare Utilization Consultants LLC, doing business as AiFax
            (&quot;AiFax,&quot; &quot;we,&quot; &quot;us&quot;), handles information when you visit www.aifax.net (the
            &quot;Site&quot;) and when you use the AiFax fax and document services (the &quot;Service&quot;). By using
            the Site or the Service you agree to this policy.
          </p>

          <H2>1. Protected health information</H2>
          <p>
            The Service is designed for healthcare organizations and may transmit, store, and process protected
            health information (&quot;PHI&quot;) as defined by HIPAA. When we handle PHI on behalf of a customer we
            act as a Business Associate, and our use of that PHI is governed by the Business Associate Agreement
            (&quot;BAA&quot;) the customer signs at signup, not by this policy. Where this policy and a BAA conflict,
            the BAA controls for PHI.
          </p>
          <p>
            Do not submit PHI through the Site&apos;s contact form, chat, or email to sales. Those channels are not
            intended for patient information.
          </p>

          <H2>2. Information we collect on the Site</H2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong className="text-slate-100">Information you give us.</strong> When you request a workflow
              review, contact us, or sign up, we collect what you enter: name, practice or organization, email,
              phone, EHR platform, current fax provider and number, monthly volume, and anything you add in a
              notes field.
            </li>
            <li>
              <strong className="text-slate-100">Usage and device information.</strong> Pages visited, referring
              page, approximate location derived from IP address, browser and device type, and campaign
              identifiers from links you clicked (for example UTM parameters or advertising click IDs). We store
              IP addresses only in hashed form.
            </li>
            <li>
              <strong className="text-slate-100">Cookies and similar technologies.</strong> We use a first-party
              cookie to remember how you arrived at the Site, and analytics and advertising tags described in
              section 5.
            </li>
          </ul>

          <H2>3. Information we collect in the Service</H2>
          <p>
            To provide the Service we process account information (contact details, login credentials, billing
            information handled by our payment processor), fax metadata (numbers, timestamps, page counts,
            delivery status), fax content and the AI-generated summaries, extracted identifiers, and patient list
            data a customer chooses to load for patient matching. Fax content and patient data are customer data
            processed under the BAA and the Terms of Service.
          </p>

          <H2>4. How we use information</H2>
          <ul className="list-disc space-y-2 pl-6">
            <li>To provide, operate, secure, and support the Service and the Site.</li>
            <li>To respond to your requests and send service, billing, and account messages.</li>
            <li>
              To send marketing email about AiFax when you have requested information from us. Every marketing
              email includes an unsubscribe link, and we honor opt-outs promptly.
            </li>
            <li>To measure and improve the Site, our advertising, and the Service.</li>
            <li>To comply with law, enforce our agreements, and protect rights, safety, and property.</li>
          </ul>
          <p>We do not sell personal information, and we do not sell or share PHI.</p>

          <H2>5. Analytics and advertising</H2>
          <p>
            The Site uses Google Analytics to understand traffic and Meta (Facebook) tools to measure the results
            of our advertising. These providers may set cookies or receive hashed identifiers, and their use of
            information is governed by their own policies. You can limit this collection with browser settings,
            Google&apos;s Analytics opt-out add-on, and your Meta ad preferences. We do not run analytics or
            advertising tags inside the Service where PHI is handled.
          </p>

          <H2>6. Service providers</H2>
          <p>
            We share information with vendors who process it for us under contract and, where PHI is involved,
            under a BAA: cloud hosting and storage, telecommunications carriers that deliver faxes, transactional
            and marketing email delivery, payment processing, AI model providers used to read and summarize
            documents, and customer support tools. Vendors may use information only to perform services for us.
          </p>

          <H2>7. Other disclosures</H2>
          <p>
            We may disclose information to comply with law or legal process, to protect the rights and safety of
            AiFax, our customers, or others, in connection with a merger, acquisition, or sale of assets (with
            notice to affected customers), or with your direction or consent.
          </p>

          <H2>8. Security</H2>
          <p>
            We use administrative, technical, and physical safeguards appropriate to the sensitivity of the
            information, including encryption in transit and at rest, access controls, audit logging, and
            role-based access. No method of transmission or storage is completely secure, and we cannot
            guarantee absolute security.
          </p>

          <H2>9. Retention</H2>
          <p>
            We keep Site lead information for as long as it is useful for the purposes above or as required by
            law. Service data is retained for the life of the customer account and for a limited period after
            closure to allow export, then deleted or de-identified, subject to the BAA, legal holds, and backup
            cycles.
          </p>

          <H2>10. Your choices and rights</H2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Unsubscribe from marketing email using the link in any message, or by emailing us.</li>
            <li>Ask us to access, correct, or delete the personal information we hold about you.</li>
            <li>
              California residents may have additional rights under the CCPA, including the right to know,
              delete, and correct personal information and to opt out of sale or sharing. We do not sell or share
              personal information as those terms are defined by California law.
            </li>
            <li>
              Requests about PHI held on behalf of a healthcare provider should be directed to that provider; we
              will assist the provider as the BAA requires.
            </li>
          </ul>

          <H2>11. Children</H2>
          <p>The Site and the Service are for businesses and are not directed to children under 13. We do not knowingly collect personal information from children.</p>

          <H2>12. Changes</H2>
          <p>
            We may update this policy. We will post the new version on this page with a new effective date and,
            for material changes affecting Service customers, notify the account email on file.
          </p>

          <H2>13. Contact</H2>
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
