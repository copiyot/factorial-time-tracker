## Installation

```bash
$ yarn install
```

## Running the app

```bash
# migrations
$ yarn typeorm -- migration:generate ./src/migrations/PostRefactoring
```

```bash
# development
$ yarn run watch
$ yarn run dev
```

## Database

The moment you run the back end application a DB file will be created in the root folder for persistence.
