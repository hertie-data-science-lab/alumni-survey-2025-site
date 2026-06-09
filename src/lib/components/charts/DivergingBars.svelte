<script>
	import { Plot, BarX, Text, RuleX } from 'svelteplot';
	import { likertScale, labelColor } from '$lib/colors.js';

	/**
	 * Diverging stacked Likert bars. Negative/neutral categories extend left of
	 * a centre line; positive categories extend right. A bold "% positive" total
	 * sits at the end of each bar.
	 *
	 * `data` = { levels: string[], positive: string[], groups: [{group,dim,n,pct[],positive}] }
	 */
	let {
		data,
		view = $bindable('all'),
		labels = ['Negative', 'Positive'],
		showLegend = true,
		legendLabels = null,
		threshold = 7
	} = $props();

	const palette = $derived(likertScale(data.levels.length));
	const splitIndex = $derived(data.levels.findIndex((l) => data.positive.includes(l)));

	// which groups to show for the current view (All alumni always first)
	const shown = $derived.by(() => {
		const all = data.groups.find((g) => g.dim === 'all');
		if (view === 'all') return [all];
		return [all, ...data.groups.filter((g) => g.dim === view)];
	});

	const order = $derived(shown.map((g) => g.group));

	// build segment + label + total geometry
	const built = $derived.by(() => {
		const segs = [];
		const labLight = [];
		const labDark = [];
		const totals = [];
		let maxLeft = 0;
		let maxRight = 0;

		for (const g of shown) {
			// right side: positive levels, cumulative from 0 outward
			let cum = 0;
			for (let i = splitIndex; i < data.levels.length; i++) {
				const p = g.pct[i] ?? 0;
				if (p > 0) {
					const seg = { group: g.group, level: data.levels[i], x1: cum, x2: cum + p };
					segs.push(seg);
					if (p >= threshold)
						(labelColor(palette[i]) === '#ffffff' ? labLight : labDark).push({
							group: g.group,
							x: cum + p / 2,
							pct: p
						});
					cum += p;
				}
			}
			maxRight = Math.max(maxRight, cum);
			totals.push({ group: g.group, x: cum, positive: g.positive });

			// left side: negative/neutral levels, from 0 outward (nearest centre = least negative)
			cum = 0;
			for (let i = splitIndex - 1; i >= 0; i--) {
				const p = g.pct[i] ?? 0;
				if (p > 0) {
					segs.push({ group: g.group, level: data.levels[i], x1: cum - p, x2: cum });
					if (p >= threshold)
						(labelColor(palette[i]) === '#ffffff' ? labLight : labDark).push({
							group: g.group,
							x: cum - p / 2,
							pct: p
						});
					cum -= p;
				}
			}
			maxLeft = Math.max(maxLeft, -cum);
		}
		return { segs, labLight, labDark, totals, maxLeft, maxRight };
	});

	const domain = $derived([-(built.maxLeft + 3), built.maxRight + 12]);
	const height = $derived(shown.length * 46 + 26);
</script>

<div class="diverging">
	<Plot
		{height}
		marginLeft={104}
		marginRight={20}
		marginTop={4}
		marginBottom={4}
		x={{ axis: false, domain }}
		y={{ axis: 'left', domain: [...order].reverse(), padding: 0.34, label: false }}
		color={{ domain: data.levels, scheme: palette }}
	>
		<BarX data={built.segs} x1="x1" x2="x2" y="group" fill="level" insetTop={1} insetBottom={1} />
		<RuleX x={0} stroke="#8a8784" strokeWidth={1} />
		<Text
			data={built.labDark}
			x="x"
			y="group"
			text={(d) => d.pct}
			fill="#1c1b1a"
			fontSize={12.5}
			fontWeight={700}
		/>
		<Text
			data={built.labLight}
			x="x"
			y="group"
			text={(d) => d.pct}
			fill="#ffffff"
			fontSize={12.5}
			fontWeight={700}
		/>
		<Text
			data={built.totals}
			x="x"
			y="group"
			text={(d) => `${d.positive}%`}
			fill="#1c1b1a"
			fontSize={13}
			fontWeight={800}
			textAnchor="start"
			dx={6}
		/>
	</Plot>

	{#if showLegend}
		<div class="legend">
			{#each data.levels as lvl, i (lvl)}
				<span class="legend__item">
					<span class="legend__swatch" style:background={palette[i]}></span>
					{legendLabels ? legendLabels[i] : lvl}
				</span>
			{/each}
		</div>
	{/if}
</div>

<style>
	.diverging :global(.tick text) {
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 600;
		fill: var(--ink-soft);
	}
	.diverging :global(.tick line),
	.diverging :global([aria-label='y-axis'] path) {
		display: none;
	}
	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem 1rem;
		margin-top: 0.9rem;
		font-size: 0.8rem;
		color: var(--ink-muted);
	}
	.legend__item {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
	}
	.legend__swatch {
		width: 13px;
		height: 13px;
		border-radius: 3px;
		flex-shrink: 0;
	}
</style>
