/**
 * The 1000 Most Common Words in English
 * Organized by part of speech for vocabulary learning
 *
 * This data structure supports the vocabulary builder app's goal of helping
 * students fluently understand and use these fundamental words through:
 * 1. Learning the words (recognition and meaning)
 * 2. Using the words (active application)
 * 3. Understanding the author's choice (contextual analysis)
 */

export const commonWords = {
  /**
   * Part 1: Foundational words for understanding texts
   */
  adjectives: [
    "able", "adult", "all", "alone", "American", "another", "any", "available",
    "bad", "beautiful", "best", "better", "big", "black", "blue", "born", "both",
    "central", "certain", "civil", "clear", "close", "cold", "commercial", "common",
    "cultural", "current", "dark", "dead", "deep", "democratic", "different", "difficult",
    "each", "early", "easy", "economic", "eight", "enough", "entire", "environmental",
    "expert", "family", "far", "fast", "federal", "few", "final", "financial", "fine",
    "firm", "first", "five", "foreign", "former", "four", "free", "full", "future",
    "general", "good", "great", "green", "happy", "hard", "heavy", "high", "hot",
    "huge", "human", "important", "individual", "interesting", "international", "last",
    "large", "late", "left", "legal", "likely", "little", "local", "long", "low",
    "main", "major", "many", "material", "medical", "military", "modern", "national",
    "natural", "necessary", "new", "next", "nice", "official", "ok", "old", "one",
    "open", "other", "particular", "past", "patient", "personal", "physical", "political",
    "poor", "popular", "positive", "possible", "present", "private", "professional",
    "public", "ready", "real", "recent", "red", "religious", "Republican", "rich",
    "right", "safe", "same", "second", "senior", "serious", "several", "sexual",
    "short", "significant", "similar", "simple", "single", "six", "small", "social",
    "some", "southern", "special", "specific", "standard", "still", "strong", "successful",
    "such", "sure", "ten", "third", "three", "total", "tough", "traditional", "true",
    "two", "various", "white", "whole", "wide", "wrong", "young"
  ],

  nouns: [
    "ability", "account", "action", "activity", "address", "administration", "adult",
    "age", "agency", "agent", "agreement", "air", "amount", "analysis", "animal",
    "another", "answer", "anyone", "anything", "approach", "area", "arm", "art",
    "article", "artist", "attention", "attorney", "audience", "author", "authority",
    "baby", "bag", "ball", "bank", "bar", "base", "bed", "behavior", "benefit",
    "billion", "bit", "blood", "board", "body", "book", "both", "box", "boy",
    "brother", "budget", "building", "business", "camera", "campaign", "cancer",
    "candidate", "capital", "car", "card", "care", "career", "case", "cause", "cell",
    "center", "century", "chair", "challenge", "chance", "character", "child", "choice",
    "church", "citizen", "city", "civil", "claim", "class", "coach", "collection",
    "college", "color", "community", "company", "computer", "concern", "condition",
    "conference", "Congress", "consumer", "control", "cost", "country", "couple",
    "course", "court", "cover", "crime", "culture", "cup", "customer", "data",
    "daughter", "day", "death", "debate", "decade", "decision", "defense", "degree",
    "Democrat", "design", "detail", "development", "difference", "dinner", "direction",
    "director", "discussion", "disease", "doctor", "dog", "door", "dream", "drug",
    "east", "economy", "edge", "education", "effect", "effort", "eight", "election",
    "employee", "end", "energy", "environment", "evening", "event", "everybody",
    "everyone", "everything", "evidence", "example", "executive", "experience", "expert",
    "eye", "face", "fact", "factor", "fail", "family", "father", "fear", "feeling",
    "few", "field", "figure", "film", "finger", "fire", "fish", "five", "floor",
    "food", "foot", "force", "form", "former", "four", "friend", "front", "fund",
    "future", "game", "garden", "gas", "generation", "girl", "glass", "goal", "good",
    "government", "ground", "group", "growth", "gun", "guy", "hair", "half", "hand",
    "head", "health", "heart", "heat", "husband", "I", "idea", "image", "impact",
    "individual", "industry", "information", "institution", "interest", "interview",
    "investment", "issue", "item", "itself", "job", "key", "kid", "kind", "kitchen",
    "knowledge", "land", "language", "law", "lawyer", "leader", "leg", "letter",
    "level", "life", "light", "line", "list", "loss", "lot", "machine", "magazine",
    "majority", "man", "management", "manager", "many", "market", "marriage", "material",
    "matter", "me", "media", "meeting", "member", "memory", "message", "method",
    "middle", "million", "mind", "minute", "mission", "model", "moment", "money",
    "month", "morning", "most", "mother", "mouth", "movement", "movie", "Mr", "Mrs",
    "much", "music", "myself", "name", "nation", "nature", "need", "network", "news",
    "newspaper", "night", "none", "north", "note", "nothing", "number", "office",
    "officer", "oil", "one", "operation", "opportunity", "option", "order", "organization",
    "other", "others", "owner", "page", "pain", "painting", "paper", "parent", "part",
    "participant", "partner", "party", "past", "patient", "pattern", "pay", "peace",
    "people", "performance", "period", "person", "phone", "picture", "piece", "place",
    "plan", "plant", "player", "PM", "point", "police", "policy", "politics", "population",
    "position", "power", "practice", "president", "pressure", "price", "problem",
    "process", "product", "production", "professional", "professor", "program", "project",
    "property", "purpose", "quality", "question", "race", "radio", "range", "rate",
    "reason", "reality", "record", "region", "relationship", "report", "Republican",
    "research", "resource", "response", "responsibility", "rest", "result", "risk",
    "road", "rock", "role", "room", "rule", "run", "safe", "same", "scene", "school",
    "science", "scientist", "score", "sea", "season", "seat", "section", "security",
    "sense", "series", "service", "seven", "sex", "shake", "share", "she", "shot",
    "shoulder", "show", "side", "sign", "sister", "site", "situation", "six", "size",
    "skill", "skin", "society", "soldier", "someone", "somebody", "something", "son",
    "song", "sort", "sound", "source", "south", "space", "speech", "sport", "spring",
    "staff", "stage", "standard", "star", "state", "statement", "station", "step",
    "stock", "stop", "store", "story", "strategy", "street", "structure", "student",
    "stuff", "style", "subject", "success", "summer", "support", "surface", "system",
    "table", "task", "tax", "teacher", "team", "technology", "television", "term",
    "test", "them", "themselves", "theory", "they", "thing", "thought", "thousand",
    "threat", "three", "time", "today", "tonight", "top", "town", "trade", "training",
    "treatment", "tree", "trial", "trip", "trouble", "truth", "TV", "two", "type",
    "unit", "us", "usually", "value", "victim", "view", "violence", "visit", "voice",
    "vote", "wait", "walk", "wall", "want", "war", "watch", "water", "way", "we",
    "weapon", "week", "weight", "west", "wife", "will", "wind", "window", "woman",
    "wonder", "word", "worker", "world", "writer", "wrong", "yard", "year", "yes",
    "you", "yourself"
  ],

  prepositions: [
    "about", "above", "according", "across", "after", "against", "along", "among",
    "around", "as", "at", "before", "behind", "between", "beyond", "but", "by",
    "despite", "down", "during", "for", "from", "in", "including", "inside", "into",
    "like", "near", "next", "of", "off", "on", "onto", "outside", "over", "per",
    "past", "since", "through", "throughout", "to", "toward", "under", "until", "up",
    "upon", "with", "within", "without"
  ],

  /**
   * Part 2: Action and descriptive words for expression
   */
  verbs: [
    "accept", "act", "add", "admit", "affect", "agree", "allow", "appear", "apply",
    "approach", "argue", "arm", "arrive", "ask", "assume", "attack", "avoid", "back",
    "bar", "base", "be", "beat", "become", "begin", "believe", "better", "bill",
    "board", "book", "box", "break", "bring", "build", "but", "buy", "call", "campaign",
    "carry", "catch", "cause", "chair", "change", "charge", "check", "choose", "claim",
    "clear", "close", "coach", "color", "come", "compare", "concern", "consider",
    "contain", "continue", "control", "cost", "cover", "create", "cut", "deal",
    "decide", "describe", "design", "determine", "develop", "die", "discover", "discuss",
    "do", "draw", "drive", "drop", "eat", "effect", "end", "enjoy", "enter", "establish",
    "exist", "expect", "experience", "explain", "eye", "face", "fail", "fall", "factor",
    "fear", "feel", "fight", "figure", "fill", "find", "fine", "finish", "fire",
    "fish", "fly", "focus", "follow", "forget", "form", "free", "get", "give", "go",
    "grow", "guess", "hand", "hang", "happen", "have", "head", "hear", "heat", "help",
    "hit", "hold", "hope", "house", "identify", "imagine", "impact", "improve",
    "include", "increase", "indicate", "interest", "interview", "involve", "issue",
    "join", "keep", "kid", "kill", "know", "land", "laugh", "lay", "lead", "learn",
    "leave", "let", "lie", "light", "line", "list", "listen", "live", "long", "look",
    "lose", "love", "machine", "maintain", "make", "manage", "market", "matter",
    "mean", "measure", "meet", "mention", "mind", "miss", "model", "mother", "move",
    "name", "need", "network", "notice", "number", "occur", "offer", "on", "open",
    "order", "outside", "own", "paint", "part", "pass", "pay", "perform", "phone",
    "pick", "picture", "place", "plan", "plant", "play", "point", "position", "power",
    "practice", "prepare", "present", "prevent", "price", "process", "produce",
    "professional", "program", "project", "protect", "prove", "provide", "public",
    "pull", "push", "put", "question", "race", "raise", "range", "rate", "reach",
    "read", "realize", "receive", "recognize", "record", "reduce", "reflect", "relate",
    "remain", "remember", "remove", "report", "represent", "require", "research",
    "respond", "rest", "result", "return", "reveal", "rise", "risk", "rock", "rule",
    "run", "save", "say", "school", "score", "see", "seek", "seem", "sell", "send",
    "serve", "set", "shake", "share", "shoot", "show", "sign", "sing", "single",
    "sit", "site", "skin", "smile", "sort", "sound", "speak", "spend", "spring",
    "staff", "stage", "stand", "start", "state", "station", "stay", "step", "stock",
    "stop", "store", "study", "stuff", "subject", "suffer", "suggest", "support",
    "surface", "take", "talk", "tax", "teach", "tell", "tend", "test", "thank",
    "think", "throw", "time", "total", "trade", "travel", "treat", "trouble", "try",
    "turn", "type", "understand", "up", "use", "value", "view", "visit", "voice",
    "vote", "wait", "walk", "want", "watch", "water", "wear", "win", "wind", "wish",
    "wonder", "word", "work", "worry", "write"
  ],

  adverbs: [
    "actually", "again", "ago", "ahead", "almost", "already", "also", "always",
    "away", "back", "certainly", "clearly", "close", "deep", "down", "early", "else",
    "especially", "even", "ever", "exactly", "far", "fast", "finally", "first",
    "forward", "half", "hard", "here", "high", "however", "how", "indeed", "instead",
    "just", "late", "later", "least", "less", "likely", "little", "long", "maybe",
    "more", "most", "much", "nearly", "never", "not", "now", "once", "only", "out",
    "particularly", "perhaps", "pretty", "probably", "quickly", "quite", "rather",
    "really", "recently", "second", "simply", "so", "sometimes", "soon", "still",
    "suddenly", "then", "there", "thus", "today", "together", "tonight", "too",
    "usually", "very", "well", "when", "where", "why", "wide", "yeah", "yes", "yet"
  ]
} as const;

