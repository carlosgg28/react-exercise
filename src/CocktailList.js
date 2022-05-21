import React from 'react'
import Cocktail from './Cocktail'
import Table from 'react-bootstrap/Table'
import CocktailRow from './CocktailRow';

export default function CocktailList({cocktails}) {
  return (
      <div>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Drink Info</th>
                <th>Ingredients</th>
                </tr>
            </thead>
            <tbody>
                {cocktails.map(cocktail => {
                  return <CocktailRow key={cocktail.idDrink} cocktail={cocktail}/> //each cocktail needs an unique key
                })}
            </tbody>
        </Table>
        {/* {cocktails.map(cocktail => {
        return <Cocktail key={cocktail.idDrink} cocktail={cocktail}/> //each cocktail needs an unique key
        })} */}
      </div>
  )
}