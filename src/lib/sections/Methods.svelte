<script>
	import meta from '$lib/data/meta.json';
	import Section from '$lib/components/Section.svelte';

	const fmtDate = (iso) =>
		new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
</script>

<Section id="methods" num="06" kicker="Methodology" title="How we did this" tone="deep">
	{#snippet lead()}
		<p>
			This piece summarises the Hertie School Alumni Survey 2025. The figures here are recomputed
			directly from the anonymised survey responses; the full report carries the complete set of
			results. Below is how the survey was run and how its numbers should — and should not — be
			read.
		</p>
	{/snippet}

	<div class="methods">
		<div class="statstrip">
			<div><strong class="big tnum">{meta.population.contacted.toLocaleString('en-GB')}</strong><span>alumni contacted with a personal invitation</span></div>
			<div><strong class="big tnum">{meta.n_respondents}</strong><span>usable responses</span></div>
			<div><strong class="big tnum">~{meta.population.response_rate}%</strong><span>overall response rate</span></div>
			<div><strong class="big tnum">{fmtDate(meta.fielded.start).split(' ').slice(1).join(' ')}–{fmtDate(meta.fielded.end).split(' ').slice(1).join(' ')}</strong><span>field period, 2025</span></div>
		</div>

		<div class="prose methods__prose">
			<h3>How to read the charts</h3>
			<p>
				Most attitude questions are shown as <strong>diverging bars</strong>. Categories that lean
				negative or neutral extend to the left of the centre line; positive categories extend to
				the right. The bold figure at the end of each bar is the combined <strong>positive
				share</strong> — for example, the percentage who agree or strongly agree. Use the toggle
				above each chart to switch between all alumni, a breakdown by programme, and a breakdown by
				graduation cohort.
			</p>
			<p>
				Percentages are reported as whole numbers and are calculated among those who answered the
				question (non-responses are excluded). Because subgroups differ greatly in size, the same
				percentage carries more uncertainty for a small group (such as the {meta.programmes.find((p) => p.code === 'MDS')?.n ?? 15} MDS
				graduates) than for a large one.
			</p>

			<h3>Questionnaire</h3>
			<p>
				The questionnaire was developed with reference to established alumni surveys — including
				those of Universität Konstanz, Princeton University, Kansas State University and Southern
				Illinois University Edwardsville — and refined with input from Hertie faculty, students and
				staff. It was piloted on 20 alumni in December 2024 to keep completion time under 20
				minutes. It covers attachment to the School, the study experience, further studies, the job
				search, a reconstruction of up to six post-graduation jobs, demographics, and alumni
				engagement, with question routing tailored to each respondent's path.
			</p>

			<h3>Recruitment &amp; fieldwork</h3>
			<p>
				The target population was all Hertie School graduates up to the class of 2024 — about
				3,010 alumni across the MPP, MIA, MDS and EMPA programmes. The Alumni Affairs team compiled
				a verified address list of {meta.population.contacted.toLocaleString('en-GB')} contacts.
				Fewer than 4% of invitations bounced, indicating good data quality. The survey was fielded
				between {fmtDate(meta.fielded.start)} and {fmtDate(meta.fielded.end)}, with two reminders.
			</p>
			<p>
				Recruitment used two routes: personalised email invitations, which produced 71% of
				responses (314 of {meta.n_respondents}), and a non-personalised link shared through alumni
				chapters, LinkedIn groups and personal contacts, which added the remaining 29% (127
				responses). Against the base of {meta.population.contacted.toLocaleString('en-GB')}
				contacts, the overall response rate was about {meta.population.response_rate}%.
			</p>

			<h3>Data &amp; ethics</h3>
			<p>
				Data were collected in Qualtrics in full compliance with GDPR. Participation was voluntary,
				informed consent was obtained at the start, and responses were anonymised with personal
				identifiers stored separately. Processing and analysis were carried out by the Alumni
				Affairs team with support from the Data Science Lab.
			</p>

			<h3>How to interpret the results</h3>
			<p>
				This is <strong>not a census</strong>, and respondents were not a random sample of all
				alumni, so results carry a meaningful — and not precisely quantifiable — degree of
				uncertainty. We therefore avoid over-interpreting small differences, report whole-number
				percentages, and present each question from several angles (all alumni, by programme, by
				cohort). The analyses are descriptive: correlations, for instance between cohort and an
				outcome, should not be read as causal. Cohorts are grouped into early (2007–2016), mid
				(2017–2022) and recent (2023–2024) graduates, and PhD graduates are excluded from the
				programme breakdowns because of their small number.
			</p>
			<p class="methods__foot">
				Figures in this interactive are computed from the latest anonymised data and may differ
				from the printed report by a percentage point or two due to rounding and data updates. ·
				Source: Hertie School Alumni Survey 2025.
			</p>
		</div>
	</div>
</Section>

<style>
	.methods {
		display: grid;
		gap: clamp(1.8rem, 4vw, 2.8rem);
	}
	.statstrip div {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}
	.statstrip .big {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 1.1rem + 1.4vw, 2rem);
		font-weight: 800;
		letter-spacing: -0.02em;
		color: var(--red);
		line-height: 1;
	}
	.statstrip span {
		font-size: 0.85rem;
		color: var(--ink-muted);
		line-height: 1.35;
	}
	.methods__prose h3 {
		margin-top: 1.8rem;
	}
	.methods__prose h3:first-child {
		margin-top: 0;
	}
	.methods__foot {
		margin-top: 1.5rem;
		padding-top: 1rem;
		border-top: 1px solid var(--line-strong);
		font-size: 0.85rem;
		color: var(--ink-muted);
		font-style: italic;
	}
</style>
