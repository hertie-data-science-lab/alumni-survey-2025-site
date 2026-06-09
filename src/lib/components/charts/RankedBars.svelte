<script>
	import { Plot, BarX, Text } from 'svelteplot';

	/**
	 * Horizontal ranked bars for a single series of percentages.
	 * `items` = [{ label, value, color? }] — assumed already in display order
	 * (highest first). Each bar can carry its own colour; otherwise `color`.
	 */
	let {
		items,
		color = 'var(--red)',
		labelField = 'label',
		valueField = 'value',
		suffix = '%',
		marginLeft = 150,
		rowHeight = 34,
		domainMax = null,
		highlight = null,
		format = null
	} = $props();

	const fmt = $derived(format ?? ((v) => `${v}${suffix}`));

	const resolved = $derived(
		items.map((d) => ({
			label: d[labelField],
			value: d[valueField],
			color: d.color ?? (highlight && d[labelField] === highlight ? 'var(--ink-faint)' : color)
		}))
	);
	const order = $derived(resolved.map((d) => d.label));
	const scheme = $derived(Object.fromEntries(resolved.map((d) => [d.label, d.color])));
	const max = $derived(domainMax ?? Math.max(...resolved.map((d) => d.value)));
	const height = $derived(resolved.length * rowHeight + 16);
</script>

<div class="ranked">
	<Plot
		{height}
		{marginLeft}
		marginRight={46}
		marginTop={4}
		marginBottom={4}
		x={{ axis: false, domain: [0, max * 1.02] }}
		y={{ axis: 'left', domain: [...order].reverse(), padding: 0.28, label: false }}
		color={{ domain: order, scheme }}
	>
		<BarX data={resolved} x="value" y="label" fill="label" insetTop={0.5} insetBottom={0.5} />
		<Text
			data={resolved}
			x="value"
			y="label"
			text={(d) => fmt(d.value)}
			fill="var(--ink)"
			fontSize={13}
			fontWeight={700}
			textAnchor="start"
			dx={6}
		/>
	</Plot>
</div>

<style>
	.ranked :global(.tick text) {
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 500;
		fill: var(--ink-soft);
	}
	.ranked :global(.tick line),
	.ranked :global(.axis-y path),
	.ranked :global([class*='axis'] path) {
		display: none;
	}
</style>
