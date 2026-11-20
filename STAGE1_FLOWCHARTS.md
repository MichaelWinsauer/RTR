# Stage 1 flowcharts

Companion to [STAGE1_PROPOSAL.md](STAGE1_PROPOSAL.md). One chart per section: the main line (4), Mom (5), Sister (6) and the four side lines (7). The last chart shows only the links *between* lines.

**To see them in VS Code:** install the extension "Markdown Preview Mermaid Support" (`bierner.markdown-mermaid`), then open the preview (`Ctrl+Shift+V`). GitHub and most Markdown viewers render them without anything extra.

**How to read them**

| Shape | Meaning |
|---|---|
| Rectangle | A quest or scene (the number is the section in the proposal) |
| Diamond | A player choice |
| Hexagon | A corruption stage milestone (the bar is full, the scene advances her stage) |
| Parallelogram | A gate from *another* line. It must be done before the arrow's target can happen. |
| Stadium (pill) | Already in the game, or a hand-off to Stage 2 |
| Solid arrow | Next step in the same line. The label is the requirement. |
| Dotted arrow | A hand-off to another line: this scene unlocks or feeds that one |

Numbers in the requirements (days, counts) are starting values to tune, not fixed rules. "Stage 2 Willing" and so on are the corruption stages from the proposal.

---

## 4. Main line

```mermaid
flowchart TD
  S0(["Done: It'll be official<br/>official product project exists"]):::done

  M1["4.1 Crickets<br/>no orders, only Linda from HR bites"]
  M2["4.2 The Veil<br/>team meeting, Veil project starts"]
  M3["4.3 The Late Night<br/>tuning with Ethan, vent off for one night"]
  M4["4.4 First Real Sale<br/>marketing firm, flag pressClient"]

  G1[/"Mom 5.7 Client Entertainment<br/>the gym dinner is played"/]:::gate
  M5["4.5 The Gym<br/>router redesign, big contract"]
  M6["4.6 Morale<br/>staff dress code, Darius pushes back"]
  D1{"Let Darius in?"}:::choice
  G2[/"Manager 7.3 The Incident played<br/>10 diner shifts and a Veil at the diner"/]:::gate
  M7["4.7 Diner Incident aftermath<br/>chemistry matters"]
  M8["4.8 The Anchor<br/>built with Brian only"]
  M9["4.9 The Profit Party<br/>Catalyst project announced"]
  D2{"Ethan asks for<br/>his piece"}:::choice
  C1(["Catalyst project runs and completes<br/>device Catalyst owned"]):::done
  M10["4.10 The Crack<br/>Ethan tries the full code on himself"]
  M10b["Player accuses Darius<br/>the log pull used Darius's login"]
  G4[/"Sister 6.7 The Rooftop<br/>investor introduces the retail chain"/]:::gate
  M11["4.11 The Retail Pitch<br/>Ethan sets up, gets master access"]
  G5[/"Mom 5.10 After Hours or Boss broken<br/>Boss gave the supplier's name<br/>Sister 6.8 Everything done"/]:::gate
  M12["4.12 The Night Shift<br/>the supplier deal"]
  D3{"Ethan calls at 11:40 pm"}:::choice
  G6[/"Prof 7.4 Pilot study done<br/>the shield for the lawyer"/]:::gate
  M13["4.13 The Morning After<br/>heist, investigation, lawyer, Dana's press"]
  S2(["Stage 2"]):::done

  S0 -->|"about 1 week"| M1
  M1 -->|"no orders after a week"| M2
  M2 -->|"Veil project at 80 percent"| M3
  M3 -->|"Veil project complete<br/>Veil owned"| M4
  M4 -.->|"Rick asks for your consultant<br/>unlocks Mom 5.7"| G1
  G1 -->|"required"| M5
  M5 -->|"contract signed, 1 week of heavier workload"| M6
  M6 --> D1
  D1 -->|"half-truth: flag dariusAlly"| M7
  D1 -->|"shut him out: flag dariusSuspicious"| M7
  G2 -->|"required"| M7
  M7 -->|"enough budget and Brian free"| M8
  M8 -->|"30 days in the black<br/>company profit"| M9
  M9 --> D2
  D2 -->|"give 2 percent: flag equityGiven"| C1
  D2 -->|"stall: flag equityStalled"| C1
  C1 -.->|"unlocks Mom 5.8<br/>and Sister 6.6"| C2[/"Mom 5.8 and Sister 6.6<br/>Catalyst nights"/]:::gate
  C1 -->|"a weekend, Ethan alone in the office"| M10
  M10 --> M10b
  M10b -->|"Darius forgives fast if dariusAlly"| M11
  G4 -->|"required"| M11
  M11 -->|"demo prepared<br/>flag trustedEthan"| M12
  G5 -->|"required"| M12
  M12 --> D3
  D3 -->|"answer: tomorrow"| M13
  D3 -->|"ignore: voicemail"| M13
  G6 -.->|"lawyer asks for proof of research"| M13
  M13 --> S2

  classDef done fill:#2c4a3e,stroke:#1cd88d,color:#fff
  classDef choice fill:#47306b,stroke:#b08bff,color:#fff
  classDef gate fill:#2b2b2b,stroke:#999,color:#ddd,stroke-dasharray:4 3
```

