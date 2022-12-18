<script lang="ts">
    import { log } from "src/utils/logging";
    import Streamer from "src/components/Streamer.svelte";
    import { getTwitchUsers, type TwitchUser } from "src/utils/twitch-api";

    let list: TwitchUser[] = [];

    log("mounted, request_list")

    chrome.runtime.sendMessage({
        name: "request_list",
    }, async (streamerList) => {
        log("mounted, setting list")

        if (streamerList) {
            const users = await getTwitchUsers(streamerList);
            log('mounted, fetched users', users);

            list = streamerList.map((streamer) => {
                return users.data[streamer];
            })
        }
    });
</script>

<div class="container">
    <div>
        {#each list as streamer}
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
