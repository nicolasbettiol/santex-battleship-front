import deepstream from 'deepstream.io-client-js';
import Environment from '../lib/environment';

const ds = deepstream(Environment.get('DEEPSTREAM'));
ds.login();

ds.on('connectionStateChanged', _ => {
  //console.log(connectionState);
});

ds.on('error', _ => {
  //console.log(error);
});

export default ds;
