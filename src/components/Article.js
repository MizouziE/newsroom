import React from "react";
import Card from "./Card";
import classes from './Article.module.css'

const Article = (props) => {
    return (
        <li>
            <Card className={classes.article}>
                <h3>{props.source}</h3>
                <h2>{props.title}</h2>
                <a href={props.url}>
                    <img src={props.image} alt={`taken from ${props.source}`}/>
                </a>
            </Card>
        </li>
    );
};

export default Article;