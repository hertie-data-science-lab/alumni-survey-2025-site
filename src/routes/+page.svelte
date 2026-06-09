<script>
	import meta from '$lib/data/meta.json';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import Overview from '$lib/sections/Overview.svelte';
	import Connection from '$lib/sections/Connection.svelte';
	import Education from '$lib/sections/Education.svelte';
	import Careers from '$lib/sections/Careers.svelte';
	import Community from '$lib/sections/Community.svelte';
	import Methods from '$lib/sections/Methods.svelte';

	const sections = [
		{ id: 'overview', label: 'Overview' },
		{ id: 'connection', label: 'Connection' },
		{ id: 'education', label: 'Education' },
		{ id: 'careers', label: 'Careers' },
		{ id: 'community', label: 'Community' },
		{ id: 'methods', label: 'Methods' }
	];
</script>

<svelte:head>
	<title>Hertie School Alumni Survey 2025 — Key results</title>
	<meta
		name="description"
		content="An interactive summary of the Hertie School Alumni Survey 2025: how 441 graduates view their studies, careers and connection to the School."
	/>
	<meta property="og:type" content="article" />
	<meta property="og:title" content="Twenty years of Hertie graduates, in their own words" />
	<meta
		property="og:description"
		content="441 Hertie School alumni on their studies, careers and community — the key results of the 2025 Alumni Survey."
	/>
	<meta property="og:site_name" content="Hertie School" />
	<meta property="og:locale" content="en_GB" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Hertie School Alumni Survey 2025 — Key results" />
	<meta
		name="twitter:description"
		content="441 Hertie School alumni on their studies, careers and community."
	/>
</svelte:head>

<SiteHeader {sections} />
<Hero {meta} />

<main>
	<Overview />
	<Connection />
	<Education />
	<Careers />
	<Community />
	<Methods />
</main>

<SiteFooter {meta} />
