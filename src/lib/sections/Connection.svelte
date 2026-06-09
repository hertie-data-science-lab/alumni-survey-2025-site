<script>
	import connection from '$lib/data/connection.json';
	import Section from '$lib/components/Section.svelte';
	import Figure from '$lib/components/Figure.svelte';
	import DivergingFigure from '$lib/components/DivergingFigure.svelte';
	import RankedBars from '$lib/components/charts/RankedBars.svelte';
	import KeyFigure from '$lib/components/KeyFigure.svelte';
	import Takeaway from '$lib/components/Takeaway.svelte';

	const communityItems = connection.community.map((c) => ({ label: c.label, value: c.pct }));
</script>

<Section id="connection" num="02" kicker="Connection" title="A lasting bond with the School" tone="warm">
	{#snippet lead()}
		<p>
			Years after graduation, alumni remain warmly attached to the Hertie School. Almost everyone
			looks back positively, and most still feel part of the community — a reservoir of goodwill
			the School can build on.
		</p>
	{/snippet}

	<div class="cols-2">
		<div class="aside-prose">
			<KeyFigure value={connection.perception.groups[0].positive} unit="%" label="rate their view of the Hertie School 6 or higher on a 0–10 scale" />
			<p>
				Asked how they feel about the Hertie School today, on a scale from 0 (not positive at
				all) to 10 (very positive), <strong>93%</strong> answered 6 or higher and two-thirds
				gave an 8, 9 or 10. EMPA graduates are the most enthusiastic; the small MDS group is the
				most critical — though more recent internal evaluations suggest that has since improved.
			</p>
		</div>
		<DivergingFigure
			title="Nearly all alumni view the School positively"
			subtitle="“How positive is your view of the Hertie School?” (0–10)"
			data={connection.perception}
			legendLabels={['0–1 · not positive', '2–3', '4–5', '6–7', '8–9', '10 · very positive']}
			threshold={6}
		/>
	</div>

	<div class="cols-2">
		<DivergingFigure
			title="Most feel they belong to the alumni community"
			subtitle="“I feel a sense of belonging to the Hertie alumni community.”"
			data={connection.belonging}
			legendLabels={['Strongly disagree', 'Disagree', 'Neither', 'Agree', 'Strongly agree']}
		/>
		<div class="aside-prose">
			<KeyFigure value={connection.belonging.groups[0].positive} unit="%" label="agree they belong to the Hertie alumni community" tone="blue" />
			<p>
				A sense of belonging is widely shared, though it dips slightly among the most recent
				graduates — a reminder that the first years after leaving are a decisive moment for
				keeping alumni close.
			</p>
		</div>
	</div>

	<Figure
		title="The bonds are personal as much as professional"
		subtitle="Share of alumni who agree with each statement"
		n={connection.community[0].n}
	>
		<RankedBars items={communityItems} suffix="%" marginLeft={260} color="var(--prog-empa)" />
	</Figure>

	<Takeaway>
		<p>
			The connections forged at Hertie outlast the degree itself — and many alumni say they would
			welcome more chances to stay involved.
		</p>
	</Takeaway>
</Section>