---

## 5. Mom's line

```mermaid
flowchart TD
  S0(["Done: A Knock at Night<br/>Handjob card unlocked, stage 1 Dutiful"]):::done

  A1["5.1 The Booze Night<br/>quiet, no device, passive lust builds"]
  A2["5.2 Caught<br/>meeting room, Brian nearly walks in"]
  A3["5.3 Flirt Duty<br/>comedy, coaching scene, new task"]
  A4["5.4 Not Enough<br/>she refuses, he scoffs"]
  A5["5.5 The Silence<br/>a week of cold, no interactions"]
  A6["5.6 The Crawl<br/>Friday at the empty office"]
  G0[/"Main 4.4 First Real Sale<br/>Rick, the gym owner, asks for 'your consultant'"/]:::gate
  A7["5.7 Client Entertainment<br/>the gym dinner, remote scene"]
  D1{"At the dinner:<br/>push or pull back"}:::choice
  A8H{{"Stage 2: Willing"}}:::milestone
  A8["5.8 The Catalyst Night<br/>first full sex, no rule this time"]
  G1[/"Main 4.9 Catalyst project complete"/]:::gate
  E1["Ethan asks Mom if she is okay<br/>short scene, feeds main 4.10"]
  A9["5.9 The Calendar<br/>she circles the pattern: Is it the box?"]
  D2{"Her question"}:::choice
  A9H{{"Stage 3: Complicit<br/>interaction Whenever unlocks"}}:::milestone
  G2[/"Boss 7.2 The Arrangement<br/>player chose Sell it"/]:::gate
  A10["5.10 After Hours<br/>the walk to the car, ends at the Boss's door"]
  A10b["Short scene: the Boss is strangely polite<br/>replaces After Hours"]
  G3[/"Boss 7.2 Introduction: supplier<br/>Sister 6.8 Everything done<br/>Main 4.11 Retail Pitch done"/]:::gate
  A11["5.11 The Last Night<br/>dressed by his orders, rides to the club"]
  S2(["Main 4.12 The Night Shift"]):::done

  S0 -->|"3 days"| A1
  A1 -->|"lust 60 or more<br/>she is alone in the meeting room"| A2
  A2 -->|"5 handjobs, flag handjobs"| A3
  A3 -->|"Flirt Duty task done 3 times<br/>lust 80 or more"| A4
  A4 -->|"automatic, 7 days"| A5
  A5 -->|"no interaction with her for 7 days<br/>a Friday, player stays late"| A6
  A6 -->|"first blowjob done"| A7
  G0 -->|"required"| A7
  A7 --> D1
  D1 -->|"push: bigger contract, resistance up"| A8H
  D1 -->|"pull back: smaller contract, she is at ease"| A8H
  A8H -->|"bar full, resistance 50 or less"| A8
  G1 -->|"required"| A8
  A8 -.->|"after the night"| E1
  A8 -->|"7 days, she keeps the calendar"| A9
  A9 --> D2
  D2 -->|"tell her part of the truth<br/>she says the mirror line"| A9H
  D2 -->|"use the Anchor<br/>logs spike, Ethan sees it"| A9H
  A9H -->|"Boss Arrangement was Sell it"| A10
  G2 -->|"required"| A10
  A9H -->|"Boss was broken with the Anchor"| A10b
  A10 -->|"After Hours done once"| A11
  A10b --> A11
  G3 -->|"required"| A11
  A11 --> S2

  classDef done fill:#2c4a3e,stroke:#1cd88d,color:#fff
  classDef choice fill:#47306b,stroke:#b08bff,color:#fff
  classDef milestone fill:#6b4100,stroke:#EAAF4C,color:#fff
  classDef gate fill:#2b2b2b,stroke:#999,color:#ddd,stroke-dasharray:4 3
```

