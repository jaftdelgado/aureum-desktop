export {};

declare global {
  interface Window {
    electronAPI?: {
      onAuthToken: (callback: (url: string) => void) => void;
    };
  }
}