const fs = require('fs');
const path = require('path');

// Import the common words data
const commonWords = {
  adjectives: ["able", "adult", "all", "alone", "American", "another", "any", "available",
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
    "two", "various", "white", "whole", "wide", "wrong", "young"],

  nouns: ["ability", "account", "action", "activity", "address", "administration", "adult",
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
    "you", "yourself"],

  verbs: ["accept", "act", "add", "admit", "affect", "agree", "allow", "appear", "apply",
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
    "wonder", "word", "work", "worry", "write"],

  adverbs: ["actually", "again", "ago", "ahead", "almost", "already", "also", "always",
    "away", "back", "certainly", "clearly", "close", "deep", "down", "early", "else",
    "especially", "even", "ever", "exactly", "far", "fast", "finally", "first",
    "forward", "half", "hard", "here", "high", "however", "how", "indeed", "instead",
    "just", "late", "later", "least", "less", "likely", "little", "long", "maybe",
    "more", "most", "much", "nearly", "never", "not", "now", "once", "only", "out",
    "particularly", "perhaps", "pretty", "probably", "quickly", "quite", "rather",
    "really", "recently", "second", "simply", "so", "sometimes", "soon", "still",
    "suddenly", "then", "there", "thus", "today", "together", "tonight", "too",
    "usually", "very", "well", "when", "where", "why", "wide", "yeah", "yes", "yet"]
};

