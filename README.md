# Wide QRS Lab — by EMC

Responsive clinician learning and manual criteria analysis for wide QRS tachycardia. Includes nine figures extracted from the supplied Miller et al. article, condition-specific teaching, V1/V6 morphology, capture/fusion, concordance, a sequential Brugada assessment, emergency pathways, and a local-only ECG image viewer.

## Run and deploy

No runtime dependencies or API keys. `npm test`, `npm run build`, then serve `dist`. Import this GitHub repository into Vercel; `vercel.json` sets the build and output directory automatically. Framework: Other.

## Clinical scope

This is an educational, unvalidated decision-support prototype. It does not automatically classify images, measure ECGs or calculate diagnostic probabilities. It preserves unknown findings and withholds Brugada classification for irregular/polymorphic rhythms or suspected alternative mechanisms. Clinician-entered observations require expert confirmation. No patient identifiers are requested, and uploaded images stay in browser memory.

## Sources

Miller JM et al. Value of the 12-Lead ECG in Wide QRS Tachycardia. Cardiol Clin. 2006;24:439–451. Figures extracted from user-provided ECG VT 1.pdf; original rights retained by the publisher. No redistribution license is granted for the article figures.

AHA 2025 Adult Advanced Life Support, sections 15–16: https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support (checked 2026-09-30). Contemporary emergency prompts are separate from historical diagnostic teaching.

The attachment contains no dedicated polymorphic VT/torsades tracing; this gap is labeled in the learning view.
