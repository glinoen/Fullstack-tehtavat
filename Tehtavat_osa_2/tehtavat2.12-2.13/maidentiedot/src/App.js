import React from 'react';
import noteService from './services/maat'
import './index.css'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      maat:[],
      haettava:'',
      seula:[]
    }
  }

  componentDidMount() {
    console.log('did mount')
    noteService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ maat: response.data})
      })
  }



  handleHaettavaChange = (event) => {
    this.setState({haettava : event.target.value})
    console.log(this.state.haettava)

  }

  render() {
    console.log('renderr')
    let seula = this.state.maat.filter((x) => x.name.toLowerCase().includes(this.state.haettava.toLowerCase()))
    const Lista = () => {
      if(seula.length > 11 && this.state.haettava.length > 0){
        return (
          <div>too many matches, specify another filter</div>
        )
      }
      if(seula.length > 1 && this.state.haettava.length > 0) {
        return (
          <div>
            <ul>
              {seula.map((x) => <ul key={x.name} onClick={()=>this.setState({haettava: x.name})}>{x.name}</ul>)}
            </ul>
          </div>
        )
      }
      if(seula.length === 1) {
        return (
          <div>
            <h2>{seula.map((x) => x.name)}</h2>
            capital: {seula.map((x) => x.capital)}<br></br>
            population: {seula.map((x) => x.population)}<br></br>
            <img src={seula.map((x) => x.flag)}alt='' height="200" width="300"></img>
          </div>
        )
      }
      return null
    }
    return (
      <div>
        <h1>Country Info</h1>
        <div>
          find countries:<input
            value={this.state.haettava}
            onChange={this.handleHaettavaChange}
            />
        </div>
        <Lista></Lista>
      </div>
    );
  }
}

export default App;
