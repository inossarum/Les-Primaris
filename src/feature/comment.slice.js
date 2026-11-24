import {createSlice} from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "comments",
  initialState: {
    commentsData: [],
    status: "idle",
    error: null,
  },

  reducers: {
    getCommentsById: (state, commentId) => {
      state.commentsData.find((comment) => comment.uid === commentId);
    },
    getComments: (state, {payload}) => {
      state.commentsData = payload;
    },
    createComment: (state, {payload}) => {
      state.commentsData.push(payload);
    },
    editComment: (state, {payload}) => {
      state.commentsData = state.commentsData.map((comment) => {
        if (comment.id === payload[1]) {
          return {...comment, message: payload[0]};
        } else {
          return {...comment};
        }
      });
    },
    deleteComment: (state, {payload}) => {
      state.commentsData = state.commentsData.filter(
        (comment) => comment.id !== payload
      );
    },

    addLike: (state, {payload}) => {
      state.commentsData = state.commentsData.map((comment) => {
        if (comment.id === payload[1]) {
          return {
            ...comment,
            likers: [...comment.likers, payload[0]],
          };
        } else {
          return comment;
        }
      });
    },
    disLike: (state, {payload}) => {
      state.commentsData = state.commentsData.map((comment) => {
        if (comment.id === payload[1]) {
          return {
            ...comment,
            likers: comment.likers.filter((userId) => userId !== payload[0]),
          };
        } else {
          return comment;
        }
      });
    },
  },
});

export const {
  getComments,
  createComment,
  editComment,
  deleteComment,
  addComment,
  addLike,
  disLike,
} = commentSlice.actions;
export default commentSlice.reducer;