---

## 6. Sister's line

```mermaid
flowchart TD
  S0(["Done: Good News?<br/>stage 0 Conflicted, works at the office from noon"]):::done

  B1["6.1 The Ask<br/>Darius asks her out, she asks permission"]
  D1{"Allow it or block it"}:::choice
  B2["6.2 Souvenirs<br/>the photos, her first handjob"]
  B2H{{"Stage 1: Yearning"}}:::milestone
  B3["6.3 Two Diaries<br/>the fake one for school, the real one for him"]
  B4["6.4 Send Me Something<br/>videos at night, then he walks in"]
  B5["6.5 What Are We<br/>she cannot say the old word anymore"]
  G1[/"Main 4.9 Catalyst project complete"/]:::gate
  B6H{{"Stage 2: Devoted"}}:::milestone
  B6["6.6 The Catalyst, first night<br/>love turned into obligation"]
  B7["6.7 The Rooftop<br/>investor evening, the signal across the room"]
  B8["6.8 Everything<br/>submit or leave, then Wardrobe orders"]
  B8H{{"Stage 3: Mine"}}:::milestone
  G2[/"Boss 7.2 Introduction: supplier<br/>Mom 5.10 After Hours done"/]:::gate
  B9["6.9 The Last Night<br/>she is the hostess, the car"]
  S2(["Main 4.12 The Night Shift"]):::done

  S0 -->|"5 days<br/>Darius hired, rounds task done 3 times"| B1
  B1 --> D1
  D1 -->|"allow: she dates, reports back<br/>flag dariusDate"| B2
  D1 -->|"block: she is relieved and guilty<br/>flag dariusBlocked"| B2
  B2 -->|"7 days, bar full, flag photoTaken"| B2H
  B2H --> B3
  B3 -->|"Internship Overview done 4 times<br/>her stage 1"| B4
  B4 -->|"lust 60 or more<br/>2 diary entries unlocked"| B5
  B5 -->|"2 videos sent"| B6H
  G1 -->|"required"| B6H
  B6H --> B6
  B6 -->|"exhibition 40 or more<br/>investor lead from Profit Party"| B7
  B7 -.->|"investor introduces the retail chain<br/>unlocks Main 4.11"| X1[/"Main 4.11 Retail Pitch"/]:::gate
  B7 -->|"stage 2 bar full<br/>Catalyst charged"| B8
  B8 --> B8H
  B8H --> B9
  G2 -->|"required"| B9
  B9 --> S2

  classDef done fill:#2c4a3e,stroke:#1cd88d,color:#fff
  classDef choice fill:#47306b,stroke:#b08bff,color:#fff
  classDef milestone fill:#6b4100,stroke:#EAAF4C,color:#fff
  classDef gate fill:#2b2b2b,stroke:#999,color:#ddd,stroke-dasharray:4 3
```

---

## 7. Side lines

Each chart is one line. The currency is what the player ends up holding.

### 7.1 Landlord (currency: the building)

