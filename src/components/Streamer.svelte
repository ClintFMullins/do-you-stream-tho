<script lang="ts">
  import type { TwitchUser } from "src/utils/twitch-api";

  export let streamer: TwitchUser;
</script>

<div>
  <a
    target="_blank"
    rel="noreferrer"
    href={`https://www.twitch.tv/${streamer.login}`}
  >
    <img
      class:live={!!streamer.stream?.id}
      src={streamer.profileImageURL}
      alt=""
    />
    <div class="middle">
      <div class="name">
        {streamer.displayName}
      </div>
      <div class="activity">Overwatch 2</div>
    </div>
    <div class="red-cont">
      <div>
        <div class="red" />
        6.5k
      </div>
    </div>
  </a>
</div>

<style>
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
    border: solid 3px black;
  }

  .live {
    border: solid 3px red;
  }

  .activity {
    color: #888888;
  }

  .red {
    width: 10px;
    height: 10px;
    font-size: 15px;
    background: red;
    border-radius: 100%;
    display: inline-block;
  }

  .red-cont {
    display: flex;
    justify-content: end;
    align-items: center;
  }
</style>
