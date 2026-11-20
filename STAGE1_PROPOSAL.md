# Rise to Ruin: Stage 1 proposal

A suggestion for how the rest of Stage 1 could go, for the main, mom and sister lines, plus the first setup for the landlord, boss, manager and prof lines. Nothing here is written into the game yet.

**Fixed points (yours):**
- Ethan's betrayal ends Stage 1.
- Mom and Sister get used by *other people*, on the player's orders, for his profit.
- Both private corruption arcs are finished by the end of Stage 1.
- The landlord, boss, manager and prof only get their setup in Stage 1. The sexual part starts in Stage 2.

**Names:** this is a design doc, so I use the default names and role labels (Mom, Sister, Landlord, Boss, Manager, Prof). Client names I invented (Rick, Dana, Calloway and so on) are placeholders. Sex is described at plot level only.

---

## 1. Why it feels same-y, and what to keep

I read Stage 0, all of Stage 1 so far, the tasks, the interactions and your notes. The writing is good. The problem is the *shape*.

1. **Every escalation runs the same loop.** A reasonable framing ("it's for the test", "it's for the company", "just this once"), then the device goes up, then a slightly bigger act, then she lies awake with a rule ("only when it gets bad"). The massage, the test sessions, the Briefing and the Night Visit all work this way. Your notes list another ten steps in the same rhythm (booze night, catch her, silent week, crawl, ...).
2. **It's always one room and one person.** Meeting room, bedroom, My Desk. Mom and Sister never meet the world as what the player is turning them into.
3. **The player never loses.** Nobody surprises him, nobody pushes back, nobody wants something he didn't plan. Even Darius only asks questions.
4. **The family and the business don't need each other.** The notes say "requirement: Mom's arc", but the story never shows what the company actually *gets* for it.
5. **Everyone else is inert.** The landlord, boss, manager and prof each have one scene and a promise ("there will be more"). Nothing happens to those promises.

**Keep:**
- The Stage 1 tone (`too_much_work`, `it_makes_a_difference`): warm on top, cold underneath.
- Mom's ladder up to *A Knock at Night*.
- The "tests" as a pretext. It's a great device. It just can't be the only one.
- Sister's internship diary.
- The Ethan betrayal, with a better motive (section 3.3).

---

## 2. The shape of Stage 1

**One sentence:** *the player builds a company that sells calm, and a second, secret business that sells his family.*

Four acts. Act 1 is already in the game.

| Act | Title | What it's about | Ends with |
|---|---|---|---|
| 1 | **Hired Help** | Office, hires, first two clients, the official product | "It'll be official" (done) |
| 2 | **Hospitality** | The product doesn't sell by itself. The Veil. Mom and Sister become the "client-facing" side. First clients touched. | The first dinner where Mom is *lent* to a client on the player's orders |
| 3 | **Favors** | Favors become currency. Boss, investor, gym. The first cracks: Darius, Ethan, Mom noticing. | Mom finds out the device does more than relax her, and decides she doesn't care |
| 4 | **The Price** | Everything is cashed in at once. | One night: the deal, and the heist |

**Three ideas hold it together** (all in section 3):
1. **The Hospitality Division.** The company's second product is the family. A visible ladder of what clients get, with a ledger of what the player gets back.
2. **The device becomes scaffolding.** At the start of Stage 1 he needs it for every step. By the end he doesn't. That's why Ethan stealing everything hurts the company but not the family.
3. **Ethan's motive is personal.** He leaves because of what the player did to *him*, not only because of what he found out.

**End state of Stage 1:**
- Mom and Sister are fully his in private and obey without the device.
- Each has been "lent" to clients at levels 1 and 2 (see 3.1). The last night is the first time he hands one over for real.
- Mom and Sister now know about each other (or the last scene is the moment they find out, see 3.1).
- Ethan has taken every device, every backup and the vent unit.
- The player keeps only the original portable Valenx, because he took it with him that night.
- The company is under investigation, with a rival (Ethan) already in the press.

---

## 3. The ideas

### 3.1 The Hospitality Division

The family is sold to clients on his command, in steps. Each step is a *level*. Everything the player "earns" from it has a clear type, so the favor always buys something specific.

