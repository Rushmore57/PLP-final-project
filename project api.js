
const firebaseConfig = {
  apiKey: "AIzaSyDREgVOsEPGBGNtsBv3rLw57Dfvalj2d00",
  authDomain: "recipe-book-e3141.firebaseapp.com",
  databaseURL: "https://recipe-book-e3141-default-rtdb.firebaseio.com",
  projectId: "recipe-book-e3141",
  storageBucket: "recipe-book-e3141.appspot.com",
  messagingSenderId: "332398574208",
  appId: "1:332398574208:web:9c4590ff1e0532dcc58465",
  measurementId: "G-WX8EMW0PKH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const apiKey = 'b016c6af72fa4e75901586a84e490d46'; 

const searchInput = document.getElementById('searcher');
const searchButton = document.getElementById('searchbtn');
const detailSection = document.getElementById('detailsection');

searchButton.addEventListener('click', searchRecipes);

function searchRecipes() {
  const query = searchInput.value;

  axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=40&RecipeNutritionInformation=true`)
    .then(response => {
      const recipes = response.data.results;

      detailSection.innerHTML = '';

      recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        const recipeImg = document.createElement('img');
        recipeImg.src = recipe.image;
        recipeDiv.appendChild(recipeImg);
        recipeImg.className="searchimage"

        const recipeTitle = document.createElement('h1');
        recipeTitle.textContent = recipe.title;
        recipeDiv.appendChild(recipeTitle);

        const recipeLink = document.createElement('a');
        recipeLink.href = recipe.sourceUrl;
        recipeLink.textContent = 'View Recipe';
        recipeDiv.appendChild(recipeLink);
        recipeLink.className="recipelink";

        const addToFavButton = document.createElement('button');
        addToFavButton.textContent = 'Add to Favorite';
        addToFavButton.className="addtofavbutton"
        addToFavButton.addEventListener('click', function () { 
          const recipeName = recipeTitle.textContent;
          const recipeImage =  recipeImg.src;
          const recipeSource = recipeLink.href;
          const now = new Date();
          const date = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
          const time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
          const word = " at "
          const BDnT = date + word +time; 
          firebase
          .database()
          .ref("favorite recipes")
          .push({
            recipeName : recipeName,
            recipeSource : recipeSource,
            recipeImage : recipeImage,
            dateAndTime : BDnT
          });
          document.getElementById("favouritediv").insertAdjacentHTML(
            'beforeend',
            `
            <div class="favouritelist">
            <div class="everyelse">
            <img src="${recipeImage}" class="fav_img">
            <div class="detail">
                <h1 class="recipe_header"> ${recipeName}</h1>
                <p class="recipe_date"> ${BDnT} </p>
            </div>
            </div>
        </div>

            `
          )
        });
        recipeDiv.appendChild(addToFavButton);

        const addToSavedButton = document.createElement('button');
        addToSavedButton.textContent = 'Save recipe';
        addToSavedButton.id = "savebtn";
        addToSavedButton.className = "tosavebtn";
        addToSavedButton.addEventListener('click', () => {
          // Code to add recipe to saved
        });
        recipeDiv.appendChild(addToSavedButton);

        detailSection.appendChild(recipeDiv);
      });
    })
    .catch(error => {
      console.error(error);
    });
}
