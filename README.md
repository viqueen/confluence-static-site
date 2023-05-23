## confluence-static-site

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=viqueen_confluence-static-site&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=viqueen_confluence-static-site)
[![npm version](https://badge.fury.io/js/confluence-static-site.svg)](https://badge.fury.io/js/confluence-static-site)

### install it

- with **npm**

```bash
npm install confluence-static-site --save-dev
```

- with **yarn**

```bash
yarn add confluence-static-site -D
```

### configure your site

```bash
./node_modules/.bin/confsite env
./node_modules/.bin/confsite init-site <name>
```

it creates a `.env` file with the following properties

- `CONFLUENCE_SITE_NAME` : the Confluence cloud instance you want to generate a site from
- `CONFLUENCE_USERNAME` : the username to use to consume Confluence APIs
- `CONFLUENCE_API_TOKEN` : the user personal access token to consume Confluence APIs
- `TARGET_SITE` : the domain name of where your generated site will be hosted
- `TWITTER_SITE` : the twitter handle for seo purposes
- `GOOGLE_ANALYTICS_TRACKING_ID`: Google Analytics tracking id

```bash
./node_modules/.bin/confsite config
```

it creates a `.confluence-static-site.json` file with the following configuration

```json
{
  "title": "confluence-static-site",
  "iconUrl": "",
  "name": "space name",
  "theme": {
    "name": "confluence-static-site",
    "backgroundColor": "rgb(0, 102, 68)",
    "highlightColor": "#FFFFFF"
  }
}
```

### extract your site content

```bash
./node_modules/.bin/confsite extract <spaceKey>
./node_modules/.bin/confsite extract-emojis <spaceKey>
```

### build your site

```bash
./node_modules/.bin/confsite build <spaceKey>
./node_modules/.bin/confsite build <spaceKey> --serve # with webpack dev server
./node_modules/.bin/confsite build <spaceKey> --assets my-assets-folder # copy your assets to the site output assets (i.e. site logo ...)
```

### everything in the output directory

Once your content is extracted and the site is built, you will have an `output` directory created in
the root of your project folder with the following structure

```text
- output
    - site
        - <spaceKey>
            - articles
                - <blog-title-1>
                - <blog-title-2>
                - ...
            - assets
                - avatars
                - emojis
            - attachments
            - notes
                - <page-title-1>
                - <page-title-2>
                - ...
            - object-resolver
    - templates
```

What you need to deploy is the `output/site/<spaceKey>`

### deploy your site

- [ ] with GitHub pages
- [ ] with Google Firebase
