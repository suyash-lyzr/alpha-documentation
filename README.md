# Alpha docs

The user docs for [Alpha](https://alpha.new), built with [Mintlify](https://mintlify.com). Every push to `main` deploys through the Mintlify GitHub app.

## Preview locally

```bash
npm i -g mint
mint dev --port 3333   # 3000 is taken by Alpha's own frontend
```

## Layout

| path | what |
| --- | --- |
| `docs.json` | site settings: theme, colours, logo, navigation |
| `style.css` | small CSS on top of the theme |
| `*.mdx` | pages; add each new one to `navigation` in `docs.json` |
| `changelog.mdx` | release notes, one `<Update>` block per release, newest first |
| `images/` | logo, favicon and screenshots |

Screenshots go in `images/` and are shown with `<Frame><img src="/images/….png" /></Frame>`.
