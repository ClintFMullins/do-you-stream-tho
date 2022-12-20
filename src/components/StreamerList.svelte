<script lang="ts">
    import { log } from "src/utils/logging";
    import Streamer from "src/components/Streamer.svelte";
    import type { TwitchUser } from "src/utils/twitch-api";

    let streamerList: TwitchUser[] = [];

    chrome.runtime.sendMessage({
        name: "request_list",
    }, async (parsedStreamerList) => {
        log("request_list resp", parsedStreamerList)
        streamerList = parsedStreamerList;
    });
</script>

<div class="container">
    <div>
        {#each streamerList as streamer}
            <Streamer {streamer}/>
        {:else}
            No Twitch streamers detected on this page :(
        {/each}
    </div>
</div>

<style>
    .container {
        min-width: 250px;
    }
</style>
