# 🛡️ CyberSentinel AI

> **An AI-Powered Web Security Assessment & Threat Intelligence Platform built with React, Node.js, Express, and Ollama.**

CyberSentinel AI is a full-stack cybersecurity platform that combines traditional security scanning with local AI-powered analysis using **Ollama**. It helps users perform comprehensive web security assessments by integrating reconnaissance, vulnerability detection, reputation analysis, and AI-assisted threat interpretation into a single, intuitive dashboard.

Unlike conventional scanners, CyberSentinel AI leverages a locally hosted Large Language Model (LLM) through Ollama to explain vulnerabilities, recommend remediation strategies, and provide contextual security insights while keeping all AI analysis local.

---

# 🚀 Features

- 🤖 AI Security Analyst (Powered by Ollama)
- 🌐 URL Security Scanner
- 🔎 Website Technology Detection
- 🔌 Network Port Scanner
- 🛡️ CVE Detection & Analysis
- 🎣 Phishing Detection
- 🌍 DNS Lookup
- 🌐 IP Intelligence Scanner
- ⚠️ URL Reputation & Blacklist Checking
- 📊 Threat History Dashboard
- 📈 Interactive Threat Visualization
- 💡 AI-Powered Security Recommendations

---

# 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js

### AI

- Ollama
- Local Large Language Model (LLM)

### Cybersecurity

- Nmap
- CVE APIs
- URL Reputation APIs
- DNS Resolution
- HTTP Requests
- Network Reconnaissance

### Development Tools

- Git
- GitHub
- VS Code

---

# 📂 Project Structure

```
CyberSentinel-AI/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── scanners/
│   ├── package.json
│   └── server.js
│
├── screenshots/
│   ├── dashboard.png
│   ├── portscanner.png
│   ├── web-security.png
│   ├── cve.png
│   ├── phishing.png
│   ├── dns.png
│   ├── ip-scanner.png
│   └── history.png
│
├── README.md
└── .gitignore
```

---

# 🏗️ Architecture

```
                    Target URL
                         │
                         ▼
               URL Security Scanner
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
 Technology        Port Scanner      DNS/IP Lookup
 Detection
        │                │                │
        └────────────────┼────────────────┘
                         ▼
        CVE & Reputation Analysis Engine
                         ▼
          Ollama AI Security Analyst
                         ▼
    Threat Assessment & Remediation Advice
                         ▼
         Interactive Security Dashboard
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/phoenix19-h/CyberSentinel-AI.git
```

## Backend Setup

```bash
cd backend
npm install
npm start
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will typically run at:

```
http://localhost:5173
```

---

# 📸 Screenshots

## Dashboard

![Dashboard](screenshots/dashboard.png)

---

## Port Scanner

![Port Scanner](screenshots/portscanner.png)

---

## Website Technology Detection

![Technology Detection](screenshots/web-security.png)

---

## CVE Detection

![CVE Detection](screenshots/cve.png)

---

## Phishing Detection

![Phishing Detection](screenshots/phishing.png)

---

## DNS Lookup

![DNS Lookup](screenshots/dns.png)

---

## IP Intelligence

![IP Intelligence](screenshots/ip-scanner.png)

---

## Threat History

![Threat History](screenshots/history.png)

---

# 🤖 AI Security Analysis

CyberSentinel AI integrates **Ollama** to provide intelligent security analysis beyond traditional vulnerability scanning.

The AI assistant can:

- Explain detected vulnerabilities in simple language.
- Analyze scan results and identify potential security risks.
- Recommend remediation steps based on discovered issues.
- Provide contextual cybersecurity insights using a locally hosted LLM.
- Perform all AI analysis locally without relying on external cloud AI services.

---

# 🎯 Learning Outcomes

This project strengthened my practical understanding of:

- Web Application Security
- Vulnerability Assessment
- Network Reconnaissance
- AI-Assisted Security Analysis
- CVE Identification
- Phishing Detection
- REST API Development
- Full-Stack Development
- Secure Software Design
- React & Node.js Integration

---

# 🔮 Future Improvements

- SSL/TLS Certificate Analysis
- HTTP Security Header Analysis
- Export Reports (PDF/CSV)
- Authentication & User Accounts
- Scheduled Automated Scans
- Advanced Risk Scoring
- Docker Deployment
- CI/CD Integration
- Scan Result Comparison

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Harnoor Kaur**

- GitHub: https://github.com/phoenix19-h
- LinkedIn: https://linkedin.com/in/harnoor-kaur-01716837b

---

⭐ **If you found this project useful, consider giving it a star on GitHub!**
