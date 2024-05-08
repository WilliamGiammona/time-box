import React from 'react';

function Legal() {
    return (
        <div className="my-10 mx-auto max-w-[600px]">
            <h1 className="text-lg font-bold mt-8">Privacy Policy</h1>
            <hr />
            <p className="text-sm">
                At EvoCal, we take your privacy seriously. This Privacy Policy
                explains how we collect, use, and protect your personal
                information when you use our calendar application.
            </p>

            <h1 className="text-lg font-bold mt-8">Information We Collect</h1>
            <hr />
            <p className="text-sm">
                Account Information: When you sign up for an EvoCal account, we
                collect your email address and encrypted password (if you choose
                to sign up with an email/password). If you choose to sign up
                using your Google or GitHub account, we access your name, email
                address, language preference, and profile picture from the
                respective provider.
                <br />
                <br />
                <span className="font-bold">Task/Event Data:</span> Any tasks or
                events you create within the EvoCal application are stored in
                our Firestore Database. This data is not encrypted.
            </p>

            <h1 className="text-lg font-bold mt-8">
                How We Use Your Information
            </h1>
            <hr />

            <p className="text-sm">
                We use the information we collect to provide, maintain, and
                improve the EvoCal service. Specifically, we use your
                information for the following purposes:
                <br />
                <br />
                <span className="font-bold">Account Management: </span>To create
                and manage your EvoCal account, and to provide you with access
                to the application.
                <br />
                <br />
                <span className="font-bold">Task/Event Management:</span> To
                store and retrieve the tasks and events you create within the
                application.
                <br />
                <br />
                <span className="font-bold">Communication:</span> To communicate
                with you about updates, security alerts, and other important
                information related to your account or the EvoCal service.
                <br />
                <br />
                <span className="font-bold">Analytics and Improvement:</span> To
                analyze usage trends and improve the performance, functionality,
                and user experience of the EvoCal application.
            </p>

            <h1 className="text-lg font-bold mt-8">
                Data Storage and Security
            </h1>
            <hr />
            <p className="text-sm">
                Your account information (email and encrypted password) is
                stored in our Firebase database. Task and event data is stored
                in our Firestore Database and is not encrypted. We implement
                industry-standard security measures to protect your personal
                information from unauthorized access, disclosure, alteration, or
                destruction. However, no method of data transmission or storage
                is 100% secure, and we cannot guarantee absolute security.
            </p>
            <h1 className="text-lg font-bold mt-8">Third-Party Services</h1>
            <hr />
            <p className="text-sm">
                If you choose to sign up or log in using your Google or GitHub
                account, we will access your name, email address, language
                preference, and profile picture from the respective provider. We
                do not store or have access to any other information from these
                third-party services.
            </p>
            <h1 className="text-lg font-bold mt-8">Retention and Deletion</h1>
            <hr />
            <p className="text-sm">
                We will retain your personal information for as long as
                necessary to provide the EvoCal service and comply with legal
                obligations. You can delete your EvoCal account at any time,
                which will remove your personal information from our systems.
            </p>
            <h1 className="text-lg font-bold mt-8">
                Changes to This Privacy Policy
            </h1>
            <hr />
            <p className="text-sm">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or legal requirements. The updated
                Privacy Policy will be effective upon posting, and we encourage
                you to review it periodically.
            </p>

            <p className="text-sm my-10">Last updated: 30th April 2024</p>
        </div>
    );
}

export default Legal;
