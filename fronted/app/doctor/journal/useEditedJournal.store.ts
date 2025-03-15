import { create } from "zustand";

interface EditJournal {
  editedJournal: {};
  setEditedJournal: (passedBoolean: object) => void;
}

const useEditedJournal = create<EditJournal>((set) => ({
  editedJournal: {},
  setEditedJournal: (passedJournal: object) => set({
    editedJournal: passedJournal
  }),
}));

export default useEditedJournal;
