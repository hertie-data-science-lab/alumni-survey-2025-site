<script>
	import career from '$lib/data/career.json';
	import Section from '$lib/components/Section.svelte';
	import Figure from '$lib/components/Figure.svelte';
	import DivergingFigure from '$lib/components/DivergingFigure.svelte';
	import RankedBars from '$lib/components/charts/RankedBars.svelte';
	import SectorDonuts from '$lib/components/charts/SectorDonuts.svelte';
	import Dumbbell from '$lib/components/charts/Dumbbell.svelte';
	import KeyFigure from '$lib/components/KeyFigure.svelte';
	import Takeaway from '$lib/components/Takeaway.svelte';
	import { SECTOR_COLORS, PROGRAMME_ORDER } from '$lib/colors.js';

	const employmentItems = career.employment.levels
		.map((l, i) => ({ label: l, value: career.employment.pct[i] }))
		.filter((d) => d.value > 0)
		.sort((a, b) => b.value - a.value);

	// Limited to 2023/24 graduates so programmes are comparable: mixing cohorts
	// confounds pay with seniority (e.g. EMPA students are already mid-career).
	const salaryRows = PROGRAMME_ORDER.map((p) => ({
		group: p,
		first: career.salary_mean.recent.first[p],
		current: career.salary_mean.recent.current[p]
	}));

	const foundItems = career.found.current.items.map((d) => ({ label: d.label, value: d.pct }));
	const hiringItems = career.hiring.map((d) => ({ label: d.label, value: d.pct }));

	const sl = career.search_length.groups[0];
	const within3 = sl.pct[0] + sl.pct[1];
	const hertieDegreeImportant = career.hiring.find((d) => d.label.includes('Hertie'))?.pct;
</script>

<Section id="careers" num="04" kicker="Careers" title="Into the working world" tone="warm">
	{#snippet lead()}
		<p>
			A Hertie degree opens doors across the public, private and non-profit worlds. The vast
			majority of alumni are employed, most full-time, and most are satisfied with where they have
			landed. Salaries climb steadily as careers progress.
		</p>
	{/snippet}

	<div class="cols-2">
		<Figure
			title="Around nine in ten are working"
			subtitle="Current employment status, all alumni"
			n={career.employment.n}
		>
			<RankedBars items={employmentItems} suffix="%" marginLeft={140} rowHeight={32} />
		</Figure>
		<div class="aside-prose">
			<KeyFigure value={career.employment.pct[0] + career.employment.pct[1] + career.employment.pct[2] + career.employment.pct[4]} unit="%" label="are in full-time, part-time, self- or internship employment" />
			<p>
				Roughly three-quarters work full-time. A small share — around one in fifteen — report
				being unemployed and seeking work, a group the School aims to reach with continued career
				support.
			</p>
		</div>
	</div>

	<div class="cols-2">
		<Figure title="Alumni work across every sector" subtitle="Sector of current employment, by programme">
			<SectorDonuts
				groups={career.sector_current.groups.filter((g) => g.group !== 'All alumni')}
				levels={career.sector_current.levels}
				colors={SECTOR_COLORS}
			/>
		</Figure>
		<div class="aside-prose">
			<p>
				Hertie graduates work across all four sectors, but each programme leans toward its
				focus. EMPA alumni cluster in the public sector and MIA graduates lean private, while
				MPP and MDS graduates are spread most evenly across the four.
			</p>
		</div>
	</div>

	<div class="cols-2">
		<Figure
			title="First-job and current-job pay, recent graduates"
			subtitle="2023–24 cohorts · average yearly gross salary (€000s)"
		>
			<Dumbbell data={salaryRows} />
		</Figure>
		<div class="aside-prose">
			<p>
				Limiting the comparison to the most recent graduates keeps time in the labour market
				roughly equal across programmes. Even within a year or two, pay already climbs from the
				first job to the current one. EMPA alumni — often already mid-career — earn the most,
				while MDS graduates start ahead of their MPP and MIA peers. These recent-cohort groups
				are small, so the figures are best read as indicative.
			</p>
		</div>
	</div>

	<div class="cols-2">
		<DivergingFigure
			title="Most are satisfied with their current job"
			subtitle="Satisfaction with the position they have reached"
			data={career.job_satisfaction}
			legendLabels={['Very dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very satisfied']}
		/>
		<div class="aside-prose">
			<KeyFigure value={career.job_satisfaction.groups[0].positive} unit="%" label="are satisfied or very satisfied with their current job" tone="blue" />
			<p>
				Job satisfaction is highest among EMPA and MPP graduates and among earlier cohorts, who
				have had more time to settle into senior roles. And the search itself is often short:
				about <strong>{within3}%</strong> found their first job within three months of graduating.
			</p>
		</div>
	</div>

	<div class="cols-2">
		<Figure
			title="How alumni found their current job"
			subtitle="% naming each channel"
			n={career.found.current.n}
		>
			<RankedBars items={foundItems} suffix="%" marginLeft={210} rowHeight={42} color="var(--prog-empa)" wrap />
		</Figure>
		<Figure
			title="What mattered for getting hired"
			subtitle="Share rating each factor important for their first job"
			n={career.job_satisfaction.groups[0].n}
		>
			<RankedBars items={hiringItems} suffix="%" marginLeft={230} rowHeight={28} color="var(--red)" />
		</Figure>
	</div>

	<Takeaway>
		<p>
			Strong employment, competitive and rising salaries, and a degree that {hertieDegreeImportant}%
			call important for landing their first job: by the measures that matter to graduates, a
			Hertie education pays off.
		</p>
	</Takeaway>
</Section>
