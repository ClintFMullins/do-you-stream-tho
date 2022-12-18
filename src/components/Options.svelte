<script lang="ts">
    import { storage } from "src/storage";
    import { onMount } from "svelte";

    let list: string[] = [];
    onMount(() => {
        storage.get().then((istor) =>{
            list = istor.streamerList;
        });
    })
</script>

<div class="container">
    Twitch Streamers on this page:
    <div>
        {#each list as streamer}
            {streamer}
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
