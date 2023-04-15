import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadCurrentArticle = createAsyncThunk(
  'currentArticle/loadCurrentArticle',
  async (articleId) => {
    const data = await fetch(`https://myclassr00m.herokuapp.com/api/articles/${articleId}`);
    const json = data.json();
    return json;
  }
);

export const currentArticleSlice = createSlice({
  name: 'currentArticle',
  initialState: {
    articles: [],
    article: null,
    isLoadingCurrentArticle: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
    .addCase(loadCurrentArticle.pending, (state) => {
      state.isLoadingCurrentArticle = true;
      state.hasError = false;
    })
    .addCase(loadCurrentArticle.fulfilled, (state, action) => {
      state.article = action.payload;
      state.hasError = false;
      state.isLoadingCurrentArticle = false
    })
    .addCase(loadCurrentArticle.rejected, (state) => {
      state.hasError = true;
      state.isLoadingCurrentArticle = false;
      state.article = {}
    })
  }
});
export const selectCurrentArticle = (state) => state.currentArticle.article;
export const isLoadingCurrentArticle = (state) => state.currentArticle.isLoadingCurrentArticle;
export default currentArticleSlice.reducer;
