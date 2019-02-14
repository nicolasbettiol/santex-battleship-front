import Logger from '../../utils/Logger';

class Environment {
  static initialize = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/assets/config.json', false);
    request.send(null);
    if (request.status === 200) {
      Environment.setEnvironmentVariables(request.responseText);
    }
  };

  static hasEnvironmentVariables = () => {
    const envVars = sessionStorage.getItem('BATTLESHIP');
    return JSON.parse(envVars);
  };

  static setEnvironmentVariables = env => {
    sessionStorage.setItem('BATTLESHIP', env);
  };

  static get = key => {
    try {
      return JSON.parse(sessionStorage.getItem('BATTLESHIP'))[key];
    } catch (error) {
      Logger.log('Unable to retreive environment variable: ', key);
    }
  };
}

Environment.initialize();

export default Environment;
