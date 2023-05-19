import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

export const initialContacts = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const handleFulfilledGet = (state, { payload }) => {
  state.items = payload;
};

const handleFulfilledAdd = (state, { payload }) => {
  state.items.unshift(payload);
};

const handleFulfilledDelete = (state, { payload }) => {
  const index = state.items.findIndex(state => state.id === payload.id);
  state.items.splice(index, 1);
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const arrThunks = [fetchContacts, addContact, deleteContact];
const getAction = type => arrThunks.map(el => el[type]);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,

  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, handleFulfilledGet)
      .addCase(addContact.fulfilled, handleFulfilledAdd)
      .addCase(deleteContact.fulfilled, handleFulfilledDelete)
      .addMatcher(isAnyOf(...getAction('pending')), handlePending)
      .addMatcher(isAnyOf(...getAction('fulfilled')), handleFulfilled)
      .addMatcher(isAnyOf(...getAction('rejected')), handleRejected),
});

export const contactsReducer = contactsSlice.reducer;