| Level | Name | What it means | Where it first appears |
|---|---|---|---|
| 0 | **Charm** | Dress code, coffee, small talk | Done (Sister's rounds, Mom's pencil skirt) |
| 1 | **Warm-up** | Flirting, a hand on the arm, a longer hug, an outfit picked for a client | Mom: the flirt duty. Sister: investor evening |
| 2 | **Entertain** | Dinners, drinks, touching, being watched and enjoying it. Stops short of sex. | Mom: the gym dinner. Sister: the rooftop party. |
| 3 | **Handed over** | Sex with someone he picked, on his say-so | **Only the last night of Stage 1** (and only as a doorway, see below) |

Each client gives a different payment:

| Client | Gets | Pays with |
|---|---|---|
| Rick (gym chain) | Mom at level 2 | A big contract |
| Investor (Whitfield, placeholder) | Sister at level 1, later 2 | Funding and the introduction to the national retail chain |
| Boss | Mom at level 1-2 "after hours" | Introductions, connections, and the supplier |
| Supplier (Calloway, placeholder) | Both, level 3 | Cash and product |
| Landlord | Weekly "help" | Rent, building access, later property |
| Manager | Sister in a new uniform | A cut of the diner |
| Prof | "The more he was promised" | A research shield and college access |

**Rules that stop it from becoming a menu:**
- **Every level needs a gate.** Her corruption stage and the unused `exhibition` stat (use it here: how comfortable she is being seen) are the two checks. A client can ask for more than she's ready for. Then the player has to either walk the request back or push her. Each option costs something.
- **There's a cost on her side.** She does it, comes home and reports. Mom asks "Was that right?" Sister waits for a nod across the room. If it goes too far, Resistance spikes and the next scene with her is cold or tearful. That keeps the ladder from being a free reward.
- **They get jealous of each other.** When one is chosen for the good client, the other notices. Neither knows what the choosing means yet.
- **He's not always cold about it.** A clean, optional beat: the first time Mom is touched by someone who isn't him, he feels something. Possession, not guilt. He calls it "an investment" and moves on. This matters for Stage 2, where sharing gets harder.
- **Stage 1 stops at the door.** Level 3 only appears at the very end, as a "doorway scene": the car, the club entrance, the last instruction, the door closing. What happens inside belongs to Stage 2. If you'd rather show it, the plan still works. Your call.

**A mechanic that fits what you already have:** a **Client Favors** tab in the CMD with each client's interest in Mom and Sister, what he's offering, and the cost to her. You'd schedule it like a task, but with `withPlayer` or a remote variant (see 3.4).

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

The current plan (he finds spikes, finds the old backup, tries the full code, steals everything) works as a *plot*. It needs a stronger *reason*. Here's what I'd do.

**The motive, in three layers:**
1. **The friendship might be fake.** The vent unit has been running at Ethan the whole time. His "best boss I've ever had" speech, his warm feelings for the player, even taking the job could all be partly manufactured. When he tries the full-strength code on himself, he recognizes the feeling. He's felt it every day at the office. That's the real hit.
2. **He's the one who was cut out.** Ethan wrote most of the original code. In the old startup he was cut out of equity, and he said "never again". The player promised "you'll get your piece" and never did anything about it. By the end it sounds petty, which is why it's believable.
3. **He sees what the player does to the family.** He's seen the massage ("is there a waitlist for that?"), the way Sister has no friends of her own, the way Mom says she's "never been happier". He doesn't know the details but he knows it's wrong. He asks Mom privately if she's okay. She smiles and says she's happier than she's been in years. That answer scares him more than anything in the logs.

**Why he steals instead of just quitting:** he thinks someone else will do this if he doesn't, and *he'd do it ethically*. He starts a rival startup with a "licensed, safe" version, and the anonymous tip makes the player the cautionary tale and Ethan the clean alternative.

**The cruel detail (use it):** the night of the Veil tuning, the player secretly turns the vent down to Off before Ethan arrives. He wants to know if Ethan still laughs at his jokes without the device. He does. That's the one night the friendship was real, and Ethan can't know it, because the logs say the vent was on for the weeks before and after.

**The equity choice:** at the profit party, Ethan jokes about "my piece". The player can give him a token 2%, or stall. Either way he leaves. But the lines change: if he got the 2%, Ethan says "you gave me two percent of something I'm not sure I was ever allowed to say no to."

**Foreshadowing, for players who check:**
- CCTV clips of Ethan alone in the test corner at night. They're optional, and don't say anything.
- Darius mentions "someone pulled the raw logs at 2 a.m." and the login is *Darius's* (Ethan borrowed it). The player suspects Darius and confronts him. This is a scene where the player gets it wrong, and it costs him Darius's trust until the end (see 4.10).
- The Anchor spike (see 3.2).

