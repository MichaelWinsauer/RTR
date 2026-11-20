# Rise to Ruin — Story Review (Stage 0 & Stage 1)

## 0. TL;DR
- **Overall verdict:** Strong core premise and a well-built escalation ladder for Mom. The Ethan betrayal is the best narrative idea in Stage 1. The weakest areas: the Sister's Stage 1 arc contradicts what Stage 0 already did, there are too many device variants, the drug-house climax isn't set up, and several beats happen off-screen where the player can't see them.
- **Explicit-scene density:** More than enough on paper (≈20 distinct sexual story beats in Stage 1). What's missing is **repeatable** content. Right now the only sexual interaction card is a placeholder kiss, so the unlocks (HJ / BJ / SEX) have nothing to unlock into.
- **Code readiness:** Stage 0 is playable end to end (quest-audit: 0 errors). Stage 1 is mostly scaffolding. Schedule unlocking, weekly task checks and fines, project completion and deadlines, hiring, and device effects are all missing, and there are ~16 bugs (section 7).

## 1. What works well
1. **Mom's corruption ladder** reads as earned. The steps go: massage → test sessions → undress → HJ at the briefing → "this was wrong" talk → she gets talked back into it → HJ interaction → masturbating openly around the house → teasing → she refuses → silent treatment plus guilt → lingerie BJ → morning BJ → client entertainment → Catalyst → sex. Each step has a clear trigger, and there's a real setback in the middle (the refusal).
2. **The "window closing" beat** (Mom says it shouldn't happen again, the player maxes the dial) is the most important scene in her arc. It's the moment the player chooses to override her. Give it weight: a slow build, and maybe a visible "resistance" meter draining.
3. **The diner incident** (the aggressive customer caused by the Veil) is excellent. It's the first time the tech has a *cost*, and it explains a gameplay rule ("keep the mood high") through story. More beats like this would help the whole game.
4. **Sex and corruption feed back into the business sim.** Flirting raises morale, morale speeds up projects (the formula already exists in `ProgressProjects`), and client entertainment unlocks the gym. This is the right design: the lewd content is a resource, not just a reward.
5. **The Ethan arc** gives Stage 1 a human antagonist and an emotional loss that isn't about the family. Contrasting the player's real friendship with Ethan against how he treats his family is thematically sharp.
6. **The $20k-or-favors choice** in the drug trade is the kind of branching the game needs more of.

## 2. Flow & structure problems

### 2.1 Sister: Stage 1 rewinds Stage 0 (highest priority)
In code, Stage 0 already had the Sister give a drunk handjob (`party_animal.twee`), then confess and **kiss** him (`conflicting_feelings.twee`). The Stage 1 doc starts her at "strangely warm, she doesn't understand why yet" and later has her "admit she might be in love" — **a second confession**.
**Fix:** start Stage 1 from where she actually is. She has confessed, she's embarrassed, and they haven't talked about the kiss. Her Stage 1 question isn't "what am I feeling?" but "what are we now?" Merge the two confessions into one: the walk-in → "special feelings" talk becomes the moment he *answers* her Stage 0 confession.

### 2.2 The photos don't exist
Stage 1's "he shows her the photos from the blackout night" has no setup. `party_animal.twee` never mentions photos and sets no flag; the idea exists only in `notes_for_me.twee:51`.
**Fix:** add a line plus `$player.flags.sisterPhotos = true` in Party Animal, ideally as a player choice (take photos / don't). If not, Stage 1 needs an alternative trigger.

### 2.3 Mom's Stage 0 → Stage 1 gap, and an ungated scene
- Stage 0 Mom ends at masturbation she doesn't know he's involved in; Stage 1 opens at a back massage. That's a fine, gentle restart.
- **But** `morning_wakeup_bonus.twee` (an explicit degradation BJ) is reachable through a plain link right after Waking Troubles, early in Stage 0. This skips the whole ladder, including the Stage 1 "lingerie BJ" milestone. **Gate it** behind the Stage 1 morning-BJ flag, or remove it.

### 2.4 Unclear stage label in Mom's column
The PDF puts a "Stage 2" label right before "Player buys booze and celebrates with his mom". But Client Entertainment, which is further down that same chain, unlocks the gym step in the **Stage 1** main story. Decide which it is:
- If the booze → BJ → client entertainment chain is Stage 1, remove the label.
- If it's Stage 2, the gym step needs another trigger.

### 2.5 Off-screen scenes the player can't witness
Ethan noticing log spikes, copying the backup folder, studying at night: the game is told from the player's POV, so these can't be shown "straight".
**Use what you built:** the CCTV system (`cmd_cctv*.twee`). Show these as clips the player can *choose* to review, or skip ("probably just Ethan working late"). Players who check get dread and dramatic irony, and the betrayal stays a surprise for those who don't. The data analyst could also mention "someone pulled the raw logs at 2 a.m." in passing.

### 2.6 Ethan's motive is unclear and self-contradictory
He steals the tech to launch a rival startup **and** (presumably) tips off the authorities about "unlicensed mind-influence tech", which would put his own company under the same scrutiny. As written, it also isn't clear *why* he betrays a boss he called "the best I've ever had".
**Recommended twist:** when Ethan accidentally exposes himself to the full-strength code, he recognizes the feeling: it's how he's felt in the office every day since the Veil went up. He realizes his friendship with the player, the drunk "best boss" speech, maybe even taking the job, were at least partly *manufactured*. That's a personal, believable motive. It also turns the player's "first real friend in years" into the tragedy the stage-end text is reaching for.
The tip-off then becomes strategic: he files it *before* his startup launches a "licensed, ethical" version, so the player becomes the cautionary example and Ethan the clean alternative.

### 2.7 Seed Ethan in Stage 0
The doc says Ethan co-built the original prototype, but Stage 0 never mentions him. Add one or two references: a contact in the player's phone, a line in "Everyone needs a Plan", or an old commit message. Hiring him should feel like a reunion, not an introduction.
Also: the code names him **Ethan Reed** (`define_npcs.twee:262`); the doc says **Ethan**. Pick one.

### 2.8 The drug-house climax isn't set up
"The player found out through research that drugs increase effectiveness" appears for the first time right before the climax. It then introduces a mechanic (drugs) that Stage 1 never uses, and a moral jump (trading family for drugs) bigger than anything before it. The *timing* is great: the same night he's "cashing in" his family, Ethan empties the office. The *content* isn't set up.
Options, from least to most work:
- **a)** Seed it earlier: a research beat after the diner incident ("dopamine state affects susceptibility"), and one small experiment (alcohol in the Mom booze scene already fits this!). The drug deal is then the escalation of something the player has seen work.
- **b)** Keep the climax but make it the **$20k-or-favors choice** with real consequences either way. Money matters, because you're about to lose the company's assets.
- **c)** Move drugs to Stage 2 as a mechanic, and make the Stage 1 climax beat something business-related.
- **Distribution note:** check your platform's rules (Patreon, itch.io and others). Content involving trading sexual favors for drugs, and sexual content with intoxicated or blacked-out characters (Party Animal already has this), is a common reason for takedowns. Plan a patch or alternate path if you distribute there.

