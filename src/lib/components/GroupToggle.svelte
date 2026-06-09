<script>
	/** Segmented control bound to a `value` (e.g. 'all' | 'programme' | 'cohort'). */
	let {
		value = $bindable('all'),
		options = [
			{ id: 'all', label: 'All alumni' },
			{ id: 'programme', label: 'By programme' },
			{ id: 'cohort', label: 'By cohort' }
		],
		label = 'View'
	} = $props();
</script>

<div class="toggle" role="group" aria-label={label}>
	{#each options as opt (opt.id)}
		<button
			type="button"
			class="toggle__btn"
			class:is-active={value === opt.id}
			aria-pressed={value === opt.id}
			onclick={() => (value = opt.id)}
		>
			{opt.label}
		</button>
	{/each}
</div>

<style>
	.toggle {
		display: inline-flex;
		background: var(--paper-warm);
		border: 1px solid var(--line-strong);
		border-radius: 999px;
		padding: 3px;
		gap: 2px;
	}
	.toggle__btn {
		appearance: none;
		border: 0;
		background: transparent;
		font: inherit;
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--ink-muted);
		padding: 0.32rem 0.8rem;
		border-radius: 999px;
		cursor: pointer;
		white-space: nowrap;
		transition: background 0.15s ease, color 0.15s ease;
	}
	.toggle__btn:hover {
		color: var(--ink);
	}
	.toggle__btn.is-active {
		background: var(--red);
		color: #fff;
		box-shadow: 0 1px 2px rgba(133, 34, 38, 0.35);
	}
</style>
