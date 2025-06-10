import { useEffect, useState } from 'react'
import './App.css'
import { Cards } from './components/Cards'
import { Score } from './components/Score'

function App() {
  const [images, setImages] = useState([]);
  const [shuffleImages, setShuffleImages] = useState([]);
  const [clickedImages, setClickedImages] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
      const countries = await result.json();
      const urls = countries
        .map((country) => country.flags.png)
        .filter((url) => typeof url === 'string' && url.trim() !== '');

      setImages(urls);
      setShuffleImages(getShuffledImages(urls));
    }
    fetchData();
  }
    , []
  );

  function handleClickedImages(image) {
    if (clickedImages.includes((image))) {
      resetScore();
      setClickedImages([]);
    }
    else {
      const newClicked = [...clickedImages, image]
      increaseScore();
      setClickedImages(newClicked);
      if (images.length === newClicked.length) {
        setGameOver(true);
      }
    }
  }

  function resetScore() {
    setHighScore(prev => Math.max(prev, score));
    setScore(0);
    setShuffleImages(getShuffledImages(images));
  }

  function increaseScore() {
    setScore(prev => prev + 1);
    setShuffleImages(getShuffledImages(images));
  }

  function shuffle(urls) {
    const array = [...urls];
    let currentIndex = array.length;

    while (currentIndex != 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      currentIndex--;
    }

    return array;
  }

  function getShuffledImages(urls) {
    const shuffled = shuffle(urls);
    const subset = shuffled.slice(0, 12);

    const allClicked = subset.every(item => clickedImages.includes(item));

    if (allClicked && urls.length > clickedImages.length) {
      return getShuffledImages(urls);
    }

    return subset;
  }

  return (
    <>
      <h1>MEMORY-CARD GAME</h1>
      <Score score={score} highScore={highScore} gameOver={gameOver} />
      <Cards shuffleImages={shuffleImages} onClick={handleClickedImages} />
    </>
  )
}

export default App;
