import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Axios } from '../core/axios';

export const getUserInfo = createAsyncThunk('GET/USERINFO', async () => {
  const token = sessionStorage.getItem('jwt-token');
  const response = await Axios.get('/users/find/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //   console.log(response.data);
  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: [],
    code: '',
    loginType: '',
    beforeLogin: 'false',
  },
  reducers: {
    clearUser: (state) => {
      state.userInfo = [];
      state.loginType = '';
      sessionStorage.removeItem('jwt-token');
    },
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setLoginType: (state, action) => {
      state.loginType = action.payload;
    },
    setBeforeLogin: (state, action) => {
      state.beforeLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      console.log(state.userInfo);
    });
  },
});

// Action creators are generated for each case reducer function
export const { clearUser, setCode, setLoginType, setBeforeLogin } = userSlice.actions;

export default userSlice.reducer;
