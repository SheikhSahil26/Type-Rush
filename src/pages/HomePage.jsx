import { useState } from 'react'

import './home.css'
import React, { useEffect, useRef } from 'react'
import TypeTestResults from '../components/TypeTestResults'
import {Link} from 'react-router-dom'
import CompeteScreen from '../components/CompeteScreen'
import { useAuthContext } from '../context/AuthContext'
import { useFirebase } from '../context/FirebaseContext'


function HomePage() {
  const words = ["apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map", "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "boat", "box", "boy", "bread", "cake", "car", "cat", "chair", "dog", "door", "duck", "egg", "fish", "flag", "floor", "game", "gift", "girl", "glass", "goat", "gold", "grape", "hand", "hat", "head", "hill", "home", "horse", "house", "jam", "jar", "juice", "key", "king", "kite", "lamp", "leaf", "leg", "lion", "lock", "man", "map"]

  const [count, setCount] = useState(0)
  const [input, setInput] = useState("");
  const [para, setPara] = useState("")
  const [correct, setCorrect] = useState(0);
  const [inCorrect, setIncorrect] = useState(0);
  const [startTime, setStartTime] = useState(null)
  const [isStarted, setIsStarted] = useState(false)
  const [endTime, setEndTime] = useState(null)
  const [accuracy, setAccuracy] = useState(0)
  const [rawWpm, setRawWpm] = useState(0);
  const [actualWpm, setActualWpm] = useState(0);
  const [time, setTime] = useState(null)
  const [restart, setRestart] = useState(false)
  const [typeAccuracy, setTypeAccuracy] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [competeMode,setCompeteMode]=useState(false);


  const {storeUsersToOnlineLobby,usersInLobby,deleteUserFromOnlineLobby}=useFirebase()
  
  const {authUser}=useAuthContext()

  
  console.log(authUser)
  
  

  const typeAccuracyRef = useRef([]);

  const inputRef = useRef()
  const paraRefs = useRef([]);
  const correctRef = useRef(0);
const incorrectRef = useRef(0);






  useEffect(() => {
    const getRandomWords = async () => {
      let str = "";
      for (let i = 0; i < 150; i++) {
        str += words[Math.floor(Math.random() * words.length)];
        str += " "
      }
      setPara(str);
    }
    getRandomWords()
  }, [restart])

  const handleStartTimer = () => {
    setStartTime(Date.now());
    if (time === null) {
      setEndTime(Date.now() + 10000)
    } else {
      setEndTime(time)
    }

    setIsStarted(true)
  }

  useEffect(() => {

    console.log(correct, inCorrect)

    if (input.length > 0 && !isStarted) {

      handleStartTimer()
    }

    // if (input.length > 0 && input[input.length - 1] === para[input.length - 1]) {
    //   setCorrect((prev) => prev + 1);
      
    // }
    // else if (input.length > 0 && input[input.length - 1] !== para[input.length - 1]) {
    //   setIncorrect((prev) => prev + 1);
      
    // }
    if (input.length > 0 && input[input.length - 1] === para[input.length - 1]) {
  setCorrect((prev) => {
    correctRef.current = prev + 1;
    return prev + 1;
  });
} else if (input.length > 0 && input[input.length - 1] !== para[input.length - 1]) {
  setIncorrect((prev) => {
    incorrectRef.current = prev + 1;
    return prev + 1;
  });
}


    








  }, [input, para]);



  useEffect(() => { 
    if (!isStarted) return;

    const timer = setInterval(() => {
      const now = Date.now();
      // const totalTyped = correct + inCorrect;
      const totalTyped = correctRef.current + incorrectRef.current;

      const acc = totalTyped === 0 ? 0 : ((correctRef.current) * 100) / totalTyped;
      typeAccuracyRef.current.push(acc);

      if (now >= endTime) {
        console.log(totalTyped)
        console.log(correct, inCorrect)
        inputRef.current?.blur();

        if (totalTyped > 0) {

          setAccuracy(acc);
          const durationInMinutes = (endTime - startTime) / 1000 / 60;
          console.log(durationInMinutes)
          console.log(totalTyped)
          const wpm = (totalTyped / 5) / durationInMinutes;
          setActualWpm((correctRef.current / 5) / durationInMinutes)
          console.log(wpm)
          setRawWpm(wpm);
          setTypeAccuracy([...typeAccuracyRef.current]); 
          console.log(typeAccuracyRef.current)
        } else {
          setAccuracy(0);
        }
        setIsStarted(false);
        setStartTime(endTime)
        clearInterval(timer);
         setShowResults(true);
      }






    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, endTime]);






  const divClickHandler = () => {

  if (showResults===false) {
    inputRef.current?.focus();
  }

  }

  const handleRestart = () => {
    setRestart((prev) => !prev)
    correctRef.current = 0;        // ✅ Reset these
  incorrectRef.current = 0;  
    
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
    setRawWpm(0);
   typeAccuracyRef.current = []
   setShowResults(false);

  }

  const handleStartAndCloseCompeteMode=async()=>{
    if(competeMode===true){
      await deleteUserFromOnlineLobby(authUser.username);
    }
    setCompeteMode((prev)=>!prev);
  }




  // const onStartCompetition=(username,selectedPlayer)=>{

  // }






  return (
    <>

    <h1 className='web-name'>Type-Rush</h1>
  
      <div className="container">
        <div className="time-card" onClick={() => setTime(Date.now() + 10000)}>10s</div>
        <div className="time-card" onClick={() => setTime(Date.now() + 30000)}>30s</div>
        <div className="time-card" onClick={() => setTime(Date.now() + 60000)}>60s</div>
      </div>


      <div onClick={divClickHandler} style={{ cursor: "text" }}>

        <h2>
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





              <React.Fragment key={index}>
                {index === input.length && isStarted && <span className="cursor"></span>}
                <span style={{ color }} ref={paraRefs.current[index]}>
                  {char}
                </span>

              </React.Fragment>

            );

          })}

        </h2>




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

      {competeMode && (<CompeteScreen 
      handleStartAndCloseCompeteMode={handleStartAndCloseCompeteMode}
      
      />
      )}

   

      {showResults && (
  <TypeTestResults
    accuracy={accuracy}
    raw={rawWpm}
    actualWpm={actualWpm}
    correct={correctRef.current}
    incorrect={incorrectRef.current}
    totalKeystrokes={input.length}
    duration={(endTime - startTime) / 1000}
    wpmHistory={typeAccuracyRef.current} 
    typeAccuracyHistory={typeAccuracyRef.current}
  />
)}

      <div className="reattempt-button" onClick={(handleStartAndCloseCompeteMode)}>Compete with others</div>

      <div className="reattempt-button" onClick={handleRestart}>reattempt</div>


          <div className="reattempt-button" onClick={handleRestart}>Logout</div>


    </>
  )
}

export default HomePage