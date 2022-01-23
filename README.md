# Rock, Paper, Scissors with a bad API (for Reaktor 2022)

Assignment part of the application for Reaktor's 2022 summer program.

This is the final version, consisting of a full-stack web application. The first try can be found [here](https://github.com/ernven/reaktor-2022/) and it contains all the first commits for the frontend application. More information about the solution can be found under [Project insights](#project-insights).


The app is working at the moment! [link](https://ev-reaktor-rps.azurewebsites.net/)

## How to run

If one wants to run this app themselves, a database is required. The scripts for table creation can be found inside the `backend` folder, `scripts` sub-folder.

Once that is done, on the backend side, a .env file must be created with the following environment variables:

`PORT`

`DATABASE_URL` - URL string for connecting to the database. If not, all details should be set separately (e.g. database name, url, username, password)

`BAD_API_URL` - With the url to the /rps/history endpoint of the bad-ap (more info on the assignment page).

One last variable needs to be set for both the backend **and** frontend!

`BAD_WS_URL` on backend.

`REACT_APP_WS_URL` on frontend.
    
  - Stores the websockets URL (can be found from the assignment page).

After all this is set up, the app can be run with:

    npm start

This is done once for the backend and once for the frontend (in each's root folder).

For deployment, a production build can be done with:

    npm run build
    
If a PaaS service like Heroku is being used, it's enough with building the frontend app and copying the folder into the backend, which can be used to serve it. Otherwise both can be built and another web server can be used (e.g. nginx).

If deploying the app, remember to set the environment variables for the backend! The previous ones plus one extra:

`NODE_ENV` - set to 'production'


## Project insights

I decided to also implement a backend for it because even after all the possible optimization, the performance of the frontend app by itself (using only the "bad" api) was unsatisfactory. This was due to the very large amount of data available and not being able to load it selectively. The data is also too much to be stored in LocalStorage, so it cannot even be cached.

This solution then takes the historical data from the bad-api into the backend and stores into a PostgreSQL database (hosted on Azure). The backend also takes updates from the websockets messages and updates the DB accordingly. This way, the frontend app only needs to query for the data it needs, basically all data for a single player at a time (and on top of this, it is only done on-demand).

This new backend contains two endpoints as well. `players` returns a list of players, which can be used by the frontend app to populate the dropdown menu. `data` returns the historical data **but** also allows to filter the results by a player's name.
These two were set up to meet the requirements of the application, but others could be created too, if we would want to perform some calculations on the backend side, for example. Stats are calculated on the frontend at the moment, but that doesn't seem to affect performance nor UX (it didn't even with the "bad" backend).

As mentioned already, I did not have too much time to do this (the backend and deployment were done in one afternoon), so the UI is functional but basic. It could definitely be improved, as well as extra features added.

### Technologies used

The technologies used for building the app were chosen for my familarity with them. I have only came across this assignment last week so I have not had plenty of time to do it, and I have had enough new things to learn during it to add unnecessary complexity on top.

These technologies are:

PostgreSQL for the database, as mentioned, running on Azure cloud.

Node.JS with express for the backend.
Queries are built using [knex](https://knexjs.org/). Websockets are implemented with the [ws](https://www.npmjs.com/package/ws) library.

The frontend is done with React (so, also in Javascript).
The UI is done using [Material-UI](https://mui.com/). The table component uses [https://www.ag-grid.com/] which is great for performance with large datasets (this works great even with the bad API!).
