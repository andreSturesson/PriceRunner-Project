## Project proposal - PriceRunner Clone

### How to run the project?

### Production Mode (Docker)

1. Ensure Docker is installed on your machine.

2. Open a terminal and navigate to the project directory:

```
git clone git@github.com:andreSturesson/PriceRunner-Project.git
```

3. Run the following command to start the project in production mode:

```
docker-compose up
```

### Development Mode

#### Backend

1. Ensure .NET is installed on your machine.

2. Start the backend server using the following command:

```
dotnet watch run
```

#### Frontend

1. Install the required dependencies by running the following command:

```
npm install
```

3. Start the React project in development mode:

```
npm run dev
```

Now you can access the project in your browser at the specified localhost address.

### How do access the project ?

Front-end is accesible at: ` localhost:4173`

Backend is accesible at: `localhost:5000/swagger`

Database is at port: `5143`

# Architecture

### Front-end

- React
- Mantine / Tailwind
- Axios
- React router
- State management

### Back-end

- C# minimal api
- PostgreSQL

### Webscraper ?

- Python, headless browser ?

### Other tools

- Docker
- Jira / Github issues
- CI/CD pipeline (Jenkins, Ansible & Self hosted server)

## Core

- List avalible products
- Search for a product
- Sort by price, alphabetically, category (support backend)
- Authentication
- Wishlist

## Extensions

- Webscraper (fetching real data) (Elgiganten)
- See similar items (by category)
- Price history

## Notes

### Development

Development will use agile principles with an kanban board in jira.

### Deployment

Would be deployed locally, on premises on a linux server VM using containerization. Jenkins will be used for CI pipelines. Ansible for orchestration and docker for deployment. Since most of the architecture is already in place, it would be quite hasslefree to setup. The CD pipeline would be executed when an merge to prod is issued and deployed and would be integrating with both jira and github

## How the webscraper should work ?

- Scraping the products page
- Click on product
- Extract information
- Dump CSV
- Repeat

Every 5 minutues (Cron JON)

- Push/Update database from CSV

## The ? mark

Everything that may chang

# Link to base-dataset

`https://nc.asturesson.se/s/FY4iY7Nt8sjWKyP?`
