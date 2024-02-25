import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase';

interface User {
    email: string;
    password: string;
}

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        CredentialsProvider({
            name: 'Credentials',
            credentials: {},

            async authorize(credentials): Promise<User> {
                return await signInWithEmailAndPassword(
                    auth,
                    (credentials as { email?: string }).email || '',
                    (credentials as { password?: string }).password || ''
                )
                    .then((userCredential) => {
                        if (userCredential.user) {
                            return userCredential.user;
                        }

                        throw new Error('User not found'); // Throw an error if user is not found
                    })
                    .catch((error) => {
                        console.log(error);
                        throw error; // Throw the original error
                    });
            },
        }),
    ],
};
export default NextAuth(authOptions);
