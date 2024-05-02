import {createSlice} from "@reduxjs/toolkit";
import {Conversation} from "../interface/SessionObjectInterfaces";

interface log {
  conversation: Conversation[];
}

const initialState: log = { conversation: [] };

const conversationSlice = createSlice({
  name: "ADD_MESSAGE",
  initialState,
  reducers: {
    AddMessage(state, action) {
      const { newMessage } = action.payload;
      if ( newMessage != null ) {
        state.conversation.push(newMessage);
      }
    },
    ClearMessages(state) {
      state.conversation = [];
    },
  },
});

export default conversationSlice.reducer;
export const conversationActions = conversationSlice.actions;
