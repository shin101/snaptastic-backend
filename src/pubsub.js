import { PubSub } from "graphql-subscriptions";

// PubSub is not ideal for production. For production/scaling use Redis which is just like PubSub but also probably not free
const pubsub = new PubSub();

export default pubsub;