// Bahasa Melayu translations for common words
const malayTranslations = {
  // Verbs
  'accept': 'menerima', 'act': 'bertindak', 'add': 'tambah', 'agree': 'bersetuju', 'allow': 'membenarkan',
  'appear': 'muncul', 'ask': 'bertanya', 'become': 'menjadi', 'begin': 'mulai', 'believe': 'percaya',
  'bring': 'bawa', 'build': 'membina', 'buy': 'beli', 'call': 'panggil', 'carry': 'membawa',
  'change': 'tukar', 'check': 'semak', 'choose': 'pilih', 'come': 'datang', 'continue': 'teruskan',
  'create': 'cipta', 'decide': 'putuskan', 'develop': 'membangunkan', 'do': 'buat', 'eat': 'makan',
  'end': 'tamat', 'enjoy': 'nikmati', 'enter': 'masuk', 'exist': 'wujud', 'expect': 'jangka',
  'explain': 'terangkan', 'feel': 'rasa', 'find': 'cari', 'finish': 'selesai', 'follow': 'ikut',
  'get': 'dapat', 'give': 'beri', 'go': 'pergi', 'grow': 'tumbuh', 'happen': 'berlaku',
  'have': 'ada', 'hear': 'dengar', 'help': 'tolong', 'hold': 'pegang', 'hope': 'harap',
  'include': 'termasuk', 'keep': 'simpan', 'know': 'tahu', 'learn': 'belajar', 'leave': 'tinggalkan',
  'let': 'biar', 'like': 'suka', 'listen': 'dengar', 'live': 'hidup', 'look': 'lihat',
  'lose': 'kalah', 'love': 'cinta', 'make': 'buat', 'mean': 'maksud', 'meet': 'jumpa',
  'move': 'bergerak', 'need': 'perlukan', 'open': 'buka', 'pay': 'bayar', 'play': 'main',
  'provide': 'sediakan', 'put': 'letak', 'read': 'baca', 'receive': 'terima', 'remember': 'ingat',
  'run': 'lari', 'say': 'kata', 'see': 'nampak', 'seem': 'nampak', 'sell': 'jual',
  'send': 'hantar', 'serve': 'berkhidmat', 'show': 'tunjuk', 'sit': 'duduk', 'speak': 'bercakap',
  'spend': 'belanjakan', 'stand': 'berdiri', 'start': 'mula', 'stay': 'tinggal', 'stop': 'berhenti',
  'study': 'belajar', 'take': 'ambil', 'talk': 'bercakap', 'teach': 'ajar', 'tell': 'beritahu',
  'think': 'fikir', 'try': 'cuba', 'turn': 'pusing', 'understand': 'faham', 'use': 'guna',
  'visit': 'lawat', 'wait': 'tunggu', 'walk': 'jalan', 'want': 'mahu', 'watch': 'tonton',
  'work': 'kerja', 'write': 'tulis',

  // Adjectives
  'able': 'boleh', 'all': 'semua', 'bad': 'buruk', 'beautiful': 'cantik', 'best': 'terbaik',
  'better': 'lebih baik', 'big': 'besar', 'black': 'hitam', 'blue': 'biru', 'both': 'kedua',
  'clear': 'jelas', 'close': 'dekat', 'cold': 'sejuk', 'common': 'biasa', 'different': 'berbeza',
  'difficult': 'sukar', 'early': 'awal', 'easy': 'mudah', 'enough': 'cukup', 'fast': 'cepat',
  'few': 'sedikit', 'final': 'akhir', 'fine': 'baik', 'first': 'pertama', 'five': 'lima',
  'free': 'percuma', 'full': 'penuh', 'good': 'baik', 'great': 'hebat', 'green': 'hijau',
  'happy': 'gembira', 'hard': 'keras', 'high': 'tinggi', 'hot': 'panas', 'huge': 'besar',
  'important': 'penting', 'large': 'besar', 'last': 'terakhir', 'late': 'lewat', 'little': 'kecil',
  'long': 'panjang', 'low': 'rendah', 'main': 'utama', 'many': 'banyak', 'modern': 'moden',
  'national': 'nasional', 'natural': 'semula jadi', 'necessary': 'perlu', 'new': 'baru', 'next': 'seterusnya',
  'nice': 'bagus', 'old': 'lama', 'one': 'satu', 'open': 'terbuka', 'other': 'lain',
  'poor': 'miskin', 'popular': 'popular', 'possible': 'mungkin', 'present': 'hadir', 'public': 'awam',
  'ready': 'sedia', 'real': 'sebenar', 'recent': 'baru-baru ini', 'red': 'merah', 'rich': 'kaya',
  'right': 'betul', 'safe': 'selamat', 'same': 'sama', 'second': 'kedua', 'serious': 'serius',
  'short': 'pendek', 'simple': 'mudah', 'single': 'tunggal', 'six': 'enam', 'small': 'kecil',
  'social': 'sosial', 'special': 'istimewa', 'strong': 'kuat', 'sure': 'pasti', 'ten': 'sepuluh',
  'third': 'ketiga', 'three': 'tiga', 'total': 'jumlah', 'traditional': 'tradisional', 'true': 'benar',
  'two': 'dua', 'white': 'putih', 'whole': 'keseluruhan', 'wide': 'lebar', 'wrong': 'salah',
  'young': 'muda',

  // Nouns
  'ability': 'kebolehan', 'action': 'tindakan', 'activity': 'aktiviti', 'age': 'umur', 'air': 'udara',
  'animal': 'haiwan', 'answer': 'jawapan', 'area': 'kawasan', 'arm': 'lengan', 'art': 'seni',
  'baby': 'bayi', 'ball': 'bola', 'bank': 'bank', 'base': 'asas', 'bed': 'katil',
  'book': 'buku', 'box': 'kotak', 'boy': 'budak lelaki', 'brother': 'abang', 'building': 'bangunan',
  'business': 'perniagaan', 'car': 'kereta', 'card': 'kad', 'care': 'penjagaan', 'case': 'kes',
  'center': 'pusat', 'century': 'abad', 'chair': 'kerusi', 'chance': 'peluang', 'change': 'perubahan',
  'child': 'kanak-kanak', 'choice': 'pilihan', 'church': 'gereja', 'city': 'bandar', 'class': 'kelas',
  'color': 'warna', 'community': 'komuniti', 'company': 'syarikat', 'computer': 'komputer', 'country': 'negara',
  'day': 'hari', 'death': 'kematian', 'decision': 'keputusan', 'design': 'reka bentuk', 'development': 'pembangunan',
  'difference': 'perbezaan', 'dinner': 'makan malam', 'direction': 'arah', 'doctor': 'doktor', 'dog': 'anjing',
  'door': 'pintu', 'dream': 'mimpi', 'east': 'timur', 'economy': 'ekonomi', 'education': 'pendidikan',
  'effect': 'kesan', 'effort': 'usaha', 'end': 'penghujung', 'energy': 'tenaga', 'environment': 'alam sekitar',
  'evening': 'petang', 'event': 'acara', 'example': 'contoh', 'experience': 'pengalaman', 'eye': 'mata',
  'face': 'muka', 'fact': 'fakta', 'family': 'keluarga', 'father': 'bapa', 'fear': 'ketakutan',
  'feeling': 'perasaan', 'field': 'padang', 'film': 'filem', 'finger': 'jari', 'fire': 'api',
  'fish': 'ikan', 'floor': 'lantai', 'food': 'makanan', 'foot': 'kaki', 'force': 'kuasa',
  'form': 'borang', 'friend': 'kawan', 'future': 'masa depan', 'game': 'permainan', 'garden': 'taman',
  'girl': 'budak perempuan', 'glass': 'gelas', 'goal': 'matlamat', 'government': 'kerajaan', 'ground': 'tanah',
  'group': 'kumpulan', 'growth': 'pertumbuhan', 'gun': 'senapang', 'hair': 'rambut', 'hand': 'tangan',
  'head': 'kepala', 'health': 'kesihatan', 'heart': 'hati', 'heat': 'haba', 'home': 'rumah',
  'house': 'rumah', 'husband': 'suami', 'idea': 'idea', 'image': 'imej', 'impact': 'impak',
  'information': 'maklumat', 'interest': 'minat', 'issue': 'isu', 'job': 'pekerjaan', 'key': 'kunci',
  'kid': 'kanak-kanak', 'kind': 'jenis', 'kitchen': 'dapur', 'knowledge': 'ilmu', 'land': 'tanah',
  'language': 'bahasa', 'law': 'undang-undang', 'leader': 'pemimpin', 'leg': 'kaki', 'letter': 'surat',
  'level': 'tahap', 'life': 'kehidupan', 'light': 'cahaya', 'line': 'garisan', 'list': 'senarai',
  'lot': 'banyak', 'machine': 'mesin', 'man': 'lelaki', 'market': 'pasar', 'marriage': 'perkahwinan',
  'material': 'bahan', 'matter': 'perkara', 'media': 'media', 'meeting': 'mesyuarat', 'member': 'ahli',
  'memory': 'ingatan', 'message': 'mesej', 'method': 'kaedah', 'million': 'juta', 'mind': 'fikiran',
  'minute': 'minit', 'model': 'model', 'moment': 'saat', 'money': 'wang', 'month': 'bulan',
  'morning': 'pagi', 'mother': 'ibu', 'mouth': 'mulut', 'movement': 'pergerakan', 'movie': 'filem',
  'music': 'muzik', 'name': 'nama', 'nation': 'negara', 'nature': 'alam semula jadi', 'need': 'keperluan',
  'news': 'berita', 'night': 'malam', 'north': 'utara', 'number': 'nombor', 'office': 'pejabat',
  'oil': 'minyak', 'opportunity': 'peluang', 'option': 'pilihan', 'order': 'pesanan', 'organization': 'organisasi',
  'page': 'halaman', 'pain': 'kesakitan', 'paper': 'kertas', 'parent': 'ibu bapa', 'part': 'bahagian',
  'party': 'parti', 'past': 'masa lalu', 'peace': 'keamanan', 'people': 'orang', 'period': 'tempoh',
  'person': 'orang', 'phone': 'telefon', 'picture': 'gambar', 'place': 'tempat', 'plan': 'rancangan',
  'plant': 'tumbuhan', 'player': 'pemain', 'point': 'mata', 'police': 'polis', 'policy': 'dasar',
  'population': 'penduduk', 'position': 'kedudukan', 'power': 'kuasa', 'practice': 'amalan', 'president': 'presiden',
  'pressure': 'tekanan', 'price': 'harga', 'problem': 'masalah', 'process': 'proses', 'product': 'produk',
  'program': 'program', 'project': 'projek', 'quality': 'kualiti', 'question': 'soalan', 'race': 'perlumbaan',
  'radio': 'radio', 'rate': 'kadar', 'reason': 'sebab', 'record': 'rekod', 'region': 'wilayah',
  'relationship': 'hubungan', 'report': 'laporan', 'research': 'penyelidikan', 'resource': 'sumber', 'response': 'tindak balas',
  'result': 'keputusan', 'risk': 'risiko', 'road': 'jalan', 'rock': 'batu', 'role': 'peranan',
  'room': 'bilik', 'rule': 'peraturan', 'school': 'sekolah', 'science': 'sains', 'sea': 'laut',
  'season': 'musim', 'seat': 'tempat duduk', 'section': 'bahagian', 'sense': 'deria', 'series': 'siri',
  'service': 'perkhidmatan', 'sex': 'jantina', 'show': 'persembahan', 'side': 'sisi', 'sign': 'tanda',
  'sister': 'kakak', 'site': 'tapak', 'situation': 'keadaan', 'size': 'saiz', 'skill': 'kemahiran',
  'skin': 'kulit', 'society': 'masyarakat', 'son': 'anak lelaki', 'song': 'lagu', 'sound': 'bunyi',
  'source': 'sumber', 'south': 'selatan', 'space': 'ruang', 'sport': 'sukan', 'spring': 'musim bunga',
  'staff': 'kakitangan', 'stage': 'peringkat', 'star': 'bintang', 'state': 'negeri', 'station': 'stesen',
  'step': 'langkah', 'story': 'cerita', 'street': 'jalan', 'structure': 'struktur', 'student': 'pelajar',
  'study': 'kajian', 'style': 'gaya', 'subject': 'subjek', 'success': 'kejayaan', 'summer': 'musim panas',
  'support': 'sokongan', 'surface': 'permukaan', 'system': 'sistem', 'table': 'meja', 'task': 'tugasan',
  'tax': 'cukai', 'teacher': 'guru', 'team': 'pasukan', 'technology': 'teknologi', 'term': 'istilah',
  'test': 'ujian', 'theory': 'teori', 'thing': 'perkara', 'thought': 'fikiran', 'time': 'masa',
  'today': 'hari ini', 'tonight': 'malam ini', 'town': 'pekan', 'trade': 'perdagangan', 'training': 'latihan',
  'tree': 'pokok', 'trip': 'perjalanan', 'trouble': 'masalah', 'truth': 'kebenaran', 'type': 'jenis',
  'value': 'nilai', 'view': 'pandangan', 'visit': 'lawatan', 'voice': 'suara', 'vote': 'undi',
  'wait': 'tunggu', 'walk': 'berjalan', 'wall': 'dinding', 'war': 'perang', 'watch': 'jam tangan',
  'water': 'air', 'way': 'cara', 'weapon': 'senjata', 'week': 'minggu', 'west': 'barat',
  'wife': 'isteri', 'wind': 'angin', 'window': 'tingkap', 'woman': 'wanita', 'word': 'perkataan',
  'work': 'kerja', 'worker': 'pekerja', 'world': 'dunia', 'writer': 'penulis', 'year': 'tahun',

  // Adverbs
  'actually': 'sebenarnya', 'again': 'lagi', 'almost': 'hampir', 'already': 'sudah', 'also': 'juga',
  'always': 'sentiasa', 'certainly': 'sudah tentu', 'clearly': 'jelas', 'down': 'bawah', 'early': 'awal',
  'especially': 'terutamanya', 'even': 'malah', 'ever': 'pernah', 'exactly': 'tepat', 'far': 'jauh',
  'fast': 'cepat', 'finally': 'akhirnya', 'first': 'pertama', 'half': 'separuh', 'hard': 'keras',
  'here': 'sini', 'high': 'tinggi', 'however': 'walau bagaimanapun', 'just': 'hanya', 'late': 'lewat',
  'later': 'kemudian', 'least': 'sekurang-kurangnya', 'less': 'kurang', 'little': 'sedikit', 'long': 'lama',
  'maybe': 'mungkin', 'more': 'lebih', 'most': 'paling', 'much': 'banyak', 'nearly': 'hampir',
  'never': 'tidak pernah', 'not': 'tidak', 'now': 'sekarang', 'often': 'sering', 'once': 'sekali',
  'only': 'hanya', 'perhaps': 'mungkin', 'probably': 'mungkin', 'quickly': 'dengan cepat', 'quite': 'agak',
  'rather': 'agak', 'really': 'benar-benar', 'recently': 'baru-baru ini', 'simply': 'mudah', 'so': 'jadi',
  'sometimes': 'kadang-kadang', 'soon': 'tidak lama lagi', 'still': 'masih', 'suddenly': 'tiba-tiba', 'then': 'kemudian',
  'there': 'sana', 'thus': 'oleh itu', 'today': 'hari ini', 'together': 'bersama', 'tonight': 'malam ini',
  'too': 'juga', 'usually': 'biasanya', 'very': 'sangat', 'well': 'baik', 'when': 'bila',
  'where': 'di mana', 'why': 'kenapa', 'yes': 'ya', 'yet': 'lagi'
};

