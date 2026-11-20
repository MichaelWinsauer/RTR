# Rise to Ruin: Stage 1 to-do

What's left before Stage 1 is playable from start to end. Written 2026-11-20, right after the quest structure for the rest of the main, mom and sister lines went in. The story itself is in [STAGE1_PROPOSAL.md](STAGE1_PROPOSAL.md) (section numbers below refer to it). Bugs and older open items stay in [TODO.md](TODO.md).

**Where things stand:** every quest from "The Veil" to "The Morning After" exists in `define_quests.twee`, wired into the three lines, with an empty scene passage that just advances the quest. Decision scenes have plain choice links so every branch can be tested. Everything unfinished is marked **`STAGE1-STUB`** (`grep -rn STAGE1-STUB dev`; the quest audit prints the count). Remove a marker when its part is done.

**Names:** this is a design doc, so it uses the default names and role labels. In the game every one of them is a variable.

---

## 1. Decisions to make first

These change what gets built or written, so they come before the scenes that depend on them.

- [ ] **Ethan's equity** (proposal 3.3 and section 10, item 6): a token 2% as a choice at the Profit Party, or always stalled? `$flags.ethanEquity` waits for it.
- [ ] **How hard the family offers are gated** (3.1): which corruption and exhibition values unlock each offer (gym dinner, rooftop, supplier). Right now the stubs only check that her line has reached the optional quest.
- [ ] **The Boss line, or a way around it.** Two main/mom beats depend on it:
  - After Hours (5.10) is always skipped until The Arrangement (7.2) can set `$mom.flags.offeredToBoss`.
  - The Supplier (4.12) should come after the Boss names him (7.2, The Introduction).
  Either build the Boss line's Stage 1 setup, or let the supplier come in another way and cut After Hours from Stage 1.
