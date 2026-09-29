/**
 * Ringspann freewheel data.
 *
 * Source: RINGSPANN catalogue 84 — "Freewheels: Backstops, Overrunning
 * Clutches, Indexing Freewheels", Bad Homburg. Figures below are the
 * printed catalogue values, transcribed as-is: nominal torque, max
 * freewheeling speed for each ring, standard bore, and the mounting
 * dimensions A / D / F / G / K / L / L1 / N / N1 / R / T / Z plus weight.
 *
 * Nothing here is rounded, smoothed or interpolated. Where a value is
 * absent from the catalogue it is `null`, not a guess.
 */

/** One size of the FGR … R A1A2 roller series (complete freewheel, flanged). */
export type RSize = {
  /** URL segment, e.g. `r35` */
  slug: string
  /** Short designation used in tables and headings, e.g. `R35` */
  code: string
  /** Full order code, e.g. `FGR 35 R A1A2` */
  order: string
  /** Catalogue nominal torque M_N [N·m] */
  torqueNm: number
  /** Max speed, inner ring freewheels/overruns [min⁻¹] */
  nInner: number
  /** Max speed, outer ring freewheels/overruns [min⁻¹] */
  nOuter: number
  /** Standard bore d [mm] */
  bore: number
  /** Flange outer diameter A [mm] */
  A: number
  /** Pilot / outer-ring diameter D [mm] */
  D: number
  /** Flat F [mm] */
  F: number
  /** Fastening thread G */
  G: string
  /** K [mm] */
  K: number
  /** Total length L (flange A1) [mm] */
  L: number
  /** Total length L1 (flange A7) [mm] */
  L1: number
  /** Distance N [mm] */
  N: number
  /** Distance N1 [mm] */
  N1: number
  /** Pilot diameter R (flange A7) [mm] */
  R: number
  /** Pitch circle T [mm] */
  T: number
  /** Number of fastening holes Z */
  Z: number
  /** Weight [kg] */
  weight: number
  /** Matching sprag version FGR … SF, where the catalogue prints one */
  sprag: {
    torqueNm: number
    nInner: number
    nOuter: number
  } | null
}

