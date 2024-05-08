import { auth } from './auth';
import { getSession } from 'next-auth/react';

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth; //bool is logged in

    if (!isLoggedIn && nextUrl.pathname.startsWith('/calendar')) {
        return Response.redirect(new URL('/', nextUrl));
    }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

export const getServerSideProps = async (context) => {
    const session = await getSession(context);

    return {
        props: {
            session,
        },
    };
};
