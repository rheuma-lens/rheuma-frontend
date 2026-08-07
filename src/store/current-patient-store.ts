import { create } from "zustand";

import type { Patient } from "@/types";

interface CurrentPatientState {
  patient: Patient | null;
  setPatient: (patient: Patient) => void;
  clearPatient: () => void;
}

export const useCurrentPatientStore = create<CurrentPatientState>((set) => ({
  patient: null,
  setPatient: (patient) => set({ patient }),
  clearPatient: () => set({ patient: null }),
}));