- [ ] **The Veil at the diner.** The Diner Incident (4.7) assumes a Veil is installed there, which is the Manager line's Debrief (7.3). Same choice: build that quest first, or install it inside the main line.
- [ ] **How the first sale arrives** (4.4): a mail like the gym lead, or a call inside the scene.
- [ ] **The supplier's pay branch** (4.12): emptying the account, a loan, or a cancelled project? A loan would be a new system.
- [ ] **The end of Stage 1** (4.13): what else resets at The Morning After (Ethan's project assignments, the vent unit, CCTV, the office), and where Stage 2 starts (`$company.stage`, a title card, a new location).
- [ ] **Names to keep:** the corruption stage names (Willing, Complicit, Yearning, Devoted, Mine), the contacts (Dana Pruitt, Rick Dawson, Charles Whitfield, Leon Calloway, Jess Moreno) and their companies. Should the contacts become renamable in Character Configuration?

---

## 2. Systems to build

In the order the story first needs them. Each one names the first quest that uses it.

- [ ] **End-of-day report** (3.5): the "How was your day?" card on `NPC Interaction`, `$mom.dayLog` / `$sister.dayLog`, report lines per task or event, cleared overnight. First needed at **Office Gossip** (6.3). After that it carries the Diner Incident, Was That Right? and The Friend, which are plain events until it exists.
- [ ] **POV passages behind the CCTV arrow** (3.5): her side of a task, in her own voice. First needed for Flirt Duty and Extra Friendly. Add a line for this exception to the voice rule in CLAUDE.md.
- [ ] **The two new tasks get their own content.** `task_mom_flirt_duty` and `task_sister_be_nice_to_brian` borrow `working` and `bring_coffee`. Each needs its own activity in `define_activities.twee` (text, media, cctv), effects in `onComplete`, and a description that matches.
- [ ] **The Silence** (5.5): lock her interactions while `$mom.flags.silence` is true, and add her small attempts to make up (breakfast, a note, lasagna) as micro events or meals.
- [ ] **After The Booze Night** (5.1): more places for her masturbation micro events, and the "catch her" scene.
- [ ] **The morning routine** (5.6): unlocked by The Crawl (`$mom.flags.morningRoutine`). Decide whether it's an interaction, a micro event or a task.
- [ ] **Family offer UI** (3.1): an offer that's visible but locked, with the reason ("She isn't ready for that"), in scenes and in mail answers. Needs the `exhibition` stat to be usable: statDefs keys (`MomExhibition`, `SisterExhibition`) and some sources that raise it.
- [ ] **Feelings** (3.6), optional but cheap: `$mom.feelings`, `<<Feel>>`, `setup.feels()`. Flirt Duty is the first scene that sets some.
- [ ] **Quest devices with two targets.** The Catalyst Night uses the Catalyst on both of them, but the quest `device` field takes one target. Either allow a list, or give the scene two `<<UseQuestDevice>>`-like calls.
- [ ] **The Anchor**: decide if it stays a finished project (`setup.projectDone('project_company_anchor')`) or becomes a device in `$company.devices`. Also, only Brian should work on it, and projects can't restrict staff yet.
- [ ] **"Whenever"** (5.9): the free-use interaction card that The Calendar unlocks (`$mom.flags.freeUse`).
- [ ] **Money for the deals**: the broker fee (4.11) and the supplier's price (4.12) should actually leave the company account.
- [ ] **Stage 1 → 2 handover** (4.13): whatever was decided in section 1.

---

## 3. Scenes to write

In play order, phase by phase (proposal section 8). Each stub's comment says what the scene is. Write the scene, move its effects (stats, `<<ProfileLog>>`, `<<ProfileMemory>>`) in, replace the stub choice links with real ones, and remove the marker.

**Phase 1–2**
- [ ] The Veil (4.2): [the_veil.twee](dev/quests/main/stage1/the_veil.twee)
- [ ] The Booze Night (5.1): [booze_night.twee](dev/quests/mom/stage1/booze_night.twee)
- [ ] Caught (5.2): [caught.twee](dev/quests/mom/stage1/caught.twee)
- [ ] The Ask (6.1): [the_ask.twee](dev/quests/sister/stage1/the_ask.twee)

**Phase 3**
- [ ] The Late Night (4.3): [the_late_night.twee](dev/quests/main/stage1/the_late_night.twee). Also add the vent switch to Off before Ethan arrives (3.3).
- [ ] Flirt Duty (5.3): [flirt_duty.twee](dev/quests/mom/stage1/flirt_duty.twee)
- [ ] Souvenirs (6.2), her milestone into stage 1: [souvenirs.twee](dev/quests/sister/stage1/souvenirs.twee)

**Phase 4**
- [ ] The First Real Sale (4.4), two parts: [first_real_sale.twee](dev/quests/main/stage1/first_real_sale.twee), [first_real_sale_2.twee](dev/quests/main/stage1/first_real_sale_2.twee)
- [ ] Not Enough (5.4): [not_enough.twee](dev/quests/mom/stage1/not_enough.twee)
- [ ] Office Gossip (6.3): [office_gossip.twee](dev/quests/sister/stage1/office_gossip.twee)

**Phase 5**
- [ ] The Gym Meeting (4.5a), two parts: [gym_meeting.twee](dev/quests/main/stage1/gym_meeting.twee), [gym_meeting_2.twee](dev/quests/main/stage1/gym_meeting_2.twee). Revise Rick's mail too (`$company.mails[4]`, a first draft).
- [ ] The Crawl (5.6): [the_crawl.twee](dev/quests/mom/stage1/the_crawl.twee)
- [ ] Send Me Something (6.4), three parts: [send_me_something.twee](dev/quests/sister/stage1/send_me_something.twee), [_2](dev/quests/sister/stage1/send_me_something_2.twee), [_3](dev/quests/sister/stage1/send_me_something_3.twee)

**Phase 6**
- [ ] The Gym Dinner (4.5b), the first family option: [gym_dinner.twee](dev/quests/main/stage1/gym_dinner.twee)
- [ ] Was That Right? (5.7, optional): [mom_gym_dinner_report.twee](dev/quests/mom/stage1/mom_gym_dinner_report.twee). The "let him / keep it light" choice belongs before she leaves, so it goes into the Gym Dinner scene.
- [ ] What Are We (6.5): [what_are_we.twee](dev/quests/sister/stage1/what_are_we.twee)

**Phase 7**
- [ ] Morale (4.6), Darius in or out: [low_morale.twee](dev/quests/main/stage1/low_morale.twee)
- [ ] The Diner Incident (4.7): [diner_incident.twee](dev/quests/main/stage1/diner_incident.twee)
- [ ] Be Nice to Brian (6.5b): [be_nice_to_brian.twee](dev/quests/sister/stage1/be_nice_to_brian.twee)

**Phase 8–9**
- [ ] The Anchor (4.8): [the_anchor.twee](dev/quests/main/stage1/the_anchor.twee)
- [ ] The Profit Party (4.9): [profit_party.twee](dev/quests/main/stage1/profit_party.twee)

**Phase 10**
- [ ] The Catalyst Night (5.8 + 6.6, one event, both milestones into stage 2): [catalyst_night.twee](dev/quests/main/stage1/catalyst_night.twee) (her, at the office), [catalyst_night_2.twee](dev/quests/main/stage1/catalyst_night_2.twee) (mom, at home)
- [ ] The Crack (4.10), two parts: [the_crack.twee](dev/quests/main/stage1/the_crack.twee), [the_crack_2.twee](dev/quests/main/stage1/the_crack_2.twee)

**Phase 11–12**
- [ ] The Calendar (5.9), her milestone into stage 3: [the_calendar.twee](dev/quests/mom/stage1/the_calendar.twee)
- [ ] Two Towns Over (6.6b): [two_towns_over.twee](dev/quests/sister/stage1/two_towns_over.twee)
- [ ] The Friend (6.6c): [the_friend.twee](dev/quests/sister/stage1/the_friend.twee)
- [ ] The Introduction (4.11), the second family option: [retail_introduction.twee](dev/quests/main/stage1/retail_introduction.twee)
- [ ] The Rooftop (6.7, optional): [the_rooftop.twee](dev/quests/sister/stage1/the_rooftop.twee)
- [ ] The Retail Pitch (4.11): [retail_pitch.twee](dev/quests/main/stage1/retail_pitch.twee)

**Phase 13**
- [ ] Everything (6.8), her milestone into stage 3: [everything.twee](dev/quests/sister/stage1/everything.twee)
- [ ] A Knock at Night, Again (6.8b): [knock_at_night_again.twee](dev/quests/sister/stage1/knock_at_night_again.twee). Add the "not tonight / let her in" choice.
- [ ] After Hours (5.10, optional, needs the Boss line): [after_hours.twee](dev/quests/mom/stage1/after_hours.twee)

**Phase 14–15**
- [ ] The Supplier (4.12), the last family option: [the_supplier.twee](dev/quests/main/stage1/the_supplier.twee)
- [ ] Rehearsal (6.8c, optional): [rehearsal.twee](dev/quests/sister/stage1/rehearsal.twee)
- [ ] The Night Shift (4.12): [night_shift.twee](dev/quests/main/stage1/night_shift.twee), [last_night_mom.twee](dev/quests/mom/stage1/last_night_mom.twee), [last_night_sister.twee](dev/quests/sister/stage1/last_night_sister.twee), [night_shift_2.twee](dev/quests/main/stage1/night_shift_2.twee)
- [ ] The Morning After (4.13): [morning_after.twee](dev/quests/main/stage1/morning_after.twee)

**Next to the scenes**
- [ ] Ethan's foreshadowing (3.3): CCTV clips of him alone at night, Sister's "still there at nine" (Office Gossip), Darius's login in the log pull (The Crack).
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

Not part of this pass, but the main line touches them (proposal section 7). Each one gets its own quest line (`setup.questLines`, a portrait, a `*_end` quest).

- [ ] **Boss** (7.2): Support Review, The Clip, The Arrangement, After Hours, The Introduction. Needed by After Hours and The Supplier (section 1).
- [ ] **Manager** (7.3): Three Shifts (the weekly rule with the fine), The Debrief (the Veil at the diner, needed by the Diner Incident), The Incident, The Uniform, The Closing Keys.
- [ ] **Landlord** (7.1): The Helpers (the CCTV tiers), What He Saw, The Review, The Rival Tenant, The Sale.
- [ ] **Prof** (7.4): The Face of the Project, The List, The Pilot, The Dean's Visit, The Letter. The Letter is what the lawyer asks for in The Morning After.

---

## 6. Housekeeping for every step

- [ ] Run `node tools/quest-audit.mjs` (0 errors, and the STAGE1-STUB count should go down) and the name grep from CLAUDE.md on every file you touched.
- [ ] Update the help pages when a mechanic changes (report, offers, feelings), without spoilers.
- [ ] Keep CLAUDE.md's "Story so far" in step with what's actually written.
- [ ] [TODO.md](TODO.md), P4 "Systems with no content yet": "Veil and Catalyst are never owned" and "Mom's stage 2 and the sister's milestone" now have their structure (projects, stage entries), and "Flirt and client-entertainment tasks" is half there. Tick them off once the content behind them exists.

---

## Suggested order

1. Make the decisions in section 1, at least the Boss line and the Veil at the diner.
2. Build the end-of-day report and the POV passages. Half of the scenes are easier to write once they exist.
3. Write the scenes phase by phase, building each system right before the first scene that needs it.
4. Play Stage 1 through once, then tune (section 4).
5. Add the side lines' setup, starting with the Boss and the Manager.