```mermaid
flowchart TD
  S0(["Done: mail 0 confirmed<br/>weekly help tasks active, rent 3750"]):::done

  L1["7.1.1 The Helpers<br/>3 tiers inside the task: boxes, high shelves, tea and a hand on a knee"]
  L2["7.1.2 What He Saw<br/>he mentions something he should not know"]
  L3["7.1.3 The Review<br/>he asks for a Veil for his lobby"]
  L4["7.1.4 The Rival Tenant<br/>a warning on the stairs"]
  L5["7.1.5 The Ask<br/>Your mother. Alone. Saturday."]
  S2(["Stage 2: the landlord's answer<br/>trade: the building"]):::done

  G0[/"Main 4.9 Profit Party<br/>company is clearly rich now"/]:::gate
  G1[/"Mom stage 2 Willing<br/>Main 4.11 Retail Pitch done"/]:::gate
  X1(["Veil unit sits in his lobby<br/>device count minus 1, he does not know what it does"]):::done
  X2(["Optional: after the authorities call<br/>the player suspects him for a moment"]):::done

  S0 -->|"weekly visit rule: flag visitedLandlordThisWeek<br/>miss a week: fine or discount reversal"| L1
  L1 -->|"6 help tasks done in total<br/>tier 2 needs corruption 30 or more"| L2
  L2 -->|"1 week"| L3
  G0 -->|"required"| L3
  L3 -.->|"gets a Veil"| X1
  L3 -->|"rent due Monday, player at the office in the evening"| L4
  L4 -->|"1 week"| L5
  G1 -->|"required"| L5
  L5 --> S2
  L5 -.-> X2

  classDef done fill:#2c4a3e,stroke:#1cd88d,color:#fff
  classDef gate fill:#2b2b2b,stroke:#999,color:#ddd,stroke-dasharray:4 3
```

### 7.2 Boss (currency: connections and the supplier)

```mermaid
flowchart TD
  S0(["Done: The Handover<br/>support project unlocked, Mom is his consultant"]):::done

  B1["7.2.1 The Support Review<br/>he is the only one who does not respond to the unit<br/>pill organizer, afternoon drink"]
  B2["7.2.2 The Clip<br/>he sends a still: safe with me, for now"]
  B3["7.2.3 The Arrangement<br/>Thursdays after hours, to go over the settings"]
  D1{"How does the player answer?"}:::choice
  B4["7.2.4 After Hours<br/>Mom goes, scene ends at his door<br/>he says Next time, upstairs"]
  B4b["The Anchor on the Boss<br/>he becomes a pet, logs spike"]
  B5["7.2.5 The Introduction<br/>the Boss names the supplier"]
  S2(["Stage 2: upstairs<br/>the sexual part"]):::done

  G0[/"Mom 5.9 The Calendar done<br/>stage 3 Complicit"/]:::gate
  G1[/"Main 4.8 The Anchor built"/]:::gate
  X1(["Mom skips 5.10<br/>short polite scene instead"]):::done
  X2(["Feeds Main 4.7<br/>chemistry insight"]):::done

  S0 -->|"support project active 1 week<br/>consultant task done 3 times"| B1
  B1 -.->|"the pills give the chemistry idea"| X2
  B1 -->|"5 days, Mom stage 1 or more"| B2
  B2 --> B3
  B3 --> D1
  D1 -->|"Sell it: Mom goes<br/>price: contacts, his club, the supplier<br/>he deletes the clip in front of you, maybe"| G0
  G0 -->|"required"| B4
  B4 -->|"After Hours done once"| B5
  D1 -->|"Break him<br/>needs the Anchor, big charge cost"| G1
  G1 -->|"required"| B4b
  B4b -->|"he gives the name himself"| B5
  B4b -.-> X1
  B5 -->|"gate for Main 4.12"| S2

  classDef done fill:#2c4a3e,stroke:#1cd88d,color:#fff
  classDef choice fill:#47306b,stroke:#b08bff,color:#fff
  classDef gate fill:#2b2b2b,stroke:#999,color:#ddd,stroke-dasharray:4 3
```

### 7.3 Manager (currency: a cut of the diner)

