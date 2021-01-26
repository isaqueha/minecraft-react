import create from 'zustand';

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create((set) => ({
  cubes: getLocalStorage('world') || [
    { pos: [0, 1, 0], texture: 'wood' },
    { pos: [0, 2, 0], texture: 'dirt' },
    { pos: [1, 1, 0], texture: 'grass' },
    { pos: [-1, 1, 0], texture: 'glass' },
    { pos: [0, 3, 0], texture: 'log' },
  ],
  addCube: (x, y, z, texture) =>
    set((state) => ({
      cubes: [...state.cubes, { pos: [x, y, z], texture }],
    })),
  removeCube: (x, y, z) =>
    set((state) =>
      state.cubes.filter((cube) => cube.x !== x || cube.y !== y || cube.z !== z)
    ),
  texture: 'wood',
  setTexture: (texture) => set((state) => ({ texture })),
  saveWorld: () =>
    set((state) => {
      setLocalStorage('world', state.cubes);
    }),
}));