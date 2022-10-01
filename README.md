## confluence-static-site

- configure it by creating a .env file at root

* `CONFLUENCE_SITE` : the Confluence cloud instance you want to generate a site from
* `CONFLUENCE_USERNAME` : the username to use to consume Confluence APIs
* `CONFLUENCE_API_TOKEN` : the user personal access token to consume Confluence APIs
* `CONFLUENCE_SPACE` : the Confluence space you want to generate a site from
* `TARGET_SITE` : the domain name of where your generated site will be hosted

- always extract your site content first

```bash
./cli extract <spaceKey>
```

- then build your site

```bash
./cli build <spaceKey>
./cli build <spaceKey> --serve # with webpack dev server
```
