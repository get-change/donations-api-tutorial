# Donations API tutorial
This is a basic integration of [Change](https://getchange.io) donations API in an application.

Check out [this blog post](https://docs.getchange.io/recipes/donations-tutorial) as a guide or use the code in this repo as a power up to getting started using Change!

And for more APIs from Change check out our [docs](https://docs.getchange.io/getting-started).

## How to run locally
First, clone this repo:
```
git clone git@github.com/get-change/donation-api-tutorial
```

Copy the `.env.example` file into a file named .env:
```
cp .env.example .env
```

You will need a Change account in order to run this application. [Sign up](https://api.getchange.io/sign_in) to receive a set of test API keys.
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
  message: "Hello Change!"
}
```

Congrats! You're up and running!

Visit your [Change dashboard](https://api.getchange.io/developers) and click "View test data" to see your donations.
