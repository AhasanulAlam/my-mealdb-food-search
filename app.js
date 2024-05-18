const searchInputField = document.getElementById("inputSearch");


// List all meals by first letter
const loadMenuByFirstLetter = () => {
    const searchLetter = document.getElementById("inputSearch").value;
    console.log(searchLetter);

    if (searchLetter == "") {
        const errorContainer = document.getElementById("error-display");
        errorContainer.innerHTML = "";
        const div = document.createElement("div");
        div.innerHTML = `
            <p class="text-danger fs-6 fst-italic">Please enter the input. </p>
        `;
        errorContainer.appendChild(div);
        return;
    }
    else {
        // fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchLetter}`) // Using only first letter
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchLetter}`) // Using the Name
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                // console.log(data.meals);
                handleDisplayMenus(data.meals);
                searchInputField.value = "";
            })
            .catch((error) => {
                console.error(error);
                const errorContainer = document.getElementById("error-display");
                errorContainer.innerHTML = "";
                const div = document.createElement("div");
                div.innerHTML = `
                <p class="text-warning fs-6 fst-italic">${error.message} Data unavailable!</p>
            `;
                errorContainer.appendChild(div);
                return;

            });
    }
};

const handleDisplayMenus = (meals) => {
    const containerSingleMenu = document.getElementById("single-menu-section");
    containerSingleMenu.innerHTML = "";
    // console.log(meals);
    const errorContainer = document.getElementById("error-display");
    errorContainer.innerHTML = "";
    const container = document.getElementById("display-all-menu-section");
    meals.forEach(meal => {
        // console.log(meal);
        // console.log(meal.strMealThumb);
        const div = document.createElement("div");
        div.classList.add("meal-card-div");
        div.innerHTML = `
            <div>
                <div class="card" style="width: 18rem;">
                    <img src=${meal?.strMealThumb} class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal?.strMeal}</h5>
                        <p class="card-text">${meal?.strInstructions.slice(0, 60)}...</p>
                        <button onclick="displaySingleMenu('${meal?.idMeal}')" type="button" class="btn btn-primary text-white">Details</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
};

// Lookup full meal details by id (eg: id = 52772)
const displaySingleMenu = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.meals[0]);
            handleSingleDisplayMenu(data?.meals[0]);
        })
        .catch((error) => {
            console.error(error);
        });
};


const handleSingleDisplayMenu = (sMenu) => {
    console.log(sMenu);
    const container = document.getElementById("single-menu-section");
    container.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("meal-card-div");
    div.innerHTML = `
        <div class="card" style="width: 24rem;">
            <div class=" d-flex justify-content-center align-items-center p-2">
                <img class="w-100" src=${sMenu?.strMealThumb} class="card-img-top" alt="...">
            </div>
            <div class="card-body">
                <h5 class="card-title">${sMenu.strMeal}</h5>
                <h6 class="my-2">Ingredients:</h6>
                <div class="d-flex justify-content-evenly">
                    <div>
                        <ul>
                            <li>${sMenu?.strIngredient1}</li>
                            <li>${sMenu?.strIngredient2}</li>
                            <li>${sMenu?.strIngredient3}</li>
                            <li>${sMenu?.strIngredient4}</li>
                            <li>${sMenu?.strIngredient5}</li>
                            <li>${sMenu?.strIngredient6}</li>
                            <li>${sMenu?.strIngredient7}</li>
                            <li>${sMenu?.strIngredient8}</li>
                            <li>${sMenu?.strIngredient9}</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>${sMenu?.strMeasure1}</li>
                            <li>${sMenu?.strMeasure2}</li>
                            <li>${sMenu?.strMeasure3}</li>
                            <li>${sMenu?.strMeasure4}</li>
                            <li>${sMenu?.strMeasure5}</li>
                            <li>${sMenu?.strMeasure6}</li>
                            <li>${sMenu?.strMeasure7}</li>
                            <li>${sMenu?.strMeasure8}</li>
                            <li>${sMenu?.strMeasure9}</li>
                        </ul>
                    </div>
                </div>
                <h6 class="mt-2">Description:</h6>
                <p class="card-text mb-5">${sMenu.strInstructions.slice(0,250)}...</p>
                <a href="./index.html" class="btn btn-primary">Main Menu</a>
            </div>
        </div>
    `;
    container.appendChild(div);
};
