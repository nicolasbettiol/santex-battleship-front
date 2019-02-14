/* eslint-disable no-console */
class Logger {
  log = (...rest) => {
    console.log(...rest);
    return true;
  };

  error = (...rest) => {
    console.error(...rest);
    return true;
  };
}

export default new Logger();
