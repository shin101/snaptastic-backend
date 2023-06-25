import client from "../../client";

export default {
  Query: {
    seePhotoComments: (_, { id }) => {
      // pagination
      client.comment.findMany({
        where: { photoId: id },
        orderBy: { createdAt: "asc" },
      });
    },
  },
};
