import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    roomId: null,
    count: 1,
  },
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
    increaseCount: (state,action) => {
      state.count = state.count+1;
      return state.count;
    }
  },
});

export const {enterRoom} = appSlice.actions;
export const {increaseCount} = appSlice.actions;
export const selectRoomId = state => state.app.roomId;
export default appSlice.reducer;
