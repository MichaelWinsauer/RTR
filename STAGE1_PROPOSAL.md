# Rise to Ruin: Stage 1 proposal

A suggestion for how the rest of Stage 1 could go, for the main, mom and sister lines, plus the first setup for the landlord, boss, manager and prof lines. Nothing here is written into the game yet. The flowcharts are in [STAGE1_FLOWCHARTS.md](STAGE1_FLOWCHARTS.md).

**Fixed points (yours):**
- Ethan's betrayal ends Stage 1.
- Mom and Sister get used by *other people*, on the player's orders, for his profit.
- Both private corruption arcs are finished by the end of Stage 1.
- The landlord, boss, manager and prof only get their setup in Stage 1. The sexual part starts in Stage 2.

**Decided since the first draft (2026-11-20):**
- In Stage 1, using Mom and Sister with others is the **player's idea**. He offers them as an alternative to a price. Nobody asks for them, except where the ask fits the business (see 3.1). The family option is never strictly required, but over the stage it gets harder to avoid, up to prices he realistically can't pay.
- No new CMD panels. Choices live in scenes and mail answers.
- Scenes the player isn't in are shown as a **POV swap** (her point of view) behind the CCTV arrow, or through the **end-of-day report** (3.5).
- The favor ledger, the diary and the earpiece are dropped. Wardrobe orders move to Stage 2.
- Resentment became **Feelings**: how she feels about a specific person, anyone, not just the player (3.6).

**Names:** this is a design doc, so I use the default names and role labels (Mom, Sister, Landlord, Boss, Manager, Prof). Client names I invented (Rick, Dana, Whitfield, Calloway and so on) are placeholders. In the game every one of them needs a story variable. Sex is described at plot level only.

---

## 1. Why it feels same-y, and what to keep

I read Stage 0, all of Stage 1 so far, the tasks, the interactions and your notes. The writing is good. The problem is the *shape*.

1. **Every escalation runs the same loop.** A reasonable framing ("it's for the test", "it's for the company", "just this once"), then the device goes up, then a slightly bigger act, then she lies awake with a rule ("only when it gets bad"). The massage, the test sessions, the Briefing and the Night Visit all work this way.
2. **It's always one room and one person.** Meeting room, bedroom, My Desk. Mom and Sister never meet the world as what the player is turning them into.
3. **The player never loses.** Nobody surprises him, nobody pushes back, nobody wants something he didn't plan. Even Darius only asks questions.
4. **The family and the business don't need each other.** The notes say "requirement: Mom's arc", but the story never shows what the company actually *gets* for it.
5. **Everyone else is inert.** The landlord, boss, manager and prof each have one scene and a promise ("there will be more"). Nothing happens to those promises.

**Keep:**
- The Stage 1 tone (`too_much_work`, `it_makes_a_difference`): warm on top, cold underneath.
- Mom's ladder up to *A Knock at Night*.
- The "tests" as a pretext. It's a great device. It just can't be the only one.
- The Ethan betrayal, with a better motive (section 3.3).

---

## 2. The shape of Stage 1

**One sentence:** *the player builds a company that sells calm, and finds out his family is the cheapest currency he has.*

Four acts. Act 1 is already in the game.

| Act | Title | What it's about | Ends with |
|---|---|---|---|
| 1 | **Hired Help** | Office, hires, first two clients, the official product | "It'll be official" (done) |
| 2 | **Hospitality** | The product doesn't sell by itself. The Veil. The first deals with a price on them. | The gym dinner: the first time he can offer Mom instead of paying |
| 3 | **Favors** | The prices go up. Boss, investor, the supplier's name. The first cracks: Darius, Ethan, Mom noticing. | Mom finds out the device does more than relax her, and decides she doesn't care |
| 4 | **The Price** | Everything is cashed in at once. | One night: the supplier, and the heist |

**Three ideas hold it together** (all in section 3):
1. **The family option.** Every deal has a plain price, and the player can put Mom or Sister on the table instead. Early it's a temptation. Late it's the only price he can pay.
2. **The device becomes scaffolding.** At the start of Stage 1 he needs it for every step. By the end he doesn't. That's why Ethan stealing everything hurts the company but not the family.
3. **Ethan's motive is personal.** He leaves because of what the player did to *him*, not only because of what he found out.

**End state of Stage 1:**
- Mom and Sister are fully his in private and obey without the device.
- If the player took the family option, each has been offered at levels 1 and 2 (see 3.1), and the last night is the first time he hands them over for real. If he refused every time, he's paid for it in money and lost deals, and the company is much weaker going into Stage 2.
- If the last night happened, Mom and Sister now know about each other (see 3.1).
- Ethan has taken every device, every backup and the vent unit.
- The player keeps only the original portable Valenx, because he took it with him that night.
- The company is under investigation, with a rival (Ethan) already in the press.

---

## 3. The ideas

### 3.1 The family option

**The rule for Stage 1:** nobody asks for Mom or Sister. In a business setting nobody would. The player *offers* them, as an alternative to a price. Every deal has a **plain price**: money, his own time, a worse contract, a delay. The family option is what he can put on the table instead.

**Exceptions** are asks that fit the business and aren't demanding. These may come from the other side:
- The Manager's new uniform and closing shifts for Sister. It's her job, and he frames it as "the brand".
- The Landlord's weekly "help". That's the old deal from Stage 0.
- The Prof collecting what the player himself promised in Stage 0 (Sister "dressing memorably" for the project).

**The squeeze.** The plain prices rise over the stage. The family option is never strictly required, but it goes from a tempting shortcut to the only price he can realistically pay.

