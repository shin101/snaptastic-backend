import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeSuggested: protectedResolver((_, { offset }) =>
      client.photo.findMany({
        // take: 2,
        skip: offset,
        where: {
          user: {
            username: {
              in: [
                "NY-Life",
                "inspo-quotes",
                "explore-california"
              ],
            },
          },
        },
        orderBy: { createdAt: "desc" },
      })
    ),
  },
};
