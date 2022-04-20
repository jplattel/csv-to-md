<table class="table table-striped">
    <thead>
        <tr>
            {#each csv.meta.fields as field}
                <th>{field}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each csv.data as row}
            <tr>
                {#each Object.values(row) as value, key}
                    <td>{value}</td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<script>
    export let csv;
</script>