**What Ethan takes:** every Official unit, every Veil and Catalyst unit, the Anchor, the backups, the servers, *and the vent unit*. That's how he knows the office has been under full-strength influence: he triangulated the spikes to the vent. The original portable Valenx stays because the player had it with him.

**Brian's small win (optional):** Ethan took the boards, but Brian labels everything and never throws anything away. He still has the schematics, the calibration jig and the unit he built for the Boss. "Uh. I kept the, the spare." It gives Stage 2 a starting point.

### 3.4 A toolbox of scene formats

Not every scene should be "the player talks to her in a room". Here are formats you can mix. I note where each fits in later sections.

| Format | What it is | Used for |
|---|---|---|
| **Remote** | The player isn't in the room. Earpiece, text thread or CCTV. He sees and hears, and chooses what to tell her. | Mom's gym dinner, Sister's investor party |
| **Report** | She comes home and tells him what happened, in her own words, and the player decides what it was worth | After every level 2 favor |
| **Reading** | He reads something she wrote: the real diary vs. the fake one for school | Sister's internship journal |
| **Public risk** | A scene where someone could see | Gym, rooftop, elevator, the office with the staff in |
| **Comedy** | A real joke scene, no sex, to break the rhythm | Mom learning to flirt, Brian and the dress code |
| **Reversal** | The player is read, refused or beaten | Darius, Ethan, the Boss, Mom at the Calendar |
| **The ask** | An NPC asks *her* something, and she asks the player for permission | Darius asking Sister out |
| **The silence** | No dialogue, only what he notices | The last car ride |

**A rule of thumb for the next batch:** after any two scenes of the same format, the third has to be different.

### 3.5 Smaller mechanics

- **Wardrobe orders.** A daily text (or the CMD) where he picks her outfit tier. It feeds `exhibition` and changes the media. Sister gets it first, Mom after the Calendar. This also makes the "dressing memorably" promise to the Prof real.
- **Favor ledger.** The tab described in 3.1.
- **Resentment.** After a hard favor, a short-lived stat (or flag) that colors the next interaction. Fades if he treats her well.
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
- Note: this replaces the "make it look like a router" scene. Do the router redesign once, with the gym (4.5).

### 4.3 The Late Night
*Ethan and the player finalize the field strength. Three hours.*
- The warm scene: pizza, bad jokes, "remember the headset". Ethan tells the story of the old startup that cut him out. The player says "you'll get your piece". Seed the equity.
- Before Ethan comes in, the player secretly turns the vent to Off (see 3.3). Ethan laughs anyway. Nobody mentions it.
- At the end the Veil switches on in the empty office and the player feels it settle over him. He smiles in the dark and understands how big this is.
- Mode: **Silence** at the end.

### 4.4 The First Real Sale
*The marketing firm.*
- A small local firm (owner: Dana Pruitt, placeholder). It's a clean sale, no favors. The Veil in a conference room does the job and he doesn't need to do anything else.
- Text to Ethan ("We did it. Drinks on me"), the bar, a good night. Ethan says "Don't tell me what the dial does, boss. I like not knowing." He doesn't mean it.
- **Plant:** Dana's firm is a PR/marketing company. Later they handle Ethan's launch press (see 4.13). Keep a flag, `pressClient`.

### 4.5 The Gym
*The gym chain wants the device and wants to meet "the team".*
- Gate: Mom's client entertainment (section 5.7).
- The player and Ethan redo the Veil to look like an expensive router. They argue about colors like old friends. (The real redesign, not a second one.)
- The Gym owner (Rick, placeholder) keeps asking for "your consultant" at the dinner. This sets up Mom's first lent evening.
- The contract is big enough that the company stops being fragile.

### 4.6 Morale
*The workload is high, the morale is low.*
- He tells Mom and Sister to dress nicer and be friendlier with the staff. They do the rounds (the tasks exist).
- **Darius pushes back.** Not morally, analytically: "Productivity peaks twenty minutes after your mother walks through the room. I'd like to know why." He's the first to connect the dots. The player can bring him in with a half-truth ("it's a nudge, it's the Veil, it's in the brochure") or shut him out.
  - **Brought in:** Darius becomes an ally and gets a stake. Stage 2 ally.
  - **Shut out:** he stays suspicious, and the later log pull looks guilty (4.10).
- Also here: **Sister and Darius** (see 6.1).

