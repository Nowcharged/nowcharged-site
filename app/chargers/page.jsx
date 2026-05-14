"use client";

import { useState } from "react";

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
    plug:    <svg {...p}><path d="M9 2v6" /><path d="M15 2v6" /><path d="M12 18v4" /><path d="M6 8h12v3a6 6 0 0 1-12 0Z" /></svg>,
    home:    <svg {...p}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /><path d="M9 22V12h6v10" /></svg>,
    bolt:    <svg {...p}><circle cx="12" cy="12" r="10" /><path d="m13 7-3 6h3l-2 4" /></svg>,
    check:   <svg {...p}><path d="M20 6 9 17l-5-5" /></svg>,
    x:       <svg {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>,
  };
  return icons[name] || icons.zap;
}

function PlugVisual({ type }) {
  const visuals = {
    "J1772": (
      <svg viewBox="0 0 200 200" className="w-full h-auto max-w-[200px]">
        <circle cx="100" cy="100" r="85" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
        <circle cx="100" cy="70" r="14" fill="#10b981" />
        <circle cx="100" cy="70" r="6" fill="#1e293b" />
        <circle cx="78" cy="105" r="11" fill="#10b981" />
        <circle cx="78" cy="105" r="5" fill="#1e293b" />
        <circle cx="122" cy="105" r="11" fill="#10b981" />
        <circle cx="122" cy="105" r="5" fill="#1e293b" />
        <rect x="86" y="135" width="28" height="10" rx="2" fill="#10b981" />
        <rect x="89" y="138" width="22" height="4" rx="1" fill="#1e293b" />
      </svg>
    ),
    "CCS1": (
      <svg viewBox="0 0 200 200" className="w-full h-auto max-w-[200px]">
        <circle cx="100" cy="100" r="85" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
        <circle cx="100" cy="60" r="11" fill="#10b981" />
        <circle cx="100" cy="60" r="5" fill="#1e293b" />
        <circle cx="80" cy="88" r="9" fill="#10b981" />
        <circle cx="80" cy="88" r="4" fill="#1e293b" />
        <circle cx="120" cy="88" r="9" fill="#10b981" />
        <circle cx="120" cy="88" r="4" fill="#1e293b" />
        <rect x="92" y="112" width="16" height="8" rx="2" fill="#10b981" />
        <circle cx="82" cy="140" r="14" fill="#10b981" />
        <circle cx="82" cy="140" r="7" fill="#1e293b" />
        <circle cx="118" cy="140" r="14" fill="#10b981" />
        <circle cx="118" cy="140" r="7" fill="#1e293b" />
      </svg>
    ),
    "NACS / Tesla": (
      <svg viewBox="0 0 200 200" className="w-full h-auto max-w-[200px]">
        <circle cx="100" cy="100" r="85" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
        <ellipse cx="85" cy="80" rx="9" ry="13" fill="#10b981" />
        <ellipse cx="85" cy="80" rx="4" ry="7" fill="#1e293b" />
        <ellipse cx="115" cy="80" rx="9" ry="13" fill="#10b981" />
        <ellipse cx="115" cy="80" rx="4" ry="7" fill="#1e293b" />
        <ellipse cx="85" cy="120" rx="9" ry="13" fill="#10b981" />
        <ellipse cx="85" cy="120" rx="4" ry="7" fill="#1e293b" />
        <ellipse cx="115" cy="120" rx="9" ry="13" fill="#10b981" />
        <ellipse cx="115" cy="120" rx="4" ry="7" fill="#1e293b" />
        <circle cx="100" cy="100" r="6" fill="#10b981" />
      </svg>
    ),
    "CHAdeMO": (
      <svg viewBox="0 0 200 200" className="w-full h-auto max-w-[200px]">
        <circle cx="100" cy="100" r="85" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
        <circle cx="100" cy="55" r="9" fill="#64748b" />
        <circle cx="100" cy="55" r="4" fill="#1e293b" />
        <circle cx="65" cy="80" r="9" fill="#64748b" />
        <circle cx="65" cy="80" r="4" fill="#1e293b" />
        <circle cx="135" cy="80" r="9" fill="#64748b" />
        <circle cx="135" cy="80" r="4" fill="#1e293b" />
        <circle cx="65" cy="120" r="9" fill="#64748b" />
        <circle cx="65" cy="120" r="4" fill="#1e293b" />
        <circle cx="135" cy="120" r="9" fill="#64748b" />
        <circle cx="135" cy="120" r="4" fill="#1e293b" />
        <circle cx="85" cy="145" r="9" fill="#64748b" />
        <circle cx="85" cy="145" r="4" fill="#1e293b" />
        <circle cx="115" cy="145" r="9" fill="#64748b" />
        <circle cx="115" cy="145" r="4" fill="#1e293b" />
      </svg>
    ),
  };
  return visuals[type] || visuals["J1772"];
}

