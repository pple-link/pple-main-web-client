const SET_UUID = 'auth/SET_UUID' as const;
const SET_TOKEN = 'auth/SET_TOKEN' as const;
const SET_REFRESH_TOKEN = 'auth/SET_REFRESH_TOKEN' as const;
const INIT_TOKENS = 'auth/INIT_TOKENS' as const;

export const setUuid = (uuid: string) => ({
  type: SET_UUID,
  uuid,
});

export const setToken = (token: string) => ({
  type: SET_TOKEN,
  token,
});

export const setRefreshToken = (refreshToken: string) => ({
  type: SET_REFRESH_TOKEN,
  refreshToken,
});

export const initTokens = (accessToken: string, refreshToken: string) => ({
  type: INIT_TOKENS,
  token: accessToken,
  refreshToken: refreshToken,
});

type AccountAction =
  | ReturnType<typeof setUuid>
  | ReturnType<typeof setToken>
  | ReturnType<typeof setRefreshToken>
  | ReturnType<typeof initTokens>;

type AccountState = {
  uuid: string;
  token: string | undefined;
  refreshToken: string;
};

const initialState: AccountState = {
  uuid: '',
  token: '',
  refreshToken: '',
};

const account = (
  state: AccountState = initialState,
  action: AccountAction,
): AccountState => {
  switch (action.type) {
    case SET_UUID:
      return {
        ...initialState,
        uuid: action.uuid,
      };

    case SET_TOKEN:
      return {
        ...initialState,
        token: action.token,
      };

    case SET_REFRESH_TOKEN:
      return {
        ...initialState,
        refreshToken: action.refreshToken,
      };

    case INIT_TOKENS:
      return {
        ...initialState,
        token: action.token,
        refreshToken: action.refreshToken,
      };

    default:
      return state;
  }
};

export default account;
