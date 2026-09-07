import Script from "next/script";

/**
 * Google Analytics 4 and the Meta (Facebook) Pixel, both loaded only when
 * their ID is actually configured, so a site running without either set
 * yet (fresh local dev, or before Kevin has created the GA4 property /
 * Meta Pixel) never ships a broken empty tag.
 *
 * GA4 is the free, industry-standard tool for the deep SEO/traffic
 * reporting (search terms via Search Console, referrers, geography,
 * device) that would not be worth rebuilding by hand. The custom
 * /admin page (see admin/page.tsx) covers the business-specific data GA4
 * cannot: who actually submitted the contact form and which campaign
 * drove them, since Google's terms prohibit sending PII like a real
 * email address into GA4.
 *
 * The Meta Pixel fires PageView here; the matching server-side
 * Conversions API "Lead" event fires in /api/contact when the form is
 * submitted (see lib/meta-capi.ts) - sending the same event from both
 * places is Meta's current recommended setup.
 */
export function MarketingPixels() {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <>
      {ga4Id ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}');
            `}
          </Script>
        </>
      ) : null}

      {metaPixelId ? (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}
    </>
  );
}
