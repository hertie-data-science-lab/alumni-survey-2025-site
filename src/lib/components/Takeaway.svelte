<script>
	/** A highlighted insight that punctuates a section. */
	let { children, label = 'The takeaway' } = $props();
</script>

<aside class="takeaway">
	<span class="takeaway__label">{label}</span>
	<div class="takeaway__body">{@render children()}</div>
</aside>

<style>
	.takeaway {
		border-left: 4px solid var(--red);
		background: var(--red-wash);
		padding: 1.3rem 1.5rem;
		border-radius: 0 var(--radius) var(--radius) 0;
		max-width: 46rem;
	}
	.takeaway__label {
		display: block;
		font-size: 0.74rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--red);
		margin-bottom: 0.5rem;
	}
	.takeaway__body :global(p) {
		margin: 0;
		font-size: clamp(1.05rem, 0.98rem + 0.4vw, 1.22rem);
		line-height: 1.5;
		color: var(--ink);
		font-weight: 500;
	}
</style>
