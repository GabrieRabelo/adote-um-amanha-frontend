import SubcategoryUtils, {
  Subcategory,
} from "@/modules/shared/enums/Subcategory";

describe("SubcategoryUtils", () => {
  describe("toString", () => {
    const cases = [
      ["EDUCACAO", "Educação"],
      ["SAUDE", "Saúde"],
      ["PROFISSIONALIZACAO", "Profissionalização"],
      ["OUTROS", "Outros"],
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
      ["SAUDE", { name: "Saúde", value: "SAUDE" }],
      [
        "PROFISSIONALIZACAO",
        { name: "Profissionalização", value: "PROFISSIONALIZACAO" },
      ],
      ["EDUCACAO", { name: "Educação", value: "EDUCACAO" }],
      ["OUTROS", { name: "Outros", value: "OUTROS" }],
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
        { value: "SAUDE", name: "Saúde" },
        {
          value: "PROFISSIONALIZACAO",
          name: "Profissionalização",
        },
        { value: "EDUCACAO", name: "Educação" },
        { value: "OUTROS", name: "Outros" },
      ];
      expect(result).toMatchObject(expected);
    });
  });
});
