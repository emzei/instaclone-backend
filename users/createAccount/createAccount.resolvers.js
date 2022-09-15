import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        // check if username or email are already on DB
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username, // <=> username:username
              },
              {
                email,
              },
            ],
          },
        });

        if (existingUser) {
          throw new Error("This username/email is already taken.");
        }
        // hash password
        const uglyPassword = await bcrypt.hash(password, 10); //e.g.$2b$10$GO0aAlW9G0WTPhWhsMnff.pC64.iMp5ae29UG/7Erfg9EJk30voVK

        // save and return the user - using waiting property
        return client.user.create({
          data: {
            username,
            firstName,
            lastName,
            email,
            password: uglyPassword,
          },
        });
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};

