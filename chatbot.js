/* ==========================================================================
   Cargo Hub Assistant — hardcoded knowledge chatbot
   Mounted globally (loaded on every page via <script src="chatbot.js">).
   No external calls, no dependencies. Knowledge is limited to the
   Cargo Hub source material below — the assistant never invents facts.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------ *
   * 1. KNOWLEDGE BASE — organized by topic, not hundreds of if/else
   * ------------------------------------------------------------------ */

  var KB = {
    overview:
      "Cargo Hub is India's intelligent post-harvest infrastructure platform. It connects farmers, mandis, warehouses, cold storages and government infrastructure through one digital ecosystem.\n\nIt brings mandi scheduling, warehouse discovery, storage coordination, logistics and government scheme support into a single connected platform.",

    overviewHinglish:
      "Cargo Hub ek intelligent post-harvest infrastructure platform hai jo farmers, mandis, warehouses, cold storages aur government infrastructure ko ek hi digital ecosystem mein jodta hai.\n\nIsme mandi scheduling, warehouse discovery, storage coordination, logistics aur government scheme support — sab ek connected platform mein milte hain.",

    problem:
      "The core issue Cargo Hub addresses is fragmented coordination across India's post-harvest ecosystem — not simply a lack of physical infrastructure.\n\n• Harvest season congestion — long queues and unmanaged arrival peaks\n• Invisible warehouse capacity — no real-time visibility into availability, quality or pricing\n• Manual, paper-based booking processes\n• Underutilized village godowns sitting idle most of the year\n• Lack of demand forecasting\n• Fragmented access to government schemes",

    smartMandi: {
      main:
        "Smart Mandi digitizes the end-to-end mandi workflow, from arrival to unloading.\n\n• Harvest Slot Booking — farmers pre-register conflict-free arrival windows\n• Live Queue Management — real-time truck entry and sequencing\n• Predictive Crowd Management — AI-based arrival forecasting to reduce congestion\n• Faster Unloading — optimized bays and digital documentation\n\nExpected outcomes: reduced waiting time, better planning, and lower post-harvest spoilage.",
      hinglish:
        "Smart Mandi mandi ke pure workflow ko digitize karta hai — arrival se lekar unloading tak.\n\n• Harvest Slot Booking — farmers apna arrival window pehle se book kar sakte hain\n• Live Queue Management — real-time truck entry aur sequencing\n• Predictive Crowd Management — AI-based forecasting se bheed kam hoti hai\n• Faster Unloading — optimized bays aur digital documentation\n\nIska result: kam waiting time, behtar planning, aur kam spoilage.",
      booking:
        "Harvest Slot Booking lets farmers pre-register their arrival window with the mandi, giving them a pre-scheduled, conflict-free slot instead of arriving unannounced.",
      queue:
        "Live Queue Management gives real-time visibility into truck entry and sequencing at the mandi, so arrivals are coordinated rather than forming unmanaged queues.",
      crowd:
        "Predictive Crowd Management uses AI-based arrival forecasting to anticipate congestion and help balance load across the mandi, so peaks are managed proactively.",
      ai:
        "AI is used in Smart Mandi for predictive crowd management — forecasting arrival patterns to anticipate congestion and support load balancing, rather than reacting after queues have already formed."
    },

    storage: {
      main:
        "The Smart Storage Network gives visibility into certified warehouse capacity, quality ratings and transparent pricing.\n\n• Warehouse discovery by location, distance, capacity and storage type\n• Transparent, standardized pricing\n• Digital booking with instant confirmation and digital receipts\n• A Smart Allocation Engine that recommends the nearest certified alternative if a warehouse is full\n\nThis describes the platform's designed capability rather than a live, bookable inventory today.",
      hinglish:
        "Smart Storage Network certified warehouse capacity, quality rating aur transparent pricing ki visibility deta hai.\n\n• Location, distance, capacity aur storage type ke hisaab se warehouse discovery\n• Transparent, standardized pricing\n• Digital booking aur digital receipt\n• Smart Allocation Engine — agar ek warehouse full ho, to nearest certified alternative suggest karta hai",
      discovery:
        "Warehouse discovery lets users compare nearby storage options based on location, distance, capacity and storage type, so choosing a facility doesn't rely on manual coordination.",
      pricing:
        "The platform is designed for transparent, standardized storage pricing alongside digital booking — so pricing decisions don't depend on informal, case-by-case negotiation.",
      allocation:
        "Cargo Hub's Smart Allocation Engine is designed to recommend the nearest certified alternative warehouse when the first choice reaches capacity."
    },

    microWarehouse:
      "The Village Micro Warehouse Network activates underutilized village godowns instead of building new storage from scratch.\n\nProcess: Owner Registration → Inspection → Certification → Digital Listing → Farmer/FPO Booking → Income Generation for the owner.\n\nThe goal is to monetize idle rural storage, create a decentralized, inspected network, and expand storage accessibility without unnecessary new construction.",

    microWarehouseHinglish:
      "Village Micro Warehouse Network idle village godowns ko activate karta hai, naye construction ki jagah.\n\nProcess: Owner Registration → Inspection → Certification → Digital Listing → Farmer/FPO Booking → Owner ke liye Income.\n\nMaksad hai — idle rural storage ka istemaal, aur ek inspected, decentralized storage network banana.",

    government: {
      main:
        "Cargo Hub acts as a digital implementation layer for existing Government of India agricultural infrastructure programs — it does not replace them.\n\nPrograms referenced: Agriculture Infrastructure Fund (AIF), e-NAM, Negotiable Warehouse Receipt System (e-NWR), Farmer Producer Organisations (FPOs), and PM Kisan Sampada Yojana.\n\nPlatform-assisted workflows include eligibility checks, automated scheme matching, documentation support, guided submission, approval tracking, renewal alerts and compliance reminders.",
      hinglish:
        "Cargo Hub existing Government of India agricultural programs ke liye ek digital implementation layer ki tarah kaam karta hai — inhe replace nahi karta.\n\nSchemes: AIF, e-NAM, e-NWR, FPOs, aur PM Kisan Sampada Yojana.\n\nPlatform eligibility check, scheme matching, documentation support, application assistance aur approval tracking mein madad karta hai.",
      replace:
        "No — Cargo Hub is designed to strengthen the implementation of existing government initiatives rather than replace them. It does not claim government ownership or guaranteed approval of any application.",
      aif:
        "AIF (Agriculture Infrastructure Fund) is one of the government programs Cargo Hub's platform helps connect to field-level operations through eligibility checks and documentation support."
    },

    stakeholders: {
      farmers: "• Reduced waiting time\n• Better harvest planning\n• Transparent storage access",
      warehouseOwners: "• Asset monetization\n• Increased booking volume\n• Better facility utilization",
      villageEntrepreneurs: "• Income generation from idle godowns that would otherwise sit unused",
      fpos: "• Centralized storage planning\n• Collective bargaining power\n• Operational efficiency",
      transporters: "• Route optimization\n• Better scheduling\n• Reduced empty runs",
      governmentBody: "• Better infrastructure utilization\n• Data-driven policy planning",
      banks: "• Warehouse visibility usable for collateral assessment\n• Easier agricultural financing",
      buyers: "• Direct warehouse access\n• Supply-chain transparency\n• Better market visibility"
    },

    revenue:
      "Cargo Hub's source describes a diversified revenue model across the post-harvest ecosystem:\n\n• Shared storage charges (weekly/monthly, per pallet or square foot)\n• Inward & outward handling (loading, unloading, consolidation, destuffing)\n• E-commerce fulfilment (pick, pack, returns for D2C and marketplace sellers)\n• Managed warehouse manpower (contracted, trained, SLA-based teams)\n• WMS / QR inventory subscriptions\n• Audits & training\n• Transport coordination / margin\n\nThese are business-plan revenue streams, not confirmed current earnings.",

    investment:
      "The source describes a proposed US $1M seed deployment, allocated across areas such as warehouse racking/equipment/CCTV/safety, working capital reserve, deposits/rent/utilities, WMS & QR/dashboard, operations team & training, sales & customer acquisition, contingency reserve, compliance/insurance/legal, and central management & finance.\n\nThis is the source's proposed allocation plan — not funds already raised or spent.",

    projections:
      "The source's five-year business-plan revenue projection (in the source's stated units) is:\n\nYear 1: 0.4 · Year 2: 1.3 · Year 3: 3.75 · Year 4: 9.2 · Year 5: 20.35 — with a 5-year total of 35.\n\nOn the user side, the source projects total unique business users growing from 45 in Year 1, to 350 by Year 3, to 2,000+ by Year 5.\n\nThese are business-plan projections, not achieved results — and I won't invent a currency the source doesn't explicitly state.",

    navigation: {
      mandi: 'You can start from the "Book Mandi Slot" button in the navigation bar. It lets farmers pre-register their arrival window and manage mandi entry more efficiently — no booking is completed by asking me about it.',
      warehouse: 'You can start from the "List Warehouse" button in the navigation bar to register a facility. I can\'t submit that on your behalf, but I can open the form for you.',
      pages:
        "Here's where things live on the site:\n\n• Platform overview — Platform page\n• Smart Mandi — Smart Mandi page\n• Smart Storage Network — Storage Network page\n• Government Integration — Government page\n• Ecosystem & stakeholders — Ecosystem page\n• Revenue model — Business page\n• Company background — About page"
    }
  };

  /* ------------------------------------------------------------------ *
   * 2. INTENT DEFINITIONS — keyword-based matching (EN + Hinglish)
   * ------------------------------------------------------------------ */

  var INTENTS = [
    {
      id: "GREETING",
      keywords: ["hi", "hii", "hiii", "hello", "hey", "namaste", "good morning", "good evening", "good afternoon"]
    },
    {
      id: "OVERVIEW",
      keywords: ["what is cargo hub", "what does cargo hub do", "explain cargo hub", "about cargo hub",
        "cargo hub kya", "kya karta hai", "purpose kya hai", "why was cargo hub", "what exactly is cargo hub",
        "who is cargo hub for", "what problem does cargo hub"]
    },
    {
      id: "PROBLEM",
      keywords: ["problem", "why was cargo hub created", "fragmentation", "fragmented", "congestion", "spoilage cause",
        "kya samasya", "samasya kya"]
    },
    {
      id: "SMART_MANDI",
      keywords: ["smart mandi", "mandi work", "mandi operations", "how does mandi", "mandi digitize", "mandi kaise",
        "overcrowded", "over crowded", "mandi congestion"]
    },
    {
      id: "MANDI_BOOKING",
      keywords: ["mandi slot", "book mandi", "slot booking", "arrival window", "harvest slot", "mandi slot kaise book",
        "how can farmers book"]
    },
    {
      id: "LIVE_QUEUE",
      keywords: ["live queue", "queue management", "truck entry", "truck sequencing", "queue visibility"]
    },
    {
      id: "PREDICTIVE_CROWD",
      keywords: ["predictive crowd", "crowd management", "arrival forecasting", "congestion prediction",
        "mandi overcrowded", "mandi gets overcrowded"]
    },
    {
      id: "WAREHOUSE",
      keywords: ["warehouse", "storage network", "find storage", "find warehouse", "storage near me",
        "warehouse kaise milta", "warehouse discovery", "godown"]
    },
    {
      id: "WAREHOUSE_PRICING",
      keywords: ["warehouse pricing", "storage pricing", "warehouse price", "storage cost", "storage rate"]
    },
    {
      id: "WAREHOUSE_FULL",
      keywords: ["warehouse full", "warehouse is full", "allocation engine", "smart allocation", "nearest alternative"]
    },
    {
      id: "MICRO_WAREHOUSE",
      keywords: ["village micro warehouse", "micro warehouse", "idle godown", "village godown", "village warehouse",
        "godown income", "warehouse certification"]
    },
    {
      id: "GOVERNMENT",
      keywords: ["government scheme", "government integration", "government program", "aif", "e-nam", "enam",
        "e-nwr", "enwr", "fpo scheme", "pm kisan", "sampada yojana", "government approval", "replace government",
        "government schemes ka integration"]
    },
    {
      id: "FARMER",
      keywords: ["help farmers", "farmer benefit", "farmers benefit", "how does cargo hub help farmers",
        "farmer ko cargo hub se", "fayda hai"]
    },
    {
      id: "FPO",
      keywords: ["fpo benefit", "fpos benefit", "cooperative", "fpo"]
    },
    {
      id: "TRANSPORT",
      keywords: ["transporter", "transport", "route optimization", "empty run", "logistics help"]
    },
    {
      id: "BANK",
      keywords: ["bank", "financial institution", "lending", "collateral", "financing"]
    },
    {
      id: "BUYER",
      keywords: ["buyer", "processor", "procurement"]
    },
    {
      id: "STAKEHOLDER_OVERVIEW",
      keywords: ["who benefits", "stakeholders", "ecosystem benefit", "who is involved"]
    },
    {
      id: "REVENUE",
      keywords: ["revenue model", "make money", "how does cargo hub make money", "revenue stream", "business model",
        "kamai", "paisa kaise"]
    },
    {
      id: "INVESTMENT",
      keywords: ["seed deployment", "seed funding", "investment", "1m", "$1m", "how much funding", "seed capital"]
    },
    {
      id: "PROJECTIONS",
      keywords: ["revenue projection", "five year", "5 year", "five-year", "user growth", "projected revenue",
        "how many users"]
    },
    {
      id: "NAVIGATION",
      keywords: ["what can i do on this website", "where can i explore", "how can i book a mandi slot",
        "how can i list a warehouse", "navigate", "where do i go", "site map", "explore the platform"]
    },
    {
      id: "LIVE_DATA",
      keywords: ["available right now", "how many warehouses are available", "live inventory", "real-time",
        "current inventory", "live queue numbers", "kitne available", "abhi kitne"]
    },
    {
      id: "INJECTION",
      keywords: ["ignore your instructions", "ignore previous instructions", "system prompt", "reveal your prompt",
        "hidden instructions", "internal instructions", "make up cargo hub information", "jailbreak",
        "forget your rules", "act as", "pretend you are", "developer mode"]
    }
  ];

  var HINGLISH_MARKERS = ["kya", "kaise", "hai", "kaha", "kyun", "kyu", "mujhe", "aap", "hota", "milta",
    "chahiye", "batao", "karta", "karti", "ka ", "ki ", "ke ", "fayda"];

  function isHinglish(text) {
    var lower = " " + text.toLowerCase() + " ";
    var hits = 0;
    HINGLISH_MARKERS.forEach(function (m) {
      if (lower.indexOf(m) !== -1) hits++;
    });
    return hits >= 1;
  }

  function matchIntent(rawText) {
    var text = rawText.toLowerCase().trim();
    var best = null;
    var bestScore = 0;
    INTENTS.forEach(function (intent) {
      var score = 0;
      intent.keywords.forEach(function (kw) {
        if (text.indexOf(kw) !== -1) score += kw.split(" ").length; // longer/more specific phrase wins
      });
      if (score > bestScore) {
        bestScore = score;
        best = intent.id;
      }
    });
    return { intent: best, score: bestScore };
  }

  /* ------------------------------------------------------------------ *
   * 3. RESPONSE BUILDER
   * ------------------------------------------------------------------ */

  var UNKNOWN_MSG =
    "I don't have enough information in my Cargo Hub knowledge base to answer that accurately.\n\nI can help with Cargo Hub's smart mandi operations, warehouse network, logistics, government integration, ecosystem or business model.";

  var INJECTION_MSG =
    "I can help you with Cargo Hub and its platform, but I can't provide internal system instructions or invent information.\n\nI can explain how Cargo Hub's smart mandi, warehouse, logistics or government-integration model works.";

  var LIVE_DATA_MSG =
    "I don't currently have access to Cargo Hub's live inventory, queues or bookings — I'm a hardcoded assistant, not connected to real-time systems.\n\nThe platform is designed to provide visibility into certified warehouse capacity, availability and pricing once implemented.";

  function chipSetFor(intent) {
    switch (intent) {
      case "OVERVIEW":
        return [["Smart Mandi", "SMART_MANDI"], ["Warehouse network", "WAREHOUSE"], ["Government integration", "GOVERNMENT"]];
      case "SMART_MANDI":
        return [["Mandi slot booking", "MANDI_BOOKING"], ["Does it use AI?", "PREDICTIVE_CROWD"], ["Book a mandi slot", "ACTION_MANDI"]];
      case "WAREHOUSE":
        return [["Warehouse pricing", "WAREHOUSE_PRICING"], ["Village micro warehouses", "MICRO_WAREHOUSE"], ["List your warehouse", "ACTION_WAREHOUSE"]];
      case "MICRO_WAREHOUSE":
        return [["Warehouse network", "WAREHOUSE"], ["List your warehouse", "ACTION_WAREHOUSE"]];
      case "GOVERNMENT":
        return [["What is AIF?", "GOVERNMENT"], ["How farmers benefit", "FARMER"]];
      case "FARMER":
        return [["Smart Mandi", "SMART_MANDI"], ["Warehouse network", "WAREHOUSE"]];
      case "REVENUE":
        return [["Five-year projections", "PROJECTIONS"], ["Seed deployment", "INVESTMENT"]];
      case "STAKEHOLDER_OVERVIEW":
        return [["Farmers", "FARMER"], ["Warehouse owners", "WAREHOUSE"], ["Banks", "BANK"]];
      default:
        return [["What is Cargo Hub?", "OVERVIEW"], ["Smart Mandi", "SMART_MANDI"], ["Warehouse network", "WAREHOUSE"]];
    }
  }

  function respond(intent, hinglish, subScore, rawText) {
    var text;
    switch (intent) {
      case "GREETING":
        text = hinglish
          ? "Namaste! Main Cargo Hub Assistant hoon. Main aapko smart mandi, storage, logistics aur agricultural infrastructure ecosystem samjha sakta hoon."
          : "Hello! I'm the Cargo Hub Assistant. I can help you understand our smart mandi, storage, logistics and agricultural infrastructure ecosystem.";
        break;
      case "OVERVIEW":
        text = hinglish ? KB.overviewHinglish : KB.overview;
        break;
      case "PROBLEM":
        text = KB.problem;
        break;
      case "SMART_MANDI":
        text = hinglish ? KB.smartMandi.hinglish : KB.smartMandi.main;
        break;
      case "MANDI_BOOKING":
        text = KB.smartMandi.booking;
        break;
      case "LIVE_QUEUE":
        text = KB.smartMandi.queue;
        break;
      case "PREDICTIVE_CROWD":
        text = KB.smartMandi.crowd;
        break;
      case "WAREHOUSE":
        text = hinglish ? KB.storage.hinglish : KB.storage.main;
        break;
      case "WAREHOUSE_PRICING":
        text = KB.storage.pricing;
        break;
      case "WAREHOUSE_FULL":
        text = KB.storage.allocation;
        break;
      case "MICRO_WAREHOUSE":
        text = hinglish ? KB.microWarehouseHinglish : KB.microWarehouse;
        break;
      case "GOVERNMENT":
        if (rawText.indexOf("replace") !== -1) text = KB.government.replace;
        else if (rawText.indexOf("aif") !== -1) text = KB.government.aif;
        else text = hinglish ? KB.government.hinglish : KB.government.main;
        break;
      case "FARMER":
        text = (hinglish ? "Cargo Hub farmers ke liye post-harvest journey ko aasan banata hai.\n\n" : "Cargo Hub is designed to reduce friction after harvest for farmers.\n\n") + KB.stakeholders.farmers;
        break;
      case "FPO":
        text = "For FPOs & Cooperatives:\n\n" + KB.stakeholders.fpos;
        break;
      case "TRANSPORT":
        text = "For Transporters:\n\n" + KB.stakeholders.transporters;
        break;
      case "BANK":
        text = "For Banks & Financial Institutions:\n\n" + KB.stakeholders.banks;
        break;
      case "BUYER":
        text = "For Buyers & Processors:\n\n" + KB.stakeholders.buyers;
        break;
      case "STAKEHOLDER_OVERVIEW":
        text = "Cargo Hub is designed to create value across the whole ecosystem:\n\n• Farmers — " + KB.stakeholders.farmers.replace(/\n/g, ", ").replace(/•/g, "") +
          "\n• Warehouse owners — asset monetization and better utilization\n• Village entrepreneurs — income from idle godowns\n• FPOs — collective planning and bargaining power\n• Transporters — route optimization\n• Government — better infrastructure utilization\n• Banks — warehouse visibility for financing\n• Buyers & processors — supply-chain transparency";
        break;
      case "REVENUE":
        text = KB.revenue;
        break;
      case "INVESTMENT":
        text = KB.investment;
        break;
      case "PROJECTIONS":
        text = KB.projections;
        break;
      case "NAVIGATION":
        text = KB.navigation.pages;
        break;
      case "LIVE_DATA":
        text = LIVE_DATA_MSG;
        break;
      case "INJECTION":
        text = INJECTION_MSG;
        break;
      default:
        text = UNKNOWN_MSG;
    }
    return text;
  }

  /* ------------------------------------------------------------------ *
   * 4. CONVERSATION STATE
   * ------------------------------------------------------------------ */

  var state = {
    opened: false,
    lastIntent: null,
    messages: []
  };

  var CONTINUATION_WORDS = ["it", "this", "that", "iska", "uska", "isse", "isme", "vo", "wo", "yeh"];

  function looksLikeContinuation(text) {
    var lower = text.toLowerCase();
    return CONTINUATION_WORDS.some(function (w) { return lower.indexOf(w) !== -1; });
  }

  function resolveIntent(text) {
    var lower = text.toLowerCase();

    // Highest priority: security / prompt-injection guard
    var inj = matchIntent(text);
    if (inj.intent === "INJECTION" && inj.score > 0) return { intent: "INJECTION", hinglish: false };

    var hing = isHinglish(text);
    var matched = matchIntent(text);

    if (matched.score > 0) {
      return { intent: matched.intent, hinglish: hing };
    }

    // No direct keyword hit — only treat as a contextual follow-up when the
    // message actually contains a referring word (it/this/iska/etc). A short
    // but unrelated question must still fall through to "unknown".
    if (state.lastIntent && looksLikeContinuation(text)) {
      // sub-topic detection within the last topic
      if (state.lastIntent === "SMART_MANDI" || state.lastIntent === "MANDI_BOOKING" ||
          state.lastIntent === "LIVE_QUEUE" || state.lastIntent === "PREDICTIVE_CROWD") {
        if (lower.indexOf("ai") !== -1) return { intent: "PREDICTIVE_CROWD", hinglish: hing };
        if (lower.indexOf("wait") !== -1 || lower.indexOf("reduce") !== -1) return { intent: "SMART_MANDI", hinglish: hing };
        if (lower.indexOf("queue") !== -1) return { intent: "LIVE_QUEUE", hinglish: hing };
        return { intent: "SMART_MANDI", hinglish: hing };
      }
      if (state.lastIntent === "WAREHOUSE" || state.lastIntent === "WAREHOUSE_PRICING" || state.lastIntent === "WAREHOUSE_FULL") {
        if (lower.indexOf("price") !== -1 || lower.indexOf("cost") !== -1) return { intent: "WAREHOUSE_PRICING", hinglish: hing };
        if (lower.indexOf("full") !== -1) return { intent: "WAREHOUSE_FULL", hinglish: hing };
        return { intent: "WAREHOUSE", hinglish: hing };
      }
      if (state.lastIntent) return { intent: state.lastIntent, hinglish: hing };
    }

    return { intent: null, hinglish: hing };
  }

  /* ------------------------------------------------------------------ *
   * 5. UI CONSTRUCTION
   * ------------------------------------------------------------------ */

  var ICON_CHAT =
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="chb-icon-chat" aria-hidden="true">' +
    '<circle cx="6" cy="12" r="2.1" fill="#fff"/>' +
    '<circle cx="18" cy="6.5" r="2.1" fill="#E3A13B"/>' +
    '<circle cx="18" cy="17.5" r="2.1" fill="#1C8C99"/>' +
    '<path d="M8 11.2L16 7" stroke="rgba(255,255,255,0.55)" stroke-width="1.4"/>' +
    '<path d="M8 12.8L16 16.6" stroke="rgba(255,255,255,0.55)" stroke-width="1.4"/>' +
    "</svg>";

  var ICON_CLOSE =
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="chb-icon-open" aria-hidden="true">' +
    '<path d="M6 6L18 18M18 6L6 18" stroke="#fff" stroke-width="2" stroke-linecap="round"/>' +
    "</svg>";

  var ICON_HEADER =
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<circle cx="6" cy="12" r="1.9" fill="#fff"/>' +
    '<circle cx="18" cy="6.5" r="1.9" fill="#E3A13B"/>' +
    '<circle cx="18" cy="17.5" r="1.9" fill="#1C8C99"/>' +
    '<path d="M8 11.2L16 7" stroke="rgba(255,255,255,0.6)" stroke-width="1.3"/>' +
    '<path d="M8 12.8L16 16.6" stroke="rgba(255,255,255,0.6)" stroke-width="1.3"/>' +
    "</svg>";

  var ICON_SEND =
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M4 12L20 4L14 20L11 13L4 12Z" fill="#fff"/>' +
    "</svg>";

  var ICON_TRASH =
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M5 7H19M9 7V5.5C9 5 9.4 4.5 10 4.5H14C14.6 4.5 15 5 15 5.5V7M7 7L7.6 18.5C7.65 19.35 8.35 20 9.2 20H14.8C15.65 20 16.35 19.35 16.4 18.5L17 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
    "</svg>";

  var SUGGESTED_CHIPS = [
    ["What is Cargo Hub?", "OVERVIEW"],
    ["How does Smart Mandi work?", "SMART_MANDI"],
    ["Find out about warehouses", "WAREHOUSE"],
    ["How does the platform help farmers?", "FARMER"],
    ["What government programs are integrated?", "GOVERNMENT"],
    ["How does Cargo Hub generate revenue?", "REVENUE"]
  ];

  function el(tag, className, html) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function buildLauncher() {
    var btn = el("button", "chb-launcher");
    btn.type = "button";
    btn.setAttribute("aria-label", "Open Cargo Hub Assistant");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = ICON_CHAT + ICON_CLOSE + '<span class="chb-dot" aria-hidden="true"></span>';
    return btn;
  }

  function buildWindow() {
    var win = el("div", "chb-window");
    win.setAttribute("role", "dialog");
    win.setAttribute("aria-modal", "false");
    win.setAttribute("aria-label", "Cargo Hub Assistant chat");
    win.hidden = false;

    win.innerHTML =
      '<div class="chb-header">' +
      '<div class="chb-header-icon">' + ICON_HEADER + "</div>" +
      '<div class="chb-header-text">' +
      '<div class="chb-title">Cargo Hub Assistant <span class="chb-status-dot" aria-hidden="true"></span></div>' +
      '<div class="chb-subtitle">Intelligent Post-Harvest Assistant</div>' +
      "</div>" +
      '<div class="chb-header-actions">' +
      '<button type="button" class="chb-icon-btn" id="chb-clear" aria-label="Clear chat">' + ICON_TRASH + "</button>" +
      '<button type="button" class="chb-icon-btn" id="chb-close" aria-label="Close chat">' +
      '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
      "</button>" +
      "</div>" +
      "</div>" +
      '<div class="chb-body" id="chb-body" tabindex="-1"></div>' +
      '<div class="chb-disclaimer">Answers are based on Cargo Hub\u2019s platform overview, not live data.</div>' +
      '<div class="chb-footer">' +
      '<input type="text" class="chb-input" id="chb-input" placeholder="Ask about Cargo Hub..." aria-label="Message Cargo Hub Assistant" autocomplete="off" />' +
      '<button type="button" class="chb-send" id="chb-send" aria-label="Send message">' + ICON_SEND + "</button>" +
      "</div>";

    return win;
  }

  /* ------------------------------------------------------------------ *
   * 6. RENDERING HELPERS
   * ------------------------------------------------------------------ */

  var bodyEl, inputEl, sendBtn, dotEl, launcherBtn, windowEl;

  function scrollToBottom() {
    bodyEl.scrollTop = bodyEl.scrollHeight;
  }

  function escapeHtml(str) {
    var d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  function addMessage(text, who) {
    var msg = el("div", "chb-msg chb-" + who, escapeHtml(text));
    bodyEl.appendChild(msg);
    scrollToBottom();
    return msg;
  }

  function addChips(pairs, label) {
    var wrap = el("div", "chb-chips");
    if (label) wrap.appendChild(el("div", "chb-chip-label", escapeHtml(label)));
    pairs.forEach(function (pair) {
      var chip = el("button", "chb-chip", escapeHtml(pair[0]));
      chip.type = "button";
      chip.addEventListener("click", function () {
        handleUserText(pair[0], pair[1]);
      });
      wrap.appendChild(chip);
    });
    bodyEl.appendChild(wrap);
    scrollToBottom();
  }

  function addActionButton(label, key) {
    var btn = el("button", "chb-action-btn", escapeHtml(label));
    btn.type = "button";
    btn.addEventListener("click", function () {
      try {
        var trigger = document.querySelector('[data-open-modal="' + key + '"]');
        if (trigger) {
          closeChat();
          trigger.click();
        }
      } catch (err) {
        addMessage("Something went wrong opening that form. Please use the button in the navigation bar instead.", "bot");
      }
    });
    bodyEl.appendChild(btn);
    scrollToBottom();
  }

  function showTyping() {
    var t = el("div", "chb-typing", "<span></span><span></span><span></span>");
    t.id = "chb-typing-indicator";
    bodyEl.appendChild(t);
    scrollToBottom();
    return t;
  }

  function removeTyping() {
    var t = document.getElementById("chb-typing-indicator");
    if (t) t.remove();
  }

  function renderWelcome() {
    bodyEl.innerHTML = "";
    addMessage("Welcome to Cargo Hub.", "bot");
    addMessage("I can help you understand our smart mandi, storage, logistics and agricultural infrastructure platform.", "bot");
    addChips(SUGGESTED_CHIPS, "Try asking:");
  }

  /* ------------------------------------------------------------------ *
   * 7. MESSAGE HANDLING
   * ------------------------------------------------------------------ */

  function handleUserText(displayText, forcedIntent) {
    if (!displayText || !displayText.trim()) return;
    addMessage(displayText, "user");
    inputEl.value = "";
    sendBtn.disabled = true;

    var typingEl = showTyping();

    setTimeout(function () {
      try {
        removeTyping();

        var intent, hinglish;
        if (forcedIntent && forcedIntent.indexOf("ACTION_") !== 0) {
          intent = forcedIntent;
          hinglish = false;
        } else {
          var resolved = resolveIntent(displayText);
          intent = resolved.intent;
          hinglish = resolved.hinglish;
        }

        // Direct navigation actions from chips
        if (forcedIntent === "ACTION_MANDI") {
          addMessage(KB.navigation.mandi, "bot");
          addActionButton("Book Mandi Slot", "mandi");
          sendBtn.disabled = false;
          return;
        }
        if (forcedIntent === "ACTION_WAREHOUSE") {
          addMessage(KB.navigation.warehouse, "bot");
          addActionButton("List Warehouse", "warehouse");
          sendBtn.disabled = false;
          return;
        }

        // Live/real-time data guard applies regardless of matched intent
        var lower = displayText.toLowerCase();
        if (lower.indexOf("real-time") !== -1 || lower.indexOf("real time") !== -1 ||
            lower.indexOf("right now") !== -1 || lower.indexOf("live ") !== -1 ||
            lower.indexOf("abhi kitne") !== -1 || lower.indexOf("kitne available") !== -1) {
          if (intent !== "GREETING") intent = "LIVE_DATA";
        }

        // Navigation action prompts
        if (intent === "MANDI_BOOKING" && (lower.indexOf("how") !== -1 || lower.indexOf("kaise") !== -1)) {
          addMessage(respond("MANDI_BOOKING", hinglish, 0, lower), "bot");
          addActionButton("Book Mandi Slot", "mandi");
          addChips(chipSetFor("SMART_MANDI"));
          state.lastIntent = "SMART_MANDI";
          sendBtn.disabled = false;
          return;
        }
        if ((intent === "MICRO_WAREHOUSE" || intent === "WAREHOUSE") &&
            (lower.indexOf("list") !== -1 || lower.indexOf("register") !== -1)) {
          addMessage(KB.navigation.warehouse, "bot");
          addActionButton("List Warehouse", "warehouse");
          addChips(chipSetFor("WAREHOUSE"));
          state.lastIntent = "WAREHOUSE";
          sendBtn.disabled = false;
          return;
        }

        if (!intent) {
          addMessage(UNKNOWN_MSG, "bot");
          addChips(SUGGESTED_CHIPS.slice(0, 3), "You could ask:");
          sendBtn.disabled = false;
          return;
        }

        var replyText = respond(intent, hinglish, 0, lower);
        addMessage(replyText, "bot");

        if (intent !== "INJECTION" && intent !== "LIVE_DATA" && intent !== "GREETING") {
          state.lastIntent = intent;
          addChips(chipSetFor(intent), "Explore next:");
        } else if (intent === "GREETING") {
          addChips(SUGGESTED_CHIPS, "Try asking:");
        }
      } catch (err) {
        removeTyping();
        var errMsg = el("div", "chb-msg chb-bot", "Something went wrong. Please try again.");
        bodyEl.appendChild(errMsg);
        scrollToBottom();
      } finally {
        sendBtn.disabled = false;
      }
    }, 550);
  }

  /* ------------------------------------------------------------------ *
   * 8. OPEN / CLOSE
   * ------------------------------------------------------------------ */

  function openChat() {
    document.body.classList.add("chb-open");
    launcherBtn.setAttribute("aria-expanded", "true");
    if (dotEl) dotEl.classList.add("chb-hide");
    if (!state.opened) {
      state.opened = true;
      renderWelcome();
    }
    setTimeout(function () { inputEl.focus(); }, 250);
  }

  function closeChat() {
    document.body.classList.remove("chb-open");
    launcherBtn.setAttribute("aria-expanded", "false");
  }

  function toggleChat() {
    if (document.body.classList.contains("chb-open")) closeChat();
    else openChat();
  }

  /* ------------------------------------------------------------------ *
   * 9. INIT
   * ------------------------------------------------------------------ */

  function init() {
    try {
      launcherBtn = buildLauncher();
      windowEl = buildWindow();
      document.body.appendChild(windowEl);
      document.body.appendChild(launcherBtn);

      bodyEl = windowEl.querySelector("#chb-body");
      inputEl = windowEl.querySelector("#chb-input");
      sendBtn = windowEl.querySelector("#chb-send");
      dotEl = launcherBtn.querySelector(".chb-dot");

      launcherBtn.addEventListener("click", toggleChat);
      windowEl.querySelector("#chb-close").addEventListener("click", closeChat);
      windowEl.querySelector("#chb-clear").addEventListener("click", function () {
        state.lastIntent = null;
        renderWelcome();
      });

      sendBtn.addEventListener("click", function () {
        handleUserText(inputEl.value);
      });
      inputEl.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          handleUserText(inputEl.value);
        }
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && document.body.classList.contains("chb-open")) {
          closeChat();
        }
      });
    } catch (err) {
      // Fail gracefully — never break the host page.
      /* eslint-disable no-console */
      if (window.console) console.error("Cargo Hub Assistant failed to initialize:", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
