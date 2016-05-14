const MockStorage = {
  setItem: () => {
    return new Promise((resolve) => {
      resolve();
    });
  },

  getItem: () => {
    return new Promise((resolve) => {
      resolve();
    });
  },

  removeItem: () => {
    return new Promise((resolve) => {
      resolve();
    });
  },

  getAllKeys: () => {
    return new Promise((resolve) => {
      resolve([]);
    });
  }
};

export default MockStorage;
