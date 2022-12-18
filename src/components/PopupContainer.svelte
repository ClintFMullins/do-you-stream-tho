<script>
  import { QueryClientProvider } from '@sveltestack/svelte-query'

  import StreamerList from './StreamerList.svelte'
</script>

<QueryClientProvider>
  <StreamerList />
</QueryClientProvider>
