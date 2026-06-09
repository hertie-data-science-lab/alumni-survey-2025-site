<script>
	import { Plot, BarX, Text } from 'svelteplot';

	/**
	 * Horizontal ranked bars for a single series of percentages.
	 * `items` = [{ label, value, color? }] — assumed already in display order
	 * (highest first). Each bar can carry its own colour; otherwise `color`.
	 *
	 * `wrap` renders the category labels as multi-line text (instead of the
	 * single-line y-axis), so long labels break onto several lines.
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
		format = null,
		wrap = false
	} = $props();

	const fmt = $derived(format ?? ((v) => `${v}${suffix}`));

	// approx. characters that fit on one line in the left margin (~6.6px/char at 12.5px)
	const maxChars = $derived(Math.max(12, Math.floor((marginLeft - 16) / 6.6)));

	function wrapText(s) {
		const words = String(s).split(/\s+/);
		const lines = [];
		let cur = '';
		for (const w of words) {
			if (cur && cur.length + 1 + w.length > maxChars) {
				lines.push(cur);
				cur = w;
			} else {
				cur = cur ? `${cur} ${w}` : w;
			}
		}
		if (cur) lines.push(cur);
		return lines.join('\n');
	}

	const resolved = $derived(
		items.map((d) => ({
			label: d[labelField],
			value: d[valueField],
			color: d.color ?? (highlight && d[labelField] === highlight ? 'var(--ink-faint)' : color),
			_x: 0,
			_wrapped: wrap ? wrapText(d[labelField]) : d[labelField]
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
		y={{ axis: wrap ? false : 'left', domain: [...order].reverse(), padding: 0.28, label: false }}
		color={{ domain: order, scheme }}
	>
		<BarX data={resolved} x="value" y="label" fill="label" insetTop={0.5} insetBottom={0.5} />
		{#if wrap}
			<Text
				data={resolved}
				x="_x"
				y="label"
				text={(d) => d._wrapped}
				fill="var(--ink-soft)"
				fontSize={12.5}
				fontWeight={500}
				textAnchor="end"
				lineAnchor="middle"
				dx={-10}
			/>
		{/if}
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
