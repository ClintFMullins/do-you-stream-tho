<script lang="ts">
  import { log } from "src/utils/logging";
  import Streamer from "src/components/Streamer.svelte";
  import type { TwitchUser } from "src/utils/twitch-api";

  let streamerList: TwitchUser[] = [];
  let notFoundList: string[] = [
    "butt",
    "crack",
    "asjd adjs sdjhs djfgh sk fskd fk",
  ];

  chrome.runtime.sendMessage(
    {
      name: "request_list",
    },
    (streamers) => {
      log("request_list resp", streamers);
      streamerList = streamers.parsed;
      // notFoundList = streamers.notFound;
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
    <button>check again</button>
    {#if notFoundList.length !== 0}
      <div class="oops">
        Streamers on page that 404'd on lookup:
        {#each notFoundList as notFound}
          <div>- {notFound.trim()}</div>
        {/each}
      </div>
    {/if}
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
    padding: 10px 10px 15px 10px;
  }

  .oops {
    color: grey;
  }
</style>