export const R_SERIES: RSize[] = [
  {
    slug: 'r12',
    code: 'R12',
    order: 'FGR 12 R A1A2',
    torqueNm: 55,
    nInner: 2500,
    nOuter: 5400,
    bore: 12,
    A: 85,
    D: 62,
    F: 1,
    G: 'M5',
    K: 3,
    L: 42,
    L1: 44,
    N: 10,
    N1: 10,
    R: 42,
    T: 72,
    Z: 3,
    weight: 1.2,
    sprag: null,
  },
  {
    slug: 'r15',
    code: 'R15',
    order: 'FGR 15 R A1A2',
    torqueNm: 130,
    nInner: 2200,
    nOuter: 4800,
    bore: 15,
    A: 92,
    D: 68,
    F: 1,
    G: 'M5',
    K: 3,
    L: 52,
    L1: 54,
    N: 11,
    N1: 11,
    R: 47,
    T: 78,
    Z: 3,
    weight: 1.6,
    sprag: null,
  },
  {
    slug: 'r20',
    code: 'R20',
    order: 'FGR 20 R A1A2',
    torqueNm: 180,
    nInner: 1900,
    nOuter: 4100,
    bore: 20,
    A: 98,
    D: 75,
    F: 1,
    G: 'M5',
    K: 3,
    L: 57,
    L1: 59,
    N: 10.5,
    N1: 10.5,
    R: 55,
    T: 85,
    Z: 4,
    weight: 1.9,
    sprag: { torqueNm: 200, nInner: 2500, nOuter: 2600 },
  },
  {
    slug: 'r25',
    code: 'R25',
    order: 'FGR 25 R A1A2',
    torqueNm: 290,
    nInner: 1550,
    nOuter: 3350,
    bore: 25,
    A: 118,
    D: 90,
    F: 1,
    G: 'M6',
    K: 3,
    L: 60,
    L1: 62,
    N: 11.5,
    N1: 11.5,
    R: 68,
    T: 104,
    Z: 4,
    weight: 2.9,
    sprag: { torqueNm: 320, nInner: 1650, nOuter: 2000 },
  },
  {
    slug: 'r30',
    code: 'R30',
    order: 'FGR 30 R A1A2',
    torqueNm: 500,
    nInner: 1400,
    nOuter: 3050,
    bore: 30,
    A: 128,
    D: 100,
    F: 1,
    G: 'M6',
    K: 3,
    L: 68,
    L1: 70,
    N: 11.5,
    N1: 11.5,
    R: 75,
    T: 114,
    Z: 6,
    weight: 3.9,
    sprag: { torqueNm: 630, nInner: 1400, nOuter: 1750 },
  },
  {
    slug: 'r35',
    code: 'R35',
    order: 'FGR 35 R A1A2',
    torqueNm: 730,
    nInner: 1300,
    nOuter: 2850,
    bore: 35,
    A: 140,
    D: 110,
    F: 1,
    G: 'M6',
    K: 3.5,
    L: 74,
    L1: 76,
    N: 13.5,
    N1: 13,
    R: 80,
    T: 124,
    Z: 6,
    weight: 4.9,
    sprag: { torqueNm: 730, nInner: 1250, nOuter: 1700 },
  },
  {
    slug: 'r40',
    code: 'R40',
    order: 'FGR 40 R A1A2',
    torqueNm: 1000,
    nInner: 1150,
    nOuter: 2500,
    bore: 40,
    A: 160,
    D: 125,
    F: 1,
    G: 'M8',
    K: 3.5,
    L: 86,
    L1: 88,
    N: 15.5,
    N1: 15,
    R: 90,
    T: 142,
    Z: 6,
    weight: 7.5,
    sprag: { torqueNm: 1250, nInner: 1170, nOuter: 1650 },
  },
  {
    slug: 'r45',
    code: 'R45',
    order: 'FGR 45 R A1A2',
    torqueNm: 1150,
    nInner: 1100,
    nOuter: 2400,
    bore: 45,
    A: 165,
    D: 130,
    F: 1,
    G: 'M8',
    K: 3.5,
    L: 86,
    L1: 88,
    N: 15.5,
    N1: 15,
    R: 95,
    T: 146,
    Z: 8,
    weight: 7.8,
    sprag: { torqueNm: 1650, nInner: 1120, nOuter: 1600 },
  },
  {
    slug: 'r50',
    code: 'R50',
    order: 'FGR 50 R A1A2',
    torqueNm: 2100,
    nInner: 950,
    nOuter: 2050,
    bore: 50,
    A: 185,
    D: 150,
    F: 1,
    G: 'M8',
    K: 4,
    L: 94,
    L1: 96,
    N: 14,
    N1: 13,
    R: 110,
    T: 166,
    Z: 8,
    weight: 10.8,
    sprag: { torqueNm: 2150, nInner: 1025, nOuter: 1450 },
  },
  {
    slug: 'r55',
    code: 'R55',
    order: 'FGR 55 R A1A2',
    torqueNm: 2600,
    nInner: 900,
    nOuter: 1900,
    bore: 55,
    A: 204,
    D: 160,
    F: 1,
    G: 'M10',
    K: 4,
    L: 104,
    L1: 106,
    N: 18,
    N1: 17,
    R: 115,
    T: 182,
    Z: 8,
    weight: 14,
    sprag: null,
  },
  {
    slug: 'r60',
    code: 'R60',
    order: 'FGR 60 R A1A2',
    torqueNm: 3500,
    nInner: 800,
    nOuter: 1800,
    bore: 60,
    A: 214,
    D: 170,
    F: 1,
    G: 'M10',
    K: 4,
    L: 114,
    L1: 116,
    N: 17,
    N1: 16,
    R: 125,
    T: 192,
    Z: 10,
    weight: 16.8,
    sprag: null,
  },
  {
    slug: 'r70',
    code: 'R70',
    order: 'FGR 70 R A1A2',
    torqueNm: 6000,
    nInner: 700,
    nOuter: 1600,
    bore: 70,
    A: 234,
    D: 190,
    F: 1,
    G: 'M10',
    K: 4,
    L: 134,
    L1: 136,
    N: 18.5,
    N1: 17.5,
    R: 140,
    T: 212,
    Z: 10,
    weight: 20.8,
    sprag: null,
  },
  {
    slug: 'r80',
    code: 'R80',
    order: 'FGR 80 R A1A2',
    torqueNm: 6800,
    nInner: 600,
    nOuter: 1400,
    bore: 80,
    A: 254,
    D: 210,
    F: 1,
    G: 'M10',
    K: 4,
    L: 144,
    L1: 146,
    N: 21,
    N1: 20,
    R: 160,
    T: 232,
    Z: 10,
    weight: 27,
    sprag: null,
  },
  {
    slug: 'r90',
    code: 'R90',
    order: 'FGR 90 R A1A2',
    torqueNm: 11000,
    nInner: 500,
    nOuter: 1300,
    bore: 90,
    A: 278,
    D: 230,
    F: 1,
    G: 'M12',
    K: 4.5,
    L: 158,
    L1: 160,
    N: 20.5,
    N1: 19,
    R: 180,
    T: 254,
    Z: 10,
    weight: 40,
    sprag: null,
  },
  {
    slug: 'r100',
    code: 'R100',
    order: 'FGR 100 R A1A2',
    torqueNm: 20000,
    nInner: 350,
    nOuter: 1100,
    bore: 100,
    A: 335,
    D: 270,
    F: 1,
    G: 'M16',
    K: 5,
    L: 182,
    L1: 184,
    N: 30,
    N1: 28,
    R: 210,
    T: 305,
    Z: 10,
    weight: 67,
    sprag: null,
  },
  {
    slug: 'r130',
    code: 'R130',
    order: 'FGR 130 R A1A2',
    torqueNm: 31000,
    nInner: 250,
    nOuter: 900,
    bore: 130,
    A: 380,
    D: 310,
    F: 1,
    G: 'M16',
    K: 5,
    L: 212,
    L1: 214,
    N: 29,
    N1: 27,
    R: 240,
    T: 345,
    Z: 12,
    weight: 94,
    sprag: null,
  },
  {
    slug: 'r150',
    code: 'R150',
    order: 'FGR 150 R A1A2',
    torqueNm: 68000,
    nInner: 200,
    nOuter: 700,
    bore: 150,
    A: 485,
    D: 400,
    F: 1,
    G: 'M20',
    K: 5,
    L: 246,
    L1: 248,
    N: 32,
    N1: 30,
    R: 310,
    T: 445,
    Z: 12,
    weight: 187,
    sprag: null,
  },
]

