import React from 'react';

import './index.scss';

export const Article = ({ userImage, userName, postLink, title }) => {
    return (
        <article className='article'>
            <a href={postLink} target='_blank' rel='noopener noreferrer' className='article__link-wrapper'>
                <div className='article__userinfo'>
                    <img src={userImage} alt={`${userName}'s avatar`} className='article__user-avatar'/>
                </div>
                <h3 className='article__title'>{title}</h3>
            </a>
        </article>
    )
}