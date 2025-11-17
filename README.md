# Vocabulary Builder

A gamified vocabulary learning app designed to help students develop vocabulary fluently through interactive exercises and contextual understanding.

## Overview

This app focuses on helping students:
1. **Learn the words** - Recognize and understand vocabulary
2. **Use the words** - Apply vocabulary in context
3. **Understand the author's choice** - Analyze how words are used for effect

### Educational Benefits

- Identify bias in writing
- Work out main ideas and supporting details
- Organize ideas effectively
- Build fluency with the 1000 most common English words
- Develop advanced vocabulary skills

## Features

### 5-Stage Learning System

1. **Flip Cards** - Memory learning through flashcard review
2. **Meaning Quiz** - Multiple choice comprehension
3. **Sentence Building** - Drag & drop exercises
4. **Word Swap** - Replace weak words with stronger alternatives
5. **Completion** - Link to writing practice

### Vocabulary Categories

- **Descriptive Words** - Vivid vocabulary for engaging writing
- **Character Descriptors** - Words to describe personality and traits
- **1000 Common Words** - Organized by part of speech (adjectives, nouns, verbs, adverbs, prepositions)

## Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Shadcn/ui (Radix UI)
- **Package Manager**: pnpm
- **Analytics**: Vercel Analytics

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment

### Deploy to Vercel

This app is optimized for deployment on Vercel.

#### Option 1: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com)
3. Sign in and click "Add New Project"
4. Import your repository
5. Vercel will auto-detect Next.js and configure settings
6. Click "Deploy"

#### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Environment Variables

Currently, no environment variables are required. If you add features like authentication or database connectivity, create a `.env.local` file:

```bash
# Example for future use
# NEXT_PUBLIC_API_URL=your_api_url
```

## Project Structure

```
vocab-builder/
├── app/                    # Next.js 15 app directory
│   ├── layout.tsx         # Root layout with analytics
│   └── page.tsx           # Main game component
├── components/
│   ├── ui/                # Shadcn/ui components (57 components)
│   └── theme-provider.tsx # Dark/light theme support
├── lib/
│   ├── vocabularyData.ts  # Vocabulary content
│   ├── commonWords.ts     # 1000 most common words
│   └── utils.ts          # Utility functions
├── hooks/                 # React hooks
├── styles/
│   └── globals.css       # Global styles
└── public/               # Static assets
```

## Vocabulary Data Structure

Each vocabulary word includes:
- `word` - The vocabulary term
- `meaning` - Simple, clear definition
- `impression` - Emotional/visual impact
- `examples` - 2-3 usage examples
- `hints` - Learning tips
- `swapFrom` - Weak phrase to replace
- `sentenceTemplate` - Practice sentence
- `sentenceAnswer` - Correct answer

## Customization

### Adding New Vocabulary

Edit `lib/vocabularyData.ts` to add new words:

```typescript
{
  word: "eloquent",
  meaning: "Fluent and persuasive in speaking or writing",
  impression: "Skillful communication",
  examples: [
    "Her eloquent speech moved the audience to tears.",
    "The eloquent writer crafted beautiful prose."
  ],
  hints: ["Use for persuasive, well-spoken expression"],
  swapFrom: "good at speaking",
  sentenceTemplate: "She was good at speaking.",
  sentenceAnswer: "She was eloquent."
}
```

### Using Common Words Data

The `lib/commonWords.ts` file contains the 1000 most common English words organized by part of speech. Use helper functions:

```typescript
import { getRandomWords, isCommonWord, getWordCategory } from '@/lib/commonWords';

// Get 10 random words
const words = getRandomWords(10);

// Check if a word is common
const isCommon = isCommonWord('happy'); // true

// Get word category
const category = getWordCategory('quickly'); // 'adverbs'
```

## Philosophy

This app keeps language learning simple while supporting essential skills:
- Vocabulary recognition and usage
- Contextual understanding
- Author's word choice analysis
- Critical thinking about language

Many apps overcomplicate vocabulary learning. This app focuses on fluency, understanding, and practical application.

## Contributing

Contributions are welcome! Areas for enhancement:
- Additional vocabulary categories
- User progress tracking
- Spaced repetition algorithms
- More interactive exercises
- Teacher dashboard

## License

MIT License - feel free to use and modify for educational purposes.

## Acknowledgments

- Built with Next.js and Shadcn/ui
- Vocabulary data curated for educational effectiveness
- 1000 most common words based on frequency analysis
