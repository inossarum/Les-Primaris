import {createSlice} from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    postsData: [],
    postAuthorDatas: null,
    postSelectedPhotoToDownload: {},
    postSelectedPhotoPreview: "",
    status: "idle",
    error: null,
  },

  reducers: {
    getPostsById: (state, postId) => {
      state.postsData.find((post) => post.id === postId);
    },
    getPosts: (state, {payload}) => {
      state.postsData = payload;
    },
    getPostAuthorDatas: (state, {payload}) => {
      state.postAuthorDatas = payload;
    },
    createPost: (state, {payload}) => {
      state.postsData.push(payload);
    },
    editPost: (state, {payload}) => {
      state.postsData = state.postsData.map((post) => {
        if (post.id === payload[1]) {
          return {...post, message: payload[0]};
        } else {
          return {...post};
        }
      });
    },
    getPostSelectedPhotoToDownload: (state, {payload}) => {
      state.postSelectedPhotoToDownload = payload;
    },
    getPostSelectedPhotoPreview: (state, {payload}) => {
      state.postSelectedPhotoPreview = payload;
    },
    deletePost: (state, {payload}) => {
      state.postsData = state.postsData.filter((post) => post.id !== payload);
    },
    deleteComment: (state, {payload}) => {
      state.postsData = state.postsData.map((post) => {
        if (post.id === payload[0]) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== payload[0]
            ),
          };
        } else {
          return post;
        }
      });
    },
    addComment: (state, {payload}) => {
      state.postsData = state.postsData.map((post) => {
        if (post.id === payload[0]) {
          return {
            ...post,
            comments: payload[1],
          };
        } else {
          return post;
        }
      });
    },
    editComment: (state, {payload}) => {
      state.postsData = state.postsData.map((post) => {
        if (post.id === payload[0]) {
          return {
            ...post,
            comments: payload[1],
          };
        } else {
          return post;
        }
      });
    },
    addLike: (state, {payload}) => {
      state.postsData = state.postsData.map((post) => {
        if (post.id === payload[1]) {
          return {
            ...post,
            likers: [...post.likers, payload[0]],
          };
        } else {
          return post;
        }
      });
    },
    disLike: (state, {payload}) => {
      state.postsData = state.postsData.map((post) => {
        if (post.id === payload[1]) {
          return {
            ...post,
            likers: post.likers.filter((userId) => userId !== payload[0]),
          };
        } else {
          return post;
        }
      });
    },
  },
});

export const {
  getPosts,
  getPostAuthorDatas,
  createPost,
  editPost,
  getPostSelectedPhotoPreview,
  getPostSelectedPhotoToDownload,
  deletePost,
  deleteComment,
  addComment,
  editComment,
  addLike,
  disLike,
} = postSlice.actions;
export default postSlice.reducer;
