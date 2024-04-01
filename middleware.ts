import { auth } from './auth';

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth; //bool is logged in
    console.log('ROUTE: ', req.nextUrl.pathname);
    console.log(isLoggedIn);

    if (!isLoggedIn && nextUrl.pathname.startsWith('/calendar')) {
        return Response.redirect(new URL('/', nextUrl));
    }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
