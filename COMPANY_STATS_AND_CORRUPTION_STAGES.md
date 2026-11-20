# Design: company stats and corruption stages

## Status (2026-11-10): built, with these changes to the concept below
- **Efficiency has sources now**, not only future ones. The vent unit got a control: a "Vent Unit" card in the CMD device strip with four output levels (Off 35 / Low 50 / Medium 65 / High 80 efficiency target). It costs no charge (device charging is free in Stage 1, so charge would be no trade-off). The cost is morale: each level multiplies the morale staff lose while working (×0.8 / ×1 / ×1.25 / ×1.6), so High gets more done per action but burns the team out. Other current sources: Secretary Work (+2, fades), and low company Morale pulls the target down. Efficiency drifts +3/−2 per night toward the target.
- **Corruption stages: only Stage 0 and 1 exist** (`setup.corruptionStages`, names are placeholders: mom Reserved/Dutiful, sister Conflicted/Yearning). Both milestones are `null`: no scene advances a stage yet, only the debug links. The table of stages 2–4 below is not built and will be decided with the story.
- Everything else follows the concept. The code reference lives in the header comments of `define_company.twee` ("Company stats") and `define_npcs.twee` ("Corruption stages"), and in CLAUDE.md under Stats.

---

## Context
Two systems are about to matter, and neither is designed yet:
1. **Company stats** (Reputation, Efficiency, Suspicion, Morale) are shown in the sidebar and the CMD, but nothing reads them. The only write is `official_product_meeting.twee` (+5 Reputation, +5 Morale).
2. **Corruption** runs out of room. `$mom` is at about 40–60 at the start of Stage 1. The test sessions add about 19, and repeatable interactions add more, so she reaches 80–90 before the first handjob. All existing checks sit at 30/40/60/75 (quests, task stages, interactions, camera spots, the "<30 / <60" text variants in `mom_peeing`/`mom_showering`). There's no headroom left for Stage 1 and 2 content.

You decided:
- Stage-ups happen through **milestone scenes**.
- Company **Morale stays a separate stat**.
- This round is **concept only**.

This document describes both systems so they can be built later without redesigning anything.

---

## Part 1: Company stats

Common rules:
- All four stay in `$company.stats` (0–100), with the keys already defined in `setup.statDefs`.
- They're only active from `$company.stage >= 1`. In Stage 0 the sidebar hides them; `player_caption.twee` currently shows them all the time.
- Each stat gets **one clear effect** and a few **named sources**, so the player can read cause and effect off the CMD Stats panel.

### Efficiency: how fast projects get done
- **Effect:** a multiplier on the staff work in `<<ProgressProjects>>` (`project_widgets.twee`, the `contribution` line): `factor = 0.5 + efficiency / 100`. That gives ×0.5 at 0, ×1.0 at 50 and ×1.5 at 100. The player's own work and mom's/sister's Work task stay flat, because they're "manual" work.
- **Start value:** 50 when Stage 1 starts, so nothing changes until the story moves it.
- **Sources:**
  - **The hidden full-strength unit behind the vent.** This makes the stat a story mechanic: the office is literally being tuned. A future Control panel option could let the player "turn the vent up" (+Efficiency, but it costs charge and later raises Suspicion).
  - Office upgrades and purchases.
  - Veil installed in the office.
  - One-off quest bonuses.
