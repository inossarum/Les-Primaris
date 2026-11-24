import {createSlice} from "@reduxjs/toolkit";

export const moderatorThreadsSlice = createSlice({
  name: "threads",
  initialState: {
    threadsData: [],
    threadAuthorDatas: null,
    threadSelectedPhotoToDownload: {},
    threadSelectedPhotoPreview: "",
    status: "idle",
    error: null,
  },

  reducers: {
    getThreadsById: (state, threadId) => {
      state.threadsData.find((thread) => thread.id === threadId);
    },
    getThreads: (state, {payload}) => {
      state.threadsData = payload;
    },
    getThreadAuthorDatas: (state, {payload}) => {
      state.threadAuthorDatas = payload;
    },
    createThread: (state, {payload}) => {
      state.threadsData.push(payload);
    },
    editThread: (state, {payload}) => {
      state.threadsData = state.threadsData.map((thread) => {
        if (thread.id === payload[1]) {
          return {...thread, message: payload[0]};
        } else {
          return {...thread};
        }
      });
    },
    getThreadSelectedPhotoToDownload: (state, {payload}) => {
      state.threadSelectedPhotoToDownload = payload;
    },
    getThreadSelectedPhotoPreview: (state, {payload}) => {
      state.threadSelectedPhotoPreview = payload;
    },
    deleteThread: (state, {payload}) => {
      state.threadsData = state.threadsData.filter(
        (thread) => thread.id !== payload
      );
    },
    deleteComment: (state, {payload}) => {
      state.threadsData = state.threadsData.map((thread) => {
        if (thread.id === payload[0]) {
          return {
            ...thread,
            comments: thread.comments.filter(
              (comment) => comment._id !== payload[0]
            ),
          };
        } else {
          return thread;
        }
      });
    },
    addComment: (state, {payload}) => {
      state.threadsData = state.threadsData.map((thread) => {
        if (thread.id === payload[0]) {
          return {
            ...thread,
            comments: payload[1],
          };
        } else {
          return thread;
        }
      });
    },
    editComment: (state, {payload}) => {
      state.threadsData = state.threadsData.map((thread) => {
        if (thread.id === payload[0]) {
          return {
            ...thread,
            comments: payload[1],
          };
        } else {
          return thread;
        }
      });
    },
    addLike: (state, {payload}) => {
      state.threadsData = state.threadsData.map((thread) => {
        if (thread.id === payload[1]) {
          return {
            ...thread,
            likers: [...thread.likers, payload[0]],
          };
        } else {
          return thread;
        }
      });
    },
    disLike: (state, {payload}) => {
      state.threadsData = state.threadsData.map((thread) => {
        if (thread.id === payload[1]) {
          return {
            ...thread,
            likers: thread.likers.filter((userId) => userId !== payload[0]),
          };
        } else {
          return thread;
        }
      });
    },
  },
});

export const {
  getThreads,
  getThreadAuthorDatas,
  createThread,
  editThread,
  getThreadSelectedPhotoPreview,
  getThreadSelectedPhotoToDownload,
  deleteThread,
  deleteComment,
  addComment,
  editComment,
  addLike,
  disLike,
} = moderatorThreadsSlice.actions;
export default moderatorThreadsSlice.reducer;