### 2.9 Too many devices
Stage 1 introduces: Valenx (original), Valenx Official (the weak client version), Veil (room-wide), Catalyst (desire amplifier), a handheld "absolute obedience" device, **and** "Version 2.0, which scans a person and amplifies hidden desires", which is the Catalyst again.
- **Merge** V2.0 into Catalyst. Main story: "the team builds Catalyst as V2.0". Mom/Sister story: the player secretly uses the full-strength version.
- **Cut or heavily restrict the handheld obedience device.** "Absolute obedience for a few minutes" makes every gradual corruption mechanic pointless; why grind 10 test sessions? If you keep it, make it expensive: huge charge cost, raises Suspicion, causes a resistance spike or memory gaps afterward, and doesn't work on the family (or only once). It could even be the thing Ethan most wants to steal.
- Each device should have one clear **gameplay identity**:
  - Valenx: single target, stat changes.
  - Veil: area effect, company morale and client mood, with side-effect risk (the diner incident).
  - Catalyst: unlocks new interaction tiers by amplifying an existing stat (lust → new acts).

### 2.10 Pacing of the main Stage 1 line
The list of main-story beats is long: setup → two projects → hiring → demo → official product → Veil build → first sale → gym → morale problems → handheld → profit party → V2 → Ethan self-exposure → retail pitch → drugs → theft → investigation. That's a lot of "we built a device / sold a device" beats in a row.
- Cut or merge: the gym redesign ("look like a router") repeats the Veil build ("design it to look like a Wi-Fi router").
- Interleave: after every one or two business beats, gate the next on a Mom or Sister milestone (you already do this with Client Entertainment → gym). Do it consistently so the three columns move forward together instead of the main line racing ahead.

## 3. Characters

