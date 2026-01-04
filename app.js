import React, { useState, useEffect } from 'react';
import { Target, CheckCircle2, AlertCircle, Utensils, Bath, Briefcase, ShoppingBag, RotateCcw, Bell, RefreshCw } from 'lucide-react';

// A much larger database of words to ensure "dynamic" learning
const WORD_DATABASE = {
  Küche: [
    { word: 'Teller', article: 'der', english: 'Plate' },
    { word: 'Gabel', article: 'die', english: 'Fork' },
    { word: 'Löffel', article: 'der', english: 'Spoon' },
    { word: 'Messer', article: 'das', english: 'Knife' },
    { word: 'Kühlschrank', article: 'der', english: 'Fridge' },
    { word: 'Pfanne', article: 'die', english: 'Pan' },
    { word: 'Topf', article: 'der', english: 'Pot' },
    { word: 'Tasse', article: 'die', english: 'Cup' },
    { word: 'Glas', article: 'das', english: 'Glass' },
    { word: 'Herd', article: 'der', english: 'Stove' },
    { word: 'Mikrowelle', article: 'die', english: 'Microwave' },
    { word: 'Wasserkocher', article: 'der', english: 'Kettle' },
    { word: 'Spülmaschine', article: 'die', english: 'Dishwasher' },
    { word: 'Backofen', article: 'der', english: 'Oven' },
    { word: 'Schneidebrett', article: 'das', english: 'Cutting board' }
  ],
  Bad: [
    { word: 'Zahnbürste', article: 'die', english: 'Toothbrush' },
    { word: 'Handtuch', article: 'das', english: 'Towel' },
    { word: 'Seife', article: 'die', english: 'Soap' },
    { word: 'Spiegel', article: 'der', english: 'Mirror' },
    { word: 'Dusche', article: 'die', english: 'Shower' },
    { word: 'Waschbecken', article: 'das', english: 'Sink' },
    { word: 'Zahnpasta', article: 'die', english: 'Toothpaste' },
    { word: 'Föhn', article: 'der', english: 'Hairdryer' },
    { word: 'Kamm', article: 'der', english: 'Comb' },
    { word: 'Rasierer', article: 'der', english: 'Razor' },
    { word: 'Badewanne', article: 'die', english: 'Bathtub' },
    { word: 'Toilettenpapier', article: 'das', english: 'Toilet paper' }
  ],
  Büro_Arbeit: [
    { word: 'Laptop', article: 'der', english: 'Laptop' },
    { word: 'Stift', article: 'der', english: 'Pen' },
    { word: 'Schreibtisch', article: 'der', english: 'Desk' },
    { word: 'Maus', article: 'die', english: 'Mouse' },
    { word: 'Papier', article: 'das', english: 'Paper' },
    { word: 'Stuhl', article: 'der', english: 'Chair' },
    { word: 'Drucker', article: 'der', english: 'Printer' },
    { word: 'Notizbuch', article: 'das', english: 'Notebook' },
    { word: 'Hefter', article: 'der', english: 'Stapler' },
    { word: 'Tastatur', article: 'die', english: 'Keyboard' },
    { word: 'Bildschirm', article: 'der', english: 'Screen/Monitor' },
    { word: 'Kalender', article: 'der', english: 'Calendar' }
  ],
  Unterwegs: [
    { word: 'Schlüssel', article: 'der', english: 'Key' },
    { word: 'Handy', article: 'das', english: 'Phone' },
    { word: 'Tasche', article: 'die', english: 'Bag' },
    { word: 'Fahrkarte', article: 'die', english: 'Ticket' },
    { word: 'Ausweis', article: 'der', english: 'ID Card' },
    { word: 'Geldbeutel', article: 'der', english: 'Wallet' },
    { word: 'Auto', article: 'das', english: 'Car' },
    { word: 'Fahrrad', article: 'das', english: 'Bicycle' },
    { word: 'Bus', article: 'der', english: 'Bus' },
    { word: 'Zug', article: 'der', english: 'Train' },
    { word: 'Regenschirm', article: 'der', english: 'Umbrella' },
    { word: 'Ampel', article: 'die', english: 'Traffic light' }
  ]
};

const PRACTICE_SCHEDULE = [
  { time: '08:00', label: 'Morning Routine', focus: 'Bad & Küche' },
  { time: '13:00', label: 'Lunch Break', focus: 'Büro & Essen' },
  { time: '18:00', label: 'After Work', focus: 'Unterwegs & Einkauf' },
  { time: '21:00', label: 'Evening Review', focus: 'Daily Scorecard' }
];

