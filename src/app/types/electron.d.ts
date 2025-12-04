export {};

declare global {
  interface Window {
    electronAPI?: {
      onAuthToken: (callback: (url: string) => void) => void;
      windowAction: (action: "minimize" | "maximize" | "close") => void;
    };
  }
}
