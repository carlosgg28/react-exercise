import React, {useState, useRef, useEffect} from 'react'
import CocktailList from './CocktailList';
import Pagination from './Pagination';
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

export default function Home() {
    const [cocktails, setCocktails] = useState([]); //cocktails shown on the website
    const [checked, setChecked] = useState(false);
    const handleClick = () => handleFilterAlcoholic(); //handle checkbox
    const cocktailNameRef = useRef();

    const [ingFilter, setIngFilter] = useState(["Orange", "Gin", "Lemon", "Coke", "Vodka"])
    const Ing = ingFilter.map(Ing => Ing);

    const [catFilter, setCatFilter] = useState(["Ordinary Drink", "Shot", "Coffee / Tea", "Homemade Liqueur", "Cocoa"])
    const Cat = catFilter.map(Cat => Cat);

    const [glassFilter, setGlassFilter] = useState(["Highball glass", "Whiskey Glass", "Shot glass", "Brandy snifter", "White wine glass"])
    const Glass = glassFilter.map(Glass => Glass);


    const [currentPage, setCurrentPage] = useState(1);
    const [cocktailsPerPage, setCocktailsPerPage] = useState(10);

    useEffect(() => {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((actualData) => setCocktails(actualData.drinks));
       }, []); //call always when the webpage loads

    function handleSearchCocktail(e){ //filter cocktails by name
        const cocktailName = cocktailNameRef.current.value;
        console.log(cocktailName);
        fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+cocktailName)
            .then((response) => response.json())
            .then((actualData) => setCocktails(actualData.drinks));
    }

    async function handleFilterAlcoholic(){ //filter cocktails by alcohol
        const fullCocktailDetails = [];
        if (!checked){
            setChecked(!checked);
            const cocktailsFilteredResponse = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic")
            .then((response) => response.json());
            const cocktailsFiltered = cocktailsFilteredResponse.drinks;
            for (const cocktail of cocktailsFiltered){
                const cocktailDetailsResponse = await fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+cocktail.idDrink)
                .then((response) => response.json());
                //console.log(cocktailDetailsResponse);
                const cocktailDetails = cocktailDetailsResponse.drinks[0];
                //console.log(cocktailDetails);
                fullCocktailDetails.push(cocktailDetails);
            }
        }
        else{
            setChecked(!checked);
            const cocktailsFilteredResponse = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic")
            .then((response) => response.json());
            const cocktailsFiltered = cocktailsFilteredResponse.drinks;
            for (const cocktail of cocktailsFiltered){
                const cocktailDetailsResponse = await fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+cocktail.idDrink)
                .then((response) => response.json());
                //console.log(cocktailDetailsResponse);
                const cocktailDetails = cocktailDetailsResponse.drinks[0];
                //console.log(cocktailDetails);
                fullCocktailDetails.push(cocktailDetails);
            }
        }

        setCocktails(fullCocktailDetails);
    }

    async function handleFilterIngredient(e){
        const cocktailsFilteredResponse = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="+ingFilter[e.target.value])
            .then((response) => response.json());
        const cocktailsFiltered = cocktailsFilteredResponse.drinks;
        //console.log(cocktailsFiltered);

        const fullCocktailDetails = [];
        for (const cocktail of cocktailsFiltered){
            const cocktailDetailsResponse = await fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+cocktail.idDrink)
            .then((response) => response.json());
            //console.log(cocktailDetailsResponse);
            const cocktailDetails = cocktailDetailsResponse.drinks[0];
            //console.log(cocktailDetails);
            fullCocktailDetails.push(cocktailDetails);
        }
        //console.log(fullCocktailDetails);
        setCocktails(fullCocktailDetails);

    }

    async function handleFilterCategory(e){
        const cocktailsFilteredResponse = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="+catFilter[e.target.value])
            .then((response) => response.json());
        const cocktailsFiltered = cocktailsFilteredResponse.drinks;
        //console.log(cocktailsFiltered);

        const fullCocktailDetails = [];
        for (const cocktail of cocktailsFiltered){
            const cocktailDetailsResponse = await fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+cocktail.idDrink)
            .then((response) => response.json());
            //console.log(cocktailDetailsResponse);
            const cocktailDetails = cocktailDetailsResponse.drinks[0];
            //console.log(cocktailDetails);
            fullCocktailDetails.push(cocktailDetails);
        }
        //console.log(fullCocktailDetails);
        setCocktails(fullCocktailDetails);

    }

    async function handleFilterGlass(e){
        const cocktailsFilteredResponse = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?g="+glassFilter[e.target.value])
            .then((response) => response.json());
        const cocktailsFiltered = cocktailsFilteredResponse.drinks;
        //console.log(cocktailsFiltered);

        const fullCocktailDetails = [];
        for (const cocktail of cocktailsFiltered){
            const cocktailDetailsResponse = await fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+cocktail.idDrink)
            .then((response) => response.json());
            //console.log(cocktailDetailsResponse);
            const cocktailDetails = cocktailDetailsResponse.drinks[0];
            //console.log(cocktailDetails);
            fullCocktailDetails.push(cocktailDetails);
        }
        //console.log(fullCocktailDetails);
        setCocktails(fullCocktailDetails);

    }

    function handleClearFilters(){ //clear all filters
        setChecked(false);
        cocktailNameRef.current.value = "";
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((actualData) => setCocktails(actualData.drinks));
        setCurrentPage(1);
    }

    //Get current cocktails
    const indexOfLastCocktail = currentPage * cocktailsPerPage;
    const indexOfFirstCocktail = indexOfLastCocktail - cocktailsPerPage;
    const currentCocktails = cocktails.slice(indexOfFirstCocktail, indexOfLastCocktail);

    //Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
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
        <Button onClick={handleSearchCocktail} variant="primary">Search</Button>
        <div>------------------------------</div>
        <div>Filter Cocktail By Ingredient</div>
        < select
            onChange={e => handleFilterIngredient(e)}
            className="browser-default custom-select" >
            {
                Ing.map((ingredient, key) => <option key={key}value={key}>{ingredient}</option>)
            }
        </select >

        <div>------------------------------</div>
        <div>Filter Cocktail By Category</div>
        < select
            onChange={e => handleFilterCategory(e)}
            className="browser-default custom-select" >
            {
                Cat.map((category, key) => <option key={key}value={key}>{category}</option>)
            }
        </select >

        <div>------------------------------</div>
        <div>Filter Cocktail By Glass</div>
        < select
            onChange={e => handleFilterGlass(e)}
            className="browser-default custom-select" >
            {
                Glass.map((glass, key) => <option key={key}value={key}>{glass}</option>)
            }
        </select >
        
        
        <div>------------------------------</div>
        <input onClick={handleClick} checked={checked} type="checkbox" name="alcoholic" />
        <label for="alcoholic">Alcoholic</label>
        <div>------------------------------</div>
        <Button onClick={handleClearFilters} variant="primary">Clear Filters</Button>
        <CocktailList cocktails={currentCocktails}/>
        <Pagination cocktailsPerPage={cocktailsPerPage} totalCocktails={cocktails.length} paginate={paginate} />
    </>

  )
}