function getLevelWords(levelNum) {
  const verbsPerLevel = Math.ceil(commonWords.verbs.length / 12);
  const adjectivesPerLevel = Math.ceil(commonWords.adjectives.length / 12);
  const nounsPerLevel = Math.ceil(commonWords.nouns.length / 12);
  const adverbsPerLevel = Math.ceil(commonWords.adverbs.length / 12);

  const levelIndex = levelNum - 1;

  return {
    verbs: commonWords.verbs.slice(levelIndex * verbsPerLevel, (levelIndex + 1) * verbsPerLevel),
    adjectives: commonWords.adjectives.slice(levelIndex * adjectivesPerLevel, (levelIndex + 1) * adjectivesPerLevel),
    nouns: commonWords.nouns.slice(levelIndex * nounsPerLevel, (levelIndex + 1) * nounsPerLevel),
    adverbs: commonWords.adverbs.slice(levelIndex * adverbsPerLevel, (levelIndex + 1) * adverbsPerLevel),
  };
}

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateLevelTest(levelNum) {
  const words = getLevelWords(levelNum);
  const allWords = [...words.verbs, ...words.adjectives, ...words.nouns, ...words.adverbs];
  const shuffledWords = shuffle(allWords);

  const questions = [];
  let questionNum = 1;

  // 4 MCQ questions
  for (let i = 0; i < 4; i++) {
    const word = shuffledWords[i];
    const malayWord = malayTranslations[word] || '(tiada terjemahan)';
    const wrongAnswers = shuffle(allWords.filter(w => w !== word)).slice(0, 3);
    const allOptions = shuffle([word, ...wrongAnswers]);

    questions.push({
      type: 'mcq',
      number: questionNum++,
      question: `What is the English word for "${malayWord}"?`,
      malayQuestion: `Apakah perkataan Inggeris bagi "${malayWord}"?`,
      options: allOptions,
      answer: word
    });
  }

  // 4 odd-one-out questions
  for (let i = 0; i < 4; i++) {
    const categories = ['verbs', 'adjectives', 'nouns', 'adverbs'];
    const categoryIndex = i % 4;
    const category = categories[categoryIndex];
    const categoryWords = words[category];

    if (categoryWords.length >= 3) {
      const sameCategory = shuffle(categoryWords).slice(0, 3);
      const otherCategories = categories.filter(c => c !== category);
      const differentCategory = otherCategories[Math.floor(Math.random() * otherCategories.length)];
      const differentWord = words[differentCategory][0] || shuffledWords[i + 10];

      const allOptions = shuffle([...sameCategory, differentWord]);

      questions.push({
        type: 'odd-one-out',
        number: questionNum++,
        question: `Which word is the odd one out?`,
        malayQuestion: `Perkataan mana yang berbeza?`,
        options: allOptions,
        answer: differentWord,
        hint: `The other words are ${category}`
      });
    }
  }

  // 4 missing word questions
  const sentences = [
    { template: 'I %WORD% to the store yesterday.', type: 'verb', example: 'went' },
    { template: 'The %WORD% is very important.', type: 'noun', example: 'book' },
    { template: 'She is very %WORD% today.', type: 'adjective', example: 'happy' },
    { template: 'He speaks %WORD%.', type: 'adverb', example: 'clearly' },
  ];

  for (let i = 0; i < 4; i++) {
    const sentenceTemplate = sentences[i];
    const wordType = sentenceTemplate.type + 's';
    const correctWord = words[wordType][i] || shuffledWords[i + 8];
    const sentence = sentenceTemplate.template.replace('%WORD%', '_____');
    const wrongAnswers = shuffle(allWords.filter(w => w !== correctWord)).slice(0, 3);
    const allOptions = shuffle([correctWord, ...wrongAnswers]);

    questions.push({
      type: 'missing-word',
      number: questionNum++,
      question: sentence,
      malayQuestion: `Isi tempat kosong:`,
      options: allOptions,
      answer: correctWord
    });
  }

  return { levelNum, questions: shuffle(questions) };
}

