import React from "react";
import Article from "./Article";
import classes from './ArticleList.module.css'

const ArticleList = (props) => {
    return (
            <ul className={classes['article-list']}>
                {props.articles.map((article) => (
                    <Article
                        key={article.id}
                        title={article.title}
                        source={article.source}
                        url={article.url}
                        image={article.image}
                    />
                ))}
            </ul>
    );
};

export default ArticleList;