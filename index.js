import React from 'react';
import { createRoot } from 'react-dom/client';
import WordPasswords from './components/WordPasswords';
import './styles.scss';

const container = document.getElementById('word-passwords-here');
const root = createRoot(container); 
root.render(<WordPasswords />);
