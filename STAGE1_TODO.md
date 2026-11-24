# Rise to Ruin: Stage 1 to-do

What's left before Stage 1 is playable from start to end. Written 2026-11-20, right after the quest structure for the rest of the main, mom and sister lines went in. The story itself is in [STAGE1_PROPOSAL.md](STAGE1_PROPOSAL.md) (section numbers below refer to it). Bugs and older open items stay in [TODO.md](TODO.md).

**Where things stand:** every quest from "The Veil" to "The Morning After" exists in `define_quests.twee`, wired into the three lines, with an empty scene passage that just advances the quest. Decision scenes have plain choice links so every branch can be tested. Everything unfinished is marked **`STAGE1-STUB`** (`grep -rn STAGE1-STUB dev`; the quest audit prints the count). Remove a marker when its part is done.

**Names:** this is a design doc, so it uses the default names and role labels. In the game every one of them is a variable.

---

## 1. Decisions to make first

These change what gets built or written, so they come before the scenes that depend on them.

- [x] **Ethan's equity.** *Decided: no choice. He always gets a token 2% at the Profit Party, and loses it with everything else at The Morning After. `$ethan.equity` (2 from `main_profitParty`'s `set`, 0 from `main_morningAfter`'s); the `$flags.ethanEquity` flag is gone.*
- [ ] **How hard the family offers are gated** (3.1): which corruption and exhibition values unlock each offer level. *The author handles this one later.* The values live in one table, `setup.offerLevels` in `define_quests.twee` ("Family offers"), with placeholder numbers and a `STAGE1-STUB` marker.
- [x] **The Boss line, or a way around it.** *Decided: the Boss line gets built (proposal 7.2, section 5 below). The Arrangement sets the flag for After Hours, and The Introduction comes before The Supplier (proposal 7.5).*
- [x] **The Veil at the diner.** *Decided: the Manager line's Debrief installs it, before the Diner Incident (proposal 7.3 and 7.5).*
- [x] **How the first sale arrives.** *Decided: a mail, then a short phone call scene. A couple of days after The Late Night the hidden quest `main_waitFirstSaleLead` sends the marketing firm owner's mail (`$company.mails[4]`, first draft). The day after the answer she calls him at his desk: that call is part 1 of The First Real Sale, the bar is part 2. The gym owner's mail moved to `$company.mails[5]`.*
- [x] **The supplier's pay branch** (4.12). *Decided: an advance from the Boss. The money comes in at once and is paid back in installments every Monday together with the wages (`setup.addDebt`, `$company.debts`, Define Company). The Supplier scene offers it as the plain price.*
- [ ] **The end of Stage 1** (4.13): what else resets at The Morning After (Ethan's project assignments, the vent unit, CCTV, the office), and where Stage 2 starts (`$company.stage`, a title card, a new location). *Postponed, too early to decide.*
- [x] **Names to keep.** *Decided: the default names stay (stage names, contacts, companies). The contacts' variables are named after their role now: `$marketingOwner` (Dana Pruitt), `$gymOwner` (Rick Dawson), `$investor` (Charles Whitfield), `$supplier` (Leon Calloway), `$bestFriend` (Jess Moreno). Still open: whether they become renamable in Character Configuration.*

---

## 2. Systems to build

In the order the story first needs them. Each one names the first quest that uses it.

- [x] **End-of-day report** (3.5). *Built ("End-of-day report" at the end of `define_npcs.twee`, passage `Day Report`).* The "How was your day?" card gets its own highlighted group at the top of the screen from the Evening on (next to the normal "Ask about her day"), once Office Gossip is done and today's log has entries. Tasks log themselves through a `report` (on the task or a stage); flirt duty, extra friendly, coffee break and secretary work have lines. Events and deals use `<<LogDay>>` with `setup.dayReports`, which is still empty: the Diner Incident, Was That Right? and The Friend stay plain events until their scenes are written and moved onto it.
- [x] **POV passages behind the CCTV arrow** (3.5). *Built: tag `pov`, `<<PovHeader>>` / `<<EndPov>>` (Event Widgets), `$povReturn` set by the CCTV arrow and the report. The voice exception is in CLAUDE.md.*
- [x] **The two new tasks get their own content.** *Done: stages with their own activities (`flirt_duty0-2`, `extra_friendly0-1`), effects per stage in `onComplete` (staff morale, company Morale or Efficiency, her Exhibition, Feelings), report lines and five POV passages in `dev/tasks/<npc>/`.* Still open: the clips. The activities have empty `media`/`cctv` lists, and each POV passage header names the shots it wants.
- [x] **The Silence** (5.5). *Built ("The Silence" in `define_npcs.twee`): her cards are locked, her tasks with me rest, micro events with her are skipped, no wake-up coffee, a nightly Morale and Resistance loss. Her attempts: the meals `silence_breakfast` and `silence_lasagna`, and the note on my pillow (micro event 45).*
- [x] **After The Booze Night** (5.1). *Built: micro events 46 to 48 (`Mom Catch Couch`, `Mom Catch Kitchen`, `Mom Catch Shower`), after The Booze Night, more likely the higher her Lust (`setup.momCanBeCaught`, `setup.momCatchChance`). Watch, let her see you, or walk away. Caught is the catch-her scene that follows.* Still open: their media.
- [x] **The morning routine** (5.6). *Built: it replaces the coffee wake-up in Activity Sleep (passage `Morning Routine`, `setup.morningRoutineReady`), with a "Not this morning" link. Variants for the first morning, weekday or weekend, her stage, and a near miss with the sister at the door.*
- [x] **Family offer UI** (3.1). *Built: the `<<Offer>>` macro in scenes (`<<plain>>` with an optional price, `<<family $mom level>>` locked with its reason until she's ready, `<<stall>>` that postpones the deal a few days, two stalls per deal), mail answers with `offer`/`money`, and Exhibition as a real stat (`MomExhibition`, `SisterExhibition`). Everything in "Family offers" in `define_quests.twee`. The scenes that use it (Gym Dinner, Introduction, Supplier) are still stubs.*
- [x] **Feelings** (3.6). *Built ("Feelings" in `define_npcs.twee`, `<<Feel>>`, a Feelings tab in the profile). The two new tasks set the first ones, and The Handover sets her lasting dislike of the Boss.* Use it in the scenes as they get written.
- [x] **Quest devices with two targets.** *Built: the quest `device` field may be a list, `<<UseQuestDevice $player "sister">>` picks the entry, and the Catalyst has `anyTarget` (good calibration, any target). The Catalyst Night has its list and the calls in its stub parts.*
- [x] **The Anchor.** *Built: a device (`$company.devices.valenxAnchor`, owned when its project is done), two uses (`maxUses`), the full charge each time, a `spikes` log for Ethan, used through `setup.useDevice`. Projects can have a `staff` list now; the Anchor project only takes Brian (its requirements were lowered to what he can do).*
- [x] **"Whenever"** (5.9). *Built: the "Whenever I want" card (one action, no daily limit, private), passage `Mom Whenever` with variants per place and count, and two desk visitors where she offers first (micro events 49 and 50).*
- [x] **Money for the deals.** *Built: `setup.spend` (also used by the Shop now) and `setup.canAfford`; a plain offer card with a price is locked while the account can't cover it.*
- [ ] **Stage 1 → 2 handover** (4.13): whatever was decided in section 1.

---

## 3. Scenes to write

In play order, phase by phase (proposal section 8). Each stub's comment says what the scene is. Write the scene, move its effects (stats, `<<ProfileLog>>`, `<<ProfileMemory>>`) in, replace the stub choice links with real ones, and remove the marker.

**Phase 1–2**
- [x] The Veil (4.2): [the_veil.twee](dev/quests/main/stage1/the_veil.twee)
- [x] The Booze Night (5.1): [booze_night.twee](dev/quests/mom/stage1/booze_night.twee)
- [x] Caught (5.2): [caught.twee](dev/quests/mom/stage1/caught.twee)
- [x] The Ask (6.1): [the_ask.twee](dev/quests/sister/stage1/the_ask.twee)

**Phase 3**
- [x] The Late Night (4.3): [the_late_night.twee](dev/quests/main/stage1/the_late_night.twee). The vent goes to Off before Ethan arrives and back afterwards.
- [x] Flirt Duty (5.3): [flirt_duty.twee](dev/quests/mom/stage1/flirt_duty.twee)
- [x] Souvenirs (6.2), her milestone into stage 1: [souvenirs.twee](dev/quests/sister/stage1/souvenirs.twee)

**Phase 4**
- [x] The First Real Sale (4.4), two parts (her phone call, the bar): [first_real_sale.twee](dev/quests/main/stage1/first_real_sale.twee), [first_real_sale_2.twee](dev/quests/main/stage1/first_real_sale_2.twee). Still open: revise her mail (`$company.mails[4]`, a first draft).
- [x] Not Enough (5.4): [not_enough.twee](dev/quests/mom/stage1/not_enough.twee)
- [x] Office Gossip (6.3): [office_gossip.twee](dev/quests/sister/stage1/office_gossip.twee)

**Phase 5**
- [x] The Gym Meeting (4.5a), two parts: [gym_meeting.twee](dev/quests/main/stage1/gym_meeting.twee), [gym_meeting_2.twee](dev/quests/main/stage1/gym_meeting_2.twee). Still open: revise Rick's mail (`$company.mails[5]`, a first draft).
- [x] The Crawl (5.6): [the_crawl.twee](dev/quests/mom/stage1/the_crawl.twee). The next morning is a meal: [crawl_thank_you.twee](dev/meals/important/crawl_thank_you.twee).
- [x] Send Me Something (6.4), three parts: [send_me_something.twee](dev/quests/sister/stage1/send_me_something.twee), [_2](dev/quests/sister/stage1/send_me_something_2.twee), [_3](dev/quests/sister/stage1/send_me_something_3.twee)

**Phase 6**
- [x] The Gym Dinner (4.5b), the first family option: [gym_dinner.twee](dev/quests/main/stage1/gym_dinner.twee)
- [x] Was That Right? (5.7, optional): [mom_gym_dinner_report.twee](dev/quests/mom/stage1/mom_gym_dinner_report.twee). The "let him / keep it light" choice belongs before she leaves, so it goes into the Gym Dinner scene.
- [x] What Are We (6.5): [what_are_we.twee](dev/quests/sister/stage1/what_are_we.twee)

**Phase 7**
- [x] Morale (4.6), Darius in or out: [low_morale.twee](dev/quests/main/stage1/low_morale.twee)
- [ ] The Diner Incident (4.7): [diner_incident.twee](dev/quests/main/stage1/diner_incident.twee)
- [x] Be Nice to Brian (6.5b): [be_nice_to_brian.twee](dev/quests/sister/stage1/be_nice_to_brian.twee)

**Phase 8–9**
- [x] The Anchor (4.8): [the_anchor.twee](dev/quests/main/stage1/the_anchor.twee)
- [x] The Profit Party (4.9): [profit_party.twee](dev/quests/main/stage1/profit_party.twee)

**Phase 10**
- [x] The Catalyst Night (5.8 + 6.6, one event, both milestones into stage 2): [catalyst_night.twee](dev/quests/main/stage1/catalyst_night.twee) (her, at the office), [catalyst_night_2.twee](dev/quests/main/stage1/catalyst_night_2.twee) (mom, at home)
- [x] The Crack (4.10), two parts: [the_crack.twee](dev/quests/main/stage1/the_crack.twee), [the_crack_2.twee](dev/quests/main/stage1/the_crack_2.twee). The Monday part is its own quest now (`main_crackLogs`, "The Access Log")

**Phase 11–12**
- [x] The Calendar (5.9), her milestone into stage 3: [the_calendar.twee](dev/quests/mom/stage1/the_calendar.twee)
- [x] Two Towns Over (6.6b): [two_towns_over.twee](dev/quests/sister/stage1/two_towns_over.twee)
- [x] The Friend (6.6c): [the_friend.twee](dev/quests/sister/stage1/the_friend.twee)
- [x] The Introduction (4.11), the second family option: [retail_introduction.twee](dev/quests/main/stage1/retail_introduction.twee)
- [x] The Rooftop (6.7, optional): [the_rooftop.twee](dev/quests/sister/stage1/the_rooftop.twee)
- [x] The Retail Pitch (4.11): [retail_pitch.twee](dev/quests/main/stage1/retail_pitch.twee) (two passages, the second one at home that night)

**Phase 13**
- [x] Everything (6.8), her milestone into stage 3: [everything.twee](dev/quests/sister/stage1/everything.twee)
- [x] A Knock at Night, Again (6.8b): [knock_at_night_again.twee](dev/quests/sister/stage1/knock_at_night_again.twee), with the "not tonight / let her in" choice.
- [ ] After Hours (5.10, optional, needs the Boss line): [after_hours.twee](dev/quests/mom/stage1/after_hours.twee)

**Phase 14–15**
- [x] The Supplier (4.12), the last family option: [the_supplier.twee](dev/quests/main/stage1/the_supplier.twee)
- [x] Rehearsal (6.8c, optional): [rehearsal.twee](dev/quests/sister/stage1/rehearsal.twee)
- [x] The Night Shift (4.12): [night_shift.twee](dev/quests/main/stage1/night_shift.twee), [last_night_mom.twee](dev/quests/mom/stage1/last_night_mom.twee), [last_night_sister.twee](dev/quests/sister/stage1/last_night_sister.twee), [night_shift_2.twee](dev/quests/main/stage1/night_shift_2.twee)
- [ ] The Morning After (4.13): [morning_after.twee](dev/quests/main/stage1/morning_after.twee)

**Next to the scenes**
- [ ] Ethan's foreshadowing (3.3): CCTV clips of him alone at night. *Done in the scenes: Sister's "still there at nine" (Office Gossip), the bartender who knows him (First Real Sale 2), the uncapped build on the rig (The Crack), Darius's login in the log pull (The Access Log), him watching her mute the group chat (The Friend).*
- [ ] Important meals that call back to the bigger scenes (the CLAUDE.md meal pattern), at least after the Catalyst Night and The Calendar.
- [ ] Stage-aware variants of home scenes and interactions for her stages 2 and 3.

---

## 4. Tuning, once the scenes exist

- [ ] **Projects** (`define_projects.twee`): durations, requirements and rewards of the Veil, the marketing firm, the gym chain, the Anchor and the Catalyst are guesses. Check them against the real finances, so the squeeze from 3.1 works: the plain price goes from affordable to impossible over the stage.
- [ ] **Quest timings** (`define_quests.twee`): the "a few days after" gaps, time slots and weekdays. Play through once and check that no line waits for weeks and that no two big beats land on the same day.
- [ ] **Locations**: the marketing firm and the gyms have no place of their own (their projects point at the office). The bar, the Italian restaurant, the rooftop and the club are scenes that start from home or the office. Decide which of them become real locations.
- [ ] **Corruption pacing**: four milestones in one stage for each of them. Make sure the bar can fill between them without grinding.

---

## 5. Side lines, Stage 1 setup

Revised against [LATER_STAGES_VISION.md](LATER_STAGES_VISION.md), see proposal section 7. Each line opens its venue for the later stages, introduces the people who'll be there, and climbs to level 2 of the ladder. Nothing sexual with these four until the doorway at the end of Stage 1.

**Setup for each new line** (Boss, Manager, Landlord; the Prof line exists): a `quests` array and a start quest in Define Quests, the key in `setup.questLines`, a `*_end` quest, a portrait at `images/characters/portraits/<key>.jpg`, optionally a ring color. The `quest: 0` fields left over in Define NPCs become the quest id.

**Boss** (7.2, venue: his office tower, floor 6 and upstairs)
- [ ] Floor Six: Mom back on her old floor, "my former assistant", the coffee. Introduces her old colleagues and the woman at her old desk. Report or POV.
- [ ] The Support Review: the device doesn't take on him, the pills, the drink. The player starts a file on him.
- [ ] The Clip
- [ ] The Arrangement: pay / offer Mom / break him with the Anchor. Sets `$mom.flags.offeredToBoss`. **Then change its default in Define NPCs from `false` to `null`**, so After Hours stops being skipped.
- [ ] After Hours: this is Mom's 5.10 (`mom_afterHours`), already in her line.
- [ ] The Introduction: names the supplier. **Add it to the requirements of `main_supplier`.**

**Manager** (7.3, venue: the diner)
- [ ] Three Shifts: the weekly rule with the fine, a `{{...}}` counter in the requirement text.
- [ ] The Debrief: the Veil goes into the diner. **Add it to the requirements of `main_dinerIncident`.**
- [ ] The Regulars: the construction crew, the trucker, the old regular.
- [ ] Sales Report: "eighteen percent on her days". Waits for `main_dinerIncident`.
- [ ] The Uniform: seven shifts a week and a cut. The new uniform needs its own media for the diner shift activity.
- [ ] Cover Shift: Mom takes a shift in the new uniform. Needs a one-off way to put her at the diner (an event, or a one-off task).
- [ ] The Closing Keys

**Landlord** (7.1, venue: his apartment, card nights, outings)
- [ ] The Helpers: the CCTV tiers split by person (Mom keeps house, Sister is shown off), a POV passage per tier. Replaces the one-line CCTV clips (TODO.md P4).
- [ ] What He Saw: his footage, shown like a home video.
- [ ] Card Night: serving his three buddies. Introduces the loudmouth, the widower (with the warning about Norm) and the ex-military one.
- [ ] The Review: the rent goes up, or the visits do. Uses `visitedLandlordThisWeek` for the weekly rule.
- [ ] The Walk: to the pharmacy across the park, on his arm.
- [ ] The Sale: long, quiet Saturdays. Ends together with the main line.
- The Rival Tenant is cut.

**Prof** (7.4, venue: the college; the line exists up to The Proposition)
- [ ] The Face of the Project: also gives her college tutoring task its scenes.
- [ ] The List: the study group, with the athletes, the STEM club and the outsider.
- [ ] The Pilot: the Veil in the lecture hall, the second emitter on him.
- [ ] The Guest Lecture: Mom teaches one seminar, and the students respect her.
- [ ] The Dean's Visit: the co-signed report, the raw data she wants, "if I ran this place", Fridays. **Add it to the requirements of `main_morningAfter`** (the lawyer needs the report).
- [ ] The Letter: part of The Morning After (4.13).

**Docs**
- [x] [STAGE1_FLOWCHARTS.md](STAGE1_FLOWCHARTS.md) follows the revised section 7. *Its Mom and Sister charts still show the Catalyst nights (5.8, 6.6) as two scenes; in the game they're one event, `main_catalystNight`.*
- [x] [LATER_STAGES_VISION.md](LATER_STAGES_VISION.md) follows it too (Landlord beats, open question 8, new section 1.7).

---

## 6. Housekeeping for every step

- [ ] Run `node tools/quest-audit.mjs` (0 errors, and the STAGE1-STUB count should go down) and the name grep from CLAUDE.md on every file you touched.
- [ ] Update the help pages when a mechanic changes (report, offers, feelings), without spoilers.
- [ ] Keep CLAUDE.md's "Story so far" in step with what's actually written.
- [ ] [TODO.md](TODO.md), P4 "Systems with no content yet": "Veil and Catalyst are never owned" and "Mom's stage 2 and the sister's milestone" now have their structure (projects, stage entries), and "Flirt and client-entertainment tasks" is half there. Tick them off once the content behind them exists.

---

## 7. Playtest notes (2026-11-24)

From the first full playthrough of Stage 1.

**Blocking the story**
- [x] **No way to raise Exhibition.** *The new tasks are the main source now ([STAGE1_TASKS.md](STAGE1_TASKS.md)), capped at 40 in Stage 1.* Some of the sister's choices (and offers gated on Exhibition) can never be unlocked, because nothing in the normal game raises `MomExhibition`/`SisterExhibition` except a few scenes. Needs repeatable sources: tasks, interactions, micro events.
- [ ] **The family offers come too early.** The main line reaches its offer scenes (Gym Dinner, The Introduction, The Supplier) before the mom and sister lines have got far enough to unlock the family option, so it's nearly always locked. Give the main line more time before these big quests (longer waits, or requirements on the other lines' progress).

**Continuity and missing scenes**
- [x] **Rehearsal assumes The Rooftop happened.** *Three variants now (`_rhHosted`: the rooftop, the Thursday hostess evenings, never hosted). The Rehearsal and The Supplier no longer say "tomorrow" (the Client Evenings come in between, so the supplier names the night later); the ear line in Night Shift 2 and the rooftop line in The Supplier are gated too.* I skipped the rooftop hostess offer, but the rehearsal still talked as if she had hosted it. Several lines in [rehearsal.twee](dev/quests/sister/stage1/rehearsal.twee) mention the rooftop without checking `$flags.retailIntro === "sister"`. Add a variant for when she didn't host.
- [x] **No setup talk with mom before the club night.** *Done: Last Night Mom now opens in the kitchen, where he tells her what tonight is and that she says yes to whatever is asked; she assumes it's only her. Earlier note: the Client Evening task (its intro asks each of them separately) now has to run three times before the Night Shift when he offered them. A direct talk before the Night Shift itself could still be added.* She goes to the club with the sister without the player ever talking to her about it first. Add a scene (or a beat in Last Night Mom) where he asks or tells her.
- [ ] **Remaining stubs and unfinished content**: finish them (`grep -rn STAGE1-STUB dev`; see section 3).

**Her side of the story**
- [x] **Was That Right? as POV.** *Done: the dinner is `Mom Gym Dinner POV` between the two parts of the report scene (her question and every effect are in `Mom Gym Dinner Report 2`). The Rooftop ends with an optional link to `Sister Rooftop POV`, her side of the corner by the heaters, for both answers to the signal (`$sister.flags.rooftopSignal`, which Everything now reads too).* Mom telling him about the gym dinner should be a POV passage in her voice, like the report-back scenes, with the steakhouse background. Same treatment for the sister's equivalent scene (The Rooftop aftermath, or wherever she tells him how an evening went).
- [x] **After the club, they offer to tell him.** *Done: Night Shift 3 logs a `last_night` entry for the next day in both end-of-day reports (`setup.dayReports`), which opens `Last Night Mom POV` / `Last Night Sister POV`. The quest audit counts `setup.dayReports` passages as reached.* After Night Shift, mom and sister should each offer to tell him how it went inside, as a POV passage with the club background.

**More to do in Stage 1**
- [x] **Too few tasks for mom and sister.** *Built from STAGE1_TASKS.md (build order 1 to 7). Worth checking in the next playthrough whether it's enough.* Stage 1 has too little to actually do. New tasks should open up gradually over the stage (the side lines will add some, but they aren't open yet). *Planned with the author: [STAGE1_TASKS.md](STAGE1_TASKS.md) (task list, stages, systems, build order).*