export default function ChargersPage() {
  const [activeCharger, setActiveCharger] = useState(0);
  const [activeConnector, setActiveConnector] = useState(0);
  const [vehicleQuery, setVehicleQuery] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const vehicles = [
    // Tesla
    { make: "Tesla", model: "Model Y (Standard)", year: "2025", battery: "60 kWh", range: "500 km", connector: "NACS", peakDC: "175 kW", dcTime: "25 min (10-80%)", level2Time: "7 hr (full)" },
    { make: "Tesla", model: "Model Y (Long Range)", year: "2025", battery: "75 kWh", range: "586 km", connector: "NACS", peakDC: "250 kW", dcTime: "20 min (10-80%)", level2Time: "8 hr (full)" },
    { make: "Tesla", model: "Model Y (Performance)", year: "2025", battery: "82 kWh", range: "514 km", connector: "NACS", peakDC: "250 kW", dcTime: "20 min (10-80%)", level2Time: "8 hr (full)" },
    { make: "Tesla", model: "Model 3 (RWD)", year: "2025", battery: "60 kWh", range: "438 km", connector: "NACS", peakDC: "170 kW", dcTime: "25 min (10-80%)", level2Time: "7 hr (full)" },
    { make: "Tesla", model: "Model 3 (Long Range)", year: "2025", battery: "75 kWh", range: "584 km", connector: "NACS", peakDC: "250 kW", dcTime: "20 min (10-80%)", level2Time: "8 hr (full)" },
    { make: "Tesla", model: "Model X", year: "2025", battery: "100 kWh", range: "560 km", connector: "NACS", peakDC: "250 kW", dcTime: "25 min (10-80%)", level2Time: "10 hr (full)" },
    { make: "Tesla", model: "Model S", year: "2025", battery: "100 kWh", range: "650 km", connector: "NACS", peakDC: "250 kW", dcTime: "25 min (10-80%)", level2Time: "10 hr (full)" },
    { make: "Tesla", model: "Cybertruck", year: "2025", battery: "123 kWh", range: "547 km", connector: "NACS", peakDC: "250 kW", dcTime: "35 min (10-80%)", level2Time: "11 hr (full)" },

    // Hyundai
    { make: "Hyundai", model: "Ioniq 5 (Standard)", year: "2025-2026", battery: "63 kWh", range: "390 km", connector: "NACS (2025+) / CCS1", peakDC: "175 kW", dcTime: "20-25 min (10-80%)", level2Time: "5.5 hr (full)" },
    { make: "Hyundai", model: "Ioniq 5 (Long Range)", year: "2025-2026", battery: "84 kWh", range: "488 km", connector: "NACS (2025+) / CCS1", peakDC: "235 kW", dcTime: "20-30 min (10-80%)", level2Time: "7.5 hr (full)" },
    { make: "Hyundai", model: "Ioniq 5 N", year: "2025", battery: "84 kWh", range: "356 km", connector: "CCS1", peakDC: "235 kW", dcTime: "18 min (10-80%)", level2Time: "7.5 hr (full)" },
    { make: "Hyundai", model: "Ioniq 6", year: "2025", battery: "77 kWh", range: "581 km", connector: "CCS1", peakDC: "235 kW", dcTime: "18 min (10-80%)", level2Time: "7 hr (full)" },
    { make: "Hyundai", model: "Ioniq 9", year: "2026", battery: "110 kWh", range: "539 km", connector: "NACS / CCS1", peakDC: "235 kW", dcTime: "24 min (10-80%)", level2Time: "10 hr (full)" },
    { make: "Hyundai", model: "Kona Electric", year: "2025-2026", battery: "64 kWh", range: "418 km", connector: "CCS1", peakDC: "100 kW", dcTime: "43 min (10-80%)", level2Time: "6.5 hr (full)" },

    // Kia
    { make: "Kia", model: "EV6", year: "2025", battery: "77 kWh", range: "499 km", connector: "CCS1", peakDC: "235 kW", dcTime: "18 min (10-80%)", level2Time: "7 hr (full)" },
    { make: "Kia", model: "EV6 GT", year: "2025", battery: "77 kWh", range: "424 km", connector: "CCS1", peakDC: "235 kW", dcTime: "18 min (10-80%)", level2Time: "7 hr (full)" },
    { make: "Kia", model: "EV9", year: "2025-2026", battery: "99 kWh", range: "488 km", connector: "CCS1", peakDC: "210 kW", dcTime: "24 min (10-80%)", level2Time: "10 hr (full)" },
    { make: "Kia", model: "Niro EV", year: "2025-2026", battery: "64 kWh", range: "407 km", connector: "CCS1", peakDC: "85 kW", dcTime: "43 min (10-80%)", level2Time: "6.5 hr (full)" },
    { make: "Kia", model: "EV4", year: "2026", battery: "81 kWh", range: "510 km", connector: "CCS1", peakDC: "150 kW", dcTime: "30 min (10-80%)", level2Time: "8 hr (full)" },
    { make: "Kia", model: "EV5", year: "2026-2027", battery: "88 kWh", range: "530 km", connector: "CCS1", peakDC: "150 kW", dcTime: "30 min (10-80%)", level2Time: "8.5 hr (full)" },

    // Ford
    { make: "Ford", model: "Mustang Mach-E (Standard)", year: "2025-2026", battery: "73 kWh", range: "402 km", connector: "CCS1 / NACS adapter", peakDC: "150 kW", dcTime: "36-38 min (10-80%)", level2Time: "11 hr (full)" },
    { make: "Ford", model: "Mustang Mach-E (Extended)", year: "2025-2026", battery: "91 kWh", range: "515 km", connector: "CCS1 / NACS adapter", peakDC: "150 kW", dcTime: "43-45 min (10-80%)", level2Time: "14 hr (full)" },
    { make: "Ford", model: "Mustang Mach-E GT", year: "2025-2026", battery: "91 kWh", range: "435 km", connector: "CCS1 / NACS adapter", peakDC: "150 kW", dcTime: "43 min (10-80%)", level2Time: "14 hr (full)" },
    { make: "Ford", model: "F-150 Lightning (Standard)", year: "2025", battery: "98 kWh", range: "386 km", connector: "CCS1 / NACS adapter", peakDC: "150 kW", dcTime: "41 min (10-80%)", level2Time: "10 hr (full)" },
    { make: "Ford", model: "F-150 Lightning (Extended)", year: "2025", battery: "131 kWh", range: "515 km", connector: "CCS1 / NACS adapter", peakDC: "150 kW", dcTime: "41 min (10-80%)", level2Time: "13 hr (full)" },

    // Chevrolet
    { make: "Chevrolet", model: "Equinox EV", year: "2025-2026", battery: "85 kWh", range: "513 km", connector: "CCS1 / NACS adapter", peakDC: "150 kW", dcTime: "35 min (10-80%)", level2Time: "10 hr (full)" },
    { make: "Chevrolet", model: "Blazer EV", year: "2025", battery: "85 kWh", range: "534 km", connector: "CCS1 / NACS adapter", peakDC: "190 kW", dcTime: "30 min (10-80%)", level2Time: "10 hr (full)" },
    { make: "Chevrolet", model: "Silverado EV (Work Truck)", year: "2025", battery: "200 kWh", range: "725 km", connector: "CCS1 / NACS adapter", peakDC: "350 kW", dcTime: "40 min (10-80%)", level2Time: "20 hr (full)" },
    { make: "Chevrolet", model: "Bolt", year: "2027", battery: "65 kWh", range: "410 km", connector: "NACS", peakDC: "150 kW", dcTime: "30 min (10-80%)", level2Time: "7 hr (full)" },

    // Cadillac (GM)
    { make: "Cadillac", model: "Lyriq", year: "2025-2026", battery: "102 kWh", range: "525 km", connector: "CCS1 / NACS adapter", peakDC: "190 kW", dcTime: "37 min (10-80%)", level2Time: "10 hr (full)" },
    { make: "Cadillac", model: "Escalade IQ", year: "2025-2026", battery: "200 kWh", range: "740 km", connector: "CCS1 / NACS adapter", peakDC: "350 kW", dcTime: "40 min (10-80%)", level2Time: "20 hr (full)" },
    { make: "Cadillac", model: "Optiq", year: "2026", battery: "85 kWh", range: "483 km", connector: "CCS1 / NACS adapter", peakDC: "150 kW", dcTime: "35 min (10-80%)", level2Time: "10 hr (full)" },

    // GMC
    { make: "GMC", model: "Sierra EV", year: "2026", battery: "200 kWh", range: "725 km", connector: "CCS1 / NACS adapter", peakDC: "350 kW", dcTime: "40 min (10-80%)", level2Time: "20 hr (full)" },
    { make: "GMC", model: "Hummer EV Pickup", year: "2026", battery: "212 kWh", range: "529 km", connector: "CCS1 / NACS adapter", peakDC: "350 kW", dcTime: "40 min (10-80%)", level2Time: "21 hr (full)" },

    // Volkswagen
    { make: "Volkswagen", model: "ID.4", year: "2025", battery: "82 kWh", range: "467 km", connector: "CCS1", peakDC: "175 kW", dcTime: "36 min (10-80%)", level2Time: "8 hr (full)" },
    { make: "Volkswagen", model: "ID. Buzz", year: "2025", battery: "91 kWh", range: "377 km", connector: "CCS1", peakDC: "200 kW", dcTime: "30 min (10-80%)", level2Time: "9 hr (full)" },

    // Audi
    { make: "Audi", model: "Q4 e-tron", year: "2025-2026", battery: "82 kWh", range: "418 km", connector: "CCS1", peakDC: "175 kW", dcTime: "28 min (10-80%)", level2Time: "8 hr (full)" },
    { make: "Audi", model: "Q6 e-tron", year: "2026", battery: "94 kWh", range: "488 km", connector: "CCS1", peakDC: "260 kW", dcTime: "21 min (10-80%)", level2Time: "9 hr (full)" },
    { make: "Audi", model: "Q8 e-tron", year: "2025", battery: "114 kWh", range: "459 km", connector: "CCS1", peakDC: "170 kW", dcTime: "31 min (10-80%)", level2Time: "11 hr (full)" },
    { make: "Audi", model: "e-tron GT", year: "2025-2026", battery: "97 kWh", range: "459 km", connector: "CCS1", peakDC: "320 kW", dcTime: "18 min (10-80%)", level2Time: "10 hr (full)" },

    // BMW
    { make: "BMW", model: "i4 eDrive40", year: "2025", battery: "84 kWh", range: "509 km", connector: "CCS1", peakDC: "205 kW", dcTime: "30 min (10-80%)", level2Time: "8 hr (full)" },
    { make: "BMW", model: "iX xDrive50", year: "2025-2026", battery: "112 kWh", range: "521 km", connector: "CCS1", peakDC: "200 kW", dcTime: "35 min (10-80%)", level2Time: "11 hr (full)" },
    { make: "BMW", model: "i5 eDrive40", year: "2025-2026", battery: "84 kWh", range: "475 km", connector: "CCS1", peakDC: "205 kW", dcTime: "30 min (10-80%)", level2Time: "8 hr (full)" },
    { make: "BMW", model: "i7", year: "2025-2026", battery: "106 kWh", range: "525 km", connector: "CCS1", peakDC: "195 kW", dcTime: "34 min (10-80%)", level2Time: "10 hr (full)" },

    // Mercedes-Benz
    { make: "Mercedes-Benz", model: "EQE Sedan", year: "2025", battery: "90 kWh", range: "488 km", connector: "CCS1", peakDC: "173 kW", dcTime: "32 min (10-80%)", level2Time: "9 hr (full)" },
    { make: "Mercedes-Benz", model: "EQE SUV", year: "2025", battery: "90 kWh", range: "418 km", connector: "CCS1", peakDC: "170 kW", dcTime: "32 min (10-80%)", level2Time: "9 hr (full)" },
    { make: "Mercedes-Benz", model: "EQS Sedan", year: "2025", battery: "108 kWh", range: "560 km", connector: "CCS1", peakDC: "200 kW", dcTime: "31 min (10-80%)", level2Time: "11 hr (full)" },
    { make: "Mercedes-Benz", model: "EQB", year: "2025", battery: "70 kWh", range: "402 km", connector: "CCS1", peakDC: "100 kW", dcTime: "32 min (10-80%)", level2Time: "7 hr (full)" },

    // Rivian
    { make: "Rivian", model: "R1T (Standard)", year: "2025", battery: "92.5 kWh", range: "415 km", connector: "CCS1 / NACS adapter", peakDC: "218 kW", dcTime: "27 min (10-80%)", level2Time: "9 hr (full)" },
    { make: "Rivian", model: "R1T (Large)", year: "2025", battery: "109 kWh", range: "529 km", connector: "CCS1 / NACS adapter", peakDC: "220 kW", dcTime: "35 min (10-80%)", level2Time: "11 hr (full)" },
    { make: "Rivian", model: "R1T (Max)", year: "2025", battery: "141.5 kWh", range: "676 km", connector: "CCS1 / NACS adapter", peakDC: "220 kW", dcTime: "38 min (10-80%)", level2Time: "14 hr (full)" },
    { make: "Rivian", model: "R1S", year: "2025", battery: "109 kWh", range: "513 km", connector: "CCS1 / NACS adapter", peakDC: "220 kW", dcTime: "35 min (10-80%)", level2Time: "11 hr (full)" },

    // Lucid
    { make: "Lucid", model: "Air Pure", year: "2025-2026", battery: "88 kWh", range: "660 km", connector: "CCS1", peakDC: "300 kW", dcTime: "22 min (10-80%)", level2Time: "9 hr (full)" },
    { make: "Lucid", model: "Air Touring", year: "2025-2026", battery: "92 kWh", range: "684 km", connector: "CCS1", peakDC: "300 kW", dcTime: "22 min (10-80%)", level2Time: "9 hr (full)" },
    { make: "Lucid", model: "Gravity", year: "2025-2026", battery: "120 kWh", range: "725 km", connector: "NACS", peakDC: "400 kW", dcTime: "20 min (10-80%)", level2Time: "12 hr (full)" },

    // Polestar
    { make: "Polestar", model: "2", year: "2025", battery: "82 kWh", range: "454 km", connector: "CCS1", peakDC: "205 kW", dcTime: "28 min (10-80%)", level2Time: "8 hr (full)" },
    { make: "Polestar", model: "3", year: "2025-2026", battery: "111 kWh", range: "443 km", connector: "CCS1", peakDC: "250 kW", dcTime: "30 min (10-80%)", level2Time: "11 hr (full)" },

    // Other popular EVs
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

  const chargers = [
    {
      level: "Level 1",
      tag: "The trickle charger",
      power: "1.4 kW",
      voltage: "120V AC",
      bestWattage: "1.4 kW is the only option here",
      kmPerHour: "5 to 8 km of range per hour",
      fullChargeTime: "20 to 40 hours for a typical EV",
      where: "Any standard household outlet",
      costPer100km: "About $1.50 at Toronto Hydro off-peak rates",
      co2Saved: "Roughly 22 kg of CO2 saved per 100 km vs a gas car",
      energy: "Uses about 16 kWh per 100 km of range",
      bestFor: "Plug-in hybrids, drivers with very low daily mileage",
      avoidIf: "You drive more than 30 km a day",
      verdict: "Too slow for most EV owners",
      color: "rose",
      icon: "home",
      depth: "Level 1 uses the same 120V outlet you'd plug a lamp into. It works, but it works slowly. If your daily commute is short or you drive a plug-in hybrid with a small battery, this can technically keep up. For full electric vehicles with 60+ kWh batteries, plugging into Level 1 overnight might only get you 50 to 80 km of range back.",
    },
    {
      level: "Level 2",
      tag: "The home standard",
      power: "3.3 to 19.2 kW",
      voltage: "208V to 240V AC",
      bestWattage: "11.5 kW is the sweet spot for most home setups",
      kmPerHour: "20 to 80 km of range per hour",
      fullChargeTime: "4 to 10 hours for a full charge",
      where: "Home wallboxes, condo parking, workplace, public Level 2",
      costPer100km: "About $1.50 at off-peak, $3.20 at on-peak",
      co2Saved: "Roughly 22 kg of CO2 saved per 100 km vs a gas car",
      energy: "Uses about 16 kWh per 100 km of range",
      bestFor: "Daily home charging, overnight top-ups",
      avoidIf: "You don't have access to a dedicated 240V circuit",
      verdict: "The gold standard for home charging",
      color: "amber",
      icon: "plug",
      depth: "Level 2 uses 240V power, the same kind that runs your electric dryer or stove. Most home installations land at 7.7 kW or 11.5 kW. Going higher than 11.5 kW often requires panel upgrades that don't pay off for most drivers. A typical Level 2 setup will fully charge a 75 kWh battery overnight, easily.",
    },
    {
      level: "DC Fast Charging",
      tag: "Also called Level 3",
      power: "50 to 350 kW",
      voltage: "400V to 1000V DC",
      bestWattage: "150 kW is the practical sweet spot for most EVs in 2026",
      kmPerHour: "200 to 1000+ km of range per hour",
      fullChargeTime: "20 to 60 minutes for 10% to 80%",
      where: "Public charging stations only",
      costPer100km: "About $5 to $8 at public stations in Toronto",
      co2Saved: "Roughly 22 kg of CO2 saved per 100 km vs a gas car",
      energy: "Uses about 16 to 20 kWh per 100 km (slightly less efficient)",
      bestFor: "Road trips, quick top-ups, NowCharged service",
      avoidIf: "Daily use, it accelerates battery wear over years",
      verdict: "What we use to get your car back to you fast",
      color: "emerald",
      icon: "bolt",
      depth: "DC fast charging skips the slow conversion process your car normally does. Instead of feeding AC power to your onboard charger, it sends DC power directly to your battery. Most modern EVs can accept 100 to 250 kW peak, but the actual charging speed drops off as the battery fills up. The fastest charging happens between 10% and 80%, which is why public chargers usually stop being useful past 80%.",
    },
  ];

  const connectors = [
    {
      name: "J1772",
      type: "Level 1 and Level 2 AC charging",
      compatibility: "All North American EVs except older Teslas",
      teslaUse: "Tesla owners use a J1772 to Tesla adapter for these",
      detail: "The most common plug in North America for slow and medium-speed charging. You'll find J1772 connectors on most home wallboxes, condo chargers, and public Level 2 stations. The plug has 5 pins: 2 large pins for power, 1 ground, and 2 small communication pins.",
    },
    {
      name: "CCS1",
      type: "DC Fast Charging in North America",
      compatibility: "Most non-Tesla EVs sold after 2018",
      teslaUse: "Tesla offers a CCS1 adapter for newer Model 3 and Y vehicles",
      detail: "CCS stands for Combined Charging System. It looks like a J1772 plug with two extra large DC pins underneath. This was the dominant DC fast charging standard for non-Tesla EVs in North America. Used by Ford, GM, Hyundai, Kia, Volkswagen, BMW, and most other manufacturers.",
    },
    {
      name: "NACS / Tesla",
      type: "All levels including DC fast",
      compatibility: "Tesla vehicles, plus newer Ford, GM, Rivian, and others switching to NACS",
      teslaUse: "Native plug, no adapter needed",
      detail: "Tesla's connector, originally proprietary, is now becoming the new North American standard. It's smaller, lighter, and handles both AC and DC charging through the same pins. Ford, GM, Rivian, Polestar, Volvo, and others have committed to switching to NACS. By 2026, this is rapidly becoming the dominant standard.",
    },
    {
      name: "CHAdeMO",
      type: "DC Fast Charging, legacy standard",
      compatibility: "Older Nissan Leaf, Mitsubishi Outlander PHEV",
      teslaUse: "Not compatible with Tesla vehicles",
      detail: "An older Japanese DC fast charging standard. Most public charging networks are phasing out CHAdeMO connectors. If you drive an older Leaf, you can still find them, but availability is shrinking each year. New EVs almost never use CHAdeMO.",
    },
  ];

  const myths = [
    {
      myth: "Fast charging ruins my battery",
      reality: "Modern EVs have battery management systems specifically designed to handle DC fast charging. Occasional fast charging has minimal long-term impact. Using DC fast as your only charging method daily for years can accelerate wear, but using it once or twice a week is fine for most batteries.",
    },
    {
      myth: "I need to charge to 100% every time",
      reality: "Most EV manufacturers recommend keeping your daily charge between 20% and 80%. Charging to 100% regularly stresses the battery. It's fine for road trips, but not necessary for daily driving. Your battery will last longer if you treat 80% as your normal full.",
    },
    {
      myth: "Cold weather destroys range permanently",
      reality: "Range temporarily drops 20% to 40% in extreme cold but returns to normal when temperatures rise. Pre-conditioning your battery before charging or driving in winter helps significantly. The drop is from heating the cabin and slower battery chemistry, not permanent damage.",
    },
    {
      myth: "All chargers work with all EVs",
      reality: "Different cars use different plugs. Tesla used a proprietary plug for years. CCS1 is common for non-Teslas. CHAdeMO is being phased out. Knowing your car's connector type before pulling up to a public charger saves you a lot of frustration.",
    },
    {
      myth: "Charging at home is always the cheapest option",
      reality: "Usually yes, but not always. Toronto Hydro time-of-use rates make overnight charging significantly cheaper. But if you're on a flat rate plan or in a condo with high electricity costs, public chargers with off-peak pricing can sometimes match.",
    },
    {
      myth: "I should always charge to 100% before a long trip",
      reality: "Not necessarily. The last 20% takes nearly as long as the first 80% on a DC fast charger. For long trips, it's often faster to charge to 80%, drive, and stop for another quick charge rather than waiting at the same station to fill all the way up.",
    },
  ];

  const glossary = [
    { term: "kW (kilowatt)", def: "How fast a charger delivers power at any moment. Higher kW means faster charging speed." },
    { term: "kWh (kilowatt-hour)", def: "How much energy. Your battery's total capacity is measured in kWh. A 75 kWh battery filled by a 50 kW charger takes about 90 minutes from empty." },
    { term: "Range", def: "How many kilometers your EV can drive on a full charge. Affected by speed, weather, and how you drive." },
    { term: "State of Charge (SoC)", def: "Your battery's current charge level shown as a percentage. Most cars also show estimated range." },
    { term: "Charging curve", def: "EVs charge fastest from 20% to 80%. After 80%, the speed drops significantly to protect the battery. This is why you almost never wait for 100% at a public charger." },
    { term: "Pre-conditioning", def: "Warming or cooling the battery before fast charging or before a drive in extreme weather. Most modern EVs do this automatically when you navigate to a charger." },
    { term: "Onboard charger", def: "The hardware inside your EV that converts AC power to DC for the battery. Its size limits how fast Level 1 and Level 2 charging can go for your specific car." },
    { term: "Battery degradation", def: "The gradual loss of battery capacity over years of use. Most modern EVs lose 5% to 10% of capacity over 8 to 10 years." },
    { term: "DC vs AC charging", def: "Your battery stores DC power. Level 1 and Level 2 chargers deliver AC, which your car converts. DC fast chargers send DC directly to the battery, skipping the conversion." },
    { term: "Peak charging speed", def: "The maximum kW your car can accept. A 350 kW charger plugged into a car that maxes at 150 kW will still only charge at 150 kW." },
  ];

  const colorClasses = {
    rose: "border-rose-400/40 bg-rose-400/10 text-rose-300",
    amber: "border-amber-400/40 bg-amber-400/10 text-amber-300",
    emerald: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  };

  const colorBg = {
    rose: "bg-rose-400",
    amber: "bg-amber-400",
    emerald: "bg-emerald-400",
  };

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
        <section className="relative overflow-hidden px-6 py-20 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_25%,rgba(52,211,153,0.16),transparent_45%),radial-gradient(ellipse_at_85%_75%,rgba(56,189,248,0.09),transparent_45%)]" />
          <div className="relative mx-auto max-w-5xl">
            <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Chargers 101</p>
            <h1 className="mt-4 text-5xl font-black leading-[1.04] tracking-tight md:text-7xl" style={display}>
              Everything about EV chargers, without the jargon.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              EV charging can feel like a foreign language at first. We'll break it all down so you actually understand what's happening when you plug in.
            </p>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">The big three</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl" style={display}>
                Three speeds of EV charging.
              </h2>
              <p className="mt-3 max-w-xl text-slate-400 text-sm leading-7">
                Click any of them to see the full breakdown.
              </p>
            </div>

            <div className="mb-8 flex flex-wrap gap-3">
              {chargers.map((c, i) => (
                <button
                  key={c.level}
                  onClick={() => setActiveCharger(i)}
                  className={`rounded-full border px-5 py-2.5 text-sm font-bold transition-all ${
                    activeCharger === i
                      ? colorClasses[c.color] + " scale-105"
                      : "border-white/10 bg-white/[0.04] text-slate-400 hover:text-white"
                  }`}
                >
                  {c.level}
                </button>
              ))}
            </div>

            <div className={`rounded-3xl border-2 ${colorClasses[chargers[activeCharger].color]} p-8 md:p-12`}>
              <div className="grid gap-8 md:grid-cols-[1fr_1.5fr]">
                <div>
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${colorBg[chargers[activeCharger].color]} text-slate-950`}>
                    <Icon name={chargers[activeCharger].icon} className="h-8 w-8" />
                  </div>
                  <p className="mt-5 text-sm uppercase tracking-wider opacity-70">{chargers[activeCharger].tag}</p>
                  <h3 className="mt-2 text-4xl font-black" style={display}>{chargers[activeCharger].level}</h3>
                  <p className="mt-4 text-2xl font-bold opacity-90" style={display}>{chargers[activeCharger].power}</p>
                  <p className="text-sm opacity-70">{chargers[activeCharger].voltage}</p>
                  <p className="mt-6 text-sm leading-7 text-white/80">{chargers[activeCharger].depth}</p>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-slate-950/40 p-5">
                    <p className="text-xs uppercase tracking-wider opacity-70">Practical sweet spot</p>
                    <p className="mt-2 text-base font-bold text-white">{chargers[activeCharger].bestWattage}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-950/40 p-5">
                      <p className="text-xs uppercase tracking-wider opacity-70">Range per hour</p>
                      <p className="mt-2 text-base font-semibold text-white">{chargers[activeCharger].kmPerHour}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-950/40 p-5">
                      <p className="text-xs uppercase tracking-wider opacity-70">Full charge time</p>
                      <p className="mt-2 text-base font-semibold text-white">{chargers[activeCharger].fullChargeTime}</p>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-950/40 p-5">
                    <p className="text-xs uppercase tracking-wider opacity-70">Where you'll find it</p>
                    <p className="mt-2 text-sm font-semibold text-white">{chargers[activeCharger].where}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-950/40 p-5">
                    <p className="text-xs uppercase tracking-wider opacity-70">Cost per 100 km of range</p>
                    <p className="mt-2 text-sm font-semibold text-white">{chargers[activeCharger].costPer100km}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-950/40 p-5">
                    <p className="text-xs uppercase tracking-wider opacity-70">Energy efficiency</p>
                    <p className="mt-2 text-sm font-semibold text-white">{chargers[activeCharger].energy}</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-950/30 p-5 border border-emerald-400/20">
                    <p className="text-xs uppercase tracking-wider text-emerald-300">CO2 saved vs gas</p>
                    <p className="mt-2 text-sm font-semibold text-white">{chargers[activeCharger].co2Saved}</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-950/30 p-5 border border-emerald-400/20">
                    <p className="text-xs uppercase tracking-wider text-emerald-300">Best for</p>
                    <p className="mt-2 text-sm font-semibold text-white">{chargers[activeCharger].bestFor}</p>
                  </div>
                  <div className={`inline-flex rounded-full px-4 py-2 text-sm font-bold ${colorBg[chargers[activeCharger].color]} text-slate-950`}>
                    {chargers[activeCharger].verdict}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-slate-400">
              NowCharged uses <span className="text-emerald-300 font-semibold">DC Fast Charging</span> to get your car back to you quickly.
            </p>
          </div>
        </section>

        {/* Vehicle Lookup */}
        <section className="px-6 py-20 bg-gradient-to-b from-slate-950 to-slate-900">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10">
              <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Find your EV</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl" style={display}>
                Your car, your charger.
              </h2>
              <p className="mt-3 max-w-xl text-slate-400 text-sm leading-7">
                Type your EV's make or model below to see what charger it uses and what to expect from a charging session.
              </p>
            </div>

            <div className="relative mb-6">
              <input
                type="text"
                value={vehicleQuery}
                onChange={(e) => { setVehicleQuery(e.target.value); setSelectedVehicle(null); }}
                placeholder="Try 'Tesla Model Y' or 'Ioniq 5'..."
                className="w-full rounded-2xl border border-white/10 bg-slate-900 px-6 py-4 text-base text-white outline-none focus:border-emerald-400 transition-colors placeholder:text-slate-500"
              />
            </div>

            {vehicleQuery && !selectedVehicle && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] max-h-80 overflow-y-auto">
                {filteredVehicles.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-sm text-slate-400 mb-3">No match found for "{vehicleQuery}"</p>
                    <a
                      href={`mailto:info@nowcharged.com?subject=Vehicle Suggestion for NowCharged&body=Hi NowCharged team,%0D%0A%0D%0AI couldn't find my EV on your Chargers 101 page. Could you add it?%0D%0A%0D%0AVehicle: ${vehicleQuery}%0D%0AYear: %0D%0ATrim: %0D%0A%0D%0AThanks!`}
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-300 transition-colors"
                    >
                      Suggest this vehicle <Icon name="arrow" className="h-4 w-4" />
                    </a>
                  </div>
                ) : (
                  filteredVehicles.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => { setSelectedVehicle(v); setVehicleQuery(`${v.make} ${v.model}`); }}
                      className="w-full text-left px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.04] transition-colors"
                    >
                      <p className="font-bold text-white">{v.make} {v.model}</p>
                      <p className="text-xs text-slate-400 mt-1">{v.year} · {v.range} range · {v.connector}</p>
                    </button>
                  ))
                )}
              </div>
            )}

            {selectedVehicle && (
              <div className="rounded-3xl border-2 border-emerald-400/40 bg-emerald-400/5 p-8 md:p-10">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm text-emerald-300 uppercase tracking-wider">{selectedVehicle.year}</p>
                    <h3 className="mt-1 text-3xl font-black" style={display}>{selectedVehicle.make} {selectedVehicle.model}</h3>
                  </div>
                  <button
                    onClick={() => { setSelectedVehicle(null); setVehicleQuery(""); }}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Reset
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-950 p-5">
                    <p className="text-xs uppercase tracking-wider text-emerald-300">Connector type</p>
                    <p className="mt-2 text-lg font-bold text-white">{selectedVehicle.connector}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-950 p-5">
                    <p className="text-xs uppercase tracking-wider text-emerald-300">Battery capacity</p>
                    <p className="mt-2 text-lg font-bold text-white">{selectedVehicle.battery}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-950 p-5">
                    <p className="text-xs uppercase tracking-wider text-emerald-300">Official range</p>
                    <p className="mt-2 text-lg font-bold text-white">{selectedVehicle.range}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-950 p-5">
                    <p className="text-xs uppercase tracking-wider text-emerald-300">Peak DC fast charging</p>
                    <p className="mt-2 text-lg font-bold text-white">{selectedVehicle.peakDC}</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-950/40 border border-emerald-400/30 p-5">
                    <p className="text-xs uppercase tracking-wider text-emerald-300">DC fast charge time</p>
                    <p className="mt-2 text-lg font-bold text-white">{selectedVehicle.dcTime}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-950 p-5">
                    <p className="text-xs uppercase tracking-wider text-emerald-300">Level 2 home charging</p>
                    <p className="mt-2 text-lg font-bold text-white">{selectedVehicle.level2Time}</p>
                  </div>
                </div>

                <p className="mt-6 text-xs text-slate-400 leading-6">
                  Numbers are manufacturer estimates and can vary based on weather, charger speed, battery state, and driving conditions. Range is based on official WLTP or NRCan ratings.
                </p>
              </div>
            )}

            {/* Always-visible suggestion section */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
              <p className="text-sm text-slate-300 mb-3">
                Can't find your vehicle? We're always adding more.
              </p>
              <a
                href="mailto:info@nowcharged.com?subject=Vehicle Suggestion for NowCharged&body=Hi NowCharged team,%0D%0A%0D%0AI'd like to suggest adding the following EV to your Chargers 101 page:%0D%0A%0D%0AMake: %0D%0AModel: %0D%0AYear: %0D%0ATrim (if known): %0D%0A%0D%0AThanks!"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300 hover:text-emerald-200 underline underline-offset-4"
              >
                Leave us a suggestion <Icon name="arrow" className="h-4 w-4" />
              </a>
            </div>

            {!vehicleQuery && (
              <p className="text-center text-xs text-slate-500 mt-4">
                Showing data for {vehicles.length} popular EVs in Canada.
              </p>
            )}
          </div>
        </section>

        <section className="bg-slate-900 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Plug types</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl" style={display}>
                Which plug fits your car?
              </h2>
              <p className="mt-3 max-w-xl text-slate-400 text-sm leading-7">
                Different EVs use different plugs. Here's a visual reference.
              </p>
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
              {connectors.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setActiveConnector(i)}
                  className={`rounded-full border px-5 py-2.5 text-sm font-bold transition-all ${
                    activeConnector === i
                      ? "border-emerald-400 bg-emerald-400 text-slate-950"
                      : "border-white/10 bg-white/[0.04] text-slate-400 hover:text-white"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-12">
              <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-start">
                <div className="flex justify-center md:justify-start">
                  <PlugVisual type={connectors[activeConnector].name} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-emerald-300">{connectors[activeConnector].type}</p>
                  <h3 className="mt-2 text-3xl font-black" style={display}>{connectors[activeConnector].name}</h3>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl bg-slate-950 p-5">
                      <p className="text-xs uppercase tracking-wider text-slate-500">Compatible with</p>
                      <p className="mt-2 text-sm font-semibold text-white">{connectors[activeConnector].compatibility}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-950 p-5">
                      <p className="text-xs uppercase tracking-wider text-slate-500">Tesla owners</p>
                      <p className="mt-2 text-sm text-slate-300">{connectors[activeConnector].teslaUse}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-950 p-5">
                      <p className="text-xs uppercase tracking-wider text-slate-500">What you should know</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{connectors[activeConnector].detail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Myth busting</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl" style={display}>
                What people get wrong.
              </h2>
              <p className="mt-3 max-w-xl text-slate-400 text-sm leading-7">
                EV charging has more myths than facts floating around. Here are the most common ones.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {myths.map(m => (
                <div key={m.myth} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-400/20 text-rose-300">
                      <Icon name="x" className="h-4 w-4" />
                    </div>
                    <p className="font-bold text-rose-300" style={display}>Myth</p>
                  </div>
                  <p className="text-lg font-semibold mb-5" style={display}>"{m.myth}"</p>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
                      <Icon name="check" className="h-4 w-4" />
                    </div>
                    <p className="font-bold text-emerald-300" style={display}>Reality</p>
                  </div>
                  <p className="text-sm leading-7 text-slate-300">{m.reality}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12">
              <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">EV terms</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl" style={display}>
                Words you'll hear.
              </h2>
              <p className="mt-3 max-w-xl text-slate-400 text-sm leading-7">
                A real glossary, not a corporate one.
              </p>
            </div>

            <div className="space-y-4">
              {glossary.map(item => (
                <div key={item.term} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <p className="text-lg font-bold text-emerald-300" style={display}>{item.term}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.def}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-emerald-400 p-10 text-center text-slate-950 md:p-16">
            <h2 className="text-4xl font-black tracking-tight md:text-5xl" style={display}>
              Now that you know, let us handle the rest.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-800">
              We use DC fast chargers to get your EV back to you quickly. Skip the learning curve and skip the wait.
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
