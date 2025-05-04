import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React,{ useEffect,useRef} from 'react'

function App() {
  const words=["apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map"]

  const [count, setCount] = useState(0)
  const [input, setInput] = useState("");
  const [para,setPara]=useState("")
  const [correct,setCorrect]=useState(0);
  const [inCorrect,setIncorrect]=useState(0);
  const [startTime,setStartTime]=useState(null)
  const [isStarted,setIsStarted]=useState(false)
  const [endTime,setEndTime]=useState(null)
  const [accuracy,setAccuracy]=useState(0)
  const [wpm,setWpm]=useState(0);
  const [timer,setTimer]=useState(0)
  const [restart,setRestart]=useState(false)
 

  const inputRef=useRef()
  const paraRefs = useRef([]);



  


  

  useEffect(() => {
    const getRandomWords = async () => {
     let str="";
     for (let i = 0; i < 50; i++) {
      str += words[Math.floor(Math.random() * words.length)];
      str+=" "
    }
    setPara(str);
    }
    getRandomWords()
  }, [restart])

  const handleStartTimer=()=>{
    setStartTime(Date.now());
    setEndTime(timer)
    setIsStarted(true)
  }

  useEffect(() => {
    let correctCount = 0;
    let incorrectCount = 0;

    if(input.length>0 && !isStarted){
      handleStartTimer()
    }
  
    for (let i = 0; i < input.length; i++) {
      
      if (input[i] === para[i]) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    }
  
    setCorrect(correctCount);
    setIncorrect(incorrectCount)


  }, [input, para]);

  const totalTyped=correct+inCorrect


  useEffect(() => {
    if (!isStarted) return;
  
    const timer = setInterval(() => {
      const now = Date.now();
      if (now >= endTime) {
        const totalTyped = correct + inCorrect;
        if (totalTyped > 0) {
          const acc=100-((inCorrect)*100/totalTyped);
          setAccuracy(acc);
        } else {
          setAccuracy(0);
        }

        



        setIsStarted(false);
        setStartTime(endTime)
        clearInterval(timer);
      }
    }, 100); // check every 1s
  
    return () => clearInterval(timer);
  }, [isStarted, endTime, correct, inCorrect]);
  





  const divClickHandler=()=>{
    inputRef.current?.focus();

  }
  
  const handleRestart=()=>{
    setRestart((prev)=>!prev)
    setCorrect(0)
    setIncorrect(0)
    setEndTime(null)
    setIsStarted(false)
    console.log(paraRefs.current)
    paraRefs.current.forEach(ref => {
      if (ref.current) {
        ref.current.style.color = "gray";
      }
    });
    setInput("")
    
    setAccuracy(0)

  }





  return (
    <>
     <div className="container">
        <div className="time-card" onClick={()=>setTimer(Date.now()+10000)}>10s</div>
        <div className="time-card" onClick={()=>setTimer(Date.now()+30000)}>30s</div>
        <div className="time-card" onClick={()=>setTimer(Date.now()+60000)}>60s</div>
    </div>


  <div onClick={() => inputRef.current?.focus()} style={{ cursor: "text" }}>
      
      <h1 >
      {para.split("").map((char, index) => {
  let color = "gray";
  if (index < input.length) {
    color = input[index] === char ? "white" : "red";
  }

  // initialize the ref if not already
  if (!paraRefs.current[index]) {
    paraRefs.current[index] = React.createRef();
  }

  return (
    <span key={index} style={{ color }} ref={paraRefs.current[index]}>
      {char}
    </span>
  );
})}

      </h1>

  

      
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        maxLength={para.length}
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
    </div>

    <h1>{accuracy}</h1>

    <div className="reattempt-button" onClick={handleRestart}>reattempt</div>


      

    </>
  )
}

export default App