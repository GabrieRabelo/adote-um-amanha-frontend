import { isTokenValid } from "@/modules/shared/utils/AuthenticationManager";

describe("ObjectComparator", () => {
  describe("isTokenValid", () => {
    it("should return false for non-JWT format", () => {
      const token = `eyJhbGciOiJIUzI1NiJ9eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY0OTU1MzUxMywiaWF0IjoxNjQ5MzgwNzEzfQ`;
      const result = isTokenValid(token);
      expect(result).toBe(false);
    });

    it("should return false for no 'exp' field in JWT", () => {
      const token = `eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImlhdCI6MTY0OTM4MDcxM30.XJpzMEDmb-IfI9a_ftcvdb4Kvzaa-bLC5LsWNYO75rk`;
      const result = isTokenValid(token);
      expect(result).toBe(false);
    });

    it("should return true even if JWT has expired", () => {
      const token = `eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY0MDk5NTI2MCwiaWF0IjoxNjQ5NzI4NTAzfQ.GW58AZKl2n80hIJPKlgf9IEVAc6afGcv5S_x2UWqpto`;
      const nowMock = new Date("2022-01-01T00:00:01.000Z").getTime();
      const dateMock = jest.spyOn(Date, "now") as jest.Mock<number>;
      dateMock.mockImplementation(() => {
        return nowMock;
      });
      const result = isTokenValid(token);
      expect(result).toBe(true);
    });

    it("should return true for valid date in JWT", () => {
      const token = `eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY0MDk5NTI2MCwiaWF0IjoxNjQ5NzI4NTAzfQ.GW58AZKl2n80hIJPKlgf9IEVAc6afGcv5S_x2UWqpto`;
      const nowMock = new Date("2022-01-01T01:00:00.000Z").getTime();
      const dateClassMock = jest.spyOn(Date, "now") as jest.Mock<number>;
      dateClassMock.mockImplementation(() => {
        return nowMock;
      });
      const result = isTokenValid(token);
      expect(result).toBe(true);
    });
  });
});
