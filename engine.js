(function(root){
function analyze(d){
 const positive=[],support=[],alternatives=[],missing=[];let urgent='';
 if(d.pulse==='no')urgent='No pulse: activate the cardiac arrest response. Start CPR and assess for a shockable rhythm using the local resuscitation protocol.';
 else if(d.morphology==='poly')urgent='Polymorphic WCT: immediate emergency assessment. Sustained polymorphic VT requires unsynchronized shock; do not wait for morphology algorithms. Assess baseline QT, ischemia and electrolytes.';
 else if(d.stability==='unstable')urgent='Unstable WCT with a pulse: immediate expert resuscitation response and synchronized cardioversion when instability is attributable to the tachycardia. Do not delay for this assessment.';
 ['pulse','stability','regularity','morphology'].forEach(k=>{if(!d[k]||d[k]==='unknown')missing.push(k)});
 const rate=Number(d.rate),qrs=Number(d.qrs);let scope='';
 if(!d.rate||!d.qrs)missing.push('rate / QRS measurements');
 if(d.rate&&(rate<1||rate>400)||d.qrs&&(qrs<20||qrs>500))return {title:'Check the measurements',positive,support,alternatives,missing,urgent,sequence:'Not assessed',scope:'Entered measurements are outside the supported range.'};
 if(d.rate&&rate<=100)scope='Entered rate is not tachycardic by the article’s >100 bpm definition.';
 if(d.qrs&&qrs<120)scope+=' Entered QRS is below the wide-complex threshold of 120 ms; this tool’s WCT algorithm does not apply.';
 if(d.av==='yes')positive.push('AV dissociation: independent atrial activity strongly favors VT.');
 if(d.capture==='yes')positive.push('True capture or fusion beats strongly favor VT after excluding mimics.');
 if(d.axis==='yes')support.push('Extreme right-superior axis supports VT, with baseline-conduction exceptions.');
 if(d.concordance==='yes')support.push('Precordial concordance supports VT but can occur in pre-excitation or other exceptions.');
 if(d.morphvt==='yes')positive.push('VT-compatible V1/V2 and V6 morphology was entered.');
 if((d.morphology==='rbbb'&&qrs>140)||(d.morphology==='lbbb'&&qrs>160))support.push('QRS duration exceeds the morphology-specific historical threshold; drug effects and baseline disease can confound it.');
 if(d.baseline==='yes')support.push('An identical baseline QRS supports SVT with aberrancy, but bundle branch reentry VT is an exception.');
 if(d.preexcitation==='yes')alternatives.push('Pre-excited tachycardia / accessory pathway conduction: VT algorithms may misclassify this mechanism.');
 if(d.pacing==='yes')alternatives.push('Ventricular pacing or device-mediated rhythm: confirm with device interrogation; small pacing spikes may be missed.');
 if(d.metabolic==='yes')alternatives.push('Electrolyte disturbance or sodium-channel-blocking drug effect: check potassium, acid-base status and medication/toxin exposure.');
 if(d.regularity==='irregular')alternatives.push('Irregular WCT: consider AF with aberrancy, pre-excited AF and polymorphic ventricular arrhythmia. Do not use Brugada here.');
 const eligible=!scope&&d.regularity==='regular'&&['rbbb','lbbb','other'].includes(d.morphology)&&d.qrs&&d.rate&&d.pulse==='yes'&&d.stability==='stable';
 let sequence='Not applicable until stable regular monomorphic WCT with a pulse is established.',seqVT=false,allNegative=false;
 if(eligible&&alternatives.length===0){const steps=[['noRS','No RS complex in any precordial lead'],['rs100','RS interval >100 ms in any precordial lead'],['av','AV dissociation'],['morphvt','VT morphology in V1/V2 and V6']];sequence='';allNegative=true;
 for(let i=0;i<steps.length;i++){const[k,label]=steps[i];if(d[k]==='yes'){sequence=`Step ${i+1}: ${label} → VT favored.`;seqVT=true;allNegative=false;break}if(d[k]!=='no'){sequence=`Incomplete at step ${i+1}: ${label} is unknown. Later positive findings remain relevant, but the sequential algorithm cannot be completed.`;missing.push(label);allNegative=false;break}}
 if(allNegative)sequence='All four Brugada steps entered as negative → SVT with aberrancy favored by this algorithm, subject to expert confirmation.';
 }else if(eligible)sequence='Alternative mechanism flagged: Brugada classification withheld.';
 if(d.noRS==='yes')support.push('No precordial RS supports VT but is not perfectly specific.');if(d.rs100==='yes')support.push('RS interval >100 ms supports VT; measure from R onset to S nadir.');
 let title='Indeterminate — VT is not excluded';if(scope)title='Outside the WCT algorithm scope';else if(urgent)title='Emergency pathway';else if(positive.length||seqVT)title='Findings favor VT';else if(alternatives.length)title='Alternative mechanism requires review';else if(allNegative)title='SVT with aberrancy favored by Brugada';
 return {title,positive,support,alternatives,missing,urgent,sequence,scope};
}root.WCT={analyze};if(typeof module!=='undefined')module.exports={analyze};
})(typeof window!=='undefined'?window:globalThis);
