<script>
	/** A headline statistic. `value` is the number, `unit` an optional suffix
	 *  (e.g. %), `label` the explanatory caption. */
	let { value, unit = '', label, prefix = '', tone = 'red' } = $props();
</script>

<div class="kf kf--{tone}">
	<div class="kf__num tnum">{prefix}{value}<span class="kf__unit">{unit}</span></div>
	<div class="kf__label">{label}</div>
</div>

<style>
	.kf {
		padding: 0.2rem 0;
	}
	.kf__num {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: clamp(2.4rem, 1.6rem + 3vw, 3.6rem);
		line-height: 0.95;
		letter-spacing: -0.03em;
		color: var(--red);
	}
	.kf--ink .kf__num {
		color: var(--ink);
	}
	.kf--blue .kf__num {
		color: var(--blue);
	}
	.kf__unit {
		font-size: 0.55em;
		font-weight: 700;
		margin-left: 0.05em;
	}
	.kf__label {
		margin-top: 0.5rem;
		font-size: 0.92rem;
		line-height: 1.35;
		color: var(--red);
		max-width: 22ch;
	}
	.kf--ink .kf__label {
		color: var(--ink-soft);
	}
	.kf--blue .kf__label {
		color: var(--blue);
	}
</style>