function createLevelTestHTML(testData) {
  const { levelNum, questions } = testData;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Level ${levelNum} Vocabulary Test</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            margin-bottom: 30px;
        }
        h1 {
            margin: 0;
            font-size: 24px;
        }
        .subtitle {
            font-size: 14px;
            margin-top: 5px;
            font-style: italic;
        }
        .instructions {
            background-color: #f5f5f5;
            padding: 15px;
            margin-bottom: 20px;
            border: 1px solid #000;
        }
        .question {
            margin-bottom: 25px;
            page-break-inside: avoid;
        }
        .question-number {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .malay-text {
            font-style: italic;
            color: #555;
            font-size: 14px;
        }
        .options {
            margin-left: 20px;
            margin-top: 10px;
        }
        .option {
            margin: 5px 0;
        }
        .answer-key {
            margin-top: 40px;
            border-top: 2px solid #000;
            padding-top: 20px;
            page-break-before: always;
        }
        .answer-key h2 {
            text-align: center;
        }
        .answer-list {
            column-count: 2;
            column-gap: 30px;
        }
        .answer-item {
            margin: 5px 0;
            break-inside: avoid;
        }
        @media print {
            body {
                padding: 0;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>VOCABULARY BUILDER - LEVEL ${levelNum} TEST</h1>
        <div class="subtitle">1000 Most Common English Words</div>
        <div class="subtitle">Oral Assessment / Penilaian Lisan</div>
    </div>

    <div class="instructions">
        <strong>Instructions for Teachers / Arahan untuk Guru:</strong><br>
        Read each question aloud to students. Students may answer orally or write their answers.<br>
        <em>Baca setiap soalan dengan kuat kepada pelajar. Pelajar boleh menjawab secara lisan atau menulis jawapan mereka.</em>
    </div>

    ${questions.map(q => {
      if (q.type === 'mcq') {
        return `
    <div class="question">
        <div class="question-number">Question ${q.number}:</div>
        <div>${q.question}</div>
        <div class="malay-text">${q.malayQuestion}</div>
        <div class="options">
            ${q.options.map((opt, idx) => `<div class="option">${String.fromCharCode(65 + idx)}. ${opt}</div>`).join('')}
        </div>
    </div>`;
      } else if (q.type === 'odd-one-out') {
        return `
    <div class="question">
        <div class="question-number">Question ${q.number}:</div>
        <div>${q.question}</div>
        <div class="malay-text">${q.malayQuestion}</div>
        <div class="options">
            ${q.options.map((opt, idx) => `<div class="option">${String.fromCharCode(65 + idx)}. ${opt}</div>`).join('')}
        </div>
    </div>`;
      } else {
        return `
    <div class="question">
        <div class="question-number">Question ${q.number}:</div>
        <div>${q.question}</div>
        <div class="malay-text">${q.malayQuestion}</div>
        <div class="options">
            ${q.options.map((opt, idx) => `<div class="option">${String.fromCharCode(65 + idx)}. ${opt}</div>`).join('')}
        </div>
    </div>`;
      }
    }).join('')}

    <div class="answer-key">
        <h2>ANSWER KEY / JAWAPAN</h2>
        <div class="answer-list">
            ${questions.map(q => {
              const optionLetter = q.options.findIndex(opt => opt === q.answer);
              return `<div class="answer-item">${q.number}. ${String.fromCharCode(65 + optionLetter)} (${q.answer})</div>`;
            }).join('')}
        </div>
    </div>
</body>
</html>`;
}

function generateFormalTest(levels) {
  const allWords = [];
  levels.forEach(level => {
    const words = getLevelWords(level);
    const levelWords = [...words.verbs, ...words.adjectives, ...words.nouns, ...words.adverbs];
    allWords.push(...levelWords.map(w => ({ word: w, level })));
  });

  // Use spaced retrieval - mix from different levels, limited repetition
  const shuffledWords = shuffle(allWords);
  const selectedWords = [];
  const usedWords = new Set();

  for (const item of shuffledWords) {
    if (selectedWords.length >= 20) break;
    if (!usedWords.has(item.word)) {
      selectedWords.push(item);
      usedWords.add(item.word);
    }
  }

  const questions = selectedWords.map((item, idx) => {
    const malayWord = malayTranslations[item.word] || '(tiada terjemahan)';
    const wrongAnswers = shuffle(allWords.filter(w => w.word !== item.word).map(w => w.word)).slice(0, 3);
    const allOptions = shuffle([item.word, ...wrongAnswers]);

    return {
      number: idx + 1,
      question: `What is the English word for "${malayWord}"?`,
      malayQuestion: `Apakah perkataan Inggeris bagi "${malayWord}"?`,
      options: allOptions,
      answer: item.word,
      level: item.level
    };
  });

  return questions;
}

function createFormalTestHTML(levels, questions) {
  const levelRange = `Levels ${levels[0]}-${levels[levels.length - 1]}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formal Student Test - ${levelRange}</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #000;
            padding-bottom: 15px;
            margin-bottom: 30px;
        }
        h1 {
            margin: 0;
            font-size: 24px;
            text-transform: uppercase;
        }
        .subtitle {
            font-size: 14px;
            margin-top: 5px;
        }
        .student-info {
            margin-bottom: 30px;
            padding: 15px;
            border: 2px solid #000;
        }
        .info-row {
            margin: 10px 0;
            display: flex;
            align-items: center;
        }
        .info-label {
            font-weight: bold;
            width: 150px;
        }
        .info-line {
            flex: 1;
            border-bottom: 1px solid #000;
            height: 20px;
        }
        .instructions {
            background-color: #f5f5f5;
            padding: 15px;
            margin-bottom: 30px;
            border: 2px solid #000;
        }
        .question {
            margin-bottom: 20px;
            page-break-inside: avoid;
        }
        .question-number {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .malay-text {
            font-style: italic;
            color: #555;
            font-size: 13px;
        }
        .options {
            margin-left: 30px;
            margin-top: 8px;
        }
        .option {
            margin: 5px 0;
        }
        .marking-sheet {
            margin-top: 50px;
            page-break-before: always;
        }
        .marking-header {
            text-align: center;
            border-bottom: 3px solid #000;
            padding-bottom: 15px;
            margin-bottom: 30px;
        }
        .answer-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-bottom: 30px;
        }
        .answer-item {
            padding: 10px;
            border: 1px solid #000;
            text-align: center;
        }
        .answer-number {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .scoring {
            margin-top: 30px;
            padding: 20px;
            border: 2px solid #000;
        }
        .score-row {
            margin: 10px 0;
            display: flex;
            align-items: center;
        }
        .score-label {
            font-weight: bold;
            width: 200px;
        }
        .score-line {
            flex: 1;
            border-bottom: 1px solid #000;
            height: 25px;
        }
        @media print {
            body {
                padding: 0;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Vocabulary Builder - Formal Assessment</h1>
        <div class="subtitle">${levelRange} (1000 Most Common English Words)</div>
        <div class="subtitle">Total: 20 Multiple Choice Questions</div>
    </div>

    <div class="student-info">
        <div class="info-row">
            <div class="info-label">Student Name:</div>
            <div class="info-line"></div>
        </div>
        <div class="info-row">
            <div class="info-label">Class:</div>
            <div class="info-line"></div>
        </div>
        <div class="info-row">
            <div class="info-label">Date:</div>
            <div class="info-line"></div>
        </div>
    </div>

    <div class="instructions">
        <strong>Instructions:</strong><br>
        1. Read each question carefully.<br>
        2. Choose the BEST answer (A, B, C, or D) for each question.<br>
        3. Write your answer on a separate answer sheet or circle your choice below.<br>
        4. Each question is worth 5 marks. Total: 100 marks.<br>
        <br>
        <strong>Arahan:</strong><br>
        1. Baca setiap soalan dengan teliti.<br>
        2. Pilih jawapan TERBAIK (A, B, C, atau D) untuk setiap soalan.<br>
        3. Tulis jawapan anda pada kertas jawapan yang berasingan atau bulatkan pilihan anda di bawah.<br>
        4. Setiap soalan bernilai 5 markah. Jumlah: 100 markah.
    </div>

    ${questions.map(q => `
    <div class="question">
        <div class="question-number">Question ${q.number}:</div>
        <div>${q.question}</div>
        <div class="malay-text">${q.malayQuestion}</div>
        <div class="options">
            ${q.options.map((opt, idx) => `<div class="option">${String.fromCharCode(65 + idx)}. ${opt}</div>`).join('')}
        </div>
    </div>`).join('')}

    <div class="marking-sheet">
        <div class="marking-header">
            <h1>MARKING SHEET / SKEMA PEMARKAHAN</h1>
            <div class="subtitle">${levelRange} - Answer Key / Jawapan</div>
        </div>

        <div class="answer-grid">
            ${questions.map(q => {
              const optionLetter = q.options.findIndex(opt => opt === q.answer);
              return `
            <div class="answer-item">
                <div class="answer-number">Q${q.number}</div>
                <div><strong>${String.fromCharCode(65 + optionLetter)}</strong></div>
                <div style="font-size: 12px;">${q.answer}</div>
            </div>`;
            }).join('')}
        </div>

        <div class="scoring">
            <h3>Scoring Guide / Panduan Pemarkahan:</h3>
            <div class="score-row">
                <div class="score-label">Total Correct / Jumlah Betul:</div>
                <div class="score-line"></div>
                <div style="margin-left: 10px;">/ 20</div>
            </div>
            <div class="score-row">
                <div class="score-label">Total Marks / Jumlah Markah:</div>
                <div class="score-line"></div>
                <div style="margin-left: 10px;">/ 100</div>
            </div>
            <div class="score-row">
                <div class="score-label">Grade / Gred:</div>
                <div class="score-line"></div>
            </div>
            <br>
            <div style="font-size: 13px;">
                <strong>Grading Scale / Skala Gred:</strong><br>
                A (90-100) | B (80-89) | C (70-79) | D (60-69) | E (50-59) | F (0-49)
            </div>
        </div>
    </div>
</body>
</html>`;
}

// Generate all level tests (1-12)
console.log('Generating level tests...');
for (let level = 1; level <= 12; level++) {
  const testData = generateLevelTest(level);
  const html = createLevelTestHTML(testData);
  const outputPath = path.join(__dirname, '..', 'public', 'teacher-materials', `level-${level}-test.html`);
  fs.writeFileSync(outputPath, html);
  console.log(`Created: level-${level}-test.html`);
}

// Generate formal student tests
console.log('\nGenerating formal student tests...');

const test1 = generateFormalTest([1, 2, 3, 4]);
const html1 = createFormalTestHTML([1, 2, 3, 4], test1);
fs.writeFileSync(
  path.join(__dirname, '..', 'public', 'teacher-materials', 'student-test-levels-1-4.html'),
  html1
);
console.log('Created: student-test-levels-1-4.html');

const test2 = generateFormalTest([5, 6, 7, 8]);
const html2 = createFormalTestHTML([5, 6, 7, 8], test2);
fs.writeFileSync(
  path.join(__dirname, '..', 'public', 'teacher-materials', 'student-test-levels-5-8.html'),
  html2
);
console.log('Created: student-test-levels-5-8.html');

const test3 = generateFormalTest([9, 10, 11, 12]);
const html3 = createFormalTestHTML([9, 10, 11, 12], test3);
fs.writeFileSync(
  path.join(__dirname, '..', 'public', 'teacher-materials', 'student-test-levels-9-12.html'),
  html3
);
console.log('Created: student-test-levels-9-12.html');

console.log('\nAll tests generated successfully!');
