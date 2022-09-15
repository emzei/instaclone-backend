import client from "../../client";

export default {
  Query: {
    seeProfile: (_, { username }) =>
      client.user.findUnique({
        // findUnique searches unique field only
        where: {
          username,
        },
      }),
  },
};
