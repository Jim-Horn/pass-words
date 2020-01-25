import React, { useState } from 'react';
import './base.scss';
import data from './data';

const Base = () => {
    const [selectedSep, setSelectedSep] = useState('0');
    // const [separators, setSeparators] = useState(null);

    const buildSeparators = sep => {
        console.log('sep: ', sep);

        switch (sep) {
            case '0':
                return [...data.numbers, ...data.other];
            case '1':
                return data.numbers;
            case '2':
                return data.other;
            default:
                return [''];
        }
    };

    let separators = buildSeparators((selectedSep));

    const sepOptions = [
        { val: '0', txt: 'Numbers, punctuation & symbols' },
        { val: '1', txt: 'Numbers only' },
        { val: '2', txt: 'Punctuation & symbols only' },
        { val: '3', txt: 'None' },
    ];

    return (
        <section className="pass-words">
            <h1>Pass&#128274;Words</h1>
            <select
                name="separators"
                id="separators"
                onChange={ev => setSelectedSep(ev.target.value)}
                defaultValue={selectedSep}>
                {sepOptions.map((el, idx) => (
                    <option key={idx} value={el.val}>
                        {el.txt}
                    </option>
                ))}
            </select>
            <br />
            {JSON.stringify(separators, null, 4)}
        </section>
    );
};

const getRandom = function(limit) {
    return parseInt(Math.random() * limit);
};

export default Base;
