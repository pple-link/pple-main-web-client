const SET_KEY_WORD = 'search/SET_KEY_WORD' as const;

export const setKeyWord = (keyword: string) => ({
  type: SET_KEY_WORD,
  payloads: keyword,
});

export type SearchActionType = ReturnType<typeof setKeyWord>;

export type SearchState = {
  keyword: string;
};

const initialState = {
  keyword: '',
};

const search = (
  state: SearchState = initialState,
  actions: SearchActionType,
): SearchState => {
  switch (actions.type) {
    case 'search/SET_KEY_WORD':
      return {
        ...state,
        keyword: actions.payloads,
      };

    default:
      return state;
  }
};

export default search;
