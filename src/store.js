import {createConnectedStore} from 'undux';
import {getCurrentUser, setCurrentUser} from './utils/auth';

const initialState = {
  user: getCurrentUser(),
  bins: [],
  items: [],
  tags: []
};

const effects = store => {
  store
    .on('user')
    .subscribe(user => setCurrentUser(user));
  return store;
};

export default createConnectedStore(initialState, effects);
