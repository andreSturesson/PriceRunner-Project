## Project proposal - PriceRunner Clone

### Brainstorming

- Webscrape popular sites for (name, price image etc..)
- Group them together by some id
- Search for item
- Compare prices
- Add to wishlist
- Authentication for storing wishlist

Example on similar websies:

https://www.pricerunner.se/

https://www.prisjakt.nu/

## Architecture

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

# Github repository

Empty github repository: https://github.com/andreSturesson/PriceRunner-Project

## How the webscraper should work ?

- Scraping the products page
- Click on product
- Extract information
- Dump CSV
- Repeat

Every 5 minutues (Cron JON)

- Push/Update database from CSV

## The ? mark

Everything that may change