/**
 * Helper type for accessing word categories
 */
export type WordCategory = keyof typeof commonWords;

/**
 * Get total word count across all categories
 */
export const getTotalWordCount = (): number => {
  return Object.values(commonWords).reduce((total, words) => total + words.length, 0);
};

/**
 * Get word count by category
 */
export const getWordCountByCategory = (category: WordCategory): number => {
  return commonWords[category].length;
};

/**
 * Check if a word exists in the common words list
 */
export const isCommonWord = (word: string): boolean => {
  const lowerWord = word.toLowerCase();
  return Object.values(commonWords).some(categoryWords =>
    categoryWords.includes(lowerWord as any)
  );
};

/**
 * Get the category of a word
 */
export const getWordCategory = (word: string): WordCategory | null => {
  const lowerWord = word.toLowerCase();
  for (const [category, words] of Object.entries(commonWords)) {
    if (words.includes(lowerWord as any)) {
      return category as WordCategory;
    }
  }
  return null;
};

/**
 * Get random words from a specific category
 */
export const getRandomWordsFromCategory = (
  category: WordCategory,
  count: number
): string[] => {
  const words = [...commonWords[category]];
  const shuffled = words.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

/**
 * Get random words from all categories
 */
export const getRandomWords = (count: number): string[] => {
  const allWords = Object.values(commonWords).flat();
  const shuffled = allWords.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