| Character | Assessment | Suggestion |
|---|---|---|
| Player | Clear arc from struggling to cold. "Genuine spark of friendship" with Ethan is a good contrast. | Make the "cold satisfaction" line *earned*. Add small moments where he chooses the colder option. |
| Mom | Best-written arc. Her motivation (caring for her kids, feeling alive again after the old job) is coherent. | Keep the "duty as a mom" framing consistent; it's her core lever. |
| Sister | Strong ingredients (shame, dream confusion, love vs. wrongness) but repeated beats (2.1). | One confession, then the escalation is about proving it. The "send videos" step is good mid-tier content. |
| Ethan / Ethan | Good, needs a motive (2.6) and Stage 0 seeding (2.7). | — |
| Hardware expert, data analyst | Defined only by body type and ethnicity. | Give each one trait and one story job: e.g. the analyst is the one who could notice the dashboard is faked (a red herring before Ethan); the hardware guy is comic relief or a future corruption witness. |
| Ex-boss, Landlord, Prof, Diner manager | Doc headings are empty for Ex-Boss and Landlord. The landlord gets "degrading comments" and then the thread drops. | Each needs at least a 3-step mini-arc. The landlord has code tasks already (`define_tasks.twee` ids 3/4) but no `Landlord Apartment` passage. |

## 4. Explicit-scene inventory (Stage 1)

**Mom (story beats):**
1. Back massage (sensual)
2. Private test sessions (×10, escalating)
3. Undressing test
4. HJ in the briefing room
5. HJ in bed after the night talk
6. Booze night
7. Masturbation catches in 4 locations
8. Teasing at home and work
9. Lingerie crawl + BJ
10. Morning BJ with coffee
11. Client entertainment
12. Catalyst sex

**Sister (story beats):**
1. Masturbation (night after the thank-you talk)
2. Photos → HJ
3. Videos sent to the player
4. Walk-in + helping her finish
5. Desk BJ ("I love you")
6. Submission → sex (Catalyst)

**Other:**
- Diner uniform scenes
- Flirting with employees (voyeur angle via CCTV)
- Coffee and chats
- Drug-house scene

**Verdict:** plenty of **story** scenes. The gap is **repeatable** content:
1. Add interaction cards per unlock tier in `define_interactions.twee` (currently: talk / compliment / flirt / tease / kiss, plus a hidden `useValenx`). Add `handjob`, `blowjob`, `sex` cards gated on the unlock flags, with 2–3 variants per location (home / office / desk / meeting room).
2. Implement the planned explicit high-corruption versions of the micro-events (`micro_event_future_scenes.twee`); none exist yet.
3. Fill the empty activity stubs (`mom_sleeping`, `mom_working`, `sister_showering`, `sister_peeing`, `sister_sleeping`).
4. Use the existing `exhibition` stat (defined, unused) for the flirt and client-entertainment tasks.

## 5. Playability

- **Counter grinds:** "10 test sessions", "10 tutoring", "10 diner shifts", "15 sexual interactions". Show progress in the quest sidebar (e.g. "Test sessions 4/10"). Make sure each repetition changes something: a stat, a line of dialogue, a picture variant. 10 identical sessions is the #1 way corruption games lose players.
- **Schedule capacity math:** the Sister has only 3 free weekday cells (rows 9–11, one block per day). Stage 1 asks her to do:
  - 3 diner shifts a week (later 7)
  - 10 tutoring sessions
  - prof tutoring at the college
  - internship meetings
  - coffee and flirt rounds

  That doesn't fit until "+3 slot" unlocks happen. Either unlock evening and weekend cells early, or treat the crunch as intentional, tense design. In that case, show the player that the shortage is the point. "7 shifts a week" requires weekend cells, which are currently fully locked and never run tasks (`checkTaskProgression` is weekday-only).
- **Fines:** good pressure, but make the rule visible, e.g. a weekly checklist in the CMD dashboard.
- **Failure handling for projects:** "the deadline gets extended, but the player pays a fine" is forgiving and good. Implement it explicitly so a bad week can't soft-lock the main line.
- **The Suspicion stat** exists (`define_company.twee`) but is unused. Make it the backbone of the Stage 1 ending: the device uses, the handheld, the drug deal and Ethan's tip all feed it, and the investigation's severity at the start of Stage 2 scales with it. That turns the ending into a consequence of how the player played.
- **More choices:** the game is very linear. Cheap branches with flags:
  - take the photos or not
  - pay $20k or make the trade
  - check the CCTV or ignore it
  - tell Ethan the real capabilities or keep them secret (which changes what he steals)

## 6. Smaller notes
- Mom and Sister never notice each other's corruption. Save "they find out about each other" for Stage 2, but plant one near-miss in Stage 1.
- The prof's "influence a whole class" project is a big escalation for a side line. Fine, but it should feed the main line (e.g. Veil field data → better V2).
- The landlord thread ("degrading comments, acts weird") needs a payoff or should be cut from Stage 1.
- Typos to fix in the doc: "proporsition", "maintanance", "extreamly", "hestitation", "visists", "reveiling", "towads", "belive", "extacy", "wether", "moral" → morale, "evento" → Ethan to.

