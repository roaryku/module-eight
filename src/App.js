import { useEffect, useState} from 'react';
import './App.css';
import './index.css';
import video from './recipes.mp4';
import image from './salad.png';
import MyRecipesComponent from './MyRecipesComponent';
import LoaderPage from './LoaderPage';
import Swal from 'sweetalert2';



function App() {
      const MY_ID = "25e96eb9";
      const MY_KEY = "20b674746d5fcb640d09cf6ea78e5ac7%09";

      const [mySearch, setMySearch] = useState("");
      const [myRecipes, setMyRecipes] = useState([]);
      const [wordSubmitted, setWordSubmitted] = useState(" ");
      const [stateLoader, setStateLoader] = useState(false)

      useEffect(() => {
        const getRecipe = async () => {
          setStateLoader(true)
          const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${ MY_ID}&app_key=${MY_KEY}`);

          if (response.ok) {
            setStateLoader(false);
            const data = await response.json();
            setMyRecipes(data.hits);
           } 

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
      const handleClick = () => {
        if(!mySearch) {
          setStateLoader(false);
          Swal.fire("Please enter your ingredients!")
          return false
        }
        else if(!wordSubmitted){
          setStateLoader(false);
          Swal.fire("Ingredients entered incorectly")
         } 
       }
      

    return(
      <div className='App'>

        {stateLoader && <LoaderPage/>}

        <div className='container'>
          <video autoPlay muted loop>
            <source src={video} type='video/mp4'/>
          </video>
            <h1>Find a Recipe</h1>
        </div>

        <div className= 'container'>
          <form onSubmit={finalSearch}>
             <input className='search' type='text' placeholder='search...'  onChange={myRecipeSearch} value={mySearch}/>
            

        <div className='container'>
           <button onClick={handleClick}>
             <img src={image} alt="icon"/>
            </button>
          </div>
      </form>
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



