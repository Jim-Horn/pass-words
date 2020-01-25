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

    const buildOptions = (finish = 5, start = 1) => {
        let options = [];
        for (let i = start; i < finish + 1; i++) {
            options.push({ val: i, txt: i });
        }
        return options;
    };

    let getWords = (len = 5) => {
        let words = [];
        while (len--) {
            words.push(data.words[getRandom(data.words.length)]);
        }
        return words;
    };

    let getSeparators = (len = 5) => {
        let seps = [];
        while (len--) {
            seps.push(separators[getRandom(separators.length)]);
        }
        return seps;
    };

    const buildPassword = (arrWords = [], arrSeps = []) => {
        let result = [];
        for (let word in arrWords) {
            result.push(arrWords[word]);
            result.push(arrSeps.pop());
        }
        return result.join('');
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
                {buildOptions(5, 2).map(option => (
                    <option key={option.val} value={option.val}>
                        {option.txt}
                    </option>
                ))}
            </select>{' '}
            {JSON.stringify(wordLength, null, 4)} <br />
            {JSON.stringify(getWords(wordLength), null, 4)} <br />
            {JSON.stringify(getSeparators(wordLength), null, 4)} <br />
            <select onChange={ev => setPasswordLengths(ev.target.value)} defaultValue={passwordsLength}>
                {buildOptions(20).map(option => (
                    <option key={option.val} value={option.val}>
                        {option.txt}
                    </option>
                ))}
            </select>{' '}
            {JSON.stringify(passwordsLength, null, 4)} <br />
            {JSON.stringify(buildPassword(getWords(wordLength), getSeparators(wordLength-1)), null, 4)} <br />
        </section>
    );
};

const getRandom = function(limit) {
    return parseInt(Math.random() * limit, 10);
};

export default Base;
