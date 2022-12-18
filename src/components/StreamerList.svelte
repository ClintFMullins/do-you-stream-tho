<script lang="ts">
    import { log } from "src/utils/logging";

    let list: string[] = [];

    // TODO: connect this with the page for realtime updates
    log("mounted, request_list")
    chrome.runtime.sendMessage({
        name: "request_list",
    }, (streamerList) => {
        log("mounted, setting list")
        if (streamerList) {
            list = streamerList;
        }
    });
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
