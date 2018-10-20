import React from 'react';
import noteService from './services/persons';
import './index.css'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      haettava: '',
      ilmoitus:null
    }
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.handleNoteChange = this.handleNoteChange.bind(this)
    this.poistaja = this.poistaja.bind(this)
  }

  componentDidMount() {
    console.log('did mount')
    noteService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response.data,newName: '',newNumber:''})
      })
  }

  addNote = (event) =>  {
    event.preventDefault()
    const noteObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    const asd = this.state.persons.map((x)=>x.name)
    if(asd.includes(this.state.newName)=== true){
      for (var name of this.state.persons) {
        if (name.name === this.state.newName && window.confirm(name.name + ' on jo luettelossa, korvataanko vanha numero?')) {
          noteService
            .update(name.id, noteObject)
            .then(() => {
              this.componentDidMount();
              this.setState({ilmoitus:'Henkilön '+ name.name + ' numero päivitetty'})
              setTimeout(() => {
                this.setState({ilmoitus: null})
              }, 5000)
            })
            .catch(error => {
              this.componentDidMount()
              noteService
                .create(noteObject)
                .then(response => {
                  this.setState({
                    persons: this.state.persons.concat(response.data),
                    newName: '',
                    newNumber: '',
                    ilmoitus: noteObject.name + ' lisätty luetteloon'
                  })
                  setTimeout(() => {
                    this.setState({ilmoitus: null})
                  }, 5000)
                })
            }) 
        }
      }   
    }
    if(asd.includes(this.state.newName)=== false) {
      noteService
        .create(noteObject)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newNumber: '',
            ilmoitus: noteObject.name + ' lisätty luetteloon'
          })
          setTimeout(() => {
            this.setState({ilmoitus: null})
          }, 5000)
        })
    }
  }

  poistaja = (name) => {
    if(window.confirm('poistetaanko ' + name.name )) {
      noteService
        .poista(name.id)
        .then(() => {
            this.componentDidMount();
            this.setState({ilmoitus:name.name + ' poistettu'})
            setTimeout(() => {
              this.setState({ilmoitus: null})
            }, 5000)
          })  
    }   
  }

  

  handleNoteChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }

  handleHaettavaChange = (event) => {
    console.log(event.target.value)
    this.setState({ haettava: event.target.value })
  }


  render() {
    const haettava =this.state.haettava;
    let lista;
    if (haettava === ''){
      lista = this.state.persons.map(name => <li key={name.name}>{name.name} {name.number}<button type="submit" onClick={() => {
        this.poistaja(name)}}>poista</button></li>)
    } else {
      const suspect = this.state.persons.map((x)=> x.name)
      const target = suspect.filter((x) => x.toLowerCase().includes(haettava.toLowerCase()))
      const famous = this.state.persons.filter((x)=> target.includes(x.name))
      lista = famous.map(name => <li key={name.name}>{name.name} {name.number}<button type="submit" onClick={() => {
        this.poistaja(name)}}>poista</button></li>)
    }
    const Notification = ({ message }) => {
      if (message === null) {
        return null
      }
      return (
        <div className="error">
          {message}
        </div>
      )
    }
    return (
      <div>
        <Notification message={this.state.ilmoitus}/>
        <h1>Puhelinluettelo</h1>
        <div>
          rajaa näytettäviä:<input
          value={this.state.haettava}
          onChange={this.handleHaettavaChange}
          />
        </div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addNote}>
          <div>
            nimi: <input 
            value={this.state.newName}
            onChange={this.handleNoteChange}
            />
          </div>
          <div>
            numero: <input 
            value={this.state.newNumber}
            onChange ={this.handleNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
        {lista}
        </ul>
      </div>
    )
  }
}

export default App