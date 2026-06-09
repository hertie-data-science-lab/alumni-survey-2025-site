<script>
	/**
	 * Journalistic chart frame: title, subtitle, the chart itself, and a
	 * source/notes line. Mirrors the conventions used in the printed report.
	 */
	let {
		title,
		subtitle = '',
		source = 'Hertie School Alumni Survey 2025',
		note = '',
		n = null,
		children,
		controls
	} = $props();
</script>

<figure class="fig" aria-label={title}>
	<div class="fig__head">
		<div>
			{#if title}<h4 class="fig__title">{title}</h4>{/if}
			{#if subtitle}<p class="fig__sub">{subtitle}</p>{/if}
		</div>
		{#if controls}
			<div class="fig__controls">{@render controls()}</div>
		{/if}
	</div>

	<div class="fig__chart">
		{@render children()}
	</div>

	<figcaption class="fig__foot">
		<span class="fig__source">Source: {source}{#if n}, n = {n}{/if}</span>
		{#if note}<span class="fig__note">{note}</span>{/if}
	</figcaption>
</figure>

<style>
	.fig {
		margin: 0;
		min-width: 0;
		background: var(--paper);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		padding: clamp(1.1rem, 3vw, 1.9rem);
		box-shadow: var(--shadow-soft);
	}
	.fig__chart {
		min-width: 0;
		overflow: hidden;
	}
	.fig__head {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem 1.5rem;
		align-items: baseline;
		justify-content: space-between;
		margin-bottom: 1.25rem;
	}
	.fig__title {
		margin: 0 0 0.25rem;
		font-size: clamp(1.12rem, 1rem + 0.6vw, 1.4rem);
		font-weight: 700;
		letter-spacing: -0.01em;
		line-height: 1.2;
		color: var(--ink);
		max-width: 36rem;
	}
	.fig__sub {
		margin: 0;
		color: var(--ink-muted);
		font-size: 0.95rem;
		line-height: 1.45;
		max-width: 40rem;
	}
	.fig__controls {
		flex-shrink: 0;
	}
	.fig__chart {
		margin: 0.25rem 0 0;
	}
	.fig__foot {
		margin-top: 1.1rem;
		padding-top: 0.7rem;
		border-top: 1px solid var(--line);
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem 1.2rem;
		font-size: 0.78rem;
		color: var(--ink-faint);
		line-height: 1.4;
	}
	.fig__source {
		font-weight: 600;
	}
	.fig__note {
		font-style: italic;
	}
</style>
