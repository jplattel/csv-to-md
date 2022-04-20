<div>
    <p>Only the first 100 are previewed to preserve performance...</p>
    {#each csv.data.slice(0,100) as data}
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">{render(templateFilename, data)}.md</h5>
                {@html render(template, data, "<br/>")}
            </div>
        </div>
    {/each}
</div>

<script>
    import { render } from './utils.js';

    export let csv;
    export let template;
    export let templateFilename;
</script>