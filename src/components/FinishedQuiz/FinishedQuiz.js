import React from 'react';
import classes from './FinishedQuiz.module.css';
import Button from '../UI/Button/Button';

const FinishedQuiz = props => {

    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }

        return total
    }, 0)

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                { props.quiz.map((quizItem, index) => {

                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ]                    

                    return (
                        <li
                            key={index}
                        >
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                }) }
            </ul>

            <p>
                {successCount} correct answers of {props.quiz.length} total.
            </p>

            <div>
                <Button onClick={props.onRetry} type={'primary'}>Retry</Button>
                <Button type={'success'}>Back to Quiz Selector</Button>
            </div>
        </div>
    )
}

export default FinishedQuiz