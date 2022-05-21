import React, {useState, useRef, useEffect} from 'react'
import CocktailList from './CocktailList';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function Home() {
    const [cocktails, setCocktails] = useState([]); //cocktails shown on the website
    const [checked, setChecked] = useState(false);
    const handleClick = () => handleFilterAlcoholic(); //handle checkbox
    const cocktailNameRef = useRef()
    const cocktailIngRef = useRef()

    useEffect(() => {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((actualData) => setCocktails(actualData.drinks));
       }, []); //call always when the webpage loads

    function handleSearchCocktail(e){ //filter cocktails by name
        cocktailIngRef.current.value = "";
        const cocktailName = cocktailNameRef.current.value;
        console.log(cocktailName);
        fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+cocktailName)
            .then((response) => response.json())
            .then((actualData) => setCocktails(actualData.drinks));
    }

    function handleSearchIngredient(e){ //filter cocktails by ingredient
        cocktailNameRef.current.value = "";
        const cocktailIng = cocktailIngRef.current.value;
        console.log(cocktailIng);
        fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="+cocktailIng)
            .then((response) => response.json())
            .then((actualData) => setCocktails(actualData.drinks));
    }

    function handleFilterAlcoholic(){ //filter cocktails by alcohol
        if (!checked) fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic")
            .then((response) => response.json())
            .then((actualData) => setCocktails(actualData.drinks));
        else fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic")
        .then((response) => response.json())
        .then((actualData) => setCocktails(actualData.drinks));

        setChecked(!checked);
    }

    function handleClearFilters(){ //clear all filters
        setChecked(false);
        cocktailNameRef.current.value = "";
        cocktailIngRef.current.value = "";
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((actualData) => setCocktails(actualData.drinks));
    }


    return (
    <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Cocktail Drinks :)</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            </Nav>
        </Navbar>
        <div>Search Cocktail By Name</div>
        <input ref={cocktailNameRef} type="text"/>
        <button onClick={handleSearchCocktail}>Search Cocktail</button>
        <div>------------------------------</div>
        <div>Search Cocktail By Ingredient</div>
        <input ref={cocktailIngRef} type="text"/>
        <button onClick={handleSearchIngredient}>Search Ingredient</button>
        <div>------------------------------</div>
        <input onClick={handleClick} checked={checked} type="checkbox" name="alcoholic" />
        <label for="alcoholic">Alcoholic</label>
        <div>------------------------------</div>
        <button onClick={handleClearFilters}>Clear Filters</button>
        <CocktailList cocktails={cocktails}/>
    </>

  )
}
