<script lang="ts">
  import { log } from "src/utils/logging";
  import Streamer from "src/components/Streamer.svelte";
  import type { TwitchUser } from "src/utils/twitch-api";

  let streamerList: TwitchUser[] = [];
  let notFoundList: string[] = [];

  function getStreamerInfo() {
    chrome.runtime.sendMessage(
      {
        name: "request_list",
      },
      (streamers) => {
        log("request_list resp", streamers);
        streamerList = streamers.parsed;
        notFoundList = streamers.notFound;
      }
    );
  }

  function triggerLoop() {
    chrome.runtime.sendMessage({
      name: "request_parse",
    });

    /** More race conditions, hopefully enough time for a dom scan */
    setTimeout(getStreamerInfo, 500);
  }

  getStreamerInfo();
</script>

<div class="container">
  <div>
    {#each streamerList as streamer}
      <Streamer {streamer} />
    {:else}
      <div class="loading">No Twitch streamers detected on this page :'(</div>
    {/each}
    <div class="butt-cont">
      <button on:click={triggerLoop}>check again ↺</button>
    </div>
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

  .butt-cont {
    text-align: center;
  }

  button {
    background: none;
    border: none;
    color: rgb(61, 61, 61);
    margin: 0 auto;
    cursor: pointer;
  }

  button:hover {
    color: white;
  }

  .oops {
    color: grey;
  }
</style>
