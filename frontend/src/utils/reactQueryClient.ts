import { QueryClient } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";

const cacheTime = 1000 * 60 * 60 * 24 * 5;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime,
      refetchOnWindowFocus: false,
    },
  },
});

const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
});

const doNotPersistQueries: string[] = ["notes"];

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
  maxAge: cacheTime,
  hydrateOptions: {},
  dehydrateOptions: {
    shouldDehydrateQuery: ({ queryKey }: any) => {
      return !doNotPersistQueries.includes(queryKey);
    },
  },
  buster: "notes",
});
