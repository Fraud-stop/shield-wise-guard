export interface ScamReport {
  id: string;
  url?: string;
  phoneNumber?: string;
  description: string;
  category: string;
  reportCount: number;
  firstReported: Date;
  lastReported: Date;
  riskLevel: "low" | "medium" | "high" | "critical";
  verified: boolean;
}

export interface FraudTrend {
  id: string;
  province: string;
  scamCount: number;
  category: string;
  month: string;
  year: number;
}

export interface SafetyTip {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Hardcoded scam reports data
export const scamReports: ScamReport[] = [
  {
    id: "1",
    url: "shein-sa-deals.co.za",
    description: "Fake Shein website asking for banking details",
    category: "E-commerce Fraud",
    reportCount: 127,
    firstReported: new Date("2024-01-15"),
    lastReported: new Date("2024-02-20"),
    riskLevel: "critical",
    verified: true,
  },
  {
    id: "2",
    url: "nedbank-secure-login.com",
    description: "Phishing site mimicking Nedbank login",
    category: "Banking Fraud",
    reportCount: 89,
    firstReported: new Date("2024-02-01"),
    lastReported: new Date("2024-02-18"),
    riskLevel: "critical",
    verified: true,
  },
  {
    id: "3",
    phoneNumber: "+27 11 234 5678",
    description: "Caller claiming to be from SARS requesting tax information",
    category: "Government Impersonation",
    reportCount: 156,
    firstReported: new Date("2024-01-10"),
    lastReported: new Date("2024-02-19"),
    riskLevel: "high",
    verified: true,
  },
  {
    id: "4",
    url: "elon-musk-crypto-giveaway.net",
    description: "Fake crypto giveaway promoted on TikTok",
    category: "Cryptocurrency Scam",
    reportCount: 203,
    firstReported: new Date("2024-01-20"),
    lastReported: new Date("2024-02-21"),
    riskLevel: "critical",
    verified: true,
  },
  {
    id: "5",
    url: "absa-mobile-banking.org",
    description: "Fraudulent ABSA mobile banking site",
    category: "Banking Fraud",
    reportCount: 74,
    firstReported: new Date("2024-02-05"),
    lastReported: new Date("2024-02-17"),
    riskLevel: "high",
    verified: true,
  },
];

// Fraud trends data
export const fraudTrends: FraudTrend[] = [
  { id: "1", province: "Gauteng", scamCount: 1250, category: "Banking", month: "Jan", year: 2024 },
  { id: "2", province: "Western Cape", scamCount: 890, category: "Banking", month: "Jan", year: 2024 },
  { id: "3", province: "KwaZulu-Natal", scamCount: 670, category: "Banking", month: "Jan", year: 2024 },
  { id: "4", province: "Eastern Cape", scamCount: 340, category: "Banking", month: "Jan", year: 2024 },
  { id: "5", province: "Limpopo", scamCount: 180, category: "Banking", month: "Jan", year: 2024 },
  { id: "6", province: "Mpumalanga", scamCount: 150, category: "Banking", month: "Jan", year: 2024 },
  { id: "7", province: "North West", scamCount: 120, category: "Banking", month: "Jan", year: 2024 },
  { id: "8", province: "Free State", scamCount: 95, category: "Banking", month: "Jan", year: 2024 },
  { id: "9", province: "Northern Cape", scamCount: 45, category: "Banking", month: "Jan", year: 2024 },

  { id: "10", province: "Gauteng", scamCount: 1420, category: "Banking", month: "Feb", year: 2024 },
  { id: "11", province: "Western Cape", scamCount: 950, category: "Banking", month: "Feb", year: 2024 },
  { id: "12", province: "KwaZulu-Natal", scamCount: 720, category: "Banking", month: "Feb", year: 2024 },
  { id: "13", province: "Eastern Cape", scamCount: 380, category: "Banking", month: "Feb", year: 2024 },
  { id: "14", province: "Limpopo", scamCount: 200, category: "Banking", month: "Feb", year: 2024 },
];

// Safety tips data
export const safetyTips: SafetyTip[] = [
  {
    id: "1",
    title: "Verify Before You Click",
    description: "Always check URLs carefully. Look for spelling errors, extra characters, or suspicious domains.",
    category: "General",
    icon: "link",
  },
  {
    id: "2",
    title: "Banks Never Ask for PINs",
    description: "No legitimate bank will ever ask for your PIN, password, or OTP via email, SMS, or phone.",
    category: "Banking",
    icon: "shield",
  },
  {
    id: "3",
    title: "Check HTTPS Security",
    description: "Always ensure websites have HTTPS (lock icon) before entering sensitive information.",
    category: "Web Safety",
    icon: "lock",
  },
  {
    id: "4",
    title: "Too Good to Be True",
    description: "If an offer seems too good to be true, it probably is. Be skeptical of amazing deals.",
    category: "General",
    icon: "alert-triangle",
  },
  {
    id: "5",
    title: "Report Suspicious Activity",
    description: "Report scams immediately to help protect others. Every report helps build our community shield.",
    category: "Community",
    icon: "flag",
  },
  {
    id: "6",
    title: "Verify Caller Identity",
    description: "If someone calls claiming to be from a bank or government, hang up and call them back directly.",
    category: "Phone Safety",
    icon: "phone",
  },
];

// Quiz questions data
export const quizQuestions: QuizQuestion[] = [
  {
    id: "1",
    question: "Which of these is a legitimate ABSA website?",
    options: [
      "absa-secure-banking.com",
      "absa.co.za",
      "absa-mobile-banking.net",
      "secure-absa.org"
    ],
    correctAnswer: 1,
    explanation: "ABSA's official website is absa.co.za. Always check for the correct .co.za domain for South African banks."
  },
  {
    id: "2",
    question: "What should you do if you receive a suspicious link via WhatsApp?",
    options: [
      "Click it to see what it is",
      "Forward it to friends to check",
      "Report it and don't click",
      "Click it from a different device"
    ],
    correctAnswer: 2,
    explanation: "Never click suspicious links. Report them to help protect the community."
  },
  {
    id: "3",
    question: "A caller says they're from your bank and need your PIN. What do you do?",
    options: [
      "Give them the PIN since they called me",
      "Hang up and call the bank directly",
      "Ask them to verify their identity first",
      "Give them half the PIN to be safe"
    ],
    correctAnswer: 1,
    explanation: "Banks NEVER ask for PINs over the phone. Always hang up and call your bank directly using the number on your card."
  }
];

// Check link function (simulated)
export function checkLink(url: string): {
  safe: boolean;
  riskLevel: "safe" | "suspicious" | "dangerous";
  reason: string;
  details: string;
} {
  const suspiciousDomains = [
    "shein-sa-deals.co.za",
    "nedbank-secure-login.com",
    "elon-musk-crypto-giveaway.net",
    "absa-mobile-banking.org",
    "fnb-secure-portal.net"
  ];

  const safeDomains = [
    "absa.co.za",
    "nedbank.co.za",
    "fnb.co.za",
    "standardbank.co.za",
    "capitecbank.co.za",
    "shein.com",
    "takealot.com"
  ];

  // Remove protocol and get domain
  const domain = url.replace(/^https?:\/\//, "").split("/")[0];

  if (suspiciousDomains.includes(domain)) {
    return {
      safe: false,
      riskLevel: "dangerous",
      reason: "Known fraudulent website",
      details: `This domain has been reported ${Math.floor(Math.random() * 200) + 50} times by our community as a scam.`
    };
  }

  if (safeDomains.includes(domain)) {
    return {
      safe: true,
      riskLevel: "safe",
      reason: "Verified legitimate website",
      details: "This is a verified legitimate website that is safe to visit."
    };
  }

  // Heuristic checks
  if (domain.includes("secure") || domain.includes("login") || domain.includes("bank")) {
    return {
      safe: false,
      riskLevel: "suspicious",
      reason: "Suspicious domain characteristics",
      details: "This domain uses suspicious keywords that are often used in phishing attempts."
    };
  }

  if (domain.length > 50 || domain.split(".").length > 3) {
    return {
      safe: false,
      riskLevel: "suspicious",
      reason: "Suspicious domain structure",
      details: "This domain has an unusual structure that may indicate a scam."
    };
  }

  return {
    safe: true,
    riskLevel: "safe",
    reason: "No immediate threats detected",
    details: "This website appears safe, but always exercise caution when entering personal information."
  };
}