### 4.7 The Diner Incident
*The Veil's first accident* (from the diner line, section 7.3).
- A customer turns aggressive over a sold-out dish. Sister calms him down. It happened because the Veil sharpened a low-dopamine, high-testosterone customer's wants.
- This is the player's first lesson that chemistry matters. He starts reading. It sets up the supplier plot (the boss's pills, section 7.2) without a sudden "drugs" scene at the end.

### 4.8 The Anchor
*He wants a tool for hard negotiations.*
- He builds it with Brian only. Ethan notices the part orders and says nothing.
- First use: Mom at the Calendar (section 5.9). A second optional use: the Boss (7.2).
- He feels the power. He texts Ethan and hints at what the device can *really* do. Ethan's reply is a joke. He's already seen the spikes.

### 4.9 The Profit Party
*First month in the black.*
- Pizza and drinks. Announces Catalyst (the V2 plan).
- Drunk Ethan gives the "best boss I've ever had" speech and jokes about "my piece" (the equity choice, 3.3).
- A small crack: Brian asks, uh, what the Catalyst is *for*. The player gives him the Veil version of the answer.

### 4.10 The Crack
*Ethan tests the old code.*
- Weekend. "Stability checks." Ethan runs the full-strength code on himself. Ten minutes. When it wears off, he looks at the player with something unreadable. The player pretends not to notice.
- Monday: Ethan is normal. The player feels the first small crack and ignores it.
- **The red herring:** the access log shows the raw-data pull from Darius's login. The player confronts Darius. He's wrong, and Darius is hurt and polite about it. If Darius had been brought in at 4.6, he forgives faster, and he's the one who later notices the footage.

