const nrcan = ["Natural Resources Canada: EV charging", "https://natural-resources.canada.ca/energy-efficiency/transportation-energy-efficiency/electric-vehicles/electric-vehicle-charging"];
const compatibility = ["Transport Canada: connector and inlet compatibility", "https://tc.canada.ca/en/road-transportation/innovative-technologies/electric-vehicles/canada-s-guidance-electric-vehicle-charging-connector-inlet-compatibility"];
const nrcanMap = ["Natural Resources Canada: station locator", "https://natural-resources.canada.ca/energy-efficiency/transportation-energy-efficiency/electric-charging-alternative-fuelling-stationslocator-map"];
const tesla = ["Tesla Canada: Supercharging other EVs", "https://www.tesla.com/en_ca/support/charging/supercharging-other-evs"];
const esa = ["Electrical Safety Authority: Ontario home charging", "https://esasafe.com/home-renovation-buying-and-selling/ev-charging-systems/"];

export const chargingTopics = [
  {
    slug:"connectors", code:"01 / COMPATIBILITY", title:"EV plugs and adapters in Canada",
    summary:"Identify J1772, CCS1, NACS and CHAdeMO, then check what your exact car and station allow.",
    tags:"plug port inlet adapter J1772 CCS NACS J3400 CHAdeMO Tesla LEAF PHEV",
    sections:[
      ["Start with the car, not the station",["Check the Canadian owner's manual or manufacturer page for the exact model year and trim. Confirm the AC inlet and whether the vehicle supports DC fast charging. One nameplate can change connector across model years: Nissan's 2023 Canadian LEAF manual describes CHAdeMO if the quick-charge port is equipped; Nissan Canada's 2026 LEAF information shows separate J1772 AC and NACS DC ports."]],
      ["Know what each plug is for",["J1772 is an AC connector. CCS1 uses a J1772-shaped upper section and adds two large DC pins. CHAdeMO is a different DC connector found on some older EVs. NACS, standardized as SAE J3400, uses one connector shape for AC and DC when the hardware and protocols support it."]],
      ["Confirm hardware and access separately",["An adapter that physically fits is not proof of compatibility. AC and DC adapters are not interchangeable. Confirm the direction and charging type, use manufacturer-approved hardware, and check that the particular network and station accept your vehicle. For compatible non-Tesla Superchargers, check Tesla's app and your manufacturer's instructions for the exact vehicle and site."]],
    ],
    checklist:["Write down the car's AC and DC inlet types.","Verify the specific site and stall in the operator's app.","Confirm any adapter is approved for that car, charge type and direction."],
    sources:[compatibility,nrcan,tesla,["Nissan Canada: 2023 LEAF owner's manual","https://www.nissan.ca/content/dam/Nissan/Canada/manuals-and-guides/leaf/2023/2023-nissan-Leaf-en.pdf"],["Nissan Canada: current EV charging and LEAF connector information","https://www.nissan.ca/experience-nissan/ev-education/ev-charging.html"]],
  },
  {
    slug:"charging-speed", code:"02 / POWER & ENERGY", title:"How long does EV charging take?",
    summary:"Estimate plugged-in time from usable capacity and average charging power, not a charger’s peak number.",
    tags:"charging levels L1 L2 DC fast kW kWh battery capacity estimate time efficiency taper winter power sharing preconditioning",
    sections:[
      ["Estimate the energy first",["Usable battery capacity multiplied by the change in charge gives the energy added. A 60 kWh usable battery going from 20% to 80% needs about 36 kWh at the battery. The charger supplies a little more because charging is not perfectly efficient."]],
      ["Divide by an average, not a peak",["If the battery receives a sustained 60 kW, 36 kWh takes about 36 minutes. That is not a promise for a charger marked 60 kW. The car may accept less, the station can limit power, and fast charging often slows near higher charge levels. Use average power and estimated efficiency consistently when entering the calculator."]],
      ["Plan the stop, not just the session",["Travel to the station, waiting, finding a usable stall and starting a session all add time. In colder weather, battery conditioning and temperature can affect power. Use the car's own supported navigation or preconditioning instructions rather than assuming every model behaves the same way."]],
    ],
    checklist:["Use usable rather than advertised gross battery capacity if known.","Separate average power at the charger from average power into the battery.","Leave time for arrival, payment and a backup stop."],
    sources:[nrcan],
  },
  {
    slug:"public-charger-down", code:"03 / FIELD TROUBLESHOOTING", title:"What to do when a public EV charger is down",
    summary:"Find a working alternative, report the exact stall and avoid spending your remaining range searching.",
    tags:"broken offline occupied public charger network support problem report roadside low range outage station ID payment",
    sections:[
      ["Check the stall before troubleshooting the car",["Look for an offline, occupied or faulted status in the operator's app or screen. Confirm the connector, stall number and payment method. If the cable or connector is damaged, do not use it. Try a different compatible stall only if there is one available."]],
      ["Report the station, then switch plans",["Use the support details in the operator's app or on the charger. Share the station or stall ID, the time and the error message. Save a receipt or session record if payment went through. A listing on a public map is not proof a stall is available or working."]],
      ["Don't gamble on the remaining charge",["Choose a compatible backup you can reach with a buffer, not just the nearest map pin. If the car is already very low or reports reduced power, pull over safely when possible and contact the manufacturer's roadside service or your provider rather than trying successive stations. Follow the vehicle manual for transport requirements."]],
    ],
    checklist:["Check the operator's live status, then verify connector and public access.","Keep a reachable backup before leaving the first station.","Report the stall ID and keep any transaction details."],
    sources:[nrcanMap,["ChargePoint Canada: report a station fault","https://www.chargepoint.com/en-ca/drivers/support/faqs/how-do-i-report-chargepoint-station-not-working-properly"]],
  },
  {
    slug:"charging-cost", code:"04 / BILLING", title:"How much does public EV charging cost?",
    summary:"Compare per-kWh, time-based and flat pricing without overlooking parking, session or idle fees.",
    tags:"price cost payment charging fees idle parking time kWh per minute electricity quote",
    sections:[
      ["Read the billing unit first",["A per-kWh price applies to energy delivered; a per-minute or hourly rate applies to time. Some stations charge a flat fee. Read the price for that exact location before starting. Parking, session, idle and other fees can sit outside the headline rate."]],
      ["Compare using the same session",["At an illustrative $0.50/kWh, 30 kWh would cost $15 before any extras. At an illustrative $0.40/minute, a 40-minute session would cost $16 before extras. These are arithmetic examples, not current Canadian network rates."]],
      ["Use the estimate for the right bill",["The calculator's electricity cost uses supplied energy and your entered per-kWh rate. It does not estimate per-minute, flat, tax, parking or idle charges. A slower session can change a time-based bill even when the energy delivered is identical."]],
    ],
    checklist:["Check the current rate and billing unit in the station app.","Look for parking, session, idle and other fees.","Save the completed receipt if the total looks wrong."],
    sources:[["Measurement Canada: EV charging and billing methods","https://www.ised-isde.canada.ca/site/measurement-canada/en/electric-vehicle-charging-stations"]],
  },
  {
    slug:"home-charging", code:"05 / HOME & CONDO", title:"Home EV charging in Ontario",
    summary:"Work out whether you need Level 2 and what to ask a condo manager or electrical contractor.",
    tags:"home apartment condo renter charger installation 120V outlet Level 1 Level 2 Ontario electrical safety panel EVSE",
    sections:[
      ["Start with daily driving and parking time",["Level 1 can be enough for some short daily drives with long parking windows. Level 2 offers more energy overnight, but an EV's onboard charger can cap its AC speed. Do not assume every outlet, circuit or parking spot is suitable. Verify with the vehicle instructions and an electrical professional."]],
      ["Ask about the electrical setup",["For an Ontario installation, use approved equipment and ask a Licensed Electrical Contractor about circuit capacity, load management, the notification of work and inspection. The service, panel, wiring route and existing loads all affect what is practical."]],
      ["If you park in a condo or rental",["Ask management or the owner in writing about access, installation approval, equipment rules, billing, who pays for upgrades, and a shared or assigned charger option. Do not assume permission to use an ordinary outlet in a garage. A workplace or nearby public charger can be part of the plan if access and pricing are workable."]],
    ],
    checklist:["Estimate how much energy you need on an ordinary day.","Confirm parking access and management approval where applicable.","Get a site-specific electrical assessment before buying equipment."],
    sources:[nrcan,esa,["Ontario Energy Board: electric vehicles and electricity connections","https://www.oeb.ca/consumer-information-and-protection/electric-vehicles-evs"]],
  },
];
