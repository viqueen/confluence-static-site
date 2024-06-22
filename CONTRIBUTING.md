## environment

I use **[nvm](https://github.com/nvm-sh/nvm)** to manage my node versions, and **[yarn](https://yarnpkg.com/)** as my
package manager and build tool.

- on mac

```bash
brew install nvm
brew install yarn
```

## development setup

- create a fork of the repo, clone that, and install the things

```bash
nvm install
yarn
```

- build it

```bash
yarn build
```

- you can now use the cli after configuring your .env

```bash
yarn cli extract <spaceKey>
yarn cli build <spaceKey>
yarn cli build <spaceKey> --serve # with webpack dev server
```

- or you can also run with local data

```bash
yarn cli build public --dest local --serve --open
```

## run visual regression tests

```bash
yarnd wdio
```

## house-keeping

- format the code

```bash
yarn format
```

- ensure license header is included in any new files contributed

```bash
yarn lint --fix
```
