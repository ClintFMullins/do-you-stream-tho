<script lang="ts">
  import type { TwitchUser } from "src/utils/twitch-api";

  export let streamer: TwitchUser
</script>

<div>
  <a target="_blank" rel="noreferrer" href={`https://www.twitch.tv/${streamer.login}`}>
    <img src={streamer.profileImageURL} />{streamer.displayName}
  </a>
  Live: {streamer.stream?.id ? "true" : "false"}
</div>

<style>
  img {
    border-radius: 100%;
  }
</style>