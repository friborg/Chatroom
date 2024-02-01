// store.ts
import { createStore, Action } from 'redux';

interface User {
  id: number;
  username: string;
  password: string;
}

interface UserState {
  user: User | null;
}

interface SetUserAction extends Action<'SET_USER'> {
  payload: User;
}

const initialState: UserState = {
  user: null,
};

const userReducer = (state: UserState = initialState, action: SetUserAction): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(userReducer);

export default store;
