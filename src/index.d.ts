export interface SearchClientOptions {
  debounceMs: number;
  maxCalls: number;
  interval: number;
  cacheTtl: number;
}

export function SearchClient(
  options: SearchClientOptions
): (url: string, query: string) => Promise<any>;
