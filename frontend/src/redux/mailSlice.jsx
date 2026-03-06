import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    inbox: [],
    sent: [],
    isSideOpen: true,
  },
  reducers: {
    addSentMail: (state, action) => {
      state.sent.push(action.payload);
    },
    setInbox: (state, action) => {
      state.inbox = action.payload;
    },
    setSent: (state, action) => {
      state.sent = action.payload; 
    },
    setToggele : (state) =>{
      state.isSideOpen = !state.isSideOpen;
    }
  },
});

export const{addSentMail, setInbox, setSent, setToggele} = mailSlice.actions;
export default mailSlice.reducer;