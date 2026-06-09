<script>
	import { labelColor } from '$lib/colors.js';

	/**
	 * A row of donut charts, one per group (e.g. one per programme), sharing a
	 * legend. `groups` = [{ group, pct: number[], n }] aligned to `levels`.
	 * (SveltePlot has no arc/pie mark, so the arcs are drawn as plain SVG.)
	 */
	let {
		groups,
		levels,
		colors,
		legendLabels = null,
		threshold = 10,
		size = 150
	} = $props();

	const cx = size / 2;
	const cy = size / 2;
	const outerR = size / 2 - 6;
	const innerR = outerR * 0.58;

	const polar = (radius, angle) => [cx + radius * Math.sin(angle), cy - radius * Math.cos(angle)];

	function arcPath(rIn, rOut, a0, a1) {
		const large = a1 - a0 > Math.PI ? 1 : 0;
		const [x0o, y0o] = polar(rOut, a0);
		const [x1o, y1o] = polar(rOut, a1);
		const [x1i, y1i] = polar(rIn, a1);
		const [x0i, y0i] = polar(rIn, a0);
		return `M${x0o},${y0o}A${rOut},${rOut} 0 ${large} 1 ${x1o},${y1o}L${x1i},${y1i}A${rIn},${rIn} 0 ${large} 0 ${x0i},${y0i}Z`;
	}

	const donuts = $derived(
		groups.map((g) => {
			const total = g.pct.reduce((s, p) => s + p, 0) || 100;
			let acc = 0;
			const segs = [];
			g.pct.forEach((p, i) => {
				if (p > 0) {
					const a0 = (acc / total) * 2 * Math.PI;
					const a1 = ((acc + p) / total) * 2 * Math.PI;
					const am = (a0 + a1) / 2;
					const lr = (innerR + outerR) / 2;
					segs.push({
						path: arcPath(innerR, outerR, a0, a1),
						fill: colors[i],
						pct: p,
						show: p >= threshold,
						lx: cx + lr * Math.sin(am),
						ly: cy - lr * Math.cos(am),
						tcolor: labelColor(colors[i])
					});
					acc += p;
				}
			});
			return { group: g.group, n: g.n, segs };
		})
	);
</script>

<div class="donuts">
	<div class="donuts__row">
		{#each donuts as d (d.group)}
			<figure class="donut">
				<svg viewBox="0 0 {size} {size}" role="img" aria-label="{d.group} sector mix">
					{#each d.segs as s, i (i)}
						<path d={s.path} fill={s.fill} stroke="#fff" stroke-width="1.5" />
					{/each}
					{#each d.segs as s, i (i)}
						{#if s.show}
							<text
								x={s.lx}
								y={s.ly}
								text-anchor="middle"
								dominant-baseline="central"
								fill={s.tcolor}
								font-size="12.5"
								font-weight="700">{s.pct}</text
							>
						{/if}
					{/each}
					<text x={cx} y={cy} text-anchor="middle" dominant-baseline="central" class="donut__code"
						>{d.group}</text
					>
				</svg>
				<figcaption>n = {d.n}</figcaption>
			</figure>
		{/each}
	</div>

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
	.donuts__row {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem 1.6rem;
	}
	.donut {
		margin: 0;
		text-align: center;
	}
	.donut svg {
		width: 150px;
		height: 150px;
		max-width: 38vw;
		font-family: var(--font-sans);
	}
	.donut__code {
		font-size: 17px;
		font-weight: 800;
		letter-spacing: -0.01em;
		fill: var(--ink);
	}
	.donut figcaption {
		font-size: 0.78rem;
		color: var(--ink-faint);
		font-variant-numeric: tabular-nums;
		margin-top: 0.1rem;
	}
	.legend {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.35rem 1rem;
		margin-top: 1rem;
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
