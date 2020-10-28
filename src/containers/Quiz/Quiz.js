import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

class Quiz extends Component {

    state = {
        results: {},
        isFinished: false,
        currentQuestion: 0,
        answerState: null,
        quiz: [
            {
                question: 'Is this a question?',
                rightAnswerId: 2, 
                id: 1,
                answers: [
                    {text: '2 Answer', id: 1},
                    {text: '1 Answer', id: 2},
                    {text: '3 Answer', id: 3},
                    {text: '4 Answer', id: 4}
                ]
            },
            {
                question: 'And what about this?',
                rightAnswerId: 3, 
                id: 2,
                answers: [
                    {text: '1 Answer', id: 1},
                    {text: '2 Answer', id: 2},
                    {text: '3 Answer', id: 3},
                    {text: '6 Answer', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {

        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        console.log('answerId: ', answerId);

        const question = this.state.quiz[this.state.currentQuestion];
        const results = this.state.results;

        if (question.rightAnswerId === answerId) {

            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: { [answerId]: 'success' },
                results
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({ isFinished: true })
                } else {
                    this.setState({
                        currentQuestion: this.state.currentQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }

    isQuizFinished = () => {
        return this.state.currentQuestion + 1 === this.state.quiz.length
    }    

    retryHandler = () => {
        this.setState({
            currentQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer to the questions below</h1>

                    {
                        this.state.isFinished 
                            ? <FinishedQuiz 
                              results={this.state.results}
                              quiz={this.state.quiz}
                              onRetry={this.retryHandler}
                            />
                            : <ActiveQuiz 
                              question={this.state.quiz[this.state.currentQuestion].question}
                              answers={this.state.quiz[this.state.currentQuestion].answers}
                              onAnswerClick={this.onAnswerClickHandler}
                              quizLength={this.state.quiz.length}
                              currentQuestion={this.state.currentQuestion + 1}
                              state={this.state.answerState}
                            />
                    }

                    
                </div>
            </div>
        )
    }
}

export default Quiz