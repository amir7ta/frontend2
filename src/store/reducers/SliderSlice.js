import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import sliderApi from '../../utils/api/sliderApi';

export const fetchSliders = createAsyncThunk(
  'sliders/fetchSliders',
  async (filterRequest, { rejectWithValue }) => {
    
    try {
      const defaultParams = {
        title: '',
        page: 1,
        sliderType: ''
      };
      const combinedParams = { ...defaultParams, ...filterRequest };

      const sliders = await sliderApi.getSliders(combinedParams);
      return sliders;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createSlider = createAsyncThunk(
  'sliders/createSlider',
  async (slider, { rejectWithValue }) => {
    try {
      const createdSlider = await sliderApi.addSlider(slider);
      return createdSlider;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateExistingSlider = createAsyncThunk(
  'sliders/updateExistingSlider',
  async ({ sliderId, slider }, { rejectWithValue }) => {
    try {
      const updatedSlider = await sliderApi.updateSlider(sliderId, slider);
      return updatedSlider;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeSlider = createAsyncThunk(
  'sliders/removeSlider',
  async (sliderId, { rejectWithValue }) => {
    try {
      const deletedSlider = await sliderApi.deleteSlider(sliderId);
      return deletedSlider;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const sliderSlice = createSlice({
  name: 'slider',
  initialState: {
    sliders: [],
    loading: false,
    error: null,
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
      .addCase(fetchSliders.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSliders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sliders = action.payload;
        state.loading = false;
      })
      .addCase(fetchSliders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        state.loading = false;
      })
      .addCase(createSlider.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSlider.fulfilled, (state, action) => {
        state.sliders.push(action.payload);
        state.loading = false;
      })
      .addCase(createSlider.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })
      .addCase(updateExistingSlider.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExistingSlider.fulfilled, (state, action) => {
        const index = state.sliders.findIndex(slider => slider.id === action.payload.id);
        if (index !== -1) {
          state.sliders[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateExistingSlider.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })
      .addCase(removeSlider.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeSlider.fulfilled, (state, action) => {
        state.sliders = state.sliders.filter(slider => slider.id !== action.payload.id);
        state.loading = false;
      })
      .addCase(removeSlider.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      });
  },
});

export const { setLoad, setError } = sliderSlice.actions;
export const selectLoading = (state) => state.slider.loading;
export const selectError = (state) => state.slider.error;
export const selectSliders = (state) => state.slider.sliders;

export default sliderSlice.reducer;
