import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeSuggested: protectedResolver((_, { offset }, { loggedInUser }) =>
      client.photo.findMany({
        take: 2,
        skip: offset,
        where: {
          user: {
            username: {
              in: [
                "surreal_images",
                "explore-california",
                "appleeee",
                "hello",
                "starrrr",
              ],
            },
          },
        },
        orderBy: { createdAt: "desc" },
      })
    ),
  },
};
