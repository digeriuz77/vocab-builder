"use client"
import type { DragEvent } from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { vocabularyLevels, getCumulativeWordCount, getComprehensionMessage, getRecommendedLevel, type VocabType } from "@/lib/vocabularyLevels"
import type { Stage, VocabularyItem } from "@/lib/vocabularyData"
import { cn } from "@/lib/utils"

export default function VocabularyMasteryGame() {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [currentVocabType, setCurrentVocabType] = useState<VocabType>("verbs")
  const [currentStage, setCurrentStage] = useState<Stage>(1)
  const [score, setScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [feedbackType, setFeedbackType] = useState<"correct" | "incorrect" | "">("")
  const [achievements, setAchievements] = useState<string[]>([])
  const [completedLevels, setCompletedLevels] = useState<number[]>([])
  const [showLevelSelect, setShowLevelSelect] = useState(true)

  // Stage 2 & 4: Quiz state
  const [quizOptions, setQuizOptions] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showQuizSubmit, setShowQuizSubmit] = useState(false)

  // Stage 3: Sentence Builder (Drag & Drop) state
  const [wordBankWords, setWordBankWords] = useState<string[]>([])
  const [sentenceSlots, setSentenceSlots] = useState<Array<string | { type: "drop"; correctWord: string }>>([])
  const dropSlotRef = useRef<HTMLDivElement>(null) // Ref for the drop slot

  const currentLevelData = vocabularyLevels[currentLevel - 1]
  const currentVocabList = currentLevelData[currentVocabType]
  const currentWord: VocabularyItem = currentVocabList[currentQuestionIndex % currentVocabList.length]

  // Load completed levels from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('completedLevels')
    if (saved) {
      setCompletedLevels(JSON.parse(saved))
    }
  }, [])

  // Save completed levels to localStorage
  const markLevelComplete = useCallback((level: number) => {
    setCompletedLevels(prev => {
      const updated = [...new Set([...prev, level])]
      localStorage.setItem('completedLevels', JSON.stringify(updated))
      return updated
    })
  }, [])

  const showFeedback = useCallback((message: string, type: "correct" | "incorrect") => {
    setFeedbackMessage(message)
    setFeedbackType(type)
    setTimeout(() => {
      setFeedbackMessage("")
      setFeedbackType("")
    }, 2000)
  }, [])

  const updateDisplay = useCallback(() => {
    // This function is primarily for updating score and stage in the UI
    // The progress bar and stage indicator are handled by state directly
  }, [])

  const resetGame = useCallback(() => {
    setCurrentStage(1)
    setScore(0)
    setCurrentQuestionIndex(0)
    setFeedbackMessage("")
    setFeedbackType("")
    setAchievements([])
    setSelectedOption(null)
    setShowQuizSubmit(false)
  }, [])

  const nextStage = useCallback(() => {
    if (currentStage < 4) {
      setCurrentStage((prev) => (prev + 1) as Stage)
      setCurrentQuestionIndex(0) // Reset question index for new stage
      setFeedbackMessage("")
      setFeedbackType("")
      setSelectedOption(null)
      setShowQuizSubmit(false)
    } else if (currentStage === 4) {
      // Move to completion screen after stage 4
      setCurrentStage(5 as Stage)
      markLevelComplete(currentLevel)
      showFeedback("🎉 Congratulations! You've completed all vocabulary stages!", "correct")
    }
  }, [currentStage, currentLevel, markLevelComplete, showFeedback])

  // --- Stage 1: Flip Cards ---
  const loadStage1 = useCallback(() => {
    // No specific state to load, just render the cards
  }, [])

  // --- Stage 2: Meaning Quiz ---
  const loadStage2 = useCallback(() => {
    setCurrentQuestionIndex(0)
    showQuizQuestion()
  }, [])

  const showQuizQuestion = useCallback(() => {
    const vocab = currentLevelData[currentVocabType]
    if (currentQuestionIndex >= vocab.length) {
      nextStage()
      return
    }

    const word = vocab[currentQuestionIndex]
    // Get all other vocabulary items and shuffle them
    const otherWords = vocab.filter((w) => w.word !== word.word)
    const shuffledOthers = otherWords.sort(() => Math.random() - 0.5)

    // Take up to 2 wrong answers, but handle cases where we have fewer items
    const wrongAnswers = shuffledOthers.slice(0, Math.min(2, shuffledOthers.length))

    // Create the options array with correct answer and wrong answers, then shuffle
    const allAnswers = [word.meaning, ...wrongAnswers.map((w) => w.meaning)]
    const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5)

    setQuizOptions(shuffledAnswers)
    setSelectedOption(null)
    setShowQuizSubmit(false)
    setFeedbackMessage("")
    setFeedbackType("")
  }, [currentQuestionIndex, currentVocabType, currentLevelData, nextStage])

  const checkQuizAnswer = useCallback(() => {
    const vocab = currentLevelData[currentVocabType]
    const correctAnswer = vocab[currentQuestionIndex].meaning

    if (selectedOption === correctAnswer) {
      setScore((prev) => prev + 20)
      showFeedback("🎉 Correct! Great memory!", "correct")
    } else {
      showFeedback(`❌ Oops! The correct answer is: ${correctAnswer}`, "incorrect")
    }

    setTimeout(() => {
      setCurrentQuestionIndex((prev) => prev + 1)
    }, 2000)
  }, [currentQuestionIndex, currentVocabType, currentLevelData, selectedOption, showFeedback])

  // --- Stage 3: Sentence Building (Drag & Drop) ---
  const loadStage3 = useCallback(() => {
    setCurrentQuestionIndex(0)
    showSentenceQuestion()
  }, [])

  const showSentenceQuestion = useCallback(() => {
    const vocab = currentLevelData[currentVocabType]
    if (currentQuestionIndex >= vocab.length) {
      nextStage()
      return
    }

    const word = vocab[currentQuestionIndex]
    const wrongWords = ["slowly", "quietly", "gently", "sadly", "happily"].filter((w) => w !== word.word)
    const allWords = [word.word, ...wrongWords.slice(0, 3)].sort(() => Math.random() - 0.5)

    setWordBankWords(allWords)

    // Construct sentence slots based on the first example
    const example = word.examples[0]
    const wordsInExample = example.split(" ")
    const sentenceStructure: Array<string | { type: "drop"; correctWord: string }> = []

    let foundWord = false
    for (const w of wordsInExample) {
      if (w.toLowerCase().includes(word.word.toLowerCase()) && !foundWord) {
        sentenceStructure.push({ type: "drop", correctWord: word.word })
        foundWord = true
      } else {
        sentenceStructure.push(w)
      }
    }
    setSentenceSlots(sentenceStructure)
    setFeedbackMessage("")
    setFeedbackType("")
  }, [currentQuestionIndex, currentVocabType, currentLevelData, nextStage])

  const handleDragStart = (e: DragEvent<HTMLDivElement>, word: string) => {
    e.dataTransfer.setData("text/plain", word)
    e.currentTarget.classList.add("dragging")
  }

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("dragging")
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault() // Allow drop
    e.currentTarget.classList.add("drag-over")
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("drag-over")
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    e.currentTarget.classList.remove("drag-over")
    const droppedWord = e.dataTransfer.getData("text/plain")

    setSentenceSlots((prevSlots) =>
      prevSlots.map((slot, i) => (i === index && typeof slot === "object" ? droppedWord : slot)),
    )
  }

  const checkSentence = useCallback(() => {
    let correct = true
    let correctWord = ""

    // Build the complete sentence structure with original drop slot info
    const originalStructure = currentWord.examples[0].split(" ")
    let dropSlotIndex = -1

    // Find which slot is the drop zone
    sentenceSlots.forEach((slot, index) => {
      if (typeof slot === "object" && slot.type === "drop") {
        dropSlotIndex = index
        correctWord = slot.correctWord
      }
    })

    // Check if a word was dropped in the correct slot
    if (dropSlotIndex >= 0) {
      const droppedSlot = sentenceSlots[dropSlotIndex]
      if (typeof droppedSlot === "string") {
        // A word was dropped, check if it's correct
        if (droppedSlot.toLowerCase() !== correctWord.toLowerCase()) {
          correct = false
        }
      } else {
        // No word dropped yet
        correct = false
        correctWord = droppedSlot.correctWord
      }
    }

    if (correct) {
      setScore((prev) => prev + 30)
      showFeedback("🎉 Perfect sentence! The word fits perfectly!", "correct")
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1)
      }, 2000)
    } else {
      showFeedback(`❌ Not quite. Try again! The correct word was "${correctWord}".`, "incorrect")
      // Reset the slot if incorrect
      setSentenceSlots((prevSlots) =>
        prevSlots.map((slot) => (typeof slot === "object" && slot.type === "drop" ? { type: "drop", correctWord: slot.correctWord } : slot)),
      )
    }
  }, [sentenceSlots, currentWord, showFeedback])

  // --- Stage 4: Word Swap ---
  const loadStage4 = useCallback(() => {
    setCurrentQuestionIndex(0)
    showSwapQuestion()
  }, [])

  const showSwapQuestion = useCallback(() => {
    // Use current vocab type for Stage 4
    const vocab = currentLevelData[currentVocabType]
    if (currentQuestionIndex >= vocab.length) {
      nextStage()
      return
    }

    const word = vocab[currentQuestionIndex]

    // Get all other vocabulary items and shuffle them
    const otherWords = vocab.filter((w) => w.word !== word.word)
    const shuffledOthers = otherWords.sort(() => Math.random() - 0.5)

    // Take 2 random wrong answers
    const wrongAnswers = shuffledOthers.slice(0, 2).map((w) => w.word)

    // Create the options array with correct answer and wrong answers, then shuffle
    const allOptions = [word.word, ...wrongAnswers].sort(() => Math.random() - 0.5)

    setQuizOptions(allOptions)
    setSelectedOption(null)
    setShowQuizSubmit(false)
    setFeedbackMessage("")
    setFeedbackType("")
  }, [currentQuestionIndex, currentVocabType, currentLevelData, nextStage])

  const checkSwapAnswer = useCallback(() => {
    // Use current vocab type for Stage 4
    const vocab = currentLevelData[currentVocabType]
    const correctAnswer = vocab[currentQuestionIndex].word

    if (selectedOption === correctAnswer) {
      setScore((prev) => prev + 25)
      showFeedback("✅ Excellent! That's a much stronger word!", "correct")
    } else {
      showFeedback(`❌ Not quite. The best word is: ${correctAnswer}`, "incorrect")
    }

    setTimeout(() => {
      setCurrentQuestionIndex((prev) => prev + 1)
    }, 2000)
  }, [currentQuestionIndex, currentVocabType, currentLevelData, selectedOption, showFeedback])

  const stageNames: { [key in Stage]: string } = {
    1: "Stage 1: Memory Cards - Learn the Words!",
    2: "Stage 2: Meaning Quiz - Test Your Memory!",
    3: "Stage 3: Sentence Building - Use the Words!",
    4: "Stage 4: Word Swap - Stronger Impressions!",
    5: "Stage 5: Text Analysis - Find the Vocabulary!", // Keep for type compatibility but won't be used
  }

  const progressValue = (currentStage / 4) * 100

  useEffect(() => {
    // This effect runs when currentStage changes to load the appropriate stage content
    switch (currentStage) {
      case 1:
        loadStage1()
        break
      case 2:
        loadStage2()
        break
      case 3:
        loadStage3()
        break
      case 4:
        loadStage4()
        break
      default:
        break
    }
  }, [currentStage, loadStage1, loadStage2, loadStage3, loadStage4])

  useEffect(() => {
    // Reset game state when vocab type changes
    resetGame()
    // Ensure the correct stage is loaded after reset
    setCurrentStage(1)
  }, [currentVocabType, resetGame])

  useEffect(() => {
    // Update quiz submit button visibility
    if (currentStage === 2 || currentStage === 4) {
      setShowQuizSubmit(selectedOption !== null)
    }
  }, [selectedOption, currentStage])

  useEffect(() => {
    // Regenerate quiz options when question index changes in stage 2
    if (currentStage === 2) {
      showQuizQuestion()
    }
  }, [currentQuestionIndex, currentStage, showQuizQuestion])

  useEffect(() => {
    // Regenerate sentence question when question index changes in stage 3
    if (currentStage === 3) {
      showSentenceQuestion()
    }
  }, [currentQuestionIndex, currentStage, showSentenceQuestion])

  useEffect(() => {
    // Regenerate swap question when question index changes in stage 4
    if (currentStage === 4) {
      showSwapQuestion()
    }
  }, [currentQuestionIndex, currentStage, showSwapQuestion])

  return (
    <div className="min-h-screen p-5 bg-gradient-to-br from-[#667eea] to-[#764ba2]">
      <div className="container mx-auto max-w-6xl overflow-hidden rounded-[20px] bg-white shadow-2xl">
        <header className="bg-gradient-to-br from-[#ff6b6b] to-[#feca57] p-8 text-center text-white">
          <h1 className="mb-2 text-4xl font-bold">🎯 Vocabulary Mastery Journey</h1>
          <p className="text-lg opacity-90">Master 1000 essential English words across 12 levels!</p>
        </header>

        <main className="p-8">
          {showLevelSelect ? (
            <div className="level-selection">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Choose Your Level</h2>

              {/* Progress Stats */}
              {completedLevels.length > 0 && (
                <Card className="mb-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
                  <h3 className="text-2xl font-bold text-green-800 mb-4">📊 Your Progress</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-sm text-gray-600">Levels Completed</div>
                      <div className="text-3xl font-bold text-purple-600">{completedLevels.length}/12</div>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-sm text-gray-600">Words Mastered</div>
                      <div className="text-3xl font-bold text-blue-600">
                        {getCumulativeWordCount(Math.max(...completedLevels))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-white rounded-lg">
                    <p className="text-lg text-gray-700">
                      {getComprehensionMessage(getCumulativeWordCount(Math.max(...completedLevels)))}
                    </p>
                  </div>
                </Card>
              )}

              {/* Level Grid */}
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {vocabularyLevels.map((level) => (
                  <Card
                    key={level.level}
                    className={cn(
                      "p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105",
                      completedLevels.includes(level.level)
                        ? "bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-500"
                        : "bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200",
                      level.level === getRecommendedLevel(completedLevels) && "ring-4 ring-yellow-400"
                    )}
                    onClick={() => {
                      setCurrentLevel(level.level)
                      setShowLevelSelect(false)
                      setCurrentStage(1)
                      setCurrentQuestionIndex(0)
                      setScore(0)
                    }}
                  >
                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-600 mb-2">
                        {completedLevels.includes(level.level) ? "✅ Completed" : ""}
                        {level.level === getRecommendedLevel(completedLevels) && !completedLevels.includes(level.level) ? "⭐ Recommended" : ""}
                      </div>
                      <h3 className="text-2xl font-bold text-purple-700 mb-2">Level {level.level}</h3>
                      <p className="text-sm text-gray-600 mb-3">{level.description}</p>
                      <div className="text-xs text-gray-500">{level.totalWords} words</div>
                      <div className="mt-3 text-xs text-gray-500">
                        {getCumulativeWordCount(level.level - 1) + 1}-{getCumulativeWordCount(level.level)} total
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Info Section */}
              <Card className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50">
                <h3 className="text-xl font-bold text-gray-800 mb-3">💡 Did You Know?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• The first 100 words make up about <strong>half</strong> of all written material</li>
                  <li>• The first 300 words account for approximately <strong>65%</strong> of written text</li>
                  <li>• Learning 800-1,000 words enables understanding <strong>75%</strong> of spoken English</li>
                  <li>• Mastering these words is fundamental for literacy and communication!</li>
                </ul>
              </Card>
            </div>
          ) : (
            <div className="game-content">
          <div className="controls mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowLevelSelect(true)}
                variant="outline"
                className="rounded-full px-4 py-2 font-bold"
              >
                ← Back to Levels
              </Button>
              <div className="text-lg font-bold text-purple-700">
                Level {currentLevel}: {currentLevelData.description}
              </div>
            </div>
            <div className="vocab-type-selector flex flex-wrap items-center gap-2">
              <span className="font-bold">Part of Speech:</span>
              {["verbs", "adjectives", "nouns", "adverbs"].map((type) => (
                <Button
                  key={type}
                  onClick={() => setCurrentVocabType(type as VocabType)}
                  className={cn(
                    "rounded-full px-5 py-2 font-bold transition-all duration-300",
                    currentVocabType === type
                      ? "bg-[#2196F3] text-white hover:bg-[#1976D2] scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                  )}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
            <div className="score-board rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] px-6 py-3 font-bold text-lg text-white">
              Score: <span id="score">{score}</span> | Stage: <span id="currentStage">{currentStage}</span>/4
            </div>
          </div>

          <div className="stage-indicator mb-5 rounded-xl bg-gradient-to-br from-[#ff9a9e] to-[#fecfef] px-6 py-3 text-center font-bold text-gray-800">
            {stageNames[currentStage]}
          </div>
          <Progress value={progressValue} className="my-5 h-2.5 rounded-lg bg-gray-200" />

          {/* Stage 1: Flip Cards */}
          {currentStage === 1 && (
            <div id="stage1" className="stage-content">
              <div className="flip-card-container grid gap-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
                {currentVocabList.map((word, index) => (
                  <FlipCard key={index} wordData={word} />
                ))}
              </div>
              <div className="mt-5 text-center">
                <Button
                  onClick={nextStage}
                  className="btn btn-primary rounded-full bg-gradient-to-br from-[#4CAF50] to-[#45a049] px-6 py-3 font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Ready for Quiz! ➡️
                </Button>
              </div>
            </div>
          )}

          {/* Stage 2: Meaning Quiz */}
          {currentStage === 2 && (
            <div id="stage2" className="stage-content">
              <Card className="quiz-container rounded-xl bg-gray-50 p-6">
                <div className="question mb-5 text-xl font-bold text-gray-800">
                  What does &quot;{currentWord.word}&quot; mean?
                </div>
                <div className="options grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
                  {quizOptions.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => setSelectedOption(option)}
                      className={cn(
                        "option rounded-xl border-2 p-4 font-bold transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4CAF50]",
                        selectedOption === option
                          ? "bg-[#4CAF50] text-white border-[#4CAF50]"
                          : "bg-white text-gray-800 border-gray-300",
                        feedbackType === "correct" && option === currentWord.meaning && "bg-[#4CAF50] text-white",
                        feedbackType === "incorrect" &&
                          option === selectedOption &&
                          option !== currentWord.meaning &&
                          "bg-[#f44336] text-white",
                      )}
                      disabled={!!feedbackMessage}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                {showQuizSubmit && (
                  <Button
                    onClick={checkQuizAnswer}
                    className="btn btn-primary mt-5 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#45a049] px-6 py-3 font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    disabled={!!feedbackMessage}
                  >
                    Check Answer
                  </Button>
                )}
              </Card>
              <div className="mt-5 text-center">
                <Button
                  onClick={nextStage}
                  variant="outline"
                  className="rounded-full px-6 py-2 font-bold text-gray-600 border-gray-300 hover:bg-gray-100 bg-transparent"
                >
                  Ready for Next Stage ➡️
                </Button>
              </div>
              {feedbackMessage && (
                <div
                  className={cn(
                    "feedback mt-5 rounded-lg p-4 text-center font-bold",
                    feedbackType === "correct" && "bg-green-100 text-green-800 border border-green-300",
                    feedbackType === "incorrect" && "bg-red-100 text-red-800 border border-red-300",
                  )}
                >
                  {feedbackMessage}
                </div>
              )}
            </div>
          )}

          {/* Stage 3: Sentence Building */}
          {currentStage === 3 && (
            <div id="stage3" className="stage-content">
              <Card className="sentence-builder rounded-xl bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-bold text-gray-800">
                  Complete the sentence to show <strong>{currentWord.impression}</strong>:
                </h3>
                <div className="word-bank mb-5 flex flex-wrap gap-3 rounded-xl border-2 border-dashed border-gray-300 bg-white p-4">
                  {wordBankWords.map((word, index) => (
                    <div
                      key={index}
                      className="draggable-word cursor-grab select-none rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] px-4 py-2 font-bold text-white transition-all duration-300 active:cursor-grabbing"
                      draggable
                      onDragStart={(e) => handleDragStart(e, word)}
                      onDragEnd={handleDragEnd}
                    >
                      {word}
                    </div>
                  ))}
                </div>

                <div className="sentence-slots mb-5 flex min-h-[60px] flex-wrap items-center gap-3 rounded-xl border-2 border-dashed border-[#4CAF50] bg-white p-4">
                  {sentenceSlots.map((slot, index) =>
                    typeof slot === "string" ? (
                      <span
                        key={index}
                        className="fixed-word rounded-full bg-gray-200 px-4 py-2 font-bold text-gray-700"
                      >
                        {slot}
                      </span>
                    ) : (
                      <div
                        key={index}
                        ref={slot.type === "drop" ? dropSlotRef : null}
                        className={cn(
                          "drop-slot flex min-h-[40px] min-w-[80px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-100 transition-all duration-300",
                          typeof sentenceSlots[index] === "string" && "bg-[#4CAF50] text-white border-[#4CAF50]", // If a word is dropped, it becomes a string
                        )}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, index)}
                      >
                        {typeof sentenceSlots[index] === "string" ? (sentenceSlots[index] as string) : ""}
                      </div>
                    ),
                  )}
                </div>

                <Button
                  onClick={checkSentence}
                  className="btn btn-primary rounded-full bg-gradient-to-br from-[#4CAF50] to-[#45a049] px-6 py-3 font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Check Sentence
                </Button>
              </Card>
              <div className="mt-5 text-center">
                <Button
                  onClick={nextStage}
                  variant="outline"
                  className="rounded-full px-6 py-2 font-bold text-gray-600 border-gray-300 hover:bg-gray-100 bg-transparent"
                >
                  Ready for Next Stage ➡️
                </Button>
              </div>
              {feedbackMessage && (
                <div
                  className={cn(
                    "feedback mt-5 rounded-lg p-4 text-center font-bold",
                    feedbackType === "correct" && "bg-green-100 text-green-800 border border-green-300",
                    feedbackType === "incorrect" && "bg-red-100 text-red-800 border border-red-300",
                  )}
                >
                  {feedbackMessage}
                </div>
              )}
            </div>
          )}

          {/* Stage 4: Word Swap */}
          {currentStage === 4 && (
            <div id="stage4" className="stage-content">
              <Card className="quiz-container rounded-xl bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-bold text-gray-800">
                  Replace the underlined part with a stronger vocabulary word:
                </h3>
                <div className="sentence-display mb-6 p-4 bg-white rounded-lg border-2 border-gray-200">
                  <div className="text-xl text-gray-800 mb-2">
                    <strong>Original:</strong>
                  </div>
                  <div className="text-lg text-gray-600 mb-4">
                    {currentLevelData[currentVocabType][currentQuestionIndex % currentLevelData[currentVocabType].length].sentenceTemplate
                      ?.split(
                        currentLevelData[currentVocabType][currentQuestionIndex % currentLevelData[currentVocabType].length].swapFrom || "",
                      )
                      .map((part, index, array) => (
                        <span key={index}>
                          {part}
                          {index < array.length - 1 && (
                            <span className="underline bg-yellow-200 px-1 font-bold text-red-600">
                              {
                                currentLevelData[currentVocabType][currentQuestionIndex % currentLevelData[currentVocabType].length]
                                  .swapFrom
                              }
                            </span>
                          )}
                        </span>
                      ))}
                  </div>
                  <div className="text-xl text-gray-800 mb-2">
                    <strong>Choose the best replacement:</strong>
                  </div>
                </div>

                <div className="options grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
                  {quizOptions.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => setSelectedOption(option)}
                      className={cn(
                        "option rounded-xl border-2 p-4 font-bold transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4CAF50]",
                        selectedOption === option
                          ? "bg-[#4CAF50] text-white border-[#4CAF50]"
                          : "bg-white text-gray-800 border-gray-300",
                        feedbackType === "correct" &&
                          option ===
                            currentLevelData[currentVocabType][currentQuestionIndex % currentLevelData[currentVocabType].length].word &&
                          "bg-[#4CAF50] text-white",
                        feedbackType === "incorrect" &&
                          option === selectedOption &&
                          option !==
                            currentLevelData[currentVocabType][currentQuestionIndex % currentLevelData[currentVocabType].length].word &&
                          "bg-[#f44336] text-white",
                      )}
                      disabled={!!feedbackMessage}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {showQuizSubmit && (
                  <Button
                    onClick={checkSwapAnswer}
                    className="btn btn-primary mt-5 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#45a049] px-6 py-3 font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    disabled={!!feedbackMessage}
                  >
                    Check Answer
                  </Button>
                )}

                {feedbackType === "correct" && (
                  <div className="mt-4 p-4 bg-green-100 rounded-lg border border-green-300">
                    <div className="text-green-800 font-bold mb-2">✅ Perfect! Here's the improved sentence:</div>
                    <div className="text-lg text-green-700">
                      {currentLevelData[currentVocabType][currentQuestionIndex % currentLevelData[currentVocabType].length]
                        .sentenceAnswer ||
                        currentLevelData[currentVocabType][
                          currentQuestionIndex % currentLevelData[currentVocabType].length
                        ].sentenceTemplate?.replace(
                          currentLevelData[currentVocabType][currentQuestionIndex % currentLevelData[currentVocabType].length].swapFrom ||
                            "",
                          currentLevelData[currentVocabType][currentQuestionIndex % currentLevelData[currentVocabType].length].word,
                        )}
                    </div>
                  </div>
                )}
              </Card>
              <div className="mt-5 text-center">
                <Button
                  onClick={nextStage}
                  variant="outline"
                  className="rounded-full px-6 py-2 font-bold text-gray-600 border-gray-300 hover:bg-gray-100 bg-transparent"
                >
                  Ready for Next Stage ➡️
                </Button>
              </div>
              {feedbackMessage && (
                <div
                  className={cn(
                    "feedback mt-5 rounded-lg p-4 text-center font-bold",
                    feedbackType === "correct" && "bg-green-100 text-green-800 border border-green-300",
                    feedbackType === "incorrect" && "bg-red-100 text-red-800 border border-red-300",
                  )}
                >
                  {feedbackMessage}
                </div>
              )}
            </div>
          )}

          {/* Game Completion Screen */}
          {currentStage === 5 && (
            <div id="completion" className="stage-content text-center">
              <Card className="completion-card rounded-xl bg-gradient-to-br from-green-100 to-blue-100 p-8">
                <div className="mb-6">
                  <h2 className="text-4xl font-bold text-green-800 mb-4">🎉 Vocabulary Mastery Complete!</h2>
                  <p className="text-xl text-gray-700 mb-6">
                    Fantastic work! You've mastered all the vocabulary words through 4 challenging stages.
                  </p>
                  <div className="final-score mb-6 p-4 bg-white rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold text-purple-600">Final Score: {score} points</h3>
                  </div>
                </div>

                <div className="writing-section">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Use Your New Vocabulary?</h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Now it's time to put your vocabulary skills to the test in real writing!
                  </p>

                  <a
                    href="https://writeandimprove.com/workbooks#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button className="writing-button text-xl px-8 py-4 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#feca57] text-white font-bold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                      ✍️ Start Writing with Your New Vocabulary!
                    </Button>
                  </a>

                  <div className="mt-6 flex gap-4 justify-center">
                    <Button
                      onClick={() => setShowLevelSelect(true)}
                      className="rounded-full px-8 py-4 font-bold bg-gradient-to-br from-purple-600 to-blue-600 text-white text-lg"
                    >
                      📚 Choose Next Level
                    </Button>
                    <Button
                      onClick={resetGame}
                      variant="outline"
                      className="rounded-full px-6 py-3 font-bold text-gray-600 border-gray-300 hover:bg-gray-100 bg-transparent"
                    >
                      🔄 Replay This Level
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Close game-content div */}
          </div>
          )}

          <div id="achievements" className="achievements mt-5 flex flex-wrap gap-2">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="achievement rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-gray-800"
              >
                {achievement}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

interface FlipCardProps {
  wordData: VocabularyItem
}

function FlipCard({ wordData }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="flip-card cursor-pointer h-48"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: "1000px" }}
    >
      <div
        className={cn(
          "flip-card-inner relative h-full w-full text-center transition-transform duration-600",
          isFlipped && "rotate-y-180",
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className={cn(
            "flip-card-front absolute flex h-full w-full flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] p-5 text-white shadow-md",
            isFlipped ? "z-0" : "z-10", // Front is on top when not flipped
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <h3 className="mb-2 text-3xl font-bold">{wordData.word}</h3>
          <p>Click to reveal meaning</p>
        </div>
        <div
          className={cn(
            "flip-card-back absolute flex h-full w-full flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#ffecd2] to-[#fcb69f] p-5 text-gray-800 shadow-md",
            "transform rotate-y-180",
            isFlipped ? "z-10" : "z-0", // Back is on top when flipped
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <h4 className="mb-2 text-lg font-bold text-gray-700">Meaning:</h4>
          <p className="text-base">{wordData.meaning}</p>
          <h4 className="mb-2 mt-3 text-lg font-bold text-gray-700">Impression:</h4>
          <p className="text-base">{wordData.impression}</p>
        </div>
      </div>
    </div>
  )
}
