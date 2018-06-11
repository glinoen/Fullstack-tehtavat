import React from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {    
    return (
        <div>
            <button onClick={props.klikki}>{props.nimi}</button>
        </div>
    )
}

const Statistics = (props) => {
    if(props.arvo.hyva === 0 && props.arvo.neutraali === 0 && props.arvo.huono === 0){
        return (
            <div>
                <p>yhtäkään palautetta ei ole annettu</p>
            </div>
        )
    }
    return (
        <table>
            <tbody>
                <Statistic nimi='hyvä' arvo={props.arvo.hyva}/>
                <Statistic nimi='neutraali' arvo={props.arvo.neutraali}/>
                <Statistic nimi='huono' arvo={props.arvo.huono}/>
                <Statistic nimi='keskiarvo' arvo={(props.arvo.hyva - props.arvo.huono)/(props.arvo.hyva + props.arvo.neutraali + props.arvo.huono)}/>
                <Statistic nimi='positiivisia' arvo={[props.arvo.hyva/(props.arvo.hyva + props.arvo.neutraali + props.arvo.huono)]*100} prossa='%'/>
            </tbody>
        </table>
    )
}

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.nimi}</td>
            <td>{props.arvo}</td>
            <td>{props.prossa}</td>
        </tr> 
    )
}

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0
      }
    }
    

    klikkeri = (klikattava, value) => {
        return () => {
            this.setState({[klikattava]: value })
            console.log({klikattava, value})
        }
    }
    render() {
      return (
        <div>
          <div>
            <h1>anna palautetta</h1>
            <Button nimi='hyvä' klikki={this.klikkeri('hyva', (this.state.hyva + 1))}/>
            <Button nimi='neutraali' klikki={this.klikkeri('neutraali', (this.state.neutraali + 1))}/>
            <Button nimi='huono' klikki={this.klikkeri('huono', (this.state.huono + 1))}/>
            <h1>statistiikka</h1> 
            <Statistics arvo={this.state}/>  
          </div>
        </div>
      )
    }
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )