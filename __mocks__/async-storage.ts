const mem: Record<string, string | null> = {};

export default {
  setItem: async (key: string, value: string) => {
    mem[key] = value;
  },
  getItem: async (key: string) => mem[key] ?? null,
  removeItem: async (key: string) => {
    delete mem[key];
  },
  clear: async () => {
    Object.keys(mem).forEach(k => delete mem[k]);
  },
};
