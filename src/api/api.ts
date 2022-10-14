import { resolve } from 'path';
import FakeApi from './fakeApi/FakeApi';

enum Enviroment {
  Local = 'local',
  Server = 'Server',
}

class Api extends FakeApi {}

const api = new Api();

export default api;
