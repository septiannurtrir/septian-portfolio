export const boboboxData = {
  slug: "bobobox",
  name: "Bobobox Indonesia",

  hero: {
    title: "Building Growth at Indonesia's Leading Hospitality Tech",
    subtitle:
      "3+ years shipping product across the full AARRR funnel — from acquisition and activation through retention and revenue attribution.",
  },

  about:
    "Bobobox is Indonesia's leading hospitality tech startup, operating a network of pod hotels across the country. The company combines hardware, software, and data to deliver a seamless, tech-forward hospitality experience. As a Growth PM, I was embedded in the product team and owned initiatives spanning the entire user lifecycle — from paid acquisition and onboarding through engagement, retention, and revenue.",

  responsibilities: [
    {
      title: "Product Strategy & Roadmap",
      content:
        "Owned the growth product roadmap. Prioritized initiatives using behavioral data from Mixpanel, CleverTap, and Metabase. Aligned cross-functional stakeholders across engineering, marketing, and data teams on quarterly goals and sprint plans.",
    },
    {
      title: "CRM & Lifecycle Marketing",
      content:
        "Led product ownership of the email notification system and in-app messaging stack. Defined segmentation logic, trigger rules, and A/B test frameworks across CRM tools including CleverTap and Netcore.",
    },
    {
      title: "Analytics & Attribution",
      content:
        "Managed the full MMP migration from AppsFlyer to Singular. Designed the event taxonomy, maintained event schema documentation, and coordinated implementation across iOS, Android, and 4 ad platforms.",
    },
    {
      title: "Data & Experimentation",
      content:
        "Defined KPIs and success metrics for all growth initiatives. Ran A/B tests across email, push notifications, and in-app flows. Built executive dashboards in Looker Studio and Metabase for visibility into retention and revenue metrics.",
    },
  ],

  experience: [
    {
      title: "PM Consultant · Nov 2025 – Present",
      content:
        "Part-time remote consulting role. Advising on growth strategy, analytics infrastructure, and product experimentation. Continuing key growth initiatives while exploring new opportunities in senior Growth PM roles.",
    },
    {
      title: "Product Manager · May 2022 – Nov 2025",
      content:
        "Full-time PM role owning growth product across the AARRR funnel. Shipped 4+ concurrent initiatives at any given time. Worked with cross-functional teams spanning engineering, design, data, and marketing to drive measurable outcomes in retention, revenue, and engagement.",
    },
  ],

  impact: [
    {
      title: "Email Open Rate: 15% → 61.5%",
      content:
        "Rebuilt the end-to-end email notification system from scratch. Audited all 14 email types, redesigned the customer notification journey, and ran A/B tests on subject lines, send times, and segmentation. Also reduced email infrastructure costs by 26.5%.",
    },
    {
      title: "App Revamp CTR: +56.8%",
      content:
        "Led product decisions for a major app revamp. Improved information architecture, streamlined the booking flow, and introduced behavioral personalization. CTR on core actions increased 56.8%.",
    },
    {
      title: "QRIS Payment Adoption: 31%+ of Transactions",
      content:
        "Integrated QRIS (Indonesia's national QR payment standard) into the booking flow. Drove adoption through UX optimization and targeted nudges. QRIS now accounts for 31%+ of all transactions.",
    },
    {
      title: "NPS Score: 84.5%",
      content:
        "Maintained a net promoter score of 84.5% across the platform, reflecting high user satisfaction with the product experience despite rapid feature velocity.",
    },
    {
      title: "Website Traffic: +700k Visits",
      content:
        "Contributed to a +700k increase in website visits through product-led growth initiatives and improved organic discoverability tied to app revamp and content strategy.",
    },
    {
      title: "Attributed Revenue Restored: ~Rp500M/month",
      content:
        "The MMP migration from AppsFlyer to Singular restored visibility into ~Rp500M/month in previously unattributed revenue, enabling the marketing team to make confident budget allocation decisions.",
    },
  ],

  projects: [
    {
      slug: "enma-email-system",
      tag: "Growth & CRM",
      title: "ENMA Email System",
      description:
        "First PM owner of an unowned email system. Audited 14 email types, rebuilt the customer notification journey from scratch, A/B tested subject lines. Open rate 15%→61.5%, cost -26.5%.",
      images: [
        { src: null, title: "Email System Audit", caption: "14 email types mapped across triggers, content, and performance metrics" },
        { src: null, title: "A/B Testing Framework", caption: "Subject line and send-time optimisation across key audience segments" },
        { src: null, title: "Rebuilt Notification Journey", caption: "Post-redesign: 61.5% open rate, infrastructure cost −26.5%" },
      ],
      problem:
        "The email system had no clear ownership and had grown organically without strategy. 14 different email types existed across the platform — many with inconsistent branding, broken links, and poor deliverability. Open rates were stuck at 15%, below industry average. No A/B testing framework was in place, and there was no visibility into which emails were driving conversions.",
      approach:
        "Took ownership as the first PM to formally own the email channel. Conducted a full audit of all 14 email types — mapping triggers, content, audience segments, and performance metrics. Identified the top 5 highest-impact emails and prioritized them for redesign. Established a testing framework for subject lines, send timing, and segmentation. Evaluated ESPs for cost and deliverability.",
      solution:
        "Rebuilt the email notification journey from scratch with a clear taxonomy and ownership model. Implemented A/B testing across subject lines and send times. Redesigned templates with improved CTAs and mobile-first layouts. Migrated to a more cost-effective ESP offering better deliverability and analytics integration.",
      outcomes:
        "Open rate improved from 15% to 61.5% — a 4x improvement. Email infrastructure costs reduced by 26.5%. Established a repeatable testing and optimization process that the team continues to run today.",
    },
    {
      slug: "singular-mmp-migration",
      tag: "Analytics & Attribution",
      title: "Singular MMP Migration",
      description:
        "Led full PRD for migration from AppsFlyer to Singular. Cut costs 50%, restored ~Rp500M/month attributed revenue visibility, rebuilt event schema across iOS, Android, and 4 ad platforms.",
      images: [
        { src: null, title: "Migration Architecture & PRD", caption: "Full scope: event schema rebuild, rollback plan, and ad platform reconnection" },
        { src: null, title: "Attribution Dashboard", caption: "~Rp500M/month in revenue visibility restored post-migration" },
      ],
      problem:
        "The team was using AppsFlyer as its MMP but had significant attribution gaps — roughly Rp500M/month in revenue was going unattributed, making marketing budget decisions unreliable. AppsFlyer costs were also increasing. A migration had been discussed for months but lacked a clear owner and technical spec.",
      approach:
        "Took ownership of the migration as PM. Wrote a full PRD covering: current-state audit, gap analysis, vendor evaluation (Singular vs. alternatives), migration timeline, rollback plan, and success metrics. Coordinated with iOS, Android, and data engineers to rebuild the event schema. Worked directly with 4 ad platforms to reconfigure postback connections.",
      solution:
        "Executed a phased migration to Singular with zero attribution gaps during transition. Rebuilt the event schema with a cleaner taxonomy and full documentation. Integrated with all 4 ad platforms and validated attribution accuracy post-migration through a two-week parallel-run period.",
      outcomes:
        "MMP costs cut by 50%. ~Rp500M/month in previously unattributed revenue restored, enabling the marketing team to optimize budget allocation with confidence. The rebuilt event schema now serves as the source of truth for the analytics team.",
    },
    {
      slug: "customer-data-platform",
      tag: "Data & Retention",
      title: "Customer Data Platform",
      description:
        "PM for full CDP discovery + PRD. Centralized user identity, behavioral data, RFM segmentation. Designed filter engine, executive dashboard, PII governance workflow.",
      images: [
        { src: null, title: "CDP Architecture Overview", caption: "Identity stitching, behavioural event ingestion, and RFM segmentation engine" },
        { src: null, title: "Marketer Filter Engine", caption: "Self-serve segment builder with real-time audience size preview" },
      ],
      problem:
        "User data was fragmented across multiple systems — booking platform, CRM tools, email provider, and ad platforms. No single source of truth existed for user identity or behavioral history. This made segmentation, personalization, and retention campaigns difficult to execute with confidence or speed.",
      approach:
        "Led a full discovery process: interviewed internal stakeholders across marketing, data, and product. Mapped the existing data landscape. Evaluated CDP vendors and assessed build-vs-buy tradeoffs. Wrote a comprehensive PRD covering user identity resolution, behavioral event ingestion, RFM segmentation logic, and data governance.",
      solution:
        "Designed the product spec for a CDP that centralizes user identity and behavioral data. Key features: identity stitching across anonymous and known users, real-time behavioral event ingestion, RFM segmentation engine, a self-serve filter UI for marketers, an executive dashboard for retention KPIs, and a PII governance workflow for compliance.",
      outcomes:
        "PRD delivered and approved by stakeholders. Handoff to engineering in progress. Expected outcomes: improved segmentation precision, faster campaign execution (from days to hours), and a foundation for personalization at scale.",
    },
    {
      slug: "dmdu-quiz",
      tag: "Acquisition & Brand",
      title: "DMDU Traveler Personality Quiz",
      description:
        "End-to-end PM for interactive quiz → personalized travel recommendations. Delivered cross-functionally. Key decision: chose low-effort UX workaround over costly fix — same outcome, fraction of the cost.",
      images: [
        { src: null, title: "Quiz Entry Screen", caption: "Interactive personality quiz with 5 distinct traveller archetypes" },
        { src: null, title: "Personality Result Card", caption: "Personalised Bobobox property recommendations per archetype" },
        { src: null, title: "Social Share Mechanic", caption: "Shareable result cards driving organic top-of-funnel acquisition" },
      ],
      problem:
        "Bobobox needed a brand activation campaign to drive top-of-funnel awareness and engagement with a younger, travel-oriented demographic. The challenge was creating something interactive and shareable without a large engineering budget or timeline.",
      approach:
        "Scoped and led cross-functional delivery of an interactive personality quiz. Defined the quiz logic, scoring system, and 5 traveler personality archetypes. Collaborated with design on the UX flow and with marketing on content and sharing mechanics. During development, identified a UX issue that would have required expensive engineering work — surfaced an alternative workaround that delivered the same user experience at a fraction of the cost.",
      solution:
        "Launched a shareable traveler personality quiz that generates personalized Bobobox property recommendations based on quiz results. Built with a lean tech stack. The UX workaround saved significant engineering time with no noticeable impact on the user experience.",
      outcomes:
        "Campaign launched successfully, delivering on brand awareness KPIs. The cost-saving judgment call on the UX workaround is now referenced by the team as a framework for evaluating build complexity vs. outcome equivalence.",
    },
  ],
};

