import { writable } from 'svelte/store';

function persisted<T>(key: string, initial: T) {
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
  const value = stored !== null ? (JSON.parse(stored) as T) : initial;
  const store = writable<T>(value);
  store.subscribe((v) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(v));
    }
  });
  return store;
}

function browserPersisted(key: string, fallback: boolean) {
  if (typeof localStorage === 'undefined') return writable(fallback);
  const stored = localStorage.getItem(key);
  const value = stored !== null
    ? stored === '1'
    : (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const store = writable(value);
  store.subscribe((v) => {
    localStorage.setItem(key, v ? '1' : '0');
  });
  return store;
}

export const darkMode = browserPersisted('hc-dark', false);
export const readerMode = writable(false);
export const fontSize = persisted<number>('hc-fs', 22);
export const malaCount = persisted<number>('hc-count', 0);
