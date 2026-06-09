<script>
	import education from '$lib/data/education.json';
	import Section from '$lib/components/Section.svelte';
	import Figure from '$lib/components/Figure.svelte';
	import DivergingFigure from '$lib/components/DivergingFigure.svelte';
	import RankedBars from '$lib/components/charts/RankedBars.svelte';
	import KeyFigure from '$lib/components/KeyFigure.svelte';
	import Takeaway from '$lib/components/Takeaway.svelte';
	import { PROGRAMME_COLORS } from '$lib/colors.js';

	// Programmes ranked highest-first, with the overall Hertie School bar pinned
	// to the bottom of the chart.
	const chooseProgs = education.choose_again
		.filter((d) => d.label !== 'Hertie School')
		.sort((a, b) => b.likely - a.likely)
		.map((d) => ({ label: d.label, value: d.likely, color: PROGRAMME_COLORS[d.label] ?? 'var(--ink)' }));
	const chooseHertie = education.choose_again.find((d) => d.label === 'Hertie School');
	const chooseItems = [
		...chooseProgs,
		{ label: 'The Hertie School (overall)', value: chooseHertie.likely, color: 'var(--ink)' }
	];

	const teaching = education.aspects.find((a) => a.aspect.toLowerCase().includes('teaching'));
	const teachingItems = teaching.values
		.filter((v) => v.mean != null)
		.sort((a, b) => b.mean - a.mean)
		.map((v) => ({ label: v.programme, value: Math.round(v.mean * 10) / 10, color: PROGRAMME_COLORS[v.programme] }));

</script>

<Section id="education" num="03" kicker="Education" title="The Hertie experience">
	{#snippet lead()}
		<p>
			Overall satisfaction with a Hertie education is high — and durable. Nine in ten alumni say
			they were satisfied with their studies, and most would enrol again. Satisfaction does vary
			by programme, a signal the School uses to keep improving.
		</p>
	{/snippet}

	<div class="cols-2">
		<DivergingFigure
			title="Nine in ten are satisfied with their studies"
			subtitle="Satisfaction with studies at the Hertie School (0–10)"
			data={education.satisfaction}
			legendLabels={['0–1 · very low', '2–3', '4–5', '6–7', '8–9', '10 · very high']}
			threshold={6}
		/>
		<div class="aside-prose">
			<KeyFigure value={education.satisfaction.groups[0].positive} unit="%" label="rate satisfaction with their studies 6 or higher on a 0–10 scale" />
			<p>
				Satisfaction is strongest among MPP and EMPA graduates. MIA and the small MDS group are
				somewhat less satisfied — differences the School's annual programme evaluations are
				already working to close.
			</p>
			<p>
				Asked specifically about the quality of teaching, alumni give an average of
				<strong>{teachingItems.length ? (teachingItems.reduce((s, d) => s + d.value, 0) / teachingItems.length).toFixed(1) : ''} out of 5</strong>.
			</p>
		</div>
	</div>

	<div class="cols-2">
		<div class="aside-prose">
			<p>
				Looked at the other way, very few alumni would rule the Hertie School out. Counting
				everyone who rates their odds at 50/50 or better, the large majority would consider
				choosing it again — and at the overall level <strong>{education.choose_again.find((d) => d.label === 'Hertie School')?.likely}%</strong>
				would. Enthusiasm runs highest among EMPA and MPP graduates, while MIA and MDS alumni
				are more measured.
			</p>
		</div>
		<Figure
			title="Most would choose the Hertie School again"
			subtitle="Share at least 50/50 likely to choose it again"
			n={education.choose_again[0].n}
		>
			<RankedBars items={chooseItems} suffix="%" marginLeft={190} rowHeight={40} />
		</Figure>
	</div>

	<Takeaway>
		<p>
			Hertie's teaching and its policy-and-practice orientation are its standout strengths —
			and recognisable courses leave a lasting mark on how alumni remember their studies.
		</p>
	</Takeaway>
</Section>
