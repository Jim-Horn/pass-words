import React from 'react';
import { render } from 'react-dom';
import './styles.scss';
import Base from './components/Base';

const MainView = () => {
    return <Base />;
};
render(<MainView />, document.getElementById('base-component'));
