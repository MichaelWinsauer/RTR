# Rise to Ruin

An adult (18+) text game written in **Twee 3** for **SugarCube 2.37.3**, compiled with **Tweego**. The player is a failed young founder who moves back home. He turns his room-reading software into a device that steers people, and uses it to build a company while corrupting his mother and sister. Every character is an adult.

- Source: `dev/` (about 330 `.twee` files). Everything that ships is in there.
- Output: `RiseToRuin.html` in the project root. Don't edit it by hand, it gets overwritten.
- Images, videos and audio are **not** in the repo. They are loaded relative to the HTML (`images/...`, `audio/...`).
- Design notes: `dev/notes_for_me.twee` (the author's plan for Stage 0/1).

## Git

The project is a git repository with the remote `origin` = https://github.com/MichaelWinsauer/RTR.git (branch `main`).

**Never commit. Never push.** No `git commit`, `git push`, `git merge`, `git rebase`, `git tag`, `git stash`, no amending, no history rewriting, not even when a task seems to call for it or a tool suggests it. The author does every commit and push by hand. Read-only git commands (`git status`, `git diff`, `git log`) are fine. Leave the working tree and the index as they are; don't stage files either.

## Build & check

```sh
node tools/build.mjs              # compile to RiseToRuin.html and open it
node tools/build.mjs --no-open    # compile only
node tools/build.mjs --test       # SugarCube test mode (debug view)
node tools/build_release.mjs      # release build to E:\Daten\Development\Rise to Ruin\ with $path = "" and $debug = false (patched in the HTML only)
node tools/quest-audit.mjs        # checks quest chains, ids, "next" links, broken [[links]]/<<goto>>/<<include>>
node tools/quest-audit.mjs --chain  # also prints every quest line step by step
node tools/activity-media.mjs     # activity media/cctv lists vs. the files on disk: missing and unused files
```

- Tweego is on PATH (`C:\Tools\tweego\tweego.exe`), or set `TWEEGO_EXE`. Story formats come from `.storyformats/`.
- To check a build without touching `RiseToRuin.html`, compile into a temp folder: `TWEEGO_PATH=.storyformats tweego -o <tmp>/build.html dev`.
- Tweego doesn't check JavaScript. After changing StoryScript, run `node --check` on the extracted script, or test the logic in Node with a mocked `State.variables`.
- Run the quest audit after any change to `define_quests.twee` or to a quest passage. It currently reports 0 errors.
- **`STAGE1-STUB`** marks everything of the rest of Stage 1 (main, mom and sister lines, `STAGE1_PROPOSAL.md` sections 4 to 6) that exists as structure only: the quests after "It'll be official", "A Knock at Night" and "Good News?", their empty scene passages, and the data they need (projects, two tasks, mails 4 and 5, flags, the new contacts, corruption stages 2 and 3). The requirements, timings and numbers there are first guesses. `grep -rn STAGE1-STUB dev` lists them, and the quest audit prints their count. When a scene or piece of data is finished, remove its marker. Don't copy the stub scenes' structure or text; write each scene properly from its comment and the proposal.
- Debugging: "Accept Default & Skip Intro" (`dev/intro/skip_intro.twee`) jumps to a mid-Stage-0 state. `$debug` lives in `Define Misc`.
- `Define Misc` sets `$path` to a local dev folder for the media files, between `/*delete!*/` markers. Leave it alone unless asked.
- When you add a macro or widget, also add its name to `rtr.twee-config.yaml`. The VS Code Twee extension uses that list.

---

## Writing content

**Hard rule, no exceptions:** every character name and every family term in player-visible text is a variable (`$ethan.name`, `$mom.callName`, `$mom.relation`, ...). Never type one out. See **Names** below, and run its grep check before you call any text done.

The author's biggest complaint about generated text is that it **sounds like AI**: robotic, clipped, on the nose, with no nuance, variety or playfulness. The rules below matter more than anything else in this file.

### Voice
- **First person, present tense, from the player's point of view.** "I push the door open. She looks up from her coffee." Backstory can use the past tense, like `Introduction` does.
- **The one exception: POV passages** (tag `pov`). Her side of something the player wasn't there for (a task he watches on the camera, a deal he hears about in her end-of-day report), first person, present tense, in **her** voice: mom anxious and talking herself into things, the sister joking to cover nerves. They start with `<<PovHeader $mom>>` (her portrait and name, so the text is never mistaken for his) and end with `<<EndPov>>`. She refers to him by name (`$player.name`). See "POV passages" below.
- The narrator is the player, so narration shows what he notices and what he wants. His cold, calculating thoughts often run under a friendly surface. That contrast is the game's main tone: warm dialogue on top, the inner voice underneath. Show it through what he notices and decides. Don't spell out the menace ("a dark thrill runs through me" is usually too much).
- American English, dollars, casual contractions. Swearing is fine where the character would swear.

### Sound like a person, not a press release
Don't write these:
- **Stacked fragments and tricolons.** "Impressed. Curious. Not a single one of them suspicious." "Less stress. Better concentration. People feel good and work better." "The decision feels good. Clean."
- **Announcer lines.** "Second project: $manager.callName's diner." "Three mails came in this week. All three of them matter."
- **"Not X. Y." contrast punchlines** ("Not as his secretary. That's a big difference.").
- **Stock phrases**: "a breath she didn't know she was holding", "something like pride", "I file that away for later", "this is where it really starts", "the tension melts away", "Get used to it.", "Don't be sorry. Be ready.", "I like that answer."
- **"Longer than it should/needs to" in any form**: "a second longer than a quick hug should", "rests there a little longer than it has to", "longer than a hug between the two of us should", "holds my gaze a beat too long", "a second too long". It's an AI tic. Show the moment itself (what she does, what he notices) instead of measuring it against how long it was supposed to last.
- **Em dashes** as the default punctuation. Use commas, full stops or an ellipsis in dialogue instead.
- Ending scenes on a one-line "dramatic" summary of what just happened.

Do this instead:
- **Vary the sentence length.** Mix full, flowing sentences with short ones. A short sentence should land because it's rare.
- **Let people talk around things.** Hesitate, joke, deflect, trail off ("Are you sure we can even..."), interrupt each other. People rarely say exactly what they mean.
- **Use small physical details instead of naming emotions.** Rather than "She is worried", write "She sets her mug down very carefully, the way she always does right before she says something I won't like."
- **Use subtext for the dark beats.** "She snorts. $mom.callName doesn't." "She says it like a joke. Then she waits for one of us to laugh, and neither of us does."
- **Be playful.** Throwaway jokes, callbacks, specific odd details (the applicant who sent nothing but a photo of his car; "chairs that aren't held together by duct tape and hope").
- Before and after, from the Too Much Work rewrite:
  - Before: "$landlord.callName confirmed the new rent. It stays low as long as you two keep visiting him like we agreed. At least once a week."
  - After: "$landlord.callName signed off on the new rent. Which is great, but you both remember the catch. It only stays that low as long as you two keep dropping by to keep him company at least once a week."

`dev/quests/main/stage1/too_much_work*.twee` is the reference for the tone the author wants for now. Older passages contain typos and some stiff writing; don't copy those.

### Character voices (keep them distinct)
**Read `CHARACTER_VOICES.md` before writing dialogue.** Its first section matters most: everyone talks like a normal person, and a character's traits are tendencies that show up sometimes, not tics in every line. Speech should vary from scene to scene with mood and situation. The file then has a profile for each character below (personality, tendencies, how the voice shifts over the arc) and the existing passages that miss the mark. The table is only the summary.

| Character | How they talk |
|---|---|
| Player | A normal guy with a lot of power, not a mastermind, and he doesn't always know the answer. Friendly and joking with family day to day; in key scenes he goes cold by withdrawing that warmth so they come to him. Hates corporate jargon. |
| `$mom` | Warm, sunny, optimistic, always ready to help anyone. Chatty, longer flowing sentences, lots of "honey", "sweetie", "sweetheart". Talks herself into agreeing. |
| `$sister` | Confident, popular, articulate older sister who teases from comfortable superiority. Only rambles and gets insecure when she's nervous, mostly with him. |
| `$landlord` | Gruff, crude, lecherous. Calls the player "kid". Heavy innuendo in quotes ("help" around the building). |
| `$boss` | Arrogant, sleazy, bullying. Business-formal in mails, crude in person. Calls the player "kid". |
| `$manager` | Tired, sarcastic diner manager who used to mock the player. |
| `$prof` | Curmudgeonly, by-the-book academic, impatient with interruptions. |
| `$ethan` | The player's high-school buddy, same age. Laid-back and funny, but very competent. Calls the player "boss" now and then, as a joke. |
| `$brian` | Introverted, insecure hardware nerd, not dumb. Short sentences and fillers ("uh", "um"), fairly normal once comfortable. Goes quiet and flustered around women. |
| `$darius` | Highly intelligent, polished, confident. Rich vocabulary and well-built sentences; numbers when they matter, not as a personality. |

### Names: ALWAYS use variables. NEVER EVER hard-code a name or a family term.
The player can rename every character and every family relation in `Character Configuration`. One hard-coded "Ethan", "Sophie" or "my sister" shows the wrong word to everyone who renamed that character, so the author treats it as a bug.

**There are no exceptions for "minor" mentions.** The rule covers employees mentioned in passing, possessives ("Darius's chair"), narration, every Chat `text`, link texts, `<<ProfileLog>>`/`<<ProfileMemory>>` text, quest `title`/`task`/`requirementsText`, task `title`/`description`, notifications, mail bodies and help pages. If a character has a story variable, his or her name is **never** typed out.

All player-visible text in `dev/` uses variables now, so the grep check below finds only defaults and code. Keep it that way.

| Instead of writing... | Write |
|---|---|
| Michael, Adams (the player) | `$player.name`, `$player.surname` |
| Mom, Anna (as a name or what he calls her) | `$mom.callName`, `$mom.name`, `$mom.surname` |
| "mother", "mom" as a word ("your mother", "my mom") | `$mom.relation` ("your $mom.relation") |
| "son" (what the player is to mom) | `$mom.playerRelation` ("her $mom.playerRelation's shoulders") |
| Sophie | `$sister.callName` / `$sister.name` |
| "sister" as a word ("my sister", "your sister") | `$sister.relation` |
| "brother" (what the player is to her) | `$sister.playerRelation` |
| "bro", "little bro" (her short name for him) | `$sister.callPlayerShort` ("bro", or the renamed relation) |
| Dad, Arthur, "father" | `$dad.callName`, `$dad.name`, `$dad.relation` |
| Mr. Howell / Norman | `$landlord.callName` / `$landlord.name` |
| Mr. Anderson / Victor | `$boss.callName` / `$boss.name` |
| Mr. Morales / Frank | `$manager.callName` / `$manager.name` |
| Mr. Walsh / Antony | `$prof.callName` / `$prof.name` |
| Ethan, Brian, Darius | `$ethan.name`, `$brian.name`, `$darius.name` (or their `callName`) |
| ValTec Co. / Valenx | `$company.name` / `$company.prototype.name` |
| The Diner | `$diner.name` |
| Dana Pruitt (marketing firm owner), Rick Dawson (gym chain owner), Charles Whitfield (investor), Leon Calloway (supplier), Jess Moreno (the sister's best friend) | `$marketingOwner.name`, `$gymOwner.name`, `$investor.callName`, `$supplier.callName`, `$bestFriend.name` |
| Pruitt Communications, Peak Form Fitness, Hartwell Stores, The Lantern Room | `$marketingFirm.name`, `$gymChain.name`, `$retailChain.name`, `$club.name` |

- SugarCube's naked variables work inside text and inside Chat strings, possessives included (`$manager.callName's diner`, `$darius.name's chair`).
- Inside `<<run>>`/`<<set>>` code, build the string: `"New task for " + $mom.callName`. A `$var` written *inside* a JS string literal is not replaced.
- Invented one-off extras who have no story variable (a trucker at the diner, "Linda from HR") may be named in plain text. Anyone with a variable may not.
- Text that is **not** wikified (JS template strings in CMD panels, `textContent`, typed minigame phrases) can't use `$var`. There, read the value in code: `setup.presetLabel(key)` turns a preset/`lastUsedOnWho` key into the character's `callName` ("mom" → `$mom.callName`, "general" → "General"). Calibration phrases use `{player}` and `{relation}` (what the player is to her).
- Fields built from another character's name (`$sister.callPlayer`, `$boss.relation` = "<callName>'s boss", the clients' `callPlayer`, `$dad.playerRelation`, ...) are refreshed by `setup.syncNameFields()` (`define_npcs.twee`), which Character Configuration and Skip Intro call after naming. Add any new name-derived field there instead of computing it once in the Define passage.
- The defaults themselves (`define_npcs.twee`, `define_player.twee`, the fallbacks and placeholders in `character_configuration.twee`/`skip_intro.twee`, `$company.prototype.name: 'Valenx'`) are the one place names are typed out.
- **Check before you finish.** Run this on every file you wrote or edited and fix every hit in player-visible text:
  ```sh
  grep -nEio '(^|[^$.[:alnum:]_])(anna|sophie|michael|adams|arthur|norman|howell|victor|anderson|frank|morales|antony|walsh|ethan|reed|brian|hayes|darius|brooks|valenx|valtec|mom|mommy|mother|sister|sis|son|brother|daughter|dad|father|bro|dana|pruitt|rick|dawson|whitfield|calloway|jess|moreno)\b' <files>
  ```
  The only hits you may ignore are code and identifiers: passage names (`:: Mom Bed Masturbation`), `[[links]]`/`<<goto>>` targets, and media paths (`images/characters/mom/...`). Everything else gets replaced with a variable.

### Scene passage structure
Quest and event scenes don't follow the same skeleton every time. Use a variance in each scene so they don't sound repetitive. E.g: (see `dev/quests/main/stage1/too_much_work.twee`):

```twee
:: Scene Name [event main_quest] {"position":"3275,1075","size":"100,100"}
<<silent>><<SetBackground $locations[15].img>><</silent>>
Opening narration paragraph(s).

<<linkreplace "Short action text">>
<<silently>>
<<set _msgs = [
{ who: $player, text: "Dialogue line." },
{ who: $mom, text: "Reply." },
{ text: "A narration line between messages, without a speaker." },
]>>
<</silently>>
<<Chat _msgs>>

More narration...

<<UpdateStat "+" "MomCorruption" 1>>
<<NextQuest $mom>>
<<ReturnFromEvent>>
<</linkreplace>>
```

It's vital that dialog is only used with the `<<Chat _msgs>>`. However the usage and is not always `abababab`... It should be varied, sometimes use the narration variant. Or Just use plain text to describe more of the scene. A scene or passage is also not limited to one `<<Chat _msgs>>` macro. Use as many as are necessary.

- **Dialogue** goes through `<<Chat _msgs>>` (in StoryScript). A message is `{ who: $npc, text: "..." }`; leave out `who` for a narration line. Keep each `text` in double quotes and use single quotes or none inside (`'sweetheart'`). Any unescaped `"` breaks the `<<set>>`.
- **Pacing**: `<<linkreplace "...">>` blocks reveal the scene step by step. Link texts are short actions ("Show them the prototype", "Let it sink in").
- **Media**: `<<Image PATH ...>>`, `<<Video PATH ...>>`, `<<Media PATH ...>>`, `<<SetBackground IMG>>`. Event media lives in `images/characters/<sysName>/events/<scene name>/...`.
- **End of a quest scene**: apply the effects (`<<UpdateStat>>`, flags, `<<ProfileLog>>`/`<<ProfileMemory>>`), then `<<NextQuest $line>>`, then `<<ReturnFromEvent>>` (or `[[Link|Next Part]]` for multi-part scenes, with only the last part advancing the quest).
- Passage header: `:: Name [tags] {"position":"x,y","size":"100,100"}`. The position is only Twine's story-map layout; place it near related passages.

---

## Code conventions

### Game data lives in SugarCube story variables
- All game state is in **story variables** (`$tasks`, `$events`, `$company.projects`, `$player.quests`, ...), created with `<<set>>` in a **Define passage** (`dev/system/defines/define_*.twee`). StoryInit `<<include>>`s each one (`dev/system/storypassages/storyinit.twee`, in order: Player, Locations, NPCs, Profiles, Time, Settings, Misc, Company, Calibration, Mails, Interactions, Flags, Events, Quests, Activities, Schedule, Audio, Tasks, Projects, Meals, Quick Links). Later Define passages may use variables from earlier ones (for example `task.who: $mom`).
- **Never** keep game data in plain JS (`window.foo = [...]`, module-level arrays or objects in StoryScript, `setup.someData` that changes). It wouldn't be saved, loaded or rewound. `setup` is only for **constants and helper functions**.
- Data that changes on the fly gets new fields on the existing story-variable object (e.g. `project.due`, `project.completedAtDay`, `quest.doneDay`).
- **Save compatibility is not important right now.** The game isn't released yet, so changes may break old saves. Don't write migration code, `Save.onLoad` patches or fallbacks for saves made before a change unless the author asks for them. Pick the cleanest design, even if it means starting a new game to test it.

### Helper functions: `<<set setup.fn = (...) => {...}>>` in the Define passage
Write helpers next to the data they work on, in that Define passage, one `<<set>>` per function, with a comment block that lists them. Examples: `define_quests.twee`, `define_meals.twee`, `define_locations.twee`, `define_projects.twee`.

```twee
/* Quest lookup ================================================================
   setup.getQuestById(id)      the quest with that id, from any line
   ... */
<<set setup.getQuestById = ((id) => {
    for (const line of setup.getQuestLines()) {
        const quest = line.quests.find((q) => q.id === id);
        if (quest) { return quest; }
    }
    console.error('setup.getQuestById: there is no quest with the id "' + id + '"');
    return undefined;
})>>
```

- Inside a helper, read state through `State.variables` (`const v = State.variables;`), not `$var`.
- `<<set>>` code is TwineScript. `$x` and `_x` are rewritten everywhere outside string literals, and so are the words `to`, `is`, `eq`, `and`, `or`, `not`, `def`. Don't name JS variables after those words. Avoid the character sequence `>>` in the code, because it ends the macro.
- StoryScript (`dev/system/storypassages/storyscript.twee`) is only for engine-level code: `Config`, `Macro.add` (Chat, UpdateStat, PlayAudio), the `Notification` class, `$(document).on(':passage...')` handlers, audio, settings handlers, and the task progression tick. It also holds `setup.statDefs` and a few older task/CCTV helpers; new game-logic helpers don't go there.
- `define_interactions.twee` wraps its helpers in a `<<script>>` block with private functions. That's an older exception; don't copy it for new systems.

### Functions and references inside story variables
- Arrays of functions in state are normal here: `onStart`, `onComplete`, `eval`, meal `requirements`/`set`, micro-event `conditions.eval`, mail `answerOptions[].eval`. SugarCube saves a function as its **source text** and re-evaluates it when loading. So these functions must not use closures or temporary variables. Use `State.variables...`, `setup...` and globals only: `() => State.variables.tasks[1].active = true`.
- SugarCube **deep-copies** the state on every passage change and on load. An object stored in two places (`task.who = $mom`, `project.assigned = [$ethan]`, `$company.employees`) becomes **separate copies**. Treat such fields as read-only snapshots and look up the live object by key: `State.variables[emp.sysName]`, `setup.getTaskById(id)`, `setup.getQuestById(id)`, `setup.getLiveTask(task)`. For new references, store a key (`sysName`, `id`) rather than the object.
- Quests and tasks are referenced **only by string id** (quests: `main_...`, `mom_...`, `sister_...`; tasks: `task_<who>_<what>`, e.g. `task_mom_test_session`, looked up with `setup.getTaskById(id)`; projects: `project_<client>_<what>`, looked up with `setup.getProjectById(id)`), never by array index. Activities use string ids too (see Activities). Older systems (`$events`, `$company.mails`, `$locations`) use `id` == array index; keep it that way when adding entries (for now, may change in the future).
- Strings that quest data evaluates later (`check`, `requirements`, `set`) are TwineScript strings, evaluated with `Scripting.evalTwineScript`: `"$mom.stats.relation >= 10"`, `"setup.activateQuest('sister_classProject')"`.

### Widgets & macros
- Widgets are in `dev/system/widgets/*.twee` (passages tagged `[nobr system widget]`). Each one gets a header comment:
  ```twee
  /* Usage: =====================================================================
  	<<NextQuest $player [ShowNotification]>>
  	What it does, in one or two lines.
  */
  <<widget "NextQuest">>
  ```
- Temporary variables inside widgets get a widget-specific prefix (`_nqLine`, `_cfe_event`, `_uqdQuest`) so they don't clash with the calling passage.
- Register new widgets and macros in `rtr.twee-config.yaml`.

### Other conventions
- Comments are `/* ... */`. Explain the *why* and the data format next to the definition (see the headers in `define_interactions.twee` and `define_quests.twee`).
- Passage tags in use: `system`, `widget`, `nobr`, `script`, `stylesheet`, `location`, `activity`, `interaction`, `meal`, `event`, `micro_event`, `main_quest`, `mom_quest`, `sister_quest`, `scene`, `task_scene`, `pov`, `hide_sidebar`, `no_location_audio`. Only `hide_sidebar` is read by code (PassageReady), `no_location_audio` makes `<<PlayAudio>>` skip the passage (the Main Menu plays its own tracks), and `event`/`scene`/`task_scene` keep a task scene from interrupting them (`<<CheckTaskScene>>`); the rest organise the project.
- UI panels (CMD, profile, help) write their HTML in template strings and use classes from StoryStylesheet or a `<style>` block in the passage. The palette: cream `#EBDDC5`, accent `#EAAF4C`, red `#ff6479`/`#DB354C`, green `#1cd88d`, glass backgrounds.
- **No accent bars on one edge.** The author hates them, because they look like generated UI. Don't put an inset box-shadow stripe on an element (`box-shadow: inset 3px 0 0 #EBDDC566`) or a one-sided border on a rounded box (`border-left: 3px solid ...`). That covers cards, list rows, tiles, menu items and tabs. To show a state or category, use something else: the whole border or background colour, a badge, an icon, the text colour or a dot. Plain dividers between sections (a full-width `border-bottom` line on a non-rounded block) are fine.
- Notifications: `Notification.show(text, { type: Notification.POSITIVE | NEGATIVE | QUEST | INFORMATION | WARN })`.
- When a mechanic changes, update its help page in `dev/help_dialog/pages/` (links use `<a href="#" data-help="Passage Name">`, new pages also need a line in `Help Index`). Help pages must not spoil anything: no names of scenes, quests, tasks, devices or mails the player hasn't reached. Lists of game content and numbers that can change are built from the live state instead of typed out (`setup.helpTasks()`, `setup.helpEmployees()`, `setup.helpFreeRows()` in `Help Dialog Script`, or `<<for>>` over `$company.devices`/`$company.mails`, gated on `owned`/`active` and `$company.stage`).

---

## How the game works

### Time
- `$timeSlots`: 0 Early Morning, 1 Morning, 2 Noon, 3 Afternoon, 4 Evening, 5 Night, 6 Late Night. Each slot has `$time.actions.max` = 3 action points, so a day has **21 action slots**. Schedules, work hours and the scheduler are indexed by `slot * 3 + (3 - actions.left)` (`$time.current.actionSlot`).
- `$date.today.value` is the **weekday** (0 Mon ... 4 Fri, 5 Sat, 6 Sun). `$date.dayCount` is the **absolute day** counter. Deadlines, cooldowns and "x days later" checks must use `dayCount`; comparing against `today.value` is a classic bug here.
- Spending time: `<<UseAction [n]>>` spends the actions **one at a time**: each one moves the clock (next slot when the slot is used up, `<<AdvanceDay>>` after Late Night: dayCount++, then `Daily Update`; on Sunday→Monday also `Weekly Update`) and then runs `Action Update`, so a 12-action skip still starts/ends every task on its own action and gives 12 actions of project work. `<<AdvanceTime>>` spends the rest of the current slot the same way. Location links call `<<UseAction>>`. Never jump the clock by setting `$time` directly in game code.
- `dev/system/automations/`:
  - **Action Update**: `checkTaskProgression()` (Stage 1 tasks), `<<ProgressProjects>>` (staff work for the action just spent if it lies in `$company.workHours`, plus +1 per requirement while `$playerWorking`), `setup.checkProjects()`. Both the task tick and the project work are guarded to run once per action (`$lastCheckedGlobalRow`, `$lastProgressKey`), because the Daily Update includes Action Update too.
  - **Daily Update**: rolls today's plan for mom and sister (`setup.planDay()`), diner/chore income, company revenue into money, finance history, `<<CalculateFinances true>>`, overnight morale/energy recovery, prototype recharge, lust/resistance drift for mom and sister.
  - **Weekly Update**: small weekly effects.

### Passage pipeline
`PassageReady` runs before every passage:
1. `<<SetLocation passage()>>` (moves the player if the passage is a location).
2. `<<CheckForEvent>>`, which may `Engine.play` an event instead.
3. Audio.
4. NPC locations and activities from today's plan and running tasks (`setup.updateNpcPositions()`).
5. Closed-location bounce.
6. `isHome` flags, sidebar panel.
7. `Check Event Requirements` (cooldowns), then `Check Quest Requirements` (`check` quests auto-advance).
8. Mom masturbation event chance, `hide_sidebar`, meal alerts, day/night body classes.

`$eventJustTriggered` stops it from running twice.

### Locations
- `$locations` (`define_locations.twee`): `id`, `name` (may contain variables), `sysName`, `passage`, `img`, `open` (time slots), `audio`, and optionally `locationToReturnTo` and `area` (the location it counts as when people meet: My Desk 14 has `area: 13`, so the office and the desk are one place for NPC presence, interactions, CCTV and tasks with the player). Compare places with `setup.sameLocation(a, b)` (objects or ids), not `location.id == location.id`. Look one up with `setup.getLocationBySysName("kitchen")`.
- ids 0–6 are the house (`isHome` checks use `id <= 6` / `< 7`). 7 is Residential Area (the hub), 8 Diner, 9 Shop, 10 Company (Stage 0 office), 11 College, 12 the Boss's office (mom's old work), 13 Stage 1 Office, 14 My Desk (management dashboard), 15 Meeting Room, 16 Stage 2 Office (placeholder), 17/18 College Hallway/Backside, 19 Landlord's Place.
- A location passage (`dev/locations/...`, tag `[location]`) starts with `<<CheckLocation>>` (background, micro events, NPC activity image). Then comes the description and activity links, then `<<CheckNPCLocation>>` ("Mom is here ...", which links to `NPC Interaction`), then a `<div class="navigation-link">` with exits (`[[Hallway]]` or `<<CheckLocationLink ...>>`).

### NPCs, schedules, activities
- `$mom`/`$sister` (`define_npcs.twee`): identity fields, `stats` with `max`/`min` (lust, corruption, exhibition, relation, reputation, resistance, energy, morale), `skills` (software, hardware, analysis, testing, consulting, management, hr, sales, marketing), `flags`, `profile`, `quests`, `quest`.
- Activities are **constants**: `setup.activities.<sysName>.<id>` (`define_activities.twee`) = `{ id, [base,] text, locations[], [when[], duration[],] media[], cctv[] [, cctvPassage] }`. The game state only stores the **id string** (schedule slots, `task.activity`, stage `activity`, `$mom.activity`). `text` is what the player reads (may contain variables); `media` files live in `images/characters/<sysName>/activities/`, `cctv` files in `.../tasks/`, named `<id>_<n>.<ext>`. Task activities end in their stage number (`giving_massage0`, `giving_massage1`) and share a `base`. Read them with `setup.getActivity(who, id)`, `setup.activityText(who, id)`, `setup.activityIs(who, id, list)` (ids or bases) and `setup.activityMedia(who, id [, "cctv" [, random]])` (one file, the same for the whole action). Never read `.text` off the id.
- Where mom/sister are comes from two layers (`define_schedule.twee`, full reference in its header):
  - **Routines** are constants: `setup.routines.<sysName>.<id>` = `{ [extends,] rows, tasks, extras }`. A routine with `extends: "<id>"` starts from that routine and only lists what differs: `rows` is then an object keyed by row number (`{ 12: [...], 13: [...] }`), and `tasks`/`extras` are inherited unless given. Prefer a new routine that extends an existing one over copying 21 rows. `setup.checkRoutines()` reports broken routines in the console at startup. `rows` holds 21 arrays of options `{ location: "<sysName>", activity: ["<id>", ...], weight, requirements }`; one option is picked per row. An option without `activity` picks a random activity of that place whose `when` includes the time slot. One option with one activity is a pinned row. `tasks` gives the row ranges the CMD scheduler may fill (everything else is locked there). `extras` sprinkles short visits (bathroom) over the rows that aren't pinned; each extra limits where it may go with `when`, `from` (places or `setup.locationGroups` like `"home"`), `requirements` and an optional `check` function. Events that need her somewhere use `setup.npcIsAt(who, place)` in their `requirements` (the bathroom walk-ins do).
  - The state only stores the routine's **name**: `$mom.routine = { weekday, weekend [, 0-6] }`. Story code switches it with `<<run setup.useRoutine("mom", "weekday", "stage1_office")>>`. Never edit rows in the state.
  - The **plan** (`$mom.plan`, 21 `{ location, activity [, extra] }` rows) is rolled once per day in the Daily Update (or on first use) and stays fixed for that day. Activities' `duration` keeps one going over several rows.
  - Tasks are never written into the plan. `setup.npcAt(who, row)` / `setup.npcNow(who)` lay the running or scheduled `$activeTasks` entry on top, and PassageReady copies `npcNow` into `$mom.location`/`$mom.activity` (`setup.updateNpcPositions()`). Read those, or `npcAt`, never the plan directly when a task could be involved. `setup.isTaskRow(who, row)` tells the scheduler which cells are free.
- Employees (`$ethan`, `$brian`, `$darius`) only have energy/morale stats, `skills`, `wage`, `assignedProjectCount`. They are pushed into `$company.employees` in Too Much Work 2/3.

### Stats
`<<UpdateStat "+"|"-" "Key" amount>>` changes a stat, clamps it, prints a coloured line and queues a notification. Keys come from `setup.statDefs` in StoryScript: `Money` (`$player.money`), `Corruption` (player), `Reputation`/`Efficiency`/`Suspicion`/`Morale` (company), `Prototype` (progress), and `MomRelation`/`MomCorruption`/`MomResistance`/`MomLust`/`MomExhibition` plus the matching `Sister...` keys. Add new stat keys there.
- What the stats do (from the design notes): **Relation** comes from interactions and quests. **Corruption** comes from scenes and gates quests. **Lust** grows every day and drives masturbation/micro events; the bed masturbation events (`$events[3]` mom, `$events[4]` sister) reset it to 0. **Resistance** rises when the device is used on someone (`<<UseQuestDevice>>` adds impact × `$statInfluence.resistancePerImpact` to the target, so scenes don't add their own device cost) and blocks scenes; it drops a few points a night. **Morale/energy** limit project work and tasks (a task costs `setup.taskEnergyCost`: base plus a surcharge for missing morale). The daily drift formulas use `$statInfluence` in `Define Misc`.
- A `statDefs` entry may have `active` (a function; while false, `UpdateStat` does nothing: Suspicion before Stage 2), `maxPath` (a max that changes during the game: the player's corruption cap, `$player.stats.max.corruption`, 40 in Stage 0 and 100 from Stage 1) and `capText` (printed instead of "+0" when the stat is already full: the corruption bars).

**Corruption stages** (mom/sister, "Corruption stages" at the end of `define_npcs.twee`):
- `stats.corruption` (0–100) is the progress **inside** her current stage; `$mom.corruptionStage` is the stage. The bar stops at 100 ("ready", amber pill in the sidebar) and more is lost. A milestone scene calls `<<AdvanceCorruptionStage $mom ["log text"]>>` (`profile_widgets.twee`): stage +1, bar back to 0, notification, Progression entry.
- Stages are constants in `setup.corruptionStages.<sysName>` = `[{ name, milestone }]`, index = stage. Stages 0 to 3 exist, with the working names from `STAGE1_PROPOSAL.md`. Mom: Reserved, Dutiful (`mom_briefing`, the handjob before the handover of the boss prototype), Willing (`main_catalystNight`), Complicit (`mom_calendar`). Sister: Conflicted, Yearning (`sister_souvenirs`), Devoted (`main_catalystNight`), Mine (`sister_everything`). Only The Briefing is written; the other milestones are stub scenes. Add a stage by adding an entry.
- **Never compare `stats.corruption` directly.** Thresholds use `setup.corruptionTotal(who)` = stage × 100 + bar (the Stage 0 numbers 30/40/60/75 keep working; "stage 1, 40" is 140), formulas (daily drift, chances) use `setup.corruptionEffective(who)` = bar + stage × `$statInfluence.corruptionPerStage`. Interaction `needs`/`max` and camera spots already read the total. Labels: `setup.corruptionLabel(who)`, `setup.corruptionNeedText(total)`.
- Activities may add `stageText`/`stageMedia`/`stageCctv` (`{ 1: ... }`, highest key ≤ her stage wins, files `<id>_s<stage>_<n>.<ext>`); `setup.activityText`/`activityMedia` pick them up and `tools/activity-media.mjs` checks them.
- The player has no stages: his `max.corruption` cap is raised by the story instead (Stage 1 Follow Up raises it to 100).

**Company stats** (`$company.stats`, "Company stats" at the end of `define_company.twee`, only active from Stage 1, `setup.companyStatsActive()`):
- **Efficiency** multiplies staff project work (`setup.efficiencyFactor()` = 0.5 + eff/100) and drifts every night toward `setup.efficiencyTarget()`, the sum of `setup.efficiencySources` (vent unit level, low Morale). One-off boosts (Secretary Work +2) use `setup.changeCompanyStat(key, n)` and fade. Lasting sources (office upgrades, Veil) go into `efficiencySources`.
- **The vent unit** (the full-strength Valenx in the office ceiling): `$company.vent.level` indexes `setup.ventLevels` (Off/Low/Medium/High: efficiency target and the morale `drain` multiplier). Switched in the CMD device strip (`openVentDialog` in `CMD Other`); no charge. The other devices are charged at My Desk for actions: +`setup.deviceChargePerAction` (20)% each (`window.chargeDevice`, CMD Other), plus +15% overnight.
- **Morale**: overnight employee recovery `setup.moraleRecovery()` (5 + morale/5), work drain 1.8 per action × `setup.moraleDrainFactor()` (on Low the night makes up for a work day, Medium and High wear them down); +2 per Coffee Break, ±2 for projects on time/late, drifts 5/week toward 50.
- **Reputation**: repeatable client projects pay × `setup.reputationRewardFactor(p)` (0.8 + rep/250); +3 per client project on time, −1 per overdue day; use it in project `unlock` conditions.
- **Suspicion**: `setup.suspicionActive()` is false until Stage 2; until then it stays 0 and is hidden. Tuning numbers live in `setup.companyStatTuning`.

### Quests (`define_quests.twee`, widgets in `quest_widgets.twee`)
Every character with a story arc gets a quest line on their own object: `$player.quests` (main), `$mom.quests`, `$sister.quests`, `$prof.quests` (ids `prof_...`, scenes in `dev/quests/prof/`). `X.quest` holds the id of the line's current quest. `setup.questLines = ["player", "mom", "sister", "prof"]` is the one list everything reads: the sidebar cards (`Quests Caption`), the check-quest tick (`Check Quest Requirements`), the CMD header chips, event generation and `tools/quest-audit.mjs`. More lines are planned (`$boss`, `$manager`, `$landlord`, maybe `$brian`, `$darius`, `$dad`, and groups that have no object yet). To add one: give the character a `quests` array and a start (`<<set $boss.quest to "boss_...">>`) in Define Quests, end it with a `boss_end` quest, add the key to `setup.questLines`, add a portrait at `images/characters/portraits/<key>.jpg`, and optionally a ring color (`[data-line="<key>"]` in `CMD Header` and `StoryCaption`). A group without a character gets its own story variable with `name`/`callName`/`sysName`, `quests` and `quest`. Don't use the empty `$quests` array.

Quest fields:
- **Identity**: `id`, `next` (the following quest's id), `title`, `task` (sidebar text), `active`, `done`, `doneDay`.
- **Event quest**: `needsEvent: true`, `passage`, `returnPassage`, `where` (location objects), `whenDay`, `whenTime`, optional `requirements` (TwineScript strings) and `requirementsText`, optional `device: { target, impact [, key] [, minQuality] }`. `<<GenerateEventsForQuests>>` (end of Define Quests) turns these into `$events` entries (`quest.eventId`).
- **Requirement counters**: a `requirementsText` entry may contain `{{TwineScript}}`, which is filled in live wherever it is shown (`setup.questRequirementText(quest, i)`): `"Hold 10 test sessions ({{...count}}/10)"`. Don't use `<<= >>` there, its `>>` would end the `<<set>>`.
- **Locked display**: while a quest's `requirements` aren't met (the device doesn't count), the sidebar card (`<<SbQuest>>`) and the CMD header hide its title, task, place and time and show `setup.questLockedText` plus the requirements checklist. Optional `lockedTitle`/`lockedTask` give one quest its own stand-in text. Read it with `setup.questDisplay(quest)` (`{ title, task, locked }`) wherever a quest is shown.
- **Check quest**: `check: "TwineScript condition"`, which advances automatically on PassageReady.
- **Wait/placeholder quest**: neither of the above, so something else must call `<<NextQuest>>`.
- **Optional quest**: `skip: "TwineScript"`. While it's true, the line jumps over the quest (it counts as done with `skipped: true`, its `set` does not run). `<<NextQuest>>` checks it when the line arrives, and Check Quest Requirements checks it on every passage, so the decision may also come after the line got there. Decision flags are therefore three-valued: `null` until decided, then `true`/`false`. Write the skip so it's false while undecided (`"$mom.flags.gymDinner === false"`), lock the quest with a requirement until the decision exists, and only offer the branch in a scene once the line has reached the optional quest (`setup.questReached`). Helpers: `setup.questSkipped(quest)`, `setup.skipQuests(line)` ("Optional quests" in Define Quests).
- **Hidden quest**: `hidden: true` runs like any other quest (check, set, events) but gets no sidebar card, no CMD header chip and no "new quest" notification. Use it for a background wait at the start of a line the player shouldn't know about yet (`prof_waitFirstProjects` waits for the first two projects plus a week and sends his mail in its `set`).
- **`set`**: TwineScript strings run when the quest is *finished* (unlock locations, activate other lines' quests with `setup.activateQuest('id')`, set flags).

To advance: `<<NextQuest $line>>` finishes the current quest, runs its `set`, activates `next` and shows a notification. `<<SkipToQuest $line "id">>` is for debugging and skip-intro. Other helpers: `setup.getQuestById`, `getCurrentQuest($mom)`, `questDone(id)`, `questReached(id)`, `activateQuest(id)`, `getEligibleQuests()` (lights up location hints), `questDevice(device)`.

Each line ends with a `*_end` quest ("End of Content"). Insert new content before it and re-point the `next` ids. Lines gate each other with "Progress Main Quest" wait quests (`mom_waitMainOutreach`, `mom_waitMainStage1`) that the other line activates through `set`.

### Events & micro events (`define_events.twee`, `event_widgets.twee`)
- `$events`: full-screen scenes with `passage`, `returnPassage`, `where` (passage names), `whenDay`, `whenTime`, `chance`, `cooldown`, `once`, `active`, `finished`, `completedAtDay` and optional `requirements`. `<<CheckForEvent>>` plays them; `<<ReturnFromEvent [text] [passage]>>` ends them. Ids 0–4 are hand-made (Rent Due, bathroom walk-ins, bed masturbation); the rest are generated from quests. An event is played with a normal history entry, so `passage()`/`tags()` see the scene; `setup.inScene()` (tags `event`, `scene`, `task_scene`) switches off the sidebar links that would leave it. Every scene passage needs one of those tags.
- `$microEvents`: small inline moments included **inside** a location passage (`[micro_event event nobr]`). Fields: `where` (location names), `conditions { npc, npcLocation, npcPreviousLocation, whenTime, eval: [fns] }`, `chance`, `oncePerDay`, `apCooldown`, `lastSeenDay`/`lastSeenAP`. Breakfast, lunch and dinner are micro events 0–2.

### Interactions (`define_interactions.twee`, `dev/interactions/`)
`$interactions.actions` defines the cards on the `NPC Interaction` screen: groups (social, flirt, intimate, other), `cost`, `needs`/`max` stats, `blocked`/`only` activities (ids or bases), `chance` formula, `effect`/`fail`, and either a `passage` (`"{npc} {activityId}"` → e.g. `Mom watching_tv`) or short generated `scenes` (`{activity}` in their texts is the display text). `requires` (TwineScript) keeps a card hidden until the story unlocks it (the mom-only "Ask her to take care of you" handjob card waits for `mom_nightVisit`), and `private: true` locks it while the other family member is in the same place or the staff is around. A card with a `passage` applies its stat changes in that passage (see `Mom Kiss`, `Mom Handjob`). `{sysName}` in `requires` is hers ("setup.hasDayReport('{sysName}')"). During The Silence every card with mom is locked (`setup.interactionSilence`). The field reference is at the top of the file.

### Meals (`define_meals.twee`, `dev/meals/`)
`$meals` entries: `id`, `passage`, `isActive`, `mealType`, `isImportant`, `dayType`, `cooldown`, `once`, `present` (who must be home, and nobody else), `requirements`/`set` (functions). `setup.pickMeal()` prefers active important meals, then filler, then `default`. Story meals (`dev/meals/important/`) are switched on by the quest scene they follow: the scene sets `<<set setup.getMealById("id").isActive to true>>` right before its `<<NextQuest>>`, and the meal turns itself off again in its `set`. Each important meal passage starts with its definition and an "Activated by" comment naming that quest, and its text should call back to that quest. Meal passages are `<<include>>`d by `Breakfast`/`Lunch`/`Dinner`, so they contain no `<<UseAction>>` or return link; those wrappers also set `lastSeen`.

### Profiles (`define_profiles.twee`, `dev/system/profile/`)
`$mom.profile`/`$sister.profile` hold the portrait, facts, personality and appearance text, plus the Progression log (`<<ProfileLog $mom "Title" "Text">>`) and Recollection (`<<ProfileMemory $mom "Title" "Text">>`). Open one with `<<set $profileNpc to "mom">><<set $returnFromProfile to passage()>><<goto "Profile">>`. The fourth tab shows her Feelings.

### Family offers (`define_quests.twee`, "Family offers"; the macro in StoryScript)
A deal has a plain price, and the player may offer mom or the sister instead (`STAGE1_PROPOSAL.md` 3.1). The choice lives **in the scene**, never on the interaction screen:
```twee
<<Offer>>
<<plain "I'll go myself" "20% off the contract">>        ...that branch...
<<plain "Pay the broker" "-$15,000" 15000>>             ...a price: locked while the account can't cover it, paid on click...
<<family $mom 2 "Send $mom.callName" "the full contract">>  ...locked with the reason until she's ready for level 2...
<<stall "Let me get back to you" "main_gymDinner">>     ...ends the scene undecided; end this branch with <<ReturnFromEvent>> only
<</Offer>>
```
Each card runs its own block on click. The levels (Charm, Warm-up, Entertain, Handed over) are `setup.offerLevels` = `{ name, corruption (total), exhibition }`, placeholder values marked `STAGE1-STUB` (the author sets them); `setup.offerReady(who, level)` gives `{ ok, reason }`. A stall keeps the quest's event alive and waits `setup.offerStallDays` days (CheckForEvent skips it, `setup.offerStalled`), at most `setup.offerMaxStalls` (or the quest's `maxStalls`) times; the scene reads `setup.offerStalls(questId)` for a shorter replay and a worse plain price.

### Feelings, the end-of-day report, POV passages, The Silence (end of `define_npcs.twee`)
- **Feelings** (proposal 3.6): `$mom.feelings`/`$sister.feelings` = `{ <sysName>: { mood, floor } }`, how she feels about one person (`"player"` for him), -10 to 10. `<<Feel $mom "boss" -2 ["lasting"]>>` or `setup.feel(who, key, n [, true])` in code: a plain change moves the mood, which fades one step a night toward the floor; `"lasting"` moves the floor too. Read with `setup.feels(who, key)` / `setup.feelsLabel(who, key)`. Feelings never block anything, they only color text where a scene has a natural spot for a variant.
- **End-of-day report** (proposal 3.5): `$mom.dayLog`/`$sister.dayLog`. A finished task with a `report: { line [, ask] [, passage] [, requires] }` (on the task or on a stage, `line` may be a list) logs itself in `completeTaskEntry`; events and deals use `<<LogDay $sister "id" ["deal"]>>` with their line and passage in `setup.dayReports.<sysName>.<id>`. From the Evening on, while today's log has entries and after Office Gossip (`setup.dayReportsUnlocked()`), the "How was your day?" card (`dayReport`, its own group "report" at the top of the screen, highlighted while usable through `highlight: true`) opens `Day Report`: her lines, then links to hear an entry in full. The Daily Update drops old entries.
- **POV passages**: tag `[scene pov]`, `<<PovHeader $mom>>` ... `<<EndPov>>`. Two doors open them: the CCTV arrow (the task stage `passage`, or an activity `cctvPassage`) and the end-of-day report. Both set `$povReturn`, which `<<EndPov>>` goes back to. They can be watched any number of times, so effects never go in them: they belong in the task's `onComplete` or the scene that logged the entry. Task POV passages live in `dev/tasks/<npc>/` (`Task Mom Flirt Duty 0`).
- **The Silence** (mom, 5.5, `$mom.flags.silence` from Not Enough until `mom_silence` a week later, `setup.momSilent()`/`setup.silenceDay()`): her cards are locked, her tasks with the player rest (`setup.restsForSilence`), micro events with her are skipped unless they have `duringSilence: true`, no wake-up coffee, and a nightly Morale/Resistance loss (`setup.silenceTuning`). Her attempts to make up are the meals `silence_breakfast`/`silence_lasagna` (switched on by the set of `mom_notEnough`) and micro event 45 (`Mom Silence Note`).
- **Catching her** (after The Booze Night, `define_events.twee`): micro events 46 to 48 (`Mom Catch Couch/Kitchen/Shower`), gated by `setup.momCanBeCaught()` and rolled with `setup.momCatchChance()` (grows with her Lust).
- **The morning routine** (after The Crawl, `$mom.flags.morningRoutine`): Activity Sleep offers `Morning Routine` instead of the coffee wake-up, with a "Not this morning" link (`setup.morningRoutineReady()`, end of `define_npcs.twee`). `$mom.flags.morningRoutines` counts it.
- **Whenever** (after The Calendar, `$mom.flags.freeUse`): the "Whenever I want" card (`Mom Whenever`, by place and `$mom.flags.whenever`) and desk visitors 49/50 where she offers first.

### The device (prototype)
- **Stage 0**: `$company.prototype` (`progress`/`maxProgress`, `charge`/`maxCharge`, `rechargePerDay`, `calibration` + `calibrationQuality`, presets mom/sister/general). Progress comes from `Activity Prototype`/`Activity Prototype Company` (+1 each) and from the **workbench** at the Company office (`Prototype Workbench`, `dev/activities/minigames/prototype_workbench/`): a mouse-driven minigame of three jobs (hardware: wiring/solder, software: debug/flash, test: logic/stress) whose average score gives up to `setup.workbench.maxGain` progress, harder from 40 and 70 (`setup.workbenchTier()`; tuning in "The workbench" in `define_company.twee`). `Prototype Workbench Result` applies `$workbenchResult` and spends the actions. `UpdateStat "Prototype"` is capped at `maxProgress`. Calibration is a separate minigame (`dev/activities/minigames/prototype_calibration_advanced/`, `Define Calibration`).
- **Stage 1**: `$company.devices`:
  - `valenx`: the original, full strength; only the player knows.
  - `valenxOfficial`: the weak version sold to clients.
  - `valenxVeil`: area effect.
  - `valenxCatalyst`: amplifies dormant desires.

  Each has `charge`, `calibration`, `owned` and an SVG `design`. Home micro events that use the device read `setup.homeDevice()`: the Stage 0 prototype until Stage 1, then `valenx`, so they share the charge the quests spend.
- Quest scenes that use the device declare `device: { target, impact [, key] }` (cost from `$company.impactCost[impact]`) and call `<<UseQuestDevice $line>>` where the device switches on. `_vxQuality` then holds the calibration quality for text variants. A scene that uses it on two people gives a list (`device: [ { key, target, impact }, { ... } ]`, the Catalyst Night) and switches each entry on by its target: `<<UseQuestDevice $player "sister">>`. A device with `anyTarget: true` (the Catalyst) only needs a good calibration, not a matching target. `setup.useDevice(key, target, impact [, questId])` is the use itself (charge, Resistance, uses and spikes); call it directly for a use outside the quest check (the Anchor in The Calendar).
- **The Anchor** (`$company.devices.valenxAnchor`, owned once `project_company_anchor` is done): `maxUses: 2`, the full charge per use, and a `spikes` log (`{ day, target, quest }`) that Ethan finds later. `setup.deviceUsesLeft(dev)`.
- **Screen pulse**: `<<UseQuestDevice>>` also starts a heartbeat glow over the whole screen at the quest's impact (an optional second argument overrides it, 0 = none). Outside quests, or to turn the dial during a scene, use `<<DevicePulse 4>>`, `<<DevicePulse "+2">>` (quoted), `<<DevicePulse "off">>`; add `"keep"` to keep it over passage changes (also `<<UseQuestDevice $mom "keep">>`), otherwise it fades out on the next passage, and `"3s"` to delay the change (`<<DevicePulse "off" "3s">>`). An `"off"` in the same reveal step as the switch-on would never be seen, so put it in the next step or leave it to the passage change. JS: `setup.devicePulse(power, { keep, color, fade, delay })`, `setup.devicePulsePower()` ("The device pulse" in `define_company.twee`, CSS `#device-pulse` in StoryStylesheet). It's page-only (not saved), never catches clicks, and the player can switch it off in the settings.

### The company, Stage 1 (`define_company.twee`, `dev/locations/company/`)
- `$company.stage`: 0 = home + small office, 1 = third-floor office with staff, 2 = placeholder, 3 = placeholder. Money: in Stage 0 it's `$player.money`; from Stage 1 on, `<<CalculateFinances>>` sweeps it into `$company.finances.money`.
- **My Desk** (`Company Stage 1 Desk`) shows the **Company Management Dashboard**, built from `CMD *` panels in `dev/locations/company/cmd/`:
  - Header; Actions (the player's own Work button, `$playerWorking`); Schedule + Slots (drag tasks onto mom's/sister's day); Stats; Management (employee cards/dialogs).
  - Projects; Mails; Finances (chart from `finances.history`); CCTV + Control (watch mom/sister, CCTV clips per activity); Other.

  A panel refreshes itself with `$("#cmd-x").empty().wiki('<<include "CMD X">>')`.
- **Mails** (`define_mails.twee`): `$company.mails` with `body` and `answerOptions[].eval`. Answering one unlocks projects (`setup.unlockProject`) or activates tasks. An answer may have `offer: { who, level }` and `money`: it's locked with the reason while she isn't ready or the account can't cover it (`setup.mailOptionLock`), and the money is paid when it's sent.
- **Projects** (`define_projects.twee`, `project_widgets.twee`, field reference at the top of the Define passage): string ids (`project_boss_prototype`). `type` is `"story"` (done once) or `"repeatable"` (can be taken on again, optional `cooldown` in days, each run starts from zero progress). Every project is started by the player in the **Project Overview** dialog (`CMD Project Overview`, the arrow in the CMD Projects head), never by story code, once its `unlock` TwineScript conditions are met. Projects that aren't available from the start get `unlocked: false`: the overview hides them (no spoilers) until the story calls `setup.unlockProject(id)`, preferably in the `set` of the quest that introduces them (`main_officialProductMeeting` unlocks `project_company_official`), or in a mail answer's `eval` (the boss and diner mails) or another project's `onComplete`; `project_boss_support` is unlocked by the `set` of `mom_briefing` (the handover). In-house projects have no `client`, `reward: 0` and an `outcome` text instead. `setup.startProject(id)` (or `<<StartProject "id">>`) sets `active`, `startedAtDay`, `due` (dayCount) and activates the project's `task`. Check story progress with `setup.projectDone(id)` (`timesCompleted > 0`), not `completed`, which only describes the last run. `setup.projectStatus(p)` gives the overview group. `<<ProgressProjects>>` adds employee work on weekdays during `$company.workHours`. That work is skill/10, split across their projects and scaled by their morale (50% at 0, 100% at full), and every action of it costs them `setup.companyStatTuning.moraleDrainPerAction` (1.8) × `setup.moraleDrainFactor()` morale (the fraction is kept in `employee.moraleCarry`). Work only goes to categories the project needs. `setup.checkProjects()` completes a project when every requirement > 0 is met and pays `reward`, minus `latePenalty` (5%) per overdue day, down to `minRewardFactor` (25%). Projects never fail. An optional `staff: ["brian"]` limits who may work on a project (`setup.projectAllows`): the project window only offers them and nobody else's work counts (the Anchor).
- **Tasks** (`define_tasks.twee`): `$tasks` are jobs mom/sister do when scheduled. Fields: `who`, `location`, `apCost`, `startTime`, `npc`, `activity`, `revenue`, `baseEnergyCost`, `onComplete`, `count` and optional `stages`, which swap the activity/CCTV clip as the task is repeated. Scheduled copies live in `$activeTasks.mom|sister`. `checkTaskProgression()` (StoryScript) pays and finishes them.
  - **Tasks with the player** have a `withPlayer: { where, prompt, summary, missed [, accept, decline, declined, missedCost] }` block (e.g. `task_mom_private_attention`, the massage at My Desk). They only happen when the player is at a `where` location as they start. Then `<<CheckTaskScene>>` (PassageReady) opens a dialog (`withPlayer.prompt`, `accept`, `decline` texts): accepting plays the current stage's `passage` as a full scene; declining or closing the dialog counts as missed (`withPlayer.declined` notification). If he is elsewhere, the task is missed for the day: no effects, but she loses Relation and Morale per action of the task, as set in the task's `withPlayer.missedCost` (e.g. `{ relation: 1, morale: 3 }`; without it a miss costs nothing), shown in the `missed` notification. A scene passage is tagged `[task_scene]`, lives in `dev/tasks/<npc>/`, plays every time in full (no short variants), keeps its effects in the task's `onComplete`, and ends with `<<EndTaskScene ["Link text"]>>`, which spends the remaining actions so the task finishes the normal way. Skipping past it from the desk counts it with the `summary` notification. Two with-player tasks can't overlap in the schedule. Helpers and the full flow: "Tasks with the player" in `define_tasks.twee`.
- **Money for deals**: `setup.spend(amount [, label] [, quiet])` (also the Shop) and `setup.canAfford(amount)` in "Money for deals", Define Company. **Debts**: `setup.addDebt(id, label, amount, perWeek, weeks)` puts the money in now, and `setup.payDebts()` takes one installment every Monday morning with the wages (`$company.debts`). It's the advance from the boss in The Supplier.
- **Finances**: weekly rent `$rent` (Stage 0 $2000; Stage 1 $3750 thanks to the landlord deal), due every Monday (`$rentDueDay`, helpers under "The weekly rent" in `Define Misc`). The player can bring it to the landlord's place (`Landlord Apartment` → `Landlord Pay Rent`) before Monday evening; from Monday evening on the `Rent Due` event (`$events[0]`, `requirements: setup.rentIsOverdue()`) catches him at home or at the office. Both pay through `<<PayRent>>`. Wages are `employee.wage * 7` per week, paid every Monday morning from the company account (`setup.payWages()`, Define Company). The finance chart shows the balance and what actually left the account each day (`finances.spentToday`, counted by `<<PayRent>>` and `setup.payWages`).

### Other
- Sidebar: `StoryCaption` → `dev/system/caption/*` (quests, time, location, player, mom, sister, prototype, quick actions), using `<<SbMeter>>`, `<<SbNpc>>` and `<<SbQuest>>` from `sidebar_widgets.twee`.
- Quick links (`Quick Caption`, data in `define_quicklinks.twee`): situational sidebar shortcuts (go to work, wait for the next meal, go to bed, go home, wait). Each is a `setup.quickLinks` entry with `when`/`label`/`cost`/`target`; add new shortcuts there, not as `<<if>>`s in the caption. Debug links belong in `Dev Caption`.
- Settings (`$settings`, `Define Settings` + handlers at the top of StoryScript), audio (`Define Audio`, `<<PlayAudio>>` runs automatically from each location's `audio`), help dialog (`dev/help_dialog/`), main menu/gallery/changelog (`dev/intro/main_menu/`).

---

## Where to find things

| Looking for... | Go to |
|---|---|
| Initial values of anything | `dev/system/defines/define_*.twee` (loaded from `StoryInit`) |
| Quest list, quest helpers | `define_quests.twee`; widgets in `dev/system/widgets/quest_widgets.twee` |
| Quest scenes | `dev/quests/<main|mom|sister>/<stage0|stage1>/` |
| Random/home events | `dev/events/`, `dev/events/micro_events/`, data in `define_events.twee` |
| NPC data, stats, skills | `define_npcs.twee`; profile texts in `define_profiles.twee` |
| NPC daily routine (routines, daily plan) | `define_schedule.twee`, `define_activities.twee` |
| Interaction cards and talk scenes | `define_interactions.twee`, `dev/interactions/` |
| Meals | `define_meals.twee`, `dev/meals/` |
| Locations | `define_locations.twee`, `dev/locations/` |
| Player activities (sleep, shower, prototype work, diner shifts) | `dev/activities/` |
| Calibration minigame | `dev/activities/minigames/prototype_calibration_advanced/`, `define_calibration.twee` |
| Workbench minigame (prototype progress) | `dev/activities/minigames/prototype_workbench/`, tuning in `define_company.twee` |
| Time/day logic | `time_widgets.twee`, `dev/system/automations/` |
| Every-passage logic | `dev/system/automations/passageready.twee` |
| Scenes of tasks with the player | `dev/tasks/<npc>/`, flow in `define_tasks.twee`, widgets in `task_widgets.twee` |
| POV passages (her side, behind the CCTV arrow) | `dev/tasks/<npc>/` (tag `pov`), `<<PovHeader>>`/`<<EndPov>>` in `event_widgets.twee` |
| Feelings, end-of-day report, The Silence | end of `define_npcs.twee`; `Day Report` in `dev/interactions/`, `Profile Feelings` in `dev/system/profile/` |
| Company dashboard UI | `dev/locations/company/cmd/` |
| Projects, tasks, mails, company/devices | `define_projects.twee`, `define_tasks.twee`, `define_mails.twee`, `define_company.twee` |
| Macros (Chat, UpdateStat, PlayAudio), Notification, Config | `dev/system/storypassages/storyscript.twee` |
| Global CSS | `dev/system/storypassages/storystylesheet.twee` |
| Sidebar | `dev/system/caption/` |
| Intro, character setup, skip intro | `dev/intro/` |
| In-game help texts | `dev/help_dialog/pages/` |
| The author's story plan | `dev/notes_for_me.twee`, `STAGE1_PROPOSAL.md`; where Stages 2+ are heading: `LATER_STAGES_VISION.md` |
| How each character talks (language profiles) | `CHARACTER_VOICES.md` |

---

## World & characters

### The setting
A present-day American town: a residential area at its centre, the family's expensive house, a rundown diner, a shop, a college, the glass office tower where the mother used to work (her old office is on floor 6), and the landlord's shabby building. The player first rents a cramped office there (`$landlord.callName` calls it a "broom closet"), then the third-floor unit of the same building (the Stage 1 office: main room, his desk with the dashboard, a meeting room). In the Stage 1 office a full-strength Valenx unit is hidden behind the air vent, quietly influencing everyone who works there.

### The device
The player built `$company.prototype.name` (default "Valenx") to *read* rooms: heartbeats, light, movement, attention. When it stopped paying, he realised that reading people is a short step from steering them. The device nudges a person's state (calm, focus, agreeableness, desire). It needs charge and has to be calibrated to a target. Using it on someone raises their resistance. Every version sold to clients is a deliberately weakened one, and nobody else knows what the real one is capable of.

### Story so far
- **Intro**: The player graduated from high school a year ago, founded an LLC, lost his only client (a café chain) and went broke. He worked at the diner under a manager who mocked him, then moved back home. He's bitter about a world where "connections matter more than effort" and decides: "If the game is already rigged, I'll just have to control the people playing it."
- **Stage 0** (home life, small office):
  - **Main line**: finish the prototype (40 → 70 → 100), test it on mom, use the sister's idea to pitch it to the diner (first client), then talk the landlord into a bigger office, with mom and sister "helping" to convince him. Pay $10,000 and move up.
  - **Mom's line**: she's worn down at work by her abusive boss. The player "helps" with the device, sabotages her work so she gets fired, and makes a deal with the boss ($5,000 and a secret clip of her), who becomes client two. She ends up working for her son.
  - **Sister's line**: she's struggling in two classes. He wins her trust, manipulates the professor so she passes, then manipulates her when she comes home blackout drunk after a party. Conflicted feelings and a kiss follow, and she takes an internship at his company.
- **Stage 1** (current content): renovations; the three mails (landlord rent deal, the boss's prototype order, the diner analysis); hiring (Too Much Work 1–3); two projects. Mom: "CEO struggles", new-job check-in, test sessions (4 task stages, each dirtier), then "No stimulus": after 10 sessions she undresses completely in his room without the device (she begs to keep her panties on, he makes her take them off too; he never touches her). Then "The Briefing" (her first corruption milestone, stage 0 to 1): on the morning of the prototype handover he puts her in a braless silk outfit and she gives him a handjob in the meeting room, "just this once"; at "The Handover" the boss gropes her and signs up for the weekly support project. "A Knock at Night" (`mom_nightVisit`): a few nights later, with her lust high, she comes to his room to take it back; he turns the device all the way up, talks her into it being her duty as his mother, and she gives him a handjob in his bed. From then on she does it whenever he asks ("Ask her to take care of you" interaction, `$mom.flags.handjobs` counts them). Sister: supportive intern, internship overview meetings. Written after that (`STAGE1_PROPOSAL.md` phases 1 to 5): main, The Veil (team meeting, Ethan names it), The Late Night (the vent off, "you'll get your piece"), The First Real Sale (a phone call and the bar), The Gym Meeting (corporate talk, the router redesign). Mom: The Booze Night (no device, she goes to bed alone), Caught (she finishes in front of me while Brian stands in the door), Flirt Duty (coaching, then her rounds as a task with POV passages), Not Enough (she says no, The Silence follows), The Crawl (the green dress, her first blowjob, coffee every morning). Sister: The Ask (she turns Darius down), Souvenirs (the party photos, her first sober handjob, stage 1), Office Gossip (her end-of-day report starts), Send Me Something (two videos, then I walk in on her). Phases 6 to 13, written where no missing system blocks them: Morale (Darius brought in or shut out, `$flags.dariusBroughtIn`, `$darius.equity`), The Profit Party (the Catalyst announced, Ethan's 2%, the investor mentioned), The Crack (Ethan on the uncapped build) and The Access Log (`main_crackLogs`, the wrong confrontation with Darius), The Retail Pitch (master access, `$flags.trustedEthan`); sister: What Are We, Be Nice to Brian, Two Towns Over (`$sister.flags.datePhoto`), The Friend, Everything (stage 3, her first time), A Knock at Night, Again. With the offer system: The Gym Dinner (`$mom.flags.gymDinner`, `gymDinnerLetHim`) and Was That Right?, The Anchor, The Catalyst Night (both milestones into stage 2), The Calendar (stage 3, `calendarChoice`, a second part that night), The Introduction (`$flags.retailIntro`), The Rooftop, The Supplier (`$flags.supplierOffered`, the Boss's advance), Rehearsal, The Night Shift (Night Shift 1 to 3 and both Last Night passages, `$flags.answeredEthan`). Still `STAGE1-STUB`: The Diner Incident (needs the Manager line), After Hours (the Boss line) and The Morning After (the handover). Planned beats are in `STAGE1_PROPOSAL.md` and `notes_for_me.twee`.

### Characters
- **The player**: `$player` (default Michael Adams), 19. Self-taught founder, sees himself as the one at the edge of every group photo, describes himself as chubby. Smart, resentful and increasingly cold. He tells himself it's all about building something; really it's about control. His corruption stat gates darker choices. He rarely says the cruel part out loud.
- **Mom**: `$mom` (default Anna Adams), 39. Warm, supportive, puts the family first, and pays for the house and the sister's tuition. Very good with people and organisation. She worked under Victor Anderson; the intro calls her a mid-level office admin and her profile says project manager, so keep it vague ("her old job"). Long blonde hair, blue eyes, athletic. The father (`$dad`, Arthur) is absent and only mentioned. After being fired she runs clients, paperwork and scheduling at the company and is the on-site consultant at Anderson's office. Her arc moves from warm and worried to dutiful and compliant; her lever is "a mother's duty". Calls the player "sweetie", "honey", "sweetheart".
- **Sister**: `$sister` (default Sophie Adams), 20, college student. Confident, popular, usually a good student, playful and affectionate, spends freely. Long brown hair, blue eyes, fit. Close to her brother since childhood. After Stage 0 she's his intern: diner shifts for `$manager`, tutoring, helping at the office. Her arc is about guilt and confusion turning into devotion. She has already confessed and kissed him (Stage 0), so Stage 1 is about "what are we now?", not a second confession.
- **Mr. Howell**: `$landlord` (Norman Howell), 76. Greasy, foul-smelling, lecherous old landlord. Calls the player "kid". Lowered the office rent to $3,750 on condition that mom and sister come by every week to "help around the building" (tasks 3/4, `$flags.visitedLandlordThisWeek`).
- **Mr. Anderson**: `$boss` (Victor Anderson), 57. Mom's ex-boss, a bullying, sleazy, well-connected executive. Manipulated by the player, then made client two: he ordered his own prototype and insisted mom act as on-site consultant.
- **Mr. Morales**: `$manager` (Frank Morales), 48. Manager of `$diner.name` ("The Diner"), the player's former boss who liked to mock him. He became the first client after the diner test run. Stage 1: sister works shifts there, and he wants an analysis of how to make more money. Planned: revealing uniforms, the "aggressive customer" incident.
- **Mr. Walsh**: `$prof` (Antony Walsh), 61. The sister's calculus professor: balding, wire-rimmed glasses, irritable, influential on the curriculum committee. Manipulated so she passes. Planned: a "research project" proposal and more tutoring.
- **Ethan Reed**: `$ethan`, about the player's age, software (skill 30). The player's buddy from high school: they built the headset version of the device together as a school project, and Ethan wrote most of its code. They lost touch after graduation and found each other again when the player started hiring. There was no hackathon, and he never talks about the player as a "kid". Right after graduation he wrote the core of an app for three business-school guys who left him off the equity paperwork (his sore spot, "my piece"), then contracted for a startup that went under. That original headset could only *listen*. Easygoing joker; the player's first real friend in years. **Planned main antagonist of Stage 1**: he discovers the real influence data, steals the technology and starts a rival company. The notes call him "Evan"; the code uses Ethan. Don't foreshadow this yet.
- **Brian Hayes**: `$brian`, 34, hardware (skill 35). Heavy-set nerd in faded band shirts, constantly pushing his glasses up. Socially awkward, blunt, brilliant with a soldering iron, and never asks what the hardware is for.
- **Darius Brooks**: `$darius`, 26, data analyst (skill 32). Tall, athletic, tailored shirts, ex sports-franchise performance analyst. Polished and very sharp; the player has to watch what he shows him. The sister thinks he's cute.

### Themes and limits
- This is a dark corruption story told from the abuser's point of view. Manipulation, mind control and incest themes are central, and explicit scenes exist. The game doesn't moralise; the tension comes from the gap between how people see the player and what he's doing.
- **Every character is an adult.** Never describe anyone as underage. Keep the sister a college student and never move her to high school or make her younger. Keep the existing ages.

---

## Known gotchas
- `$date.today.value` is the weekday, `$date.dayCount` the day number (see Time).
- Mom's/sister's `stats.corruption` resets to 0 at every corruption stage. Checks go through `setup.corruptionTotal`/`corruptionEffective` (see Stats).
- `<<for>>` loops need an increment (`_i++`). A missing one hits SugarCube's loop limit and fails silently inside `wikifyText`.
- Requirement categories set to `0` mean "not needed". Filter with `> 0` and never treat 0 as "no limit".
- `$events[id]` and `$locations[id]` assume `id` == index. `$tasks` and `$company.projects` don't: never index them, use `setup.getTaskById("task_...")` / `setup.getProjectById("project_...")`. A project's `task` is a task id.
- Copies vs live objects: always read NPC stats through `State.variables[sysName]`.
- Text inside `<<set _msgs = [...]>>` must not contain unescaped double quotes.
- No apostrophes (or other unpaired quotes) in `/* */` comments inside a `<<set>>`. SugarCube's TwineScript parser doesn't know about comments, so `/* mom's */` opens a string. Every `$var` after it, up to the next `'`, is left unconverted and fails with "$x is not defined".
