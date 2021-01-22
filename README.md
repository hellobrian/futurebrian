# futurebrian

## Development

```bash
# Run the backend server in development
cd futurebrian/backend
yarn develop

# Run frontend code in development
cd ../frontend
yarn dev
```

## How to build & deploy

```bash
# Run the backend server
cd futurebrian/backend
yarn build && yarn start

# Build frontend code, build command runs "next build" and "next export"
cd ../frontend
yarn build

# While in frontend, deploy to netlify.
# deploys the "out" folder to netlify production
# config is defined in netlify.toml
ntl deploy --prod
```
