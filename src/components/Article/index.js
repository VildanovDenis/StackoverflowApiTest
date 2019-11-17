import React from 'react';

import './index.scss';

export const Article = ({ userImage, userName, postLink, title }) => {
    return (
        <article className='article'>
            <a href={postLink} target='_blank' rel='noopener noreferrer' className='article__link-wrapper'>
                <img src={userImage} alt={`${userName}'s avatar`}/>
                <h5>{userName}</h5>
                <h3>{title}</h3>
            </a>
        </article>
    )
}