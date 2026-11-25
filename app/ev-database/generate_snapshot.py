"""Regenerate the checked-in Canadian BEV rating snapshot offline from the pinned NRCan CSV."""
import csv
import hashlib
import json
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
CSV = HERE / "nrcan-bev-2026-09-29.csv"
EXPECTED_SHA = "d37f52ee8049e93b37f66ac233b037e6abe0218ef3635ef6cbddf8fb8c675f51"
REQUIRED = ["Model year", "Make", "Model", "Vehicle class", "Motor (kW)", "Transmission", "Fuel type", "City (kWh/100 km)", "Highway (kWh/100 km)", "Combined (kWh/100 km)", "City (Le/100 km)", "Highway (Le/100 km)", "Combined (Le/100 km)", "Range (km)", "CO2 emissions (g/km)", "CO2 rating", "Smog rating", "Recharge time (h)"]
KEYS = ["year","make","model","class","city","highway","combined","range","recharge"]

def main():
    if hashlib.sha256(CSV.read_bytes()).hexdigest() != EXPECTED_SHA:
        raise ValueError("Unreviewed source file. Confirm licence, schema, dates and units before updating the digest.")
    records = []
    ids = set()
    with CSV.open(encoding="utf-8-sig", newline="") as f:
        reader = csv.reader(f)
        if [s.strip() for s in next(reader)] != REQUIRED:
            raise ValueError("The source columns or units changed.")
        for row in reader:
            if len(row)!=18 or row[6]!="B":
                raise ValueError("Unexpected non-BEV or missing column.")
            year, make, model, body = int(row[0]),row[1].strip(),row[2].strip(),row[3].strip()
            if not (2012<=year<=2026 and make and model and body):
                raise ValueError("Invalid record identity.")
            raw = [float(row[i]) for i in (7,8,9,13,17)]
            if not all(0<n<2000 for n in raw):
                raise ValueError("Missing or implausible rated measurement.")
            numbers = [int(n) if n.is_integer() else n for n in raw]
            identity = f"{year}|{make}|{model}"
            # Preserve trim identity; '+' and its absence separate actual Nissan variants.
            key = f"{year}-"+re.sub(r"[^a-z0-9]+","-",f"{make} {model}".lower().replace("+"," plus ")).strip("-")
            if key in ids: raise ValueError(f"Collision for {identity}")
            ids.add(key)
            records.append([key,year,make,model,body,*numbers])
    if (len(records), len({r[2] for r in records})) != (1250,36):
        raise ValueError("Unexpected row/make counts.")
    records.sort(key=lambda r:(-r[1],r[2].casefold(),r[3].casefold()))
    (HERE/"ratings.json").write_text("[\n"+",\n".join(json.dumps(r,ensure_ascii=False,separators=(",",":")) for r in records)+"\n]\n")
    print(f"{len(records)} Canadian BEV ratings validated.")

if __name__ == "__main__": main()
