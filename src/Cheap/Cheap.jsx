import React, {useState, useEffect, useRef} from 'react';

function Cheap(){

    const [cards, setCards] = useState([]);

    return(
        <div className="container-cheap">
            <div className="card">0</div>
            <div className="card">1</div>
            <div className="card">2</div>
            <div className="card">3</div>
            <div className="card">4</div>
            <div className="card">5</div>
            <div className="card">6</div>
            <div className="card">7</div>
            <div className="card">8</div>
        </div>
    );
}

export default Cheap;