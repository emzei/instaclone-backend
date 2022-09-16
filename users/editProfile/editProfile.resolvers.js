import fs from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
const resolverFn = async (
  _,
  { firstName, lastName, username, email, bio, avatar, password: newPassword },
  { loggedInUser }
) => {
  const { filename, createReadStream } = await avatar;
  const avatarPath=process.cwd()+'/uploads/'+filename;

  const readStream = createReadStream();
  const writeStream = fs.createWriteStream(avatarPath);
  readStream.pipe(writeStream);

  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }

  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio, 
      avatar: avatarPath,
      ...(uglyPassword && { password: uglyPassword }),
    },
  });

  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "could not update profile",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
