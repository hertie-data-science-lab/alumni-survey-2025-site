<script>
	import { Plot, Line, Dot } from 'svelteplot';
	import { PROGRAMME_COLORS } from '$lib/colors.js';

	/**
	 * Multi-series line chart of respondent counts by graduation year and
	 * programme. `data` = [{ programme, year, n }].
	 */
	let { data, colors = PROGRAMME_COLORS, height = 300 } = $props();

	const series = $derived([...new Set(data.map((d) => d.programme))]);
	const scheme = $derived(Object.fromEntries(series.map((s) => [s, colors[s] ?? '#999'])));
</script>

<div class="trend">
	<Plot
		{height}
		marginLeft={34}
		marginRight={14}
		marginTop={10}
		marginBottom={28}
		x={{ label: false, tickFormat: (d) => `${d}`, insetLeft: 6, insetRight: 6 }}
		y={{ label: false, grid: true, insetTop: 8 }}
		color={{ domain: series, scheme, legend: true }}
	>
		<Line {data} x="year" y="n" stroke="programme" z="programme" strokeWidth={2.5} curve="monotone-x" />
		<Dot {data} x="year" y="n" fill="programme" r={3.5} />
	</Plot>
</div>

<style>
	.trend :global(.tick text) {
		font-family: var(--font-sans);
		font-size: 12px;
		fill: var(--ink-muted);
	}
	.trend :global(.tick line) {
		stroke: var(--line);
	}
	.trend :global([class*='axis'] path) {
		display: none;
	}
</style>
