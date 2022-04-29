import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatShow: false,
  },
  reducers: {
    changeShow: (state, action) => {
      console.log(action);
      state.chatShow = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeShow } = chatSlice.actions;

export default chatSlice.reducer;
