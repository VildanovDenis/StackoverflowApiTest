import React from 'react';
import * as _ from 'lodash';

import { Article } from '../../components/Article';

import { dataStatuses } from '../../helpers/data-statuses';

export class ArticlesContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            dataStatus: dataStatuses.initial,
            data: null
        }
    };

    async componentDidMount() {
        try {
            const url = 'https://api.stackexchange.com/2.2/search?intitle=react&site=stackoverflow';
            const res = await fetch(url);
            const data = await res.json();
            const filteredData = _.filter(data.items, this.filterArticles);
            const sortedData = filteredData.sort((a, b) => a.creation_date - b.creation_date);
    
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

    render() {
        const { dataStatus, data } = this.state;

        if (dataStatus === dataStatuses.initial || dataStatus === dataStatuses.fetching) {
            return <p>Loading...</p>
        }

        if (dataStatus === dataStatuses.error) {
            return <p>Errored, please try later.</p>
        }

        return (
            <section className='articles-container'>
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