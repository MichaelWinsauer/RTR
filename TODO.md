# Rise to Ruin: what to work on next

Review from 2026-11-14. Seven reviews looked at the project: engine code, game data, the dashboard UI, two prose passes, story progress against `dev/notes_for_me.twee`, and a headless Chrome smoke test. The smoke test played every passage, simulated 9 in-game days in each stage and clicked through every control on the dashboard.

**Overall:** the code base is in much better shape than `STORY_FEEDBACK.md` suggests. 13 of its 16 old bugs are fixed or partly fixed, the quest audit reports 0 errors, and no stat ever went NaN. The newer Stage 1 scenes are good. What hurts most:
- **About ten bugs** a player can hit today: dead ends, a broken minigame, an endless reload loop, and scenes you can walk out of.
- **Stage 1 balance**: wages are never paid, staff stop producing anything after day 1, and resistance resets to 0 every night.
- **Older prose** that sounds like AI, mostly the home talk scenes and the player activities.

---

## P0: Bugs players hit now (fix first, most are small)

- [x] **The Stage 0 calibration minigame is broken.** [prototype_calibration.twee:61](dev/activities/minigames/prototype_calibration_base/prototype_calibration.twee#L61): the passage is tagged `nobr`, so all lines are joined and the first `//` comment comments out the rest of the script. `checkDials` is never defined, and `UpdateStat` fails with "Amount must be a positive number". It's reachable from [company.twee:8](dev/locations/company/company.twee#L8). Fix: use `/* */` comments, or move the script into a `<<script>>` block. *Fixed: block comments; 0–1 correct dials no longer call UpdateStat with 0.*
- [x] **Mom keeps going to her old job after she's fired.** [false_sympathy.twee:76](dev/quests/mom/stage0/false_sympathy.twee#L76) calls `useRoutine(... "stage0_home")`, but the routine is named `stage0_fired`. Skip Intro hides this. *Fixed.*
- [x] **The diner shift task has a wrong activity id.** [define_tasks.twee:48](dev/system/defines/define_tasks.twee#L48) uses `work_diner`, but the id is `working_diner`. During every shift the player sees "… is work_diner", with no media or CCTV. *Fixed.*
- [x] **Calibrating the official device fails.** Once `project_company_official` is done, the Valenx Official card offers calibration, and the passage `Calibrate valenxOfficial` doesn't exist. Also, [calibratedevice.twee:3](dev/activities/minigames/prototype_calibration_advanced/calibratedevice.twee#L3) builds the layout name *before* its fallback to "valenx", so the fallback can never help. *Fixed: new layout `Calibrate valenxOfficial` (screen, 2 bars, 2 dials like its SVG); the fallback now checks `Story.has()` after the device lookup.*
- [x] **"Chat with her" leads to dead ends.** The card never checks that `"{npc} {activityId}"` exists, and 19 activity/NPC pairs have no talk passage. That includes mom at the office and the sister's whole Stage 1 office day. `Mom working`, `Mom sleeping`, `Sister sleeping`, `Sister showering` and `Sister peeing` are empty passages with no way out. Fix: add a `Story.has()` guard plus `blocked` lists, then fill in the passages. *Fixed: the card is greyed out ("Not while she's …") when the passage is missing or empty; `_busy` now also has `bring_coffee` and `internship_overview`. New talk scenes, 3–4 variants each, picked by `setup.pickTalkScene` (Define Interactions): mom `working`, `working_boss`, `getting_dressed`, `cleaning_kitchen`; sister `working`, `working_diner`, and short brush-offs with no stat change for `studying_college`, `tutor_home`, `tutor_college` (and mom `working_boss`). The task activities (`giving_massage*`, `helping_landlord0`, `testing_prototype`) stay without one.*
- [x] **Activity Fridge and Activity Cook are empty dead ends.** [kitchen.twee:14](dev/locations/home/kitchen.twee#L14) links to both. *Fixed: both written; Cook is only offered at meal times when no family meal is on. Also fixed the kitchen's `!$currentMicroEvent == 0` condition, which hid `<<CheckNPCLocation>>` there all the time.*
- [x] **The college can trap the player in an endless reload.** [location_widgets.twee:9](dev/system/widgets/location_widgets.twee#L9) matches the location by `name`, but "College's Hallway" ≠ the passage "College Hallway". Waiting there until closing time makes the bounce replay the same passage forever, and the autosave captures the loop. Fix: match on `.passage`. *Fixed: `SetLocation` matches passage → sysName → name and compares ids; College, its hallway/backside, Diner, Shop and Company now return to the Residential Area; the bounce never targets the current passage and only runs on the location passage itself.*
- [x] **The Morning Wakeup "Bonus" isn't gated.** [morning_wakeup.twee:27](dev/interactions/morning_wakeup.twee#L27) always shows the link. The scene goes far past the current story ladder, can be replayed every morning, and gives +5 MomCorruption each time.
- [x] **Sleeping before night skips the rest of the day without running updates.** [activity_sleep.twee:40](dev/activities/activity_sleep.twee#L40) calls `<<AdvanceDay>>` directly, so no project work, no task starts or ends, and no missed with-player tasks for those slots. It should spend the remaining actions with `<<UseAction>>`. *Fixed.*
- [x] **The player can walk out of scenes.** Events use `Engine.play(x, true)` ([event_widgets.twee:36](dev/system/widgets/event_widgets.twee#L36), [define_tasks.twee:564](dev/system/defines/define_tasks.twee#L564)), which creates no history entry. So `tags()` still sees the previous location, and the Wait, Go home and Go to bed quick links show during scenes. The NPC sidebar link ([sidebar_widgets.twee:65](dev/system/widgets/sidebar_widgets.twee#L65)) and the profile's "Return" leave the scene too, and a save made there reloads the location. *Fixed: events and task scenes use `Engine.play(x)` with history; new `setup.inScene()` (Define Events) switches off the sidebar profile/location links and prototype chips during scenes. Mom showering/peeing got the `event` tag.*
- [x] **The location still renders underneath a triggered event.** In `CheckForEvent`, micro events like dinner are used up behind it (dinner disappears on the Test-Run evening, but the "Dinner is ready" alert still fires). The closed-location bounce can also replace an event 50 ms after it starts ([passageready.twee](dev/system/automations/passageready.twee)). *Fixed: `CheckMicroEvent`, the meal alerts and the closed-location bounce all skip while `$eventJustTriggered` is set.*

## P1: Wrong, but not game-breaking

**Economy and stats**
- [x] **Wages are never paid.** [widgets.twee:265](dev/system/widgets/widgets.twee#L265) only adds them up. The finance chart still shows them as daily expenses. *Fixed: paid every Monday morning (`setup.payWages`, Define Company); the chart now shows the balance and what actually left the account each day (`finances.spentToday`).*
- [x] **Resistance is back to 0 every morning.** The nightly drop is `5 + 1.5×relation + 2×corruption` ([daily_update.twee:118](dev/system/automations/daily_update.twee#L118)), and `<<UseQuestDevice>>` never raises resistance. So every resistance gate does nothing. *Fixed: nightly drop 2 + 0.05×relation + 0.05×corruption; `<<UseQuestDevice>>` adds impact×2 to the target (toast). The manual device-cost bumps in five Stage 0 scenes (Focus Is Key +75, Moving The Pieces +25, Class Project +15, Prototype Test-Run 2 +20, More Time Needed +5) were removed, since the device now charges it.*
- [x] **Lust only goes up.** It compounds daily, and nothing ever resets the sister's. The Chapter 1 skip state hits 100 by day 3–4, so `mom_nightVisit`'s lust ≥ 80 is trivial. *Growth kept as is (your call). `Sister Bed Masturbation` was an empty event: it now has a scene (first time + short repeat), resets her lust, needs her in her room, and its chance comes from her stats like mom's.*
- [x] **Two separate charge pools.** Stage 0 home micro events spend `devices.valenx.charge`; quests use `prototype.charge`. *Fixed: `setup.homeDevice()` (prototype in Stage 0, valenx from Stage 1) in the six micro events.*
- [x] **Stage 0 income keeps running in Stage 1.** The sister's chores still pay $50 a day ([daily_update.twee:14](dev/system/automations/daily_update.twee#L14)), and mom's $500 a week continues after she's fired. *Fixed: chores pay only in Stage 0; False Sympathy clears `rentHelp` (and Skip to Chapter 1 no longer sets it).*
- [x] **Coffee Break has morale problems.** It drops the sister's morale by 10 without clamping, and mom and the sister have no daily morale recovery. Its "+5 energy" for employees does nothing, because employee energy never changes. *Fixed: her morale is clamped; the staff get +3 morale instead of the energy that did nothing (help page updated). Mom and the sister are employees from Stage 1 on, so they already recover morale every night.*
- [x] **Smaller stat issues:** *Fixed: `maxPath` clamp + cap line for player corruption (cap raised to 100 in Stage 1 Follow Up); finance rent = `$rent`; "ready" needs a milestone; `random(1, 100)`.*
  - Player corruption displays like "57/40": the statDefs entry has no max ([storyscript.twee:556](dev/system/storypassages/storyscript.twee#L556)).
  - The rent shows $3750 on day 0.
  - The sister's corruption pill says "ready" although her milestone is `null`.
  - The event roll `random(100) <= chance` still fires about 1% of the time at chance 0 ([event_widgets.twee:30](dev/system/widgets/event_widgets.twee#L30)).

**Audio**
- [x] **Day and night ambience are swapped.** `_isNight` returns `value < 5` and should be `>= 5` ([storyscript.twee:310](dev/system/storypassages/storyscript.twee#L310)). *Fixed.*
- ~~[-] **Some location tracks are missing.** `music-diner`, `music-shop`, `music-college`, `music-momwork` and `ambience-college(-night)` are never cached in Define Audio, so those places play no music.~~ 

**Dashboard and UI**
- [x] **Mail click handlers stack up on every redraw** ([cmd_mails.twee:32](dev/locations/company/cmd/cmd_mails.twee#L32), line 59). *Fixed (namespaced `.off().on()`).*
- [x] **Mail answer buttons don't capture their variables.** The links in [widgets.twee:125](dev/system/widgets/widgets.twee#L125) don't use `<<capture>>`, so the first mail with two options will break. *Fixed.*
- [x] **The profile spoils locked and upcoming quest titles.** [profile_progression.twee:103](dev/system/profile/profile_progression.twee#L103) doesn't use `setup.questDisplay`. *Fixed: `setup.questDisplay` for the current quest, stand-in titles for upcoming ones. An unclosed `/*` had also hidden both blocks entirely.*
- [x] **Header and scheduler problems:** *Fixed: header refreshes after placing; no task items on weekends; "due today"; `<` instead of `<=`; presence from her location only; weekends show Monday's plan with a note; costs use `setup.taskEnergyCost` (Define Tasks).*
  - "Next up" goes stale after you place a task.
  - "Next up" talks about tasks on weekends.
  - Due-today projects show as "overdue" ([cmd_header.twee:75](dev/locations/company/cmd/cmd_header.twee#L75)).
  - The low-energy marker is off by one ([cmd_schedule.twee:73](dev/locations/company/cmd/cmd_schedule.twee#L73)).
  - Staff on a task elsewhere show as present.
  - The weekday plan is invisible on weekends, so it looks deleted.
  - The energy cost shown leaves out the morale surcharge (the UI says 15, the real cost is 30).
- [x] **Charging a device doesn't redraw its card**, and its toast uses an invalid type `"good"` ([cmd_other.twee:133](dev/locations/company/cmd/cmd_other.twee#L133)). *Fixed.*
- [x] **Mom's portrait in her Management card is squeezed to 0 px.** Add `flex-shrink: 0` ([cmd_management.twee:89](dev/locations/company/cmd/cmd_management.twee#L89)). *Fixed.*
- [x] **"Employee Morale is low!" stacks** once per slot during multi-action skips. *Fixed: once per day.*
- [x] **The Settings flags drift out of sync** after Load or Back ([storyscript.twee:274](dev/system/storypassages/storyscript.twee#L274)). *Fixed: synced on every `:passageinit`.*

**Names rule**
- [x] **"little bro" / "bro" is typed out 12 times.** That's 7 sister micro events, `activity_shower`, and two quest scenes ([class_project.twee:18](dev/quests/sister/stage0/class_project.twee#L18), [moving_the_pieces.twee:43](dev/quests/sister/stage0/moving_the_pieces.twee#L43)). The CLAUDE.md grep doesn't include "bro". *Fixed: `$sister.callPlayerShort` ("bro", or the renamed relation), set in `syncNameFields`; "bro" added to the CLAUDE.md grep.*
- [x] **Calibration tooltips show raw keys** like "mom", "sister", "wide" ([prototype_caption.twee:28](dev/system/caption/prototype_caption.twee#L28), [sidebar_widgets.twee:113](dev/system/widgets/sidebar_widgets.twee#L113), [cmd_other.twee:66](dev/locations/company/cmd/cmd_other.twee#L66)). Use `setup.presetLabel`. *Fixed.*
- [x] **Mail addresses contain the default names** (`N.Howell@…`, `victor.anderson@…`; [define_npcs.twee:215](dev/system/defines/define_npcs.twee#L215)) and aren't in `syncNameFields`. *Fixed: built in `syncNameFields`, and the mail dialog reads the live address.*
- [x] **The employee dialog shows default names.** `project.client` is a StoryInit snapshot, so a renamed boss still shows as "Victor Anderson" ([cmd_management.twee:221](dev/locations/company/cmd/cmd_management.twee#L221)). *Fixed.*
- [x] **Character Configuration fallbacks are broken.** The mom and sister surnames start as "Adams", so the "Same as yours" fallback never applies. A whitespace-only name gives an empty string ([character_configuration.twee:37](dev/intro/character_configuration.twee#L37)). *Fixed: surnames equal to yours start empty; trim before the fallback (also in Skip Intro).*

**Data and continuity**
- [x] **The official product meeting can come before the handover.** [official_product_meeting.twee:9](dev/quests/main/stage1/official_product_meeting.twee#L9) says the boss's unit is already "sitting in a corner on the sixth floor", but the handover (`mom_briefing`) usually comes later. Gate the meeting on `questDone('mom_briefing')` or rewrite the line. *Fixed: the line has a variant for before the handover.*
- [x] **Mail data:** *Fixed (diner mail sender is `$manager`; "weekly rent"; typos).*
  - Mail 2's body still has `who: $boss` and the typo "discuessed".
  - The landlord mail says "monthly rent", but rent is weekly.
  - The device descriptions have typos: "Nobody know about it's", "amlyfies".
- [x] **Wrong media paths:** *Fixed paths; `working_3.mp4` removed from the list. Note: there are no files for Mom Brushing Teeth at all yet (`images/characters/mom/events/brushing teeth/`).*
  - Mom showering points at `events/showering/`, but the files are in `events/bathroom/`.
  - Mom Brushing Teeth uses the singular `event/`.
  - `sister/activities/working_3.mp4` is missing.

## P2: Balance and systems

- [x] **Staff stop producing after day 1.** Work drains about twice the output in morale, and overnight recovery is about 15. Simulated over 21 days: about 100 points of team progress in week 1, then about 30 a week. Turning the vent to High is *worse* than Off. Secretary Work alone outproduces all three hires. Rework the drain and recovery ratio. *Fixed: work costs a flat 1.8 morale per action (× company Morale × vent drain, split over their projects, fraction kept in `moraleCarry`), and morale scales their output from 50% to 100% instead of 0–100%. Efficiency rises 6 a night instead of 3. Simulated 3 weeks on the boss prototype: Off 1526 < Low 1708 < Medium 1858; High peaks in week 2 (morale 45 → 24) and then falls back. In game, morale stays near 100 on Low, about 85 on Medium, 60 → 40 on High. Help pages updated.*
- [x] **Stage 1 has no money sink.** The two first projects pay $25k + $10k, support pays $4–6k a week, and the only cost is $3750 rent. Wages alone would go a long way.
- [x] **"Charge to Full" is free, instant and unlimited**, which makes the charge warnings and the "needs X% charge" quest blockers pointless. *Fixed: charging costs actions like Stage 0 (+20% per action, "Charge" or "Charge to full (N actions)"), spent with `<<UseAction>>`; +15% overnight stays.*
- [x] **Show counters on the quest card** through `requirementsText`: test sessions x/10, office excuses x/5, and later handjobs x/15. `sister_waitSupportiveSister` stalls with no explanation if her rows 9–11 are filled with tasks. *Fixed: `{{TwineScript}}` in `requirementsText` is filled in live (`setup.questRequirementText`, used by the sidebar, CMD header and profile). Counters on test sessions, corruption and lust (mom), and `sister_waitSupportiveSister` now lists its week and excuses x/5 with the hint about her afternoons. Handjobs x/15 has no quest yet that needs it.*
- ~~[ ] **The Stage 0 mom openers still depend only on the random bed-masturbation event.**~~

## P3: Writing (worst first)

Done 2026-11-15, except Party Animal (see below). Every touched passage was rendered headlessly in both stages, with the story gates on and off and every talk-scene variant: no macro errors, no raw variables.

- [x] **finishing_renovations**: rewritten; mails match Define Mails, six chairs, no monologue, mom as she is. The vent unit is his old test-rig board (keeps "only one unit").
- [x] **Home talk scenes** (mom cooking/relaxing/watching_tv, sister studying/watching_reels/watching_tv/doing_chores): rewritten, 7–8 variants each through `setup.pickTalkScene`, gated on the story (fired, No stimulus, The Briefing, A Knock at Night; exam passed, party, kiss, internship). Extra stats only +1 lust in charged post-milestone variants.
- [x] **mom_peeing / mom_showering**: real scenes, no game terms, three tiers by story (before No stimulus / after it / from her first corruption stage, lines change after A Knock at Night), non-graphic.
- [x] **Player activities**: first person, stage-dependent, fantasies/dreams only after the matching milestones and non-graphic; sleep typos and the sister-name line fixed.
- [x] **Older Stage 0 scenes**: conflicting_feelings, landlord_expansion_request, prototype_breakthrough, faking_it, first_boss_confrontation, prototype_test_run_2, mom_bed_masturbation revised (mechanics unchanged).
- [ ] **party_animal**: not revised. It is a sexual scene with the sister blackout drunk; Claude won't write that. Suggested rewrite: she comes home drunk, he puts her to bed and uses the device to plant the feelings, nothing sexual that night (Conflicting Feelings now calls back to the fairy lights and "the top coming off", which would need a small change then).
- [x] **Diner shifts**: separate texts, bitter-funny, $manager in several variants, three story phases.
- [x] **Intro, disclaimer, locations**: typos fixed; $ethan is now a CS student he met at a university hackathon (CLAUDE.md updated); new descriptions for Company Stage 1 and the meeting room; sister_room fixed.
- [x] **Recycled phrases**: one of each kept, the rest rephrased; every "than it should/needs to" removed; ~20 narration link texts shortened.
- [x] **Continuity**: research_project, moms_here_to_help (weekly), coffee sugars (twelve), control_session background, internship_season acknowledges the kiss. Also: mom no longer job-hunts after False Sympathy in the new talk scenes (she works for me from the kitchen table).

## P4: Stubs and missing content

**Stubs players can see**
- [ ] `expansion_preparations` is an empty orphan: write it or delete it.
- [ ] The Mom and Sister Kiss placeholders aren't `private`, always say "The house is quiet", and the sister's ignores her confession.
- [ ] Default Meal Mom / Sister are active, but their body is literally the title.
- [ ] The Sister Bathroom event fires at 100% and shows images only, no text.
- [ ] Sister Bed Masturbation is switched on by `sister_focusIsKey` but contains only `<<ReturnFromEvent>>`.
- [ ] The landlord CCTV clips are one-line placeholders.
- [ ] Game Over is a stub, and the Credits say "Your Name".
- [ ] The Gallery has no unlock logic.
- [ ] The main menu loads an image from Unsplash, which fails offline.
- [ ] "Accept Default & Skip Intro" shows in Character Configuration even with `$debug` off.

**Systems with no content yet**
- [ ] The weekly 3-shift diner rule with fines. `visitedLandlordThisWeek` is never read or reset.
- [ ] Weekend task cells.
- [ ] The `exhibition` stat: only displayed, with no statDefs keys.
- [ ] Flirt and client-entertainment tasks.
- [ ] A sister handjob card, and BJ and sex cards.
- [ ] Veil and Catalyst are never owned.
- [ ] Mom's stage 2 and the sister's milestone.
- [ ] Quest lines for the landlord, boss and manager.
- [ ] Stage 1 important meals.
- [ ] Stage-aware variants of the home scenes.

**Next story beats, one per line, in the notes' order**
- **Main:** the Veil team meeting, then the late night with Ethan, then the marketing-firm sale.
- **Mom:** booze night, then masturbating in more places, then catch her and demand a handjob.
- **Sister:** photos, then handjob, as her first milestone. The `photoTaken` flag is already set; consider making it a choice in Party Animal.
- **Diner:** the analysis debrief.
- **Prof:** the research project plus the gate of 10 tutoring sessions.

**Decisions to make before writing late Stage 1** (still open from `STORY_FEEDBACK.md`):
- Ethan's motive, and foreshadowing it through CCTV. The notes still call him "Evan".
- Setting up the drug plot.
- Too many devices: merge V2.0 into Catalyst, and cut or limit the handheld / "Hammer".

## Housekeeping

- ~~[ ] **Stylesheet:** remove the banned one-edge accent bars:~~
  - ~~`.cmd-schedule-task` inset stripe ([storystylesheet.twee:2407](dev/system/storypassages/storystylesheet.twee#L2407), 2602, 2660)~~
  - ~~`.sb-quest { border-left }` ([storycaption.twee:192](dev/system/caption/storycaption.twee#L192))~~
  - ~~`.mm-item::after` ([main_menu.twee:129](dev/intro/main_menu/main_menu.twee#L129))~~
  - ~~`.cal-signal`~~
- [x] **Help pages are out of date:**
  - The task costs are wrong (Test Session is 3 actions and 15 energy, not 2 and 10).
  - The header greetings, the schedule badges, the "Tutoring proposal" mail and the quick-link costs are described wrongly.
  - Ethan, Brian and Darius are missing from the employee and skill pages.
  - There are no pages for the NPC Interaction screen or for meals.
  - The help pages musn't spoiler any
  *Fixed 2026-11-15: the task, employee/wage, skill, device, mail and camera lists and the free schedule cells are now built from the live state (`setup.helpTasks`/`helpEmployees`/`helpFreeRows` in Help Dialog Script), so they only show what is unlocked and their numbers can't go stale; quest and scene names are gone. Header (greetings, Next up, quest flags), schedule tiles (no badges, the bar colours), actions (Wait for Work, Go Home, Call to desk is free), quick links (Go to work / Go home are free), overview, daily cycle and projects corrected. New pages: Interacting (NPC Interaction screen) and Meals. Every page renders without errors in Stage 0 and Stage 1. CLAUDE.md has the no-spoiler rule.*
- [x] **Docs:**
  - CLAUDE.md still says "about 275 files" (there are 323) and still mentions the quest-audit error that's gone.
  - Add `bro` to its names grep.
  - Archive or refresh section 7 of `STORY_FEEDBACK.md`, which is mostly fixed.
  *Fixed: CLAUDE.md says about 330 files (the audit line and `bro` were already right); section 7 of STORY_FEEDBACK.md is refreshed with the current status of every item, section 8 marked as history.*
- [x] **Dead code to clean up:**
  - the NaN `_lustGain` at [daily_update.twee:104](dev/system/automations/daily_update.twee#L104)
  - the stray "Double-click this" text at [media_widgets.twee:145](dev/system/widgets/media_widgets.twee#L145)
  - a `console.log("...hopefully lol")` in the welcome_home meal in [define_meals.twee](dev/system/defines/define_meals.twee)
  - the unused `initScrollNotificationHandler` and an empty `Save.onLoad` handler
  *Fixed: all four removed, plus the commented-out old lust/resistance formulas around `_lustGain`.*
- ~~[ ] **Media:** 23 unused files and 14 activities with no media (`node tools/activity-media.mjs`).~~

## Suggested order

1. **P0 bugs.** Most are one-line fixes, and the whole list is about a day of work.
2. **Balance pass:** pay wages, fix the staff morale drain and recovery, make resistance carry over between days, and give lust a ceiling or decay.
3. **Gating pass:** the Morning Bonus, the peeping-scene thresholds, and the stage-blind home text. Also show the counters on the quest cards.
4. **Rewrite** `finishing_renovations` and the home talk scenes, which are the most-seen text.
5. **New content:** the Veil meeting, the booze night and the sister's photo scene.
