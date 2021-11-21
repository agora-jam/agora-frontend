import create from 'zustand';

const useStore = create((set) => ({
  signer: null,
  provider: null,
  account: null,
  setAccount: (account) => set({ account }),
  setSigner: (signer) => set(() => ({ signer })),
  setProvider: (provider) => set(() => ({ provider })),
}));

export default useStore;
