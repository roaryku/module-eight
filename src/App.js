import { useEffect, useState} from 'react';
import './App.css';
import video from './recipes.mp4';
import image from './salad.png';
import MyRecipesComponent from './MyRecipesComponent';


function App() {
      const MY_ID = "25e96eb9";
      const MY_KEY = "20b674746d5fcb640d09cf6ea78e5ac7%09";

      const [mySearch, setMySearch] = useState("");
      const [myRecipes, setMyRecipes] = useState([]);
      const [wordSubmitted, setWordSubmitted] = useState(" ")

      useEffect(() => {
        const getRecipe = async () => {
          const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${ MY_ID}&app_key=${MY_KEY}`)
          const data = await response.json();
          setMyRecipes(data.hits);
        }
        getRecipe();
      }, [wordSubmitted])

      const myRecipeSearch = (e) => {
        setMySearch(e.target.value)
      }

      const finalSearch = (e) => {
         e.preventDefault();
         setWordSubmitted(mySearch)
      }

    return(
      <div className='App'>
        <div className='container'>
          <video autoPlay muted loop playsinline>
            <source src={video} type='video/mp4'/>
          </video>
            <h1>Find a Recipe</h1>
        </div>

        <div className= 'container'>
          <form onSubmit={finalSearch}>
             <input className='search' placeholder='search...'  onChange={myRecipeSearch} value={mySearch}/>
            </form>

        <div className='container'>
           <button onClick={finalSearch}>
             <img src={image} alt="icon"/>
            </button>
      </div>
    
    </div>
    {myRecipes.map((element, index )=> (
      <MyRecipesComponent
      key={index}
      label = {element.recipe.label}
      image = {element.recipe.image}
      calories = {element.recipe.calories}
      ingredients = {element.recipe.ingredientLines}/>
    ))}
      </div>
    
 )
}
  export default App;

  // https://api.edamam.com/api/recipes/v2?type=public&q=salmon&app_id=25e96eb9&app_key=20b674746d5fcb640d09cf6ea78e5ac7%09



