import React from 'react';
import * as _ from 'lodash';

import { Article } from '../../components/Article';
import { ArticlesHeader } from '../../components/ArticlesHeader';

import { dataStatuses } from '../../helpers/data-statuses';

import './index.scss';

/**
 * Represents articles container with fetch logic.
 */
export class ArticlesContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            dataStatus: dataStatuses.initial,
            data: null
        };

        this.onReverseArticlesClick = this.onReverseArticlesClick.bind(this);
    };

    async componentDidMount() {
        try {
            const url = 'https://api.stackexchange.com/2.2/search?intitle=react&site=stackoverflow';
            const res = await fetch(url);
            const data = await res.json();
            const filteredData = _.filter(data.items, this.filterArticles);
            const sortedData = _.sortBy(filteredData, ['creation_date']);
    
            this.setState({
                dataStatus: dataStatuses.success,
                data: sortedData
            });
        } catch(err) {
            console.log(err);
            this.setState({
                dataStatus: dataStatuses.error
            })
        }
    };

    /**
     * Checks is article answered and owner reputation not less than 50
     * @param {object} article
     */
    filterArticles(article) {
        if (article.is_answered === false) {
            return false
        };

        const minRep = 50;
        if (article.owner.reputation < minRep) {
            return false
        };

        return true
    }

    onReverseArticlesClick() {
        const { data } = this.state;

        this.setState({
            data: _.reverse(Array.from(data))
        });
    }

    render() {
        const { dataStatus, data } = this.state;

        /**
         * renders loading, is status initial or feching
         */
        if (dataStatus === dataStatuses.initial || dataStatus === dataStatuses.fetching) {
            return (
                <section className='articles-container'>
                    <p className='articles-container__message'>Loading...</p>
                </section>
            )
        }

        /**
         * renders error, if fetch errored.
         */
        if (dataStatus === dataStatuses.error) {
            return (
                <section className='articles-container'>
                    <p className='articles-container__message'>Errored, please try later.</p>
                </section>
            )
        }

        /**
         * renders articles, if fetch success
         */
        return (
            <section className='articles-container'>
                <ArticlesHeader reverseFilter={this.onReverseArticlesClick} />
                {
                    data !== null &&
                    data.map(item => (
                            <Article
                                key={item.question_id}
                                userImage={item.owner.profile_image}
                                userName={item.owner.display_name}
                                postLink={item.link}
                                title={item.title}/>
                        )
                    )
                }
            </section>
        )
    }
}