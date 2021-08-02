# country-state-city.js


This is an implementation of a Node based API to get countries, states and cities.

The database is almost a copy from this [project](https://github.com/dr5hn/countries-states-cities-database). Since this is using PostgreSQL and not MySQL, during the conversion informations like column names are not guaranteed to be the same.

## Running

Use npm version >=7.6.0

```bash
cd src/
npm i
node app.js
```

## Running tests

Use npm version >=7.6.0

```bash
cd src/
npm test
```

## Docker
```bash
docker-compose up --force-recreate --build
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)