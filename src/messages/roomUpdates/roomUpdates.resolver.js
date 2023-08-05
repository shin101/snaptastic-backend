import pubsub from "../../../pubsub";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: () => pubsub.asyncIterator("New Message"),
    },
  },
};