/**
 * The twelve sizes the catalogue lists from R35 upward. These are the
 * workhorses: the ones that show up on textile drives, furnace roller
 * beds and mining conveyors, and the ones the homepage table leads with.
 */
export const R_SERIES_MAIN = R_SERIES.filter((s) => s.bore >= 35)

export const getRSize = (slug: string) => R_SERIES.find((s) => s.slug === slug)

/** Catalogue constants quoted verbatim wherever selection is discussed. */
export const R_NOTES = {
  maxTransmissibleFactor: 2,
  shaftTolerance: 'ISO h6 یا j6',
  pilotTolerance: 'ISO H7 یا J7',
  keyway: 'DIN 6885 صفحهٔ ۱، عرض کلید با تلورانس JS10',
  lubrication: 'روغنی — پیش از راه‌اندازی با روغن ذکرشده پر می‌شود',
  freewheelDirection: 'جهت آزادچرخش حلقهٔ داخلی از سمت X — پادساعت‌گرد یا ساعت‌گرد',
}

/**
 * BD … R — roller freewheels bolted face-on to the customer part.
 * Kept for the comparison article; same catalogue, different mount.
 */
export type BdSize = {
  code: string
  torqueNm: number
  nInner: number
  nOuter: number
  bores: number[]
  D: number
  R: number
  L: number
  weight: number
}

