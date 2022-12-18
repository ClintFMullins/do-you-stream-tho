<script>
  import { QueryClientProvider } from '@sveltestack/svelte-query'

  import Options from './Options.svelte'
</script>

<QueryClientProvider>
  <Options />
</QueryClientProvider>
