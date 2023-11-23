import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { connectToDatabase } from "./lib/utils";
import { User } from "./lib/models";
import bcrypt from "bcrypt";

//fetch user and compare

const login = async (credentials) => {
    try {
        connectToDatabase();
        const user = await User.findOne({username: credentials.username})

        if(!user) throw new Error("Wrong credentials");
        console.log(await bcrypt.compare('123456', '123456'))
        const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
        //if(!isPasswordCorrect) throw new Error("Wrong credentials");
        return user;

    } catch(err) {
        console.log(err)
        throw new Error("Failed to login")
    }
}
// then return user down below

//with auth --> we can fetch our user
export const {signIn, signOut, auth} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user; //then NextAuth will take this user and pass it to session which is auth
                } catch(err) {
                    return null; //no user
                }
            }
        })
    ]
})