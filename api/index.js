const data = [
  {
    id: 1,
    name: 'foo'
  },
  {
    id: 2,
    name: 'baz'
  }
];

export const getList = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};
