import { areEqual } from "@/modules/shared/utils/ObjectComparator";

describe("ObjectComparator", () => {
  describe("return true", () => {
    it("should return true for two empty objects", () => {
      const obj1 = {};
      const obj2 = {};
      const result = areEqual(obj1, obj2);
      expect(result).toBe(true);
    });

    it("should return true for two equal objects", () => {
      const obj1 = { name: "name1", value: "value1" };
      const obj2 = { name: "name1", value: "value1" };
      const result = areEqual(obj1, obj2);
      expect(result).toBe(true);
    });

    it("should return true for two equal objects in different order", () => {
      const obj1 = { name: "name1", value: "value1" };
      const obj2 = { value: "value1", name: "name1" };
      const result = areEqual(obj1, obj2);
      expect(result).toBe(true);
    });
  });

  describe("return false", () => {
    it("should return false for object missing a property", () => {
      const obj1 = { name: "name1", value: "value1" };
      const obj2 = { name: "name1" };
      const result = areEqual(obj1, obj2);
      expect(result).toBe(false);
    });

    it("should return false for object with different value", () => {
      const obj1 = { name: "name1", value: "value1" };
      const obj2 = { name: "name1", value: "value2" };
      const result = areEqual(obj1, obj2);
      expect(result).toBe(false);
    });

    it("should return false for object with not strictly equal value", () => {
      const obj1 = { name: "name1", value: 1 };
      const obj2 = { name: "name1", value: "1" };
      const result = areEqual(obj1, obj2);
      expect(result).toBe(false);
    });
  });
});
