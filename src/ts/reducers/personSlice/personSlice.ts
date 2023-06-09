import { createSlice } from "@reduxjs/toolkit";
import type {
  AddPersonAction,
  RemovePersonAction,
  Persons,
  AddItemAction,
  DecreaseItemAction,
  IncreaseItemAction,
} from "./types";
import { clearAll, loadFromLocalStorage } from "../../actions";

const initialState: Persons = {};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    addPerson(state, action: AddPersonAction) {
      const { id = Date.now(), name, items = {} } = action.payload;
      state[id] = { name, items };
    },
    removePerson(state, action: RemovePersonAction) {
      delete state[action.payload];
    },
    addItem(state, action: AddItemAction) {
      const { personId, itemId } = action.payload;
      state[personId].items[itemId] = 1;
    },
    decreaseItem(state, action: DecreaseItemAction) {
      const { personId, itemId } = action.payload;
      const curr = state[personId].items[itemId];
      if (curr > 0) state[personId].items[itemId] -= 1;
      else delete state[personId].items[itemId];
    },
    increaseItem(state, action: IncreaseItemAction) {
      const { personId, itemId } = action.payload;
      state[personId].items[itemId] += 1;
    },
  },
  extraReducers: builder => {
    builder.addCase(clearAll, () => initialState);
    builder.addCase(loadFromLocalStorage, () => {
      const data = JSON.parse(localStorage.getItem("persons") as string);
      if (data) {
        return data;
      }
    });
  },
});

export const { addPerson, addItem, removePerson } = personSlice.actions;
export default personSlice.reducer;
