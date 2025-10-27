import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staletime: 1000 * 60 * 5, //5mins
      cacheTime: 1000 * 60 * 10, //10mins
      refetchOnWindowFocus: false,
    },
  },
});

export function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
