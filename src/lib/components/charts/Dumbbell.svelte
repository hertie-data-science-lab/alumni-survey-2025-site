<script>
	import { Plot, Line, Dot, Text } from 'svelteplot';

	/**
	 * Dumbbell chart: one row per group, a connector from `first` to `current`
	 * with a dot at each end. Built for salary growth (first job → current job).
	 * `data` = [{ group, first, current }].
	 */
	let {
		data,
		startLabel = 'First job',
		endLabel = 'Current job',
		startColor = '#c9b89a',
		endColor = '#aa2229',
		suffix = 'k',
		rowHeight = 46,
		domain = null
	} = $props();

	const order = $derived(data.map((d) => d.group));
	const points = $derived(
		data.flatMap((d) => [
			{ group: d.group, value: d.first, kind: startLabel },
			{ group: d.group, value: d.current, kind: endLabel }
		])
	);
	const dom = $derived.by(() => {
		if (domain) return domain;
		const vals = points.map((p) => p.value);
		const lo = Math.min(...vals);
		const hi = Math.max(...vals);
		const pad = (hi - lo) * 0.18 + 6;
		return [lo - pad, hi + pad];
	});
	const scheme = $derived({ [startLabel]: startColor, [endLabel]: endColor });
	const height = $derived(data.length * rowHeight + 20);
</script>

<div class="dumbbell">
	<Plot
		{height}
		marginLeft={64}
		marginRight={20}
		marginTop={6}
		marginBottom={6}
		x={{ axis: false, domain: dom }}
		y={{ axis: 'left', domain: [...order].reverse(), padding: 0.5, label: false }}
		color={{ domain: [startLabel, endLabel], scheme }}
	>
		<Line data={points} x="value" y="group" z="group" stroke="#d9d5cf" strokeWidth={3.5} />
		<Dot data={points} x="value" y="group" fill="kind" r={8} stroke="#fff" strokeWidth={1.5} symbol="circle" />
		<Text
			data={points}
			x="value"
			y="group"
			text={(d) => `${Math.round(d.value)}${suffix}`}
			fill="var(--ink)"
			fontSize={12}
			fontWeight={700}
			lineAnchor="bottom"
			dy={-12}
		/>
	</Plot>

	<div class="legend">
		<span class="legend__item"><span class="legend__dot" style:background={startColor}></span>{startLabel}</span>
		<span class="legend__item"><span class="legend__dot" style:background={endColor}></span>{endLabel}</span>
	</div>
</div>

<style>
	.dumbbell :global(.tick text) {
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 700;
		fill: var(--ink-soft);
	}
	.dumbbell :global(.tick line),
	.dumbbell :global([class*='axis'] path) {
		display: none;
	}
	.legend {
		display: flex;
		gap: 1.2rem;
		margin-top: 0.6rem;
		font-size: 0.82rem;
		color: var(--ink-muted);
	}
	.legend__item {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
	}
	.legend__dot {
		width: 13px;
		height: 13px;
		border-radius: 50%;
		flex-shrink: 0;
	}
</style>
