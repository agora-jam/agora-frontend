import create from 'zustand';

const useStore = create((set) => ({
  signer: null,
  provider: null,
  setSigner: (signer) => set(() => ({ signer })),
  setProvider: (provider) => set(() => ({ provider })),
}));

export default useStore;
