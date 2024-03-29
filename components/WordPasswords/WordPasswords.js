import React, { useState, useCallback, useMemo } from 'react';
import './word-passwords.scss';
import data from './data';

function getRandom(limit) {
    return parseInt(Math.random() * limit, 10);
}

function getRandomArray(arr, len) {
    let result = [];
    while (len--) {
        result.push(arr[getRandom(arr.length)]);
    }
    return result.reverse();
}

const WordPasswords = () => {
    const [selectedSep, setSelectedSep] = useState('0');
    const [wordLength, setWordLength] = useState('2');
    const [passwordsLength, setPasswordLengths] = useState('6');
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isCopied, setIsCopied] = useState(false);

    const separators = useMemo(() => {
        switch (selectedSep) {
            case '0':
                return [...data.numbers, ...data.other];
            case '1':
                return data.numbers;
            case '2':
                return data.other;
            default:
                return [''];
        }
    }, [selectedSep]);

    const refreshPasswords = () => {
        setRefreshTrigger((current) => current + 1);
    };

    const sepOptions = [
        { val: '0', txt: 'Numbers, punctuation, & symbols' },
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

    const buildPassword = () => {
        let wordsArray = getRandomArray(data.words, wordLength);
        let separatorsArray = getRandomArray(separators, wordLength - 1);
        let result = [];
        let key = 0;
        while (wordsArray.length) {
            result.push(
                <span className="word" key={`word-${++key}`}>
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

    const passwordArray = useMemo(() => {
        return Array.from({ length: passwordsLength }, (_, i) => (
            <div
                key={i}
                className="password"
                onClick={(ev) => {
                    copyToClipboard(ev.currentTarget.innerText);
                }}>
                {buildPassword()}
            </div>
        ));
    }, [passwordsLength, separators, wordLength, refreshTrigger]);

    const doCalculations = function () {
        const wordsCalc = Math.pow(data.words.length, wordLength);
        const sepCalc = Math.pow(separators.length, wordLength - 1);
        return (wordsCalc * sepCalc).toLocaleString();
    };

    const copyToClipboard = (text) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 1000);
            })
            .catch((err) => {
                console.error('Failed to copy password to clipboard', err);
            });
    };

    return (
        <main className="pass-words container">
            <header className="row">
                <div className="col-sm">
                    <h1>Pass&#128274;Words</h1>
                    <p>Generate passwords that are secure, yet easy to remember using three-letter words.</p>
                </div>
            </header>

            <div className="row fields">
                <div className="col-sm">
                    <label>
                        Words per password
                        <br />
                        <select onChange={(ev) => setWordLength(ev.target.value)} defaultValue={wordLength}>
                            {buildOptions(5, 2).map((option) => (
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
                            onChange={(ev) => setSelectedSep(ev.target.value)}
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
                        <select onChange={(ev) => setPasswordLengths(ev.target.value)} defaultValue={passwordsLength}>
                            {buildOptions(25).map((option) => (
                                <option key={option.val} value={option.val}>
                                    {option.txt}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="col-sm">
                    <button className="btn-sm btn-outline-success" onClick={refreshPasswords}>
                        Refresh
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <p className="possibilities">
                        With the selected options, there are {doCalculations()} possible combinations.
                        <br />
                        Click a password to copy it to the clipboard.
                    </p>
                    <section className="results">{passwordArray}</section>
                </div>
            </div>
            <footer className="row">
                <div className="col-sm copy">
                    <abbr title="Jim Horn">JHo</abbr> :: 2020 - {new Date().getFullYear()}
                </div>
            </footer>
            {isCopied && <div class="overlay">Copied!</div>}
        </main>
    );
};

export default WordPasswords;
