# Rise to Ruin: micro events that grow with the story

A plan for how the existing micro events should change with mom's and the sister's corruption stages and story progress, and which new micro events the added logic makes possible. **Status (2026-11-26): phases 0 to 2 are built** (the tiers, the helpers, the widgets, the fixes, the debug link; mom's tiers 1 to 3 in eight events with ten scenes; the sister's tiers 1 to 3 in five events with ten scenes, plus Night Clip and her two catch events); everything from phase 3 on is still a plan. It replaces the old notes in `dev/events/micro_events/micro_event_future_scenes.twee` (written before corruption stages existed and now out of date).

**Names:** this is a design doc, so it uses the default names and role labels (Mom, Sister, Ethan, Brian, Darius, Boss). In the game every one of them is a variable. Sex is described at plot level only.

---

## 1. Where the micro events are now

48 micro events (ids 3 to 50): 20 at home, 11 inline at the office, 17 desk visitors.

What works:
- They make the house and the office feel lived-in: random pools, running jokes (the cereal revenge, the fern), small Relation gains.
- The data side is solid: `conditions.eval`, `oncePerDay`, `dayCooldown`, `apCooldown`, the desk visitor drawer, the Silence filter.

What's missing (the reason for this plan):
- **They don't grow.** No event changes with her corruption stage. The only reads are one line in Mom Office Vent (`corruptionStage >= 1`), two "third choices" at `corruptionTotal('sister') >= 40`, and two at `questDone('mom_nightVisit')`. Mom Kitchen Wine plays the same at stage 0 as after The Calendar.
- **Escalation means a new event.** Mom Catch (46 to 48) and the Whenever visitors (49, 50) are separate ids. That doesn't scale: it would need a new event for every place × every stage, and the old moment never changes.
- **The device option doesn't scale with her.** The five home events with a device choice size it by `$company.prototype.progress`, which is 100 for all of Stage 1, so it's always the same "she leans across the table" result.
- **Almost no scenes.** At most a summary paragraph ("Follow her"). Purpose 2 (opportunities for actual scenes) isn't met anywhere.

Problems found on the way (1 to 4 fixed in phase 0):
1. The sister's desk excuses (23 to 27: New Spot, Office Coffee, Signature, Question, Desk Late) only run between `sister_waitSupportiveSister` and `sister_itMakesADifference` (`setup.sisterSeeksExcuses`). After that they're gone for good, including Desk Late, which is the best scene hook at the office. *Fixed: they run from `sister_waitSupportiveSister` on, with `tier: [0, 1]`, so they last until Souvenirs (their text is her early crush). Phase 2 gives them later tiers.*
2. Mom Catch "Let her see you" assumes she learned it in the meeting room (Caught), but the catch events only check `mom_boozeNight`. *Fixed: the couch version has a line for before Caught instead of locking the option (the kitchen and shower versions never mentioned it).*
3. Doorbell Delivery has `npc: null`, so Mom can answer the door during The Silence. Sister Passing Hallway has `npc: null` too. *Fixed: the doorbell skips mom during The Silence (data and passage), Sister Passing Hallway has `npc: "sister"`.*
4. The device block is copy-pasted into five passages (and a sixth variant in Sister Desk Late). *Fixed: all six use `<<MicroDevice>>`.*
5. The counters `$mom.flags.handjobs`, `$sister.flags.handjobs` and `$mom.flags.morningRoutines` are never read by a micro event.
6. Exhibition still has no repeatable source at home (STAGE1_TODO). Micro events are the natural one.

---

## 2. The core idea: one moment, many versions

**A micro event is a situation, not a scene.** Mom with a glass of wine, Sister on her way to the shower, Mom at the sink. The situation stays the same for the whole game; what she does in it, and what the player can do, follows where she is in her arc.

Each micro event works in **three layers**:

| Layer | What it is | When |
|---|---|---|
| **Color** | The everyday version, with details that show where she is now. She stopped closing the robe. She calls him "honey" in a different voice. She checks where her daughter is before she answers. | Every time |
| **Offer** | One choice that goes further than the everyday version: ask her, let her, use the device. Locked with a reason when she isn't ready or isn't alone. | Most times, from tier 1 |
| **Scene** | A real scene: its own passage, media, explicit prose, 1 or 2 actions. Opened by the offer. | When the offer is taken |

