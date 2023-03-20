# Donation API tutorial
This is a basic integration of Change's donation APIs in an application. Check out this blog post as a guide or use the code in this repo as a power up to getting started using Change!

## How to run locally
First, clone this repo:
```
git clone git@github.com/get-change/donation-api-tutorial
```

Copy the `.env.example` file into a file named .env:
```
cp .env.example .env
```

You will need a Change account in order to run this application. Sign up to receive a set of test API keys.
Once you sign up, add your API keys to `.env`:
```
CHANGE_PUBLIC_KEY=<replace-with-your-public-key>
CHANGE_SECRET_KEY=<replace-with-your-secret-key>
```

Now we're ready to start the server. To start the server, run:
```
npm run start
```

*NOTE:* please make sure you are using `Node v16` or greater.

Visit your browser at `localhost:3000` and ensure you see:
```
{
  message: 'Hello Change!'
}
```

Congrats! You're up and running!

Visit your Change dashboard and click "View test data" to see your API calls.