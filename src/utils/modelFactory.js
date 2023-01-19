const modelFactory = {
  sessionUser: ({ id, name, email, phone }) => ({
    id,
    name,
    email,
    phone,
  }),
};

export default modelFactory;
