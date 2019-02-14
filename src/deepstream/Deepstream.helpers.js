import dsClient from './index';

export class Deepstream {
  static subscribe = ({ record, path = undefined, trigger = true }) => new Promise(resolve => {
    dsClient.record.getRecord(record).whenReady(data => data.subscribe(path, data => resolve(data), trigger));
  });

  static unsubscribe = ({ record, path = undefined }) => new Promise(resolve => {
    dsClient.record.getRecord(record).whenReady(data => data.unsubscribe(path, data => resolve(data)));
  });

  static get = ({ record, path = undefined }) => new Promise(resolve => {
    dsClient.record.getRecord(record).whenReady(data => resolve(data.get(path)));
  });

  static set = ({ record, path = undefined, value }) => new Promise(resolve => {
    dsClient.record.getRecord(record).whenReady(data => resolve(data.set(path, value)));
  });
}
