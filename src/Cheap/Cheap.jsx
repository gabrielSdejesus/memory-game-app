import React, { useState, useEffect, useRef } from 'react';
import 'animate.css';

// Função para embaralhar um array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function Cheap() {

    const generateCards = () => {
        let baseNumbers = [1, 2, 3, 4];
        let pairs = [...baseNumbers, ...baseNumbers];
        pairs.push(5);
        return shuffle(pairs);
    };

    const [cards, setCards] = useState(generateCards());
    const [cardsSelecteds, setCardsSelecteds] = useState([]);
    const [hits, setHits] = useState(0);
    const [resetCards, setResetCards] = useState(false);
    const winRef = useRef(null);

    const elementRefs = useRef(Array(9).fill(null).map(() => React.createRef()));

    function showValue(index) {
        if (cardsSelecteds.length === 2) {
            return;
        }

        const card = elementRefs.current[index].current;
        card.classList.add('animate__animated', 'animate__flipInY');
        card.innerHTML = cards[index];

        const newCardsSelecteds = [...cardsSelecteds, index];
        setCardsSelecteds(newCardsSelecteds);

        if (newCardsSelecteds.length === 2) {
            setResetCards(true);
        }
    }

    function resetSelectedCards() {
        const [firstIndex, secondIndex] = cardsSelecteds;
        const firstElement = elementRefs.current[firstIndex].current;
        const secondElement = elementRefs.current[secondIndex].current;

        firstElement.classList.add('animate__flipOutY');
        secondElement.classList.add('animate__flipOutY');

        setTimeout(() => {
            firstElement.classList.remove('animate__animated', 'animate__flipInY', 'animate__flipOutY');
            firstElement.innerHTML = '';
            secondElement.classList.remove('animate__animated', 'animate__flipInY', 'animate__flipOutY');
            secondElement.innerHTML = '';

            setCardsSelecteds([]);
            setResetCards(false);
        }, 850);
    }

    useEffect(() => {
        if (resetCards) {
            if (cards[cardsSelecteds[0]] === cards[cardsSelecteds[1]]) {
                setHits(prevHits => prevHits + 1);
                setCardsSelecteds([]);
                setResetCards(false);
            } else {
                resetSelectedCards();
            }
        }
    }, [resetCards]);

    useEffect(() => {
        if (hits === 4) {
            if (winRef.current) {
                winRef.current.style.display = 'block';
            }
        }
    }, [hits]);

    const resetGame = () => {
        setCards(generateCards());
        setCardsSelecteds([]);
        setHits(0);
        setResetCards(false);
        elementRefs.current.forEach(ref => {
            if (ref.current) {
                ref.current.innerHTML = '';
                ref.current.classList.remove('animate__animated', 'animate__flipInY', 'animate__flipOutY');
            }
        });
        if (winRef.current) {
            winRef.current.style.display = 'none';
        }
    };

    return (
        <>
            <div ref={winRef} className='winMessage displayNone'>
                Win!
                <button className="resetButton" onClick={resetGame}>Reset Game</button>
            </div>
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
        </>
    );
}

export default Cheap;
