"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTextOrNumber(el) {
    const value = getText(el);
    const num = getNumber(value);
    return !isNaN(num) ? num : value;
}
exports.getTextOrNumber = getTextOrNumber;
function getNumber(text, reg = /^([\-+]?\d+\.?\d*)$/) {
    let result = NaN;
    if (text && text.match) {
        const match = text.match(reg);
        // console.log("match", match);
        if (match) {
            result = parseFloat(match[1]);
        }
    }
    return result;
}
exports.getNumber = getNumber;
function getText(el) {
    if (el) {
        let text = el.innerHTML;
        if (text) {
            text = text.replace(/<script>.*<\/script>/g, " ");
            text = text.replace(/<[^>]*>/g, " ");
            return text.trim();
        }
    }
    return "";
}
exports.getText = getText;
function mapDir(dir) {
    switch (dir) {
        case "N":
            return 1;
        case "NE":
            return 2;
        case "E":
            return 3;
        case "SE":
            return 4;
        case "S":
            return 5;
        case "SW":
            return 6;
        case "W":
            return 7;
        case "NW":
            return 8;
    }
    return 0;
}
exports.mapDir = mapDir;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZHVsZXMvaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsU0FBZ0IsZUFBZSxDQUFDLEVBQVc7SUFDekMsTUFBTSxLQUFLLEdBQVcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLE1BQU0sR0FBRyxHQUFXLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUNuQyxDQUFDO0FBSkQsMENBSUM7QUFFRCxTQUFnQixTQUFTLENBQUMsSUFBWSxFQUFFLE1BQWMscUJBQXFCO0lBQ3pFLElBQUksTUFBTSxHQUFXLEdBQUcsQ0FBQztJQUN6QixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ3RCLE1BQU0sS0FBSyxHQUE0QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELCtCQUErQjtRQUMvQixJQUFJLEtBQUssRUFBRTtZQUNULE1BQU0sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0I7S0FDRjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFWRCw4QkFVQztBQUVELFNBQWdCLE9BQU8sQ0FBQyxFQUFXO0lBQ2pDLElBQUksRUFBRSxFQUFFO1FBQ04sSUFBSSxJQUFJLEdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxJQUFJLElBQUksRUFBRTtZQUNSLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2xELElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNyQyxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNwQjtLQUNGO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDO0FBVkQsMEJBVUM7QUFFRCxTQUFnQixNQUFNLENBQUMsR0FBVztJQUNoQyxRQUFRLEdBQUcsRUFBRTtRQUNYLEtBQUssR0FBRztZQUNOLE9BQU8sQ0FBQyxDQUFDO1FBQ1gsS0FBSyxJQUFJO1lBQ1AsT0FBTyxDQUFDLENBQUM7UUFDWCxLQUFLLEdBQUc7WUFDTixPQUFPLENBQUMsQ0FBQztRQUNYLEtBQUssSUFBSTtZQUNQLE9BQU8sQ0FBQyxDQUFDO1FBQ1gsS0FBSyxHQUFHO1lBQ04sT0FBTyxDQUFDLENBQUM7UUFDWCxLQUFLLElBQUk7WUFDUCxPQUFPLENBQUMsQ0FBQztRQUNYLEtBQUssR0FBRztZQUNOLE9BQU8sQ0FBQyxDQUFDO1FBQ1gsS0FBSyxJQUFJO1lBQ1AsT0FBTyxDQUFDLENBQUM7S0FDWjtJQUNELE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQXBCRCx3QkFvQkMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0VGV4dE9yTnVtYmVyKGVsOiBFbGVtZW50KTogbnVtYmVyIHwgc3RyaW5nIHtcbiAgY29uc3QgdmFsdWU6IHN0cmluZyA9IGdldFRleHQoZWwpO1xuICBjb25zdCBudW06IG51bWJlciA9IGdldE51bWJlcih2YWx1ZSk7XG4gIHJldHVybiAhaXNOYU4obnVtKSA/IG51bSA6IHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TnVtYmVyKHRleHQ6IHN0cmluZywgcmVnOiBSZWdFeHAgPSAvXihbXFwtK10/XFxkK1xcLj9cXGQqKSQvKTogbnVtYmVyIHtcbiAgbGV0IHJlc3VsdDogbnVtYmVyID0gTmFOO1xuICBpZiAodGV4dCAmJiB0ZXh0Lm1hdGNoKSB7XG4gICAgY29uc3QgbWF0Y2g6IFJlZ0V4cE1hdGNoQXJyYXkgfCBudWxsID0gdGV4dC5tYXRjaChyZWcpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwibWF0Y2hcIiwgbWF0Y2gpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgcmVzdWx0ID0gcGFyc2VGbG9hdChtYXRjaFsxXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUZXh0KGVsOiBFbGVtZW50KTogc3RyaW5nIHtcbiAgaWYgKGVsKSB7XG4gICAgbGV0IHRleHQ6IHN0cmluZyA9IGVsLmlubmVySFRNTDtcbiAgICBpZiAodGV4dCkge1xuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvPHNjcmlwdD4uKjxcXC9zY3JpcHQ+L2csIFwiIFwiKTtcbiAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoLzxbXj5dKj4vZywgXCIgXCIpO1xuICAgICAgcmV0dXJuIHRleHQudHJpbSgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gXCJcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcERpcihkaXI6IHN0cmluZyk6IG51bWJlciB7XG4gIHN3aXRjaCAoZGlyKSB7XG4gICAgY2FzZSBcIk5cIjpcbiAgICAgIHJldHVybiAxO1xuICAgIGNhc2UgXCJORVwiOlxuICAgICAgcmV0dXJuIDI7XG4gICAgY2FzZSBcIkVcIjpcbiAgICAgIHJldHVybiAzO1xuICAgIGNhc2UgXCJTRVwiOlxuICAgICAgcmV0dXJuIDQ7XG4gICAgY2FzZSBcIlNcIjpcbiAgICAgIHJldHVybiA1O1xuICAgIGNhc2UgXCJTV1wiOlxuICAgICAgcmV0dXJuIDY7XG4gICAgY2FzZSBcIldcIjpcbiAgICAgIHJldHVybiA3O1xuICAgIGNhc2UgXCJOV1wiOlxuICAgICAgcmV0dXJuIDg7XG4gIH1cbiAgcmV0dXJuIDA7XG59XG4iXX0=