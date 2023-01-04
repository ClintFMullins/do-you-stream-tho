type mode = "log" | "debug" | "silent";

const MODE: mode = "silent";

/**
 * So I can change log to debug in one place
 */
export function log(...args) {
  switch (MODE) {
    case "log": {
      console.log(...args);
      return;
    }
    case "debug": {
      console.debug(...args);
      return;
    }
    case "silent": {
      return;
    }
  }
}
