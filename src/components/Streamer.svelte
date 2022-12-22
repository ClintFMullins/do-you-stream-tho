<script lang="ts">
  import type { TwitchUser } from "src/utils/twitch-api";

  export let streamer: TwitchUser;
  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  const isLive = !!streamer.stream?.id;
</script>

<div class="cont">
  <a
    target="_blank"
    rel="noreferrer"
    href={`https://www.twitch.tv/${streamer.login}`}
  >
    <img class:live={isLive} src={streamer.profileImageURL} alt="" />
    <div class="middle">
      <div class="name">
        {streamer.displayName}
      </div>
      <div class="activity">
        {#if isLive}
          {streamer.stream.game.displayName}
        {:else}
          Offline
        {/if}
      </div>
    </div>
    <div class="red-cont">
      {#if isLive}
        <div>
          <div class="red" />
          {formatter.format(streamer.stream.viewersCount)}
        </div>
      {/if}
    </div>
  </a>
</div>

<style>
  .cont {
    opacity: 0.9;
    padding: 3px 5px;
    margin-bottom: 5px;
    border-radius: 3px;
  }

  .cont:hover {
    opacity: 1;
    background-color: #1f1f1f;
  }

  a {
    display: flex;
  }

  .name {
    font-size: 15px;
  }

  .middle {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 5px;
  }

  img {
    border-radius: 100%;
    width: 40px;
    height: 40px;
    border: solid 2px black;
  }

  .live {
    border: solid 2px red;
  }

  .activity {
    color: #888888;
  }

  .red {
    width: 10px;
    height: 10px;
    background: red;
    border-radius: 100%;
    display: inline-block;
  }

  .red-cont {
    display: flex;
    justify-content: end;
    align-items: center;
    font-size: 13px;
  }
</style>