This keeps both purposes:
- Purpose 1 (life): the moment still happens, still varies and is still mostly ordinary. At high tiers, about half of the occurrences should be plain everyday moments with only the color changed. A mother who drops to her knees in every room stops being a person.
- Purpose 2 (scenes): every important home situation gets a ladder of scenes, one per tier, so the player always has a reason to walk through the house.

**Rule of thumb:** a micro event scene must use its situation. The wine glass, the phone call that's still going, the running shower, the sister in the next room. If the scene could happen anywhere, it belongs in the interaction cards (Mom Handjob, Mom Whenever), which already change with the place.

---

## 3. The tiers: what she has done so far

Corruption stages alone don't say what's possible at home. Mom is in stage 1 from The Briefing (a handjob, once, in the meeting room) to The Crawl (her first blowjob). So micro events read an **intimacy tier**: what she has actually done with him, set by the story.

### Mom

| Tier | Name | From | At home |
|---|---|---|---|
| 0 | Family | start | Nothing physical. Warm, busy, tired. |
| 1 | Aware | corruption total 40 (the massage and test-session era) | She lets herself be looked at and touched in "harmless" ways. Self-conscious, talks herself into it. |
| 2 | Hands | `mom_nightVisit` | Handjobs when he asks. "Only when it gets bad" is still her rule. |
| 3 | Mouth | `mom_crawl` | Blowjobs, the morning routine. She says *thank you* for it. |
| 4 | Willing | `main_catalystNight` | Sex. No rule anymore, and he notices. |
| 5 | Whenever | `mom_calendar` (`freeUse`) | She offers first. No device. |

Modifiers (flags, not tiers): **touches herself** (`mom_boozeNight`), **knows he watches** (`mom_caught`), **is used by others** (`gymDinner`, `offeredToBoss`).

### Sister

| Tier | Name | From | At home |
|---|---|---|---|
| 0 | Sibling | start | Teasing from above, borrowed chargers. |
| 1 | Conflicted | `sister_conflictingFeelings` (after the kiss) | Charged teasing, lingering, his hoodie. Pulls back when she notices herself. |
| 2 | Yearning | `sister_souvenirs` | Handjobs, the videos. Shy at home until What Are We (modifier), bold at the office. |
| 3 | Devoted | `main_catalystNight` | Blowjobs, "I love you". |
| 4 | Mine | `sister_everything` | Sex, sleeps in his bed more nights than not, asks him to pick her clothes. |

Modifier: **asked "what are we"** (`sister_whatAreWe`, the home handjob card opens here), **sends videos** (`sister_sendMeSomething`).

Tier 2 and 3 for mom are both corruption stage 1, tier 4 is stage 2 and tier 5 stage 3. For the sister the tiers 2 to 4 are her stages 1 to 3. The corruption stage is still read for small things (see below).

### What else changes a micro event inside a tier

| Value | What it does |
|---|---|
| **Lust** | Who starts it. Low: he has to ask (the offer). High (about 70): she starts it, with a different opener ("You're up late, honey..."). After the scene it drops, like the catch events (−15 to −25). |
| **Corruption bar ≥ 80** ("ready" soon) | One line that leans toward the next tier. At tier 3 and ready, Mom lingers after and almost asks for something. It shows the player why the milestone quest is lighting up. Color only. |
| **Exhibition** | Where it may happen: doors open, the hallway, the other one home, the office with staff in. The risky versions raise it (the repeatable source it lacks). Capped at 40 in Stage 1 by `maxPath`. |
| **Resistance** | The device backfires as now (`10 + resistance/2`). Above about 50 the offer is refused softly ("Not tonight, sweetheart, I'm just... not tonight."), like the interaction cards' `max: { resistance: 50 }`. |
| **Feelings toward him** | Color only: after a cruel choice she still does it, but quieter. |
| **The other one** | Privacy, see section 5. |
| **The Silence** | Mom's events are skipped (already built), except the ones with `duringSilence`. |

---

## 4. The device: from key to dial to nothing

Proposal 3.2 says the device is scaffolding: needed at the start of Stage 1, not needed at the end. Micro events are the place where the player feels that on every walk through the house.

