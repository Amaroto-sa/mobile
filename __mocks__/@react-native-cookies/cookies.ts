let store: Record<string, any> = {};

const CookieManager = {
  get: async (_url: string) => store,
  set: async (_url: string, cookie: any) => {
    store[cookie.name] = cookie;
  },
  setFromResponse: async (_url: string, value: string) => {
    store['session'] = {name: 'session', value};
    return true;
  },
  clearAll: async () => {
    store = {};
  },
};

export default CookieManager;
export {CookieManager};
