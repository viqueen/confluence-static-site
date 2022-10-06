## environment

I use **[nvm](https://github.com/nvm-sh/nvm)** to manage my node versions.

```bash
brew install nvm
```

## development setup

- create a fork of the repo, clone that, and install the things

```bash
nvm install
npm install
```

- build it in watch mode

```bash
npm run build -- --watch
```

- you can now use the cli 

```bash
./cli extract <spaceKey>
./cli build <spaceKey>
./cli build <spaceKey> --serve # with webpack dev server
```
