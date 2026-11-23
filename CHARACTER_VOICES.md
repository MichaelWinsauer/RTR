# Character Voices

How the characters talk: their personality, the tendencies that color their speech, how their voice shifts with mood and over the story, and which existing passages miss the mark. Built from every `<<Chat>>` line in `dev/` and the author's notes on it.

Quotes keep their variables (`$player.name`, `$mom.relation`, ...). The names in the headings are only the defaults. In game text, every name and family term is still a variable.

---

## The most important part: people talk like people

Everyone in this game is, more or less, a normal person, and normal people mostly talk the same way. They use the same everyday words, the same sentence shapes, the same "yeah" and "I mean" and "honestly". What sets one person apart from another is a handful of **tendencies**: things they do a bit more often than others, or a bit less. One person talks in longer sentences, another trails off when she's nervous, another reaches for a more precise word.

The mistake to avoid is turning those tendencies into tics that show up in every line. If `$mom` swerves away from every topic, `$sister` makes a joke out of every sentence and `$brian` says "uh" in every line, they stop sounding like people and start sounding like a list of character traits, and that is exactly what makes text read as AI-written. So:

- **Write what a normal person would say in that moment first.** Then decide whether this is a moment where the character's tendency would actually show. Often it isn't.
- **A tendency is a probability, not a rule.** It might show up twice in one scene and not at all in the next. Some scenes, a character just talks plainly, and that's correct.
- **The same person sounds different from scene to scene.** Tired, excited, scared, embarrassed, talking to her boss, talking to her best friend, half asleep: all of these change how someone talks far more than their "personality" does. Let the situation drive the voice.
- **Consistency means sounding like themselves, not repeating themselves.** A character should feel familiar across scenes, never like the same lines with new nouns. If a phrase or move has already been used for a character in an earlier scene, find another way.
- **The descriptions below are not checklists.** Don't try to fit every listed trait into a scene. Read them to understand the person, then write the person.

### Habits that make all characters sound generated
These apply to everyone, on top of the rules in `CLAUDE.md`:
- **Strings of short follow-up sentences.** "He made me redo the whole report. Forty pages. Because of the font." Real people mostly say that as one sentence: "He made me redo the whole forty-page report because of the font, can you believe that?" Use a short sentence when it's earned, not as the default way to add a detail.
- **Mirror sentences and neat reversals.** "You don't have to know. You just have to choose." Nobody talks like that. Don't write them at all.
- **Every line a one-liner.** Banter is a back-and-forth that builds and wanders, not a string of quotable zingers. Let jokes be a sentence or two long, let some fall flat, let people laugh at them or ignore them.
- **Everyone knows exactly what to say.** People hesitate, misjudge, say something a little wrong and fix it, change their mind. That includes the player.
- **Dialogue as a string of one-word lines.** "Sit down." "Again." "Better." "Off." Fine once in a tense moment, deadening as a whole scene.
- **The same beat in every scene.** The women ending scenes with "Did I do all right?" and the player answering "You did perfectly", or both of them blaming the air conditioning whenever they blush. Each of these worked the first time and has since been repeated in many scenes. If a beat has been used, it's used up.
- **Ellipses as the default sign of emotion.** A trailing "..." is fine sometimes. Most of the time a full sentence, a change of subject or a beat in the narration does the job better.

---

## Who calls whom what

This one is factual and worth keeping consistent.

| Speaker → | the player | others |
|---|---|---|
| **`$mom`** | "honey", "sweetie", "sweetheart", a lot, and that's intended. `$player.name` when she's shocked, scolding or very serious. | "sweetie" to the staff as well; `$sister.callName`; `$boss.callName` formally |
| **`$sister`** | "little `$sister.callPlayerShort`" when she teases him as the older sister; `$sister.callPlayer` or `$player.name` otherwise; "boss" only to tease his authority | `$mom.callName`; first names |
| **Player** | – | `$mom.callName`, `$sister.callName`, first names to staff, "Mr. `$landlord.surname`" when he needs something from him |
| **`$ethan`** | `$player.name`, "man", "dude", and "boss" as a running joke (not in every line) | first names |
| **`$brian`** | rarely addresses anyone by name | – |
| **`$darius`** | `$player.name`; no nicknames | – |
| **`$boss`**, **`$landlord`** | "kid" | "sweetheart" to the women; `$boss` uses `$mom.name` like he owns it |
| **`$manager`** | "kid", "founder" (mocking) | – |
| **`$prof`** | "Mr. `$player.surname`" | `$sister.surname` |

---

## The player (`$player`, default Michael)

