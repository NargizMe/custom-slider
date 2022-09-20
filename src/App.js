import './App.css';
import {useEffect, useRef, useState} from "react";

let count = 0;
function App() {
    const [state, setState] = useState([]);
    const sliderRef = useRef();


    useEffect(() => {
        let interval, i = 0;
        interval = setInterval(()=>{
            if (i < 3) {
                setState(prev => ([...prev, 'https://coffee.alexflipnote.dev/random']));
                i++
            } else {
                clearInterval(interval)
            }
        }, 600)


        return () => {
            clearInterval(interval)
        }
    },[])

    useEffect(() => {
        let interval;
        interval = setInterval(()=>{
            onNext();
        }, 3000)

        return () => {
            clearInterval(interval)
        }
    },[])


    function onNext(){
        const slides = Array.from(sliderRef.current.children);
        if (Math.abs(count) < slides.length-1) {
            count--;
            const xAxis = 700 * count;

            slides.forEach((child, i) => {
                child.style.transform = `translateX(${xAxis}px)`
            })
        } else {
            count = 0;
            slides.forEach((child, i) => {
                child.style.transform = `translateX(${0}px)`
            })
        }
    }

    function onPrev(){
        const slides = Array.from(sliderRef.current.children);
        if (count < 0) {
            count++;
            slides.forEach((child) => {
                child.style.transform = `translateX(${700 * count}px)`
            })
        }
    }

  return (
      <>
        <div className='slider-container' ref={sliderRef} >
            {
                state.map((el, i) => {
                    const leftSize = 700 * i;
                    return <div key={i} className='slider-item' style={{left: `${leftSize}px`}}>
                        <img src={el}/>
                    </div>
                })
            }
        </div>
          <div style={{textAlign: 'center'}}>
              <button onClick={onPrev}>previous</button>
              <button onClick={onNext}>next</button>
          </div>
      </>
  );
}

export default App;