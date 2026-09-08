export const brand = {
  name: "AiFax",
  tagline: "Enterprise AI Fax Automation",
  description:
    "HIPAA-compliant faxing with AI summarization, secure routing, and API-first integrations for healthcare, legal, and enterprise operations."
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/solutions", label: "Solutions" },
  { href: "/ehr-integration", label: "EHR Integration" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/speciality", label: "Speciality" },
  { href: "/contact", label: "Contact" }
];

export const socialItems = [
  { href: "https://facebook.com", label: "Facebook" },
  { href: "https://twitter.com", label: "Twitter" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://linkedin.com", label: "LinkedIn" }
];

export const newNumberUrl = "https://portal.aifax.net/index.php?rp=/store/cloud-faxing&path=new";
export const portNumberUrl = "https://portal.aifax.net/index.php?rp=/store/cloud-faxing&path=port";

// Short, clean stand-ins for the two URLs above, used as the visible link
// text in the AI-drafted reply (see ai-draft.ts / api/contact/route.ts).
// Not real subdomains, just display labels: every anchor built from these
// still points at the real newNumberUrl/portNumberUrl href above.
export const newNumberDisplay = "www.new.aifax.net";
export const portNumberDisplay = "www.port.aifax.net";

export const sharedCtas = {
  primary: { href: "https://portal.aifax.net/index.php?rp=/store/cloud-faxing", label: "Get Your Fax Number" },
  secondary: { href: "/pricing", label: "See Plans" }
};

export const loginCta = {
  href: "https://app.aifax.net/#/auth",
  label: "Login"
};

export const headerCtas = [
  { href: newNumberUrl, label: "Get New Number" },
  { href: portNumberUrl, label: "Port My Number" }
];
