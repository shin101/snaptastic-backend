import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      // check if user we're about to follow exists
      const ok = await client.user.findUnique({ where: { username } });
      if (!ok) {
        return {
          ok: false,
          error: "That user does not exist",
        };
      }
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          following: {
            connect: {
              username,
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
