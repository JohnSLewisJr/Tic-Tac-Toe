import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*  Note1: In React, its conventional to use on[Event] names for propsl which represent events and handle[Event] for the methods which handle the events.
    Note2: 2 approaches to changing data: 1: Mutation = directly changing data values. 2: Replace data with a new copy which has desired changes (allows for "time-traveling", easier change detection and re-rendering)
*/

// Square is a custom component that renders a single button
//class Square extends React.Component {
//    render() { /* render is a method. The prop value is taken in from Board to show the value */
//        return ( // this.props.onClick()
//            <button 
//                className="square" 
//                onClick={() => this.props.onClick({value: 'X'})}
//            > 
//                {this.props.value} 
//            </button> // setState sets the state of the value to X when it is clicked
//        );
//    }
//}

//Function component version of Square. Simpler way to write components that only contain a render method and don't have their own state. Function components are less tedious to write that classes, and many components can be expressed this way
function Square(props) {
    return ( // onClick={props.onClick} is a simpler version of onClick={() => this.props.onClick()}
        <button className="square" onClick={props.onClick}> 
            {props.value}
        </button>
    );
}

// Board is a custom component that renders 9 squares
class Board extends React.Component {
    constructor(props) { /* this constructor initializes the state */
        super(props);   /* In JS classes, you need to ALWAYS call super when defining the constructor of a subclass. All React component classes that have a constructor should start with a super(props) call. */
        this.state = {
            squares: Array(9).fill(null), // Board's initial state is set to contain an array of 9 nulls corresponding to the 9 squares
            xIsNext: true, //makes X the default first move
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice(); //.slice() creates a copy of the squares array to modify instead of modifying the existing array
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : '0';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,   
        });
    }

    renderSquare(i) { /* renderSquare is a method */
        return (
            <Square 
                value={this.state.squares[i]} //value prop is a function passed to Square to share value
                onClick={() => this.handleClick(i)} //onClick prop is a function that Square can call when clicked
            />
        ); 
    }

    render() { //call calculateWinner(squares) in the Board's render function to check if a player has won. If player has won, display text either "Winner: X" or "Winner: O"
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="bord-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

// Game is a custom component that renders a board 
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ===========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i=0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}