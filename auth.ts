import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { fireauth } from '@/app/firebase';

interface User {
    email: string;
    password: string;
}

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials): Promise<User | null> {
                try {
                    const userCredential: UserCredential =
                        await signInWithEmailAndPassword(
                            fireauth,
                            (credentials as { email?: string }).email || '',
                            (credentials as { password?: string }).password ||
                                ''
                        );

                    if (userCredential.user) {
                        return {
                            email: userCredential.user.email || '',
                            password:
                                (credentials as { password?: string })
                                    .password || '',
                        };
                    }
                } catch (error) {
                    console.log(error);
                }

                // Return null if user is not found
                return null;
            },
        }),
    ],
});