**Day report**
- [x] **"How was your day?" shows up even with nothing to report.** *The card and the quick link now only show while she has an untold entry (`setup.hasDayReport` = `setup.dayReportNews`). A story not heard in full no longer keeps the card up; it stays in the Day Report list the next time she has news that day.* It should only appear (and only be highlighted) when one of them really has a new entry.
- [x] **Show which tasks feed the report.** *Done: a green speech bubble next to the title of the blocks in the schedule (and "in her report" in their tooltip), a Report pill in the help page's task table.* Mark tasks with a `report` (flirt duty has one, secretary work doesn't) with an indicator, in the CMD scheduler and wherever else tasks are listed. *Half done: the task picker has a **Report** badge now (`setup.taskHasReport`). The blocks in the schedule don't show it yet.*

**Balancing**
- [x] **Employee morale never runs out.** *Retuned: drain 1.6 per action (was 1.8), × (1.2 − company Morale/250), vent High ×1.8 (was 1.6); overnight 4 + company Morale/12.5 (8 at 50, was 15); company Morale drifts 10/week toward 50 (was 5). At company Morale 50: Off holds at ~80, Low loses ~8 a week (two Coffee Breaks cover it), Medium empties them in 2-3 weeks, High by the first Friday. High company Morale lets Low and Medium hold.* The overnight recovery outpaces the work drain. Retune `setup.companyStatTuning`, `setup.moraleRecovery()` and the vent levels' `drain`.
- [x] **Mom's and the sister's energy never runs out either.** *Retuned (`setup.taskEnergyTuning`, Define Tasks): +2 energy per action of a task on top of its base, a task only starts with its whole cost, overnight a flat 30 (mom) / 35 (sister) instead of 20 + 30%/70%, a free task row gives +1 (was +5). Two tasks a day hold around 80, four 2-action tasks a day leave her near empty by Friday, the weekend fills her up.* Retune task energy costs (`setup.taskEnergyCost`) and the overnight recovery.

