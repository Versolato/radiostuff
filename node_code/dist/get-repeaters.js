"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const csv_helpers_1 = require("@helpers/csv-helpers");
const fs_helpers_1 = require("@helpers/fs-helpers");
const helpers_1 = require("@helpers/helpers");
const log_helpers_1 = require("@helpers/log-helpers");
const chalk_1 = __importDefault(require("chalk"));
const scraper_1 = __importDefault(require("./modules/scraper"));
const log = log_helpers_1.createLog("Get Repeaters");
async function save(place, distance) {
    log(chalk_1.default.green("Save"), place, distance);
    const scraper = new scraper_1.default(place, distance);
    const result = await scraper.process();
    // @ts-ignore
    const columns = {};
    result.forEach((row) => {
        Object.entries(row).forEach((entry) => {
            const key = entry[0];
            const value = entry[1];
            if (!columns[key]) {
                columns[key] = [];
            }
            if (columns[key].indexOf(value) === -1) {
                columns[key].push(value);
            }
        });
    });
    result.forEach((row) => {
        Object.entries(row).forEach((entry) => {
            const key = entry[0];
            const value = entry[1];
            if (columns[key].length === 1 && columns[key][0] === "" && value === "") {
                // @ts-ignore
                row[key] = "yes";
            }
        });
    });
    result.sort((a, b) => {
        const aMi = helpers_1.numberToString(a.Mi || 0, 4, 5);
        const bMi = helpers_1.numberToString(b.Mi || 0, 4, 5);
        const aName = a.Call;
        const bName = b.Call;
        const aFrequency = helpers_1.numberToString(a.Frequency || 0, 4, 5);
        const bFrequency = helpers_1.numberToString(b.Frequency || 0, 4, 5);
        const aStr = `${aMi} ${aName} ${aFrequency}`;
        const bStr = `${bMi} ${bName} ${bFrequency}`;
        return aStr > bStr ? 1 : aStr < bStr ? -1 : 0;
    });
    // result.sort((a, b) => {(a.Call > b.Call ? 1 : a.Call < b.Call ? -1 : 0));
    // result.sort((a, b) => (a.Frequency - b.Frequency));
    // result.sort((a, b) => (a.Mi - b.Mi));
    // console.log(place, distance, result.length);
    const parts = place.toString().split(`,`);
    const subPlace = `${(parts[1] || ".").trim()}/${parts[0].trim()}`;
    log(chalk_1.default.yellow("Results"), result.length, subPlace);
    await fs_helpers_1.writeToJsonAndCsv(`../data/repeaters/results/${subPlace}`, result);
}
exports.default = (async () => {
    const countyFileData = await fs_helpers_1.readFileAsync("../data/Colorado_County_Seats.csv");
    const countyData = await csv_helpers_1.parseAsync(countyFileData, { columns: true });
    const cities = countyData.map((c) => `${c["County Seat"]}, CO`);
    while (cities.length) {
        const name = cities.shift();
        if (name) {
            await save(name, 200);
        }
    }
})();
// export default start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXJlcGVhdGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9nZXQtcmVwZWF0ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaUNBQStCO0FBRS9CLHNEQUFrRDtBQUNsRCxvREFBdUU7QUFDdkUsOENBQWtEO0FBQ2xELHNEQUFpRDtBQUdqRCxrREFBMEI7QUFDMUIsZ0VBQXdDO0FBRXhDLE1BQU0sR0FBRyxHQUE0Qix1QkFBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRWhFLEtBQUssVUFBVSxJQUFJLENBQUMsS0FBc0IsRUFBRSxRQUFnQjtJQUMxRCxHQUFHLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFMUMsTUFBTSxPQUFPLEdBQVksSUFBSSxpQkFBTyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUV0RCxNQUFNLE1BQU0sR0FBbUIsTUFBTSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFdkQsYUFBYTtJQUNiLE1BQU0sT0FBTyxHQUFxRSxFQUFFLENBQUM7SUFDckYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQWlCLEVBQUUsRUFBRTtRQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQThDLEVBQUUsRUFBRTtZQUM3RSxNQUFNLEdBQUcsR0FBdUIsS0FBSyxDQUFDLENBQUMsQ0FBdUIsQ0FBQztZQUMvRCxNQUFNLEtBQUssR0FBZ0MsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDbkI7WUFDRCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FB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Q0FBQztJQUN4RixNQUFNLFVBQVUsR0FBa0IsTUFBTSx3QkFBVSxDQUFDLGNBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3RGLE1BQU0sTUFBTSxHQUFhLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFjLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2RixPQUFPLE1BQU0sQ0FBQyxNQUFNLEVBQUU7UUFDcEIsTUFBTSxJQUFJLEdBQXVCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNoRCxJQUFJLElBQUksRUFBRTtZQUNSLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN2QjtLQUNGO0FBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUVMLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIm1vZHVsZS1hbGlhcy9yZWdpc3RlclwiO1xuXG5pbXBvcnQgeyBwYXJzZUFzeW5jIH0gZnJvbSBcIkBoZWxwZXJzL2Nzdi1oZWxwZXJzXCI7XG5pbXBvcnQgeyByZWFkRmlsZUFzeW5jLCB3cml0ZVRvSnNvbkFuZENzdiB9IGZyb20gXCJAaGVscGVycy9mcy1oZWxwZXJzXCI7XG5pbXBvcnQgeyBudW1iZXJUb1N0cmluZyB9IGZyb20gXCJAaGVscGVycy9oZWxwZXJzXCI7XG5pbXBvcnQgeyBjcmVhdGVMb2cgfSBmcm9tIFwiQGhlbHBlcnMvbG9nLWhlbHBlcnNcIjtcbmltcG9ydCB7IElDb3VudHlTZWF0IH0gZnJvbSBcIkBpbnRlcmZhY2VzL2ktY291bnR5LXNlYXRcIjtcbmltcG9ydCB7IElSZXBlYXRlclJhdyB9IGZyb20gXCJAaW50ZXJmYWNlcy9pLXJlcGVhdGVyLXJhd1wiO1xuaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xuaW1wb3J0IFNjcmFwZXIgZnJvbSBcIi4vbW9kdWxlcy9zY3JhcGVyXCI7XG5cbmNvbnN0IGxvZzogKC4uLm1zZzogYW55W10pID0+IHZvaWQgPSBjcmVhdGVMb2coXCJHZXQgUmVwZWF0ZXJzXCIpO1xuXG5hc3luYyBmdW5jdGlvbiBzYXZlKHBsYWNlOiBzdHJpbmcgfCBudW1iZXIsIGRpc3RhbmNlOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgbG9nKGNoYWxrLmdyZWVuKFwiU2F2ZVwiKSwgcGxhY2UsIGRpc3RhbmNlKTtcblxuICBjb25zdCBzY3JhcGVyOiBTY3JhcGVyID0gbmV3IFNjcmFwZXIocGxhY2UsIGRpc3RhbmNlKTtcblxuICBjb25zdCByZXN1bHQ6IElSZXBlYXRlclJhd1tdID0gYXdhaXQgc2NyYXBlci5wcm9jZXNzKCk7XG5cbiAgLy8gQHRzLWlnbm9yZVxuICBjb25zdCBjb2x1bW5zOiB7IFtrZXkgaW4ga2V5b2YgSVJlcGVhdGVyUmF3XTogKHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZClbXSB9ID0ge307XG4gIHJlc3VsdC5mb3JFYWNoKChyb3c6IElSZXBlYXRlclJhdykgPT4ge1xuICAgIE9iamVjdC5lbnRyaWVzKHJvdykuZm9yRWFjaCgoZW50cnk6IFtzdHJpbmcsIChzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQpXSkgPT4ge1xuICAgICAgY29uc3Qga2V5OiBrZXlvZiBJUmVwZWF0ZXJSYXcgPSBlbnRyeVswXSBhcyBrZXlvZiBJUmVwZWF0ZXJSYXc7XG4gICAgICBjb25zdCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkID0gZW50cnlbMV07XG4gICAgICBpZiAoIWNvbHVtbnNba2V5XSkge1xuICAgICAgICBjb2x1bW5zW2tleV0gPSBbXTtcbiAgICAgIH1cbiAgICAgIGlmIChjb2x1bW5zW2tleV0hLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xuICAgICAgICBjb2x1bW5zW2tleV0hLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXN1bHQuZm9yRWFjaCgocm93OiBJUmVwZWF0ZXJSYXcpID0+IHtcbiAgICBPYmplY3QuZW50cmllcyhyb3cpLmZvckVhY2goKGVudHJ5OiBbc3RyaW5nLCAoc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkKV0pID0+IHtcbiAgICAgIGNvbnN0IGtleToga2V5b2YgSVJlcGVhdGVyUmF3ID0gZW50cnlbMF0gYXMga2V5b2YgSVJlcGVhdGVyUmF3O1xuICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCA9IGVudHJ5WzFdO1xuICAgICAgaWYgKGNvbHVtbnNba2V5XSEubGVuZ3RoID09PSAxICYmIGNvbHVtbnNba2V5XSFbMF0gPT09IFwiXCIgJiYgdmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByb3dba2V5XSA9IFwieWVzXCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJlc3VsdC5zb3J0KChhOiBJUmVwZWF0ZXJSYXcsIGI6IElSZXBlYXRlclJhdykgPT4ge1xuICAgIGNvbnN0IGFNaTogc3RyaW5nID0gbnVtYmVyVG9TdHJpbmcoYS5NaSB8fCAwLCA0LCA1KTtcbiAgICBjb25zdCBiTWk6IHN0cmluZyA9IG51bWJlclRvU3RyaW5nKGIuTWkgfHwgMCwgNCwgNSk7XG4gICAgY29uc3QgYU5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IGEuQ2FsbDtcbiAgICBjb25zdCBiTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkID0gYi5DYWxsO1xuICAgIGNvbnN0IGFGcmVxdWVuY3k6IHN0cmluZyA9IG51bWJlclRvU3RyaW5nKGEuRnJlcXVlbmN5IHx8IDAsIDQsIDUpO1xuICAgIGNvbnN0IGJGcmVxdWVuY3k6IHN0cmluZyA9IG51bWJlclRvU3RyaW5nKGIuRnJlcXVlbmN5IHx8IDAsIDQsIDUpO1xuICAgIGNvbnN0IGFTdHI6IHN0cmluZyA9IGAke2FNaX0gJHthTmFtZX0gJHthRnJlcXVlbmN5fWA7XG4gICAgY29uc3QgYlN0cjogc3RyaW5nID0gYCR7Yk1pfSAke2JOYW1lfSAke2JGcmVxdWVuY3l9YDtcbiAgICByZXR1cm4gYVN0ciA+IGJTdHIgPyAxIDogYVN0ciA8IGJTdHIgPyAtMSA6IDA7XG4gIH0pO1xuICAvLyByZXN1bHQuc29ydCgoYSwgYikgPT4geyhhLkNhbGwgPiBiLkNhbGwgPyAxIDogYS5DYWxsIDwgYi5DYWxsID8gLTEgOiAwKSk7XG4gIC8vIHJlc3VsdC5zb3J0KChhLCBiKSA9PiAoYS5GcmVxdWVuY3kgLSBiLkZyZXF1ZW5jeSkpO1xuICAvLyByZXN1bHQuc29ydCgoYSwgYikgPT4gKGEuTWkgLSBiLk1pKSk7XG5cbiAgLy8gY29uc29sZS5sb2cocGxhY2UsIGRpc3RhbmNlLCByZXN1bHQubGVuZ3RoKTtcblxuICBjb25zdCBwYXJ0czogc3RyaW5nW10gPSBwbGFjZS50b1N0cmluZygpLnNwbGl0KGAsYCk7XG4gIGNvbnN0IHN1YlBsYWNlOiBzdHJpbmcgPSBgJHsocGFydHNbMV0gfHwgXCIuXCIpLnRyaW0oKX0vJHtwYXJ0c1swXS50cmltKCl9YDtcblxuICBsb2coY2hhbGsueWVsbG93KFwiUmVzdWx0c1wiKSwgcmVzdWx0Lmxlbmd0aCwgc3ViUGxhY2UpO1xuXG4gIGF3YWl0IHdyaXRlVG9Kc29uQW5kQ3N2KGAuLi9kYXRhL3JlcGVhdGVycy9yZXN1bHRzLyR7c3ViUGxhY2V9YCwgcmVzdWx0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgKGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgY29uc3QgY291bnR5RmlsZURhdGE6IEJ1ZmZlciA9IGF3YWl0IHJlYWRGaWxlQXN5bmMoXCIuLi9kYXRhL0NvbG9yYWRvX0NvdW50eV9TZWF0cy5jc3ZcIik7XG4gIGNvbnN0IGNvdW50eURhdGE6IElDb3VudHlTZWF0W10gPSBhd2FpdCBwYXJzZUFzeW5jKGNvdW50eUZpbGVEYXRhLCB7IGNvbHVtbnM6IHRydWUgfSk7XG4gIGNvbnN0IGNpdGllczogc3RyaW5nW10gPSBjb3VudHlEYXRhLm1hcCgoYzogSUNvdW50eVNlYXQpID0+IGAke2NbXCJDb3VudHkgU2VhdFwiXX0sIENPYCk7XG4gIHdoaWxlIChjaXRpZXMubGVuZ3RoKSB7XG4gICAgY29uc3QgbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkID0gY2l0aWVzLnNoaWZ0KCk7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIGF3YWl0IHNhdmUobmFtZSwgMjAwKTtcbiAgICB9XG4gIH1cbn0pKCk7XG5cbi8vIGV4cG9ydCBkZWZhdWx0IHN0YXJ0KCk7XG4iXX0=