- **Losses:** low company Morale (see below) pulls it down each week; disruptions in the story (Ethan's theft wipes the servers: a big hit).
- **Weekly drift:** a few points toward a baseline that the installed devices and upgrades set (`setup.efficiencyBaseline()`). Short boosts fade, devices last.

### Reputation: how easy it is to get clients, and how good the projects are
- **Effects:**
  1. **Unlocking.** New repeatable projects and client mails check Reputation in the existing `unlock` TwineScript, for example `unlock: ["$company.stats.reputation >= 25"]`. That's free, since projects already support `unlock`/`unlockText`.
  2. **Pay.** Repeatable projects pay `reward × (0.8 + reputation / 250)`, so ×0.8 to ×1.2. Story projects keep fixed rewards.
- **Sources:**
  - Projects finished on time (+3 to +5, set by `setup.checkProjects()`).
  - Story beats: the official launch, the first commercial sale.
  - Later, client entertainment by mom/sister as a task effect.
- **Losses:** late projects (−1 per day late, alongside `latePenalty`), the investigation in Stage 2, and anything bad that becomes public.
- **No drift.** Reputation is earned slowly and lost in jumps.

### Morale (separate stat): the working climate of the office
Each employee keeps their own morale for their own exhaustion. Company Morale is the **climate** around them: it decides how fast they recover and how hard work drains them.
- **Effects:**
  - **Overnight recovery** (`daily_update.twee`, currently a flat +15): `5 + morale / 5`, so +5 to +25.
  - **Work drain** (`ProgressProjects`, `Math.round(totalWorkThisTick * 2)`): `× (1.5 − morale / 100)`, so ×1.5 when Morale is low and ×0.5 when it's high.
  - Morale is what your note means by "can be overworked without complaining". It's also what Efficiency's weekly drift reads.
- **Sources:**
  - Mom/sister tasks: coffee break, the planned "nice long chat" and "flirtatious" tasks. Each task adds Company Morale in its `onComplete`, on top of its existing effect on individual employees.
  - Celebrations in quests (the pizza milestone).
  - Office upgrades, and Veil.
- **Losses:** overtime (staff work outside `workHours`, if that ever exists), late projects, and story shocks.
- **Drift:** each week a few points toward 50.
- **Stage 2/3:** unnamed staff don't get individual stats. Their whole state is Company Morale, so the stat already exists when they arrive.

### Suspicion: only from Stage 2 on
- **Inactive** until `$company.stage >= 2`, the anonymous tip after Ethan's theft. Until then it stays 0, the sidebar and CMD hide it, and `UpdateStat "Suspicion"` changes nothing. A `setup.suspicionActive()` helper decides this.
- **Sources:**
  - Device use on people outside the family: `<<UseQuestDevice>>` with a client as the target, +impact/2.
  - Turning the vent unit up.
  - Risky tasks (client entertainment, the drug deal).
  - Weeks with unusually high revenue.
- **Reducing it:** the lawyer and documentation tasks from the Stage 2 notes, clean projects, and a slow weekly decay.
- **Effects:** thresholds trigger events through the existing `$events` requirements:
  - 40: a letter or phone call
  - 70: an inspector visits the office, which needs prep (hide the vent unit)
  - 100: a raid, with a big fine plus a setback, or Game Over
- That makes Suspicion a pressure system with its own events, not a number that only goes up.

### Files a later build touches
`setup.statDefs` (storyscript), `define_company.twee` (start values, baseline helpers, comment header), `project_widgets.twee` (Efficiency/Morale factors), `define_projects.twee` (`setup.checkProjects` reputation and reward factor), `daily_update.twee` / `weekly_update.twee` (recovery, drift), `player_caption.twee` + `cmd_stats.twee` (visibility), and the help pages under `dev/help_dialog/pages/company/` (one stats page).

---

## Part 2: Corruption stages

### Model
- `stats.corruption` stays **0–100**, but it now means **progress within the current stage**.
- New field `corruptionStage` on `$mom`/`$sister` (`define_npcs.twee`), starting at 0.
- **The bar stops at 100.** The existing clamp (`max.corruption: 100`) already does that. 100 means **"she's ready"**, not an automatic stage-up.
- **Milestone quest.** The next stage's quest checks `setup.corruptionReady('mom')`. Its scene calls `<<AdvanceCorruptionStage $mom>>`: stage +1, the bar goes back to 0, a notification, and a ProfileLog entry.
- **What spills over is lost.** That's on purpose: once she's ready, more grinding doesn't help, and the player has to move the story forward.

### Checks without a rewrite: the total value
Helper `setup.corruptionTotal(who) = stage * 100 + corruption`.
- All existing checks switch from `$mom.stats.corruption` to the total **and keep their numbers**. Stage 0's 30/40/60/75 still mean exactly the same thing.
- New content counts higher: "stage 1, 40" is `>= 140`.
- That way old content never locks again after a stage-up. Without this, the kiss interaction (`needs corruption 30`) would disappear the moment the bar resets.
- The "<30 / <60" text variants stay right too: the shy text only shows while the total really is that low.
- **Interactions:** the `needs`/`max` check in `define_interactions.twee` reads `corruption` through the total. The same goes for `setup.cameraSpots[*].corruption` and task stage `requirements`.

Other helpers, in a new section in `define_npcs.twee`:
- `setup.corruptionStage(who)`
- `setup.corruptionReady(who)` (bar at 100)
- `setup.corruptionStageName(who)`
- `setup.corruptionStages.<sysName>`: constants with `name` and `milestone` (quest id) per stage, for the UI and the help page

### Proposed stages (built from the WIP plan, names are placeholders)
| Stage | `$mom` | Milestone into it | `$sister` | Milestone into it |
|---|---|---|---|---|
| 0 | Reserved: touches, massage, undressing under the device, "No stimulus" | start | Confused: feelings, kiss, internship | start |
| 1 | Helping: handjobs, teasing | briefing handjob (next quest) | Touching: handjob, the videos | the photo confession handjob |
| 2 | Devoted: oral, submits at home | the office lingerie blowjob (Stage 2) | In love: blowjob, "I love you" | the desk blowjob with Catalyst |
| 3 | Entertainer: client entertainment | after 15 sexual interactions | His: sex, total surrender | "submit completely or leave" |
| 4 | Tool: the drug-house trade | Stage 1 climax | Tool: the same | the same |

Each later stage gets more content, so it's fine that the stages vary in length. `$mom`'s next quest (the briefing) would be her first milestone: requirements = the boss prototype is ready + `setup.corruptionReady('mom')`.

### Daily drift formulas (`daily_update.twee`)
`lustFromCorruption * corruption` and `resistanceFromCorruption * corruption` would drop sharply after a reset. Proposed fix: they read `corruption + corruptionStage * $statInfluence.corruptionPerStage`, with a new tuning value of about 25. Each stage then permanently raises lust growth a little and pushes resistance down a little, without exploding the way the raw total of 300+ would.

### Images and text per stage
Yes, this belongs in the plan, and the activity system can do it without new data structures:
- **Activities** (`define_activities.twee`) get optional `stageMedia: { 1: [...], 2: [...] }` and `stageCctv`. `setup.activityMedia(who, id [, "cctv"])` picks the highest stage key ≤ her current stage and falls back to `media`/`cctv`. Filename pattern: `<id>_s<stage>_<n>.<ext>`. Optionally `stageText` for the activity text ("watching TV" → "watching TV in just a long shirt").
- `tools/activity-media.mjs` learns the new fields, so missing and unused files are still found.
- **Profile** (`define_profiles.twee`): portrait/appearance can get per-stage variants the same way; the progression log already records the milestones.
- **Interactions and schedules:** `needs` can name a stage through the total; routines can switch at a milestone with `setup.useRoutine` (outfits, new rooms), which the system already supports.

### Display
- **Sidebar** (`SbNpc`): the corruption meter shows the stage as a badge ("Stage 1 · Helping") and the in-stage value. At 100 it shows a "ready" state (accent colour, tooltip naming the milestone), so the player sees why the bar isn't moving.
- **The profile and the CMD** (`profile.twee`, `cmd_management.twee`) show the same.
- `UpdateStat "MomCorruption"` at 100: instead of "+0", one line: "She's ready for more." The text lives in `setup.statDefs`.
- Dev Caption: a "+1 corruption stage" debug link.

### The player: no stages
The player's corruption works differently. It comes from his own choices, not from scenes done to him, and it already has a **rising cap** (`define_player.twee`: `max.corruption: 40`, raised by the story). I'd keep that: one continuous value that the story opens up, with names per range shown in the sidebar only. Rollover stages wouldn't add anything for him.

### Files a later build touches
`define_npcs.twee` (field, helpers, stage constants), `storyscript.twee` (statDefs text at the cap), `daily_update.twee`, `define_misc.twee` (`corruptionPerStage`), `define_interactions.twee` (needs check), `define_items.twee` (camera spots), `define_activities.twee` + the `setup.activityMedia` helpers, `define_tasks.twee` / `define_quests.twee` and the two interaction passages (converting the checks: about 15 places, listed with `grep -rnE 'stats\.corruption *(>=|>|<|gte|lt)'`), `sidebar_widgets.twee`, `profile.twee`, `cmd_management.twee`, the new widget `<<AdvanceCorruptionStage>>` in `rtr.twee-config.yaml`, `skip_intro.twee` (sets the stage), `tools/activity-media.mjs`, CLAUDE.md (Stats section) and a help page.

---

## Verification (once it's built)
- Compile into the temp folder, then run `node tools/quest-audit.mjs` and `node tools/activity-media.mjs`.
- **Corruption** in the browser:
  - Corruption stops at 100, "ready" shows, and the milestone quest lights up.
  - `<<AdvanceCorruptionStage>>` sets stage 1 and corruption 0.
  - The kiss card, massage stage 1 and camera spots stay available.
  - Lust drift doesn't drop after the reset.
- **Company stats** in Node with mocked `State.variables`: project work at Efficiency 0/50/100 (×0.5/×1/×1.5), recovery and drain at Morale 0/100, reward factor at Reputation 0/100, and Suspicion staying 0 before Stage 2.
- Run the name grep on every edited text.

 