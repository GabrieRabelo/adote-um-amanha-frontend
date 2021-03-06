import CategoryUtils, { Category } from "@/modules/shared/enums/Category";

describe("CategoryUtils", () => {
  describe("toString", () => {
    const pluralCases = [
      ["BEM", "Bens"],
      ["SERVICO", "Serviços"],
    ];
    test.each(pluralCases)(
      "should return plural string for parameter",
      (category, expectedString) => {
        const result = CategoryUtils.toPluralString(category as Category);
        expect(result).toBe(expectedString);
      }
    );

    const singularCases = [
      ["BEM", "Bem"],
      ["SERVICO", "Serviço"],
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
      ["BEM", { name: "Bens", value: "BEM" }],
      ["SERVICO", { name: "Serviços", value: "SERVICO" }],
    ];
    test.each(pluralCases)(
      "should return object with plural string for parameter",
      (category, expectedObject) => {
        const result = CategoryUtils.toPluralObject(category as Category);
        expect(result).toMatchObject(expectedObject);
      }
    );

    const singularCases = [
      ["BEM", { name: "Bem", value: "BEM" }],
      ["SERVICO", { name: "Serviço", value: "SERVICO" }],
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
        { value: "BEM", name: "Bens" },
        { value: "SERVICO", name: "Serviços" },
      ];
      expect(result).toMatchObject(expected);
    });

    it("should return a list containing all objects with singular strings", () => {
      const result = CategoryUtils.allSingularObjects();
      const expected = [
        { value: "BEM", name: "Bem" },
        { value: "SERVICO", name: "Serviço" },
      ];
      expect(result).toMatchObject(expected);
    });
  });
});
