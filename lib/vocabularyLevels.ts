import { commonWords } from './commonWords'
import type { VocabularyItem } from './vocabularyData'

/**
 * Vocabulary organized into 12 progressive levels
 * Each level uses approximately 70-85 words from commonWords.ts
 * Levels progress from most common to less common words
 */

// Helper function to create vocabulary items from word lists
function createVocabItems(words: string[], partOfSpeech: 'verb' | 'adjective' | 'noun' | 'adverb'): VocabularyItem[] {
  return words.map(word => {
    let meaning = ''
    let impression = ''
    let examples: string[] = []
    let swapFrom = ''
    let sentenceTemplate = ''
    let sentenceAnswer = ''

    // Generate basic definitions based on part of speech
    switch (partOfSpeech) {
      case 'verb':
        meaning = `To ${word}`
        impression = 'Action'
        examples = [`They ${word} every day.`, `She will ${word} tomorrow.`]
        swapFrom = 'do'
        sentenceTemplate = `They do this every day.`
        sentenceAnswer = `They ${word} every day.`
        break
      case 'adjective':
        meaning = `Having the quality of being ${word}`
        impression = 'Description'
        examples = [`The ${word} house.`, `It was very ${word}.`]
        swapFrom = 'nice'
        sentenceTemplate = `The nice house.`
        sentenceAnswer = `The ${word} house.`
        break
      case 'noun':
        meaning = `A ${word}`
        impression = 'Thing or concept'
        examples = [`The ${word} is important.`, `Look at that ${word}.`]
        swapFrom = 'thing'
        sentenceTemplate = `The thing is important.`
        sentenceAnswer = `The ${word} is important.`
        break
      case 'adverb':
        meaning = `In a ${word} manner`
        impression = 'Manner of action'
        examples = [`She spoke ${word}.`, `He moved ${word}.`]
        swapFrom = 'quickly'
        sentenceTemplate = `She spoke quickly.`
        sentenceAnswer = `She spoke ${word}.`
        break
    }

    return {
      word,
      meaning,
      impression,
      examples,
      hints: [`Common ${partOfSpeech}: ${word}`, `Use "${word}" in everyday conversation`],
      swapFrom,
      sentenceTemplate,
      sentenceAnswer
    }
  })
}

// Split words into 12 levels
const verbsPerLevel = Math.ceil(commonWords.verbs.length / 12)
const adjectivesPerLevel = Math.ceil(commonWords.adjectives.length / 12)
const nounsPerLevel = Math.ceil(commonWords.nouns.length / 12)
const adverbsPerLevel = Math.ceil(commonWords.adverbs.length / 12)

export const vocabularyLevels = Array.from({ length: 12 }, (_, levelIndex) => {
  const level = levelIndex + 1

  // Get word slices for this level
  const levelVerbs = commonWords.verbs.slice(
    levelIndex * verbsPerLevel,
    (levelIndex + 1) * verbsPerLevel
  )
  const levelAdjectives = commonWords.adjectives.slice(
    levelIndex * adjectivesPerLevel,
    (levelIndex + 1) * adjectivesPerLevel
  )
  const levelNouns = commonWords.nouns.slice(
    levelIndex * nounsPerLevel,
    (levelIndex + 1) * nounsPerLevel
  )
  const levelAdverbs = commonWords.adverbs.slice(
    levelIndex * adverbsPerLevel,
    (levelIndex + 1) * adverbsPerLevel
  )

  return {
    level,
    title: `Level ${level}`,
    description: getLevelDescription(level),
    verbs: createVocabItems(levelVerbs, 'verb'),
    adjectives: createVocabItems(levelAdjectives, 'adjective'),
    nouns: createVocabItems(levelNouns, 'noun'),
    adverbs: createVocabItems(levelAdverbs, 'adverb'),
    totalWords: levelVerbs.length + levelAdjectives.length + levelNouns.length + levelAdverbs.length
  }
})

function getLevelDescription(level: number): string {
  const descriptions = [
    'Most essential words - the foundation of English',
    'Core vocabulary for basic communication',
    'Common words used in everyday situations',
    'Expanding your conversational ability',
    'Building more complex expressions',
    'Intermediate vocabulary for better fluency',
    'Advanced common words',
    'Enriching your vocabulary range',
    'Sophisticated everyday language',
    'Near-complete common word mastery',
    'Advanced vocabulary completion',
    'Final set of common words - expert level'
  ]
  return descriptions[level - 1] || 'Building your vocabulary'
}

// Calculate cumulative word counts
export function getCumulativeWordCount(upToLevel: number): number {
  return vocabularyLevels
    .slice(0, upToLevel)
    .reduce((sum, level) => sum + level.totalWords, 0)
}

// Get comprehension message based on words learned
export function getComprehensionMessage(wordCount: number): string {
  if (wordCount >= 25 && wordCount < 100) {
    return `You know ${wordCount} words! That's about a third of basic printed material. Keep going!`
  } else if (wordCount >= 100 && wordCount < 300) {
    return `Excellent! With ${wordCount} words, you can understand about half of all written material!`
  } else if (wordCount >= 300 && wordCount < 600) {
    return `Impressive! ${wordCount} words means you understand about 65% of written English!`
  } else if (wordCount >= 600 && wordCount < 800) {
    return `Amazing progress! With ${wordCount} words, you're understanding most everyday English!`
  } else if (wordCount >= 800) {
    return `Outstanding! ${wordCount} words gives you 75%+ comprehension of spoken English. You can read most simple stories without problems!`
  } else {
    return `You're building your foundation with ${wordCount} words. Keep learning!`
  }
}

// Get level recommendation based on completed levels
export function getRecommendedLevel(completedLevels: number[]): number {
  if (completedLevels.length === 0) return 1
  const maxCompleted = Math.max(...completedLevels)
  return Math.min(maxCompleted + 1, 12)
}

export type VocabLevel = typeof vocabularyLevels[0]
export type VocabType = 'verbs' | 'adjectives' | 'nouns' | 'adverbs'
