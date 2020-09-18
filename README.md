# Lethe React Application

This is a React implementation of the Lethe React Native application. It uses
the same GraphQL API on the backend (LetheAPI).

> This is a WIP, there is a lot of work left to do so be ready for changes.

## Development

Create a .env file in the root of your project and include the following env
variables:

REACT_APP_LETHE_API_URL='http://develop.localhost/graphql'
REACT_APP_LETHE_WS_URL='wss://develop.localhost/subscriptions'

> Examples given are for use with docker development container of Lethe API.

These should point to your implementation of the
[Lethe API](https://github.com/sbardian/letheapi).
