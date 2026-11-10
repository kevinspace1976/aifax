const { chromium } = require('playwright');
const fs = require('fs');
const icon = fs.readFileSync(__dirname + '/aifax-hint-icon.svg', 'utf8');
const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">`;
const BASE = `*{margin:0;padding:0;box-sizing:border-box}html,body{background:transparent}
body{font-family:'Source Sans 3',sans-serif;color:#0f172a}.d{font-family:'Plus Jakarta Sans',sans-serif}`;
const S = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" width="300" height="300">${d}</svg>`;
const spark = (x, y, r) => `<path d="M${x} ${y - r}c${r*0.1} ${r*0.67} ${r*0.33} ${r*0.9} ${r} ${r}-${r*0.67} ${r*0.1}-${r*0.9} ${r*0.33}-${r} ${r}-${r*0.1}-${r*0.67}-${r*0.33}-${r*0.9}-${r}-${r} ${r*0.67}-${r*0.1} ${r*0.9}-${r*0.33} ${r}-${r}z" fill="#f97316" stroke="none"/>`;
const glyphs = {
  summary: S(`<path d="M6 3h7l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M13 3v4h4"/><path d="M8 11h6M8 14h7"/><path d="M8 17h4" stroke="#f97316"/>${spark(19, 4.5, 2.6)}`),
  match: S(`<circle cx="10" cy="8" r="3.5"/><path d="M3.5 20c.8-3.6 3.4-5.5 6.5-5.5 1.3 0 2.5.3 3.5.9"/><path d="M15 18l2 2 4-4.5" stroke="#f97316" stroke-width="2"/>`),
  chart: S(`<path d="M3 7.5V18a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 21 18V9.5A1.5 1.5 0 0 0 19.5 8h-7l-2-2.5h-6A1.5 1.5 0 0 0 3 7z"/><path d="M12 10.5v6M9.5 14l2.5 2.5 2.5-2.5" stroke="#f97316" stroke-width="2"/>`),
  number: S(`<rect x="3" y="9" width="18" height="10" rx="1.5"/><path d="M7 9V3.5h8l2 2V9"/><path d="M6.5 13h4M6.5 16h6"/><circle cx="16.5" cy="13" r="0.6" fill="#fff"/><circle cx="18.5" cy="13" r="0.6" fill="#fff"/><path d="M15.5 16.2h3.5" stroke="#f97316" stroke-width="2"/>`),
};
const tile = (g) => `<div style="width:600px;height:600px;border-radius:132px;background:#0f172a;display:flex;align-items:center;justify-content:center">${g}</div>`;
const logo = `<div style="width:1200px;height:400px;display:flex;align-items:center;gap:56px;padding:0 60px">
  <div style="width:280px;height:280px">${icon.replace('<svg ', '<svg width="280" height="280" ')}</div>
  <div class="d" style="font-size:210px;font-weight:800;letter-spacing:-6px;line-height:1"><span style="color:#0f172a">Ai</span><span style="color:#f97316">Fax</span></div></div>`;
const steps = [
  ['1', 'Fax arrives', 'On your AiFax number, or forwarded from your current fax provider.'],
  ['2', 'AI reads it', 'A summary of every page in about a minute, set up the way your practice wants it.'],
  ['3', 'Matched to the patient', 'Name and date of birth checked against your Hint patients. Unsure matches go to staff review.'],
  ['4', 'Filed to the Hint chart', 'The fax and its summary filed into the patient\'s chart in Hint, within what Hint allows.'],
];
const flow = `<div style="width:1600px;height:1000px;background:#fff;position:relative;padding:96px 96px 0">
  <div style="position:absolute;top:0;left:0;right:0;height:14px;background:#f97316"></div>
  <div class="d" style="font-size:44px;font-weight:800"><span>Ai</span><span style="color:#f97316">Fax</span> <span style="font-size:26px;letter-spacing:4px;color:#64748b;font-weight:700;margin-left:18px">+ HINT</span></div>
  <div class="d" style="margin-top:44px;font-size:76px;font-weight:800;line-height:1.08;letter-spacing:-1.5px;max-width:1300px">From the fax line to the patient's chart in Hint.</div>
  <div style="margin-top:64px;display:grid;grid-template-columns:repeat(4,1fr);gap:28px">
  ${steps.map(([n, t, b]) => `<div style="border:2px solid #e2e8f0;border-radius:28px;padding:38px 32px;min-height:380px;background:${n === '4' ? '#fff7ed' : '#f8f7f4'}">
    <div class="d" style="width:64px;height:64px;border-radius:50%;background:${n === '4' ? '#f97316' : '#0f172a'};color:#fff;font-size:32px;font-weight:800;display:flex;align-items:center;justify-content:center">${n}</div>
    <div class="d" style="margin-top:30px;font-size:36px;font-weight:800;line-height:1.15">${t}</div>
    <div style="margin-top:16px;font-size:27px;line-height:1.38;color:#334155">${b}</div></div>`).join('')}
  </div>
  <div style="position:absolute;bottom:56px;left:96px;font-size:26px;color:#64748b">HIPAA compliant, with a signed BAA &nbsp;·&nbsp; aifax.net</div></div>`;
