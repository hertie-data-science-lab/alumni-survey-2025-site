<script>
	import engagement from '$lib/data/engagement.json';
	import Section from '$lib/components/Section.svelte';
	import Figure from '$lib/components/Figure.svelte';
	import RankedBars from '$lib/components/charts/RankedBars.svelte';
	import KeyFigure from '$lib/components/KeyFigure.svelte';
	import Takeaway from '$lib/components/Takeaway.svelte';

	const activityItems = engagement.activities.map((a) => ({ label: a.label, value: a.active }));
	const benefitItems = engagement.benefits.map((b) => ({ label: b.label, value: b.pct }));
	const barrierItems = engagement.barriers.map((b) => ({ label: b.label, value: b.pct }));
	const ch = Object.fromEntries(engagement.channels.map((c) => [c.label, c.pct]));
</script>

<Section id="community" num="05" kicker="Community" title="Staying connected">
	{#snippet lead()}
		<p>
			Hertie's alumni stay remarkably engaged — above all through the relationships they built as
			students. Communication channels reach most graduates, while in-person formats, regional
			chapters and mentoring are where alumni see the most room to grow.
		</p>
	{/snippet}

	<div class="channels">
		<KeyFigure value={ch['Alumni mailing list']} unit="%" label="subscribe to the alumni mailing list" />
		<KeyFigure value={ch['Alumni & Students LinkedIn group']} unit="%" label="are active in the main alumni LinkedIn group" tone="blue" />
		<KeyFigure value={ch['Regional Chapter LinkedIn groups']} unit="%" label="follow a regional chapter LinkedIn group" tone="ink" />
	</div>

	<div class="cols-2">
		<Figure
			title="How alumni stay involved"
			subtitle="Share engaging at least occasionally in each activity"
			n={engagement.activities[0].n}
		>
			<RankedBars items={activityItems} suffix="%" marginLeft={230} rowHeight={30} color="var(--prog-empa)" />
		</Figure>
		<Figure
			title="What alumni value most"
			subtitle="Share naming each as a main benefit of being a Hertie alum"
		>
			<RankedBars items={benefitItems} suffix="%" marginLeft={230} rowHeight={30} color="var(--red)" />
		</Figure>
	</div>

	<div class="cols-2">
		<Figure
			title="What holds alumni back"
			subtitle="Share citing each barrier to engagement"
		>
			<RankedBars items={barrierItems} suffix="%" marginLeft={210} rowHeight={32} color="var(--ink-muted)" />
		</Figure>
		<div class="aside-prose">
			<KeyFigure value={engagement.benefits[0]?.pct} unit="%" label={`name “${engagement.benefits[0]?.label.toLowerCase()}” as a key benefit`} />
			<p>
				The picture is consistent: alumni treasure the people they met at Hertie. The barriers
				they report — limited time and geographical distance — are practical rather than a lack of
				interest, pointing to clear opportunities for flexible, locally anchored events and
				mentoring.
			</p>
		</div>
	</div>

	<Takeaway>
		<p>
			A community this willing is an asset. Meeting alumni where they are — in person, in their
			regions, and through faculty they admire — is the surest way to deepen the bond.
		</p>
	</Takeaway>
</Section>

<style>
	.channels {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem 2rem;
		padding: 0.5rem 0 0.5rem;
	}
</style>
