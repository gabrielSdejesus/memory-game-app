import React, {useState, useEffect, useRef} from 'react';
import 'animate.css';

function Cheap() {
    const [cards, setCards] = useState([1, 2, 3, 4, 1, 2, 3, 4, 5]);
    const [cardsSelecteds, setCardsSelecteds] = useState([]);
    const [hits, setHits] = useState(0);
    
    const elementRefs = useRef(Array(9).fill(null).map(() => React.createRef()));
    
    function showValue(index) {
        const card = elementRefs.current[index].current; 
        card.classList.add('animate__animated', 'animate__flipInY');
        card.innerHTML = cards[index];

        setCardsSelecteds(prevCardsSelecteds => [...prevCardsSelecteds, index]);
    }

    function validateCard(){
        if (cards[cardsSelecteds[0]] === cards[cardsSelecteds[1]]) {
            setHits(prevHits => prevHits + 1);
        } else {
            cardsSelecteds.forEach((cardSelected) => {
                const element = elementRefs.current[cardSelected].current;
                element.classList.remove('animate__animated', 'animate__flipInY');
                

                setTimeout(() => {
                    element.innerHTML = '';
                    element.classList.add('animate__animated', 'animate__flipInY');
                    
                    setTimeout(() => {
                        element.classList.remove('animate__animated', 'animate__flipInY');
                    }, 500);
                }, 500);
            })
        }
        setCardsSelecteds([]);
    }

    useEffect(() => {

        const timeoutID = setTimeout(() => {
            if(cardsSelecteds.length == 2) {
                validateCard();
            }
          }, 850);
          
          return () => clearTimeout(timeoutID); 
    }, [cardsSelecteds])

    return (
        <div className="container-cheap">
            {elementRefs.current.map((ref, index) => (
                <div 
                    key={index} 
                    ref={ref} 
                    id={index} 
                    className="card" 
                    onClick={() => showValue(index)}
                >

                </div>
            ))}
        </div>
    );
}

export default Cheap;