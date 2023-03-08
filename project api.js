
    const apiKey = '6ed01b42f88744c6801cab7fbd1719a0'; 

    const searchInput = document.getElementById('searcher');
    const searchButton = document.getElementById('searchbtn');
    const detailSection = document.getElementById('detailsection');

    searchButton.addEventListener('click', searchRecipes);

    function searchRecipes() {
      const query = searchInput.value;
    
      axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=10`)
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
    
