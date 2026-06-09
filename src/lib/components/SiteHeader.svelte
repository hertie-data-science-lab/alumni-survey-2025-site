<script>
	import { onMount } from 'svelte';
	import logo from '$lib/assets/alumni-survey-logo.png';

	let { sections = [] } = $props();
	let active = $state(sections[0]?.id ?? '');
	let scrolled = $state(false);
	let menuOpen = $state(false);

	onMount(() => {
		const obs = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) active = e.target.id;
				}
			},
			{ rootMargin: '-45% 0px -50% 0px', threshold: 0 }
		);
		for (const s of sections) {
			const el = document.getElementById(s.id);
			if (el) obs.observe(el);
		}
		const onScroll = () => (scrolled = window.scrollY > 40);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			obs.disconnect();
			window.removeEventListener('scroll', onScroll);
		};
	});
</script>

<header class="hdr" class:is-scrolled={scrolled}>
	<div class="hdr__inner container">
		<a class="hdr__brand" href="#top" aria-label="Hertie School Alumni Survey 2025 — back to top">
			<img class="hdr__logo" src={logo} alt="Hertie School Alumni Survey 2025" />
		</a>

		<nav class="hdr__nav" aria-label="Sections">
			{#each sections as s (s.id)}
				<a href="#{s.id}" class="hdr__link" class:is-active={active === s.id}>{s.label}</a>
			{/each}
		</nav>

		<button
			class="hdr__menu"
			aria-expanded={menuOpen}
			aria-label="Toggle section menu"
			onclick={() => (menuOpen = !menuOpen)}
		>
			<span></span><span></span><span></span>
		</button>
	</div>

	{#if menuOpen}
		<nav class="hdr__drawer" aria-label="Sections">
			{#each sections as s (s.id)}
				<a href="#{s.id}" class:is-active={active === s.id} onclick={() => (menuOpen = false)}>{s.label}</a>
			{/each}
		</nav>
	{/if}
</header>

<style>
	.hdr {
		position: sticky;
		top: 0;
		z-index: 50;
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: saturate(1.4) blur(10px);
		border-bottom: 1px solid transparent;
		transition: border-color 0.2s ease, box-shadow 0.2s ease;
	}
	.hdr.is-scrolled {
		border-bottom-color: var(--line);
		box-shadow: 0 1px 12px -8px rgba(28, 27, 26, 0.4);
	}
	.hdr__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		min-height: 3.6rem;
	}
	.hdr__brand {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		text-decoration: none;
		color: var(--ink);
	}
	.hdr__logo {
		display: block;
		height: 34px;
		width: auto;
	}
	@media (max-width: 480px) {
		.hdr__logo {
			height: 28px;
		}
	}
	.hdr__nav {
		display: flex;
		gap: 0.25rem;
		flex-wrap: wrap;
		justify-content: flex-end;
	}
	.hdr__link {
		font-size: 0.84rem;
		font-weight: 600;
		color: var(--ink-muted);
		text-decoration: none;
		padding: 0.4rem 0.6rem;
		border-radius: 6px;
		white-space: nowrap;
		transition: color 0.15s, background 0.15s;
	}
	.hdr__link:hover {
		color: var(--ink);
		background: var(--paper-warm);
	}
	.hdr__link.is-active {
		color: var(--red);
	}
	.hdr__menu {
		display: none;
		flex-direction: column;
		gap: 4px;
		background: none;
		border: 0;
		padding: 0.5rem;
		cursor: pointer;
	}
	.hdr__menu span {
		width: 22px;
		height: 2px;
		background: var(--ink);
		border-radius: 2px;
	}
	.hdr__drawer {
		display: none;
		flex-direction: column;
		padding: 0.5rem var(--gutter) 1rem;
		border-top: 1px solid var(--line);
		background: #fff;
	}
	.hdr__drawer a {
		padding: 0.6rem 0.4rem;
		font-weight: 600;
		color: var(--ink-soft);
		text-decoration: none;
		border-bottom: 1px solid var(--line);
	}
	.hdr__drawer a.is-active {
		color: var(--red);
	}

	@media (max-width: 820px) {
		.hdr__nav {
			display: none;
		}
		.hdr__menu {
			display: flex;
		}
		.hdr__drawer {
			display: flex;
		}
	}
</style>
