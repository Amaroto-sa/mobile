let storedPassword: string | null = null;

export const ACCESSIBLE = {
  WHEN_UNLOCKED: 'WHEN_UNLOCKED',
};

export const setGenericPassword = async (
  _username: string,
  password: string,
  _options?: any,
) => {
  storedPassword = password;
  return true;
};

export const getGenericPassword = async (_options?: any) => {
  if (!storedPassword) return false;
  return {username: 'session', password: storedPassword};
};

export const resetGenericPassword = async (_options?: any) => {
  storedPassword = null;
  return true;
};
