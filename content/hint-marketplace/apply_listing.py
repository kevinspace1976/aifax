"""Apply listing.json to the LIVE Hint product (partner key injected by the session proxy; set BASE/PRODUCT for sandbox).
Idempotent: creates only what is missing, then prints a read-back."""
import base64, json, sys, urllib.request, urllib.error
BASE = 'https://api.hint.com/api'
PRODUCT = 'ppro-UYCHrW1uvpgR'
d = json.load(open('listing.json'))

def call(method, path, body=None):
    req = urllib.request.Request(BASE + path, method=method, data=json.dumps(body).encode() if body is not None else None,
                                 headers={'Accept': 'application/json', 'Content-Type': 'application/json',
                                          'Authorization': 'Bearer proxy-injected'})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            raw = r.read(); return r.status, json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        raw = e.read().decode('utf-8', 'replace'); print('  !', method, path, e.code, raw[:300]); return e.code, None

def uri(f):
    return 'data:image/png;base64,' + base64.b64encode(open(f, 'rb').read()).decode()

print('partner email', call('PATCH', '/partner/partner', {'email': d['partner_email']})[0])
print('product', call('PATCH', '/partner/products/' + PRODUCT, {
    'name': d['name'], 'type': d['type'], 'summary': d['summary'], 'built_by_name': d['built_by_name'],
    'built_by_url': d['built_by_url'], 'icon': uri('aifax-hint-icon-800.png')})[0])
st, ov = call('GET', '/partner/products/%s/overview' % PRODUCT)
images = None if (ov or {}).get('images') else [{'url': uri(i['file']), 'alt': i['alt']} for i in d['overview_images']]
body = {'description': d['overview']}
if images: body['images'] = images
print('overview', call('PATCH', '/partner/products/%s/overview' % PRODUCT, body)[0])
st, hs = call('GET', '/partner/products/%s/highlights' % PRODUCT)
have = {h.get('title') for h in hs or []}
for i, h in enumerate(d['highlights']):
    if h['title'] not in have:
        print('highlight', h['title'], call('POST', '/partner/products/%s/highlights' % PRODUCT, {
            'title': h['title'], 'description': h['description'], 'image': uri(h['file']), 'position': i + 1})[0])
st, ls = call('GET', '/partner/products/%s/links' % PRODUCT)
have = {l.get('value') for l in ls or []}
for i, l in enumerate(d['links']):
    if l['value'] not in have:
        print('link', l['value'], call('POST', '/partner/products/%s/links' % PRODUCT, dict(l, position=i + 1))[0])
st, cs = call('GET', '/partner/products/%s/categories' % PRODUCT)
have = {c.get('name') for c in cs or []}
for c in d['categories']:
    if c not in have:
        print('category', c, call('POST', '/partner/products/%s/categories' % PRODUCT, {'name': c})[0])
st, ps = call('GET', '/partner/products/%s/preconditions' % PRODUCT)
if not any(p.get('type') == d['precondition']['type'] for p in ps or []):
    print('precondition', call('POST', '/partner/products/%s/preconditions' % PRODUCT, {'precondition': d['precondition']})[0])

print('\nREAD-BACK')
print('partner', call('GET', '/partner/partner')[1])
p = [x for x in call('GET', '/partner/products')[1] if x['id'] == PRODUCT][0]
print('product', {k: p.get(k) for k in ('name', 'slug', 'summary', 'built_by_name', 'built_by_url', 'icon_url')})
ov = call('GET', '/partner/products/%s/overview' % PRODUCT)[1]
print('overview', len(ov.get('description') or ''), 'chars,', len(ov.get('images') or []), 'images')
print('highlights', [(h.get('title'), bool(h.get('image_url') or h.get('image'))) for h in call('GET', '/partner/products/%s/highlights' % PRODUCT)[1]])
print('links', [(l.get('link_type'), l.get('value')) for l in call('GET', '/partner/products/%s/links' % PRODUCT)[1]])
print('categories', [c.get('name') for c in call('GET', '/partner/products/%s/categories' % PRODUCT)[1]])
print('preconditions', [(x.get('type'), x.get('url')) for x in call('GET', '/partner/products/%s/preconditions' % PRODUCT)[1]])