### Who he is
A normal nineteen-year-old guy who happens to hold a lot of power because of the device. He'd love to be the cool mastermind pulling every string, but he isn't one, and he doesn't try to act like one in front of people, because that would be cringe and he knows it. He's smart, ambitious and resentful, and he plans things, but he also improvises, guesses wrong, gets surprised when something works, and doesn't know everything. When `$darius` asks a technical question he can't answer, he doesn't have a perfect line ready; he deflects like anyone would, a bit clumsily.

### Day to day
With his family he's friendlier than the current text makes him: relaxed, joking around, interested in their day, a normal son and brother. He teases his sister and takes it back, he helps his mother in the kitchen and says thanks, he asks how things are going and actually listens. With the staff he's a young boss who's mostly one of the guys, a bit awkward about being in charge at first.

His humor is ordinary banter, not dry one-liners. He jokes in full sentences, picks up a joke someone else started and runs with it, exaggerates, gets one back. Some of his jokes are bad and he knows it.

### In key scenes
This is where the warmth matters. In the scenes that push his mother or sister further, he goes cold, and the point of the coldness is that he **withdraws** the kindness they're used to. He gets quieter and more distant and stops making it easy for them, so they come to him to get the warmth back. That only works if he's genuinely warm the rest of the time. If he's cold and clipped in every scene, the key scenes have nothing to contrast with.

Even when he's cold, he talks in sentences. He gives instructions, explains what he wants, lets a silence hang, but he doesn't turn into a machine that issues single words.

### Corporate talk
He hates corporate jargon. He can speak it when a client meeting requires it (the gym meeting), and he does it well enough, but he doesn't enjoy it and it's not how he talks to anyone he knows. Afterwards he might joke about it or feel a little dirty about how easily it came out. Don't give him buzzwords in normal conversation.

### Arc
Stage 0: broke, frustrated, still mostly the son and brother they know, with the manipulation hidden under genuine-sounding concern. Stage 1: more confident and more used to getting his way, more comfortable giving orders to family in the key scenes. He changes in what he's willing to ask for, not in turning into a different speaker.

### In the current text, don't copy
- The clipped, all-knowing register of most Stage 1 scenes: chains of "Sit down." / "Close the door." / "Noted." / "That's exactly it." / "You did perfectly."
- The mirror sentences in `everything.twee` ("You don't have to know. You just have to choose.") and `what_are_we.twee` ("You don't have to tell. You just have to want it.").
- Dry one-liners as his main humor ("Your code needs a priest.", "That's how percents work.").
- Product pitches that read like ad copy in Stage 0 (`different_approach.twee`, `diner_suggestion.twee`): two balanced sentences explaining what the device does and why people spend more.
- Villain clichés in the boss confrontations ("I don't think we're that different, you and me.").
- The corporate-speak in `gym_meeting.twee` is fine as a scene, but it's a costume he puts on for one client, not a register he enjoys.

---

## `$mom` (default Anna)

### Who she is
A warm, sunny, optimistic mom. She's happiest when she's helping someone, and her mom instincts kick in with everyone: her kids, the staff, the neighbors. She feeds people, fusses over them, sews on buttons, remembers birthdays, and cheers people up. She worries, but her default is hopeful: things will work out, there's a bright side, she'll find a way to help. The current text makes her too passive, too cold and too clipped; she should come across as the warmest person in the room.

### How she talks
- **In longer, flowing sentences.** She's chatty. She strings thoughts together with "and" and commas and little asides, the way someone talks while doing three things at once. The short fragment chains in the current text ("Forty pages. Because of the font.") are the main thing that makes her sound generated. Rewrite them into one sentence that sounds like a mom telling a story.
  - Before: "Twenty-two minutes. I've been on hold with their accounting department for twenty-two minutes, sweetie."
  - After: "I've been on hold with their accounting department for twenty-two minutes now, sweetie, and I'm pretty sure they're hoping I'll just give up and go away."
- **Pet names, often.** "Honey", "sweetie", "sweetheart" come up a lot when she talks to her son, and that's on purpose. That's who she is.
- **Encouraging and optimistic.** She reassures, she cheers people on, she reframes bad news ("Well, at least now we know").
- **Breaking off mid-sentence.** When she gets close to something that embarrasses or scares her, she tends to start the real sentence, stop, and finish with something harmless and everyday instead. It's one of her clearest tendencies, and it works best when it happens at a moment that matters, not every time she speaks.
- **Practical care as her way of showing feelings.** "Did you eat?" and the blue container are part of her, especially when she's dodging something. As a habit, not as every exit from a conversation.
- **Talking herself into things** in a positive way: "Well, if it helps you, then I'm sure it'll be fine." She finds a reason why it's okay, and she means it, which is what makes it sad.

