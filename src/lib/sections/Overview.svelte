<script>
	import meta from '$lib/data/meta.json';
	import Section from '$lib/components/Section.svelte';
	import Figure from '$lib/components/Figure.svelte';
	import RankedBars from '$lib/components/charts/RankedBars.svelte';
	import LineTrend from '$lib/components/charts/LineTrend.svelte';
	import { PROGRAMME_COLORS } from '$lib/colors.js';

	const progItems = meta.programmes.map((p) => ({
		label: p.code,
		value: p.pct,
		color: PROGRAMME_COLORS[p.code] ?? 'var(--ink-faint)'
	}));
	// Germany is the headline (56%); show the next most common countries so the
	// international spread is legible rather than dwarfed by the German bar.
	const countryItems = meta.residence_top.filter((c) => c.country !== 'Germany').map((c) => ({ label: c.country, value: c.n }));
	const cohort = Object.fromEntries(meta.cohorts.map((c) => [c.label, c]));
	const gender = Object.fromEntries(meta.gender.map((g) => [g.label, g]));
</script>

<Section id="overview" num="01" kicker="Who responded" title="A portrait of the respondents">
	{#snippet lead()}
		<p>
			The Hertie School counts roughly <strong>3,200 alumni</strong> in around 120 countries. This
			survey reached {meta.n_respondents} of them — the broadest alumni feedback the School has
			ever gathered, spanning every degree programme and every graduating class since 2007.
		</p>
		<p>
			It is not a census, and respondents were not drawn at random, so the figures are best read
			as <em>directional</em> rather than exact. Throughout, results are shown for all alumni and,
			where the numbers allow, broken down by programme and by graduation cohort.
		</p>
	{/snippet}

	<Figure
		title="Participation has grown with each graduating class"
		subtitle="Number of respondents by graduation year and programme"
		note="MDS launched only recently, so it appears in the most recent years."
	>
		<LineTrend data={meta.prog_year} />
	</Figure>

	<div class="cols-2">
		<Figure
			title="Two in three respondents are MPP graduates"
			subtitle="Share of respondents by programme"
			note="Roughly mirrors the actual alumni population."
		>
			<RankedBars items={progItems} suffix="%" marginLeft={64} rowHeight={36} />
		</Figure>

		<Figure
			title="Beyond Germany, alumni span the globe"
			subtitle="Respondents by country of residence, excluding Germany (number of respondents)"
			note="{meta.headline.germany}% live in Germany; the countries above are the next most common."
		>
			<RankedBars items={countryItems} suffix="" marginLeft={120} rowHeight={28} color="var(--blue)" />
		</Figure>
	</div>

	<div class="statstrip">
		<div><strong class="big tnum">{gender['Male']?.pct}/{gender['Female']?.pct}</strong><span>% male / female; the rest preferred not to say</span></div>
		<div><strong class="big tnum">{meta.headline.germany}%</strong><span>live in Germany, with alumni on every continent</span></div>
		<div><strong class="big tnum">{meta.reside_in_birth_country}%</strong><span>now live in their country of birth</span></div>
		<div><strong class="big tnum">{cohort['2007-2016']?.pct}/{cohort['2017-2022']?.pct}/{cohort['2023-2024']?.pct}</strong><span>% split across early, mid and recent cohorts</span></div>
	</div>
</Section>

<style>
	.statstrip div {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}
	.statstrip .big {
		font-family: var(--font-display);
		font-size: 2rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: var(--ink);
		line-height: 1;
	}
	.statstrip span {
		font-size: 0.86rem;
		color: var(--ink-muted);
		line-height: 1.35;
	}
</style>
