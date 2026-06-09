<script>
	let { meta } = $props();
</script>

<footer class="footer">
	<div class="container footer__inner">
		<div class="footer__brand">
			<span class="footer__mark" aria-hidden="true">H</span>
			<div>
				<strong>Hertie School</strong>
				<p>Alumni Survey 2025 — Report &amp; interactive summary</p>
			</div>
		</div>

		<div class="footer__cols">
			<div>
				<h4>About this piece</h4>
				<p>
					An interactive summary of the Hertie School Alumni Survey 2025, prepared by the
					Alumni Affairs team with methodological guidance from the Data Science Lab. Figures
					are drawn directly from the survey data; see the
					<a href="#methods">methodology</a> for how to read them.
				</p>
			</div>
			<div>
				<h4>Data &amp; privacy</h4>
				<p>
					Responses were collected via Qualtrics in full compliance with GDPR. All data were
					anonymised and informed consent obtained. {meta.n_respondents} alumni took part
					between February and April 2025.
				</p>
			</div>
			<div>
				<h4>Contact</h4>
				<p>
					Alumni Affairs · <a href="mailto:alumnirelations@hertie-school.org">alumnirelations@hertie-school.org</a><br />
					Friedrichstr. 180, 10117 Berlin
				</p>
			</div>
		</div>

		<p class="footer__legal">
			© 2025 Hertie School. Source: Hertie School Alumni Survey 2025. Percentages are reported as
			whole numbers and exclude non-responses; small subgroups (MDS, PhD) should be read with
			caution.
		</p>
	</div>
</footer>

<style>
	.footer {
		background: #1c1b1a;
		color: #d8d4ce;
		padding: clamp(2.5rem, 5vw, 4rem) 0 2.5rem;
	}
	.footer__inner {
		display: grid;
		gap: 2rem;
	}
	.footer__brand {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.footer__mark {
		display: grid;
		place-items: center;
		width: 2.4rem;
		height: 2.4rem;
		border-radius: 7px;
		background: var(--red);
		color: #fff;
		font-weight: 800;
		font-size: 1.35rem;
	}
	.footer__brand strong {
		color: #fff;
		font-size: 1.1rem;
	}
	.footer__brand p {
		margin: 0.1rem 0 0;
		font-size: 0.85rem;
		color: #a8a39c;
	}
	.footer__cols {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1.8rem;
		padding-top: 1.8rem;
		border-top: 1px solid #3a3835;
	}
	.footer__cols h4 {
		color: #fff;
		font-size: 0.95rem;
		margin: 0 0 0.5rem;
	}
	.footer__cols p {
		margin: 0;
		font-size: 0.88rem;
		line-height: 1.5;
		color: #b8b3ac;
	}
	.footer__cols a {
		color: #f0d5d7;
	}
	.footer__legal {
		font-size: 0.78rem;
		color: #8a857e;
		line-height: 1.5;
		margin: 0;
		padding-top: 1.5rem;
		border-top: 1px solid #3a3835;
	}
</style>
