const modelFactory = {
  sessionUser: ({ id, username, email, phone }) => ({
    id, username, email, phone,
  }),
};

export default modelFactory;
