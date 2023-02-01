const defaultColors = {
  font: `\x1b[37m`,
  bg: `\x1b[40m`,
};

const successColors = {
  font: ``,
  bg: `\x1b[42m`,
};

const errorColors = {
  font: `\x1b[31m`,
  bg: ``,
};

const infoColors = {
  font: `\x1b[35m`,
  bg: ``,
};

const linkColors = {
  font: `\x1b[34m`,
  bg: ``,
};

class ConsoleLogger {
  static wrapper(printMessage) {
    console.log('');
    printMessage();
    console.log('');
  }

  static success(message) {
    const printMessage = () =>
      console.log(successColors.bg, message, defaultColors.bg);

    ConsoleLogger.wrapper(printMessage);
  }

  static error(message) {
    const printMessage = () =>
      console.log(errorColors.font, message, defaultColors.font);

    ConsoleLogger.wrapper(printMessage);
  }

  static info(message) {
    const printMessage = () =>
      console.log(infoColors.font, message, defaultColors.font);

    ConsoleLogger.wrapper(printMessage);
  }

  static link(link) {
    const printMessage = () =>
      console.log(linkColors.font, link, defaultColors.font);

    ConsoleLogger.wrapper(printMessage);
  }
}

module.exports = ConsoleLogger;
