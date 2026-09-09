export const brand = {
  name: "AiFax",
  tagline: "AI Fax for Medical Practices",
  description:
    "Every fax read by AI, matched to the patient, summarized, and routed into your EHR workflow. HIPAA-compliant, keep your fax number."
};

export const navItems = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/ehr-integration", label: "EHR Integration" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" }
];

// Twitter and Instagram removed for now (no active accounts). The LinkedIn
// link is the public company page; the /admin/dashboard/ URL only works
// for page admins.
export const socialItems = [
  { href: "https://www.facebook.com/profile.php?id=61558699837320", label: "Facebook" },
  { href: "https://www.linkedin.com/company/104773014/", label: "LinkedIn" }
];

export const newNumberUrl = "https://portal.aifax.net/index.php?rp=/store/cloud-faxing&path=new";
export const portNumberUrl = "https://portal.aifax.net/index.php?rp=/store/cloud-faxing&path=port";

// Short, clean stand-ins for the two URLs above, used as the visible link
// text in the AI-drafted reply (see ai-draft.ts / api/contact/route.ts).
// Not real subdomains, just display labels: every anchor built from these
// still points at the real newNumberUrl/portNumberUrl href above.
export const newNumberDisplay = "www.new.aifax.net";
export const portNumberDisplay = "www.port.aifax.net";

export const phone = { display: "954-872-1918", href: "tel:+19548721918" };
export const supportEmail = "info@aifax.net";

/** Public demo video. Env can override; the default keeps the embed live. */
export const demoVideoLink = process.env.YOUTUBE_VIDEO_LINK || "https://www.youtube.com/watch?v=Qba6EBhzKyI";

export const sharedCtas = {
  primary: { href: portNumberUrl, label: "Port My Number" },
  secondary: { href: newNumberUrl, label: "Get a New Number" }
};

export const loginCta = {
  href: "https://app.aifax.net/#/auth",
  label: "Login"
};

export const headerCtas = [
  { href: newNumberUrl, label: "Get New Number" },
  { href: portNumberUrl, label: "Port My Number" }
];
