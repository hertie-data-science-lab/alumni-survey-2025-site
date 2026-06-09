<script>
	import Figure from './Figure.svelte';
	import GroupToggle from './GroupToggle.svelte';
	import DivergingBars from './charts/DivergingBars.svelte';

	let {
		title,
		subtitle = '',
		data,
		legendLabels = null,
		note = '',
		threshold = 7,
		defaultView = 'programme'
	} = $props();

	let view = $state(defaultView);
	const n = $derived(data.groups.find((g) => g.dim === 'all')?.n);
</script>

<Figure {title} {subtitle} {note} {n}>
	{#snippet controls()}
		<GroupToggle bind:value={view} />
	{/snippet}
	<DivergingBars {data} bind:view {legendLabels} {threshold} />
</Figure>