### 4.11 The Retail Pitch
*The biggest pitch yet: a national retail chain.*
- Introduced through the investor (Sister's party, 6.7). The player asks Ethan to set up the demo equipment the night before and gives him master access. A beat where he *almost* checks the footage and doesn't. Silence. A branch flag (`trustedEthan`) for a later line.

### 4.12 The Night Shift
*The supplier deal and the heist, the same night.*
- Both parts of the plan (Mom and Sister, section 5.10 and 6.9) end at the club. The player waits outside.
- At 11:40 p.m. Ethan calls. A choice: answer or let it ring. If he answers, Ethan says "Where are you? I need to talk to you. Come to the office." The player says "Tomorrow." If he doesn't, there's a voicemail he doesn't listen to until morning.
- Mode: **Silence**. The car, two people in the back seat who now know about each other.

### 4.13 The Morning After
*End of Stage 1.*
- Empty desk. Wiped servers. The resignation mail: short and cold.
- CCTV: Ethan leaves at 3:17 a.m. with two big boxes and a laptop bag. He stops in the doorway and looks at the vent.
- The player realizes the vent unit is also gone. Inventory: everything but the portable Valenx, which was in his coat at the club.
- Brian: "Uh. I kept the spare." (optional)
- A call from the authorities: an anonymous tip about unlicensed influence technology. The company is under investigation.
- He hires a lawyer. The first thing she asks for is proof that this is research. He thinks of the Prof's pilot study (section 7.4).
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

### 5.4 Not Enough (your beat)
- He tells her handjobs aren't enough. She says no. He scoffs and sends her away.

### 5.5 The Silence (your week, with a tweak)
- A week of nothing. Passive guilt through the device at home (he sets it before the week starts).
- **Tweak:** make the silence visible. Interactions with her are locked and she tries to make it up in small ways (breakfast, a note, his favorite lasagna). The player ignores all of it. The player has to *stay* cold for a week, which is a real choice in a game where he can usually cash in on a smile.

### 5.6 The Crawl (your beat)
- Friday, the office is empty. She apologizes. He's rude. She shows him what she put on and crawls to him. First blowjob, and he insults her while she does it.
- At the end he demands a morning blowjob with the coffee. She agrees.
- Unlocks: the morning routine, and the first time at home she's ordered around.
- **Add:** next morning, she thanks him for letting her "make it up". This is the first time she says the word *thank* about it.

### 5.7 Client Entertainment (the first lent evening)
- Gate: 15 sexual interactions (your number), or the stage 1 corruption bar plus a count.
- **The gym dinner (Remote).** Rick wants "your consultant" at dinner. The player is in the car outside, with an earpiece and a text thread. He tells her where to sit, when to laugh, when to let Rick's hand stay on her knee.
- **Choices in real time:** push (get the contract, raise Resistance) or pull back (a smaller contract, she's more at ease).
- **Report:** she comes home. "He put his hand on my knee. I did what you said. Was that right?" She wants a yes.
- This is the introduction to being used by others, as you asked, and the first time her approval is *his*.
- Optional possessive flicker (see 3.1).
- Unlocks the Gym contract in the main line.

### 5.8 The Catalyst Night (milestone, stage 2: Willing)
- The Catalyst amplifies what's already there. In Mom, that's not lust. It's the need to be wanted.
- He turns it on and tells her the truth in a way she can't refuse: she was good at tonight. She's been good for weeks. She's *wanted*.
- Their first full sex scene. It's the point where "I'm helping" stops being her cover story.
- Aftermath: she doesn't make a rule this time. That's what he notices.

### 5.9 The Calendar (milestone, stage 3: Complicit)
*The biggest Mom scene of Stage 1.*
- She keeps the shared calendar. She's a project manager. She's noticed that "bad days" line up with the times the vent profile changes, and with the sessions.
- She doesn't confront him in a rage. She puts the calendar on his desk, with the pattern circled, and asks: "Is it the box?"
- **The choice:**
  - **Tell her the truth** (a part of it, not the sabotage). She goes quiet, says she needs to think. Then she says the line from the Night Visit, in her own voice: "I can't tell how much of this is me and how much is the box. And I think... I think I've decided I don't care." The mirror of his line.
  - **Use the Anchor.** He plants one belief: "This is your choice, and you love it." Cleaner, colder, and the logs go wild. Ethan sees them (3.3). She stays complicit either way. The Anchor version is the cold path, and costs more.
- After it, the device is off for her and she still does everything. A "free use" interaction opens: **"Whenever."** He tests it that same night: she meets him in the hallway, no box, and says "Whatever you need."
- Mode: **Reversal** (she turns the table), then **Silence**.

### 5.10 After Hours (the Boss's setup)
- See section 7.2. By now Mom has told the Boss she'd come for the review. He asked for "after hours". She asked the player what to do. He said it's her call. She looked at him the way she does when she's waiting for permission. He said "Go."
- The scene is the walk to the car and what she says on the way. It ends at the door of the Boss's office. Stage 2 starts inside.

### 5.11 The Last Night (the supplier)
- She dresses in the outfit he picked (Wardrobe orders). She tells him she's ready. He tells her to look after Sister. He doesn't say why.
- In the club's back seat she sees Sister. See 6.9.

---

## 6. Sister's line

**Where she is:** stage 0, "Conflicted". She has kissed him and half remembers the night of the party as dreams. She has a crush on Darius that she hasn't said out loud. She's writing an internship journal and she knows only that she's "really happy" near him. She doesn't know about the camera or the photos.

**Her lever:** guilt and devotion. She wants to be *good*, and he's the one who defines what good is.

**The fix for the "second confession":** she already confessed and kissed him in Stage 0, so Stage 1 isn't "do I have feelings". It's "what are we now, and who decides". She asks, and he doesn't answer. That's the pull.

| Stage | Name | Milestone |
|---|---|---|
| 0 | Conflicted | (done) |
| 1 | Yearning | The photos (6.2) |
| 2 | Devoted | The "I love you" (6.6) |
| 3 | Mine | The submission (6.7) |

### 6.1 The Ask (a Darius scene)
- Darius asks Sister to coffee. She tells the player the same evening, in his hoodie, in the office, because she tells him everything.
- She asks: "Do you want me to?" She means *is it okay with you*. She's handed him control of her love life and doesn't notice.
- **The choice:**
  - **Allow it.** She goes. She reports back. The player gets to listen to it and doesn't like how much. Darius is now nearer to the family, which is dangerous.
  - **Block it** (gently, with the device or without). She's relieved and guilty. Darius notices she's different around him.
- Either way the scene shows how far she's gone without any sex.

### 6.2 Souvenirs (milestone, stage 1: Yearning)
- A week after the previous beat he shows her the photos from the night she doesn't remember.
- **Note on Party Animal:** this works with whatever that scene ends up being (TODO P3 says you want to rewrite it). The beat only needs: she has a gap in her memory and he has proof.
- He doesn't threaten her. He says they're "special memories".
- She feels sick, and touched that he *kept* them. Then: "Can I... can I touch you? Like that night?" It's her first milestone and her first handjob in the game.
- Her question afterwards: "Can I do this more often?"
- Add the `photoTaken` flag check you already have.

### 6.3 Two Diaries (the Reading format)
- Her internship journal needs to be handed in. The player co-writes a sanitized version with her: dry, professional, "fulfilling". They laugh about how well she lies (it's already in *Internship Overview Meetings 2*).
- Meanwhile she's keeping a **real** diary he can read in the CMD. Entries unlock as scenes happen. They show what she doesn't say to his face (the hoodie, the camera night, the photo night, what she thinks about Darius).
- Each real entry is a short, written scene. It's a different voice from every other scene in the game.
- **Risk:** her college advisor wants to read the journal for the evaluation. Brief scare. They hand in the fake, and she hears the advisor say "this is the best one I've read".

### 6.4 Send Me Something
- He tells her he wants to see her. Not touch. See. She sends him a video at night. Then a second, braver one. She apologizes for each one before sending.
- Mode: **Remote** (text, video). The player sees them in the CMD.
- Then he walks in on her. He helps her finish. The scene ends with her being held, not with her coming.

### 6.5 What Are We
- The scene that replaces the second confession. The morning after she asks: "What are we?" She can't say "brother" anymore. She can't say anything else either.
- He tells her that love between them can be beautiful if they both want it. She's relieved and terrified, as in your notes.
- **Small detail:** she stops calling him by the sibling word in private. Use the renaming variable (`$sister.callPlayerShort` stops appearing in intimate scenes).

### 6.6 The Catalyst, first night (milestone, stage 2: Devoted)
- Evening, the office, nobody around. He talks about the stress of the project. She offers a handjob "right here, in the open".
- The Catalyst: he tells her that to love means to give everything, and her love crosses a line. He asks for the proof. First blowjob. He has her say "I love you" while she does it.
- This is about her *love* being turned into obligation.

### 6.7 The Rooftop (Entertain, Public risk)
*The investor evening.*
- A client party on a rooftop bar. Sister is the hostess. The investor (Whitfield) takes to her. The player's in the room this time, not in a car.
- **The signal:** he's agreed a way to tell her yes or no without speaking. A touch on the ear. She watches for it across the room and looks away only when she gets it.
- A man's hand on her waist, and her looking across the room. The player has to *choose to give the nod*. That's the whole scene.
- Gets the introduction to the national retail chain (main line, 4.11).
- Mode: **Public risk**.

### 6.8 Everything (milestone, stage 3: Mine)
- Evening, the office, the Catalyst on. He tells her he might feel something like love too. But his love belongs to the company. He gives her a choice: submit completely, here, now, or leave.
- She's unsure, and gives in. Her manipulation is already too deep for her to do anything else.
- **Afterwards:** she hands over her phone, her passwords and her location. She asks him to choose her clothes each morning. This opens **Wardrobe orders** for her.
- Her first full sex scene.

### 6.9 The Last Night (the supplier)
- She's the hostess, as at the rooftop. Her voice is quiet and she's very calm. She asks "Will you be there?" He says "Outside."
- In the car, she sees Mom. Both of them stop. They know. Mom takes her hand. Neither says a word. The player watches in the rearview mirror. (Or this is where Stage 2 opens. Your call, see section 10.)

---

## 7. The four side lines

Each one gets a line key (`$landlord.quests`, etc.), 4 to 6 quests, and a **currency**: what the player ends up with. Setup in Stage 1. The sexual part begins in Stage 2.

### 7.1 Landlord (`landlord_`)
**Character:** greasy, gruff, 76. Wants *company*, and he'd rather watch than ask. He also owns the building, which turns out to matter.

**Currency:** property. In Stage 2 or 3, the player buys the building.

1. **The Helpers.** The placeholder CCTV clips become real, in three tiers. Stage 0: carrying boxes. Stage 1: the *high shelves* (stool, hem). Stage 2: "sit with me while the show's on", tea, a hand on a knee. The ladder is inside the task, so nothing new needs a menu.
2. **What He Saw.** He has his own cameras in the building. A short scene: he mentions something he shouldn't know (what was said in the meeting room, or what Mom wore). He isn't blackmailing. He's *letting the player know he knows*, and wants the visits to go up.
3. **The Review.** The company has grown and the discount was for a broom-closet company. He raises the rent or raises the visits. He sees the Veil and asks for one for his lobby ("my tenants never complain"). The player says yes. He's the first non-client to own one, and he has no idea what it does.
4. **The Rival Tenant.** Use the line in your mail: "a nice young lady starting up her own business... she's got incentives". She turns up on the stairs. She's a person, not a joke. She tells the player the landlord changes the terms when he gets bored. A quiet warning, and a seed for a Stage 2/3 character.
5. **The Ask.** Near the end of Stage 1 he asks outright: "Your mother. Alone. Saturday." The player doesn't answer yet. He says "What are you offering?" and the landlord, grumbling, mentions the building. Stage 2 starts with the answer.
- **Optional red herring:** when the authorities call, the player briefly suspects the landlord.
- **Code note:** `visitedLandlordThisWeek` is set and never read. Use it for the weekly rule (fine or discount reversal) in quest 3.

### 7.2 Boss (`boss_`)
**Character:** arrogant, bullying, 57. The surprise: he's the first person who resisted the device, and he's holding the player's own leverage.

**Currency:** connections. And the supplier.

1. **The Support Review.** Mom reports back weekly. The Boss shows the unit to his staff as his "secret weapon". The data shows he's the only person who doesn't respond to it. Mom notices a pill organizer on his desk and a drink in the afternoons. The player files it away. (This also feeds the chemistry idea, 4.7.)
2. **The Clip.** The Boss sends the player a still of the clip from Business Relations: "Thought you'd like to know it's safe with me. For now." The player realizes he sold Mom's clip for $5,000 and the Boss never deleted it. Now it's a leash on the player.
3. **The Arrangement.** The Boss wants more: Mom on Thursdays, after hours, "to go over the settings". He doesn't ask for sex. He doesn't have to.
   - **The player's options:**
     - **Sell it.** Mom goes, the price is the Boss's contacts: introductions, a place at his club, and "a man I know" (the supplier). The Boss deletes the clip in front of him (maybe).
     - **Break him.** The Anchor. The Boss becomes his instrument. It costs a spike in the logs (Ethan sees), and he loses the Boss as an independent resource. He gains a *pet*.
   - The **Sell it** path is the main one, because it's the introduction to being used by others you asked for.
4. **After Hours.** Mom goes. Stage 1 ends at the door of his office (5.10). The Boss says "Next time, upstairs." That's the Stage 2 opener.
5. **The Introduction.** The Boss introduces the supplier, so he pays the player in access.

### 7.3 Manager (`manager_`)
**Character:** tired, sarcastic, used to mock the player. He's not a villain. His arc is losing control of his own diner.

**Currency:** a cut of the diner, and a base (the diner as a field lab and later a hangout).

1. **Three Shifts.** The weekly rule from your notes, with the fine. Show a small checklist in the CMD.
2. **The Debrief.** After the analysis project, a meeting at the office. He's read the whole report and argued with every point. The player pitches the Veil for the diner. He says yes grudgingly. First client with a Veil in the field.
3. **The Incident.** After ten shifts, the aggressive customer (4.7). Sister calms him (nothing sexual). The Manager notices: "Sales go up eighteen percent on her days." He starts to see her as the draw.
4. **The Uniform.** He proposes a new uniform for "the brand". The player negotiates: seven shifts a week, plus a cut. The Manager grumbles but agrees. He is not leering, he's counting. That makes him more uncomfortable later, when he starts to.
5. **The Closing Keys.** End of Stage 1: he asks for Sister on closing shifts on weekends. He says he'll pay the player a share of those nights. A teaser for Stage 2, and the fair warning of what "closing" will mean.
- **Humiliation, not sex, in Stage 1:** the player gets small revenge. The Manager mops, takes orders, says "Mr. Consultant". The bitter-funny tone you already have.

### 7.4 Prof (`prof_`)
**Character:** irritable, pedantic, 61. Wants the chair, the fund, and what he was promised.

**Currency:** legitimacy. His pilot study is the legal shield when the investigation arrives.

1. **The Proposition** (done). The Veil in a lecture hall, as a "research project".
2. **The Face of the Project.** Sister is told. The player preps her. She asks if the Prof "looks". "A little." She tugs her hem. "Fine, but tights." A short, funny scene that makes the earlier promise real. Her college tutoring task finally gets its scenes.
3. **The List.** On campus, with the students he picked. The study group takes off: "Calculus with Sophie" hits 60 people. The dean notices (a minor character, formidable).
4. **The Pilot.** The Veil is installed in the lecture hall at night with Brian. The Prof asks if it works on him. The player says it's calibrated away from the podium and adds a second emitter that is *not*. He's a long-term subject now.
5. **The Dean's Visit.** The numbers are great. She wants a paper. The Prof is now owed and indebted at once. He asks the player in private for "the more": Sister, alone, after hours on Fridays. Stage 2.
6. **The Letter (in the Morning After).** The lawyer asks for something that proves this is research. The Prof's pilot study and the dean's letter. "I bought a shield with a cheerleader's smile."

---

## 8. How it fits together (timeline)

Each row is a phase. The order is the point: the main line never moves twice in a row without a family beat, and no two adjacent beats use the same format.

| # | Main | Mom | Sister | Side lines |
|---|---|---|---|---|
| 1 | 4.1 Crickets | 5.1 Booze night | Coffee rounds (exists) | Manager: three shifts |
| 2 | 4.2 The Veil | 5.2 Caught | 6.1 The Ask (Darius) | Landlord: The Helpers |
| 3 | 4.3 Late night | 5.3 Flirt duty | 6.2 Souvenirs | |
| 4 | 4.4 First sale | 5.4 Not enough, 5.5 Silence | 6.3 Two diaries | Manager: Debrief; Prof: Face of the Project |
| 5 | | 5.6 The Crawl | 6.4 Send me something | Landlord: What He Saw |
| 6 | 4.5 The Gym | 5.7 Client entertainment | 6.5 What are we | Prof: The List |
| 7 | 4.6 Morale (Darius) | | | Manager: The Incident (4.7) |
| 8 | 4.8 Anchor | (breather) | (breather, Wardrobe and rounds) | Boss: Support Review, The Clip |
| 9 | 4.9 Profit party (Catalyst project starts and finishes) | | | Manager: The Uniform; Landlord: The Review |
| 10 | 4.10 The Crack | 5.8 Catalyst night, Ethan asks Mom if she's okay | 6.6 Catalyst, first night; 6.7 The Rooftop | Prof: The Pilot; Boss: The Arrangement |
| 11 | 4.11 Retail pitch | 5.9 The Calendar | 6.8 Everything | Landlord: Rival tenant; Prof: Dean's visit |
| 12 | 4.12 The Night Shift | 5.10-5.11 | 6.9 | Boss: After Hours; Manager: Closing keys; Landlord: The Ask |
| 13 | 4.13 Morning After | | | Prof: The Letter |

---

## 9. End of Stage 1 and the start of Stage 2

**Left standing:**
- Mom and Sister, fully corrupted, device-free obedience, both lent out at least once.
- The original Valenx and the (optional) spare units Brian kept.
- The Prof's pilot study (legal shield).
- Darius and Brian. Darius is either a loyal ally or an offended one, depending on 4.6.
- The Boss's clip, now either deleted or in new hands.

**Lost:** Ethan, every device except one, the servers, the lead on the retail chain (the investor might still help).

**Stage 2 hooks:**
- The investigation (Suspicion starts here, as your design says).
- Ethan's rival launch and the press.
- Sexual content with the Landlord, Boss, Manager and Prof, in the order they've been asking: Boss (upstairs), Landlord (Saturday), Prof (Friday), Manager (closing).
- Mom and Sister's reaction to knowing about each other.
- A rebuild: no devices, lots of money, a lawyer and a plan.
- The supplier, still waiting for his next evening.

---

## 10. Things I need you to decide

1. **How far do third parties go in Stage 1?** I wrote it so that clients touch, flirt and watch, and sex with others starts at the doorway on the last night. If you want to show the supplier night, the rest of the plan is unaffected.
2. **Do Mom and Sister learn about each other at the end of Stage 1?** I used the car as the moment. If you'd rather keep it for Stage 2, move the last scene to the club entrance and have them arrive separately.
3. **The Calendar.** Mom figuring out part of the truth and choosing to stay is the biggest change to her arc. If you'd rather she never finds out, the Anchor path works alone, and she just becomes complicit.
4. **The supplier and "compounds".** I kept your idea of a shady contact, but gave it a reason (the Boss's pills, the diner incident). If you'd rather avoid drugs, swap the supplier for the owner of a private club who pays in cash and access. The structure doesn't change.
5. **The Anchor.** Two uses, keeps the name change. Fine, or do you want it cut?
6. **Ethan's equity.** A token 2% as a player choice, or always stalled?
7. **Party Animal.** The photos beat (6.2) works with either version. But it should be decided before 6.2 is written.

**Small cleanups before writing:**
- The device form factor is inconsistent in Mom's Stage 1 scenes (laptop bag, phone sliders, desk drawer). Decide once: a portable Valenx controlled from his phone, and a fixed vent unit.
- Mom's *Morning Wakeup* still uses the Stage 0 outfit and em dashes.
- The `photoTaken` flag is set and never read.
- The choice at the end of *It Makes A Difference 3* (reply vs. leave it on read) sets no flag. Add one if later scenes should remember it.
- Ethan is called "Evan" in `notes_for_me.twee`. The code uses Ethan.
