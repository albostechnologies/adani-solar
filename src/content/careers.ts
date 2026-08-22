import { mediaAssets as m } from "@/lib/media";

export interface JobOpening {
  id: string;
  title: string;
  department: "Engineering" | "Manufacturing" | "Sales" | "R&D" | "Operations" | "Finance" | "HR" | "IT";
  location: "Mundra, Gujarat" | "Ahmedabad, Gujarat" | "Hyderabad, Telangana" | "Bengaluru, Karnataka" | "Remote";
  type: "Full-time" | "Contract" | "Internship";
  experience: string;
  posted: string; // ISO date
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
}

export const careersContent = {
  hero: {
    title: "Build the Future of Solar with Us",
    subtitle:
      "Join a team building India's solar manufacturing capabilities. Explore roles across engineering, operations, sales, and support.",
    backgroundImage: m.about.facility,
    cta: "View Open Roles",
    ctaRoute: "careers" as const,
  },

  culture: {
    title: "Why Adani Solar?",
    subtitle: "We don't just manufacture solar modules , we build careers, communities, and a cleaner tomorrow.",
    pillars: [
      {
        icon: "TrendingUp",
        title: "Accelerated Growth",
        description:
          "Fast-track your career with structured learning paths, mentorship from industry veterans, and cross-functional rotations across our value chain.",
      },
      {
        icon: "Globe",
        title: "Global Exposure",
        description:
          "Work with international clients across 20+ countries, partner with global tech leaders, and represent India'solar manufacturing on the world stage.",
      },
      {
        icon: "Leaf",
        title: "Purpose-Driven Work",
        description:
          "Every role contributes to offsetting 13.6M tonnes of CO₂ annually. Your daily work literally powers a greener planet for future generations.",
      },
      {
        icon: "Shield",
        title: "Holistic Wellbeing",
        description:
          "Comprehensive health insurance for family, on-site fitness centers, mental health support, and parental leave that exceeds industry norms.",
      },
    ],
  },

  benefits: {
    title: "Benefits That Matter",
    subtitle: "Comprehensive package designed for you and your family",
    items: [
      { icon: "Heart", title: "Health Coverage", description: "Family floater medical insurance up to ₹10L + critical illness cover" },
      { icon: "Users", title: "Parental Leave", description: "26 weeks maternity, 6 weeks paternity, plus childcare support" },
      { icon: "TrendingUp", title: "Learning Budget", description: "₹50,000 annual L&D budget for courses, certifications, conferences" },
      { icon: "Sun", title: "Solar Subsidy", description: "Up to 50% subsidy on rooftop solar for your home" },
      { icon: "DollarSign", title: "Performance Bonus", description: "Up to 25% of CTC based on individual + company performance" },
      { icon: "Leaf", title: "Green Commute", description: "EV charging on campus + shuttle service from major city hubs" },
    ],
  },

  stats: {
    sectionTitle: "Our People, By the Numbers",
    items: [
      { value: 5000, unit: "+", label: "Employees", icon: "Users" },
      { value: 32, unit: "%", label: "Women Workforce", icon: "Users" },
      { value: 14, unit: "", label: "Avg Years Experience", icon: "TrendingUp" },
      { value: 95, unit: "%", label: "Retention Rate", icon: "Shield" },
    ],
  },

  jobs: [
    {
      id: "ENG-001",
      title: "Senior Solar Cell Process Engineer",
      department: "Engineering",
      location: "Mundra, Gujarat",
      type: "Full-time",
      experience: "5-8 years",
      posted: "2026-08-10",
      summary:
        "Lead TOPCon cell process optimization for our 4 GW line. Drive efficiency gains, defect reduction, and yield improvements through DOE and statistical process control.",
      responsibilities: [
        "Own TOPCon cell process from diffusion to metallization",
        "Lead cross-functional DOE initiatives to push cell efficiency beyond 25.5%",
        "Collaborate with equipment vendors on next-gen tool qualifications",
        "Mentor junior process engineers and review technical reports",
        "Drive root cause analysis for yield excursions using 8D methodology",
      ],
      requirements: [
        "B.Tech/M.Tech in Materials Science, Chemical Engineering, or related field",
        "5-8 years in c-Si solar cell manufacturing, with 2+ years in TOPCon",
        "Strong statistical background (DOE, SPC, Minitab/JMP)",
        "Experience with Alpine, Centrotherm, or Schmid equipment preferred",
      ],
      niceToHave: ["Six Sigma Black Belt", "Publications in PVSC/IEEE PVSC", "Experience with HJT processes"],
    },
    {
      id: "MFG-014",
      title: "Manufacturing Shift Manager",
      department: "Manufacturing",
      location: "Mundra, Gujarat",
      type: "Full-time",
      experience: "8-12 years",
      posted: "2026-08-08",
      summary:
        "Lead a 200+ headcount shift team across module assembly lines. Ensure safety, quality, and throughput targets are met while developing next-gen line leaders.",
      responsibilities: [
        "Manage end-to-end shift operations for 2 GW module assembly",
        "Drive OEE above 85% through systematic problem-solving",
        "Ensure 100% safety compliance and lead weekly safety walks",
        "Develop shift leaders through structured coaching and feedback",
        "Coordinate with planning, quality, and engineering for daily priorities",
      ],
      requirements: [
        "B.Tech in Mechanical/Electrical/Industrial Engineering",
        "8-12 years in high-volume manufacturing, automotive or electronics preferred",
        "Demonstrated leadership of 100+ headcount teams",
        "Lean Six Sigma Green Belt minimum",
        "Willingness to work rotational shifts",
      ],
      niceToHave: ["APICS certification", "Experience with SAP PP/MM", "TPM implementation experience"],
    },
    {
      id: "SAL-022",
      title: "Key Account Manager , Utilities",
      department: "Sales",
      location: "Bengaluru, Karnataka",
      type: "Full-time",
      experience: "6-10 years",
      posted: "2026-08-12",
      summary:
        "Own relationships with India's top utility-scale developers (SECI, NTPC, Adani Green, ReNew). Drive module volume commitments and manage complex RFPs.",
      responsibilities: [
        "Achieve annual volume target of 1.5 GW to utility developers",
        "Build executive-level relationships with top 10 utility customers",
        "Lead RFP response strategy with cross-functional bid team",
        "Negotiate long-term supply agreements with margin protection",
        "Provide market intelligence feedback to product and planning teams",
      ],
      requirements: [
        "MBA from Tier-1/Tier-2 B-school, or B.Tech with 6+ years sales experience",
        "6-10 years B2B sales in solar/renewables, with utility customer exposure",
        "Strong commercial acumen , P&L, contract structuring, hedging",
        "Willingness to travel 50%+ across India",
      ],
      niceToHave: ["Existing relationships with SECI/NTPC procurement teams", "Experience with module pricing models"],
    },
    {
      id: "RND-007",
      title: "R&D Scientist , Perovskite Tandem Cells",
      department: "R&D",
      location: "Hyderabad, Telangana",
      type: "Full-time",
      experience: "4-7 years",
      posted: "2026-08-15",
      summary:
        "Lead perovskite deposition process development for our next-gen tandem cell program. Target commercial-ready 30%+ efficient tandem architecture by 2027.",
      responsibilities: [
        "Develop scalable perovskite deposition (blade coating, slot-die, evaporation)",
        "Characterize films using XRD, PL, TRPL, SEM, and UV-Vis",
        "Design and execute stability tests (ISOS protocols)",
        "Publish in top journals (Nature Energy, Joule, Advanced Materials)",
        "Collaborate with academic partners (IIT Bombay, NREL)",
      ],
      requirements: [
        "PhD in Physics, Chemistry, Materials Science, or related field",
        "4-7 years post-doc or industry experience in perovskite PV",
        "Hands-on experience with solution-processed perovskite devices",
        "Track record of publications in Q1 journals",
      ],
      niceToHave: ["Experience with tandem integration", "Knowledge of encapsulation technologies", "Familiarity with ALD processes"],
    },
    {
      id: "OPS-031",
      title: "Supply Chain Analyst",
      department: "Operations",
      location: "Ahmedabad, Gujarat",
      type: "Full-time",
      experience: "2-4 years",
      posted: "2026-08-14",
      summary:
        "Optimize end-to-end supply chain for raw materials (silicon, glass, EVA, backsheets). Drive inventory turns, reduce lead times, and ensure supply continuity.",
      responsibilities: [
        "Manage weekly MRP runs and resolve exception messages",
        "Analyze supplier performance and lead quarterly business reviews",
        "Develop inventory optimization models (safety stock, EOQ)",
        "Coordinate with logistics on inbound and outbound shipments",
        "Build dashboards for daily supply chain KPIs",
      ],
      requirements: [
        "B.Tech/B.E. + MBA, or B.Com with supply chain certifications",
        "2-4 years in supply chain planning, manufacturing preferred",
        "Advanced Excel + Power BI/Tableau proficiency",
        "Experience with SAP MM/PP modules",
      ],
      niceToHave: ["APICS CPIM/CSCP", "Python/SQL skills for data analysis"],
    },
    {
      id: "IT-019",
      title: "Full-Stack Developer , Manufacturing IT",
      department: "IT",
      location: "Remote",
      type: "Full-time",
      experience: "3-6 years",
      posted: "2026-08-13",
      summary:
        "Build MES dashboards, mobile apps for line operators, and integrate IoT sensors with our analytics platform. Your code will run on factory floors across 4 GW of capacity.",
      responsibilities: [
        "Develop React/Next.js front-ends for MES dashboards",
        "Build Node.js/Python microservices for IoT data ingestion",
        "Integrate with SAP, OSIsoft PI, and Inductive Automation Ignition",
        "Optimize SQL queries on time-series data (10M+ rows/day)",
        "Implement CI/CD pipelines for factory deployments",
      ],
      requirements: [
        "B.Tech in CS/IT/ECE, or equivalent experience",
        "3-6 years full-stack development (React + Node.js/Python)",
        "Strong SQL skills, PostgreSQL preferred",
        "Experience with REST APIs and message queues (Kafka/RabbitMQ)",
      ],
      niceToHave: ["Experience with MES/SCADA systems", "Kubernetes/Docker", "Grafana/InfluxDB for time-series"],
    },
    {
      id: "FIN-008",
      title: "Financial Analyst , Capex & Project Finance",
      department: "Finance",
      location: "Ahmedabad, Gujarat",
      type: "Full-time",
      experience: "4-7 years",
      posted: "2026-08-09",
      summary:
        "Evaluate capex proposals for capacity expansions (₹500Cr+ projects), build financial models for project finance, and present to CFO and Board.",
      responsibilities: [
        "Build detailed financial models for capex proposals (IRR, NPV, payback)",
        "Coordinate with banks/ECAs for project finance term sheets",
        "Track project execution vs. financial plan, flag variances",
        "Prepare board-level presentations for major investments",
        "Monitor forex exposure on imported equipment",
      ],
      requirements: [
        "CA / MBA Finance from Tier-1 B-school",
        "4-7 years in project finance / corporate FP&A",
        "Advanced Excel modeling, PowerPoint storytelling",
        "Understanding of solar/renewables capex structure preferred",
      ],
      niceToHave: ["CFA Level 2+", "Experience with ECB/PCFB fundraising"],
    },
    {
      id: "HR-011",
      title: "Talent Acquisition Partner , Engineering",
      department: "HR",
      location: "Mundra, Gujarat",
      type: "Full-time",
      experience: "5-8 years",
      posted: "2026-08-11",
      summary:
        "Own end-to-end recruitment for engineering roles (50+ hires annually). Partner with hiring managers, build talent pipelines, and elevate our employer brand.",
      responsibilities: [
        "Manage full-cycle recruitment for 50+ engineering positions annually",
        "Build talent pipelines for niche roles (TOPCon, perovskite, MES)",
        "Partner with hiring managers on JD, sourcing strategy, interviews",
        "Drive employer branding initiatives (LinkedIn, hackathons, campus)",
        "Track time-to-hire, cost-per-hire, and quality-of-hire metrics",
      ],
      requirements: [
        "MBA HR, or B.Tech + HR certification",
        "5-8 years TA experience, manufacturing/engineering hiring preferred",
        "Strong sourcing skills (LinkedIn Recruiter, Naukri, GitHub)",
        "Excellent stakeholder management and communication",
      ],
      niceToHave: ["Experience with high-volume campus hiring", "Greenhouse/Lever ATS"],
    },
  ] as JobOpening[],

  internships: {
    title: "Internship & Graduate Programs",
    subtitle: "Launch your career with structured programs designed for fresh graduates and final-year students",
    programs: [
      {
        name: "Surya Tech Internship",
        duration: "6 months",
        eligibility: "Final-year B.Tech/M.Tech",
        description:
          "Work on real projects across cell process, module engineering, and quality. Top performers get pre-placement offers.",
        stipend: "₹35,000/month",
      },
      {
        name: "Adani Solar Graduate Engineer Program",
        duration: "12 months rotational",
        eligibility: "Recent B.Tech graduates",
        description:
          "Four 3-month rotations across manufacturing, R&D, quality, and supply chain. Mentorship from senior leadership.",
        stipend: "₹8.5 LPA CTC post-completion",
      },
      {
        name: "Surya MBA Leadership Program",
        duration: "18 months",
        eligibility: "MBA from Tier-1/Tier-2 B-schools",
        description:
          "Three rotations across strategy, sales, and operations. Direct exposure to CXO leadership and strategic projects.",
        stipend: "₹18 LPA CTC post-completion",
      },
    ],
  },
};
