# Deployment Via Heroku

## Get your app connected to heroku:

1. Create a new heroku app
2. `heroku git:remote -a {HEROKU APP NAME HERE}` (get your app name from your heroku dashboard)
3. Deploy by doing `git push heroku master`...or you can connect your heroku app to your github repo in the "Deployment" tab of your heroku dashboard, and then you can actually manage deployment from your heroku dashboard (instead of from the command line)

---

## Production settings

1. Provision "Heroku Postgres" add-on in "Resources" tab in your heroku dashboard
2. Use environment variable for database URI (in your code)
3. Use environment variable for server port (in your code)
4. If you need to, you can also use the `NODE_ENV` environment variable which will be `"production"` by default in heroku
5. If you've got API keys and/or other "secrets", add those to your "Config Variables" in the "Settings" tab in your heroku dashboard

---

## Manage your remote database

You can connect using the same URI that heroku uses! Go grab it from the "Settings" tab in your heroku dashboard (in the "Config Variables" section you will need to click to reveal). For example, you can copy and paste the information into Postico.

---

## Useful commands

- `heroku logs`: view the logs for you heroku app
- `heroku logs --tail`: view a continuous feed of the most recent logs from your heroku app
- `heroku run bash`: connect to your heroku app via the terminal, so that you can run any commands *directly* on your heroku "machine" (dyno is the word they use)