const rows = [['Matched patient', 'Jane Sample'], ['Date of birth', '01/15/1980'], ['Match confidence', '97%'], ['Document type', 'Lab result'], ['Chart', "Filed to the patient's chart in Hint"]];
const summary = `<div style="width:1600px;height:1000px;background:#f8f7f4;position:relative;padding:80px 96px">
  <div style="position:absolute;top:0;left:0;right:0;height:14px;background:#f97316"></div>
  <div style="display:flex;justify-content:space-between;align-items:center">
    <div class="d" style="font-size:58px;font-weight:800;letter-spacing:-1px">Every fax, summarized and matched.</div>
    <div class="d" style="font-size:22px;font-weight:700;letter-spacing:3px;color:#9a3412;border:2px solid #fdba74;background:#fff7ed;border-radius:999px;padding:10px 24px">SAMPLE DATA</div></div>
  <div style="margin-top:48px;display:grid;grid-template-columns:600px 1fr;gap:36px">
    <div style="background:#fff;border:2px solid #e2e8f0;border-radius:28px;padding:40px">
      <div class="d" style="font-size:30px;font-weight:800">Fax matched to Jane Sample</div>
      ${rows.map(([k, v]) => `<div style="display:flex;justify-content:space-between;gap:20px;border-top:2px solid #f1f5f9;padding:20px 0;font-size:26px"><span style="color:#64748b">${k}</span><span style="font-weight:600;text-align:right;${k === 'Chart' ? 'color:#c2410c' : ''}">${v}</span></div>`).join('')}
    </div>
    <div style="background:#fff;border:2px solid #e2e8f0;border-radius:28px;padding:40px 44px">
      <div class="d" style="font-size:22px;font-weight:700;letter-spacing:3px;color:#f97316">AI SUMMARY</div>
      <div class="d" style="margin-top:18px;font-size:30px;font-weight:800">Section A: Fax facts</div>
      <div style="margin-top:12px;font-size:26px;line-height:1.5;color:#334155">From: Sample Diagnostics Lab, 3 pages<br>Patient: Jane Sample, DOB 01/15/1980<br>Ordering provider: Dr. Sample</div>
      <div class="d" style="margin-top:28px;font-size:30px;font-weight:800">Section B: What needs attention</div>
      <div style="margin-top:12px;font-size:26px;line-height:1.5;color:#334155">Lipid panel results. LDL flagged high.<br>Lab requests a follow-up review by the ordering provider.</div>
    </div></div>
  <div style="position:absolute;bottom:52px;left:96px;font-size:24px;color:#64748b">AI summaries support trained staff. Unsure matches go to staff review, never to a guess. Chart filing works within what Hint allows.</div></div>`;
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  async function shot(html, w, h, out, transparent) {
    await page.setViewportSize({ width: w, height: h });
    await page.setContent(`<!doctype html><html><head>${FONTS}<style>${BASE}</style></head><body>${html}</body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: out, omitBackground: !!transparent, clip: { x: 0, y: 0, width: w, height: h } });
    console.log('wrote', out);
  }
  await shot(icon.replace('<svg ', '<svg width="800" height="800" '), 800, 800, 'aifax-hint-icon-800.png', true);
  await shot(logo, 1200, 400, 'aifax-logo-horizontal-1200x400.png', true);
  for (const k of Object.keys(glyphs)) await shot(tile(glyphs[k]), 600, 600, `highlight-${k}.png`, true);
  await shot(flow, 1600, 1000, 'overview-1-flow.png');
  await shot(summary, 1600, 1000, 'overview-2-summary.png');
  await browser.close();
})();