| Tier | The device in a micro event |
|---|---|
| 0 to 1 | **The key.** The offer only exists through the device. That's the current pattern, but sized by her tier instead of prototype progress. |
| 2 to 3 | **A dial.** She does the tier's act without it if her lust is high enough. With it, the player gets her there when lust is low, or one step further than her tier would allow (a risk she wouldn't take on her own). |
| 4 to 5 | **Nothing.** No device option. The choices are about where, how and how risky. The one exception: pushing her past her Exhibition (the hallway with the door open, the sister home). |

Cost and impact come from `$company.impactCost` by tier; Resistance goes up through `setup.useDevice` as everywhere else, so heavy device use at home makes the quest scenes harder. The heartbeat glow (`<<DevicePulse>>`) carries over.

---

## 5. Two women, one house

Neither knows about the other until the Last Night (proposal 6.9). That's the best source of tension the house has, and micro events can use it every day.

- **Same room:** the offer is locked ("$sister.callName is right there").
- **The other one home, different room:** the offer is open, but the scene has a **near miss** chance. A voice on the stairs, a knock, the TV switched off in the next room. Near misses raise Exhibition and give their own short endings. Morning Routine Near Miss already does exactly this; it's the model.
- **Nobody finds out in Stage 1.** Near misses never become discoveries. The car on the last night is the payoff; spending it on a random roll would waste it.
- **After the Last Night** (if it happened, Stage 2) both know, and the house opens up: section 9.

---

## 6. Existing events: how each one evolves

Not every event gets a ladder. Some stay everyday moments on purpose (marked **color only**): they're what makes the house feel normal, and normal is what the dark scenes need around them.

Tier numbers below are the tiers from section 3 (M = Mom, S = Sister).

### Mom, at home

