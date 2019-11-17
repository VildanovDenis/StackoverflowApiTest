import React, { useState } from 'react';

import './index.scss';

export const ArticlesHeader = ({ reverseFilter }) => {
    const [isReversed, toggleReverse] = useState(false);

    function onButtonClick() {
        toggleReverse(!isReversed);
        reverseFilter();
    }

    return (
        <header className='articles-header'>
            <span className='articles-header__subtitle'>Sort by date: </span>
            <button type='button' className={`articles-header__button`} onClick={onButtonClick}>
                {
                    isReversed
                    ? 'oldest first'
                    : 'newest first'
                }
            </button>
        </header>
    )
}