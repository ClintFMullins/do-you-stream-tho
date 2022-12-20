<script lang="ts">
  import { log } from "src/utils/logging";
  import Streamer from "src/components/Streamer.svelte";
  import type { TwitchUser } from "src/utils/twitch-api";

  let streamerList: TwitchUser[] = [];

  chrome.runtime.sendMessage(
    {
      name: "request_list",
    },
    (parsedStreamerList) => {
      log("request_list resp", parsedStreamerList);
      streamerList = parsedStreamerList;
    }
  );
</script>

<div class="container">
  <div>
    {#each streamerList as streamer}
      <Streamer {streamer} />
    {:else}
      <div class="loading">No Twitch streamers detected on this page :'(</div>
    {/each}
  </div>
</div>

<style>
  .container {
    min-width: 250px;
    background-color: black;
    padding: 5px 5px 0 5px;
    border: 1px solid #575757;
  }
  .loading {
    padding: 5px;
  }
</style>
