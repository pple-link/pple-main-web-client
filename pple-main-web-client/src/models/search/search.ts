const SET_KEYWORD = 'search/SET_KEYWORD' as const;
const SET_BLOOD_PRODUCT = 'search/SET_BLOOD_PRODUCT' as const;
const SET_ABO = 'search/SET_ABO' as const;

export const setKeyword = (keyword: string) => ({
  type: SET_KEYWORD,
  payload: keyword,
});

export const setBloodProduct = (bloodProduct: string) => ({
  type: SET_BLOOD_PRODUCT,
  payload: bloodProduct,
});

export const setAbo = (abo: string) => ({
  type: SET_ABO,
  payload: abo,
});

type SearchAction =
  | ReturnType<typeof setKeyword>
  | ReturnType<typeof setBloodProduct>
  | ReturnType<typeof setAbo>;

type SearchState = {
  keyword: string;
  bloodProduct: string;
  abo: string;
};

const initialState: SearchState = {
  keyword: '',
  bloodProduct: '',
  abo: '',
};

const search = (
  state: SearchState = initialState,
  action: SearchAction,
): SearchState => {
  switch (action.type) {
    case SET_KEYWORD:
      return {
        ...initialState,
        keyword: action.payload,
      };

    case SET_BLOOD_PRODUCT:
      return {
        ...initialState,
        bloodProduct: action.payload,
      };

    case SET_ABO:
      return {
        ...initialState,
        abo: action.payload,
      };
    default:
      return state;
  }
};

export default search;
