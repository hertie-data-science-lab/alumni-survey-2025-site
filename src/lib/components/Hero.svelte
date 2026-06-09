<script>
	import KeyFigure from './KeyFigure.svelte';
	let { meta } = $props();
	const h = meta.headline;
</script>

<header class="hero" id="top">
	<div class="container hero__inner">
		<p class="kicker">Hertie School · Alumni Survey 2025</p>
		<h1 class="hero__title">
			Twenty years of Hertie graduates, <span class="hero__em">in their own words</span>
		</h1>
		<p class="hero__dek">
			In spring 2025, the Hertie School asked its alumni how they look back on their studies,
			where their careers have taken them, and how connected they still feel to the School. A
			record <strong>441 graduates</strong> from every programme and every class since 2007
			replied. Here is what they told us.
		</p>
		<p class="hero__byline">
			By the <strong>Alumni Affairs team</strong> with the <strong>Data Science Lab</strong> ·
			Berlin, 2025
		</p>
	</div>

	<div class="container">
		<div class="hero__figures">
			<KeyFigure value={meta.n_respondents} label="alumni responded, across all programmes and cohorts since 2007" tone="ink" />
			<KeyFigure value={h.positive_view} unit="%" label="hold a positive view of the Hertie School" />
			<KeyFigure value={h.belonging} unit="%" label="feel a sense of belonging to the alumni community" tone="blue" />
			<KeyFigure value={h.employed} unit="%" label="are employed, most of them full-time" />
			<KeyFigure value={h.choose_again} unit="%" label="are at least 50/50 likely to choose the Hertie School again" tone="blue" />
			<KeyFigure value={h.germany} unit="%" label="live in Germany — but alumni span every continent" tone="red" />
		</div>
	</div>
</header>

<style>
	.hero {
		padding: clamp(2.5rem, 5vw, 5rem) 0 clamp(2rem, 4vw, 3.5rem);
		background:
			radial-gradient(120% 80% at 100% 0%, var(--red-wash) 0%, transparent 55%),
			var(--paper);
		border-bottom: 1px solid var(--line);
	}
	.hero__inner {
		max-width: 54rem;
	}
	.hero__title {
		font-size: clamp(2.2rem, 1.3rem + 4.4vw, 4.3rem);
		line-height: 1.04;
		letter-spacing: -0.025em;
		margin: 0.3rem 0 0.9rem;
	}
	.hero__em {
		color: var(--red);
	}
	.hero__dek {
		font-size: clamp(1.12rem, 1rem + 0.7vw, 1.45rem);
		line-height: 1.5;
		color: var(--ink-soft);
		max-width: 44rem;
		margin: 0 0 1.3rem;
	}
	.hero__dek strong {
		color: var(--ink);
	}
	.hero__byline {
		font-size: 0.9rem;
		color: var(--ink-muted);
		margin: 0;
	}
	.hero__figures {
		margin-top: clamp(2rem, 4vw, 3.2rem);
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
		gap: clamp(1.4rem, 3vw, 2.4rem) 2rem;
		padding-top: clamp(1.6rem, 3vw, 2.4rem);
		border-top: 2px solid var(--ink);
	}
</style>
