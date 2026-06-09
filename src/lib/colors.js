// Colour tokens for charts, mirroring the official report (code/functions.R).
// Keeping these in one place keeps every chart on-brand and consistent.

export const HERTIE_RED = '#aa2229';
export const HERTIE_RED_DARK = '#852226';

// Programme palette — exactly the report's `hertie_cols_4` mapping.
export const PROGRAMME_COLORS = {
	MPP: '#aa2229',
	MIA: '#d4555f',
	MDS: '#9cc8dc',
	EMPA: '#6b9bb3'
};

export const PROGRAMME_ORDER = ['MPP', 'MIA', 'MDS', 'EMPA'];

// Cohort palette — three warm-to-cool steps, distinct from programmes.
export const COHORT_COLORS = {
	'2007-2016': '#852226',
	'2017-2022': '#c77f54',
	'2023-2024': '#6b9bb3'
};

export const COHORT_ORDER = ['2007-2016', '2017-2022', '2023-2024'];

// Diverging Likert scales: negative (red) → neutral (grey) → positive (blue).
// Matches the report's hertie_cols_5 / hertie_cols_6.
export const LIKERT_5 = ['#852226', '#d4555f', '#d2d2d2', '#9cc8dc', '#567a8c'];
export const LIKERT_6 = ['#852226', '#992f36', '#d4555f', '#9cc8dc', '#6b9bb3', '#567a8c'];

// Two- and three-step scales (yes/no, no-neutral-yes).
export const SCALE_2 = ['#aa2229', '#6b9bb3'];
export const SCALE_3 = ['#aa2229', '#d2d2d2', '#6b9bb3'];

// Sequential blues for ordered magnitude scales (salary, counts).
export const BLUES = [
	'#ece7f2',
	'#d0d1e6',
	'#a6bddb',
	'#74a9cf',
	'#3690c0',
	'#0570b0',
	'#045a8d',
	'#023858'
];

// Four sectors (public / private / third / education).
export const SECTOR_COLORS = ['#aa2229', '#d4555f', '#9cc8dc', '#6b9bb3'];

/** Pick a diverging Likert palette sized to the number of categories. */
export function likertScale(n) {
	if (n <= 2) return SCALE_2;
	if (n === 3) return SCALE_3;
	if (n === 5) return LIKERT_5;
	if (n === 6) return LIKERT_6;
	// interpolate endpoints for other sizes by sampling LIKERT_6
	const src = LIKERT_6;
	return Array.from({ length: n }, (_, i) =>
		src[Math.round((i / (n - 1)) * (src.length - 1))]
	);
}

/** Choose readable text colour (white/dark) for a given segment fill. */
export function labelColor(hex) {
	const c = hex.replace('#', '');
	const r = parseInt(c.slice(0, 2), 16);
	const g = parseInt(c.slice(2, 4), 16);
	const b = parseInt(c.slice(4, 6), 16);
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
	return luminance > 0.62 ? '#1c1b1a' : '#ffffff';
}

export const programmeColor = (p) => PROGRAMME_COLORS[p] ?? '#999';

// Pretty euro salary-band labels (kept here so the JSON stays ASCII-safe).
export const SALARY_LABELS = ['< €20k', '€20–40k', '€40–60k', '€60–80k', '€80k+'];
