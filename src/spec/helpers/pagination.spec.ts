import {
  getPaginationInfo,
  getPaginationQueryData,
} from "../../helpers/pagination";

describe("Check Pagination Info", () => {
  describe("Pagination info from query", () => {
    it("should return correct page info for db query", () => {
      const pageInfo = { currentPage: 1, limit: 20 };
      const result = getPaginationQueryData(pageInfo);
      expect(result.currentPage).toBe(1);
      expect(result.limit).toBe(20);
      expect(result.skip).toBe(20);
    });
    it("should return correct page info when sendAllRecords is 'YES' for db query", () => {
      const pageInfo = { currentPage: 1, limit: 50, sendAllRecords: "YES" };
      const result = getPaginationQueryData(pageInfo);
      expect(result.currentPage).toBe(0);
      expect(result.limit).toBe(0);
      expect(result.skip).toBe(0);
    });
  });

  describe("Pagination details from db data", () => {
    it("should return correct pagination info for client", () => {
      const currentPage = 1,
        limit = 20,
        total = 1899;
      const result = getPaginationInfo(total, limit, currentPage);

      expect(result.totalRecords).toBe(1899);
      expect(result.limit).toBe(20);
      expect(result.totalPages).toBe(95);
      expect(result.currentPage).toBe(1);
    });
    it("should return correct pagination info for client when no records", () => {
      const currentPage = 0,
        limit = 20,
        total = 0;
      const result = getPaginationInfo(total, limit, currentPage);

      expect(result.totalRecords).toBe(0);
      expect(result.limit).toBe(20);
      expect(result.totalPages).toBe(0);
      expect(result.currentPage).toBe(0);
    });
  });
});
