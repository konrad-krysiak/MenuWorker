import "../bootstrap";
import Queue from "bull";

import * as jobs from "../jobs";
import redisConfig from "../config/redis";
import winstonLogger from "./logger";

const env = process.env.NODE_ENV || "development";
console.log("QUEUE ENVIRONMENT: ", redisConfig[env]);

// Map through jobs and start start queue for each of them
const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, { redis: redisConfig[env] }),
  name: job.key,
  options: job.options,
  handle: job.handle,
}));

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find((q) => q.name === name);
    if (queue) {
      winstonLogger.info(`Job ${name} has been added.`);
      queue.bull.add(data, queue.options);
    }
  },

  process() {
    return this.queues.forEach((queue) => {
      winstonLogger.info(`Queue ${queue.name} has been started.`);
      queue.bull.process(queue.handle);
      queue.bull.on("failed", (job, err) => {
        console.error("Job failed ", job.name, job.data, err);
      });
      queue.bull.on("error", (error) => {
        winstonLogger.error(error);
      });
    });
  },
};
