<script>
	let { id, num = '', kicker = '', title, tone = 'default', lead, children } = $props();
</script>

<section {id} class="section section--{tone}">
	<div class="container">
		<div class="section__head">
			{#if kicker}
				<p class="kicker">
					{#if num}<span class="section__num">{num}</span>{/if}
					{kicker}
				</p>
			{/if}
			<h2 class="section__title">{title}</h2>
			{#if lead}<div class="section__lead">{@render lead()}</div>{/if}
		</div>
		<div class="section__body">
			{@render children()}
		</div>
	</div>
</section>

<style>
	.section {
		padding: clamp(3rem, 6vw, 5.5rem) 0;
		border-bottom: 1px solid var(--line);
		scroll-margin-top: 4rem;
	}
	.section--warm {
		background: var(--paper-warm);
	}
	.section--deep {
		background: var(--paper-deep);
	}
	.section__head {
		max-width: 46rem;
		margin-bottom: clamp(2rem, 4vw, 3rem);
	}
	.section__num {
		font-variant-numeric: tabular-nums;
		color: var(--ink-faint);
		font-weight: 800;
		margin-right: 0.1rem;
	}
	.section__title {
		font-size: clamp(1.9rem, 1.3rem + 2.6vw, 3rem);
		margin: 0 0 0.7rem;
	}
	.section__lead :global(p) {
		font-size: clamp(1.1rem, 1rem + 0.5vw, 1.32rem);
		line-height: 1.55;
		color: var(--ink-soft);
		margin: 0 0 0.9em;
	}
	.section__lead :global(p:last-child) {
		margin-bottom: 0;
	}
	.section__body {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: clamp(1.6rem, 3.5vw, 2.6rem);
	}
</style>
