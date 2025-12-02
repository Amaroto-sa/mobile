const mem: Record<string, string> = {};

export default {
  setItem: async (key: string, value: string) => {
    mem[key] = value;
    return true;
  },
  getItem: async (key: string) => mem[key] ?? null,
  removeItem: async (key: string) => {
    delete mem[key];
  },
};
