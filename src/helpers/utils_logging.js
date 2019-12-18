const logger = (vals, msg, type = "MANY") => {
  if (type === "MANY") {
    return vals.map((val, index) => {
      console.group(msg);
      console.log(`${val.msg}`, val);
      return console.groupEnd();
    });
  }
};

// msg:<string>, meta:<object>
const debug = (msg, meta) => {
  const keys = Object.keys(meta);
  console.group(msg);
  console.log("Meta Keys", keys);
  keys.map((key, index) => console.log(`${key}`, meta[key]));
  return console.groupEnd();
};

// msg:<string>, meta:<object>
const debugWithColor = (msg, meta) => {
  const keys = Object.keys(meta);
  console.group(
    `%c${msg}`,
    "padding: 12px; font-size: 15px; border: 2px solid #ffffff;color: #5c75ea;border-radius: 10px;"
  );
  console.log("Meta Keys", keys);
  keys.map((key, index) => console.log(`${key}`, meta[key]));
  return console.groupEnd();
};

export { logger, debug, debugWithColor };
