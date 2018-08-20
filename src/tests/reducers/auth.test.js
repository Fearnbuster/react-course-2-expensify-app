
import authReducer from '../../reducers/auth';

describe('reducers/auth', () => {
  it('should set uid on login', () => {
    const action = {
      type: 'LOGIN',
      uid: 123
    };

    const state = authReducer({}, action);

    expect(state).toEqual({ uid: action.uid });
  });

  it('should clear uid on logout', () => {
    const action = {
      type: 'LOGOUT'
    };

    const state = authReducer({ uid: 'anything' }, action);

    expect(state).toEqual({});
  });
});