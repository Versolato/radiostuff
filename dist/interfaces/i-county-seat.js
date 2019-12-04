(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaS1jb3VudHktc2VhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlcmZhY2VzL2ktY291bnR5LXNlYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgSUNvdW50eVNlYXQge1xyXG4gIENvdW50eTogc3RyaW5nO1xyXG4gICdGSVBTIENvZGUnOiBzdHJpbmc7XHJcbiAgJ0ZJUFMgU3RhdGUgYW5kIENvdW50eSBDb2RlJzogc3RyaW5nO1xyXG4gICdDb3VudHkgU2VhdCc6IHN0cmluZztcclxuICBFc3RhYmxpc2hlZDogc3RyaW5nO1xyXG4gIExvY2F0aW9uOiBzdHJpbmc7XHJcbn1cclxuIl19