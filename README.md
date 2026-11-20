# Rise to Ruin

An adult (18+) text game written in **Twee 3** for **SugarCube 2.37.3** and compiled with **Tweego**. Every character is an adult.

This README is the quick start: what you need, how to build and test, where things live and how the pieces fit together. The detailed rules (writing style, code conventions, every system in depth) are in [CLAUDE.md](CLAUDE.md). Read that before you write content or touch a system for the first time.

---

## 1. Setup

You need:

| Tool | What for |
|---|---|
| [Node.js](https://nodejs.org/) 18 or newer | runs the build and check scripts in `tools/` |
| [Tweego](https://www.motoslave.net/tweego/) 2.x | compiles `dev/` into one HTML file |
| VS Code + the **Twee 3 Language Tools** extension | syntax highlighting, passage list, macro hints (`.vscode/settings.json` and `rtr.twee-config.yaml` are already set up for it) |
| The media folder | images, videos and audio. They are **not** in the repo (see [Media](#4-media-and-path)) |

Tweego has to be findable. The build scripts try, in this order:

1. the `TWEEGO_EXE` environment variable (full path to `tweego.exe`),
2. `tweego` on your `PATH`,
3. `%USERPROFILE%\Downloads\tweego\tweego.exe`.

You don't need to install the story format. SugarCube 2.37.3 is in `.storyformats/`, and the scripts pass it to Tweego themselves.

### First build

```sh
node tools/build.mjs
```

This writes `RiseToRuin.html` to the project root and opens it in your browser. If the media folder is set up, you'll see the main menu with all images.

---

## 2. The scripts in `tools/`

### `build.mjs`: the everyday build

```sh
node tools/build.mjs              # compile and open in the browser
node tools/build.mjs --no-open    # compile only
node tools/build.mjs --test       # compile in SugarCube test mode (debug view)
```

What it does:

1. Finds Tweego (see above).
2. Runs `tweego -o RiseToRuin.html dev` with `TWEEGO_PATH=.storyformats`, so Tweego picks up SugarCube from the project. `--test` adds Tweego's `-t` flag, which turns on SugarCube's debug view (passage names and macro markers in the page).
3. Stops with "Build failed." if Tweego reports an error or no file was written.
4. Prints the file size and, unless `--no-open` is given, opens the HTML with the default browser (`start` on Windows, `open` on macOS, `xdg-open` on Linux).

Tweego only checks the Twee structure. It does **not** check JavaScript inside passages. A typo in StoryScript or in a `<<set>>` only shows up in the browser console, so keep the dev tools open (F12) while testing.

`RiseToRuin.html` is overwritten on every build. Never edit it by hand.

To compile somewhere else without touching `RiseToRuin.html` (handy for a quick syntax check):

```sh
TWEEGO_PATH=.storyformats tweego -o /tmp/build.html dev
```

### `build_release.mjs`: the build you hand out

```sh
node tools/build_release.mjs          # build to the release folder
node tools/build_release.mjs --open   # ...and open it
```

1. Compiles `dev/` into a temp folder (neither `dev/` nor `RiseToRuin.html` is touched).
2. Patches the compiled `Define Misc` passage: `$path` becomes `""` (media is loaded next to the HTML) and `$debug` becomes `false`. If a patch finds nothing to replace, the build stops, because that means `Define Misc` changed and the release would still be in debug mode.
3. Writes `Rise to Ruin.html` into the release folder. The default is `E:\Daten\Development\Rise to Ruin\`; set `RTR_RELEASE_DIR` to use another one.

The release folder is meant to hold the media too, so the HTML and `images/`, `audio/`, ... sit side by side.

### `quest-audit.mjs`: checks the quest lines and links

```sh
node tools/quest-audit.mjs            # errors, warnings, info
node tools/quest-audit.mjs --chain    # also print every quest line step by step
node tools/quest-audit.mjs --quiet    # hide INFO findings
node tools/quest-audit.mjs --no-links # skip the project-wide link check
```

It evaluates the quest arrays straight out of `define_quests.twee`, so it sees what the game sees. It follows each line from its start through every `next` id and reports broken chains, duplicate ids and quest passages that don't exist. It also checks every `[[link]]`, `<<goto>>` and `<<include>>` in the whole project. It exits with code 1 on errors. Run it after every change to `define_quests.twee` or to a quest passage. It currently reports 0 errors; keep it that way.

### `activity-media.mjs`: checks activity images against the disk

```sh
node tools/activity-media.mjs                   # missing files and unused files
node tools/activity-media.mjs --root <folder>   # a different media folder (default: $path from Define Misc)
node tools/activity-media.mjs --rename          # preview renaming old file names to the <id>_<n> scheme
node tools/activity-media.mjs --rename --apply  # actually rename them
```

It reads `setup.activities` from `define_activities.twee` and compares the `media`/`cctv` lists (and the `stageMedia`/`stageCctv` variants) with `images/characters/<sysName>/activities/` and `.../tasks/`.

---

## 3. Folder layout

```
rtr-main/
├── dev/                    all game source (about 330 .twee files). Everything that ships is in here
├── tools/                  build and check scripts (Node)
├── .storyformats/          SugarCube 2.37.3, used by Tweego
├── .vscode/                settings for the Twee 3 extension
├── rtr.twee-config.yaml    list of custom macros/widgets for the VS Code extension
├── RiseToRuin.html         build output (generated)
├── CLAUDE.md               the full developer guide: writing rules, conventions, systems
├── TODO.md                 open work
├── STAGE1_PROPOSAL.md      story plan for the rest of Stage 1
├── STAGE1_FLOWCHARTS.md    quest flowcharts for Stage 1
└── COMPANY_STATS_AND_CORRUPTION_STAGES.md   design of company stats and corruption stages
```

Tweego doesn't care about folders or file names. It collects every passage from every `.twee` file under `dev/`. The folders only exist to keep things findable. One passage per file; a multi-part scene is `name.twee`, `name_2.twee`, `name_3.twee`.

### `dev/`

| Folder | What's in it |
|---|---|
| `system/storypassages/` | SugarCube's special passages: `StoryInit` (loads all Define passages), `StoryScript` (engine-level JS: `Config`, custom macros like `<<Chat>>` and `<<UpdateStat>>`, notifications, audio), `StoryStylesheet` (global CSS), `StoryData`, `StoryMenu`, `StoryTitle` |
| `system/defines/` | **All game data and its helper functions.** One `Define X` passage per system: player, NPCs, locations, quests, events, tasks, projects, company, schedule, activities, meals, mails, settings, misc... Start here to learn a system |
| `system/automations/` | Logic that runs on its own: `PassageReady` (before every passage), `Action Update`, `Daily Update`, `Weekly Update`, quest and event requirement checks |
| `system/widgets/` | Reusable `<<widget>>`s, grouped by topic (time, quests, events, media, locations, profile, projects, tasks, sidebar) |
| `system/caption/` | The sidebar (`StoryCaption` and its parts: quests, time, location, stats, quick links, dev tools) |
| `system/profile/` | The character profile screen (progression log, recollection, schedule) |
| `intro/` | Disclaimer, intro, character configuration (renaming), skip intro, game over; `main_menu/` holds the main menu, gallery and changelog |
| `locations/` | One passage per place. `home/` (house rooms), `company/` (offices; `company/cmd/` is the Company Management Dashboard), plus diner, shop, college, landlord... |
| `quests/` | Story scenes, by line and stage: `main/`, `mom/`, `sister/`, `prof/`, each with `stage0/` and `stage1/` |
| `events/` | Full-screen random/home events; `micro_events/` (small moments shown inside a location, including breakfast/lunch/dinner); `cctv/` |
| `interactions/` | Scenes behind the cards on the NPC interaction screen, per character |
| `tasks/` | Scenes of tasks the player takes part in, per character |
| `meals/` | Meal scenes: `important/` (story meals switched on by a quest), `filler/` |
| `activities/` | What the player can do: sleep, shower, cook, diner shifts, prototype work. `minigames/` holds the workbench and the calibration minigame |
| `help_dialog/` | The in-game help (`pages/` + index, style, script) |
| `notes_for_me.twee` | The author's design notes for Stage 0/1 |

### Finding a passage

Every passage starts with a header line:

```twee
:: Passage Name [tags] {"position":"x,y","size":"100,100"}
```

To find where a passage lives, search for `:: Passage Name`. The position is only used by Twine's story map.

---

## 4. Media and `$path`

Images, videos and audio are not in the repo. The game loads them relative to a base path held in `$path`:

```twee
<img @src="$path + 'images/characters/portraits/mom.jpg'">
```

`$path` is set at the top of `dev/system/defines/define_misc.twee`, between `/*delete!*/` markers:

```twee
/*delete!*/
<<set $path to "file:///E:/Daten/Development/Rise%20to%20Ruin/">>
<<set $debug to true>>
/*/delete!*/
```

During development it points to the local folder that holds `images/`, `audio/`, ... so `RiseToRuin.html` in the project root can find them. If your media is somewhere else, point `$path` there (as a `file:///` URL, with spaces written as `%20`), but don't commit that change. The release build sets it to `""` by itself.

Where media goes:

| Kind | Folder |
|---|---|
| Character portraits | `images/characters/portraits/<sysName>.jpg` |
| Event/scene media | `images/characters/<sysName>/events/<scene name>/...` |
| Activity images | `images/characters/<sysName>/activities/<activityId>_<n>.<ext>` |
| Task CCTV clips | `images/characters/<sysName>/tasks/<activityId>_<n>.<ext>` |

---

## 5. How the game works

A short tour. Each system has a full description in [CLAUDE.md](CLAUDE.md) and a header comment in its Define passage.

### Startup

`StoryData` sets the start passage to `Main Menu`. Before that, SugarCube runs `StoryInit`, which `<<include>>`s every Define passage in a fixed order (Player, Locations, NPCs, ... Quick Links). Later Define passages may use variables made by earlier ones.

### State: story variables vs `setup`

- **Everything that changes during play** is a story variable (`$player`, `$mom`, `$tasks`, `$company`, ...), created with `<<set>>` in a Define passage. Only story variables are saved, loaded and rewound.
- **`setup`** holds constants and helper functions only (`setup.activities`, `setup.getQuestById(id)`, ...). Never put changing data there or in plain JS globals.
- SugarCube deep-copies the state on every passage change, so an object stored in two places becomes two copies. Store ids (`"task_mom_test_session"`, `"mom"`) and look the live object up (`setup.getTaskById(id)`, `State.variables[sysName]`).

### Every passage: `PassageReady`

Before each passage, `dev/system/automations/passageready.twee` sets the location, checks for events (and may jump to one), plays location audio, moves the NPCs to where their plan says they are, bounces you out of closed places, refreshes the sidebar and auto-advances quests whose condition is met.

### Time

A day has 7 time slots (Early Morning ... Late Night) with 3 actions each, so 21 actions a day. Doing something spends actions with `<<UseAction n>>`, which ticks the clock one action at a time and runs `Action Update` after each (tasks, project work). After Late Night it runs `Daily Update` (NPC plans for the day, income, stat drift), and on Monday also `Weekly Update`. Never set `$time` directly.

`$date.dayCount` is the absolute day; `$date.today.value` is only the weekday. Use `dayCount` for deadlines and cooldowns.

### Content systems

| System | Data | Scenes |
|---|---|---|
| **Quests** (main, mom, sister, prof lines) | `define_quests.twee` | `dev/quests/` |
| **Events** (full-screen) and **micro events** (inline) | `define_events.twee` | `dev/events/` |
| **Locations** | `define_locations.twee` | `dev/locations/` |
| **NPC routines and daily plans** | `define_schedule.twee`, `define_activities.twee` | - |
| **Interactions** (talk, flirt, ... cards) | `define_interactions.twee` | `dev/interactions/` |
| **Meals** | `define_meals.twee` | `dev/meals/` |
| **Tasks** (jobs for mom/sister) | `define_tasks.twee` | `dev/tasks/` |
| **Projects, mails, company** (Stage 1) | `define_projects.twee`, `define_mails.twee`, `define_company.twee` | `dev/locations/company/cmd/` |
| **Stats** | `setup.statDefs` in StoryScript | changed with `<<UpdateStat "+" "MomLust" 2>>` |

A quest that needs a scene has `needsEvent: true`, a `passage`, a `where` and a time. `<<GenerateEventsForQuests>>` turns it into an event, the event plays the passage when you're at the right place, and the passage ends with `<<NextQuest $line>>` and `<<ReturnFromEvent>>`.

---

## 6. Common jobs

### Write a scene

Look at `dev/quests/main/stage1/too_much_work*.twee` first; that's the reference for tone and structure. A scene is narration plus `<<linkreplace>>` steps, and every line of dialogue goes through `<<Chat _msgs>>`:

```twee
:: Scene Name [event main_quest] {"position":"3275,1075","size":"100,100"}
<<silent>><<SetBackground $locations[15].img>><</silent>>
I push the door open. $mom.callName looks up from her coffee.

<<linkreplace "Sit down">>
<<silently>>
<<set _msgs = [
{ who: $player, text: "Got a minute?" },
{ who: $mom, text: "For you, sweetie? Always." },
]>>
<</silently>>
<<Chat _msgs>>

<<UpdateStat "+" "MomRelation" 1>>
<<NextQuest $mom>>
<<ReturnFromEvent>>
<</linkreplace>>
```

**Names are always variables.** The player can rename every character and family term, so never type "Mom", "Sophie", "sister", "Ethan" and so on into player-visible text. Use `$mom.callName`, `$sister.relation`, `$ethan.name`, ... The full table and a grep check to run before you finish are in CLAUDE.md under *Names*.

### Add a quest

1. Add an entry to the right line in `define_quests.twee` (string `id`, `next`, `title`, `task`, plus `needsEvent`/`passage`/`where`/... or a `check`).
2. Point the previous quest's `next` at it. New content goes before the line's `*_end` quest.
3. Write the scene passage in `dev/quests/<line>/<stage>/`.
4. Run `node tools/quest-audit.mjs`.

### Add a widget or macro

Put it in the matching file in `dev/system/widgets/` (passage tagged `[nobr system widget]`) with a usage comment above it, and add its name to `rtr.twee-config.yaml` so the VS Code extension knows it.

### Add a help page

Help pages are in `dev/help_dialog/pages/`; add new ones to `Help Index` too. They must not spoil content the player hasn't reached.

---

## 7. Testing and debugging

- **Skip the intro**: "Accept Default & Skip Intro" (`dev/intro/skip_intro.twee`) jumps to a mid-Stage-0 state with the default names. It's behind the dev button on the main menu and at the top of Character Configuration.
- **Dev tools in the sidebar**: shown while `$debug` is true (set in `Define Misc`, see above). They're in `dev/system/caption/dev_caption.twee`; add debug shortcuts there.
- **Skip to a quest**: `<<SkipToQuest $mom "mom_someQuest">>` calls `<<NextQuest>>` until the line reaches that quest, so every skipped quest's `set` still runs. It only moves forward.
- **SugarCube debug view**: `node tools/build.mjs --test`.
- **Browser console** (F12): JavaScript errors from StoryScript and `<<set>>`/`<<run>>` code show up there, not in the Tweego output. `State.variables` lets you inspect and change the live state.
- **Checking JavaScript**: after changing StoryScript, run `node --check` on the extracted script, or test the logic in Node with a mocked `State.variables`.
- **Save compatibility** isn't a goal before release. If something behaves oddly after a change, start a new game before you go hunting for bugs.

### TwineScript traps

- In `<<set>>` code, `$x`, `_x` and the words `to`, `is`, `and`, `or`, `not`, `eq`, `def` are rewritten everywhere outside strings. Don't use them as JS variable names.
- The character sequence `>>` ends the macro, even inside code.
- An apostrophe in a `/* comment */` inside a `<<set>>` opens a string and breaks everything after it.
- `<<for>>` loops need an increment (`_i++`), or they silently hit SugarCube's loop limit.
- Text inside `<<set _msgs = [...]>>` must not contain unescaped double quotes.

---

## 8. Git

The repository's remote is `https://github.com/MichaelWinsauer/RTR.git` (branch `main`). `.gitignore` leaves out `.claude/settings.local.json` (local Claude Code permissions). Don't commit a `$path` that points to your own machine.