**Mom Kitchen Wine (13)**: the best home hook she has. The topics stay (work, money, Dad, how she's really doing), and their answers change: at M3 "how are you really" gets an honest answer about the Silence week.
- M1: device offer: she gets tipsy and leans on him, lets him rub her shoulders at the table.
- M2: she asks him to sit with her while she finishes the glass. Offer: under the table, her hand, the glass in the other one. She keeps talking about the office as if nothing is happening, and loses the sentence halfway.
- M3: she kneels on the kitchen floor with the glass on the table above her, between sips. Lust high: she pours the second glass for him and doesn't sit back down.
- M4: bent over the counter, she tries not to spill. The wine is the joke he makes and she doesn't laugh at.
- M5: she's waiting with two glasses. A Dad topic variant: she tells him she deleted Dad's number, and asks if that was right.

**Mom Going Shower (15)**
- M1: the robe isn't tied as tight. Device offer: she leaves the bathroom door ajar "for the steam".
- M2: she asks him to bring her a towel in five minutes. Offer: he does, and stays. Hands, through the steam.
- M3: she asks if he wants to wash her hair. On her knees in the shower.
- M4: he follows her in.
- M5: she asks him if he's coming before she turns the water on. Near-miss version when the sister is home: the sister knocks for the hairdryer.

**Mom Living Room Stretch (16)**
- M1: "Help her stretch" gets warmer. Device offer: the hands go where a stretch doesn't need them, and she lets them.
- M2: the yoga pants, her on the mat, him on the couch. She "stretches" in front of him on purpose. Offer: hands.
- M3: she kneels on the mat between his feet.
- M4: on the mat, from behind, in the pose.
- M5: she asks which pose he wants. Exhibition variant: the living room curtains are open.

**Mom Brushing Teeth (19)**
- M0 to M1: color (who gets the sink first, toothpaste on his shirt).
- M2: she presses against him at the sink and doesn't move. Offer: hands, in the mirror.
- M3: morning, before the routine moves into his bed: she rinses, and kneels on the bath mat. Ties into Morning Routine (`morningRoutineReady`): only on days the routine didn't happen.
- M4 to M5: against the sink, in the mirror. Near miss when the sister's door opens.

**Mom Bedroom Clothes (6)**: she brings his laundry.
- M1: she sits on the bed to fold, chatting.
- M2: she finds the shirt with her lipstick on it from the office, and holds it up.
- M3: she puts his clothes away and kneels by the bed without being asked.
- M4: she's wearing one of his shirts and nothing else. "It was in the wrong pile."

**Mom Phone Living Room (10)**: overheard calls, the pool grows with the story.
- New callers: the Boss after The Handover (she's polite in a voice he's never heard); a friend asking why she never comes out anymore (M3+); Dad (M4+: she hangs up on him, then looks over to see if her son saw).
- M3+ offer: she stays on the phone while he's with her. Her voice may not change. That's the scene.

**Mom Catch (46 to 48)**: becomes tiered instead of three fixed versions.
- Before Caught: watch, or walk away. "Let her see you" locked.
- After Caught (M2): "Let her see you" as now.
- M3: she sees him and asks him to come closer and watch properly.
- M4: she stops and asks if he wants to finish it for her.
- M5: replaced by a new event, "Mom Door Ajar" (section 8): she doesn't hide it anymore.

**Mom Passing Hallway (3)**: **color only.** New lines per tier: the "honey" that sounds different, her hand on his arm as she passes, at M5 "I'm here if you need anything" said like a schedule.

### Sister, at home

**Sister Going Shower (14)**: the teasing remarks change with her tier.
- S1: the joke about him hovering falls flat because she blushes.
- S2 (after What Are We): offer: she leaves the door unlocked and tells him she did.
- S3: she asks him in. Blowjob in the shower, the joke she makes about the water bill to cover her nerves.
- S4: he follows her in. Near miss: Mom's voice outside, asking who's using all the hot water.

**Sister Kitchen Snack (12)**: the cereal war stays (it's a callback machine).
- S1: she feeds him a spoonful off her own spoon, then gets very busy with the cereal box.
- S2: she sits on the counter and he stands between her knees. Offer: hands.
- S3: she offers him "dessert" and kneels by the fridge, laughing until she isn't.
- S4: on the kitchen table. Near miss: Mom's car in the driveway.

**Sister Living Room Stretch (17)**
- S1: the rep contest has a bet now (loser does what the winner says).
- S2: she loses on purpose. The bet: hands.
- S3: the bet is her mouth.
- S4: squats in his lap on the couch.
- Exhibition variant: the curtains open.

**Sister Bedroom Borrow (7)**: "she owes you one" (`favorsOwed`) is the hook.
- S1: she comes to borrow his hoodie, and doesn't give it back (color for the rest of the game, see "Sister Hoodie").
- S2: she pays the favor back. Offer: hands.
- S3 to S4: she doesn't come to borrow anything anymore. She closes the door behind her.

**Sister Phone Living Room (9)**
- New callers: Jess after The Friend (she lets it ring out and puts the phone face down); a guy from class (S2+: she says "I'm seeing someone", and looks at him).
- S3+ offer: she stays on the call with Jess while he's with her.

**Sister Sleepy Hallway (8)**
- S2: she walks into him on purpose and stays there.
- S4: she comes out of his room, not hers, and Mom's door is opening. Near miss.

**Sister Brushing Teeth (20)**: S1+ a shared-mirror tease, S3 she kneels on the bath mat with the toothbrush still in her hand. Near miss: Mom knocks.

**Color only:** Sister Passing Hallway (4), Sister Hallway Forgot (5), Sister Hallway Bump (11). New lines per tier: at S2 she kisses his cheek and checks the stairs; at S4 she calls him something that isn't "bro" and corrects herself when Mom is near.

### Shared

**Doorbell Delivery (18)**: whoever answers.
- Color per tier: at M3 Mom answers in his shirt; at S2 Sister answers in his hoodie.
- M4+/S4+ with Exhibition 30+: the offer is to send her to the door the way she is. The scene is the delivery guy's face and her walk back. No touching by him (others come in Stage 2).
- Give it an npc so the Silence filter works.

### Office, inline

**Mom Office Blouse (41)**: already gated on The Briefing.
- M2: "Tell her it suits her" ends with her asking if he wants to see it closer, later, in the meeting room.
- M3: he tells her to undo one more button for the day, and she does. Exhibition, Morale (Brian, the door).
- M4+: he takes it off her in the meeting room before lunch.

**Mom Office Vent (40)**: the one event that already reads her stage. Extend it: M3 she asks if the vent can be turned up "for the afternoon"; at Complicit (after The Calendar, truth branch) she knows what the vent does and stands under it anyway.

**Mom Office Staff (39)**: color by her feelings (Flirt Duty set them): stiff with one, laughing with another. At M3 the player can send her to sit on Darius's desk while he works. Morale and her Exhibition; the scene is a POV-free one-liner from across the room.

**Sister Office Darius (31)**: her feelings for Darius (The Ask) color it.
- S2: she flirts at Darius to make him look up from his screen. "Call her over" opens the desk.
- S3+: "Look back at your screen" leads to a text from her, three minutes later, from the bathroom.

**Sister Office Brian (29)**: after Be Nice to Brian, she gives Brian the shoulder massage while looking at the player. Brian explains capacitors.

**Color only:** Mom Office Plants (38), Sister Office Coffee Round (28), Sister Office Ethan (30), Sister Office Printer (42), Sister Office Mom (43), Staff Office Argument (44). Sister Office Mom (43) gets one darker line per tier: at M3 and S3 both look at the player at the same time when the other one says something, and neither notices the other doing it.

### Desk visitors

**Sister Desk Late (25)**: becomes the office evening ladder. Re-gate it on her tier instead of `sisterSeeksExcuses`.
- S1: as now (her head against his knee).
- S2: she sits on the floor next to his chair; offer: under the desk, her hand.
- S3: under the desk. "I love you" from under it.
- S4: on the desk, the cables she sorted all over the floor.
- Device: tier rules from section 4.

**Sister New Spot, Coffee, Signature, Question (26, 27, 23, 24)**: re-gate them so they continue after It Makes a Difference, with new lines per tier. Signature at S2: "Offer to sign the whole month" gets a price. Question at S3: she sits on his lap to "see the screen".

**Sister Desk Coffee (21)** and **Sister Desk Flashcards (37)**: replace their `corruptionTotal >= 40` third choices with tier offers. Flashcards at S2: wrong answer, a piece of clothing. Office, so Exhibition gates how much.

**Mom Desk Lunch (32)**: "Tell her your hands are busy" (after the Night Visit) is the right idea. Extend: M3 she brings lunch and eats hers under the desk, after; M5 lunch is in the meeting room.

**Mom Desk Calendar (33)**: the blocks at six. At M2 the six o'clock block says "review". At M4 it says "review" every day. At The Calendar it's the calendar she circles, so after mom_calendar this event goes quiet for a week (she won't touch the calendar in front of him) and then comes back with a new label.

**Mom Desk Boss Call (34)**: follows the Boss line.
- After The Handover: she asks if she has to go.
- After The Arrangement, offered: she asks what the Boss would like her to wear.
- After After Hours: she takes the call in the meeting room and comes back with her blouse buttoned wrong.

**Mom Desk Blinds, Mom Desk Note (49, 50)**: they summarize the sex now. Turn the offer into a real scene (meeting room, supply closet) through `<<MicroScene>>`.

**Color only:** Ethan Desk Visit (22), Brian Desk Vent (35), Darius Desk Numbers (36).

---

## 7. New micro events

Ordered by when they open. Each one is a situation with its own tier ladder.

### Mom

| Name | Where, when | Gate | The ladder |
|---|---|---|---|
| **Mom Waits Up** | Kitchen, Late Night, when he comes home late from the office | Stage 1 | M0: a plate in the microwave and a note. M2: she's still up and offers to help him sleep. M3: she's waiting at the bottom of the stairs. M5: in his shirt at the counter. |
| **Mom Door Ajar** | Hallway, Night | after The Booze Night | M1: she's reading in bed in a nightgown and calls goodnight. After Caught: she's touching herself and the door is open on purpose. M4: she says his name, loud enough. M5: she asks him in. Replaces the catch events once she wants to be caught. |
| **The Ride In** | Residential Area, Morning, weekdays she works at the office | Stage 1 | M0: radio fights, her to-do list. M2: her hand on his thigh at the red light. M3: the parking garage, five minutes before the staff arrive (public risk, Exhibition). M5: she asks if he'd like to start the day properly. |
| **Outfit Check** | Desk visitor, Morning, days with a client visit | after The Briefing | M1: "Is this okay?" M2: "Like last time?" (the Briefing callback). M3: he sends her in without a bra. After The Arrangement: she asks what the Boss likes. |
| **Under the Desk** | Desk visitor, office hours | M3, Exhibition 20 | She's under the desk when Ethan, Brian or Darius comes over with a question. Public risk. The staff member's version of the talk is the comedy, hers is not. |
| **Brian and the Door** | Office inline, staff | after Caught | Brian can't look at her. Walks into the door, then the chair. Color only, Morale. |

### Sister

| Name | Where, when | Gate | The ladder |
|---|---|---|---|
| **Sister Hoodie** | Hallway, Living Room | S1 | Color: she wears his hoodie around the house. Mom notices: "Isn't that your...?" From S2 the sister answers too fast. |
| **Study Break** | Sister Room, Afternoon/Evening, weekdays | S0 | S0: she's drowning in statistics and wants him to quiz her. S2: a reward per chapter. S3: she studies on his lap and loses her place. S4: she stops pretending to study. |
| **Night Clip** | Bedroom, Night/Late Night | after Send Me Something | A video on his phone. S2: shy, apologizes before sending. S3: says "I love you" to the camera. S4: from the office bathroom during the day (Exhibition), or asking what to wear tomorrow (the wardrobe hook). The repeatable version of Send Me Something. |
| **Sister Catch** (two places: her room, the shower) | Sister Room, Bathroom | after Send Me Something | Her version of Mom Catch. Her bed, his hoodie, his name. From S3 the shower door is unlocked on purpose. |
| **In My Bed** | Bedroom, Late Night and Early Morning | S4 | She's already in his bed. On weekdays when Mom's morning routine is due, this is where the near miss happens from the sister's side (Morning Routine Near Miss is Mom's side). |
| **Behind the College** | College Backside | S3, when the player is at the college (Prof line) | Between classes. Public risk, her classmates on the other side of the wall. After The Friend: Jess walks past. |
| **Her Shift** | Diner, while she works there | S2, the Manager line | Her uniform, the counter. S2: she flirts across the counter in front of the Manager. S4: the storeroom. Ties into the Manager line's uniform beat. |

### Both

| Name | Where, when | Gate | The ladder |
|---|---|---|---|
| **Movie Night** | Living Room, Evening, both home | M2 or S2 | The three of them under one blanket. M2+: Mom's hand under the blanket while the sister laughs at the movie at the other end. S2+: the sister's foot in his lap. When both are high enough: both at once, and neither knows about the other. The best near-miss scene the house can have. |
| **Bathroom Queue** | Hallway, Early Morning, both home | M3 and S3 | Both want the bathroom. Whoever he lets in first gets a minute alone with him. The other knocks. |

---

## 8. What the system needs

Everything below is small, and fits the code conventions (constants in `setup`, state on the existing objects, string keys).

1. **The tier constants and helper**, in `define_npcs.twee` next to the corruption stages:
   `setup.intimacyTiers.<sysName> = [ { name, quest | check } ]` and `setup.intimacy(who)`, which counts the reached entries. No state, so the debug skip-to-quest links set it for free.
2. **Micro event fields** (`define_events.twee`, field list in the header):
   - `tier: [min, max]` for the event's npc, filtered in `setup.pickMicroEvent` (replaces windows like `sisterSeeksExcuses`).
   - `seen` and `seenTier` counters (written when picked), so a passage can play a first-time version of its tier and shorter repeats afterward, the way `officePlants` does now.
   - Optional `tierChance: { 3: 25 }`, so high-tier events come a little more often as her lust grows.
3. **`<<MicroContext $mom>>`** (event widgets): sets `_mc` once per passage: `tier`, `ready`, lust band, `alone` / `otherHome` / `otherHere`, `exhibition`, `firstAtTier`, and the device lock (`ok`, `reason`, `cost`). Every event reads the same object instead of repeating the checks.
4. **`<<MicroDevice $mom "#choice-id" "Link text">>...<</MicroDevice>>`**: replaces the copied device blocks. Impact and cost by tier (`setup.microTuning`), backfire by Resistance, `setup.useDevice` for the use. The contents hold the text, in an `_md.backfire` branch.
5. **`<<MicroScene $mom "Passage" [actions]>>`**: leaves the inline event or the desk drawer for a full scene passage (tag `scene`, so the sidebar locks), spends the actions and counts her scene of the day. The scene ends with `<<EndMicroScene>>`, which goes back to the place (`<<ReturnFromEvent>>` is tied to `$events`, so it can't be used here).
6. **Daily cap:** at most one micro event scene per woman per day (`setup.microSceneToday(who)`), so a walk through the house doesn't turn into a gauntlet. Color and offers still happen; the offer is locked with "Later" once she's had one.
7. **Near misses:** a helper that rolls the chance when the other one is home (`setup.nearMissChance()`), and the rule that a near miss never reveals anything in Stage 1.
8. **Stats:** an offer taken gives +1 corruption (+2 at tier 0 to 1 through the device), a lust reset, and +1 to +3 Exhibition for risky versions. Small on purpose: the milestones still drive the story, but the micro events are the steady way to fill the bar to "ready" (the milestone quests read `setup.corruptionReady`).
9. **Debug:** a Dev Caption link to play a micro event by id with the current state, so a tier can be checked without waiting for the roll.
10. **Media:** scenes live in `images/characters/<sysName>/events/<event name>/`. Color versions reuse the existing clips. `tools/activity-media.mjs` doesn't cover events; a missing-file check for micro event media would help once the list grows.

The full-screen events (Mom/Sister Bathroom, `$events[1]`/`[2]`, and the bed masturbation events 3 and 4) have the same problem and can use `setup.intimacy` the same way. They aren't part of this plan, but should get the same pass right after.

---

## 9. Later (Stage 2 and after)

- **After the Last Night** both women know about each other. The near-miss logic turns around: shared versions of Movie Night, the Bathroom Queue and the morning routine, and the house rules change (who gets him first).
- **Wardrobe orders** (Stage 2) feed the color layer of every event: what she's wearing comes from his order.
- **Venues** (LATER_STAGES_VISION.md): each venue can get its own micro events (the diner counter, the Landlord's stairwell) on the same tier logic, read against the venue level instead of the home tier.
- **Others at home**: the Doorbell is the first step. Stage 2 can bring the Landlord or a client into the house.

---

## 10. Order of work

| Phase | What | Why first |
|---|---|---|
| 0 | Fixes from section 1, the helpers (8.1 to 8.7), the device widget, the debug link | Everything else reads them. **Done.** |
| 1 | Mom tiers 1 to 3 in Kitchen Wine, Going Shower, Stretch, Brushing Teeth, Bedroom Clothes, Catch; Office Blouse, Desk Lunch | Her story up to The Crawl is written, so these tiers are reachable now. **Done**: 10 scenes in `dev/events/micro_events/scenes/` (the clip lists are in their header comments). |
| 2 | Sister tiers 1 to 3: Desk Late (re-gated), Going Shower, Kitchen Snack, Stretch, Bedroom Borrow; Night Clip, Sister Catch | Same reason, and the sister has fewer home scenes than Mom. **Done**: micro events 51 (Sister Night Clip), 52 and 53 (Sister Catch Bedroom / Shower), the scenes in `dev/events/micro_events/scenes/sister_*.twee`. Her home offers at tier 2 wait for What Are We; Bedroom Borrow's tier 2 offer spends her open favour. The other desk excuses (23, 24, 26, 27) still end at tier 1. |
| 3 | Movie Night, Mom Door Ajar, Mom Waits Up, The Ride In, Under the Desk, Study Break | New situations, once the system has proved itself |
| 4 | Mom tiers 4 to 5, Sister tier 4, In My Bed, Bathroom Queue, Doorbell exhibition | Need the stub milestones (Catalyst Night, Calendar, Everything) to be playable |
| 5 | Behind the College, Her Shift, the Boss Call ladder | Wait for the side lines (Prof, Manager, Boss) |

Each phase: compile into the temp folder, quest audit, the name grep on every new text, and test each tier with Skip Intro plus SkipToQuest.

---

## 11. Decisions for you

1. **Tiers:** are the milestones in section 3 right? In particular Mom's tier 1 at corruption total 40 (no quest marks that era), and the sister's tier 1 at Conflicting Feelings.
2. **Scenes cost actions?** The plan says 1 or 2. Free scenes would make the house a grind-free lust reset.
3. **Daily cap:** one micro scene per woman per day, or more?
4. **Near misses:** never a discovery before the Last Night (the plan), or an occasional "almost" that changes her feelings?
5. **Media:** which situations you can get clips for decides which ladders get written first. The plan picks by story order; if you have clips for, say, the shower and the kitchen, those go first.
6. **The old notes file** (`micro_event_future_scenes.twee`): delete it once this plan is accepted, or keep it as raw material?
