import React, { useState } from 'react';
import './base.scss';
import data from './data';

const Base = () => {
    const [selectedSep, setSelectedSep] = useState('0');
    const [wordLength, setWordLength] = useState('3');
    const [passwordsLength, setPasswordLengths] = useState('6');

    const buildSeparators = sep => {
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

    const buildPassword = () => {
        let wordsArray = getWords(wordLength).reverse();
        let separatorsArray = getSeparators(wordLength - 1).reverse();
        let result = [];
        let key = 0;
        while (wordsArray.length) {
            key++;
            result.push(
                <span className="word" key={`word-${key}`}>
                    {wordsArray.pop()}
                </span>
            );
            result.push(
                <span className="sep" key={`sep-${key}`}>
                    {separatorsArray.pop()}
                </span>
            );
        }
        return result;
    };

    let passwordArray = () => {
        let temp = [];
        for (let i = 0; i < passwordsLength; i++) {
            temp.push(
                <div key={i} className="password">
                    {buildPassword()}
                </div>
            );
        }
        return temp;
    };

    const doCalculations = function() {
        const wordsCalc = Math.pow(data.words.length, wordLength);
        const sepCalc = Math.pow(separators.length, wordLength - 1);
        return (wordsCalc * sepCalc).toLocaleString();
    };

    return (
        <section className="pass-words container">
            <div className="row">
                <div className="col-sm">
                    <h1>Pass&#128274;Words</h1>
                    <p>{doCalculations()} possible combinations</p>
                </div>
            </div>

            <div className="row">
                <div className="col-sm">
                    <label>
                        Words per password
                        <br />
                        <select onChange={ev => setWordLength(ev.target.value)} defaultValue={wordLength}>
                            {buildOptions(5, 2).map(option => (
                                <option key={option.val} value={option.val}>
                                    {option.txt}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="col-sm">
                    <label>
                        Separators
                        <br />
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
                    </label>
                </div>

                <div className="col-sm">
                    <label>
                        Number of passwords
                        <br />
                        <select onChange={ev => setPasswordLengths(ev.target.value)} defaultValue={passwordsLength}>
                            {buildOptions(20).map(option => (
                                <option key={option.val} value={option.val}>
                                    {option.txt}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <section className="results">{passwordArray()}</section>
                </div>
            </div>
        </section>
    );
};

const getRandom = function(limit) {
    return parseInt(Math.random() * limit, 10);
};

export default Base;