## 7. Cross-check against the project files

*Refreshed 2026-11-15. The original list (written before Stage 1 was built) is mostly fixed. What is still open is tracked in `TODO.md`; this section only keeps the status so the old numbers stay traceable.*

### 7.1 Stage 0 status
- All three Stage 0 lines are implemented. `tools/quest-audit.mjs`: 0 errors, 9 warnings, 2 notes.
- `ceo_struggles.twee` is a full scene now.
- **Open:** `quests/main/stage0/expansion_preparations.twee` is still an empty orphan (TODO P4).
- All 13 important meals are activated by their quest scenes now.
- Mom's "Agreement 2" still waits on the random bed-masturbation event. The author decided to keep it.
- `$sister.flags.isTutoring` is read by the Sister studying talk scene.

### 7.2 Stage 1 readiness

| Doc requirement | Status now |
|---|---|
| "+3 slots" unlocks | Replaced: routines define which rows the scheduler may fill (`define_schedule.twee`). |
| Weekly diner/help requirement + fines | **Open** (TODO P4). `visitedLandlordThisWeek` is still never read or reset. |
| Projects: ex-boss, diner | Done: deadlines, completion, rewards and late penalties (`define_projects.twee`). |
| Repeatable / prof project | Repeatable projects exist (boss support). The prof has his own quest line; his research project is **open**. |
| Hiring 3 employees | Done: Too Much Work 1–3. |
| Sister in office | Done: Stage 1 Follow Up adds mom and the sister to `$company.employees`. |
| Devices Valenx / Official / Veil / Catalyst | All four have calibration passages. Veil and Catalyst are never owned yet (**open**, TODO P4). |
| Handheld device | Not defined; the device count is still an open decision (TODO P4). |
| Morale / Suspicion / Reputation / Efficiency | Done (Company stats in `define_company.twee`); Suspicion stays off until Stage 2. |
| Coffee / private attention tasks | Done. Flirt and client-entertainment tasks are **open**. |
| HJ / BJ / SEX interactions | Mom handjob card done. Sister handjob, BJ and sex cards are **open**. |
| Locations: gym, marketing firm, drug house, bank, classroom | Not defined yet. `Landlord Apartment` (location 19) exists. |

### 7.3 Bugs found
1. `StartProject` loop: fixed.
2. Project `due` on the weekday: fixed (`$date.dayCount`, set by `StartProject`).
3. Rewards paid into `State.variables.money`: fixed.
4. `^` used as power in the daily update: fixed.
5. Undefined `lustFromCorr` / `lustFromRes` and resistance pinned at 0: fixed (dead code removed, new resistance formula).
6. Unbounded progress in categories with requirement 0: fixed (work only goes to needed categories, capped).
7. Project card categories and "$$": fixed.
8. Tasks overriding weekend cells: fixed.
9. Wrong task activities: fixed (`working_diner`, `tutor_*`, ...).
10. Diner mail sender and "discuessed": fixed.
11. `length >= 0` in CMD Actions: fixed.
12. Landlord task slots vs. opening hours: fixed (open slots 1–5).
13. Two charge pools: fixed (`setup.homeDevice()`).
14. Stacking mail click handlers: fixed.
15. Whole NPC objects in tasks/projects: still stored, but treated as read-only snapshots; code looks up the live object by `sysName`/id (see CLAUDE.md).
16. Duplicate NPC ids (`$dad`/`$mom` 1, `$prof`/`$boss` 3): still there, but nothing compares NPC ids, so harmless. The `file:///E:/` path in Define Misc is the intentional local media path (`build_release.mjs` blanks it).

## 8. Recommended order of work
*Kept for history. Steps 1–3 are done except the weekly counter and fines; the current plan is `TODO.md`.*

1. Fix bugs 1–3 and 5 (they block Stage 1 projects and distort stats).
2. Reconcile the Sister's Stage 1 opening with Stage 0, add the photos flag to Party Animal, and gate `morning_wakeup_bonus`.
3. Build the missing systems: slot-unlock widget, weekly task counter + fines, project completion/deadline, hiring scene.
4. Define the device identities (merge V2 into Catalyst; restrict or cut the handheld) and wire the Suspicion stat.
5. Add the interaction tiers (HJ / BJ / SEX cards), then write the story scenes.
6. Rework Ethan's motive plus CCTV foreshadowing, and seed him in Stage 0.
