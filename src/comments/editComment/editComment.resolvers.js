import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editComment: protectedResolver(
      async (_, { id, payload }, { loggedInUser }) => {
        const oldComment = await client.comment.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!oldComment) {
          return {
            ok: false,
            error: "Comment not found",
          };
        } else if (oldComment.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "Not authorized",
          };
        } else {
          await client.comment.update({ where: { id }, data: { payload } });
          return {
            ok: true,
          };
        }
      }
    ),
  },
};
