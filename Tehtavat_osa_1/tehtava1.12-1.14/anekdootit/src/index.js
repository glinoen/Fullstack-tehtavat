import React from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {    
    return (
        <div>
            <button onClick={props.klikki}>{props.nimi}</button>
        </div>
    )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      pisteet: [0, 0, 0, 0, 0, 0]  
    }
  }

  klikkeri = (klikattava, value) => {
    return () => {
        this.setState({[klikattava]: value })  
    }
}
  voter = (kopio) => {
    return () => {
      kopio[this.state.selected] += 1
      this.setState({pisteet: kopio })
    }
}

  render() {
    const kopio = [...this.state.pisteet]
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <p>has {this.state.pisteet[this.state.selected]} votes</p>
        <Button klikki={this.voter(kopio)}  nimi="vote"/>
        <Button klikki={this.klikkeri('selected', Math.floor(Math.random() * (anecdotes.length)))} nimi='next anecdote'/>
        <h2>anecdote with most votes</h2>
        {this.props.anecdotes[this.state.pisteet.indexOf(Math.max(...this.state.pisteet))]}
        {console.log(Math.max(...this.state.pisteet))}
      </div>
    )
  }
}



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)