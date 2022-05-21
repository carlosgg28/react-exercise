import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Cocktail({cocktail}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const ingredientsFull = [cocktail.strIngredient1,cocktail.strIngredient2,cocktail.strIngredient3,cocktail.strIngredient4,cocktail.strIngredient5,cocktail.strIngredient6,cocktail.strIngredient7]; //full list of ingredients (can be nulls inside)
    const ingredients = ingredientsFull.filter(Boolean); //filter out null values
    return (
        
    <div>
        <h1 role="button" onClick={handleShow} >{cocktail.strDrink}</h1>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{cocktail.strDrink}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <img src={cocktail.strDrinkThumb +'/preview'}/>
                <h4>Ingredients</h4>
                <p>
                {ingredients.map((ingredient) => ( //show ingredients as list
                <li>{ingredient}</li>
                ))}
                </p>
                <h4>Instructions</h4>
                <p>
                {cocktail.strInstructions}
                </p>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
      <br></br>
        <img src={cocktail.strDrinkThumb +'/preview'}/>
        <h4>Alcoholic</h4>
        <li>{cocktail.strAlcoholic}</li>
        <h4>Category</h4>
        <li>{cocktail.strCategory}</li>
        <h4>Glass Type</h4>
        <li>{cocktail.strGlass}</li>
        { // we need to make sure there are ingredients before showing them
            ingredients.length > 0 &&
            <h4>Ingredients</h4>
        }
        {
            ingredients.length > 0 &&
            ingredients.map((ingredient) => (
                <li>{ingredient}</li>
            ))
        }
    </div>
  )
}
