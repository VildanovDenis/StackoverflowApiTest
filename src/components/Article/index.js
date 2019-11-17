import React from 'react';

export const Article = ({ userImage, userName, postLink, title }) => {
    return (
        <article>
            <a href={postLink} target='_blank' rel='noopener noreferrer'>
                <img src={userImage} alt={`${userName}'s avatar`}/>
                <h5>{userName}</h5>
                <h3>{title}</h3>
            </a>
        </article>
    )
}