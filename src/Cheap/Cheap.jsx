import React, {useState, useEffect, useRef} from 'react';
import 'animate.css';

function Cheap() {
    const [cards, setCards] = useState([1, 2, 3, 4, 1, 2, 3, 4, 5]);
    const elementRefs = useRef(Array(9).fill(null).map(() => React.createRef()));

    function showValue(index) {
        const element = elementRefs.current[index].current; 
        element.classList.add('animate__animated', 'animate__flipInY');
        element.innerHTML = cards[index];
    }

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