<script lang="ts">
    import { onMount } from "svelte";

    let list: string[] = [];
    onMount(() => {
        // TODO: connect this with the page for realtime updates
        console.log("mounted, request_list")
        chrome.runtime.sendMessage({
            name: "request_list",
        }, (streamerList) => {
            console.log("mounted, setting list")
            if (streamerList) {
                list = streamerList;
            }
        });
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
