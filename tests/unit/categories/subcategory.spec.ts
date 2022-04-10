import SubcategoryUtils, {
  Subcategory,
} from "@/modules/shared/enums/Subcategory";

describe("SubcategoryUtils", () => {
  describe("toString", () => {
    const cases = [
      [Subcategory.education, "Educação"],
      [Subcategory.food, "Alimentação"],
      [Subcategory.health, "Saúde"],
      [Subcategory.professionalization, "Profissionalização"],
      [Subcategory.others, "Outros"],
    ];
    test.each(cases)(
      "given %p as argument, should return %p.",
      (subcategoryKey, expectedString) => {
        const result = SubcategoryUtils.toString(subcategoryKey as Subcategory);
        expect(result).toBe(expectedString);
      }
    );
  });

  describe("toObject", () => {
    const cases = [
      [Subcategory.health, { name: "Saúde", value: 0 }],
      [
        Subcategory.professionalization,
        { name: "Profissionalização", value: 1 },
      ],
      [Subcategory.education, { name: "Educação", value: 2 }],
      [Subcategory.food, { name: "Alimentação", value: 3 }],
      [Subcategory.others, { name: "Outros", value: 4 }],
    ];
    test.each(cases)(
      "given %p as argument, should return %p.",
      (subcategoryKey, expectedObject) => {
        const result = SubcategoryUtils.toObject(subcategoryKey as Subcategory);
        expect(result).toMatchObject(expectedObject);
      }
    );
  });

  describe("allObjects", () => {
    it("should return a list containing all objects with plural strings", () => {
      const result = SubcategoryUtils.allObjects();
      const expected = [
        { value: Subcategory.health, name: "Saúde" },
        {
          value: Subcategory.professionalization,
          name: "Profissionalização",
        },
        { value: Subcategory.education, name: "Educação" },
        { value: Subcategory.food, name: "Alimentação" },
        { value: Subcategory.others, name: "Outros" },
      ];
      expect(result).toMatchObject(expected);
    });
  });
});