| Deal | Act | Plain price | Family option | What it gets him |
|---|---|---|---|---|
| Gym dinner (Rick) | 2 | He goes himself and gives a 20% discount. Affordable. | Mom comes along "as the consultant" (level 2) | The full contract |
| Investor (Whitfield) | 3 | A broker's fee (~$15,000) or a two-week delay on the retail pitch | Sister hosts the rooftop evening (level 1 to 2) | The retail chain introduction, free |
| Boss: The Arrangement | 3 | Weekly support hours at his rate (~$2,500 a week), and he keeps the clip | Mom on Thursdays, after hours (level 2) | Contacts, the supplier's name, maybe the clip |
| Supplier (Calloway) | 4 | $20,000 cash up front. By design it's more than the account holds at that point. | Mom and Sister at the club (level 3, doorway only) | The compounds, and his access |
| Landlord sells the building | end, into Stage 2 | Buy the building. Absurd. | The Stage 2 question | The building |

All numbers are placeholders. Tune them against the real finances when the scenes are written. The point is the curve.

**How it's offered.** As a choice in the scene, or as an answer option on the mail (`answerOptions` already exists: "I'll come myself" / "Pay the fee" / "My consultant will join you"). The family option is only shown once she's ready. Until then it's visible but locked, with the reason ("She isn't ready for that"), the same way locked quests show their requirements.

**Levels, as vocabulary for the gates:**

| Level | Name | What it means |
|---|---|---|
| 0 | **Charm** | Dress code, coffee, small talk (done: Sister's rounds, Mom's pencil skirt) |
| 1 | **Warm-up** | Flirting, a hand on the arm, a longer hug, an outfit picked for a client |
| 2 | **Entertain** | Dinners, drinks, touching, being watched and enjoying it. Stops short of sex. |
| 3 | **Handed over** | Sex with someone he picked. **Only the last night of Stage 1, as a doorway scene.** |

Each level checks her corruption (`setup.corruptionTotal`) and **exhibition**. Exhibition is the stat that's in her stats and unused today: how comfortable she is being seen. It grows from the favors themselves and from scenes.

**Her side:**
- **A cost.** If it went further than she was ready for, Resistance rises and her feelings toward the player drop (3.6). The next scene with her is cold or tearful.
- **Jealousy.** When one is chosen, the other notices. Neither knows what the choosing means yet.
- **He's not always cold about it.** The first time Mom is touched by someone who isn't him, he feels something. Possession, not guilt. He calls it "an investment" and moves on. This matters in Stage 2, where sharing gets harder.
- **The record.** Every deal she took part in goes into her Progression log (`<<ProfileLog>>`). No ledger screen.

**The Stage 2 turn:** in Stage 1 he offers. By Stage 2 the clients have seen what he's willing to do and start asking on their own. That's where a list of requests would make sense, if you ever want one.

### 3.2 The device is scaffolding

The mechanic to show over Stage 1:
- **Start:** the device is on for every step ("turn the dial, she says yes").
- **Middle:** scenes where it's off and she still says yes. (*No stimulus* was the first one. Make it a recurring beat, not a one-off.)
- **End:** he checks the device at the door, finds it's off, and realizes he hasn't turned it on for her in weeks.

That makes the end of the stage land. Ethan steals the technology, but the player's real work is already finished.

