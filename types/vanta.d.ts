export {};

declare global {
  interface Window {
    VANTA: {
      NET: (config: Record<string, unknown>) => { destroy: () => void };
    };
    THREE: unknown;
  }
}
