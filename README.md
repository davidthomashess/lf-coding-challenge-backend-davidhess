# Getting Started

Select the "<> Code" button and select the "Codespaces" tab.

Click the button "Create codespace on ".

Run 'npm install' in the Codespaces terminal:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Click the "Open in Browser" popup to see the page. (Visit localhost:3000 if running locally on your workstation)

_You can open the Dev Tools console to verify that the submit function captured your input information._

_You can also verify your submitted data successful in the terminal where you executed 'npm run dev'_

# Postman Plugin

You can test GET and POST requests using the Postman Plugin provided in the GitHub Codespace.

Click the plugin and sign in (Note: You may need to use Postman's authorization token to sign in with GitHub Codespace)

Click on "New HTTP Request" and you should see the Postman GUI in one of your Codespace tabs.

## Postman GET request (GET /api/supervisors)

Ensure "GET" is selected for your Send request.

Insert the following URL: http://localhost:3000/api/supervisors

Click send and view your results in the "Body" tab.

## Postman POST request (POST /api/submit)

Ensure "POST" is selected for your Send request.

Insert the following URL: http://localhost:3000/api/submit

Select the "Body" under the URL input.

Select the "raw" tab and insert the following:

```
{
    "firstName":"First",
    "lastName":"Last",
    "email":"FLast@example.com",
    "phone":"(###) ###-####",
    "supervisor":"h - Hoppe, Lisa"
}
```

Click send and view your results in the "Body" tab and within the Terminal where you executed "npm run dev".

## About the Project

The application is dockerized with Visual Studio Code Dev Containers.

This web application was built with the Next.js React framework, TypeScript for type safety, and Tailwind CSS for styling elements.