```mermaid
flowchart TD
  S0(["Done: diner analysis project<br/>Sister's diner shift task active"]):::done

  M1["7.3.1 Three Shifts<br/>weekly checklist in the CMD, fine if missed"]
  M2["7.3.2 The Debrief<br/>meeting at the office, the Veil goes into the diner"]
  M3["7.3.3 The Incident<br/>aggressive customer, nothing sexual"]
  M4["7.3.4 The Uniform<br/>7 shifts a week plus a cut"]
  D1{"Negotiation"}:::choice
  M5["7.3.5 The Closing Keys<br/>he asks for Sister on weekend closing shifts"]
  S2(["Stage 2: closing time<br/>the sexual part"]):::done

  G0[/"Veil owned<br/>Main 4.3 done"/]:::gate
  G1[/"Sister stage 1 Yearning<br/>exhibition 30 or more"/]:::gate
  G2[/"Sister stage 2 Devoted"/]:::gate
  X1(["Feeds Main 4.7<br/>the player learns chemistry matters"]):::done

  S0 --> M1
  M1 -->|"analysis project done, 1 week"| M2
  G0 -->|"required"| M2
  M2 -->|"Veil installed<br/>10 diner shifts done"| M3
  M3 -.-> X1
  M3 -->|"sales up on her days"| M4
  G1 -->|"required"| M4
  M4 --> D1
  D1 -->|"cut and 7 shifts: he agrees, grumbling"| M5
  D1 -->|"he refuses: player squeezes him<br/>small revenge, mopping, Mr Consultant"| M5
  G2 -->|"required"| M5
  M5 -->|"14 shifts in the new uniform"| S2

  classDef done fill:#2c4a3e,stroke:#1cd88d,color:#fff
  classDef choice fill:#47306b,stroke:#b08bff,color:#fff
  classDef gate fill:#2b2b2b,stroke:#999,color:#ddd,stroke-dasharray:4 3
```

### 7.4 Prof (currency: legitimacy)

```mermaid
flowchart TD
  S0(["Done: The Proposition<br/>college tutoring task unlocked"]):::done

  P1["7.4.1 The Face of the Project<br/>Sister is told, dresses for campus, tights, hem"]
  P2["7.4.2 The List<br/>study group takes off, the dean notices"]
  P3["7.4.3 The Pilot<br/>Veil in the lecture hall, second emitter on the Prof"]
  P4["7.4.4 The Dean's Visit<br/>the paper, and his ask: Fridays, alone"]
  P5["7.4.5 The Letter<br/>pilot study and dean's letter satisfy the lawyer"]
  S2(["Stage 2: Friday office hours<br/>the sexual part"]):::done

  G0[/"Sister stage 1 Yearning<br/>Souvenirs done"/]:::gate
  G1[/"Veil owned<br/>funding application mailed on letterhead"/]:::gate
  G2[/"Main 4.13 The Morning After<br/>lawyer hired"/]:::gate

  S0 -->|"1 day"| P1
  G0 -->|"required"| P1
  P1 -->|"college tutoring task done 10 times"| P2
  P2 --> P3
  G1 -->|"required"| P3
  P3 -->|"pilot running 2 weeks"| P4
  P4 -.->|"stays in the story as legal shield"| P5
  G2 -->|"required"| P5
  P4 --> S2
  P5 -.->|"unlocks the lawyer's defense in Main 4.13"| X1[/"Main 4.13"/]:::gate

  classDef done fill:#2c4a3e,stroke:#1cd88d,color:#fff
  classDef gate fill:#2b2b2b,stroke:#999,color:#ddd,stroke-dasharray:4 3
```

---

## Cross-line gates only

This chart drops everything inside a line and keeps the links between them. If a scene is stuck, look here for what it is waiting on.

```mermaid
flowchart LR
  subgraph Main
    m44["4.4 First Sale"]
    m45["4.5 The Gym"]
    m46["4.6 Morale"]
    m47["4.7 Diner aftermath"]
    m48["4.8 The Anchor"]
    m49["4.9 Profit Party"]
    m411["4.11 Retail Pitch"]
    m412["4.12 Night Shift"]
    m413["4.13 Morning After"]
  end
  subgraph Mom
    a57["5.7 Gym dinner"]
    a58["5.8 Catalyst Night"]
    a59["5.9 The Calendar"]
    a510["5.10 After Hours"]
    a511["5.11 Last Night"]
  end
  subgraph Sister
    b62["6.2 Souvenirs"]
    b66["6.6 Catalyst night"]
    b67["6.7 The Rooftop"]
    b68["6.8 Everything"]
    b69["6.9 Last Night"]
  end
  subgraph Boss
    o3["7.2.3 Arrangement"]
    o5["7.2.5 Introduction"]
  end
  subgraph Manager
    g3["7.3.3 The Incident"]
    g4["7.3.4 The Uniform"]
    g5["7.3.5 Closing Keys"]
  end
  subgraph Prof
    p1["7.4.1 Face of the Project"]
    p3["7.4.3 The Pilot"]
    p5["7.4.5 The Letter"]
  end
  subgraph Landlord
    l5["7.1.5 The Ask"]
  end

  m44 -.-> a57
  a57 --> m45
  g3 --> m47
  b62 -.-> g4
  b62 -.-> p1
  b66 -.-> g5
  m49 -.->|"Catalyst built"| a58
  m49 -.->|"Catalyst built"| b66
  b67 --> m411
  m48 -.->|"Anchor path"| a59
  a59 --> o3
  o3 --> a510
  a510 --> o5
  o5 --> a511
  o5 --> b69
  b68 --> b69
  m411 --> a511
  a511 --> m412
  b69 --> m412
  m412 --> m413
  p3 -.-> p5
  p5 -.-> m413
  a58 -.-> l5
  m411 -.-> l5
```