### Humor
Her humor works well as it is: domestic exaggeration, mock outrage, objects treated like people (the pot that's been soaking so long it "has been growing a personality"), and a cast of offstage neighbors and old colleagues. Keep it warm, never sharp.

### Arc
The warmth never goes away; that's the point. As she's corrupted, she doesn't become cold or submissive in a flat way. She becomes **eagerly helpful** in places she shouldn't be: the same sunny "Of course, honey, let me help" carried into things a mother doesn't do. Early on she's tired and worn down by `$boss`, but still the one who keeps the house going and cheers everyone up. In the new job she blossoms. In the darker scenes she rationalizes with the same optimism she uses for everything else. Embarrassment shows as flustered chatter, not as one-word replies.

### In the current text, don't copy
- The clipped fragment chains throughout her lines.
- Scenes where she only answers in short lines and lets the player lead every exchange (most of the test sessions); she'd fill the silence.
- `morning_wakeup.twee` ("Rise and shine... hot and fresh"), generic and with em dashes.
- `mom_has_it_tough_again.twee`: the contract-penalty exposition.
- `prototype_test_run_2.twee`: she says the clinical word out loud ("I'll masturbate in bed tonight"). She'd talk around it.
- `mom_cooking.twee` and `mom_relaxing.twee` are not good references.

---

## `$sister` (default Sophie)

### Who she is
Twenty, the older sibling, and one of the most popular girls at her college: good-looking, usually doing well in class, lots of friends. Someone like that is not insecure and doesn't have to try hard. She's relaxed, self-assured, quick and articulate, with a good vocabulary. She teases her younger `$sister.playerRelation` from a position of comfortable superiority, the way older sisters do. Her calculus trouble in Stage 0 was a real crisis precisely because it's unusual for her.

### How she talks
- **Confident, complete sentences.** She says what she wants and expects to get it. She doesn't need to pile on extra sentences to justify herself.
  - Before: "I want to sit in on the next client call. I'll be quiet. I'll be furniture. Very professional furniture, the expensive kind."
  - After: "I'd like to sit in on the next client call. I won't say a word, I just want to see how you actually handle these people."
- **Teasing, not clowning.** She's funny in an easy, dry, sometimes sharp way, the way someone talks when she knows people like her. She doesn't put on voices or perform routines to win the room. A joke from her is a remark, not a bit.
- **No lists.** She doesn't talk in "First of all... Second... Item three". That has to go wherever it appears.
- **Better vocabulary** than her brother, if anything. She's a good student and sounds like one when she wants to.

### When she's nervous
This is the only time the rambling shows: when it gets personal between her and the player, when she's about to confess something, when she's caught off guard. Then she talks faster, adds sentence after sentence, takes back what she just said ("Professionally. With you, professionally."), drops a topic halfway. Because she's normally so self-assured, that change in itself tells the player (and the reader) that something is happening. It only works if it's rare.

### Arc
To the outside world she stays strong all the way through: confident with the staff, the clients, her friends. With him, things change as it gets serious: first the nervous moments, then the confessions, then devotion. Even devoted, she's still a capable, self-possessed woman who chose this, not a nervous girl. When she relaxes again after a big scene, her normal confident voice comes back.

### In the current text, don't copy
Most of her Stage 1 dialogue leans too far into insecurity and performance:
- The bits and personas (the duchess voice in `sister_studying.twee`, the nature-documentary narrator in `sister_doing_chores.twee`, "Office Gossip with `$sister.name`... I'll make a logo").
- The list format in `office_gossip.twee` and `the_friend.twee` ("Item one:... Item two:...").
- Constant short additive sentences, "okay" (129 times across her lines), "like," and "Oh my God" as filler.
- Over-detailed cover stories in scenes where she isn't nervous.
- `party_animal.twee`: generic porn dialogue with none of her personality, and typographic "…".

---

## `$ethan` (default Ethan Reed)

### Who he is
The player's buddy from high school. They're about the same age. They did a school project together back then, the headset version of `$company.prototype.name`, and Ethan wrote most of its code. After graduation they lost touch, and they found each other again when the player started hiring. He's a very competent software developer who takes his work seriously, and he's also easygoing and funny.

There was **no hackathon**, and Ethan never talks about the player as a "kid", "tiny", or anything that implies an age gap. They're equals and old friends.

### How he talks
- Like a relaxed, competent guy talking to an old friend. He jokes a lot, but his jokes come from someone who knows what he's doing; when work questions come up, he answers clearly and precisely, with no fumbling.
- His humor is laid-back and mostly about himself, code, and the absurdity of office life. It shouldn't sound like `$sister`'s; he's the guy at the desk next to you making a comment, not someone doing a routine.
- "Boss" is a joke between friends. Use it now and then, not in every line.
- Shared history comes up naturally, the way it does between old school friends: the project, teachers, the people they knew back then.

### Shared history in the existing text
The details already in the game: junior year, evenings in the physics lab, a bike helmet with a broken baby monitor taped to it, the project fair in the school gym, the janitor checking on them at night (`the_late_night.twee`), `$mom` remembering him emptying the fridge (`too_much_work_2.twee`). After graduation they didn't talk for a year. Ethan's sore spot is the app he built right after school for three business-school guys who left his name off the equity paperwork. Build on these instead of inventing a different past.

---

## `$brian` (default Brian Hayes)

### Who he is
An introverted hardware nerd: socially awkward, insecure, but not dumb at all. Hardware is what he loves, but it's not the only thing he ever talks about.

### How he talks
- **Fillers.** "Uh", "um", "ehh", "hm" and the like are a real part of him, especially when he's put on the spot. Vary them rather than repeating "uh" every time.
- **Shorter sentences than most.** He doesn't volunteer much and doesn't elaborate unless asked.
- **More normal once he's comfortable.** With the guys, after a while, or on a topic he's sure of, he talks fairly normally: still brief, but fluent. He's smart, and his answers show it.
- **Women make him go quiet.** Around `$mom` and `$sister` he gets flustered and insecure: short answers, long pauses, losing his words, not looking at them. He does **not** fill the silence with hardware explanations; he just gets quieter.

### In the current text, don't copy
- `task_sister_extra_friendly_0.twee`, where he lectures `$sister` about capacitors. Around her he'd barely manage a sentence.
- Lines where every sentence is broken by "uh".

---

## `$darius` (default Darius Brooks)

### Who he is
Highly intelligent, polished and confident. An analyst by trade, but numbers are his job, not his personality.

### How he talks
- **Like the smartest person in the room, without showing off.** A wide vocabulary, well-built sentences with subordinate clauses, precise word choice. He says exactly what he means and phrases it elegantly.
- **Composed and courteous**, even when he disagrees or is accused. He gets more polite under pressure, not less.
- **Curious and probing.** He asks good questions, and he notices things others miss.
- **Data when it's relevant.** He cites a figure when it actually matters to the argument, not in every observation.
- Dry, understated humor.

The existing scenes mostly fit (`low_morale.twee`, `the_crack_2.twee`). Push his vocabulary and sentence structure further, and cut numbers that are only there to signal "analyst".

---

## `$boss` (default Victor Anderson)

An arrogant, sleazy executive who enjoys power. Condescending in person, calls the player "kid", treats `$mom` like his property ("my consultant"), puts a price on everything. His mails are stiff business formula. He's at his most menacing in small, specific demands ("Tell her to wear the gray skirt again.") rather than in villain speeches; Stage 0 has a few clichés ("you are a sick little bastard. I think I like you", "everything has consequences") to avoid.

## `$manager` (default Frank Morales)

A tired diner manager who used to mock the player and still can't quite stop. Sarcastic, practical, worried about pie orders and staffing, grudging with praise. He uses business words to tease the player ("founder", "growth opportunity"). The diner scenes work.

## `$landlord` (default Norman Howell)

An old, greedy, crude landlord. Calls the player "kid", puts his innuendo in audible quotes ("help", "incentives"), complains about money, his knees and the stairs, and talks rougher than anyone else ("gotta", "'em"). "If you catch my drift" is his, not `$boss`'s.

## `$prof` (default Antony Walsh)

A pompous, bitter professor. Formal, longer sentences, sarcasm about the dean and his students, short cutting dismissals. He never says anything crude; his leering comes wrapped in polite academic language. "Mr. `$player.surname`".

---

## Before you finish a scene

- [ ] Read the dialogue aloud. Does it sound like people talking, or like characters performing their traits?
- [ ] Is there variety in sentence length, and are most sentences full sentences rather than fragment chains?
- [ ] Did any character's tendency show up in every line? Cut it back.
- [ ] Did you reuse a phrase, joke or beat this character already had in an earlier scene?
- [ ] Does the voice fit the situation and mood of this scene (tired, scared, excited, relaxed)?
- [ ] Player: is he warm where the scene is everyday, and is the coldness in key scenes a withdrawal of that warmth? Does he ever not know something?
- [ ] No mirror sentences, no lists, no corporate jargon outside client scenes.
