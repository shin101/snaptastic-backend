import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { username, lastId }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return { ok: false, error: "User not found" };
      }
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
      const totalFollowers = await client.user.count({
        where: { following: { some: { username } } },
      });
      return {
        ok: true,
        followers,
      };
    },
  },
};