export default function App() {
  const [scores, setScores] = useState({ mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 });
  const [currentDay] = useState(new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase());
  const [revealed, setRevealed] = useState({});
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentItems, setCurrentItems] = useState({});

  // Function to pick random items from the database
  const shuffleItems = () => {
    const newItems = {};
    Object.keys(WORD_DATABASE).forEach(category => {
      const allWords = [...WORD_DATABASE[category]];
      // Pick 5 random unique words per category
      const shuffled = allWords.sort(() => 0.5 - Math.random());
      newItems[category] = shuffled.slice(0, 5);
    });
    setCurrentItems(newItems);
    setRevealed({});
  };

  // Initialize items on first load
  useEffect(() => {
    shuffleItems();
  }, []);

  const toggleReveal = (word) => {
    setRevealed(prev => ({ ...prev, [word]: !prev[word] }));
  };

  const updateScore = (increment) => {
    setScores(prev => ({
      ...prev,
      [currentDay]: Math.max(0, prev[currentDay] + increment)
    }));
  };

  const resetToday = () => {
    setScores(prev => ({ ...prev, [currentDay]: 0 }));
    shuffleItems();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Section */}
        <header className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">German Article Master</h1>
              <p className="text-slate-500">Practice dynamic items daily in Mannheim</p>
            </div>
            <div className="bg-indigo-50 p-3 rounded-full">
              <Target className="text-indigo-600 w-8 h-8" />
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {Object.entries(scores).map(([day, score]) => (
              <div key={day} className={`flex flex-col items-center p-2 rounded-lg ${day === currentDay ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600'}`}>
                <span className="text-xs uppercase font-bold">{day}</span>
                <span className="text-lg font-black">{score}</span>
              </div>
            ))}
          </div>
        </header>

        {/* Dynamic Controls */}
        <div className="flex flex-wrap gap-3 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex gap-2">
            <button 
              onClick={() => setPracticeMode(!practiceMode)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${practiceMode ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 border'}`}
            >
              {practiceMode ? 'Quiz Mode Active' : 'View Mode Active'}
            </button>
            <button 
              onClick={shuffleItems}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold border border-emerald-100 hover:bg-emerald-100 transition-colors"
            >
              <RefreshCw size={16} /> Shuffle New Items
            </button>
          </div>
          <button onClick={resetToday} className="flex items-center gap-2 p-2 px-4 bg-red-50 text-red-600 rounded-full text-sm hover:bg-red-100 transition-colors">
            <RotateCcw size={16} /> Reset Today
          </button>
        </div>

        {/* Practice Time Alerts */}
        <section className="bg-amber-50 rounded-2xl p-6 border border-amber-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="text-amber-600 w-6 h-6 animate-bounce" />
            <h2 className="text-lg font-bold text-amber-900 italic">"Practice Time!" Alerts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRACTICE_SCHEDULE.map((item, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl border border-amber-200 flex flex-col items-center text-center">
                <span className="text-xs font-bold text-amber-600">{item.time}</span>
                <span className="text-sm font-bold text-slate-800">{item.label}</span>
                <span className="text-xs text-slate-500 italic">{item.focus}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Main Practice Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(currentItems).map(([catName, items]) => (
            <div key={catName} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4 border-b pb-2">
                {catName === 'Küche' && <Utensils className="text-orange-500 w-5 h-5" />}
                {catName === 'Bad' && <Bath className="text-blue-500 w-5 h-5" />}
                {catName === 'Büro_Arbeit' && <Briefcase className="text-slate-700 w-5 h-5" />}
                {catName === 'Unterwegs' && <ShoppingBag className="text-green-600 w-5 h-5" />}
                <h3 className="font-bold text-slate-800">{catName.replace('_', ' ')}</h3>
              </div>
              
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors group">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-400">{item.english}</span>
                      <span className="font-semibold text-slate-800">{item.word}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleReveal(item.word)}
                        className={`w-12 h-10 rounded-lg flex items-center justify-center font-black transition-all ${
                          revealed[item.word] || !practiceMode 
                          ? (item.article === 'der' ? 'bg-blue-100 text-blue-700 border-blue-200' : item.article === 'die' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200')
                          : 'bg-slate-200 text-transparent border-slate-300'
                        } border`}
                      >
                        {item.article}
                      </button>
                      {practiceMode && revealed[item.word] && (
                        <button 
                          onClick={() => updateScore(1)}
                          className="text-green-500 hover:scale-110 transition-transform"
                        >
                          <CheckCircle2 size={24} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tips Footer */}
        <div className="bg-indigo-900 text-indigo-100 rounded-2xl p-6 shadow-lg">
          <h4 className="flex items-center gap-2 font-bold mb-2">
            <AlertCircle size={20} />
            Daily Challenge
          </h4>
          <p className="text-sm opacity-90 leading-relaxed">
            Every time you refresh, you get 20 new items. Try to name them all correctly before looking at the article! 
            <strong> Mannheim Tip:</strong> If you are on the S-Bahn, open the "Unterwegs" section and name the objects you see out the window.
          </p>
        </div>

      </div>
    </div>
  );
}