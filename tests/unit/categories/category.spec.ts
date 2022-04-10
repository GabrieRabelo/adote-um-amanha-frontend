import CategoryUtils, { Category } from "@/modules/shared/enums/Category";

describe("CategoryUtils", () => {
  describe("toString", () => {
    const pluralCases = [
      [Category.asset, "Bens Materiais"],
      [Category.service, "Serviços"],
    ];
    test.each(pluralCases)(
      "should return plural string for parameter",
      (category, expectedString) => {
        const result = CategoryUtils.toPluralString(category as Category);
        expect(result).toBe(expectedString);
      }
    );

    const singularCases = [
      [Category.asset, "Bem Material"],
      [Category.service, "Serviço"],
    ];
    test.each(singularCases)(
      "should return singular string for parameter",
      (category, expectedString) => {
        const result = CategoryUtils.toSingularString(category as Category);
        expect(result).toBe(expectedString);
      }
    );
  });

  describe("toObject", () => {
    const pluralCases = [
      [Category.asset, { name: "Bens Materiais", value: 0 }],
      [Category.service, { name: "Serviços", value: 1 }],
    ];
    test.each(pluralCases)(
      "should return object with plural string for parameter",
      (category, expectedObject) => {
        const result = CategoryUtils.toPluralObject(category as Category);
        expect(result).toMatchObject(expectedObject);
      }
    );

    const singularCases = [
      [Category.asset, { name: "Bem Material", value: 0 }],
      [Category.service, { name: "Serviço", value: 1 }],
    ];
    test.each(singularCases)(
      "should return singular string for parameter",
      (category, expectedObject) => {
        const result = CategoryUtils.toSingularObject(category as Category);
        expect(result).toMatchObject(expectedObject);
      }
    );
  });

  describe("allObjects", () => {
    it("should return a list containing all objects with plural strings", () => {
      const result = CategoryUtils.allPluralObjects();
      const expected = [
        { value: 0, name: "Bens Materiais" },
        { value: 1, name: "Serviços" },
      ];
      expect(result).toMatchObject(expected);
    });

    it("should return a list containing all objects with singular strings", () => {
      const result = CategoryUtils.allSingularObjects();
      const expected = [
        { value: 0, name: "Bem Material" },
        { value: 1, name: "Serviço" },
      ];
      expect(result).toMatchObject(expected);
    });
  });
});
