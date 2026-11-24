# Rise to Ruin: Stage 1 task plan

The task list for the rest of Stage 1, agreed with the author on 2026-11-24 after the first playthrough ("Too few tasks" in [STAGE1_TODO.md](STAGE1_TODO.md), section 7). Tasks are meant to be the main mechanic: every new one should be exciting to unlock, because it pushes the story, the company or a character forward and brings new pictures and scenes.

**Names:** this is a design doc, so it uses the default names and role labels. In the game every one of them is a variable.

---

## 1. Rules for every task

- **Stages open on her corruption stage *and* how often she has done the task.** Some stages also need a quest. Short form below: **st2 · 4×** = corruption stage 2 and done 4 times. Every stage brings its own clip(s), a POV passage and report lines.
- **Every new task opens with a short scene**: the quest that unlocks it, or a small one-off event. Then it shows up in the scheduler, with a `notify` on the quest.
- **Tasks are the main source of Exhibition in Stage 1.**
- **Exhibition is capped per stage**, like the player's corruption cap (`maxPath` in `setup.statDefs`): **40 in Stage 1**, 70 in Stage 2, 100 in Stage 3. Tasks can't max it early, and every new stage gives it room again.
- **Room to grow in the later stages**, without new stats: the Exhibition caps, the venue standing from [LATER_STAGES_VISION.md](LATER_STAGES_VISION.md) section 8 (`$venues`; Stage 1 tasks already raise it a little, from Stage 2 on it's the main axis), and how often she has done a task.
- **Private tasks with the player** only run when nobody else is around: after work hours with the staff gone, or in the meeting room while the other one isn't in it. The same act also unlocks as an interaction card. They are **primarily for the scenes**: small effects only (some corruption, Feelings toward the player), no mechanical bonuses for now.
- **No 1-AP tasks** unless it's a break or relaxing. The massage becomes 2 AP.
- **Who's in it** is listed for every task, so the POV passages and Feelings know who to cover.

---

## 2. Mom

| Task | Unlocks | Where | What it does | Stages | Leads to |
|---|---|---|---|---|---|
| **Secretary Work** *(exists)* | start | office | Project progress, Efficiency. No report entry | Outfit only: the clip changes with her corruption stage (blouse → the dress code → the silk he picked) | His own office (vision 6.2) |
| **Helping the landlord** *(exists)* | Stage 0 | the landlord's apartment. With the landlord | Keeps the rent deal | Taken over by the Landlord line (The Helpers tiers) | The landlord's Saturdays |
| **Flirt Duty** *(exists)* | Flirt Duty | office. With Ethan, Brian, Darius | Staff Morale | New stage, **st2 · 8×**: she sits on the edge of their desks, and the staff start "needing help" on purpose | Staff "employee benefit" (vision 6.2) |
| **Client Consultant** *(exists)* | The Handover | the boss's tower, floor 6. With the boss, her old colleagues | Money, the support project | The Boss line adds stages: coffee for the whole floor → the dress code he sets → his hands in the meetings, in front of her old colleagues | The boss's Thursdays |
| **Client Lunch** *(new)* | The First Real Sale (phase 4), so **before** the Gym Dinner | off-site (steakhouse.jpg), report and POV only. With a client (a one-off extra per stage) | Reputation, a bonus on the next client project's reward, **Exhibition**, "clients" standing | 0 a proper lunch, she's good at it · 1 **st1 · 3×** a hand on her knee she doesn't move · 2 **st1 · 6×** the dress he picks, and she lets the client pick the wine and the topic · 3 **st2 · 4×** dessert in the client's car | Gets her ready for the Gym Dinner offer. Later the boss's network and the clients' "Kept" level |
| **Product Demos** *(new)* | **The Catalyst Night** (she's stage 2: "it doesn't matter if it's the box or me") | meeting room. With clients | Big sales progress on client projects, Reputation, Exhibition | 0 she wears the official unit and the clients watch it calm her · 1 **st2 · 3×** a client gets the dial · 2 **st3 · 3×** "a live demonstration": the meeting room table | Client entertainment in his own office (vision 6.2), the boss's Review |
| **Massage** *(exists, now 2 AP)* | CEO struggles | meeting room. With the player | Morale | Stages go on with her corruption stage, up to the version from The Crawl | |
| **Test Session** *(exists)* | Test Session Request | meeting room. With the player | **New:** raises the calibration quality of a device, a reason to keep doing it after "No stimulus" | Keeps its current stages, plus a stage-3 "test" where she asks for it without the device | |

---

## 3. Sister

| Task | Unlocks | Where | What it does | Stages | Leads to |
|---|---|---|---|---|---|
| **Office Work, Coffee Break** *(exist)* | start | office | as now | Outfit only, by corruption stage | |
| **Diner Shift** *(exists)* | Stage 0 | diner. With the manager, the regulars | Money | Taken over by the Manager line: the uniform stages | The diner's ladder |
| **Tutoring** *(exists)* | Stage 0 | home / college. With the prof, students | Money | Taken over by the Prof line (The Face of the Project) | The Mentorship program |
| **Socials** *(new)* | The First Real Sale: the marketing firm owner tells him "you need a face" | office, and the meeting room as a photo studio. Alone, later a photographer | Marketing progress, Reputation, **Exhibition** | 0 product shots, only her hands · 1 **st1 · 3×** her face becomes the brand, and the comments start · 2 **st2 · 4×** the gym-wear shoot for the gym chain · 3 **st3 · 3×** the outtakes she sends him first | Her losing her status in public (vision 1.5), the college's reputation |
| **Field Test** *(new)* | The Gym Meeting (phase 5) | **the gym (new location)**. With a trainer (a new regular) | Gym project progress (testing), Exhibition, gym standing. High energy cost | 0 a normal workout with a sensor on her wrist · 1 **st1 · 3×** the outfit he picked · 2 **st2 · 4×** the trainer "corrects her form" · 3 **st3 · 4×** a private session after closing (watched and handled, no sex) | The gym as a venue (vision 6.3), the trainer as its first regular |
| **Extra Friendly → Team Spirit** *(exists)* | Be Nice to Brian, then The Anchor | office. With Brian, later the employee the player picks | Staff Morale. Team Spirit: the player picks which employee she cheers up, each with his own lines | 0 lunch with them · 1 **st2 · 3×** she sits on their desk · 2 **st3 · 3×** "employee of the week": a private show in the meeting room | Staff "employee benefit" (vision 6.2) |
| **Front Desk** *(new)* | The Retail Pitch: clients come to the office now | office entrance. With visitors | Small Reputation and project reward bonus, report lines about visitors | 0 greeting people · 1 **st2 · 3×** the short skirt and the sign-in sheet · 2 **st3 · 3×** visitors who "wait" on the couch with her | Client entertainment (vision 6.2) |
| **Hostess** *(new)* | The Rooftop (if she went), otherwise The Retail Pitch | off-site, evenings (rooftop.jpg, bar.jpg). With the investor and his circle | High Reputation, Exhibition, standing with the investor's circle | 0 coats and wine · 1 **st2 · 2×** the investor's friends · 2 **st3 · 2×** the club, which leads straight into the Night Shift | The supplier's club as a venue |

---

## 4. Both

| Task | Unlocks | Where | What it does | Stages | Leads to |
|---|---|---|---|---|---|
| **Client Evening** *(new)* | The Calendar + Everything (both at stage 3) | off-site, the bar, then the club. Mom and Sister together, with clients | A lot of money and Reputation. Report and POV only | 0 drinks with a client, the two of them pretending not to notice what the other one does · 1 **2×** the club's private room. This is the setup mom was missing before the Night Shift | "Mother and daughter on the same shift" beats at every venue |

---

## 5. Private tasks with the player

Each one is also an interaction card. Primarily for the scenes; their effects stay small (some corruption, Feelings toward the player).

| Task | Who | Unlocks | Where / when | Stages |
|---|---|---|---|---|
| **Lunch Break** *(new)* | Mom, the player | A Knock at Night (the handjob card exists) | meeting room, Noon, while the sister isn't in it | handjob · after The Crawl: blowjob · after The Calendar: sex |
| **Working Late** *(new)* | Mom, the player | The Crawl | his desk, Evening, staff gone | under the desk while he works · after the Catalyst Night: on the desk · **st3**: she leaves the door open (a risk if Ethan is still around, which fits his late nights) |
| **Overtime** *(new)* | Sister, the player | What Are We. **It also unlocks her Evening rows**: she starts staying late "to be near him" | office, Evening, staff gone | the Souvenirs level (handjob) · after Send Me Something: the show she sent him, live · after Everything: sex |
| **Photo Review** *(new)* | Sister, the player | Socials stage 1 + Send Me Something | meeting room | She shows him the shoot and the outtakes, then a private shoot just for him |

Left out on purpose: **Staff Meeting** (both of them with the player). Stage 2 at the earliest.

---

## 6. Systems this needs

- [ ] **Stage gates on tasks**: a stage can require a corruption stage, a count and optionally a quest (today stages only count repetitions).
- [ ] **Exhibition caps per stage**: `maxPath` for `MomExhibition`/`SisterExhibition` (40 / 70 / 100).
- [ ] **Weekend and evening tasks**: tasks only run on weekdays right now. Hostess, Client Evening and the landlord's Saturdays need weekend rows (routine and scheduler change).
- [ ] **Off-site tasks**: no CCTV, report and POV only.
- [ ] **Privacy check for scheduling**: private tasks only after the staff has left, or in the meeting room while the other one isn't in it.
- [ ] **The sister's Evening rows**, opened by What Are We (`sister_stage1` routine, `tasks` with a requirement, like mom's after New Job Impression).
- [ ] **Gym location**: a location object with gym.jpg, CCTV (the chain's own system), and a place in their schedules.
- [ ] **Massage at 2 AP.**
- [ ] **Test Session raises calibration quality.**

---

## 7. Build order

Story order, starting with what fixes the playtest problems:
1. **Client Lunch** and **Socials**: the Exhibition source, before the first family offer.
2. **Overtime**, with the sister's Evening rows.
3. **Field Test**, together with the gym location.
4. **Lunch Break** and **Working Late**.
5. **Photo Review**, **Front Desk**, **Hostess**.
6. **Product Demos** (after the Catalyst Night), **Client Evening**.
7. New stages on the existing tasks (Flirt Duty, Massage, Test Session, Extra Friendly → Team Spirit, outfit-only stages).

The Landlord, Manager, Boss and Prof stages of the existing tasks come with their side lines (STAGE1_TODO.md, section 5).
