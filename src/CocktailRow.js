import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function CocktailRow({cocktail}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const ingredientsFull = [cocktail.strIngredient1,cocktail.strIngredient2,cocktail.strIngredient3,cocktail.strIngredient4,cocktail.strIngredient5,cocktail.strIngredient6,cocktail.strIngredient7]; //full list of ingredients (can be nulls inside)
    const ingredients = ingredientsFull.filter(Boolean); //filter out null values
  return (
    <tr>
                <td>{cocktail.idDrink}</td>
                <td>
                    <h4 role="button" onClick={handleShow}>{cocktail.strDrink}</h4>
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
                </td>
                <td><img src={cocktail.strDrinkThumb +'/preview'}/></td>
                <td>
                    <ul class="list-group">
                        <li class="list-group-item">{cocktail.strAlcoholic}</li>
                        <li class="list-group-item">{cocktail.strCategory}</li>
                        <li class="list-group-item">{cocktail.strGlass}</li>
                    </ul>
                </td>
                <td>
                    <ul class="list-group">
                        {ingredients.map((ingredient) => ( //show ingredients as list
                        <li class="list-group-item">{ingredient}</li>
                        ))}
                    </ul>
                </td>
    </tr>
  )
}
