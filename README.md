# Firebase SendGrid
Source control for Account Transfer Feature

This project is to support the Handoff feature in the LeakSmart App.  It uses both Firebase and Sendgrid to provide the app an API endpoint to send Contractors and Clients handoff emails.

The source code in this repository is for the Firebase functions.

##Sendgrid

Sendgrid will handle the sending of the emails.  There are two templates that are set up in Sendgrid with handoff instructions. Firebase will access these by the template IDs.  The templates can be found at https://mc.sendgrid.com/dynamic-templates

Contractor Handoff Success - this is the email sent to the old email address that has been changed.

Client Handoff Success - this is the email sent to the new email address and will be the one used to access the account.

##Steps to Update Firebase Project
These are steps to modify and deploy this project to Firebase.

Clone the project and open a terminal in the Firebase_Sendgrid directory.

Install the Firebase Tools
> npm install -g firebase-tools

If you are not currently logged in you will need to login
> firebase login

Navigate to the functions folder
> cd functions

Install dependencies
> npm install @sendgrid/mail cors

Make any changes that are required to the file index.js

Deploy the code.
> firebase deploy

##Firebase Notes
In order to use the Firebase Cloud Functions the Firebase account does need to be on the Blaze (Pay as you go) plan.

The person that is deploying the code to Firebase will need both the "Editor" and "Cloud Functions Admin" roles.  These can be set by an account "Owner" in the admin panel at https://console.cloud.google.com/iam-admin/iam?authuser=0&project=account-transfer-30647

##Testing

This can be tested with a program such as Postman to send a POST to the endpoint https://us-central1-account-transfer-30647.cloudfunctions.net/sendAccountTransferEmails with the body {"newAccount":"YOUR_NEW_EMAIL","oldAccount":"YOUR_OLD_EMAIL"}

If you need to debug the function you can find the logs in the Firebase Console under Build -> Functions then navigate to the Logs tab. The link to this is https://console.firebase.google.com/project/account-transfer-30647/functions/logs?functionFilter=sendAccountTransferEmails(us-central1)&search=&severity=DEBUG

##Steps Used to Create Firebase Project
These are the steps that were used to create this project. All commands were run in a terminal starting in the base directory of the project.  These are included simply for reference and do not need to be followed again.

Install the Firebase tools
> npm install -g firebase-tools

Login - run this and follow the prompts including opening the link in a browser
> firebase login

Initialize the project - run this and select the project from Firebase then select JavaScript as the preferred language
> firebase init functions

Navigate to the functions folder
> cd functions

Install dependencies
> npm install @sendgrid/mail cors

Add the code to the index.js file.  Make sure to set the from email, email template id, and api keys.

Deploy the code.
> firebase deploy

Function endpoints can be found in the Firebase Console under Build -> Functions.  The endpoint created for this project is https://us-central1-account-transfer-30647.cloudfunctions.net/sendAccountTransferEmails