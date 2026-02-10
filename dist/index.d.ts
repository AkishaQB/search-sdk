export interface SearchClientOptions {
  debounceMs: number;
  maxCalls: number;
  interval: number;
  cacheTtl: number;
}

export function SearchClient(
  options: SearchClientOptions
): (query: string) => Promise<any>;
