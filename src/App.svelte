<main>
	<div id="left">
		<h3>Upload file <span class="badge bg-info">Step 1</span></h3>

		<p>
			Use the button below to start uploading a CSV file. 
			The CSV file needs to have a header to name the columns correctly to use in a template.
		</p>

		<input type="file" on:change={parseFile}>

		{#if parsedResult && parsedResult.data}
			<h3>Parsed table</h3>
			<p>Check below if the file is parsed correctly. If it isn't check if the header and seperator is set correctly for the file.</p>
			<Csv csv={parsedResult}/>
		{/if}
	</div>

	{#if parsedResult && parsedResult.data}
	<div id="center">
		<h3>Markdown template <span class="badge bg-info">Step 2</span></h3>
		<p>
			Use the fields with brackets like: <code>&lbrace;field&rbrace;</code> to template. You can use: 

			{#each parsedResult.meta.fields as field} 
				<code>&lbrace;{field}&rbrace;</code>,
			{/each}
		</p>

		<input type="text" bind:value={templateFilename} class="form-control" placeholder="File name template">
		<textarea class="form-control" name="" id="" cols="30" rows="10" bind:value={template} placeholder="File template"></textarea>
	</div>
	{/if}

	{#if parsedResult && parsedResult.data && templateFilename && template}
	<div id="right">
		<h3>Preview</h3>
		<p>Below you'll find a preview of the {parsedResult.data.length} markdown files created. You can easily saved them to your device with the button below:</p>
		<input class="btn btn-primary" type="button" on:click={() => downloadFiles()} value="Save markdown files">
		<Preview csv={parsedResult} {template} {templateFilename}/>
	</div>
	{/if}
</main>

<script>
	import Preview from "./Preview.svelte";
	import Csv from './Csv.svelte';
	import Papa from 'papaparse';
	import { render, generateZip } from './utils'

	let csvFilename
	let parsedResult;
	let template;
	let templateFilename;

	// Prepare a reader that 
	const reader = new FileReader();
	reader.onloadend = function(file) { 
		parsedResult = Papa.parse(reader.result, {
			header: true
		})
	};

	function downloadFiles() {
		let files = []
		parsedResult.data.forEach(d => {
			files.push({
				content: render(template, d),
				name: render(templateFilename, d) + '.md'
			})
		});
		generateZip(csvFilename, files)
	}

	// On change, start the parsing
	function parseFile(evt){
		reader.readAsText(evt.target.files[0]);
		csvFilename = evt.target.files[0].name
	}
</script>

<style>
	main {
		display: flex;
	}

	#left, #center, #right{
		flex: 1;
		padding: 10px;
	}
</style>