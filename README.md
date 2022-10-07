## confluence-static-site

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=viqueen_confluence-static-site&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=viqueen_confluence-static-site)
[![Known Vulnerabilities](https://snyk.io/test/github/viqueen/confluence-static-site/badge.svg)](https://snyk.io/test/github/viqueen/confluence-static-site)

### install it

- with **npm**

```bash
npm install confluence-static-site -g
```

- [ ] with **homebrew**

### configure your site

```bash
confsite init
```

it creates a .env file with the following properties

- `CONFLUENCE_SITE_NAME` : the Confluence cloud instance you want to generate a site from
- `CONFLUENCE_USERNAME` : the username to use to consume Confluence APIs
- `CONFLUENCE_API_TOKEN` : the user personal access token to consume Confluence APIs
- `TARGET_SITE` : the domain name of where your generated site will be hosted
- `TWITTER_SITE` : the twitter handle for seo purposes
- `GOOGLE_ANALYTICS_TRACKING_ID`: Google analytics tracking id

### extract your site content

```bash
confsite extract <spaceKey>
```

### build your site

```bash
confsite build <spaceKey>
confsite build <spaceKey> --serve # with webpack dev server
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
