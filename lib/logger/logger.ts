const isDev: boolean = process.env.NODE_ENV === "development";

type ConsoleMethod = {
  [K in keyof Console]: Console[K] extends (...args: unknown[]) => unknown
    ? K
    : never;
}[keyof Console];

type Logger = {
  [K in ConsoleMethod]: Console[K];
};

const formatTimestamp = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const logger = Object.fromEntries(
  Object.getOwnPropertyNames(console)
    .filter((key): key is ConsoleMethod => {
      const prop = key as keyof Console;

      return typeof console[prop] === "function";
    })
    .map((key) => [
      key,
      isDev
        ? (...args: unknown[]) => {
            const timestamp = formatTimestamp();
            const method = console[key as keyof Console] as (
              ...data: unknown[]
            ) => void;

            method(`[${timestamp}]`, ...args);
          }
        : () => {},
    ])
) as unknown as Logger;

export default logger;
