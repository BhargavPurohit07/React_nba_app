import React, { Component } from 'react';
import axios from 'axios';
import { URL } from '../../../../config';

import styles from '../../articles.css';
import Header from './header';

class NewsArticles extends Component {

    state = {
        article:[],
        team:[]
    }

    componentWillMount(){
        axios.get(`${URL}/articles?id=${this.props.match.params.id}`)
        .then( response => {
            let article = response.data[0];

            axios.get(`${URL}/teams?id=${article.team}`)
            .then( response => {
                this.setState({
                    article,
                    team:response.data
                })
            })
        })
    }


    render(){
        const article = this.state.article;
        const team = this.state.team;

        return(
            <div className={styles.articleWrapper}>
                <Header
                    teamData={team[0]}
                    date={article.date}
                    author={article.author}
                />
                <div className={styles.articleBody}>
                    <h1>{article.title}</h1>
                    <div className={styles.articleImage}
                        style={{
                            background:`url('/images/articles/${article.image}')`
                        }}
                    ></div>
                    <div className={styles.articleText}>
                        {article.body}
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsArticles;