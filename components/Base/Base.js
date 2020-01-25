import React, { useState } from 'react';
import './base.scss';
import data from './data';

const Base = () => {
    const [selectedSep, setSelectedSep] = useState('0');
    const [wordLength, setWordLength] = useState('2');
    const [passwordsLength, setPasswordLengths] = useState('5');

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

    let separators = buildSeparators(selectedSep);

    const sepOptions = [
        { val: '0', txt: 'Numbers, punctuation & symbols' },
        { val: '1', txt: 'Numbers only' },
        { val: '2', txt: 'Punctuation & symbols only' },
        { val: '3', txt: 'None' },
    ];

    const buildOptions = (len = 5) => {
        let options = [];
        for (let i = 1; i < len + 1; i++) {
            options.push({ val: i, txt: i });
        }
        return options;
    };

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
            </select>{' '}
            {JSON.stringify(separators, null, 4)} <br />
            <select onChange={ev => setWordLength(ev.target.value)} defaultValue={wordLength}>
                {buildOptions().map(option => (
                    <option key={option.val} value={option.val}>
                        {option.txt}
                    </option>
                ))}
            </select>{' '}
            {JSON.stringify(wordLength, null, 4)} <br />
            <select onChange={ev => setPasswordLengths(ev.target.value)} defaultValue={passwordsLength}>
                {buildOptions(20).map(option => (
                    <option key={option.val} value={option.val}>
                        {option.txt}
                    </option>
                ))}
            </select>{' '}
            {JSON.stringify(passwordsLength, null, 4)} <br />
        </section>
    );
};

const getRandom = function(limit) {
    return parseInt(Math.random() * limit);
};

export default Base;
