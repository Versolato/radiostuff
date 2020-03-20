"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_helpers_1 = require("@helpers/log-helpers");
const chalk_1 = __importDefault(require("chalk"));
const log = log_helpers_1.createLog("Helpers");
function wait(ms, fn) {
    log(chalk_1.default.green("Wait"), ms);
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                resolve(fn && (await fn()));
            }
            catch (e) {
                reject(e);
            }
        }, ms);
    });
}
exports.wait = wait;
function numberToString(num, major, minor) {
    let str = num.toString();
    const split = str.split(".");
    if (major !== undefined) {
        if (split[0] === undefined) {
            split[0] = "0";
        }
        while (split[0].length < major) {
            split[0] = "0" + split[0];
        }
        if (split[0].length > major) {
            log(chalk_1.default.red("Major length exceeded"), "Number:", num, "Section:", split[0], "Length:", split[0].length, "Target:", major);
        }
        str = split.join(".");
    }
    if (minor !== undefined) {
        if (split[1] === undefined) {
            split[1] = "0";
        }
        while (split[1].length < minor) {
            split[1] = split[1] + "0";
        }
        if (split[1].length > minor) {
            log(chalk_1.default.red("Minor length exceeded"), "Number:", num, "Section:", split[1], "Length:", split[1].length, "Target:", minor);
        }
        str = split.join(".");
    }
    return str;
}
exports.numberToString = numberToString;
function flattenObject(data) {
    if (!data || typeof data !== "object" || Array.isArray(data)) {
        return data;
    }
    let subData = { ...data };
    let loop = true;
    while (loop) {
        loop = false;
        const entries = Object.entries(subData);
        for (const entry of entries) {
            const key = entry[0];
            const value = entry[1];
            if (typeof value === "object" && !Array.isArray(value)) {
                delete subData[key];
                const valueWithKeynames = {};
                Object.entries(value).forEach((subEntry) => {
                    valueWithKeynames[`${key}.${subEntry[0]}`] = subEntry[1];
                });
                subData = { ...subData, ...valueWithKeynames };
                loop = true;
            }
        }
    }
    return subData;
}
exports.flattenObject = flattenObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2hlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBaUQ7QUFDakQsa0RBQTBCO0FBRTFCLE1BQU0sR0FBRyxHQUE0Qix1QkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRTFELFNBQWdCLElBQUksQ0FBVyxFQUFVLEVBQUUsRUFBMkI7SUFDcEUsR0FBRyxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQTJDLEVBQUUsTUFBOEIsRUFBUSxFQUFFO1FBQ3ZHLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNwQixJQUFJO2dCQUNGLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUM3QjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNYO1FBQ0gsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBWEQsb0JBV0M7QUFFRCxTQUFnQixjQUFjLENBQUMsR0FBVyxFQUFFLEtBQWMsRUFBRSxLQUFjO0lBQ3hFLElBQUksR0FBRyxHQUFXLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQyxNQUFNLEtBQUssR0FBYSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtRQUN2QixJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDMUIsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUNoQjtRQUNELE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLEVBQUU7WUFDOUIsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0I7UUFDRCxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxFQUFFO1lBQzNCLEdBQUcsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM3SDtRQUNELEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3ZCO0lBQ0QsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1FBQ3ZCLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUMxQixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBRTtZQUM5QixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUMzQjtRQUNELElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLEVBQUU7WUFDM0IsR0FBRyxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzdIO1FBQ0QsR0FBRyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDdkI7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUE1QkQsd0NBNEJDO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLElBQVM7SUFDckMsSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUM1RCxPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsSUFBSSxPQUFPLEdBQVEsRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDO0lBQy9CLElBQUksSUFBSSxHQUFZLElBQUksQ0FBQztJQUN6QixPQUFPLElBQUksRUFBRTtRQUNYLElBQUksR0FBRyxLQUFLLENBQUM7UUFDYixNQUFNLE9BQU8sR0FBb0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6RCxLQUFLLE1BQU0sS0FBSyxJQUFJLE9BQU8sRUFBRTtZQUMzQixNQUFNLEdBQUcsR0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxLQUFLLEdBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDdEQsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3BCLE1BQU0saUJBQWlCLEdBQTJCLEVBQUUsQ0FBQztnQkFDckQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUF1QixFQUFFLEVBQUU7b0JBQ3hELGlCQUFpQixDQUFDLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPLEdBQUcsRUFBRSxHQUFHLE9BQU8sRUFBRSxHQUFHLGlCQUFpQixFQUFFLENBQUM7Z0JBQy9DLElBQUksR0FBRyxJQUFJLENBQUM7YUFDYjtTQUNGO0tBQ0Y7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBeEJELHNDQXdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUxvZyB9IGZyb20gXCJAaGVscGVycy9sb2ctaGVscGVyc1wiO1xuaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xuXG5jb25zdCBsb2c6ICguLi5tc2c6IGFueVtdKSA9PiB2b2lkID0gY3JlYXRlTG9nKFwiSGVscGVyc1wiKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHdhaXQ8VCA9IHZvaWQ+KG1zOiBudW1iZXIsIGZuPzogKCkgPT4gKFQgfCBQcm9taXNlPFQ+KSk6IFByb21pc2U8VD4ge1xuICBsb2coY2hhbGsuZ3JlZW4oXCJXYWl0XCIpLCBtcyk7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZTogKHZhbHVlPzogKFByb21pc2U8VD4gfCBUKSkgPT4gdm9pZCwgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkKTogdm9pZCA9PiB7XG4gICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICByZXNvbHZlKGZuICYmIChhd2FpdCBmbigpKSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9LCBtcyk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbnVtYmVyVG9TdHJpbmcobnVtOiBudW1iZXIsIG1ham9yPzogbnVtYmVyLCBtaW5vcj86IG51bWJlcik6IHN0cmluZyB7XG4gIGxldCBzdHI6IHN0cmluZyA9IG51bS50b1N0cmluZygpO1xuICBjb25zdCBzcGxpdDogc3RyaW5nW10gPSBzdHIuc3BsaXQoXCIuXCIpO1xuICBpZiAobWFqb3IgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChzcGxpdFswXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzcGxpdFswXSA9IFwiMFwiO1xuICAgIH1cbiAgICB3aGlsZSAoc3BsaXRbMF0ubGVuZ3RoIDwgbWFqb3IpIHtcbiAgICAgIHNwbGl0WzBdID0gXCIwXCIgKyBzcGxpdFswXTtcbiAgICB9XG4gICAgaWYgKHNwbGl0WzBdLmxlbmd0aCA+IG1ham9yKSB7XG4gICAgICBsb2coY2hhbGsucmVkKFwiTWFqb3IgbGVuZ3RoIGV4Y2VlZGVkXCIpLCBcIk51bWJlcjpcIiwgbnVtLCBcIlNlY3Rpb246XCIsIHNwbGl0WzBdLCBcIkxlbmd0aDpcIiwgc3BsaXRbMF0ubGVuZ3RoLCBcIlRhcmdldDpcIiwgbWFqb3IpO1xuICAgIH1cbiAgICBzdHIgPSBzcGxpdC5qb2luKFwiLlwiKTtcbiAgfVxuICBpZiAobWlub3IgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChzcGxpdFsxXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzcGxpdFsxXSA9IFwiMFwiO1xuICAgIH1cbiAgICB3aGlsZSAoc3BsaXRbMV0ubGVuZ3RoIDwgbWlub3IpIHtcbiAgICAgIHNwbGl0WzFdID0gc3BsaXRbMV0gKyBcIjBcIjtcbiAgICB9XG4gICAgaWYgKHNwbGl0WzFdLmxlbmd0aCA+IG1pbm9yKSB7XG4gICAgICBsb2coY2hhbGsucmVkKFwiTWlub3IgbGVuZ3RoIGV4Y2VlZGVkXCIpLCBcIk51bWJlcjpcIiwgbnVtLCBcIlNlY3Rpb246XCIsIHNwbGl0WzFdLCBcIkxlbmd0aDpcIiwgc3BsaXRbMV0ubGVuZ3RoLCBcIlRhcmdldDpcIiwgbWlub3IpO1xuICAgIH1cbiAgICBzdHIgPSBzcGxpdC5qb2luKFwiLlwiKTtcbiAgfVxuICByZXR1cm4gc3RyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbk9iamVjdChkYXRhOiBhbnkpOiBhbnkge1xuICBpZiAoIWRhdGEgfHwgdHlwZW9mIGRhdGEgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG4gIGxldCBzdWJEYXRhOiBhbnkgPSB7IC4uLmRhdGEgfTtcbiAgbGV0IGxvb3A6IGJvb2xlYW4gPSB0cnVlO1xuICB3aGlsZSAobG9vcCkge1xuICAgIGxvb3AgPSBmYWxzZTtcbiAgICBjb25zdCBlbnRyaWVzOiBbc3RyaW5nLCBhbnldW10gPSBPYmplY3QuZW50cmllcyhzdWJEYXRhKTtcbiAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcbiAgICAgIGNvbnN0IGtleTogc3RyaW5nID0gZW50cnlbMF07XG4gICAgICBjb25zdCB2YWx1ZTogYW55ID0gZW50cnlbMV07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBkZWxldGUgc3ViRGF0YVtrZXldO1xuICAgICAgICBjb25zdCB2YWx1ZVdpdGhLZXluYW1lczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuICAgICAgICBPYmplY3QuZW50cmllcyh2YWx1ZSkuZm9yRWFjaCgoc3ViRW50cnk6IFtzdHJpbmcsIGFueV0pID0+IHtcbiAgICAgICAgICB2YWx1ZVdpdGhLZXluYW1lc1tgJHtrZXl9LiR7c3ViRW50cnlbMF19YF0gPSBzdWJFbnRyeVsxXTtcbiAgICAgICAgfSk7XG4gICAgICAgIHN1YkRhdGEgPSB7IC4uLnN1YkRhdGEsIC4uLnZhbHVlV2l0aEtleW5hbWVzIH07XG4gICAgICAgIGxvb3AgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3ViRGF0YTtcbn1cbiJdfQ==