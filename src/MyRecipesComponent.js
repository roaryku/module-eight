import icon from './checked.png'

function MyRecipesComponent({label, image, calories, ingredients}){
    return(
        <div>
            <div className="container">
               <h2>{label}</h2>

               <div className="container">
                  <img className="tasty" src={image} alt="food"/>

                  <ul className="container">
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>
                            <img className="icon" src={icon} alt='icon'/>
                            {ingredient}</li>
                    ))}
                  </ul>

                <div className="container">
                    <p className='par'>{calories.toFixed()} Calories</p>
                </div>

              </div> 
           </div>
        </div>
    )
}
export default MyRecipesComponent;