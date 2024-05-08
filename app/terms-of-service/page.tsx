import React from 'react';

function TermsOfService() {
    return (
        <div className="py-10 my-10 mx-auto max-w-[800px]">
            <h1 className="text-4xl font-bold mt-8 py-4 bg-gradient-to-r from-purple-500 to-purple-300 text-transparent bg-clip-text">
                Terms of Service
            </h1>
            <h1 className="text-lg font-bold mt-4">Introduction</h1>
            <hr className="my-1" />
            <p className="text-sm">
                Welcome to EvoCal! These Terms of Service (“Terms”) outline the
                rules and guidelines for using our calendar application. By
                accessing or using EvoCal, you agree to comply with these Terms.
                If you do not agree with any part of these Terms, please refrain
                from using our service.
            </p>{' '}
            <h1 className="text-lg font-bold mt-8">User Responsibilities</h1>
            <hr className="my-1" />
            <ol className="list-decimal text-sm">
                <li>
                    <span className="font-bold">Legitimate Use:</span> EvoCal is
                    designed for legitimate users who want to organize their day
                    efficiently. You agree not to misuse our service by creating
                    fake bot accounts, generating fraudulent tasks, or
                    exploiting any vulnerabilities.
                </li>
                <br />
                <br />
                <li>
                    <span className="font-bold">Termination Rights:</span> We
                    reserve the right to terminate any user account at our
                    discretion if they violate these Terms. This includes cases
                    of abuse, fraudulent activity, or any behavior that harms
                    other users or the service itself.
                </li>
            </ol>
            <h1 className="text-lg font-bold mt-8">
                Account Creation and Authentication
            </h1>
            <hr className="my-1" />
            <ol className="text-sm list-decimal">
                <li>
                    <span className="font-bold">Login Options:</span> <br />
                    <ul className="list-disc pl-4 my-4">
                        <li>
                            <span className="font-bold">Email/Password:</span>{' '}
                            You can create an account using your email and a
                            secure password. We encrypt email/password
                            credentials for your protection.
                        </li>
                        <li>
                            <span className="font-bold">Google Account:</span>{' '}
                            You may choose to log in via your Google account.
                            Google handles the authentication process, and we
                            only access surface-level information such as your
                            name, email address, language preference, and
                            profile picture.
                        </li>
                        <li>
                            <span className="font-bold">GitHub Account:</span>{' '}
                            Similarly, GitHub handles authentication, and we
                            retrieve minimal data from your GitHub account.
                        </li>
                    </ul>
                </li>

                <li>
                    <span className="font-bold">Data Storage:</span>
                    <ul className="list-disc pl-4 my-4">
                        <li>
                            <span className="font-bold">
                                Email/Password Users:
                            </span>{' '}
                            Your account details are stored securely in our
                            Firebase database.
                        </li>{' '}
                        <li>
                            <span className="font-bold">
                                Google/GitHub Users:{' '}
                            </span>
                            Authentication data remains with Google and GitHub.
                            We do not store sensitive information from these
                            providers.
                        </li>
                    </ul>
                </li>
            </ol>
            <h1 className="text-lg font-bold mt-8"> Task and Event Storage </h1>
            <hr className="my-1" />
            <ol className="list-decimal text-sm">
                <li>
                    <span className="font-bold">Firestore Database:</span>{' '}
                </li>
                <ul className="list-disc pl-4 my-4">
                    <li>
                        Tasks and events you create are stored in our Firestore
                        Database.
                    </li>{' '}
                    <li>
                        Please note that this data is not encrypted. However, we
                        take security measures to protect it from unauthorized
                        access.
                    </li>
                </ul>
            </ol>
            <h1 className="text-lg font-bold mt-8"> Privacy and Data Usage</h1>
            <hr className="my-1" />
            <ol className="list-decimal text-sm">
                <li>
                    <span className="font-bold">Privacy Policy:</span>
                </li>{' '}
                <ul className="list-disc pl-4 my-4">
                    <li>
                        For detailed information on how we handle user data,
                        please refer to our Privacy Policy.
                    </li>
                    <li>
                        We respect your privacy and strive to maintain
                        transparency regarding data collection and usage.
                    </li>
                </ul>
            </ol>
            <h1 className="text-lg font-bold mt-8"> Changes to Terms </h1>
            <hr className="my-1" />
            <ol className="list-decimal text-sm">
                <li>
                    <span className="font-bold">Updates:</span>
                </li>

                <ul className="list-disc pl-4 my-4">
                    <li>
                        We may update these Terms periodically. Any changes will
                        be effective upon posting.
                    </li>{' '}
                    <li>
                        It is your responsibility to review the Terms regularly.
                    </li>
                </ul>
            </ol>
            <p className="my-10 text-sm">
                Thank you for choosing EvoCal! Let’s make organizing your day a
                breeze. 📅
            </p>
        </div>
    );
}

export default TermsOfService;
