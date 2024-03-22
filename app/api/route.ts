// import { google } from 'googleapis';
// const oauth2Client = new google.auth.OAuth2({
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     redirectUri: 'http://localhost:3000/', // e.g., http://localhost:3000/oauth2callback
// });

// // Generate a url that asks permissions for the Calendar scope
// const scopes = ['https://www.googleapis.com/auth/calendar.readonly'];

// export const url = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: scopes,
// });

// // Visit the URL for the Google login and permissions prompt.

// // After obtaining an authorization code, exchange it for an access token
// oauth2Client.getToken('YOUR_AUTHORIZATION_CODE', (err, token) => {
//     if (err) return console.error('Error retrieving access token', err);
//     oauth2Client.setCredentials(token);

//     // Now you can use the Calendar API
//     const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
//     calendar.events.list(
//         {
//             calendarId: 'primary',
//             timeMin: new Date().toISOString(),
//             maxResults: 10,
//             singleEvents: true,
//             orderBy: 'startTime',
//         },
//         (err, res) => {
//             if (err) return console.log('The API returned an error: ' + err);
//             const events = res.data.items;
//             if (events.length) {
//                 console.log('Upcoming 10 events:');
//                 events.map((event, i) => {
//                     const start = event.start.dateTime || event.start.date;
//                     console.log(`${start} - ${event.summary}`);
//                 });
//             } else {
//                 console.log('No upcoming events found.');
//             }
//         }
//     );
// });
