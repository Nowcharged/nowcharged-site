"use client";

import { useState, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
*, html { scroll-behavior: smooth; }`;

const display = { fontFamily: "'Manrope', sans-serif" };
const body = { fontFamily: "'DM Sans', system-ui, sans-serif" };

function Icon({ name, className = "h-6 w-6" }) {
  const p = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  const icons = {
    zap:     <svg {...p}><path d="M13 2 3 14h8l-1 8 11-14h-8l1-6Z" /></svg>,
    arrow:   <svg {...p}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>,
    arrowL:  <svg {...p}><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>,
    check:   <svg {...p}><path d="M20 6 9 17l-5-5" /></svg>,
    info:    <svg {...p}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>,
    pin:     <svg {...p}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>,
    search:  <svg {...p}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>,
    car:     <svg {...p}><path d="M5 17h14" /><path d="M6 17v2" /><path d="M18 17v2" /><path d="M4 13 6.2 7.5A2.4 2.4 0 0 1 8.4 6h7.2a2.4 2.4 0 0 1 2.2 1.5L20 13" /><path d="M3 13h18v4H3z" /><circle cx="7" cy="15" r="1" /><circle cx="17" cy="15" r="1" /></svg>,
  };
  return icons[name] || icons.zap;
}

// Parse numeric kWh or kW from strings like "75 kWh" or "250 kW"
const parseNumber = (str) => {
  if (!str) return 0;
  const match = str.match(/(\d+\.?\d*)/);
  return match ? parseFloat(match[1]) : 0;
};

export default function ToolsPage() {
  // Vehicle Finder
  const [vehicleQuery, setVehicleQuery] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Charge Estimator (driven by selected vehicle when present)
  const [battery, setBattery] = useState(75);
  const [startPct, setStartPct] = useState(20);
  const [duration, setDuration] = useState(60);
  const [chargerKW, setChargerKW] = useState(150);
  const [carMaxKW, setCarMaxKW] = useState(150);

  // Map
  const [chargers, setChargers] = useState([]);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState(null);
  const [selectedCharger, setSelectedCharger] = useState(null);
  const [userPostal, setUserPostal] = useState("");
  const [userCoords, setUserCoords] = useState(null);
  const [postalError, setPostalError] = useState("");
  const [showCount, setShowCount] = useState(24);

  // Postal code prefix → approximate lat/lng for Toronto/GTA
  // First 3 chars of a Canadian postal code identify a Forward Sortation Area
  const postalCoords = {
    "M5V": { lat: 43.6438, lng: -79.3961, name: "Downtown / King West" },
    "M5J": { lat: 43.6428, lng: -79.3795, name: "Harbourfront" },
    "M5H": { lat: 43.6488, lng: -79.3823, name: "Financial District" },
    "M5G": { lat: 43.6571, lng: -79.3884, name: "Discovery District" },
    "M5T": { lat: 43.6534, lng: -79.4006, name: "Kensington / Chinatown" },
    "M5S": { lat: 43.6629, lng: -79.3957, name: "University of Toronto" },
    "M4Y": { lat: 43.6644, lng: -79.3805, name: "Church-Wellesley" },
    "M5R": { lat: 43.6735, lng: -79.4099, name: "Annex / Yorkville" },
    "M5W": { lat: 43.6481, lng: -79.3796, name: "Downtown" },
    "M5X": { lat: 43.6494, lng: -79.3812, name: "Downtown" },
    "M4E": { lat: 43.6764, lng: -79.2930, name: "The Beaches" },
    "M4L": { lat: 43.6685, lng: -79.3149, name: "Leslieville" },
    "M4M": { lat: 43.6595, lng: -79.3398, name: "Riverdale" },
    "M4K": { lat: 43.6766, lng: -79.3500, name: "Riverdale / Danforth" },
    "M6J": { lat: 43.6489, lng: -79.4187, name: "Trinity-Bellwoods" },
    "M6K": { lat: 43.6371, lng: -79.4282, name: "Parkdale" },
    "M6H": { lat: 43.6685, lng: -79.4280, name: "Dovercourt / Bloordale" },
    "M6G": { lat: 43.6705, lng: -79.4194, name: "Christie / Dufferin Grove" },
    "M6P": { lat: 43.6562, lng: -79.4642, name: "High Park / Roncesvalles" },
    "M6N": { lat: 43.6700, lng: -79.4767, name: "The Junction" },
    "M6R": { lat: 43.6505, lng: -79.4499, name: "Roncesvalles" },
    "M4V": { lat: 43.6849, lng: -79.4019, name: "Forest Hill / Summerhill" },
    "M4S": { lat: 43.7035, lng: -79.3886, name: "Davisville" },
    "M4R": { lat: 43.7144, lng: -79.4042, name: "North Toronto" },
    "M4N": { lat: 43.7287, lng: -79.3949, name: "Lawrence Park" },
    "M4P": { lat: 43.7150, lng: -79.3877, name: "Mount Pleasant" },
    "M4T": { lat: 43.6918, lng: -79.3859, name: "Rosedale" },
    "M5N": { lat: 43.7028, lng: -79.4174, name: "Forest Hill North" },
    "M5P": { lat: 43.6890, lng: -79.4118, name: "Forest Hill" },
    "M5M": { lat: 43.7330, lng: -79.4198, name: "Bedford Park" },
    "M2N": { lat: 43.7639, lng: -79.4116, name: "North York Centre" },
    "M2K": { lat: 43.7689, lng: -79.3892, name: "Bayview Village" },
    "M2J": { lat: 43.7766, lng: -79.3461, name: "Henry Farm" },
    "M2H": { lat: 43.8030, lng: -79.3454, name: "Hillcrest Village" },
    "M2M": { lat: 43.7919, lng: -79.4144, name: "Newtonbrook" },
    "M2L": { lat: 43.7551, lng: -79.3724, name: "York Mills" },
    "M2P": { lat: 43.7440, lng: -79.4019, name: "York Mills West" },
    "M2R": { lat: 43.7855, lng: -79.4421, name: "Willowdale West" },
    "M3A": { lat: 43.7530, lng: -79.3299, name: "Don Mills" },
    "M3B": { lat: 43.7456, lng: -79.3525, name: "Don Mills" },
    "M3C": { lat: 43.7252, lng: -79.3404, name: "Flemingdon Park" },
    "M3H": { lat: 43.7544, lng: -79.4427, name: "Downsview" },
    "M3J": { lat: 43.7755, lng: -79.4861, name: "York University Heights" },
    "M3K": { lat: 43.7376, lng: -79.4647, name: "Downsview" },
    "M3L": { lat: 43.7402, lng: -79.5167, name: "Downsview / Roding" },
    "M3M": { lat: 43.7270, lng: -79.4956, name: "Downsview / Wilson Heights" },
    "M3N": { lat: 43.7615, lng: -79.5208, name: "Downsview / Jane and Finch" },
    "M9A": { lat: 43.6677, lng: -79.5328, name: "Islington / Etobicoke" },
    "M9B": { lat: 43.6499, lng: -79.5544, name: "Etobicoke" },
    "M9C": { lat: 43.6435, lng: -79.5775, name: "Etobicoke / Markland Wood" },
    "M8V": { lat: 43.6049, lng: -79.5018, name: "New Toronto / Mimico" },
    "M8W": { lat: 43.6029, lng: -79.5435, name: "Long Branch / Alderwood" },
    "M8X": { lat: 43.6535, lng: -79.5085, name: "Kingsway" },
    "M8Y": { lat: 43.6362, lng: -79.4977, name: "Stonegate / Queensway" },
    "M8Z": { lat: 43.6285, lng: -79.5202, name: "Mimico North" },
    "L5B": { lat: 43.5890, lng: -79.6441, name: "Mississauga / City Centre" },
    "L5C": { lat: 43.5798, lng: -79.6396, name: "Mississauga / Cooksville" },
    "L5A": { lat: 43.5793, lng: -79.6105, name: "Mississauga / East" },
    "L4W": { lat: 43.6433, lng: -79.6388, name: "Mississauga / Airport" },
    "L4V": { lat: 43.6850, lng: -79.6178, name: "Mississauga / Airport" },
    "L4Y": { lat: 43.6105, lng: -79.6203, name: "Mississauga / Lakeview" },
    "L4Z": { lat: 43.5984, lng: -79.6695, name: "Mississauga / Hurontario" },
    "L5M": { lat: 43.5621, lng: -79.7351, name: "Mississauga / Meadowvale" },
    "L5N": { lat: 43.5824, lng: -79.7570, name: "Mississauga / Meadowvale Village" },
    "L5R": { lat: 43.6066, lng: -79.6588, name: "Mississauga / Hurontario" },
    "L4T": { lat: 43.7197, lng: -79.6512, name: "Mississauga / Malton" },
    "L6Y": { lat: 43.6822, lng: -79.7591, name: "Brampton / South" },
    "L6Z": { lat: 43.7140, lng: -79.7993, name: "Brampton / Heart Lake" },
    "L6S": { lat: 43.7398, lng: -79.7290, name: "Brampton / Bramalea" },
    "L6T": { lat: 43.7280, lng: -79.7038, name: "Brampton / Bramalea South" },
    "L6P": { lat: 43.7497, lng: -79.7641, name: "Brampton / Castlemore" },
    "L6V": { lat: 43.7042, lng: -79.7600, name: "Brampton / Downtown" },
    "L6W": { lat: 43.6917, lng: -79.7325, name: "Brampton / Peel Village" },
    "L6X": { lat: 43.6929, lng: -79.7848, name: "Brampton / Fletcher's Meadow" },
    "L4L": { lat: 43.7820, lng: -79.6212, name: "Vaughan / Woodbridge" },
    "L4J": { lat: 43.8013, lng: -79.4501, name: "Vaughan / Thornhill" },
    "L4K": { lat: 43.8074, lng: -79.4970, name: "Vaughan / Concord" },
    "L6A": { lat: 43.8649, lng: -79.5232, name: "Vaughan / Maple" },
    "L3R": { lat: 43.8500, lng: -79.3380, name: "Markham" },
    "L3T": { lat: 43.8073, lng: -79.4180, name: "Thornhill / Markham" },
    "L3P": { lat: 43.8841, lng: -79.2667, name: "Markham" },
    "L1S": { lat: 43.8489, lng: -79.0784, name: "Ajax" },
    "L1T": { lat: 43.8736, lng: -79.0884, name: "Ajax" },
    "L1V": { lat: 43.8329, lng: -79.0987, name: "Pickering" },
    "L1X": { lat: 43.8479, lng: -79.1295, name: "Pickering" },
    "L1H": { lat: 43.8843, lng: -78.9234, name: "Oshawa" },
    "L1G": { lat: 43.9068, lng: -78.8527, name: "Oshawa" },
    "L1K": { lat: 43.8838, lng: -78.8413, name: "Oshawa" },
    "M1B": { lat: 43.8067, lng: -79.1944, name: "Scarborough / Malvern" },
    "M1C": { lat: 43.7849, lng: -79.1604, name: "Scarborough / Highland Creek" },
    "M1E": { lat: 43.7634, lng: -79.1944, name: "Scarborough / West Hill" },
    "M1G": { lat: 43.7702, lng: -79.2189, name: "Scarborough / Woburn" },
    "M1H": { lat: 43.7732, lng: -79.2390, name: "Scarborough / Cedarbrae" },
    "M1J": { lat: 43.7445, lng: -79.2391, name: "Scarborough / Eglinton East" },
    "M1K": { lat: 43.7280, lng: -79.2625, name: "Scarborough / Kennedy Park" },
    "M1L": { lat: 43.7110, lng: -79.2849, name: "Scarborough / Clairlea" },
    "M1M": { lat: 43.7166, lng: -79.2391, name: "Scarborough / Bluffs" },
    "M1N": { lat: 43.6925, lng: -79.2645, name: "Scarborough / Birch Cliff" },
    "M1P": { lat: 43.7572, lng: -79.2731, name: "Scarborough / Dorset Park" },
    "M1R": { lat: 43.7506, lng: -79.2952, name: "Scarborough / Wexford" },
    "M1S": { lat: 43.7942, lng: -79.2624, name: "Scarborough / Agincourt" },
    "M1T": { lat: 43.7806, lng: -79.3013, name: "Scarborough / Tam O'Shanter" },
    "M1V": { lat: 43.8157, lng: -79.2740, name: "Scarborough / Agincourt N" },
    "M1W": { lat: 43.7965, lng: -79.3187, name: "Scarborough / L'Amoreaux" },
    "M1X": { lat: 43.8364, lng: -79.2103, name: "Scarborough / Upper Rouge" },
    "L7T": { lat: 43.3582, lng: -79.7918, name: "Burlington" },
    "L7P": { lat: 43.3525, lng: -79.8295, name: "Burlington" },
    "L7L": { lat: 43.3686, lng: -79.7842, name: "Burlington" },
    "L7M": { lat: 43.3947, lng: -79.8230, name: "Burlington" },
    "L7R": { lat: 43.3270, lng: -79.7990, name: "Burlington" },
    "L6H": { lat: 43.4570, lng: -79.7050, name: "Oakville" },
    "L6J": { lat: 43.4495, lng: -79.6677, name: "Oakville" },
    "L6K": { lat: 43.4332, lng: -79.6841, name: "Oakville" },
    "L6L": { lat: 43.4047, lng: -79.7041, name: "Oakville" },
    "L6M": { lat: 43.4625, lng: -79.7378, name: "Oakville" },
  };

  const handlePostalSubmit = (e) => {
    e?.preventDefault();
    setPostalError("");
    setShowCount(24);
    const clean = userPostal.toUpperCase().replace(/\s/g, "").substring(0, 3);
    if (clean.length !== 3) {
      setPostalError("Enter at least the first 3 characters of your postal code (e.g. M5V)");
      return;
    }
    const coords = postalCoords[clean];
    if (!coords) {
      setPostalError(`We don't have data for ${clean} yet. Try the FSA from your area or contact us.`);
      setUserCoords(null);
      return;
    }
    setUserCoords({ ...coords, code: clean });
  };

  const clearPostal = () => {
    setUserPostal("");
    setUserCoords(null);
    setPostalError("");
    setShowCount(24);
  };

  // Haversine distance in km
  const distanceKm = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };

  // Compute displayed chargers based on user location filter
  const displayChargers = userCoords
    ? chargers
        .map(c => ({
          ...c,
          _distance: c.AddressInfo?.Latitude && c.AddressInfo?.Longitude
            ? distanceKm(userCoords.lat, userCoords.lng, c.AddressInfo.Latitude, c.AddressInfo.Longitude)
            : 999
        }))
        .filter(c => c._distance <= 25)
        .sort((a, b) => a._distance - b._distance)
    : chargers;

  const vehicles = [
    { make: "Tesla", model: "Model Y (Standard)", year: "2025", battery: "60 kWh", range: "500 km", connector: "NACS", peakDC: "175 kW", dcTime: "25 min (10-80%)", level2Time: "7 hr (full)" },
    { make: "Tesla", model: "Model Y (Long Range)", year: "2025", battery: "75 kWh", range: "586 km", connector: "NACS", peakDC: "250 kW", dcTime: "20 min (10-80%)", level2Time: "8 hr (full)" },
    { make: "Tesla", model: "Model Y (Performance)", year: "2025", battery: "82 kWh", range: "514 km", connector: "NACS", peakDC: "250 kW", dcTime: "20 min (10-80%)", level2Time: "8 hr (full)" },
    { make: "Tesla", model: "Model 3 (RWD)", year: "2025", battery: "60 kWh", range: "438 km", connector: "NACS", peakDC: "170 kW", dcTime: "25 min (10-80%)", level2Time: "7 hr (full)" },
    { make: "Tesla", model: "Model 3 (Long Range)", year: "2025", battery: "75 kWh", range: "584 km", connector: "NACS", peakDC: "250 kW", dcTime: "20 min (10-80%)", level2Time: "8 hr (full)" },
    { make: "Tesla", model: "Model X", year: "2025", battery: "100 kWh", range: "560 km", connector: "NACS", peakDC: "250 kW", dcTime: "25 min (10-80%)", level2Time: "10 hr (full)" },
    { make: "Tesla", model: "Model S", year: "2025", battery: "100 kWh", range: "650 km", connector: "NACS", peakDC: "250 kW", dcTime: "25 min (10-80%)", level2Time: "10 hr (full)" },
    { make: "Tesla", model: "Cybertruck", year: "2025", battery: "123 kWh", range: "547 km", connector: "NACS", peakDC: "250 kW", dcTime: "35 min (10-80%)", level2Time: "11 hr (full)" },
    { make: "Hyundai", model: "Ioniq 5 (Standard)", year: "2025-2026", battery: "63 kWh", range: "390 km", connector: "NACS (2025+) / CCS1", peakDC: "175 kW", dcTime: "20-25 min (10-80%)", level2Time: "5.5 hr (full)" },
    { make: "Hyundai", model: "Ioniq 5 (Long Range)", year: "2025-2026", battery: "84 kWh", range: "488 km", connector: "NACS (2025+) / CCS1", peakDC: "235 kW", dcTime: "20-30 min (10-80%)", level2Time: "7.5 hr (full)" },
    { make: "Hyundai", model: "Ioniq 5 N", year: "2025", battery: "84 kWh", range: "356 km", connector: "CCS1", peakDC: "235 kW", dcTime: "18 min (10-80%)", level2Time: "7.5 hr (full)" },
    { make: "Hyundai", model: "Ioniq 6", year: "2025", battery: "77 kWh", range: "581 km", connector: "CCS1", peakDC: "235 kW", dcTime: "18 min (10-80%)", level2Time: "7 hr (full)" },
    { make: "Hyundai", model: "Ioniq 9", year: "2026", battery: "110 kWh", range: "539 km", connector: "NACS / CCS1", peakDC: "235 kW", dcTime: "24 min (10-80%)", level2Time: "10 hr (full)" },
    { make: "Hyundai", model: "Kona Electric", year: "2025-2026", battery: "64 kWh", range: "418 km", connector: "CCS1", peakDC: "100 kW", dcTime: "43 min (10-80%)", level2Time: "6.5 hr (full)" },
    { make: "Kia", model: "EV6", year: "2025", battery: "77 kWh", range: "499 km", connector: "CCS1", peakDC: "235 kW", dcTime: "18 min (10-80%)", level2Time: "7 hr (full)" },
    { make: "Kia", model: "EV6 GT", year: "2025", battery: "77 kWh", range: "424 km", connector: "CCS1", peakDC: "235 kW", dcTime: "18 min (10-80%)", level2Time: "7 hr (full)" },
    { make: "Kia", model: "EV9", year: "2025-2026", battery: "99 kWh", range: "488 km", connector: "CCS1", peakDC: "210 kW", dcTime: "24 min (10-80%)", level2Time: "10 hr (full)" },
    { make: "Kia", model: "Niro EV", year: "2025-2026", battery: "64 kWh", range: "407 km", connector: "CCS1", peakDC: "85 kW", dcTime: "43 min (10-80%)", level2Time: "6.5 hr (full)" },
    { make: "Kia", model: "EV4", year: "2026", battery: "81 kWh", range: "510 km", connector: "CCS1", peakDC: "150 kW", dcTime: "30 min (10-80%)", level2Time: "8 hr (full)" },
    { make: "Kia", model: "EV5", year: "2026-2027", battery: "88 kWh", range: "530 km", connector: "CCS1", peakDC: "150 kW", dcTime: "30 min (10-80%)", level2Time: "8.5 hr (full)" },
    { make: "Ford", model: "Mustang Mach-E (Standard)", year: "2025-2026", battery: "73 kWh", range: "402 km", connector: "CCS1 / NACS adapter", peakDC: "150 kW", dcTime: "36-38 min (10-80%)", level2Time: "11 hr (full)" },
    { make: "Ford", model: "Mustang Mach-E (Extended)", year: "2025-2026", battery: "91 kWh", range: "515 km", connector: "CCS1 / NACS adapter", peakDC: "150 kW", dcTime: "43-45 min (10-80%)", level2Time: "14 hr (full)" },
    { make: "Ford", model: "Mustang Mach-E GT", year: "2025-2026", battery: "91 kWh", range: "435 km", connector: "CCS1 / NACS adapter", peakDC: "150 kW", dcTime: "43 min (10-80%)", level2Time: "14 hr (full)" },
    { make: "Ford", model: "F-150 Lightning (Standard)", year: "2025", battery: "98 kWh", range: "386 km", connector: "CCS1 / NACS adapter", peakDC: "150 kW", dcTime: "41 min (10-80%)", level2Time: "10 hr (full)" },
    { make: "Ford", model: "F-150 Lightning (Extended)", year: "2025", battery: "131 kWh", range: "515 km", connector: "CCS1 / NACS adapter", peakDC: "150 kW", dcTime: "41 min (10-80%)", level2Time: "13 hr (full)" },
    { make: "Chevrolet", model: "Equinox EV", year: "2025-2026", battery: "85 kWh", range: "513 km", connector: "CCS1 / NACS adapter", peakDC: "150 kW", dcTime: "35 min (10-80%)", level2Time: "10 hr (full)" },
    { make: "Chevrolet", model: "Blazer EV", year: "2025", battery: "85 kWh", range: "534 km", connector: "CCS1 / NACS adapter", peakDC: "190 kW", dcTime: "30 min (10-80%)", level2Time: "10 hr (full)" },
    { make: "Chevrolet", model: "Silverado EV (Work Truck)", year: "2025", battery: "200 kWh", range: "725 km", connector: "CCS1 / NACS adapter", peakDC: "350 kW", dcTime: "40 min (10-80%)", level2Time: "20 hr (full)" },
    { make: "Chevrolet", model: "Bolt", year: "2027", battery: "65 kWh", range: "410 km", connector: "NACS", peakDC: "150 kW", dcTime: "30 min (10-80%)", level2Time: "7 hr (full)" },
    { make: "Cadillac", model: "Lyriq", year: "2025-2026", battery: "102 kWh", range: "525 km", connector: "CCS1 / NACS adapter", peakDC: "190 kW", dcTime: "37 min (10-80%)", level2Time: "10 hr (full)" },
    { make: "Cadillac", model: "Escalade IQ", year: "2025-2026", battery: "200 kWh", range: "740 km", connector: "CCS1 / NACS adapter", peakDC: "350 kW", dcTime: "40 min (10-80%)", level2Time: "20 hr (full)" },
    { make: "Cadillac", model: "Optiq", year: "2026", battery: "85 kWh", range: "483 km", connector: "CCS1 / NACS adapter", peakDC: "150 kW", dcTime: "35 min (10-80%)", level2Time: "10 hr (full)" },
    { make: "GMC", model: "Sierra EV", year: "2026", battery: "200 kWh", range: "725 km", connector: "CCS1 / NACS adapter", peakDC: "350 kW", dcTime: "40 min (10-80%)", level2Time: "20 hr (full)" },
    { make: "GMC", model: "Hummer EV Pickup", year: "2026", battery: "212 kWh", range: "529 km", connector: "CCS1 / NACS adapter", peakDC: "350 kW", dcTime: "40 min (10-80%)", level2Time: "21 hr (full)" },
    { make: "Volkswagen", model: "ID.4", year: "2025", battery: "82 kWh", range: "467 km", connector: "CCS1", peakDC: "175 kW", dcTime: "36 min (10-80%)", level2Time: "8 hr (full)" },
    { make: "Volkswagen", model: "ID. Buzz", year: "2025", battery: "91 kWh", range: "377 km", connector: "CCS1", peakDC: "200 kW", dcTime: "30 min (10-80%)", level2Time: "9 hr (full)" },
    { make: "Audi", model: "Q4 e-tron", year: "2025-2026", battery: "82 kWh", range: "418 km", connector: "CCS1", peakDC: "175 kW", dcTime: "28 min (10-80%)", level2Time: "8 hr (full)" },
    { make: "Audi", model: "Q6 e-tron", year: "2026", battery: "94 kWh", range: "488 km", connector: "CCS1", peakDC: "260 kW", dcTime: "21 min (10-80%)", level2Time: "9 hr (full)" },
    { make: "Audi", model: "Q8 e-tron", year: "2025", battery: "114 kWh", range: "459 km", connector: "CCS1", peakDC: "170 kW", dcTime: "31 min (10-80%)", level2Time: "11 hr (full)" },
    { make: "Audi", model: "e-tron GT", year: "2025-2026", battery: "97 kWh", range: "459 km", connector: "CCS1", peakDC: "320 kW", dcTime: "18 min (10-80%)", level2Time: "10 hr (full)" },
    { make: "BMW", model: "i4 eDrive40", year: "2025", battery: "84 kWh", range: "509 km", connector: "CCS1", peakDC: "205 kW", dcTime: "30 min (10-80%)", level2Time: "8 hr (full)" },
    { make: "BMW", model: "iX xDrive50", year: "2025-2026", battery: "112 kWh", range: "521 km", connector: "CCS1", peakDC: "200 kW", dcTime: "35 min (10-80%)", level2Time: "11 hr (full)" },
    { make: "BMW", model: "i5 eDrive40", year: "2025-2026", battery: "84 kWh", range: "475 km", connector: "CCS1", peakDC: "205 kW", dcTime: "30 min (10-80%)", level2Time: "8 hr (full)" },
    { make: "BMW", model: "i7", year: "2025-2026", battery: "106 kWh", range: "525 km", connector: "CCS1", peakDC: "195 kW", dcTime: "34 min (10-80%)", level2Time: "10 hr (full)" },
    { make: "Mercedes-Benz", model: "EQE Sedan", year: "2025", battery: "90 kWh", range: "488 km", connector: "CCS1", peakDC: "173 kW", dcTime: "32 min (10-80%)", level2Time: "9 hr (full)" },
    { make: "Mercedes-Benz", model: "EQE SUV", year: "2025", battery: "90 kWh", range: "418 km", connector: "CCS1", peakDC: "170 kW", dcTime: "32 min (10-80%)", level2Time: "9 hr (full)" },
    { make: "Mercedes-Benz", model: "EQS Sedan", year: "2025", battery: "108 kWh", range: "560 km", connector: "CCS1", peakDC: "200 kW", dcTime: "31 min (10-80%)", level2Time: "11 hr (full)" },
    { make: "Mercedes-Benz", model: "EQB", year: "2025", battery: "70 kWh", range: "402 km", connector: "CCS1", peakDC: "100 kW", dcTime: "32 min (10-80%)", level2Time: "7 hr (full)" },
    { make: "Rivian", model: "R1T (Standard)", year: "2025", battery: "92.5 kWh", range: "415 km", connector: "CCS1 / NACS adapter", peakDC: "218 kW", dcTime: "27 min (10-80%)", level2Time: "9 hr (full)" },
    { make: "Rivian", model: "R1T (Large)", year: "2025", battery: "109 kWh", range: "529 km", connector: "CCS1 / NACS adapter", peakDC: "220 kW", dcTime: "35 min (10-80%)", level2Time: "11 hr (full)" },
    { make: "Rivian", model: "R1T (Max)", year: "2025", battery: "141.5 kWh", range: "676 km", connector: "CCS1 / NACS adapter", peakDC: "220 kW", dcTime: "38 min (10-80%)", level2Time: "14 hr (full)" },
    { make: "Rivian", model: "R1S", year: "2025", battery: "109 kWh", range: "513 km", connector: "CCS1 / NACS adapter", peakDC: "220 kW", dcTime: "35 min (10-80%)", level2Time: "11 hr (full)" },
    { make: "Lucid", model: "Air Pure", year: "2025-2026", battery: "88 kWh", range: "660 km", connector: "CCS1", peakDC: "300 kW", dcTime: "22 min (10-80%)", level2Time: "9 hr (full)" },
    { make: "Lucid", model: "Air Touring", year: "2025-2026", battery: "92 kWh", range: "684 km", connector: "CCS1", peakDC: "300 kW", dcTime: "22 min (10-80%)", level2Time: "9 hr (full)" },
    { make: "Lucid", model: "Gravity", year: "2025-2026", battery: "120 kWh", range: "725 km", connector: "NACS", peakDC: "400 kW", dcTime: "20 min (10-80%)", level2Time: "12 hr (full)" },
    { make: "Polestar", model: "2", year: "2025", battery: "82 kWh", range: "454 km", connector: "CCS1", peakDC: "205 kW", dcTime: "28 min (10-80%)", level2Time: "8 hr (full)" },
    { make: "Polestar", model: "3", year: "2025-2026", battery: "111 kWh", range: "443 km", connector: "CCS1", peakDC: "250 kW", dcTime: "30 min (10-80%)", level2Time: "11 hr (full)" },
    { make: "Honda", model: "Prologue", year: "2025", battery: "85 kWh", range: "481 km", connector: "CCS1", peakDC: "150 kW", dcTime: "35 min (10-80%)", level2Time: "10 hr (full)" },
    { make: "Nissan", model: "Ariya", year: "2025", battery: "87 kWh", range: "490 km", connector: "CCS1", peakDC: "130 kW", dcTime: "35 min (10-80%)", level2Time: "10.5 hr (full)" },
    { make: "Nissan", model: "Leaf", year: "2025", battery: "60 kWh", range: "342 km", connector: "CHAdeMO", peakDC: "100 kW", dcTime: "45 min (10-80%)", level2Time: "7 hr (full)" },
    { make: "Toyota", model: "bZ4X", year: "2025", battery: "71 kWh", range: "406 km", connector: "CCS1", peakDC: "150 kW", dcTime: "30 min (10-80%)", level2Time: "9 hr (full)" },
    { make: "Subaru", model: "Solterra", year: "2025", battery: "71 kWh", range: "365 km", connector: "CCS1", peakDC: "150 kW", dcTime: "30 min (10-80%)", level2Time: "9 hr (full)" },
    { make: "Mazda", model: "CX-90 PHEV / EV", year: "2025", battery: "68 kWh", range: "330 km", connector: "CCS1", peakDC: "125 kW", dcTime: "30 min (10-80%)", level2Time: "8 hr (full)" },
    { make: "Genesis", model: "GV60", year: "2025-2026", battery: "77 kWh", range: "397 km", connector: "CCS1", peakDC: "235 kW", dcTime: "18 min (10-80%)", level2Time: "7 hr (full)" },
    { make: "Genesis", model: "Electrified GV70", year: "2025-2026", battery: "77 kWh", range: "377 km", connector: "CCS1", peakDC: "235 kW", dcTime: "18 min (10-80%)", level2Time: "7 hr (full)" },
    { make: "Jaguar", model: "I-Pace", year: "2024", battery: "90 kWh", range: "470 km", connector: "CCS1", peakDC: "100 kW", dcTime: "44 min (10-80%)", level2Time: "9 hr (full)" },
    { make: "Volvo", model: "EX30", year: "2025", battery: "69 kWh", range: "442 km", connector: "CCS1", peakDC: "153 kW", dcTime: "28 min (10-80%)", level2Time: "7 hr (full)" },
    { make: "Volvo", model: "EX90", year: "2025-2026", battery: "111 kWh", range: "499 km", connector: "CCS1", peakDC: "250 kW", dcTime: "30 min (10-80%)", level2Time: "11 hr (full)" },
  ];

  const filteredVehicles = vehicleQuery
    ? vehicles.filter(v => `${v.make} ${v.model}`.toLowerCase().includes(vehicleQuery.toLowerCase()))
    : [];

  // When a vehicle is selected, auto-fill the estimator
  const selectVehicle = (v) => {
    setSelectedVehicle(v);
    setVehicleQuery(`${v.make} ${v.model}`);
    const batteryKwh = parseNumber(v.battery);
    const peakKw = parseNumber(v.peakDC);
    if (batteryKwh > 0) setBattery(Math.min(150, Math.max(40, Math.round(batteryKwh))));
    if (peakKw > 0) setCarMaxKW(Math.min(350, Math.max(50, Math.round(peakKw / 10) * 10)));
  };

  const clearVehicle = () => {
    setSelectedVehicle(null);
    setVehicleQuery("");
  };

  // Charge curve simulation
  const calcEstimate = () => {
    const effectiveKW = Math.min(chargerKW, carMaxKW);
    const startKWh = (startPct / 100) * battery;
    let currentKWh = startKWh;
    for (let i = 0; i < duration; i++) {
      const currentPct = (currentKWh / battery) * 100;
      let chargeRate;
      if (currentPct < 20) chargeRate = effectiveKW * 0.9;
      else if (currentPct < 60) chargeRate = effectiveKW * 1.0;
      else if (currentPct < 80) chargeRate = effectiveKW * 0.65;
      else if (currentPct < 90) chargeRate = effectiveKW * 0.35;
      else chargeRate = effectiveKW * 0.18;
      currentKWh = Math.min(currentKWh + chargeRate / 60, battery);
    }
    const finalPctRaw = (currentKWh / battery) * 100;
    const conservativeLow = Math.max(startPct + 1, Math.round(finalPctRaw - 8));
    const conservativeHigh = Math.max(conservativeLow + 1, Math.round(finalPctRaw - 3));
    const kWhAdded = currentKWh - startKWh;
    return { low: conservativeLow, high: conservativeHigh, kWhAdded: kWhAdded.toFixed(1) };
  };

  const estimate = calcEstimate();

  // Fetch chargers
  useEffect(() => {
    const fetchChargers = async () => {
      try {
        const url = "https://api.openchargemap.io/v3/poi?output=json&countrycode=CA&latitude=43.75&longitude=-79.55&distance=60&distanceunit=KM&maxresults=500&levelid=3&compact=false&verbose=true";
        const res = await fetch(url, {
          headers: {
            "X-API-Key": "87779217-322b-48f2-85c8-ea1c8d592286"
          }
        });
        if (!res.ok) throw new Error(`API returned ${res.status}: ${res.statusText}`);
        const data = await res.json();
        // levelid=3 in the URL already filters for DC fast on the server
        // Just keep stations that have at least one connection
        const dcFastOnly = data.filter(c => c.Connections && c.Connections.length > 0);
        setChargers(dcFastOnly);
        setMapLoading(false);
      } catch (err) {
        console.error("Charger fetch error:", err);
        setMapError(err.message);
        setMapLoading(false);
      }
    };
    fetchChargers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white" style={body}>
      <style>{FONTS}</style>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20">
              <Icon name="zap" className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-extrabold tracking-tight leading-none" style={display}>NowCharged</p>
              <p className="text-xs text-slate-400 mt-0.5">EV Charging Valet · Toronto & GTA</p>
            </div>
          </a>
          <a href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <Icon name="arrowL" className="h-4 w-4" /> Back to home
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_25%,rgba(52,211,153,0.16),transparent_45%),radial-gradient(ellipse_at_85%_75%,rgba(56,189,248,0.09),transparent_45%)]" />
          <div className="relative mx-auto max-w-5xl">
            <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Find your EV</p>
            <h1 className="mt-4 text-5xl font-black leading-[1.04] tracking-tight md:text-6xl" style={display}>
              Plan your charge before you book.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Find your EV, estimate your charge, and see the DC fast chargers in our service area.
            </p>
          </div>
        </section>

        {/* Vehicle Finder */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Step 1 · Find your EV</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl" style={display}>
                Which car do you drive?
              </h2>
              <p className="mt-3 max-w-xl text-slate-400 text-sm leading-7">
                Picking your vehicle below auto-fills the estimator with your real battery size and charging speed.
              </p>
            </div>

            <div className="relative mb-4">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500">
                <Icon name="search" className="h-5 w-5" />
              </div>
              <input
                type="text"
                value={vehicleQuery}
                onChange={(e) => { setVehicleQuery(e.target.value); setSelectedVehicle(null); }}
                placeholder="Try 'Tesla Model Y' or 'Ioniq 5'..."
                className="w-full rounded-2xl border border-white/10 bg-slate-900 pl-14 pr-6 py-4 text-base text-white outline-none focus:border-emerald-400 transition-colors placeholder:text-slate-500"
              />
            </div>

            {vehicleQuery && !selectedVehicle && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] max-h-80 overflow-y-auto">
                {filteredVehicles.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-sm text-slate-400 mb-3">No match found for "{vehicleQuery}"</p>
                    <a
                      href={`mailto:info@nowcharged.com?subject=Vehicle Suggestion for NowCharged&body=Hi NowCharged team,%0D%0A%0D%0AI couldn't find my EV on your Tools page. Could you add it?%0D%0A%0D%0AVehicle: ${vehicleQuery}%0D%0AYear: %0D%0ATrim: %0D%0A%0D%0AThanks!`}
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-300 transition-colors"
                    >
                      Suggest this vehicle <Icon name="arrow" className="h-4 w-4" />
                    </a>
                  </div>
                ) : (
                  filteredVehicles.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => selectVehicle(v)}
                      className="w-full text-left px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.04] transition-colors"
                    >
                      <p className="font-bold text-white">{v.make} {v.model}</p>
                      <p className="text-xs text-slate-400 mt-1">{v.year} · {v.battery} · {v.connector}</p>
                    </button>
                  ))
                )}
              </div>
            )}

            {selectedVehicle && (
              <div className="rounded-3xl border-2 border-emerald-400/40 bg-emerald-400/5 p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950">
                      <Icon name="car" className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs text-emerald-300 uppercase tracking-wider">{selectedVehicle.year}</p>
                      <h3 className="text-2xl font-black" style={display}>{selectedVehicle.make} {selectedVehicle.model}</h3>
                    </div>
                  </div>
                  <button onClick={clearVehicle} className="text-sm text-slate-400 hover:text-white transition-colors">Reset</button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                  <div className="rounded-xl bg-slate-950 p-4">
                    <p className="text-[10px] uppercase tracking-wider text-emerald-300">Battery</p>
                    <p className="mt-1 text-base font-bold text-white">{selectedVehicle.battery}</p>
                  </div>
                  <div className="rounded-xl bg-slate-950 p-4">
                    <p className="text-[10px] uppercase tracking-wider text-emerald-300">Range</p>
                    <p className="mt-1 text-base font-bold text-white">{selectedVehicle.range}</p>
                  </div>
                  <div className="rounded-xl bg-slate-950 p-4">
                    <p className="text-[10px] uppercase tracking-wider text-emerald-300">Connector</p>
                    <p className="mt-1 text-base font-bold text-white">{selectedVehicle.connector}</p>
                  </div>
                  <div className="rounded-xl bg-slate-950 p-4">
                    <p className="text-[10px] uppercase tracking-wider text-emerald-300">Peak DC</p>
                    <p className="mt-1 text-base font-bold text-white">{selectedVehicle.peakDC}</p>
                  </div>
                </div>

                <p className="mt-5 text-xs text-emerald-300/80 font-semibold">
                  ✓ Estimator below has been auto-filled with your car's specs
                </p>
              </div>
            )}

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
              <p className="text-sm text-slate-300">
                Don't see your car?{" "}
                <a href="mailto:info@nowcharged.com?subject=Vehicle Suggestion for NowCharged&body=Hi NowCharged team,%0D%0A%0D%0AI'd like to suggest adding my EV to your Tools page:%0D%0A%0D%0AMake: %0D%0AModel: %0D%0AYear: %0D%0ATrim (if known): %0D%0A%0D%0AThanks!" className="text-emerald-300 hover:text-emerald-200 underline underline-offset-4">
                  Suggest it here
                </a>
              </p>
              <p className="text-xs text-slate-500 mt-1">Showing {vehicles.length} popular EVs in Canada</p>
            </div>
          </div>
        </section>

        {/* CHARGE ESTIMATOR */}
        <section className="px-6 py-16 bg-slate-900">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Step 2 · Estimate your charge</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl" style={display}>
                How much battery will you get back?
              </h2>
              <p className="mt-3 max-w-xl text-slate-400 text-sm leading-7">
                {selectedVehicle ? (
                  <>Your <span className="text-emerald-300 font-semibold">{selectedVehicle.make} {selectedVehicle.model}</span> specs are loaded. Adjust starting battery and session length below.</>
                ) : (
                  <>Drag the sliders to match your situation. We deliberately underestimate so the real result feels better.</>
                )}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 md:p-10">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold">Battery size {selectedVehicle && <span className="text-emerald-300 text-xs">(from your car)</span>}</label>
                      <span className="text-sm font-bold text-emerald-300">{battery} kWh</span>
                    </div>
                    <input type="range" min="40" max="150" step="1" value={battery} onChange={e => setBattery(+e.target.value)} className="w-full accent-emerald-400" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold">Starting battery %</label>
                      <span className="text-sm font-bold text-emerald-300">{startPct}%</span>
                    </div>
                    <input type="range" min="5" max="80" step="1" value={startPct} onChange={e => setStartPct(+e.target.value)} className="w-full accent-emerald-400" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold">Session length</label>
                      <span className="text-sm font-bold text-emerald-300">{duration} min</span>
                    </div>
                    <input type="range" min="15" max="180" step="5" value={duration} onChange={e => setDuration(+e.target.value)} className="w-full accent-emerald-400" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold">Charger speed</label>
                      <span className="text-sm font-bold text-emerald-300">{chargerKW} kW</span>
                    </div>
                    <input type="range" min="50" max="350" step="10" value={chargerKW} onChange={e => setChargerKW(+e.target.value)} className="w-full accent-emerald-400" />
                    <p className="text-xs text-slate-500 mt-1">Most Toronto public DC: 50-150 kW</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold">Car's max charging speed {selectedVehicle && <span className="text-emerald-300 text-xs">(from your car)</span>}</label>
                      <span className="text-sm font-bold text-emerald-300">{carMaxKW} kW</span>
                    </div>
                    <input type="range" min="50" max="350" step="10" value={carMaxKW} onChange={e => setCarMaxKW(+e.target.value)} className="w-full accent-emerald-400" />
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="rounded-2xl bg-emerald-400 p-8 text-slate-950 text-center">
                    <p className="text-xs uppercase tracking-wider font-bold opacity-70">Conservative estimate</p>
                    <p className="mt-3 text-5xl font-black" style={display}>{estimate.low}–{estimate.high}%</p>
                    <p className="mt-2 text-sm font-semibold">battery on return</p>
                    <div className="mt-6 pt-6 border-t border-slate-950/20">
                      <p className="text-xs uppercase tracking-wider font-bold opacity-70">Energy added</p>
                      <p className="mt-2 text-2xl font-black" style={display}>~{estimate.kWhAdded} kWh</p>
                    </div>
                  </div>
                  <p className="mt-5 text-xs text-slate-500 leading-6">
                    Real results often beat this estimate. We use a conservative model accounting for charging curve tapering, temperature, and charger variability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAP */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Step 3 · Service area</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl" style={display}>
                DC fast chargers we use.
              </h2>
              <p className="mt-3 max-w-2xl text-slate-400 text-sm leading-7">
                Enter your postal code to see DC fast chargers within 25km of your location.
              </p>
            </div>

            {/* Postal code search */}
            <form onSubmit={handlePostalSubmit} className="mb-8">
              <div className="flex flex-wrap gap-3 items-start">
                <div className="flex-1 min-w-[220px]">
                  <input
                    type="text"
                    value={userPostal}
                    onChange={(e) => setUserPostal(e.target.value)}
                    placeholder="Your postal code (e.g. M5V or M5V 3A8)"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-5 py-3.5 text-sm text-white outline-none focus:border-emerald-400 transition-colors placeholder:text-slate-500"
                    maxLength={7}
                  />
                  {postalError && (
                    <p className="mt-2 text-xs text-rose-300">{postalError}</p>
                  )}
                  {userCoords && (
                    <p className="mt-2 text-xs text-emerald-300">
                      ✓ Showing chargers within 25km of {userCoords.name} ({userCoords.code})
                    </p>
                  )}
                </div>
                <button type="submit" className="rounded-2xl bg-emerald-400 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-300 transition-colors">
                  Search
                </button>
                {userCoords && (
                  <button type="button" onClick={clearPostal} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm text-slate-300 hover:bg-white/[0.08] transition-colors">
                    Clear
                  </button>
                )}
              </div>
            </form>

            <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
              <div className="rounded-3xl border border-white/10 bg-slate-900 overflow-hidden min-h-[500px] relative">
                {mapLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                    <div className="h-10 w-10 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin mb-4" />
                    <p className="text-sm">Loading DC fast chargers in your area...</p>
                  </div>
                )}
                {mapError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                    <p className="text-sm text-slate-400 mb-2">Couldn't load chargers from OpenChargeMap right now.</p>
                    <p className="text-xs text-slate-500 mb-4">Error: {mapError}</p>
                    <p className="text-xs text-slate-500">Try refreshing, or browse OpenChargeMap directly at openchargemap.org</p>
                  </div>
                )}
                {!mapLoading && !mapError && (
                  <div className="p-6">
                    {displayChargers.length === 0 ? (
                      <div className="text-center py-20">
                        <p className="text-sm text-slate-400 mb-2">No DC fast chargers found within 25km of {userCoords?.name || "your location"}.</p>
                        <p className="text-xs text-slate-500">Try a wider area, or contact us for help routing your charge.</p>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {displayChargers.slice(0, showCount).map(c => {
                            const town = c.AddressInfo?.Town;
                            const postal = c.AddressInfo?.Postcode;
                            const address = c.AddressInfo?.AddressLine1;
                            const areaCode = postal ? postal.split(" ")[0] : null;
                            const locationLabel = areaCode || town || address?.split(",")[0] || "Toronto area";
                            const distance = c._distance ? `${c._distance.toFixed(1)} km` : null;
                            return (
                              <button
                                key={c.ID}
                                onClick={() => setSelectedCharger(c)}
                                className={`text-left rounded-xl border p-3 transition-colors ${selectedCharger?.ID === c.ID ? "border-emerald-400 bg-emerald-400/10" : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"}`}
                              >
                                <div className="flex items-start gap-2">
                                  <Icon name="pin" className="h-4 w-4 shrink-0 text-emerald-300 mt-0.5" />
                                  <div className="min-w-0">
                                    <p className="text-xs font-bold truncate">{c.AddressInfo?.Title || "Charging station"}</p>
                                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{locationLabel}{distance && ` · ${distance}`}</p>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {showCount < displayChargers.length && (
                          <div className="mt-6 text-center">
                            <button
                              onClick={() => setShowCount(showCount + 24)}
                              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-6 py-3 text-sm font-bold text-emerald-300 hover:bg-emerald-400/20 transition-colors"
                            >
                              Show 24 more <Icon name="arrow" className="h-4 w-4" />
                            </button>
                          </div>
                        )}

                        <p className="mt-6 text-xs text-slate-500 text-center">
                          {userCoords ? (
                            <>Showing {Math.min(displayChargers.length, showCount)} of {displayChargers.length} chargers within 25km of {userCoords.name}.</>
                          ) : (
                            <>Showing {Math.min(displayChargers.length, showCount)} of {displayChargers.length} DC fast chargers in the GTA. Search by postal code above to narrow down.</>
                          )}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
                {selectedCharger ? (
                  <>
                    <p className="text-xs uppercase tracking-wider text-emerald-300">Charger details</p>
                    <h3 className="mt-2 text-xl font-bold leading-tight" style={display}>{selectedCharger.AddressInfo?.Title || "Charging station"}</h3>
                    <p className="mt-2 text-sm text-slate-400">
                      {selectedCharger.AddressInfo?.AddressLine1}<br />
                      {selectedCharger.AddressInfo?.Town}, {selectedCharger.AddressInfo?.StateOrProvince}
                    </p>
                    {selectedCharger.Connections && selectedCharger.Connections.length > 0 && (
                      <div className="mt-5">
                        <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Connectors</p>
                        <div className="space-y-2">
                          {selectedCharger.Connections.slice(0, 4).map((conn, i) => {
                            // Map common connector IDs to names if API doesn't return them
                            const connectorNames = {
                              1: "Type 1 (J1772)",
                              2: "CHAdeMO",
                              25: "Type 2 (Mennekes)",
                              27: "Tesla (Roadster)",
                              30: "Tesla (Model S/X)",
                              32: "CCS Type 1",
                              33: "CCS Type 2",
                              1036: "NACS / Tesla",
                            };
                            const connectorName = conn.ConnectionType?.Title 
                              || connectorNames[conn.ConnectionTypeID]
                              || `Connector type ${conn.ConnectionTypeID || "unspecified"}`;
                            return (
                              <div key={i} className="rounded-xl bg-white/[0.04] p-3">
                                <p className="text-sm font-semibold">{connectorName}</p>
                                <p className="text-xs text-slate-400 mt-1">
                                  {conn.PowerKW ? `${conn.PowerKW} kW` : "Power: not specified"}
                                  {conn.Level?.Title && ` · ${conn.Level.Title}`}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {selectedCharger.OperatorInfo?.Title && (
                      <p className="mt-5 text-xs text-slate-500">Operated by {selectedCharger.OperatorInfo.Title}</p>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Icon name="info" className="h-8 w-8 mx-auto text-slate-600 mb-3" />
                    <p className="text-sm text-slate-400">Click any charger on the left to see details, connectors, and power output.</p>
                  </div>
                )}
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              Charger data sourced from OpenChargeMap, a community-driven database. Real-time availability may differ. We confirm charger availability at booking.
            </p>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-emerald-400 p-10 text-center text-slate-950 md:p-16">
            <h2 className="text-4xl font-black tracking-tight md:text-5xl" style={display}>
              Ready when you are.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-800">
              Now that you've planned your charge, let us handle the rest.
            </p>
            <a href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-8 py-4 text-base font-bold text-white hover:bg-slate-800 transition-colors">
              Get Started <Icon name="arrow" className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-bold text-white" style={display}>NowCharged</p>
            <p className="mt-1 text-sm text-slate-400">EV Charging Valet · Toronto & Greater Toronto Area</p>
            <p className="mt-1 text-sm text-slate-400">
              <a href="mailto:info@nowcharged.com" className="hover:text-white transition-colors">info@nowcharged.com</a>
            </p>
            <p className="mt-1 text-sm text-slate-500">© 2026 NowCharged. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
