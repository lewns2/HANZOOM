import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Axios } from '../core/axios';

export const getChatInfo = createAsyncThunk('GET/CHATINFO', async () => {
  const token = sessionStorage.getItem('jwt-token');
  // const response = await Axios.get('/chat/findAll', {
  const response = await Axios.get('/chat/findAll', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const getChatMessageInfo = createAsyncThunk('GET/CHATMESSAGEINFO', async () => {
  const response = await Axios.get(`/chat/find/${chatRoomId}`);
  return response.data;
});

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatShow: false,
    chatInfo: [],
    chatRoomId: '',
    chatMessageInfo: [],
  },
  reducers: {
    changeShow: (state, action) => {
      // console.log(action);
      state.chatShow = action.payload;
    },
    setRoomId: (state, action) => {
      state.chatRoomId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatInfo.fulfilled, (state, action) => {
        state.chatInfo = action.payload;
      })
      .addCase(getChatMessageInfo.fulfilled, (state, action) => {
        state.chatMessageInfo = action.payload;
      });
  },
});


// Action creators are generated for each case reducer function
export const { changeShow, setRoomId } = chatSlice.actions;

export default chatSlice.reducer;
