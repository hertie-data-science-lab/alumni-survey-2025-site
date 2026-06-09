<script>
	import education from '$lib/data/education.json';
	import Section from '$lib/components/Section.svelte';
	import Figure from '$lib/components/Figure.svelte';
	import DivergingFigure from '$lib/components/DivergingFigure.svelte';
	import RankedBars from '$lib/components/charts/RankedBars.svelte';
	import KeyFigure from '$lib/components/KeyFigure.svelte';
	import Takeaway from '$lib/components/Takeaway.svelte';
	import { PROGRAMME_COLORS } from '$lib/colors.js';

	const chooseItems = [...education.choose_again]
		.sort((a, b) => b.likely - a.likely)
		.map((d) => ({
			label: d.label === 'Hertie School' ? 'The Hertie School (overall)' : d.label,
			value: d.likely,
			color: PROGRAMME_COLORS[d.label] ?? 'var(--ink)'
		}));

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

	<Figure
		title="Most would choose the Hertie School again"
		subtitle="Share saying they are (rather or very) likely to choose it again"
		n={education.choose_again[0].n}
		note="EMPA graduates are most likely to choose their programme again; MIA and MDS least."
	>
		<RankedBars items={chooseItems} suffix="%" marginLeft={190} rowHeight={40} />
	</Figure>

	<Takeaway>
		<p>
			Hertie's teaching and its policy-and-practice orientation are its standout strengths —
			and recognisable courses leave a lasting mark on how alumni remember their studies.
		</p>
	</Takeaway>
</Section>
