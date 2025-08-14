graph TD
    %% --- Node Definitions ---
    CS1["Contract Sheets"]
    OTC["OTC/ECN"]
    EX["Exchange data"]
    CS2["Contract Sheets"]
    BCS["Bilateral Customer<br>Submissions"]
    AOC["Advisory or<br>Confirmation<br>via message<br>or web"]
    Reports["Intraday and<br>EOD Position<br>Reports"]
    DRN["Delivery/Reclaim<br>Notification"]
    DTC["DTC Delivery"]
    NYW["NYW"]
    ESS["ESS"]
    TP["Two Participants<br>agree to<br>cancel/close a<br>matched obligation"]
    SCNSR["Sent to<br>CNS and Risk"]
    CNS_exits["CNS exits"]
    ACATS["ACATS non-CNS"]
    RDI["Receive /<br>Deliver<br>Instructions<br>and Auto DOs"]
    CNSE["CNS Eligibility"]

    %% --- Invisible Node for Forking Arrows ---
    p1(( ))
    style p1 fill:black,stroke:black,stroke-width:2px,width:1px,height:1px

    %% --- Subgraphs for Visual Grouping ---
    subgraph " "
        style BlueBox fill:#e6e6fa,stroke:#0000ff,stroke-width:2px
        UTC["UTC"]
    end

    subgraph " "
        style RedBox fill:#ffe4e1,stroke:#ff0000,stroke-width:2px
        CMU["CMU<br>RTTM**"]
    end

    subgraph " "
        style DashedBox stroke:#9370db,stroke-width:2px,stroke-dasharray: 5 5,fill:none
        RepCTS["Reported on CTS"]
        BOT["Balance<br>Order TFT"]
        NSCC["NSCC Balance<br>Orders Netted"]
        CNS["CNS"]
    end

    subgraph " "
        style GreenBox fill:#f0fff0,stroke:#008000,stroke-width:2px
        OWC["OW<br>Comparison"]
        OWR["OW Repository<br>(Open obligations)"]
        Items["Items > 2 days"]
        RECAPS["RECAPS<br>Process"]
        RECAPed["RECAP'ed item<br>OPEN in OW"]
    end

    %% --- Connections ---
    CS1 & OTC & EX --> UTC
    CMU --> CS2
    UTC & CMU --> p1

    p1 --> RepCTS & BOT & NSCC & CNS & ACATS

    RepCTS & BOT & NSCC & CNS_exits & RDI --> OWR
    CNS --> CNS_exits
    ACATS --> RDI

    BCS --> OWC
    OWC --> AOC
    OWC --> OWR

    OWR -- "Daily" --> Reports
    OWR --> DRN
    DRN -.-> DTC & NYW & ESS

    OWR -. "Frequently" .-> Items
    Items --> RECAPS
    RECAPS --> RECAPed
    RECAPed -.-> OWR

    OWR --> CNSE
    CNSE --> SCNSR

    TP -.-> OWR

    %% --- Style Definitions ---
    classDef BlueBox fill:#e6e6fa,stroke:#0000ff,stroke-width:2px
    classDef RedBox fill:#ffe4e1,stroke:#ff0000,stroke-width:2px
    classDef GreenBox fill:#f0fff0,stroke:#008000,stroke-width:2px
    classDef DashedBox stroke:#9370db,stroke-width:2px,stroke-dasharray: 5 5,fill:none

    %% --- Apply Styles ---
    class UTC BlueBox
    class CMU RedBox
    class OWC,OWR,Items,RECAPS,RECAPed GreenBox
    class RepCTS,BOT,NSCC,CNS DashedBox
