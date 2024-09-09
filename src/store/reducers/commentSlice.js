import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentApi from '../../utils/api/commentApi';


export const fetchComments = createAsyncThunk('comments/fetchComments', async (productId) => {
  const data = await commentApi.getComments(productId);
  const comments = data.comments;
  const productRating = data.productRating ;
  return {comments,productRating};
});

export const createComment = createAsyncThunk('comments/createComment', async (model) => {
  const createdProduct = await commentApi.addComment(model);
  return createdProduct;
});

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comments: [],
    loading: false,
    error: false,
    status: 'idle'
  },
  reducers: {
    setLoad: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export const {
  setLoad,
  setError,
} = commentSlice.actions;
export const selectLoading = (state) => state.comment.loading;
export const selectError = (state) => state.comment.error;
export const selectComments = (state) => state.comment.comments;

export default commentSlice.reducer;
