# Azul Docs

This is the project documentation for Azul.

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are
reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static
contents hosting service.

## Deployment

Documentation is currently deployed as a Docker image - build using regular Docker tools.

## Styling advice

It's recommended to use the vscode plugin [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
and follow all linting advice to get your page to render correctly.

The vscode preview for markdown is not 100% accurate to what mkdocs will render so you should 
check your docs with `npm start` and check it locally before pushing changes.
