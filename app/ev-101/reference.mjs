// Hand-checked editorial sources; the vehicle directory is a separate, versioned dataset.
export const checked = '2026-11-25';
export const sources = {
  ratings: ['Compare official Canadian vehicle ratings', 'https://fcr-ccc.nrcan-rncan.gc.ca/en/Search', 'Natural Resources Canada'],
  guide: ['2026 Fuel Consumption Guide (PDF)', 'https://publications.gc.ca/collections/collection_2026/rncan-nrcan/M141-5-2026-eng.pdf', 'Natural Resources Canada'],
  charging: ['Electric vehicle charging', 'https://natural-resources.canada.ca/energy-efficiency/transportation-energy-efficiency/electric-vehicles/electric-vehicle-charging', 'Natural Resources Canada'],
  condo: ['Installing EV charging in an Ontario condominium', 'https://www.condoauthorityontario.ca/knowledge-base/how-can-ev-charging-be-installed-in-condos/', 'Condominium Authority of Ontario'],
  winter: ['Range and charging results from the 2025 winter road test', 'https://www.caa.ca/news/caa-conducts-road-test-of-ev-range-charge-in-winter-conditions/', 'Canadian Automobile Association'],
  recalls: ['Find vehicle recalls, including VIN lookups', 'https://tc.canada.ca/en/road-transportation/defects-recalls-vehicles-tires-child-car-seats', 'Transport Canada'],
  warranty: ['An example of model-specific battery warranty terms', 'https://www.tesla.com/en_CA/support/vehicle-warranty', 'Tesla Canada'],
};
export const glossary = [
  ['AC / DC', 'Alternating current / direct current. On AC, the car’s onboard charger converts power for the battery. A DC fast charger does the conversion at the station.'],
  ['BEV', 'Battery-electric vehicle: runs on energy stored in a rechargeable traction battery. There is no gasoline engine to take over.'],
  ['Charge curve', 'How quickly a battery accepts power as a session progresses. A brief peak is not the average across the stop.'],
  ['EVSE', 'Electric vehicle supply equipment: the hardware connecting a vehicle to a source of charging power.'],
  ['Gross / usable capacity', 'Gross is total battery energy capacity. Usable is the portion the car makes available to the driver. Use usable capacity when estimating energy from a change in charge percentage.'],
  ['HEV', 'Conventional hybrid: combines an engine with an electric motor and does not plug into an external charger.'],
  ['kW / kWh', 'Kilowatts measure power: the rate of energy transfer. Kilowatt-hours measure an amount of energy. Adding 10 kWh at a constant 5 kW into the battery takes two hours.'],
  ['kWh/100 km', 'Electrical energy consumption over 100 kilometres. Lower means less electricity for the same distance when the numbers are measured on the same basis.'],
  ['PHEV', 'Plug-in hybrid electric vehicle: a plug-chargeable battery plus an engine. Electric range and fuel consumption when using gasoline are different specifications.'],
  ['Preconditioning', 'Preparing the cabin or battery for driving or charging. These can be different settings; check what your particular vehicle supports.'],
  ['Regenerative braking', 'The motor can recover some energy when slowing down. It does not replace charging, and available regeneration can vary with battery temperature and charge level.'],
  ['State of charge / health', 'State of charge is how full the battery is now. State of health describes its condition relative to when new; assessment methods vary. A 100% charge display is not a battery-health certificate.'],
];
