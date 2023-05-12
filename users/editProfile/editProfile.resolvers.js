import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";


export default {
  Mutation: {
    editProfile: async (_, {
      firstName, lastName, username, email, password:newPassword }, { loggedInUser }) => {
        console.log(loggedInUser)
        let hashedPw = null;
        if(newPassword){
          hashedPw = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where:{
            id: loggedInUser.id,
          }, 
          data:{
            firstName, lastName, username, email, ...(hashedPw && {password: hashedPw}),
          },
      });

      if(updatedUser.id){
        return {
          ok:true
        }
      } else {
        return {
          ok:false,
          error:"Could not update profile",
        }
      }
    },
  },
};
