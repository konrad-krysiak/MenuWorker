const passOriginalUrlToTemplate = (app) => {
  app.use((req, res, next) => {
    app.locals.originalUrl = req.originalUrl;
    next();
  });
};

export { passOriginalUrlToTemplate };
