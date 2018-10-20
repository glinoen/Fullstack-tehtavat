import React from 'react'

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            {Otsikko({kurssi})}
            {Sisalto({kurssi})}
            {Yhteensa({kurssi})}
        </div>
    )
  }

const Otsikko = ({ kurssi }) => {
    return (
      <h1>{kurssi.nimi}</h1>
      
    )
  }

const Osa = ({ kurssi }) => {
    return (
        <div>
            <p>{kurssi.osat.map(note =><li key={note.id}> {note.nimi} {note.tehtavia}</li>)}  </p>
        </div>
    )
}

const Sisalto = ({ kurssi }) => {
    return (
        <div>
            {Osa({kurssi})}
        </div>
    )
}

const Yhteensa = ({ kurssi }) => { 
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return (
        <div>
            <p> yhteensä {(kurssi.osat.map(note => note.tehtavia)).reduce(reducer)} tehtävää </p>
        </div>
    )
}

export default Kurssi