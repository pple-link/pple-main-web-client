const SET_COMMENT = 'comment/SET_COMMENT' as const;

export const setComment = (comment: string) => ({
  type: SET_COMMENT,
  payload: comment,
});

type CommentAction = ReturnType<typeof setComment>;

type CommentState = {
  comment: string;
};

const initialState: CommentState = {
  comment: '',
};

const comment = (
  state: CommentState = initialState,
  action: CommentAction,
): CommentState => {
  switch (action.type) {
    case SET_COMMENT:
      return {
        ...initialState,
        comment: action.payload,
      };

    default:
      return state;
  }
};

export default comment;
