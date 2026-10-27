# Alpha docs

The user docs for [Alpha](https://alpha.new), built with [Mintlify](https://mintlify.com). Every push to `main` deploys through the Mintlify GitHub app.

## Preview locally

```bash
npm i -g mint
mint dev --port 3333          # 3000 is taken by Alpha's own frontend
mint broken-links --check-anchors   # internal links and #anchors
mint validate                 # strict build check
```

`broken-links` reports every screenshot that hasn't been captured yet (see [Images](#images-and-the-manifest)). Anything else it lists is a real broken link.

## Layout

| path | what |
| --- | --- |
| `docs.json` | site settings and navigation. The theme, colours, fonts and logo are settled; don't change them. |
| `style.css` | the small layer of CSS on top of the theme, including the landing page. Owned by the docs lead. |
| `*.mdx` | pages. Every page is listed in `navigation`, and every navigation entry has a page. |
| `snippets/` | shared constants and the one custom component (see [Snippets](#snippets)) |
| `images/` | logo, favicon, the landing backdrop and every screenshot, plus `images/manifest.json` |
| `changelog.mdx` | release notes, one `<Update>` block per release, newest first |

The site has six tabs:

| Tab | Groups | Pages |
| --- | --- | --- |
| Get started | Get started · Guides · Your account | `index`, `quickstart`, `get-started/*`, `guides/*`, `account/*` |
| Build | Sessions · Chat with the agent · Workspace | `sessions/*`, `chat/*`, `workspace/*` |
| Ship | Publish · GitHub · Share and automate | `publish/*`, `github/*`, `sharing`, `routines` |
| Connect | Integrations · Secrets · Skills | `integrations/*`, `secrets`, `skills/*` |
| Agents | Build agents · Evals | `agents/*`, `evals/*` |
| Reference | Reference · Administration · Updates | `reference/*`, `admin`, `changelog` |

To add a page, create the `.mdx` file and add its slug to the right group in `docs.json`.

## Writing rules, in brief

- **Voice.** Second person, present tense, plain words. Short sentences. No hype and no filler ("just", "simply").
- **Names.** The product is Alpha. A session is the unit of work. Its computer is "the session's machine", which sleeps and wakes. The agent's work in reply to one message is a turn. You publish an app; a published app has versions. A saved machine is a setup. Say "transcript" for what the agent wrote and "composer" for where you type.
- **Words to avoid** in prose: forge, VM, sandbox, thread, chat or conversation (meaning a session), deploy, revision, snapshot, Cloud SQL. These may appear only when quoting the UI word for word, for example "Sandbox asleep", or in code.
- **UI labels** go in **bold**, spelled and cased exactly as on screen. Menu paths use →, for example **Account menu → Global secrets**. On-screen messages are quoted in "double quotes". Keys use `<Kbd>`, Mac first. Paths, commands and variables go in `code`.
- **Page shape.** Frontmatter has `title`, `sidebarTitle`, `description` and `icon`. A lead of one to three sentences, a hero screenshot for any visible surface, task or question H2s, and a **Next steps** `<CardGroup cols={2}>` with two to four cards. At most three callouts per page.
- **Guides and the quickstart** add a time `<Badge>`, the result screenshot first, **Before you start**, `<Steps>` with one `<Frame>` per step, and a recap line.
- **Numbers.** Never type a number that has a constant in `snippets/limits.mdx`. Every limit links to [/reference/limits](reference/limits.mdx).
- **Links** are root-relative slugs, such as `/publish/manage#roll-back-or-forward`. Run `mint broken-links --check-anchors` before you push: Mintlify's own heading slugs keep the letters after an apostrophe in some words ("you're" becomes `you-re`), so check anchors rather than guessing them.
- **Operator-dependent features** get one `<Note>`: "If you don't see …, it isn't turned on for your Alpha."
- **Unconfirmed facts** stay out, or sit behind a `{/* TODO confirm: … */}` comment until they're checked. Never invent a value.
- **Diagrams** are Mermaid (`flowchart LR`, `stateDiagram-v2` or `sequenceDiagram`), starting with the house init line used on existing pages. Sentence-case labels of six words or fewer, and at most one `focus` node.
- **MDX hygiene.** Escape `{`, `}` and `<` in prose (or use code formatting). Escape a dollar sign in prose as `\$`. Use only Mintlify's built-in components plus `PromptCard`.

## Snippets

Import snippets after the frontmatter, and import only the names a page uses.

- **`snippets/limits.mdx`** holds one constant per number the docs quote, such as `idlePark`, `turnMax` or `publishPerSession`, plus `appUrl`, the product's address. A comment above each constant names where the value comes from. Values marked "(default)" can be changed by whoever runs an Alpha.

  ```mdx
  import { idlePark, turnMax } from '/snippets/limits.mdx';

  A machine sleeps {idlePark} after you leave.
  ```

- **`snippets/prompt-card.jsx`** exports `PromptCard`, a prompt the reader can copy. Put a fenced `text` block inside it, with blank lines around it, and follow it with an "Alpha will:" numbered list.

  ````mdx
  import { PromptCard } from '/snippets/prompt-card.jsx';

  <PromptCard label="Try this">

  ```text
  Build a class-booking app for a sailing school.
  ```

  </PromptCard>
  ````

## Images and the manifest

Every screenshot lives under `images/<section>/` as a `.png` (two short loops are `.mp4`) and is shown in a `<Frame caption="…">` with long, literal alt text that describes what is on screen. Reuse an existing capture instead of adding a near-duplicate; when two pages share one, their alt texts must describe the same screen.

Pages reference their screenshots before the captures exist. `images/manifest.json` lists every image path the pages reference, one entry each:

| field | meaning |
| --- | --- |
| `path` | the path the pages use, such as `/images/workspace/preview-toolbar.png` |
| `pages` | the slugs that show it |
| `alt`, `caption` | as written on the page |
| `state` | the exact screen state to capture, with capture notes where the setup matters |
| `viewport` | `1600x1000` for the full workbench, `1600x900` for the app itself or the Preview, `element` for a tight crop of one card, dialog, menu or control |

Captures use the demo world the pages describe: the Harbor Sailing School, the **Harbor bookings** session and its neighbours. No real names, emails or keys; numbers in a shot are illustrative. To capture, set up the state, take the shot at the given viewport and save it at `path`. When you add, rename or remove a screenshot on a page, update the manifest in the same change.
