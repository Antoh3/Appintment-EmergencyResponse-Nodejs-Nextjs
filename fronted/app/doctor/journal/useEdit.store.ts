import { create } from "zustand";

interface IsEditing {
  isEditing: boolean;
  setIsEditing: (passedBoolean: boolean) => void;
}

const useIsEditing = create<IsEditing>((set) => ({
  isEditing: false,
  setIsEditing: (passedBoolean: boolean) => set({
    isEditing: passedBoolean
  }),
}));

export default useIsEditing;
