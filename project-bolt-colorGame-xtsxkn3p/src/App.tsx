import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface RGB {
  r: number;
  g: number;
  b: number;
}

function App() {
  const [currentColor, setCurrentColor] = useState<RGB>({ r: 0, g: 0, b: 0 });
  const [options, setOptions] = useState<RGB[]>([]);
  const [message, setMessage] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const generateRandomRGB = (): RGB => {
    return {
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256),
    };
  };

  const rgbToString = (rgb: RGB): string => {
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  };

  const rgbToDisplay = (rgb: RGB): string => {
    return `RGB(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  };

  const generateOptions = (correctColor: RGB): RGB[] => {
    const numOptions = Math.floor(Math.random() * 4) + 3;
    const optionsArray: RGB[] = [correctColor];

    while (optionsArray.length < numOptions) {
      const newColor = generateRandomRGB();
      const isDuplicate = optionsArray.some(
        (color) =>
          color.r === newColor.r &&
          color.g === newColor.g &&
          color.b === newColor.b
      );
      if (!isDuplicate) {
        optionsArray.push(newColor);
      }
    }

    return optionsArray.sort(() => Math.random() - 0.5);
  };

  const startNewRound = () => {
    const newColor = generateRandomRGB();
    setCurrentColor(newColor);
    setOptions(generateOptions(newColor));
    setMessage('');
    setIsCorrect(false);
  };

  const handleGuess = (guessedColor: RGB) => {
    if (isCorrect) return;

    setAttempts(attempts + 1);

    if (
      guessedColor.r === currentColor.r &&
      guessedColor.g === currentColor.g &&
      guessedColor.b === currentColor.b
    ) {
      setMessage('Correct! 🎉');
      setScore(score + 1);
      setIsCorrect(true);
      setTimeout(() => {
        startNewRound();
      }, 1500);
    } else {
      setMessage('Try again!');
    }
  };

  useEffect(() => {
    startNewRound();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              Color Guessing Game
            </h1>
            <p className="text-gray-600 text-lg">
              Which RGB code matches this color?
            </p>
          </div>

          <div className="flex justify-between items-center mb-8 bg-gray-50 rounded-xl p-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                Score
              </p>
              <p className="text-3xl font-bold text-blue-600">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                Attempts
              </p>
              <p className="text-3xl font-bold text-purple-600">{attempts}</p>
            </div>
            <button
              onClick={startNewRound}
              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RefreshCw size={18} />
              New Color
            </button>
          </div>

          <div className="mb-8">
            <div
              className="w-full h-64 rounded-2xl shadow-lg border-4 border-gray-200 transition-all duration-300"
              style={{ backgroundColor: rgbToString(currentColor) }}
            />
          </div>

          <div className="mb-8">
            <p className="text-center text-sm text-gray-600 mb-3 font-semibold">
              Primary Colors
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center">
                <div
                  className="w-full h-20 rounded-lg shadow-md border-2 border-gray-300"
                  style={{ backgroundColor: 'rgb(255, 0, 0)' }}
                />
                <p className="text-xs text-gray-600 mt-2 font-semibold">Red</p>
                <p className="text-xs text-gray-500">RGB(255, 0, 0)</p>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-full h-20 rounded-lg shadow-md border-2 border-gray-300"
                  style={{ backgroundColor: 'rgb(0, 255, 0)' }}
                />
                <p className="text-xs text-gray-600 mt-2 font-semibold">Green</p>
                <p className="text-xs text-gray-500">RGB(0, 255, 0)</p>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-full h-20 rounded-lg shadow-md border-2 border-gray-300"
                  style={{ backgroundColor: 'rgb(0, 0, 255)' }}
                />
                <p className="text-xs text-gray-600 mt-2 font-semibold">Blue</p>
                <p className="text-xs text-gray-500">RGB(0, 0, 255)</p>
              </div>
            </div>
          </div>

          {message && (
            <div
              className={`text-center mb-6 text-2xl font-bold py-3 px-6 rounded-xl ${
                isCorrect
                  ? 'bg-green-100 text-green-700'
                  : 'bg-orange-100 text-orange-700'
              } transition-all duration-300`}
            >
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleGuess(option)}
                disabled={isCorrect}
                className={`py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${
                  isCorrect
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl'
                }`}
              >
                {rgbToDisplay(option)}
              </button>
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Click on the RGB code that matches the color above!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
