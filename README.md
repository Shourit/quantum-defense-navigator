# QUASAR — Quantum Defense Navigator  

### *Quantum-Augmented Security Architecture & Resilience Dashboard*

🔗 **Live Demo:**  
https://quantum-defense-navigator.vercel.app/

---

## 📌 Overview

**QUASAR** is an interactive cybersecurity dashboard designed to help organizations assess, visualize, and prioritize **quantum-era cryptographic risk** and **post-quantum migration readiness** across enterprise assets.

The dashboard is designed for **both executive and technical stakeholders**, providing an at-a-glance risk summary while enabling deeper analysis when required.

QUASAR provides:

- Enterprise-level quantum risk visibility  
- Asset-level quantum exposure analysis  
- Migration readiness and prioritization  
- Performance impact insights  
- AI-assisted recommendations *(demo-mode only)*  

This project was built using **Vite**, **React**, **TailwindCSS**, **shadcn/ui**, deployed on **Vercel**, and enhanced using **Lovable.dev**.

---

## 🚀 Key Features

### 🧭 Project Asset Overview (Executive Summary)

The **Project Asset Overview** is the primary decision-making section of the dashboard and is designed to serve as an executive-level summary.

It provides:

- Total assets in scope  
- Assets migrated vs pending  
- Quantum risk distribution (High / Medium / Low)  
- Clear risk classification thresholds  
- Interactive filtering by risk level  

This section enables leadership to quickly understand:
- Overall quantum exposure  
- Migration progress  
- Immediate areas requiring attention  

---

### 🔐 Quantum Risk Assessment

- Quantum Threat Level  
- Average Quantum Risk Score  
- Vulnerable Asset Count  
- Estimated Time to Quantum-Safe Readiness  

**Quantum risk classification is based on the `quantum_risk_score` field**, using the following thresholds:

- **High Risk**: ≥ 0.7  
- **Medium Risk**: 0.4 – 0.69  
- **Low Risk**: < 0.4  

This ensures risk semantics align with executive and technical expectations.

---

### ⚙️ Migration Progress

- Migration Completion Percentage  
- Average Migration Time  
- Automation Success Rate  
- Asset Inventory Tracking  

---

### 📊 Performance Impact Analysis

- CPU Overhead  
- Memory Overhead  
- Latency Impact  
- Throughput Change  

All performance metrics are simulated and intended to demonstrate relative impact trends rather than exact production measurements.

---

### 🔮 Quantum Attack Simulation

- Shor’s Algorithm exposure indicators  
- Algorithm-specific vulnerability signals  
- Confidence metrics  

Simulation outputs are deterministic and demo-only.

---

### 🤖 AI Assistant (Demo Mode Only)

The AI Assistant runs entirely in **demo-mode**, which means:

- No external LLM keys  
- No billing  
- No outbound API requests  
- Deterministic streaming responses  
- Adjustable tone & verbosity  
- Quick Actions: Summarize, Extract Actions, Export JSON  

The AI Assistant is intended to demonstrate **future integration potential**, not live AI inference.

---

### 📁 CSV Upload & Data Modes

Users can upload their own asset inventory using a CSV file.

**Supported modes:**

- **Existing + Uploaded (default)**  
  Combines the built-in demo dataset with uploaded data.

- **Uploaded Only**  
  Runs analysis exclusively on user-uploaded assets.

If no CSV is uploaded, the dashboard **automatically falls back to the built-in demo dataset**.

Clear UI guidance indicates which dataset view is currently active.

---

### 📤 PDF Export

- Export generates a **complete report** (all dashboard sections)  
- Multi-page vertical layout supported  
- Export reflects the **currently selected dataset mode**  
- Export is enabled only when user data is uploaded  

---

### 🧪 Simulation & Orchestration Tools

- **Run New Simulation** → Updates the 7-day migration timeline  
- **Start Migration** → Updates asset status to *MIGRATING*  

All actions are simulated and do not modify external systems.

---

## 🧠 Dataset Used

`QUASAR_Test_Data.csv` powers:

- Demo-mode risk scoring  
- Top high-risk asset identification  
- Migration and performance simulations  

The dataset is included locally for demonstration purposes only.

---

## 🛠️ Tech Stack

### Frontend
- React 18  
- TypeScript  
- Vite  
- TailwindCSS  
- shadcn/ui  
- Radix UI  
- Recharts  
- Lucide Icons  

### Backend (Serverless)
- Vercel Serverless Functions  
- `/api/assistant` → demo-mode streaming AI endpoint  

### AI Layer
- Fully local demo-mode  
- Zero-cost and zero external API usage  

---


## 📂 Project Structure

```
src/
├─ components/
├─ lib/
├─ pages/
├─ assets/
api/
└─ assistant.js
public/
└─ QUASAR_Test_Data.csv
```
---

## 🚀 Deployment

Production deployment is handled by **Vercel**.  
The `main` branch is the active production source.

Demo AI endpoint is hosted at:

/api/assistant

---

## 📜 License — MIT License

MIT License

Copyright (c) 2025 Shourit

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 🙌 Acknowledgements

- Lovable.dev  
- Vercel  
- shadcn/ui  
- Radix UI  
