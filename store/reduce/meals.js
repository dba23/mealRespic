import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/meals";
const initailState = {
  meals: MEALS,
  filteredMeal: MEALS,
  favorit: [],
};

export const mealReducer = (state = initailState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const exsitingIndex = state.favorit.findIndex(
        (meal) => meal.id === action.mealId
      );
      console.log(exsitingIndex);
      if (exsitingIndex >= 0) {
        return {
          ...state,
          favorit: state.favorit.filter(
            (item, index) => !(index === exsitingIndex)
          ),
        };
      } else {
        return {
          ...state,
          favorit: state.favorit.concat(
            state.meals.find((meal) => meal.id === action.mealId)
          ),
        };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      // console.log(appliedFilters, "-----------------");
      const filterdMeals = state.meals.filter((meal) => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) return false;
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) return false;
        if (appliedFilters.vegan && !meal.isVegan) return false;
        if (appliedFilters.vegeterian && !meal.isVegeterian) return false;

        return true;
      });
      return {
        ...state,
        filteredMeal: filterdMeals,
      };
    default:
      return state;
  }
};