**The Anchor (renaming "Hammer" and limiting it).** Your notes have a device that "forces obedience for minutes". That breaks every gradual arc. I'd keep it but make it small and expensive:
- A handheld, built by the player and Brian (Brian never asks what it's for). Ethan doesn't write its code.
- It plants **one belief**, not obedience. Nothing else.
- Huge charge cost. A big Resistance spike. A visible side effect (nosebleed, dizziness, déjà vu).
- **Two uses in all of Stage 1:** Mom at the Calendar scene (section 5) and, if he picks it, the Boss (section 7).
- Each use leaves a giant spike in the device logs. That's exactly what Ethan finds later.

Merge V2.0 into the Catalyst, as the old feedback suggested. Four devices (Official, Veil, Catalyst, Anchor) plus the original Valenx.

### 3.3 Ethan: a better betrayal

The current plan (he finds spikes, finds the old backup, tries the full code, steals everything) works as a *plot*. It needs a stronger *reason*.

**The motive, in three layers:**
1. **The friendship might be fake.** The vent unit has been running at Ethan the whole time. His "best boss I've ever had" speech, his warm feelings for the player, even taking the job could all be partly manufactured. When he tries the full-strength code on himself, he recognizes the feeling. He's felt it every day at the office. That's the real hit.
2. **He's the one who was cut out.** Ethan wrote most of the original code. In the old startup he was cut out of equity, and he said "never again". The player promised "you'll get your piece" and never did anything about it.
3. **He sees what the player does to the family.** He's seen the massage ("is there a waitlist for that?"), the way Sister has no friends of her own, the way Mom says she's "never been happier". He asks Mom privately if she's okay. She smiles and says she's happier than she's been in years. That answer scares him more than anything in the logs.

**Why he steals instead of just quitting:** he thinks someone else will do this if he doesn't, and *he'd do it ethically*. He starts a rival startup with a "licensed, safe" version, and the anonymous tip makes the player the cautionary tale and Ethan the clean alternative.

**Careful with this:** three sympathetic layers can make Ethan the good guy of the story. If you want an antagonist the player wants to beat in Stage 2, use layer 1 and 2 and keep layer 3 light, or let his "ethical" startup turn out to be less clean than his press.

**The cruel detail:** the night of the Veil tuning, the player secretly turns the vent down to Off before Ethan arrives. He wants to know if Ethan still laughs at his jokes without the device. He does. That's the one night the friendship was real, and Ethan can't know it, because the logs say the vent was on for the weeks before and after.

**The equity choice:** at the profit party, Ethan jokes about "my piece". The player can give him a token 2%, or stall. Either way he leaves. If he got the 2%, Ethan says "you gave me two percent of something I'm not sure I was ever allowed to say no to."

**Foreshadowing, for players who pay attention:**
- CCTV clips of Ethan alone in the test corner at night.
- Sister's end-of-day gossip mentions him staying late (6.3).
- Darius mentions "someone pulled the raw logs at 2 a.m." and the login is *Darius's* (Ethan borrowed it). The player suspects Darius and confronts him. This is a scene where the player gets it wrong (4.10).
- The Anchor spike (3.2).

**What Ethan takes:** every Official unit, every Veil and Catalyst unit, the Anchor, the backups, the servers, *and the vent unit*. The original portable Valenx stays because the player had it with him.

**Brian's small win (optional):** Brian labels everything and never throws anything away. He still has the schematics, the calibration jig and the unit he built for the Boss. "Uh. I kept the, the spare." It gives Stage 2 a starting point.

### 3.4 A toolbox of scene formats

Not every scene should be "the player talks to her in a room". Formats to mix:

| Format | What it is | Used for |
|---|---|---|
| **POV swap** | The player sees the CCTV clip. The arrow opens the full scene from her point of view. | Office tasks, Mom at the Boss's office, anything on camera |
| **Report** | At the end of the day she tells him what happened, in her own words. He picks what he wants to hear in full. | Everything off camera: the gym dinner, the rooftop, the diner |
| **Public risk** | A scene where someone could see | Gym, rooftop, elevator, the office with the staff in |
| **Comedy** | A real joke scene, no sex, to break the rhythm | Mom learning to flirt, Sister's office gossip |
| **Reversal** | The player is read, refused or beaten | Darius, Ethan, the Boss, Mom at the Calendar |
| **The ask** | An NPC asks *her* something, and she asks the player for permission | Darius asking Sister out |
| **The silence** | No dialogue, only what he notices | The last car ride |

**A rule of thumb for the next batch:** after any two scenes of the same format, the third has to be different.

### 3.5 Seeing what he wasn't there for: POV swap and the end-of-day report

The player doesn't need to witness everything. He needs a way to *find out* when he wants to. Two doors lead to the same scenes.

**The POV passage.** Any task, event or deal the player isn't part of can have a passage written from **her point of view**: first person, present tense, her voice (Mom anxious and talking herself into things, Sister joking to cover nerves). It's tagged and visually marked (her portrait and name in a header), so it's never confused with his narration. When this is built, CLAUDE.md's voice rule needs a line for the exception.

**Door 1: the CCTV arrow.** Activities already have an optional `cctvPassage`. When the player watches her on the CCTV and the activity has one, the arrow opens the POV passage. For the office, and anything else on camera.

**Door 2: the end-of-day report.** When her workday is over, the player can ask her how it went.
- **Where:** an interaction card on `NPC Interaction`, social group, "How was your day?". Available from the evening on, when she's home and something happened today. No CMD panel.
- **What happens:** she sums the day up in a few lines, one per thing that happened, in her voice. The player can pick any of them to hear in full. That plays the POV passage (or a report version of it, when the scene happened off camera).
- **Places without cameras** (the gym dinner, the rooftop, the club) only have this door.
- **For deals:** the full version ends with her question, "Was that right?", and his answer (two options) moves her feelings toward him (3.6). This is the beat that matters most: not the information, but her waiting for his yes.
- Listening is worth a little Relation. She likes being asked.
- **If he doesn't ask,** nothing breaks. The day's log is cleared overnight and the scene is simply missed.

**Data sketch:**
- `$mom.dayLog = [{ kind: "task" | "event" | "deal", id, day }]`. Tasks add an entry when they complete (`checkTaskProgression`). Events and deals add one with a widget, e.g. `<<LogDay $mom "deal_gym_dinner">>`. The Daily Update clears it.
- The short line and the passage come from the source: a task gets `report: { line, passage }`, other entries come from a constant list (`setup.dayReports`).

**The format is introduced harmlessly.** Sister's end-of-day gossip about the staff (6.3) is the first use, so the report is a familiar, funny habit by the time it carries the first deal.

### 3.6 Feelings

How she feels about a specific person, anyone with a story variable, including the player. It's a cheap way to make the same scene play differently per person.

- **Data:** `$mom.feelings = { boss: -2, ethan: 1, player: 0 }`. Keys are sysNames, so renaming doesn't matter.
- **Setting it:** one line in a scene. `<<Feel $mom "boss" -2>>` after he gropes her at the Handover.
- **Two speeds:** a **mood** part that fades one step a day toward a **floor**, and a `"lasting"` flag that moves the floor itself for big moments (`<<Feel $mom "boss" -1 "lasting">>`). What the Boss did stays.
- **Reading it:** `setup.feels("mom", "boss")` returns the number, `setup.feelsLabel(...)` a word ("can't stand him", "wary", "fond", "drawn to").
- **Where it pays off:**
  - Task CCTV texts and POV passages: Mom's support visits are stiff and polite, or easy and laughing.
  - Sister's coffee rounds: she stays longer at Darius's desk if she likes him.
  - The end-of-day report: how she talks about someone.
  - Stage 2 scenes with the Landlord, Boss, Manager and Prof: disgust, resignation, or something she won't admit she enjoys. Very different scenes from the same passage, for a few lines each.
  - Toward the player: mostly Stage 1. A deal that went too far, a cruel choice, a missed task. Later the obedience takes over.
- **It never blocks anything.** It only colors. Variants are optional, so you only write one where a scene has a natural spot for it.

### 3.7 Smaller mechanics

- **Wardrobe orders → Stage 2.** Daily outfit orders only make sense once they obey, which is the end of Stage 1. In Stage 1 there are only single orders written into scenes (the Briefing outfit, the diner uniform, what she wears on the last night). Sister asking him to pick her clothes (6.8) is the hook.
- **Exhibition** gets its job: the second gate for the family option (3.1).
- **Device ownership reset at the end.** Set every device to `owned: false` except the original Valenx after the heist, so Stage 2 can start with a rebuild.

---

## 4. Main quest

Keeps your order of beats (Veil, late night with Ethan, the marketing firm, the gym, morale, Anchor, party, Catalyst, Ethan, pitch, deal, heist). I merge a few and add friction. All ids and titles are suggestions.

### 4.1 Crickets
*The official product goes online. Nothing happens.*
- A week of montage via the mail panel and the dashboard: zero orders. A spam mail, a mail from the guy who sent only a photo of his car (callback), and one from Linda from HR (Mom's contact), who wants *one* unit for her department.
- Darius: "They love the demo. They don't trust the price. Or the box."
- The obstacle: nobody buys a calming box for an office they've never sat in. They need to feel it in a *room*. This is why the Veil is needed.
- Mode: **Comedy**, then a short **Reversal** (the player's plan didn't work).

### 4.2 The Veil
*Team meeting. The room-wide version.*
- He pitches it. Brian: antennas and an "array". Ethan: loves it. Darius: wants distance-vs-effect data and asks for the raw logs. The player refuses and gives him cleaned numbers. Darius writes it down.
- Opens the in-house project for `valenxVeil`.
- This replaces the "make it look like a router" scene. Do the router redesign once, with the gym (4.5).

### 4.3 The Late Night
*Ethan and the player finalize the field strength. Three hours.*
- The warm scene: pizza, bad jokes, "remember the headset". Ethan tells the story of the old startup that cut him out. The player says "you'll get your piece". Seed the equity.
- Before Ethan comes in, the player secretly turns the vent to Off (3.3). Ethan laughs anyway. Nobody mentions it.
- At the end the Veil switches on in the empty office and the player feels it settle over him. He smiles in the dark and understands how big this is.
- Mode: **Silence** at the end.

### 4.4 The First Real Sale
*The marketing firm.*
- A small local firm (owner: Dana Pruitt, placeholder). A clean sale, no favors. The Veil in a conference room does the job.
- Text to Ethan ("We did it. Drinks on me"), the bar, a good night. Ethan says "Don't tell me what the dial does, boss. I like not knowing." He doesn't mean it.
- **Plant:** Dana's firm is a PR/marketing company. Later they handle Ethan's launch press (4.13). Keep a flag, `pressClient`.

### 4.5 The Gym
*The gym chain wants the device and a dinner with "the company" before they sign.*
- The player and Ethan redo the Veil to look like an expensive router. They argue about colors like old friends.
- The owner (Rick, placeholder) wants to haggle over dinner. He's met Mom once at the office and keeps mentioning "your consultant", but he doesn't ask.
- **The first family option** (3.1):
  - **Go himself.** A stiff dinner, Rick haggles, the player gives a 20% discount. Fine, and a little humiliating.
  - **Offer Mom.** "My consultant will join you." Plays Mom's 5.7. Full contract.
- Either way the contract is signed and the company stops being fragile. Gate for the offer: Mom's corruption and exhibition, or the option shows as locked.

### 4.6 Morale
*The workload is high, the morale is low.*
- He tells Mom and Sister to dress nicer and be friendlier with the staff. They do the rounds (the tasks exist).
- **Darius pushes back.** Not morally, analytically: "Productivity peaks twenty minutes after your mother walks through the room. I'd like to know why." He's the first to connect the dots. The player can bring him in with a half-truth ("it's a nudge, it's the Veil, it's in the brochure") or shut him out.
  - **Brought in:** Darius becomes an ally and gets a stake. Stage 2 ally.
  - **Shut out:** he stays suspicious, and the later log pull looks guilty (4.10).
- Also here: **Sister and Darius** (6.1).

### 4.7 The Diner Incident
*The Veil's first accident* (from the diner line, 7.3).
- A customer turns aggressive over a sold-out dish. Sister calms him down. It happened because the Veil sharpened a low-dopamine, high-testosterone customer's wants. The player hears about it in her end-of-day report.
- This is the player's first lesson that chemistry matters. He starts reading. It sets up the supplier plot (the Boss's pills, 7.2) without a sudden "drugs" scene at the end.

### 4.8 The Anchor
*He wants a tool for hard negotiations.*
- He builds it with Brian only. Ethan notices the part orders and says nothing.
- First use: Mom at the Calendar (5.9). A second optional use: the Boss (7.2).
- He feels the power. He texts Ethan and hints at what the device can *really* do. Ethan's reply is a joke. He's already seen the spikes.

### 4.9 The Profit Party
*First month in the black.*
- Pizza and drinks. Announces Catalyst (the V2 plan).
- Drunk Ethan gives the "best boss I've ever had" speech and jokes about "my piece" (the equity choice, 3.3).
- The investor (Whitfield) is mentioned for the first time: someone Dana knows, who could open the door to a national retail chain.
- A small crack: Brian asks, uh, what the Catalyst is *for*. The player gives him the Veil version of the answer.

### 4.10 The Crack
*Ethan tests the old code.*
- Weekend. "Stability checks." Ethan runs the full-strength code on himself. Ten minutes. When it wears off, he looks at the player with something unreadable. The player pretends not to notice.
- Monday: Ethan is normal. The player feels the first small crack and ignores it.
- **The red herring:** the access log shows the raw-data pull from Darius's login. The player confronts Darius. He's wrong, and Darius is hurt and polite about it. If Darius was brought in at 4.6, he forgives faster, and he's the one who later notices the footage.

### 4.11 The Retail Pitch
*The biggest pitch yet: a national retail chain.*
- **Getting the introduction** (3.1, second family option):
  - **Pay the broker** (~$15,000) or wait two weeks.
  - **Offer Sister** as the hostess of Whitfield's rooftop evening. Plays 6.7. The introduction is free.
- The player asks Ethan to set up the demo equipment the night before and gives him master access. A beat where he *almost* checks the footage and doesn't. Silence. A branch flag (`trustedEthan`) for a later line.

### 4.12 The Night Shift
*The supplier deal and the heist, the same night.*
- The supplier (Calloway, placeholder, named by the Boss in 7.2) has what the player's research says he needs. His price: **$20,000 up front, or an evening** with the player's "hostesses". By design, the account can't cover the money at this point. (Your notes had the same "or $20k".)
- **The last family option:**
  - **Pay.** He empties the account, takes a loan, or cancels a project to cover it. He goes alone. The company limps into Stage 2.
  - **Offer them.** Mom and Sister go (5.11 and 6.9). It ends at the club door. The player waits outside.
- At 11:40 p.m. Ethan calls. A choice: answer or let it ring. If he answers, Ethan says "Where are you? I need to talk to you. Come to the office." The player says "Tomorrow." If he doesn't, there's a voicemail he doesn't listen to until morning.
- Mode: **Silence**. If they went: the car, two people in the back seat who now know about each other.

### 4.13 The Morning After
*End of Stage 1.*
- Empty desk. Wiped servers. The resignation mail: short and cold.
- CCTV: Ethan leaves at 3:17 a.m. with two big boxes and a laptop bag. He stops in the doorway and looks at the vent.
- The player realizes the vent unit is also gone. Inventory: everything but the portable Valenx, which was in his coat that night.
- Brian: "Uh. I kept the spare." (optional)
- A call from the authorities: an anonymous tip about unlicensed influence technology. The company is under investigation.
- He hires a lawyer. The first thing she asks for is proof that this is research. He thinks of the Prof's pilot study (7.4).
- Last image: Dana's firm posts a glowing piece about a new startup. Ethan's. The player realizes who launched them.
- Final line: he's lost the friend and the company's tools. He still has his family, and they're exactly where he wants them.

---

## 5. Mom's line

**Where she is:** stage 1 ("Dutiful"). She gives handjobs "only when it gets bad" and the rule is hers. She has been groped by the Boss as "part of the job". She believes the white box is the product and the sessions are "data".

**Her lever:** duty, then pride. She wants to be needed. The new engine is that she turns out to be *very good at it*, and she starts to enjoy that.

**Corruption stages** (names are yours to change):

| Stage | Name | Milestone |
|---|---|---|
| 0 | Reserved | (done) |
| 1 | Dutiful | The Briefing (done) |
| 2 | Willing | The Catalyst night (5.8) |
| 3 | Complicit | The Calendar (5.9) |

### 5.1 The Booze Night (your beat, with a twist)
- Living room, wine, night. She talks about the Dad and how long it's been since someone *chose* her.
- No device. Or one dial, barely. The player doesn't do anything. He listens, and makes her wait. Her lust builds (use your "passive lust" mechanic) and she goes to bed having *asked* for nothing.
- Unlocks: her masturbating in more places (micro events), and the "catch her" scene.
- Mode: a quiet one. This is the breather.

### 5.2 Caught
- He walks in on her (meeting room, when she thinks she's alone) and demands. She does it.
- **Twist:** Brian nearly walks in. A near miss with a joke afterward ("He walks into doors around you, honey"). Public risk, and it sets up Brian's flustered reactions to her.

### 5.3 Flirt Duty (a Comedy)
- He gives her the task of making the staff feel good. She says she hasn't flirted since college. A scene where he *coaches* her. She's terrible at first, then good, then a little scary.
- The staff: Ethan jokes, Darius pretends not to be flattered, Brian walks into the door.
- **The new thing:** she likes being good at it. Her tell is a small, proud smile she tries to hide.
- The task's CCTV clip gets a POV passage (3.5): her side of the rounds, and what she thinks of each of them (sets her first feelings, 3.6).

### 5.4 Not Enough (your beat)
- He tells her handjobs aren't enough. She says no. He scoffs and sends her away.

### 5.5 The Silence (your week, with a tweak)
- A week of nothing. Passive guilt through the device at home (he sets it before the week starts).
- **Tweak:** make the silence visible. Interactions with her are locked and she tries to make it up in small ways (breakfast, a note, his favorite lasagna). The player ignores all of it. He has to *stay* cold for a week, which is a real choice in a game where he can usually cash in on a smile.

### 5.6 The Crawl (your beat)
- Friday, the office is empty. She apologizes. He's rude. She shows him what she put on and crawls to him. First blowjob, and he insults her while she does it.
- At the end he demands a morning blowjob with the coffee. She agrees.
- Unlocks: the morning routine, and the first time at home she's ordered around.
- **Add:** next morning, she thanks him for letting her "make it up". This is the first time she says the word *thank* about it.

### 5.7 The Gym Dinner (only if he offers her, 4.5)
- Before she goes, he tells her how far to let it go. That's the choice:
  - **"Let him."** Rick's hand stays on her knee. Bigger goodwill, higher Resistance, her feelings toward the player drop a little.
  - **"Keep it light."** Same contract, she's at ease, Rick is a little disappointed.
- The evening itself is told through the **report** (3.5). She comes home. "He put his hand on my knee. I did what you said. Was that right?" She wants a yes. His answer sets her feelings toward him, and toward Rick.
- This is the introduction to being used by others, and the first time her approval is *his*.
- Optional possessive flicker (3.1).

### 5.8 The Catalyst Night (milestone, stage 2: Willing)
- The Catalyst amplifies what's already there. In Mom, that's not lust. It's the need to be wanted.
- He turns it on and tells her the truth in a way she can't refuse: she's been good for weeks. She's *wanted*. (If she went to the gym dinner, that's where he starts.)
- Their first full sex scene. It's the point where "I'm helping" stops being her cover story.
- Aftermath: she doesn't make a rule this time. That's what he notices.

### 5.9 The Calendar (milestone, stage 3: Complicit)
*The biggest Mom scene of Stage 1.*
- She keeps the shared calendar. She's a project manager. She's noticed that "bad days" line up with the times the vent profile changes, and with the sessions.
- She doesn't confront him in a rage. She puts the calendar on his desk, with the pattern circled, and asks: "Is it the box?"
- **The choice:**
  - **Tell her the truth** (a part of it, not the sabotage). She goes quiet, says she needs to think. Then she says the line from the Night Visit, in her own voice: "I can't tell how much of this is me and how much is the box. And I think... I think I've decided I don't care."
  - **Use the Anchor.** He plants one belief: "This is your choice, and you love it." Cleaner, colder, and the logs go wild. Ethan sees them (3.3).
- After it, the device is off for her and she still does everything. A "free use" interaction opens: **"Whenever."** He tests it that same night: she meets him in the hallway, no box, and says "Whatever you need."
- Mode: **Reversal** (she turns the table), then **Silence**.

### 5.10 After Hours (only if he offers her to the Boss, 7.2)
- She asks the player what to do. He says it's her call. She looks at him the way she does when she's waiting for permission. He says "Go."
- The scene is the walk to the car and what she says on the way. It ends at the door of the Boss's office. What happened inside she tells him in the report, as much as she can say out loud. Stage 2 starts inside.

### 5.11 The Last Night (only if he offers them to the supplier, 4.12)
- She wears what he picked for the night. She tells him she's ready. He tells her to look after Sister. He doesn't say why.
- In the back seat she sees Sister. See 6.9.

---

## 6. Sister's line

**Where she is:** stage 0, "Conflicted". She has kissed him and half remembers the night of the party as dreams. She has a crush on Darius that she hasn't said out loud. She knows only that she's "really happy" near him. She doesn't know about the camera or the photos.

**Her lever:** guilt and devotion. She wants to be *good*, and he's the one who defines what good is.

**The fix for the "second confession":** she already confessed and kissed him in Stage 0, so Stage 1 isn't "do I have feelings". It's "what are we now, and who decides". She asks, and he doesn't answer. That's the pull.

| Stage | Name | Milestone |
|---|---|---|
| 0 | Conflicted | (done) |
| 1 | Yearning | The photos (6.2) |
| 2 | Devoted | The "I love you" (6.6) |
| 3 | Mine | The submission (6.8) |

### 6.1 The Ask (a Darius scene)
- Darius asks Sister to coffee. She tells the player the same evening, in his hoodie, in the office, because she tells him everything.
- She asks: "Do you want me to?" She means *is it okay with you*. She's handed him control of her love life and doesn't notice.
- **The choice:**
  - **Allow it.** She goes. She tells him about it in the end-of-day report, and he gets to listen and doesn't like how much. Darius is now nearer to the family, which is dangerous.
  - **Block it** (gently, with the device or without). She's relieved and guilty. Darius notices she's different around him.
- Either way the scene shows how far she's gone without any sex. Her feelings toward Darius are set here.

### 6.2 Souvenirs (milestone, stage 1: Yearning)
- A week after the previous beat he shows her the photos from the night she doesn't remember.
- **Note on Party Animal:** this works with whatever that scene ends up being (TODO P3 says you want to rewrite it). The beat only needs: she has a gap in her memory and he has proof.
- He doesn't threaten her. He says they're "special memories".
- She feels sick, and touched that he *kept* them. Then: "Can I... can I touch you? Like that night?" It's her first milestone and her first handjob in the game.
- Her question afterwards: "Can I do this more often?"
- Add the `photoTaken` flag check you already have.

### 6.3 Office Gossip (a Comedy, and the first reports)
- After her coffee rounds she starts dropping by his desk at the end of the day to tell him about the staff: Ethan's instant noodle count, Brian walking into the door again, Darius's cologne ("it's a lot, it's like being hugged by a department store").
- No sex. It's light and it's funny. Under the surface: she's become his informant and hasn't noticed.
- **Why it's here:** it introduces the end-of-day report (3.5) in its most harmless form. From now on "How was your day?" exists for her, and later it carries the heavy reports.
- **Plants:** "Ethan was still there when I left at nine. Again." (foreshadowing, 3.3)

### 6.4 Send Me Something
- He tells her he wants to see her. Not touch. See. She sends him a video at night. Then a second, braver one. She apologizes for each one before sending.
- Each video arrives as a notification at night and opens a short scene on his phone. No CMD.
- Then he walks in on her. He helps her finish. The scene ends with her being held, not with her coming.

### 6.5 What Are We
- The scene that replaces the second confession. The morning after she asks: "What are we?" She can't say "brother" anymore. She can't say anything else either.
- He tells her that love between them can be beautiful if they both want it. She's relieved and terrified, as in your notes.
- **Small detail:** she stops calling him by the sibling word in private (`$sister.callPlayerShort` stops appearing in intimate scenes).

### 6.6 The Catalyst, first night (milestone, stage 2: Devoted)
- Evening, the office, nobody around. He talks about the stress of the project. She offers a handjob "right here, in the open".
- The Catalyst: he tells her that to love means to give everything, and her love crosses a line. He asks for the proof. First blowjob. He has her say "I love you" while she does it.
- This is about her *love* being turned into obligation.

### 6.7 The Rooftop (only if he offers her as hostess, 4.11)
*The investor evening. Entertain, Public risk.*
- He asks her to host Whitfield's rooftop evening for the company. It's his idea. She says yes before he finishes the sentence.
- Whitfield takes to her. The player's in the room this time, so this one isn't a report.
- **The signal:** they've agreed a way to tell her yes or no without speaking. A touch on his ear. She watches for it across the room and looks away only when she gets it.
- A man's hand on her waist, and her looking across the room. The player has to *choose to give the nod*. That's the whole scene.
- Gets the introduction to the retail chain for free (4.11).

### 6.8 Everything (milestone, stage 3: Mine)
- Evening, the office, the Catalyst on. He tells her he might feel something like love too. But his love belongs to the company. He gives her a choice: submit completely, here, now, or leave.
- She's unsure, and gives in. Her manipulation is already too deep for her to do anything else.
- **Afterwards:** she hands over her phone, her passwords and her location. She asks him to choose her clothes each morning. He says "Soon." (The Stage 2 hook for wardrobe orders.)
- Her first full sex scene.

### 6.9 The Last Night (only if he offers them to the supplier, 4.12)
- She's the hostess, as at the rooftop. Her voice is quiet and she's very calm. She asks "Will you be there?" He says "Outside."
- In the car, she sees Mom. Both of them stop. They know. Mom takes her hand. Neither says a word. The player watches in the rearview mirror. (Or this is where Stage 2 opens. Your call, see section 10.)

---

## 7. The four side lines

Each one gets a line key (`$landlord.quests`, etc.), 4 to 6 quests, and a **currency**: what the player ends up with. Setup in Stage 1. The sexual part begins in Stage 2. In every line the family comes up because the player brings it up, except where noted.

### 7.1 Landlord (`landlord_`)
**Character:** greasy, gruff, 76. Wants *company*, and he'd rather watch than ask. He also owns the building, which turns out to matter.

**Currency:** property. In Stage 2 or 3, the player gets the building.

1. **The Helpers.** The placeholder CCTV clips become real, in three tiers. Stage 0: carrying boxes. Stage 1: the *high shelves* (stool, hem). Stage 2: "sit with me while the show's on", tea, a hand on a knee. The ladder is inside the task, so nothing new needs a menu. This is the old deal, so his asks are allowed here. Each tier gets a POV passage behind the CCTV arrow.
2. **What He Saw.** He has his own cameras in the building. A short scene: he mentions something he shouldn't know (what was said in the meeting room, or what Mom wore). He isn't blackmailing. He's *letting the player know he knows*.
3. **The Review.** The company has grown and the discount was for a broom-closet company. He raises the rent. The player can pay, or *suggest* the visits go up instead. He also sees the Veil and asks for one for his lobby ("my tenants never complain"). He's the first non-client to own one, and he has no idea what it does.
4. **The Rival Tenant.** Use the line in your mail: "a nice young lady starting up her own business... she's got incentives". She turns up on the stairs. She's a person, not a joke. She tells the player the landlord changes the terms when he gets bored. A quiet warning, and a seed for a Stage 2/3 character.
5. **The Sale.** Near the end of Stage 1 he mentions he's thinking about selling the building. The new owner won't honor any deal. The player asks what would change his mind. The landlord grumbles about long, quiet Saturdays, and doesn't say more. The player understands. Stage 2 starts with the player's offer.
- **Optional red herring:** when the authorities call, the player briefly suspects the landlord.
- **Code note:** `visitedLandlordThisWeek` is set and never read. Use it for the weekly rule (fine or discount reversal) in quest 3.

### 7.2 Boss (`boss_`)
**Character:** arrogant, bullying, 57. The surprise: he's the first person who resists the device, and he's holding the player's own leverage.

**Currency:** connections. And the supplier.

1. **The Support Review.** Mom reports back weekly (end-of-day report). The Boss shows the unit to his staff as his "secret weapon". The data shows he's the only person who doesn't respond to it. Mom notices a pill organizer on his desk and a drink in the afternoons. (This also feeds the chemistry idea, 4.7.)
2. **The Clip.** The Boss sends the player a still of the clip from Business Relations: "Thought you'd like to know it's safe with me. For now." The player realizes he sold Mom's clip for $5,000 and the Boss never deleted it. Now it's a leash on the player.
3. **The Arrangement.** The Boss wants more support hours, on site, at a rate that hurts, and he knows about the clip. He doesn't mention Mom. He doesn't have to.
   - **The player's options:**
     - **Pay.** ~$2,500 a week for the extra hours. The clip stays where it is. He still names the supplier later, for a fee.
     - **Offer Mom.** "My consultant can stay after hours on Thursdays. No charge." The Boss smiles. The price: his contacts, a seat at his club, and "a man I know" (the supplier). He deletes the clip in front of the player (maybe).
     - **Break him.** The Anchor. The Boss becomes his instrument. It costs a spike in the logs (Ethan sees), and the player loses the Boss as an independent resource. He gains a *pet*.
4. **After Hours.** Only if Mom was offered. Stage 1 ends at the door of his office (5.10). The Boss says "Next time, upstairs." That's the Stage 2 opener.
5. **The Introduction.** The Boss introduces the supplier, so he pays the player in access (or charges for it, on the Pay path).

### 7.3 Manager (`manager_`)
**Character:** tired, sarcastic, used to mock the player. He's not a villain. His arc is losing control of his own diner.

**Currency:** a cut of the diner, and a base (the diner as a field lab and later a hangout).

1. **Three Shifts.** The weekly rule from your notes, with the fine. The count shows in the quest's requirement text (`{{...}}` counter), no CMD panel.
2. **The Debrief.** After the analysis project, a meeting at the office. He's read the whole report and argued with every point. The player pitches the Veil for the diner. He says yes grudgingly. First client with a Veil in the field.
3. **The Incident.** After ten shifts, the aggressive customer (4.7). Sister calms him (nothing sexual), and tells the player in her report. The Manager notices: "Sales go up eighteen percent on her days." He starts to see her as the draw.
4. **The Uniform.** He proposes a new uniform for "the brand". This is one of the asks that may come from the other side: it's her job, and it isn't demanding. The player negotiates: seven shifts a week, plus a cut. The Manager grumbles but agrees. He is not leering, he's counting. That makes him more uncomfortable later, when he starts to.
5. **The Closing Keys.** End of Stage 1: he asks for Sister on closing shifts on weekends, and offers the player a share of those nights. A teaser for Stage 2, and the fair warning of what "closing" will mean.
- **Humiliation, not sex, in Stage 1:** the player gets small revenge. The Manager mops, takes orders, says "Mr. Consultant". The bitter-funny tone you already have.

### 7.4 Prof (`prof_`)
**Character:** irritable, pedantic, 61. Wants the chair, the fund, and what he was promised.

**Currency:** legitimacy. His pilot study is the legal shield when the investigation arrives.

1. **The Proposition** (done). The Veil in a lecture hall, as a "research project".
2. **The Face of the Project.** Sister is told. The player preps her. She asks if the Prof "looks". "A little." She tugs her hem. "Fine, but tights." A short, funny scene that makes the player's Stage 0 promise real. Her college tutoring task finally gets its scenes.
3. **The List.** On campus, with the students he picked. The study group takes off: "Calculus with Sophie" hits 60 people. The dean notices (a minor character, formidable).
4. **The Pilot.** The Veil is installed in the lecture hall at night with Brian. The Prof asks if it works on him. The player says it's calibrated away from the podium and adds a second emitter that is *not*. He's a long-term subject now.
5. **The Dean's Visit.** The numbers are great. She wants a paper. The Prof is now owed and indebted at once. In private he reminds the player of what he was promised in Stage 0, and what he thinks it should mean now: Sister, alone, after hours on Fridays. The player doesn't answer yet. Stage 2.
6. **The Letter (in the Morning After).** The lawyer asks for something that proves this is research. The Prof's pilot study and the dean's letter. "I bought a shield with a cheerleader's smile."

---

## 8. How it fits together (timeline)

Each row is a phase. The order is the point: the main line never moves twice in a row without a family beat, and no two adjacent beats use the same format.

| # | Main | Mom | Sister | Side lines |
|---|---|---|---|---|
| 1 | 4.1 Crickets | 5.1 Booze night | Coffee rounds (exists) | Manager: three shifts |
| 2 | 4.2 The Veil | 5.2 Caught | 6.1 The Ask (Darius) | Landlord: The Helpers |
| 3 | 4.3 Late night | 5.3 Flirt duty | 6.2 Souvenirs | |
| 4 | 4.4 First sale | 5.4 Not enough, 5.5 Silence | 6.3 Office gossip | Manager: Debrief; Prof: Face of the Project |
| 5 | | 5.6 The Crawl | 6.4 Send me something | Landlord: What He Saw |
| 6 | 4.5 The Gym (first family option) | 5.7 Gym dinner (if offered) | 6.5 What are we | Prof: The List |
| 7 | 4.6 Morale (Darius) | | | Manager: The Incident (4.7) |
| 8 | 4.8 Anchor | (breather) | (breather, rounds) | Boss: Support Review, The Clip |
| 9 | 4.9 Profit party (Catalyst project starts and finishes) | | | Manager: The Uniform; Landlord: The Review |
| 10 | 4.10 The Crack | 5.8 Catalyst night, Ethan asks Mom if she's okay | 6.6 Catalyst, first night | Prof: The Pilot; Boss: The Arrangement |
| 11 | 4.11 Retail pitch (second family option) | 5.9 The Calendar | 6.7 The Rooftop (if offered), 6.8 Everything | Landlord: Rival tenant; Prof: Dean's visit |
| 12 | 4.12 The Night Shift (last family option) | 5.10-5.11 (if offered) | 6.9 (if offered) | Boss: After Hours; Manager: Closing keys; Landlord: The Sale |
| 13 | 4.13 Morning After | | | Prof: The Letter |

---

## 9. End of Stage 1 and the start of Stage 2

**Left standing:**
- Mom and Sister, fully corrupted, device-free obedience. Offered to others as often as the player chose to.
- The original Valenx and the (optional) spare units Brian kept.
- The Prof's pilot study (legal shield).
- Darius and Brian. Darius is either a loyal ally or an offended one, depending on 4.6.
- The Boss's clip, now either deleted or still in his hands.
- If the player refused the family options: a lot less money, smaller contracts, maybe a loan.

**Lost:** Ethan, every device except one, the servers, the lead on the retail chain (the investor might still help).

**Stage 2 hooks:**
- The investigation (Suspicion starts here, as your design says).
- Ethan's rival launch and the press.
- The clients start *asking* for Mom and Sister on their own (3.1).
- Sexual content with the Landlord, Boss, Manager and Prof, in the order they've been building up: Boss (upstairs), Landlord (Saturdays), Prof (Fridays), Manager (closing). Feelings (3.6) decide how each of those scenes feels to her.
- Wardrobe orders (3.7).
- Mom and Sister's reaction to knowing about each other.
- A rebuild: no devices, a lawyer and a plan.
- The supplier, still waiting for his next evening.

---

## 10. Things I need you to decide

1. **How far do third parties go in Stage 1?** I wrote it so that clients touch, flirt and watch, and sex with others starts at the doorway on the last night. If you want to show the supplier night, the rest of the plan is unaffected.
2. **Do Mom and Sister learn about each other at the end of Stage 1?** I used the car as the moment. If you'd rather keep it for Stage 2, move the last scene to the club entrance and have them arrive separately.
3. **The Calendar.** Mom figuring out part of the truth and choosing to stay is the biggest change to her arc. It also ends the dramatic irony for her (she knows). If you'd rather she never finds out, the Anchor path works alone, and she just becomes complicit.
4. **The supplier and "compounds".** I kept your idea of a shady contact, but gave it a reason (the Boss's pills, the diner incident). If you'd rather avoid drugs, swap the supplier for the owner of a private club who pays in cash and access. The structure doesn't change.
5. **The Anchor.** Two uses, keeps the name change. Fine, or do you want it cut?
6. **Ethan's equity.** A token 2% as a player choice, or always stalled?
7. **Party Animal.** The photos beat (6.2) works with either version. But it should be decided before 6.2 is written.
8. **Two Catalyst nights.** Mom's 5.8 and Sister's 6.6 have the same shape (device on, a framing, a bigger act) and sit in the same phase. Worth changing one of them, for example Mom's comes out of the gym dinner report instead of a separate night.

**Resolved (2026-11-20):**
- Third-party use is the player's idea in Stage 1, never strictly required, increasingly hard to avoid (3.1).
- No new CMD panels.
- Scenes he isn't in: POV swap behind the CCTV arrow, and the end-of-day report (3.5). POV scenes are in her voice, first person.
- Dropped: the favor ledger, the diary (and the official/real journal), the earpiece.
- Wardrobe orders: Stage 2.
- Resentment became Feelings, toward any person (3.6).

**Small cleanups before writing:**
- The device form factor is inconsistent in Mom's Stage 1 scenes (laptop bag, phone sliders, desk drawer). Decide once: a portable Valenx controlled from his phone, and a fixed vent unit.
- Mom's *Morning Wakeup* still uses the Stage 0 outfit and em dashes.
- The `photoTaken` flag is set and never read.
- The choice at the end of *It Makes A Difference 3* (reply vs. leave it on read) sets no flag. Add one if later scenes should remember it.
- Ethan is called "Evan" in `notes_for_me.twee`. The code uses Ethan.