**UI**
- [x] **No sidebar quick link for eligible quests.** *The `quest` quick link is desk only now and only for quests in the office main room or the meeting room (`setup.questQuickLinkPlaces`).* It made the game a click-through of the sidebar. Remove the `quest` entry from the sidebar. Keep it only as a CMD action, and only for quests at the office or the meeting room.
- [x] **Too much `--gold`.** *Boxes, panel titles, hovers, selected states, buttons, important quick links and the help/settings/save dialogs are cream now. Gold stays only as a signal: "New" badges and the highlighted report card, new/ready projects in the CMD, tasks with me (picker badge, schedule bar), the family option of an offer, quest hints and quest-line colours, the "ready" corruption pill, the Relation/Morale bar colour, passage links and the stage title card.* Most boxes and highlights should use `--accent` instead. Go through the stylesheet and the CMD/sidebar panels.

---

## Suggested order

1. Make the remaining decisions in section 1.
2. Build the end-of-day report and the POV passages. Half of the scenes are easier to write once they exist.
3. Set up the three new quest lines (Boss, Manager, Landlord) as stubs, the same way the main, mom and sister lines were done, and add their gates to the main quests (section 5). Two of them gate the main line now.
4. Write the scenes phase by phase, side lines included (the side-line column of the timeline in proposal section 8), building each system right before the first scene that needs it.
5. Play Stage 1 through once, then tune (section 4).
