import Cloud from "@google-cloud/storage";

const { Storage } = Cloud;
const storage = new Storage({
  projectId: "ancient-yeti-377119 ",
  keyFilename: "ancient-yeti-377119-7ec8e5bec307.json",
});

export default storage;
