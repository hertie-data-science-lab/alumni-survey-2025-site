<script>
	import { Plot, BarX, Text } from 'svelteplot';
	import { labelColor } from '$lib/colors.js';

	/**
	 * 100% stacked horizontal bars, one per group (e.g. sector or salary mix
	 * by programme). `groups` = [{ group, pct: number[], n }] aligned to `levels`.
	 */
	let {
		groups,
		levels,
		colors,
		legendLabels = null,
		threshold = 7,
		rowHeight = 44
	} = $props();

	const order = $derived(groups.map((g) => g.group));

	const built = $derived.by(() => {
		const segs = [];
		const labLight = [];
		const labDark = [];
		for (const g of groups) {
			let cum = 0;
			for (let i = 0; i < levels.length; i++) {
				const p = g.pct[i] ?? 0;
				if (p > 0) {
					segs.push({ group: g.group, level: levels[i], x1: cum, x2: cum + p });
					if (p >= threshold)
						(labelColor(colors[i]) === '#ffffff' ? labLight : labDark).push({
							group: g.group,
							x: cum + p / 2,
							pct: p
						});
					cum += p;
				}
			}
		}
		return { segs, labLight, labDark };
	});

	const scheme = $derived(Object.fromEntries(levels.map((l, i) => [l, colors[i]])));
	const height = $derived(groups.length * rowHeight + 16);
</script>

<div class="stacked">
	<Plot
		{height}
		marginLeft={104}
		marginRight={8}
		marginTop={4}
		marginBottom={4}
		x={{ axis: false, domain: [0, 100] }}
		y={{ axis: 'left', domain: [...order].reverse(), padding: 0.3, label: false }}
		color={{ domain: levels, scheme }}
	>
		<BarX data={built.segs} x1="x1" x2="x2" y="group" fill="level" insetTop={1} insetBottom={1} />
		<Text data={built.labDark} x="x" y="group" text={(d) => d.pct} fill="#1c1b1a" fontSize={12.5} fontWeight={700} />
		<Text data={built.labLight} x="x" y="group" text={(d) => d.pct} fill="#ffffff" fontSize={12.5} fontWeight={700} />
	</Plot>

	<div class="legend">
		{#each levels as lvl, i (lvl)}
			<span class="legend__item">
				<span class="legend__swatch" style:background={colors[i]}></span>
				{legendLabels ? legendLabels[i] : lvl}
			</span>
		{/each}
	</div>
</div>

<style>
	.stacked :global(.tick text) {
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 600;
		fill: var(--ink-soft);
	}
	.stacked :global(.tick line),
	.stacked :global([class*='axis'] path) {
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
