export const Filters = {
  searchByName: (recipes, searchString) =>
    recipes.filter(recipe => (searchString!=""?recipe.name.includes(searchString):true)),
  sortByDate: (recipes, isReverse) =>
    recipes.sort((r1, r2) => {
      return isReverse
        ? r1.createDate - r2.createDate
        : r2.createDate - r1.createDate;
    }),
  filterByCategory: (recipes, category) =>
    recipes.filter(recipe =>
      category === "any" ? true : recipe.category === category
    )
};
