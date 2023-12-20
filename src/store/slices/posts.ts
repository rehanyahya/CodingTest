import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {Pagination, Posts, PostsResponse} from '../types';
import axios from 'axios';

type PostsEntity = {
  ids: string[];
  entities: {[id: string]: Posts};
};

type PostType = {
  loading: boolean;
  data: PostsEntity;
  pagination: Pagination;
};

type PostRequestType = {
  limit: number;
  offset: number;
  searchText?: string;
};

const postsAdapter = createEntityAdapter({
  selectId: (post: Posts) => post.id,
});

const initialState: PostType = {
  loading: false,
  data: postsAdapter.getInitialState(),
  pagination: {count: 0, offset: 0, total_count: 0},
};

export const getPostsFromGiphyAction = createAsyncThunk<
  PostsResponse,
  PostRequestType
>('getPostsFromGiphyAction', async (payload, {rejectWithValue}) => {
  console.log(payload);
  try {
    const url = `${
      payload.searchText === ''
        ? `https://api.giphy.com/v1/gifs/trending?`
        : `https://api.giphy.com/v1/gifs/search?q=${payload.searchText}&`
    }api_key=hKd8RAuyG9yTm72kRFWoMZ7TrD4smRQk&limit=${payload.limit}&offset=${
      payload.offset
    }`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const postSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearPosts: state => {
      postsAdapter.removeAll(state.data);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPostsFromGiphyAction.pending, state => {
        state.loading = true;
      })
      .addCase(
        getPostsFromGiphyAction.fulfilled,
        (state, action: PayloadAction<PostsResponse>) => {
          state.loading = false;
          if (action.payload.pagination.offset === 0) {
            postsAdapter.setAll(state.data, action.payload.data);
          } else {
            postsAdapter.setMany(state.data, action.payload.data);
          }
          state.pagination = action.payload.pagination;
        },
      )
      .addCase(getPostsFromGiphyAction.rejected, state => {
        state.loading = false;
      });
  },
});

export const {clearPosts} = postSlice.actions;
export default postSlice.reducer;
