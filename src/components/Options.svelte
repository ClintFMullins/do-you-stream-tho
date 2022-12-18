<script lang="ts">
    import { onMount } from "svelte";

    let list: string[] = [];
    onMount(() => {
        console.log(chrome.extension.getBackgroundPage())
    })
</script>

<div class="container">
    Twitch Streamers on this page:
    <div>
        {#each list as streamer}
            <div>{streamer}</div>
        {:else}
            None on the page!
        {/each}
    </div>
</div>

<style>
    .container {
        min-width: 250px;
    }
</style>
