# QUASAR — Quantum Defense Navigator  
### *Quantum-Augmented Security Architecture & Resilience Dashboard*

🔗 **Live Demo:**  
https://quantum-defense-navigator.vercel.app/

---

## 📌 Overview

**QUASAR** is an interactive cybersecurity dashboard designed to help organizations visualize and prepare for **post-quantum cryptography (PQC)** threats.

It provides:

- Real-time risk visibility  
- Asset vulnerability analysis  
- Migration planning  
- Quantum-attack simulations  
- AI-assisted recommendations *(demo-mode — no external API calls)*  

This project was built using **Vite**, **React**, **TailwindCSS**, **shadcn/ui**, deployed on **Vercel**, and enhanced using **Lovable.dev**.

---

## 🚀 Key Features

### 🔐 Quantum Risk Assessment
- Threat Level Monitoring  
- Vulnerability Score  
- Vulnerable Asset Count  
- Estimated Time to Quantum-Safe Readiness  

### ⚙️ Migration Progress
- Migration Completion %  
- Average Migration Time  
- Automation Success Rate  
- Asset Inventory Tracking  

### 📊 Performance Impact Analysis
- CPU Overhead  
- Memory Overhead  
- Latency Impact  
- Throughput Change  

### 🔮 Quantum Attack Simulation
- Shor’s Algorithm simulation indicator  
- Algorithm-specific vulnerability scores  
- Confidence metrics  

### 🤖 AI Assistant (Demo Mode Only)
The AI Assistant runs entirely in **demo-mode**, which means:  
- No external LLM keys  
- No billing  
- No outbound API requests  
- Deterministic streaming responses  
- Tone & Verbosity controls  
- Quick Actions: Summarize, Extract Actions, Export JSON  

### 🧪 Simulation & Orchestration Tools
- **Run New Simulation** → Updates the 7-day migration timeline  
- **Start Migration** → Updates asset status to *MIGRATING*  

Both actions are simulated and do not modify external infrastructure.

---

## 🧠 Dataset Used

`QUASAR_Test_Data.csv` powers:

- Top-5 high-risk asset selection  
- Attack simulation outputs  
- Asset inventory  
- Demo-mode risk scoring  

This dataset is included locally for demonstration purposes only.

---

## 🛠️ Tech Stack

**Frontend**
- React 18  
- TypeScript  
- Vite  
- TailwindCSS  
- shadcn/ui  
- Radix UI  
- Recharts  
- Lucide Icons  

**Backend (Serverless)**
- Vercel Serverless Functions  
- `/api/assistant` → demo-mode streaming AI endpoint  

**AI Layer**
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
