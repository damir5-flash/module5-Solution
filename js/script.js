
(function (global) {
  var dc = {};

  // STEP 1: Make an AJAX call to get all categories from the server
  var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";
  var randomCategoryShortName = "";

  dc.loadMenuItems = function (shortName) {
    console.log("Load menu items for category: " + shortName);
    // Здесь будет ваша существующая логика загрузки меню
  };

  // STEP 2: Fetch all categories and pick one randomly
  function getRandomCategory() {
    return new Promise(function (resolve, reject) {
      $ajaxUtils.sendGetRequest(allCategoriesUrl, function (response) {
        var randomIndex = Math.floor(Math.random() * response.length);
        resolve(response[randomIndex].short_name);
      });
    });
  }

  // STEP 3: Set randomCategoryShortName and dynamically update the home snippet
  document.addEventListener("DOMContentLoaded", function () {
    getRandomCategory().then(function (shortName) {
      randomCategoryShortName = shortName;

      // Update home snippet dynamically
      var specialsTile = document.querySelector("#specials-tile");
      if (specialsTile) {
        specialsTile.innerHTML = `<a href="#" onclick="$dc.loadMenuItems('${randomCategoryShortName}');">Specials</a>`;
      }
    });
  });

  global.$dc = dc;
})(window);
