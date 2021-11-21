import create from 'zustand';

const useStore = create((set) => ({
  signer: null,
  provider: null,
  publicProvider: null,
  setSigner: (signer) => set(() => ({ signer })),
  setProvider: (provider) => set(() => ({ provider })),
  setPublicProvider: (publicProvider) => set(() => ({ publicProvider })),
}));

export default useStore;