export const companies = [boboboxData];

export const sideProjectsData = [
  {
    title: "Growth Automation Toolkit",
    tag: "Automation · AI",
    subtitle: "Building the internal growth tools I wished I had earlier.",
    description:
      "N8N workflows and Claude-powered prompts for repeatable growth tasks: cohort analysis, push notification copywriting, and campaign QA.",
    images: [
      {
        src: null,
        title: "Workflow Overview",
        subtitle:
          "N8N canvas showing the cohort analysis automation pipeline — segments pull from Mixpanel, results push to Slack.",
      },
      {
        src: null,
        title: "Claude Prompt Library",
        subtitle:
          "Reusable Claude prompts for push copy generation, A/B hypothesis writing, and pre-launch QA checklists.",
      },
      {
        src: null,
        title: "Campaign QA Dashboard",
        subtitle:
          "Automated checks that run before every campaign send: audience size validation, link integrity, and copy review.",
      },
    ],
  },
  {
    title: "PM Portfolio Site",
    tag: "Product · Engineering",
    subtitle: "A portfolio that ships like a product — built the same way I build everything else.",
    description:
      "This site. Built with Next.js 16, Tailwind v4, and Claude Code. Designed to reflect how I work: fast, data-forward, and with AI in the loop.",
    images: [
      {
        src: null,
        title: "Homepage Design",
        subtitle:
          "Dark minimal layout with teal accent, single-scroll architecture. Hero image + metrics + work cards.",
      },
      {
        src: null,
        title: "Work Case Studies",
        subtitle:
          "Accordion-based project detail pages with alternating image layouts and problem/approach/solution/outcomes sections.",
      },
    ],
  },
];
