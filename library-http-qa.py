from html.parser import HTMLParser
from http.client import HTTPConnection
import xml.etree.ElementTree as ET
from urllib.parse import urlsplit

topics=["connectors","charging-speed","public-charger-down","charging-cost","home-charging"]
paths=["/chargers","/ev-101","/ev-database","/tools"]+["/chargers/"+slug for slug in topics]
web="www.nowcharged.com"
def get(path,host=web):
    c=HTTPConnection("127.0.0.1",3189,timeout=15)
    try:
        c.putrequest("GET",path,skip_host=True)
        c.putheader("Host",host); c.endheaders()
        r=c.getresponse()
        return r.status,r.read().decode()
    finally: c.close()

class Html(HTMLParser):
    def __init__(self,body):
        super().__init__();self.main=False;self.headers=0;self.h1s=0;self.main_count=0;self.library_marker=0
        self.content_links=[];self.ids=set();self.css=[];self.meta={};self.text=[];self.feed(body)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=="main":self.main=True;self.main_count+=1
        if "data-ev-library" in a:self.library_marker+=1
        if tag=="h1":self.h1s+=1
        if tag=="meta" and "name" in a:self.meta[a["name"]]=a.get("content","")
        if tag=="link" and a.get("rel")=="canonical":self.canonical=a["href"]
        if tag=="link" and a.get("rel")=="stylesheet":self.css.append(a["href"])
        if tag=="a" and self.main and "href" in a:self.content_links.append(a["href"])
        if "id" in a:self.ids.add(a["id"])
    def handle_endtag(self,tag):
        if tag=="main": self.main=False
    def handle_data(self,data):
        if self.main:self.text.append(data)

for route in paths:
    status,body=get(route)
    assert status==200,route
    parsed=Html(body)
    assert (parsed.main_count,parsed.h1s,parsed.library_marker)==(1,1,1),route
    assert parsed.canonical=="https://"+web+route,(route,parsed.canonical)
    assert parsed.meta["robots"]=="index, follow",route
    assert not any(u.startswith(("/services","/request","/pricing")) for u in parsed.content_links),route
    assert all(u[1:] in parsed.ids for u in parsed.content_links if u.startswith("#") and len(u)>1),route
    status,preview=get(route,"preview.example.com")
    assert status==200 and Html(preview).meta["robots"]=="noindex, nofollow",route

charger=Html(get("/chargers")[1])
assert all(p in charger.content_links for p in paths if p!="/chargers")
top=' '.join(charger.text)
assert all(s in top for s in ['Look up a car','Learn EV basics','Calculate a charge','no account needed'])
assert all(hasattr(Html(get(p)[1]),"canonical") for p in paths)
css="".join(get(u)[1] for u in charger.css if urlsplit(u).path.startswith("/_next/"))
assert "body:has([data-ev-library])" in css and ".nc-head-cta" in css
assert "prefers-reduced-motion:reduce" in css and "charge-lab-wave" in css
status,database_page=get('/ev-database')
assert status==200 and '>More filters</summary>' in database_page and '<details open' not in database_page
advanced=get('/ev-database?range=400&sort=range')[1]
assert '<details' in advanced and ' open=""' in advanced and 'More filters' in advanced
assert '>More chapters and glossary</summary>' in get('/ev-101')[1]
assert '>Power, efficiency and price</summary>' in get('/tools')[1]
assert get("/chargers/unknown")[0]==404
database=Html(get("/ev-database?make=Nissan&year=2026&q=ARIYA")[1])
assert database.meta["robots"].startswith("noindex")
assert database.canonical=="https://"+web+"/ev-database"
assert "ARIYA" in " ".join(database.text)
from urllib.parse import quote
for query,total in [('ID.4',21),('id4',21),('IONIQ 5',19),('ioniq5',19),('2026 Tesla Model Y',7)]:
    parsed=Html(get('/ev-database?q='+quote(query))[1])
    assert f'{total} matches' in ' '.join(' '.join(parsed.text).split()),(query,total)
    assert parsed.meta["robots"].startswith("noindex")
compare=Html(get("/ev-database?compare=2026-nissan-ariya-sv,2026-nissan-ariya-sl-plus-e-4orce")[1])
assert any("SL+" in t for t in compare.text),"trim comparison missing"
sitemap=get("/sitemap.xml")[1]
urls=[n.text for n in ET.fromstring(sitemap).iter() if n.tag.endswith("}loc")]
assert len(urls)==18 and len(set(urls))==18
assert all("https://"+web+p in urls for p in paths)
assert not any("/request" in u or "/thank-you" in u or "?" in u for u in urls)
assert not any(n.tag.endswith("}loc") for n in ET.fromstring(get("/sitemap.xml","preview.example.com")[1]).iter())
assert Html(get("/services/ev-charging")[1]).library_marker==0
assert 'action="https://formsubmit.co/info@nowcharged.com"' in get("/request?service=ev")[1]
assert 'action="https://formsubmit.co/' not in get("/request?service=ev","preview.example.com")[1]
print("9 library routes, 9 noindex previews, sitemap, unknown-guide 404, filters, comparisons, library chrome and existing EV callback verified.")