---

## Everything in one chart

All lines in one flowchart, starting from where the game stands now. The last scene already written in each line is the first node of its box (green pill). Cross-line requirements are drawn as direct arrows between the boxes, so there are no parallelogram gates here. Shapes are the same as above.

This one is big. In the VS Code preview, scroll and zoom, or paste the block into [mermaid.live](https://mermaid.live) for a pan-and-zoom view. If a renderer refuses it because of its size limit, the per-line charts above say the same thing.

```mermaid
flowchart TD
  NOW(["YOU ARE HERE<br/>content ends at: It'll be official, A Knock at Night,<br/>Good News, The Proposition, The Handover"]):::now

  subgraph MAING["MAIN LINE"]
    mS(["Done: It'll be official"]):::done
    m1["4.1 Crickets"]
    m2["4.2 The Veil<br/>team meeting"]
    m3["4.3 The Late Night<br/>vent off for one night"]
    m4["4.4 First Real Sale<br/>marketing firm"]
    m5["4.5 The Gym"]
    m6["4.6 Morale<br/>Darius pushes back"]
    mD1{"Let Darius in?"}:::choice
    m7["4.7 Diner aftermath<br/>chemistry matters"]
    m8["4.8 The Anchor"]
    m9["4.9 The Profit Party"]
    mD2{"Ethan asks<br/>for his piece"}:::choice
    mC(["Catalyst project completes<br/>Catalyst owned"]):::done
    m10["4.10 The Crack"]
    m10b["Player accuses Darius<br/>wrongly"]
    m11["4.11 The Retail Pitch"]
    m12["4.12 The Night Shift"]
    mD3{"Ethan calls<br/>11:40 pm"}:::choice
    m13["4.13 The Morning After"]
  end

  subgraph MOMG["MOM"]
    aS(["Done: A Knock at Night"]):::done
    a1["5.1 The Booze Night"]
    a2["5.2 Caught"]
    a3["5.3 Flirt Duty"]
    a4["5.4 Not Enough"]
    a5["5.5 The Silence"]
    a6["5.6 The Crawl"]
    a7["5.7 Client Entertainment<br/>the gym dinner"]
    aD1{"Push or<br/>pull back"}:::choice
    aH2{{"Stage 2 Willing"}}:::milestone
    a8["5.8 The Catalyst Night"]
    aE["Ethan asks Mom<br/>if she is okay"]
    a9["5.9 The Calendar"]
    aD2{"Tell her or<br/>use the Anchor"}:::choice
    aH3{{"Stage 3 Complicit<br/>Whenever unlocks"}}:::milestone
    a10["5.10 / 7.2.4 After Hours<br/>ends at the Boss's door"]
    a10b["Boss is strangely polite<br/>replaces After Hours"]
    a11["5.11 The Last Night"]
  end

  subgraph SISG["SISTER"]
    bS(["Done: Good News?"]):::done
    b1["6.1 The Ask<br/>Darius asks her out"]
    bD1{"Allow or block"}:::choice
    b2["6.2 Souvenirs<br/>the photos"]
    bH1{{"Stage 1 Yearning"}}:::milestone
    b3["6.3 Two Diaries"]
    b4["6.4 Send Me Something"]
    b5["6.5 What Are We"]
    bH2{{"Stage 2 Devoted"}}:::milestone
    b6["6.6 The Catalyst, first night"]
    b7["6.7 The Rooftop<br/>the signal"]
    b8["6.8 Everything"]
    bH3{{"Stage 3 Mine<br/>Wardrobe orders"}}:::milestone
    b9["6.9 The Last Night"]
  end

  subgraph LANDG["LANDLORD"]
    lS(["Done: weekly help tasks active"]):::done
    l1["7.1.1 The Helpers<br/>3 tiers inside the task"]
    l2["7.1.2 What He Saw"]
    l3["7.1.3 The Review<br/>wants a Veil"]
    l4["7.1.4 The Rival Tenant"]
    l5["7.1.5 The Ask<br/>Your mother. Alone. Saturday."]
  end

  subgraph BOSSG["BOSS"]
    oS(["Done: The Handover"]):::done
    o1["7.2.1 Support Review<br/>pills, the only one who resists"]
    o2["7.2.2 The Clip"]
    o3["7.2.3 The Arrangement"]
    oD1{"Sell it or<br/>break him"}:::choice
    o4b["The Anchor on the Boss"]
    o5["7.2.5 The Introduction<br/>the supplier's name"]
  end

  subgraph MANG["MANAGER"]
    gS(["Done: diner analysis<br/>shift task active"]):::done
    g1["7.3.1 Three Shifts<br/>weekly rule"]
    g2["7.3.2 The Debrief"]
    g3["7.3.3 The Incident"]
    g4["7.3.4 The Uniform"]
    g5["7.3.5 The Closing Keys"]
  end

  subgraph PROFG["PROF"]
    pS(["Done: The Proposition"]):::done
    p1["7.4.1 Face of the Project"]
    p2["7.4.2 The List"]
    p3["7.4.3 The Pilot"]
    p4["7.4.4 The Dean's Visit<br/>his ask: Fridays, alone"]
    p5["7.4.5 The Letter"]
  end

  S2(["STAGE 2<br/>Boss upstairs, Landlord on Saturday,<br/>Prof on Fridays, Manager at closing,<br/>the investigation, Ethan's rival"]):::done

  NOW --> mS
  NOW --> aS
  NOW --> bS
  NOW --> lS
  NOW --> oS
  NOW --> gS
  NOW --> pS

  %% main line
  mS -->|"about 1 week"| m1
  m1 -->|"no orders after a week"| m2
  m2 -->|"Veil project at 80 percent"| m3
  m3 -->|"Veil owned"| m4
  m4 -.->|"Rick asks for your consultant"| a7
  a7 -->|"gym dinner played"| m5
  m5 -->|"1 week of heavier workload"| m6
  m6 --> mD1
  mD1 -->|"half-truth: dariusAlly"| m7
  mD1 -->|"shut out: dariusSuspicious"| m7
  g3 -->|"required: Incident played"| m7
  o1 -.->|"the pills give the chemistry idea"| m7
  m7 -->|"budget and Brian free"| m8
  m8 -->|"30 days in the black"| m9
  m9 --> mD2
  mD2 -->|"give 2 percent"| mC
  mD2 -->|"stall"| mC
  mC -->|"a weekend, Ethan alone"| m10
  m10 --> m10b
  m10b -->|"fast forgiveness if dariusAlly"| m11
  b7 -->|"required: investor introduces the chain"| m11
  m11 -->|"demo prepared, trustedEthan"| m12
  a11 -->|"required"| m12
  b9 -->|"required"| m12
  m12 --> mD3
  mD3 -->|"answer: tomorrow"| m13
  mD3 -->|"ignore: voicemail"| m13
  p5 -.->|"lawyer needs proof of research"| m13
  m13 --> S2

  %% mom
  aS -->|"3 days"| a1
  a1 -->|"lust 60 or more, alone in the meeting room"| a2
  a2 -->|"5 handjobs"| a3
  a3 -->|"Flirt Duty done 3 times, lust 80 or more"| a4
  a4 -->|"automatic, 7 days"| a5
  a5 -->|"no contact for 7 days, a Friday"| a6
  a6 -->|"first blowjob done"| a7
  a7 --> aD1
  aD1 -->|"push: bigger contract, resistance up"| aH2
  aD1 -->|"pull back: smaller contract"| aH2
  aH2 -->|"bar full, resistance 50 or less"| a8
  mC -.->|"required: Catalyst owned"| a8
  a8 -.-> aE
  aE -.->|"feeds the Crack"| m10
  a8 -->|"7 days"| a9
  m8 -.->|"Anchor path needs the Anchor"| a9
  a9 --> aD2
  aD2 -->|"tell her part of the truth"| aH3
  aD2 -->|"use the Anchor, logs spike"| aH3
  aH3 -->|"Boss: Sell it"| a10
  aH3 -->|"Boss: broken"| a10b
  o3 --> oD1
  a10 -->|"After Hours done once"| a11
  a10b --> a11
  o5 -->|"required: supplier named"| a11
  m11 -->|"required: Retail Pitch done"| a11
  b8 -.->|"required: Sister Everything done"| a11

  %% sister
  bS -->|"5 days, Darius hired, rounds done 3 times"| b1
  b1 --> bD1
  bD1 -->|"allow: dariusDate"| b2
  bD1 -->|"block: dariusBlocked"| b2
  b2 -->|"7 days, bar full, photoTaken"| bH1
  bH1 --> b3
  b3 -->|"Internship Overview done 4 times"| b4
  b4 -->|"lust 60 or more, 2 diary entries"| b5
  b5 -->|"2 videos sent"| bH2
  mC -.->|"required: Catalyst owned"| bH2
  bH2 --> b6
  b6 -->|"exhibition 40 or more, investor lead"| b7
  m9 -.->|"investor lead comes from the party"| b7
  b7 -->|"stage 2 bar full"| b8
  b8 --> bH3
  bH3 --> b9
  o5 -->|"required: supplier named"| b9

  %% landlord
  lS -->|"weekly rule: visit or lose the discount"| l1
  l1 -->|"6 help tasks, tier 2 needs corruption 30"| l2
  l2 -->|"1 week"| l3
  m9 -.->|"company is clearly rich"| l3
  l3 -->|"rent due Monday, player at the office"| l4
  l4 -->|"1 week"| l5
  aH2 -.->|"Mom at stage 2 or more"| l5
  m11 -.->|"Retail Pitch done"| l5
  l5 --> S2

  %% boss
  oS -->|"support project 1 week, consultant task 3 times"| o1
  o1 -->|"5 days, Mom stage 1 or more"| o2
  o2 --> o3
  oD1 -->|"Sell it: Mom goes, price is contacts and the supplier"| a10
  oD1 -->|"Break him: needs the Anchor"| o4b
  m8 -.->|"Anchor built"| o4b
  o4b -->|"he names the supplier himself"| o5
  o4b -.->|"Mom skips After Hours"| a10b
  a10 -.->|"After Hours done"| o5

  %% manager
  gS --> g1
  g1 -->|"analysis done, 1 week"| g2
  m3 -.->|"Veil owned"| g2
  g2 -->|"Veil installed, 10 diner shifts"| g3
  g3 -->|"sales up on her days"| g4
  b2 -.->|"Sister stage 1, exhibition 30 or more"| g4
  g4 -->|"14 shifts in the new uniform"| g5
  bH2 -.->|"Sister stage 2"| g5
  g5 --> S2

  %% prof
  pS -->|"1 day"| p1
  b2 -.->|"Sister stage 1, Souvenirs done"| p1
  p1 -->|"college tutoring done 10 times"| p2
  p2 --> p3
  m3 -.->|"Veil owned, application on letterhead"| p3
  p3 -->|"pilot running 2 weeks"| p4
  p3 -.->|"pilot study is the shield"| p5
  p4 --> S2

  classDef now fill:#6b4100,stroke:#EAAF4C,color:#fff
  classDef done fill:#2c4a3e,stroke:#1cd88d,color:#fff
  classDef choice fill:#47306b,stroke:#b08bff,color:#fff
  classDef milestone fill:#6b4100,stroke:#EAAF4C,color:#fff
  style MAING fill:#1b2733,stroke:#456,color:#ddd
  style MOMG fill:#2d1f2a,stroke:#654,color:#ddd
  style SISG fill:#1f2d2a,stroke:#465,color:#ddd
  style LANDG fill:#2a2a1f,stroke:#665,color:#ddd
  style BOSSG fill:#2a1f1f,stroke:#655,color:#ddd
  style MANG fill:#1f2a2d,stroke:#456,color:#ddd
  style PROFG fill:#262033,stroke:#546,color:#ddd
```
