import { EnumerableObject } from "../types/EnumerableObject";

export enum Category {
  asset = "BEM",
  service = "SERVIÇO",
}

/**
 * Retorna um texto no plural que representa o enum de categoria passado por parâmetro.
 * @param category
 * @returns {string}
 */
function toPluralString(category: Category): string {
  return pluralCategoryStrings[category];
}

/**
 * Retorna um texto no singular que representa o enum de categoria passado por parâmetro.
 * @param category
 * @returns {string}
 */
function toSingularString(category: Category): string {
  return singularCategoryStrings[category];
}

/**
 * Retorna uma lista com objetos do tipo `EnumerableObject`, um para cada valor possível do enum. O campo `name` será retornado no plural.
 * @returns {EnumerableObject[]}
 */
function allPluralObjects(): EnumerableObject[] {
  return allObjects(pluralCategoryStrings);
}

/**
 * Retorna uma lista com objetos do tipo `EnumerableObject`, um para cada valor possível do enum. O campo `name` será retornado no singular.
 * @returns {EnumerableObject[]}
 */
function allSingularObjects(): EnumerableObject[] {
  return allObjects(singularCategoryStrings);
}

/**
 * Retorna um objeto na estrutura do `EnumerableObject` para o enum passado por parâmetro. O campo `name` será retornado no plural.
 * @param category
 * @returns {EnumerableObject}
 */
function toPluralObject(category: Category): EnumerableObject {
  return toObject(category, pluralCategoryStrings);
}

/**
 * Retorna um objeto na estrutura do `EnumerableObject` para o enum passado por parâmetro. O campo `name` será retornado no singular.
 * @param category
 * @returns {EnumerableObject}
 */
function toSingularObject(category: Category): EnumerableObject {
  return toObject(category, singularCategoryStrings);
}

function toObject(
  category: Category,
  categoryMap: CategoryMap
): EnumerableObject {
  return {
    value: category,
    name: categoryMap[category],
  };
}

function allObjects(categoryMap: CategoryMap): EnumerableObject[] {
  return Object.entries(categoryMap).map(([value, name]) => ({
    value: value,
    name,
  }));
}

const pluralCategoryStrings: CategoryMap = {
  [Category.asset]: "Bens",
  [Category.service]: "Serviços",
};

const singularCategoryStrings: CategoryMap = {
  [Category.asset]: "Bem",
  [Category.service]: "Serviço",
};

type CategoryMap = {
  [Category.asset]: string;
  [Category.service]: string;
};

export default {
  toPluralString,
  toSingularString,
  allPluralObjects,
  allSingularObjects,
  toPluralObject,
  toSingularObject,
};