export const BD_R_SERIES: BdSize[] = [
  { code: 'BD 12 R', torqueNm: 150, nInner: 1750, nOuter: 3500, bores: [15], D: 71, R: 45, L: 68, weight: 1.5 },
  { code: 'BD 15 R', torqueNm: 230, nInner: 1650, nOuter: 3300, bores: [20], D: 81, R: 50, L: 70, weight: 2 },
  { code: 'BD 18 R', torqueNm: 340, nInner: 1550, nOuter: 3100, bores: [25], D: 96, R: 60, L: 70, weight: 2.9 },
  { code: 'BD 20 R', torqueNm: 420, nInner: 1450, nOuter: 2900, bores: [30], D: 106, R: 70, L: 77, weight: 3.8 },
  { code: 'BD 25 R', torqueNm: 800, nInner: 1250, nOuter: 2500, bores: [35, 40], D: 126, R: 80, L: 93, weight: 6.6 },
  { code: 'BD 28 R', torqueNm: 1200, nInner: 1100, nOuter: 2200, bores: [35, 40, 45], D: 136, R: 90, L: 95, weight: 7.8 },
  { code: 'BD 30 R', torqueNm: 1600, nInner: 1000, nOuter: 2000, bores: [45, 50], D: 151, R: 100, L: 102, weight: 10.3 },
  { code: 'BD 35 R', torqueNm: 1800, nInner: 900, nOuter: 1800, bores: [50, 55], D: 161, R: 110, L: 110, weight: 12.5 },
  { code: 'BD 40 R', torqueNm: 3500, nInner: 800, nOuter: 1600, bores: [45, 55, 60], D: 181, R: 120, L: 116, weight: 17.4 },
  { code: 'BD 45 R', torqueNm: 7100, nInner: 750, nOuter: 1500, bores: [55, 65, 70], D: 196, R: 130, L: 130, weight: 22.4 },
  { code: 'BD 50 R', torqueNm: 7500, nInner: 700, nOuter: 1400, bores: [70, 75], D: 206, R: 140, L: 132, weight: 24.2 },
  { code: 'BD 52 R', torqueNm: 9300, nInner: 650, nOuter: 1300, bores: [65, 75, 80], D: 216, R: 150, L: 150, weight: 31.1 },
  { code: 'BD 55 R', torqueNm: 12500, nInner: 550, nOuter: 1100, bores: [75, 85, 90], D: 246, R: 160, L: 170, weight: 45.6 },
  { code: 'BD 60 R', torqueNm: 14500, nInner: 500, nOuter: 1000, bores: [85, 95, 100, 105], D: 291, R: 190, L: 206, weight: 78.2 },
  { code: 'BD 70 R', torqueNm: 22500, nInner: 425, nOuter: 850, bores: [120], D: 321, R: 210, L: 215, weight: 93.4 },
  { code: 'BD 80 R', torqueNm: 25000, nInner: 375, nOuter: 750, bores: [130], D: 351, R: 220, L: 224, weight: 116.8 },
  { code: 'BD 90 R', torqueNm: 35500, nInner: 350, nOuter: 700, bores: [140], D: 371, R: 240, L: 236, weight: 136.7 },
  { code: 'BD 95 R', torqueNm: 35000, nInner: 300, nOuter: 600, bores: [150], D: 391, R: 250, L: 249, weight: 159.3 },
  { code: 'BD 100 R', torqueNm: 57500, nInner: 250, nOuter: 500, bores: [150], D: 411, R: 270, L: 276, weight: 198.4 },
]
