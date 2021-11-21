import create from 'zustand';

const useStore = create((set) => ({
  signer: null,
  genericProvider: null,
  account: null,
  setAccount: (account) => set({ account }),
  setSigner: (signer) => set(() => ({ signer })),
  setGenericProvider: (provider) => set(() => ({ provider })),
}));

export default useStore;
