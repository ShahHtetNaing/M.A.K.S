
import { Course, Blog, Lesson } from './types';

export const MOCK_COURSES: Course[] = [
  // ARABIC PATHWAY
  {
    id: 'arabic-beginner',
    pathway: 'ARABIC',
    level: 'Beginner',
    title: 'Arabic Foundations',
    description: 'Master the script, short vowels, and fundamental vocabulary.',
    lessons: [
      { 
        id: 'ab1', 
        title: 'Arabic Alphabet (The Shapes)', 
        type: 'text', 
        topics: 'Letter recognition, isolated/connected forms', 
        learningSteps: [
          {
            title: 'The 28 Core Letters',
            content: 'Arabic has 28 letters. They are: ا (Alif), ب (Ba), ت (Ta), ث (Tha), ج (Jeem), ح (Ha), خ (Kha), د (Dal), ذ (Thal), ر (Ra), ز (Zay), س (Seen), ش (Sheen), ص (Sad), ض (Dad), ط (Ta), ظ (Za), ع (Ayn), غ (Ghayn), ف (Fa), ق (Qaf), ك (Kaf), ل (Lam), م (Meem), ن (Noon), ه (Ha), و (Waw), ي (Ya).'
          },
          {
            title: 'Right-to-Left Direction',
            content: 'Arabic is written and read from right to left. Always start on the right side of the page or screen. This orientation applies to both letters and whole sentences.'
          },
          {
            title: 'Connecting Letters',
            content: 'Unlike English print, Arabic is naturally cursive. Most letters connect to those before and after them. For example, ب (Ba) at the start looks like بـ, in the middle like ـبـ, and at the end like ـب.'
          },
          {
            title: 'The Non-Connectors',
            content: 'Six letters only connect to the right: ا (Alif), د (Dal), ذ (Thal), ر (Ra), ز (Zay), و (Waw). They never join the letter that comes after them.'
          }
        ],
        exercises: 'Write the word "Bab" (Door) which consists of Ba-Alif-Ba. Notice how Alif doesn\'t connect to the final Ba.', 
        aiFunction: 'Shape recognition analysis', 
        content: 'Welcome! Arabic calligraphy is beautiful because letters morph depending on their position. Let\'s learn the 28 building blocks.', 
        quizzes: [] 
      },
      { 
        id: 'ab2', 
        title: 'Short Vowels (Tashkeel)', 
        type: 'speaking', 
        topics: 'Fatha, Kasra, Damma, Sukun', 
        learningSteps: [
          {
            title: 'Fatha (The "a" sound)',
            content: 'Fatha is a small diagonal dash above the letter. It produces a short "a" sound. Example: بَ sounds like "Ba".'
          },
          {
            title: 'Kasra (The "ee" sound)',
            content: 'Kasra is a small diagonal dash below the letter. It produces a short "ee" sound. Example: بِ sounds like "Bee".'
          },
          {
            title: 'Damma (The "oo" sound)',
            content: 'Damma looks like a tiny comma above the letter. It produces a short "oo" sound. Example: بُ sounds like "Boo".'
          },
          {
            title: 'Sukun (The stop)',
            content: 'Sukun is a small circle above the letter. It means the letter has no vowel sound following it; you just pronounce the letter\'s own consonant sound.'
          }
        ],
        exercises: 'Pronounce the sounds: Ba, Bee, Boo, B (Sukun).', 
        aiFunction: 'Audio phonetics feedback', 
        content: 'Vowels in Arabic are symbols added to consonants. Think of them as musical notes that tell you how to "sing" the letter.', 
        quizzes: [] 
      },
      { 
        id: 'ab3', 
        title: 'Basic Greetings', 
        type: 'speaking', 
        topics: 'Marhaba, Ahlan, Kaifa Haluk', 
        learningSteps: [
          { title: 'The Universal Greeting', content: 'As-salāmu ʿalaykum (Peace be upon you). The standard reply is Wa-ʿalaykumu s-salām.' },
          { title: 'Saying Hello', content: 'Márhaba is a friendly "Hello". Ahlan wa Sahlan is "Welcome".' },
          { title: 'Asking How Someone Is', content: 'Kaifa hāluk? (To a male) or Kaifa hālik? (To a female). Response: Bi-khayr, al-ḥamdu lillāh (I am well, praise be to God).' },
          { title: 'Saying Goodbye', content: 'Maʿa s-salāmah literally means "with peace".' }
        ],
        exercises: 'Simulate a conversation: Greet the AI, ask how it is, and say goodbye.', 
        aiFunction: 'Conversation practice', 
        content: 'Arabic culture is highly polite. Mastering these greetings is your passport to friendly interactions.', 
        quizzes: [] 
      },
      { 
        id: 'ab4', 
        title: 'Numbers 1-10', 
        type: 'text', 
        topics: 'Digits and Names', 
        learningSteps: [
          { title: 'The First Five', content: '١ (Wahid - 1), ٢ (Ithnan - 2), ٣ (Thalatha - 3), ٤ (Arba\'a - 4), ٥ (Khamsa - 5).' },
          { title: 'Six to Ten', content: '٦ (Sitta - 6), ٧ (Sab\'a - 7), ٨ (Thamaniya - 8), ٩ (Tis\'a - 9), ١٠ (Ashara - 10).' },
          { title: 'Decimal Point', content: 'Zero is written as a simple dot (.) and is called "Sifr".' }
        ],
        exercises: 'Convert these Western numbers to Arabic digits: 5, 8, 1, 10.', 
        aiFunction: 'Number quiz', 
        content: 'Did you know the "Arabic Numerals" used globally today were adapted from Indian systems by Arab mathematicians?', 
        quizzes: [] 
      },
      { 
        id: 'ab5', 
        title: 'Personal Pronouns', 
        type: 'text', 
        topics: 'I, You, He, She', 
        learningSteps: [
          { title: 'I and We', content: 'Ana (I), Nahnu (We).' },
          { title: 'You (Singular)', content: 'Anta (You, male), Anti (You, female).' },
          { title: 'He and She', content: 'Huwa (He), Hiya (She).' },
          { title: 'They', content: 'Hum (They, masculine/mixed), Humma (They, feminine).' }
        ],
        exercises: 'Choose the correct pronoun for a picture of a woman.', 
        aiFunction: 'Grammar check', 
        content: 'In Arabic, we distinguish gender even when saying "You". Paying attention to this builds a strong grammar foundation.', 
        quizzes: [] 
      },
      { 
        id: 'ab6', 
        title: 'Everyday Nouns', 
        type: 'text', 
        topics: 'House, Car, Book, Pen', 
        learningSteps: [
          { title: 'The Definite Article', content: 'To make a noun definite (The), add "Al-" to the start. Example: Kitab (Book) -> Al-Kitab (The Book).' },
          { title: 'Sun and Moon Letters', content: 'When adding "Al-", some letters merge with the "L" sound (Sun letters), and some keep it clear (Moon letters).' },
          { title: 'Common Objects', content: 'Bayt (House), Sayyara (Car), Maktab (Desk), Kursi (Chair).' }
        ],
        exercises: 'Translate: "The House" and "A Car".', 
        aiFunction: 'Vocabulary suggestion', 
        content: 'Nouns are the anchors of communication. Let\'s build your first set of 20 common objects.', 
        quizzes: [] 
      },
      { 
        id: 'ab7', 
        title: 'Questions & Negation', 
        type: 'speaking', 
        topics: 'What, Where, No', 
        learningSteps: [
          { title: 'Asking "What"', content: 'Use "Ma" for things. Example: Ma hadha? (What is this?).' },
          { title: 'Asking "Where"', content: 'Use "Ayna". Example: Ayna al-bayt? (Where is the house?).' },
          { title: 'Saying No', content: 'Use "La" for a simple No. Use "Laysa" to negate a noun phrase (It is not...).' }
        ],
        exercises: 'Ask the AI where the book is.', 
        aiFunction: 'Q&A simulation', 
        content: 'Curiosity is key! Learn how to ask questions and negate statements to deepen your dialogue.', 
        quizzes: [] 
      },
      { 
        id: 'ab8', 
        title: 'Beginner Capstone', 
        type: 'speaking', 
        topics: 'Mixed Practice', 
        learningSteps: [
          { title: 'Self Introduction', content: 'Combine name, greetings, and hometown. "Ismi... wa ana min...".' },
          { title: 'Describing Surroundings', content: 'Use "Hadha" (This is) to point out objects around you.' },
          { title: 'Basic Conversation Flow', content: 'Practice responding to "How are you" and "Where are you from".' }
        ],
        exercises: 'Introduce yourself to the class in 3 complete sentences.', 
        aiFunction: 'Final Beginner feedback', 
        content: 'Congratulations on reaching the end of Level 1! You can now read basic script and hold a simple introduction.', 
        quizzes: [] 
      }
    ]
  },
  {
    id: 'arabic-intermediate',
    pathway: 'ARABIC',
    level: 'Intermediate',
    title: 'Grammar & Conversation',
    description: 'Bridge the gap between basic phrases and fluent dialogue.',
    lessons: [
      { id: 'ai1', title: 'Present Tense Mastery', type: 'text', topics: 'Conjugation Patterns', learningSteps: [{ title: 'Verb Roots', content: 'Most Arabic verbs have a 3-letter root (e.g., K-T-B for Writing).' }, { title: 'Subject Prefixes', content: 'A (I), Na (We), Ta (You), Ya (He).' }, { title: 'Practice Conjugation', content: 'Anā aktubu (I write), Anta taktubu (You write), Huwa yaktubu (He writes).' }], exercises: 'Conjugate "Drink" (Sh-R-B) for 5 subjects.', aiFunction: 'Verb correction', content: 'Verbs are dynamic in Arabic. Change the prefix to change the person.', quizzes: [] },
      { id: 'ai2', title: 'Past Tense Basics', type: 'text', topics: 'Verb Suffixes', learningSteps: [{ title: 'Past Suffixes', content: 'Suffixes are added to the root: -tu (I), -na (We), -ta (You), -at (She).' }, { title: 'Example', content: 'Katabtu (I wrote), Katabat (She wrote).' }], exercises: 'Tell the AI one thing you did yesterday.', aiFunction: 'Sentence practice', content: 'The past is fixed; we look at the end of the word to see who acted.', quizzes: [] },
      { id: 'ai3', title: 'Future & Negation', type: 'text', topics: 'Sawfa and Lan', learningSteps: [{ title: 'Future Marker', content: 'Add "Sa-" before the present tense for the future. Saktubu (I will write).' }, { title: 'Negation', content: 'Use "Lan" for negative future. Lan aktuba (I will not write).' }], exercises: 'Write 3 sentences about your future goals.', aiFunction: 'Example generation', content: 'Intentions are expressed with simple prefixes. Let\'s map out your tomorrow.', quizzes: [] },
      { id: 'ai4', title: 'Nominal Sentence', type: 'text', topics: 'Mubtada and Khabar', learningSteps: [{ title: 'The Subject (Mubtada)', content: 'The starting noun of the sentence.' }, { title: 'The Predicate (Khabar)', content: 'The information about the subject. No "is" verb is needed!' }, { title: 'Example', content: 'Al-waladu jamilun (The boy is beautiful).' }], exercises: 'Analyze 5 nominal sentences.', aiFunction: 'Parsing exercises', content: 'Arabic sentences are often "Verbless" in the present. This is the Nominal Sentence.', quizzes: [] },
      { id: 'ai5', title: 'Prepositions (Jarr)', type: 'text', topics: 'In, On, From', learningSteps: [{ title: 'Common Particles', content: 'Fee (In), Ala (On), Min (From), Ila (To).' }, { title: 'Grammar Effect', content: 'The following noun must take a Kasra (ee sound) ending.' }], exercises: 'Translate "The cat is on the table."', aiFunction: 'Suggest prepositions', content: 'Particles connect our world. Watch how they "pull" the case of the noun.', quizzes: [] },
      { id: 'ai6', title: 'Adjectives (Sifah)', type: 'text', topics: 'Agreement', learningSteps: [{ title: 'Position', content: 'Adjectives come AFTER the noun.' }, { title: 'Agreement', content: 'Must match the noun in Gender, Number, and Definiteness.' }], exercises: 'Describe your car using 3 matching adjectives.', aiFunction: 'Error highlighting', content: 'Adjectives are loyal to their nouns. They must mirror their state exactly.', quizzes: [] },
      { id: 'ai7', title: 'Dual and Plural', type: 'text', topics: 'Quantity', learningSteps: [{ title: 'The Dual', content: 'Add "-ani" or "-ayni" to indicate exactly two of something.' }, { title: 'Sound Plural', content: 'Add "-oona" or "-aat" for regular groups.' }, { title: 'Broken Plural', content: 'Irregular forms like "Kitab" -> "Kutub".' }], exercises: 'Convert 10 singular nouns to duals.', aiFunction: 'Usage examples', content: 'Numbers change the very shape of the word. Let\'s learn the plurals.', quizzes: [] },
      { id: 'ai8', title: 'Conversation Flow', type: 'speaking', topics: 'Dialogue', learningSteps: [{ title: 'Fillers', content: 'Using "Ya\'ni" (I mean) and "Tayyib" (Okay).' }, { title: 'Compound Sentences', content: 'Using "Lakin" (But) and "Li\'anna" (Because).' }], exercises: 'Have a 2-minute dialogue with the AI about your hobbies.', aiFunction: 'Speech recognition', content: 'Mastery is about connection. Link your ideas together to sound native.', quizzes: [] }
    ]
  },
  {
    id: 'arabic-professional',
    pathway: 'ARABIC',
    level: 'Professional',
    title: 'Advanced Mastery',
    description: 'Native-level proficiency, complex grammar, and literary analysis.',
    lessons: [
      { id: 'ap1', title: 'Classical Rhetoric', type: 'text', topics: 'Balagha', learningSteps: [{ title: 'Metaphor (Majaz)', content: 'Using words outside their literal sense for deeper meaning.' }, { title: 'Simile (Tashbih)', content: 'Explicit comparison using particles like "Ka" (As/Like).' }], exercises: 'Analyze a line of pre-Islamic poetry.', aiFunction: 'Parsing & Explanation', content: 'Language is more than data; it is art. Let\'s study the secrets of Arabic eloquence.', quizzes: [] },
      { id: 'ap2', title: 'Passive Voice', type: 'text', topics: 'Majhul', learningSteps: [{ title: 'The Passive Pattern', content: 'Change vowels to "u-i-a". Example: Kataba (Wrote) -> Kutiba (Was written).' }, { title: 'When to Use', content: 'When the actor is unknown or unimportant.' }], exercises: 'Convert a news report from active to passive.', aiFunction: 'Verb analysis', content: 'Formal Arabic often hides the actor to focus on the action.', quizzes: [] },
      { id: 'ap3', title: 'Derived Forms II-X', type: 'text', topics: 'Morphology', learningSteps: [{ title: 'Form II', content: 'Intensity or causing an action. Example: Allama (To teach).' }, { title: 'Form X', content: 'Seeking something. Example: Istaghfara (Seeking forgiveness).' }], exercises: 'Identify the pattern form of 10 complex verbs.', aiFunction: 'Root lookup', content: 'One root, ten patterns, a thousand meanings. This is the heart of Arabic.', quizzes: [] },
      { id: 'ap4', title: 'Literary Analysis', type: 'text', topics: 'Comprehension', learningSteps: [{ title: 'Contextual Inference', content: 'Reading between the lines of advanced texts.' }, { title: 'Thematic Unity', content: 'How a whole text serves one goal.' }], exercises: 'Summarize an Arabic editorial on economics.', aiFunction: 'AI Summary', content: 'Professional reading requires high-speed synthesis of complex ideas.', quizzes: [] },
      { id: 'ap5', title: 'The Idhafah Chain', type: 'text', topics: 'Possession', learningSteps: [{ title: 'The Rules', content: 'First noun has no "Al-", second noun is in Genitive case.' }, { title: 'Long Chains', content: "Bab bayt malik (The King's house's door)." }], exercises: 'Create 5 complex possessive chains.', aiFunction: 'Style suggestion', content: 'Possession is expressed as a chain in Arabic. It is the most common advanced structure.', quizzes: [] },
      { id: 'ap6', title: 'Dialect Awareness', type: 'speaking', topics: 'Code-switching', learningSteps: [{ title: 'Shami vs MSA', content: 'Common vowel shifts and vocabulary differences.' }, { title: 'Egyptian vs MSA', content: 'The specific sound of "Geem" and "Hamza".' }], exercises: 'Translate an MSA news bite into a chosen dialect.', aiFunction: 'Pronunciation feedback', content: 'A professional must speak the language of the people and the language of the books.', quizzes: [] },
      { id: 'ap7', title: 'Debate & Persuasion', type: 'speaking', topics: 'Eloquence', learningSteps: [{ title: 'Stating Thesis', content: 'Using "Fee ra\'yi" (In my opinion) and formal connectors.' }, { title: 'Counter-argument', content: 'Politely refuting with "Lakinna" (But indeed).' }], exercises: 'Debate the AI on the importance of AI in education.', aiFunction: 'Conversation simulation', content: 'Can you change someone\'s mind in Arabic? Let\'s find out.', quizzes: [] },
      { id: 'ap8', title: 'Professional Thesis', type: 'text', topics: 'Synthesis', learningSteps: [{ title: 'Structure', content: 'Intro, Evidence, Conclusion in formal register.' }, { title: 'Bibliography', content: 'Referencing classical vs modern sources.' }], exercises: 'Draft a 1-page analysis of a modern Arabic short story.', aiFunction: 'AI Final Review', content: 'You have arrived. Use your skills to contribute to the global Arabic discourse.', quizzes: [] }
    ]
  },

  // QURAN PATHWAY
  {
    id: 'quran-beginner',
    pathway: 'QURAN',
    level: 'Beginner',
    title: 'Quranic Foundations',
    description: 'Start your journey with the sacred text from scratch.',
    lessons: [
      { id: 'qb1', title: 'Quranic Script', type: 'text', topics: 'Calligraphy', learningSteps: [{ title: 'Uthmanic Nuances', content: 'Notice how certain Alifs are tiny "dagger Alifs" (ٰ).' }, { title: 'Ayat Markers', content: 'The circles containing numbers mark the end of a verse.' }, { title: 'Prostration Mark', content: 'The symbol (۩) indicating you should bow.' }], exercises: 'Find 5 dagger Alifs in page 1.', aiFunction: 'Audio correction', content: 'The Quran uses a specific "Sacred Script" preserved for 1400 years.', quizzes: [] },
      { id: 'qb2', title: 'Tajweed: Noon Sakinah', type: 'speaking', topics: 'Izhar, Idgham', learningSteps: [{ title: 'Izhar', content: 'Pronouncing the "N" clearly if followed by throat letters.' }, { title: 'Idgham', content: 'Merging the "N" into the next letter (Y-R-M-L-O-N).' }, { title: 'Iqlab', content: 'Changing the "N" to a "M" if followed by "Ba".' }], exercises: 'Read a verse focusing on Iqlab.', aiFunction: 'Tajweed AI feedback', content: 'Tajweed means "to make beautiful". Let\'s perfect the sounds of the sacred letters.', quizzes: [] },
      { id: 'qb3', title: 'The Opening (Basmalah)', type: 'text', topics: 'Meanings', learningSteps: [{ title: 'Ism', content: 'Means "Name". Bi-smi (In the name).' }, { title: 'Allah', content: 'The Unique Name of the Creator.' }, { title: 'Ar-Rahman vs Ar-Rahim', content: 'Abundant Mercy vs Continuous Mercy.' }], exercises: 'Explain the difference between the two names of Mercy.', aiFunction: 'Example sentences', content: 'Every journey starts with "Bismillah". Let\'s understand why.', quizzes: [] },
      { id: 'qb4', title: '99 Names Intro', type: 'text', topics: 'Attributes', learningSteps: [{ title: 'The System', content: 'Names are grouped by Beauty (Jamal) and Majesty (Jalal).' }, { title: 'Usage', content: 'How verses end with specific names to provide context.' }], exercises: 'Find 3 names in the last verses of Al-Hashr.', aiFunction: 'Quiz', content: 'God introduces Himself through His attributes. Let\'s learn the first 10.', quizzes: [] },
      { id: 'qb5', title: 'Root Study: KH-L-Q', type: 'text', topics: 'Creation', learningSteps: [{ title: 'The Root', content: 'Kh-L-Q means "to create".' }, { title: 'Variations', content: 'Khaliq (Creator), Makhluq (Created), Akhlaq (Character).' }], exercises: 'Identify 3 verses containing this root.', aiFunction: 'Word lookup', content: 'Roots are the DNA of the Quran. Understanding one root unlocks many verses.', quizzes: [] },
      { id: 'qb6', title: 'Divine Pronouns', type: 'text', topics: 'The "We"', learningSteps: [{ title: 'The Majestic "We"', content: 'Why God uses plural to indicate greatness.' }, { title: 'Direct Address', content: 'When God says "I" (Ana) to indicate closeness.' }], exercises: 'Identify the "We" in Surah Al-Kawthar.', aiFunction: 'Grammar correction', content: 'Who is speaking in the Quran? The pronouns reveal the majesty of the Speaker.', quizzes: [] },
      { id: 'qb7', title: 'The Short Surahs', type: 'speaking', topics: 'Recitation', learningSteps: [{ title: 'Al-Ikhlas', content: 'The summary of Monotheism.' }, { title: 'The Protectors', content: 'Al-Falaq and Al-Nas - seeking refuge.' }], exercises: 'Recite Al-Ikhlas with perfect Tajweed.', aiFunction: 'Pronunciation check', content: 'These Surahs are your daily shield. Let\'s learn them word-for-word.', quizzes: [] },
      { id: 'qb8', title: 'Sacred Rhythm', type: 'speaking', topics: 'Maqamat', learningSteps: [{ title: 'Rise and Fall', content: 'How the voice should change based on the topic (Hell vs Paradise).' }, { title: 'Sincerity', content: 'The "Huzn" (sorrow/longing) in recitation.' }], exercises: 'Identify the emotional shift in a recording of Al-Fajr.', aiFunction: 'AI rhythm feedback', content: 'Recitation is the music of the soul. Let\'s find the rhythm.', quizzes: [] }
    ]
  },
  {
    id: 'quran-intermediate',
    pathway: 'QURAN',
    level: 'Intermediate',
    title: 'Grammar & Vocabulary',
    description: 'Understand the mechanics behind the divine message.',
    lessons: [
      { id: 'qi1', title: 'Emphasis (Inna)', type: 'text', topics: 'Rhetoric', learningSteps: [{ title: 'Function', content: 'Inna means "Indeed" or "Verily".' }, { title: 'Effect', content: 'It shifts the noun to the Accusative case (Fatha).' }, { title: 'Usage', content: 'Used to respond to doubt.' }], exercises: 'Find 10 verses starting with Inna.', aiFunction: 'AI explanation', content: 'God often uses "Inna" to confirm a truth to our hearts.', quizzes: [] },
      { id: 'qi2', title: 'Tense in Prophecy', type: 'text', topics: 'Timelessness', learningSteps: [{ title: 'Past for Future', content: 'Describing the Day of Judgment in past tense because it is certain.' }, { title: 'Continuous Present', content: 'God\'s mercy always "being".' }], exercises: 'Analyze the tenses in Surah Al-Naba.', aiFunction: 'Conjugation feedback', content: 'Grammar in the Quran transcends time. Learn the prophetic tense.', quizzes: [] },
      { id: 'qi3', title: 'Conditional Laws', type: 'text', topics: 'If/Then', learningSteps: [{ title: 'In and Idha', content: 'Different types of "If" for possible vs certain events.' }, { title: 'Covenants', content: 'The structure of God\'s promises (If you do X, I do Y).' }], exercises: 'Map the conditions in a law-based verse.', aiFunction: 'Example generation', content: 'The Quran establishes a logical framework for human ethics.', quizzes: [] },
      { id: 'qi4', title: 'Divine Connectors', type: 'text', topics: 'Fa vs Thumma', learningSteps: [{ title: 'Immediate "Fa"', content: 'Succession without delay.' }, { title: 'Delayed "Thumma"', content: 'Succession after a long wait.' }], exercises: 'Identify the Fa/Thumma difference in creation verses.', aiFunction: 'Preposition suggestion', content: 'One letter can span billions of years in the Quranic timeline.', quizzes: [] },
      { id: 'qi5', title: '80% Vocabulary', type: 'text', topics: 'High Frequency', learningSteps: [{ title: 'The Top 50', content: 'Verbs like "Qul" (Say), "Amana" (Believe).' }, { title: 'Nouns', content: 'Ard (Earth), Sama\' (Heaven), Nas (People).' }], exercises: 'Match 20 high-frequency words to their meanings.', aiFunction: 'Word lookup', content: 'Mastering just 500 words unlocks understanding of 80% of the Quran.', quizzes: [] },
      { id: 'qi6', title: 'Matching Attributes', type: 'text', topics: 'Agreement', learningSteps: [{ title: 'Divine Pairings', content: 'Why Al-Aziz (Almighty) is often paired with Al-Hakim (All-Wise).' }, { title: 'Rhetorical Matching', content: 'How attributes match the theme of the verse.' }], exercises: 'Analyze the attribute pairings in Al-Ma\'idah.', aiFunction: 'AI error highlight', content: 'Attributes are not random; they are the key to the verse\'s deep logic.', quizzes: [] },
      { id: 'qi7', title: 'Tafsir Method', type: 'text', topics: 'Exegesis', learningSteps: [{ title: 'Quran explains Quran', content: 'Looking for the same word in different verses.' }, { title: 'Reason for Revelation', content: 'Asbab al-Nuzul (The historical context).' }], exercises: 'Write a 1-paragraph tafsir of Al-Fil.', aiFunction: 'AI tafsir guidance', content: 'Tafsir is the art of discovery. Let\'s learn the rules of the scholars.', quizzes: [] },
      { id: 'qi8', title: 'Thematic Pausing', type: 'speaking', topics: 'Waqf', learningSteps: [{ title: 'Mandatory Stop (m)', content: 'Stopping here is essential for the meaning.' }, { title: 'Preferable Stop (qali)', content: 'Better to stop, but can continue.' }], exercises: 'Identify 5 pause symbols in a random page.', aiFunction: 'Audio exercises', content: 'Breath and meaning are one in the Quran. Learn where to pause.', quizzes: [] }
    ]
  },
  {
    id: 'quran-professional',
    pathway: 'QURAN',
    level: 'Professional',
    title: 'Advanced Understanding',
    description: 'Deep theological, linguistic, and historical analysis.',
    lessons: [
      { id: 'qp1', title: 'Ayat al-Kursi Map', type: 'text', topics: 'Syntactic Branching', learningSteps: [{ title: 'The Central Axis', content: 'The verse is structured around a central point of divine knowledge.' }, { title: 'Clausal Dependencies', content: 'How the sub-clauses support the main thesis.' }], exercises: 'Diagram the logical flow of the verse.', aiFunction: 'Parsing AI', content: 'The greatest verse in the Quran has a mathematical and logical perfection.', quizzes: [] },
      { id: 'qp2', title: 'Morphology of Power', type: 'text', topics: 'Pattern shifts', learningSteps: [{ title: 'Semantic Weight', content: 'How changing a verb form changes its theological impact.' }, { title: 'Nominalization', content: 'The shift from actions (verbs) to states (nouns).' }], exercises: 'Explain the verb form shift in a verse of law.', aiFunction: 'Verb analysis', content: 'Every vowel change in the Quran is a deliberate divine choice.', quizzes: [] },
      { id: 'qp3', title: 'Rare Words (Gharaib)', type: 'text', topics: 'Lexicography', learningSteps: [{ title: 'Unique Appearances', content: 'Studying words that appear only once in 6236 verses.' }, { title: 'Linguistic Archaisms', content: 'Ancient roots that the Quran preserved.' }], exercises: 'Analyze the word "Abba" (pasture) in Surah Abasa.', aiFunction: 'Word & Frequency lookup', content: 'Rare words are the gems of the Quran. Let\'s polish them.', quizzes: [] },
      { id: 'qp4', title: 'Ring Structure', type: 'text', topics: 'Symmetry', learningSteps: [{ title: 'The Theory', content: 'Surahs are often structured like concentric circles.' }, { title: 'Matching Halves', content: 'How the end of a Surah mirrors the beginning.' }], exercises: 'Locate the symmetrical center of Surah Al-Baqarah.', aiFunction: 'AI summarization', content: 'Large Surahs are not collections of random verses; they are symmetrical masterpieces.', quizzes: [] },
      { id: 'qp5', title: 'Classical Tafsir Schools', type: 'text', topics: 'History', learningSteps: [{ title: 'Tabari', content: 'The school of traditional reports (Athari).' }, { title: 'Zamakhshari', content: 'The school of linguistic and rational focus.' }], exercises: 'Compare two interpretations of the "Verse of Light".', aiFunction: 'Contextual AI explanation', content: 'To know the Quran, you must know the minds that studied it for centuries.', quizzes: [] },
      { id: 'qp6', title: 'Semantic Loss in Translation', type: 'text', topics: 'Translation', learningSteps: [{ title: 'The Untranslatable', content: 'Words like "Taqwa" or "Ghayb" that have no English equivalent.' }, { title: 'Lost Nuance', content: 'How the "Fa" (immediate and) is lost in modern English.' }], exercises: 'Translate Surah Al-Asr and justify your word choices.', aiFunction: 'AI feedback', content: 'Translation is impossible, yet necessary. Let\'s see what gets lost.', quizzes: [] },
      { id: 'qp7', title: 'The 7 Qira’at', type: 'speaking', topics: 'Variant Recitations', learningSteps: [{ title: 'The Mercy of Variants', content: 'How multiple recitations broaden the meaning.' }, { title: 'Hafs vs Warsh', content: 'Studying the most common variant styles.' }], exercises: 'Identify a variant word in a Warsh recording.', aiFunction: 'Pronunciation AI', content: 'The Quran was revealed in seven modes. Learn the diversity of the Divine Word.', quizzes: [] },
      { id: 'qp8', title: 'The Living Quran', type: 'speaking', topics: 'Contemporary Ethics', learningSteps: [{ title: 'Environmentalism', content: 'Verses on the "Mizan" (balance) of nature.' }, { title: 'Social Justice', content: 'The Quranic view on economic equity.' }], exercises: 'Draft a modern application of the "Verse of Justice".', aiFunction: 'Discussion guidance', content: 'Knowledge is for action. How will the Quran change your world today?', quizzes: [] }
    ]
  }
];

export const MOCK_BLOGS: Blog[] = [
  {
    id: 'b1',
    title: 'The Miracles of Quranic Language',
    excerpt: 'How root words create profound networks of meaning.',
    content: 'Full text here...',
    author: 'Ko Lay Naing',
    date: '2023-11-01'
  }
];
