# QuantAI - AI-Powered Financial Intelligence Platform

<div align="center">
  <img src="/public/logo.png" alt="QuantAI Logo" width="200" />
  
  [![Next.js](https://img.shields.io/badge/Next.js-13.4+-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![Clerk](https://img.shields.io/badge/Clerk-Auth-000000?style=flat-square)](https://clerk.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Shadcn/ui](https://img.shields.io/badge/Shadcn_UI-18181B?style=flat-square&logo=react&logoColor=white)](https://ui.shadcn.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

  A modern, AI-powered financial platform that helps users manage their personal finances, track investments, and gain valuable financial insights through intelligent automation and machine learning.
</div>

## ✨ Features

### 📊 Dashboard
- **Real-time Financial Overview**: Get a comprehensive view of your financial health
- **Interactive Charts**: Visualize your income, expenses, and investment performance
- **Customizable Widgets**: Tailor your dashboard to show what matters most to you

### 💰 Financial Management
- **Transaction Tracking**: Categorize and analyze your spending patterns
- **Budget Planning**: Set and track budgets with intelligent recommendations
- **Multi-Account Support**: Manage all your financial accounts in one place

### 🤖 AI Assistant
- **Personalized Financial Advice**: Get AI-powered recommendations
- **Natural Language Queries**: Ask questions about your finances in plain English
- **Smart Alerts**: Receive proactive notifications about important financial events

### 📚 Learning Center
- **Interactive Courses**: Learn about personal finance and investing
- **Quizzes & Assessments**: Test your knowledge and track your progress
- **Personalized Learning Path**: Get course recommendations based on your financial goals

### 🔒 Security
- **Bank-level Encryption**: Your data is always protected
- **Two-Factor Authentication**: Extra layer of security for your account
- **Privacy First**: We never sell your financial data

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 13+ (App Router)
- **UI Library**: React 18+
- **Styling**: Tailwind CSS with Shadcn/ui components
- **State Management**: React Query
- **Form Handling**: React Hook Form with Zod validation
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **API Routes**: Next.js API Routes
- **AI Integration**: Google Gemini AI
- **Background Jobs**: Inngest
- **Security**: ArcJet

### DevOps
- **Version Control**: Git
- **Package Manager**: npm/yarn
- **Environment**: Node.js
- **Deployment**: Vercel (recommended)

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database
- Clerk account for authentication
- Google Gemini API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/quantai.git
   cd quantai
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
quantai/
├── app/                    # App router pages and layouts
│   ├── (auth)/            # Authentication routes
│   ├── (main)/            # Authenticated routes
│   │   ├── dashboard/     # Dashboard page
│   │   ├── learning/      # Learning center
│   │   ├── transaction/   # Transaction management
│   │   └── account/       # Account management
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configs
├── prisma/                # Database schema and migrations
└── public/                # Static assets
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com/)
- [Clerk Documentation](https://clerk.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

## 📧 Contact

Email - varshneyshubhv@gmail.com

Project Link: [https://github.com/ShubhVarshney30/QuantAI](https://github.com/ShubhVarshney30/QuantAI)

---

<div align="center">
  Made with ❤️ by Shubh Varshney
</div>
