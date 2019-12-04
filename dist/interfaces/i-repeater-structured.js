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
    var RepeaterUse;
    (function (RepeaterUse) {
        RepeaterUse["Open"] = "Open";
        RepeaterUse["Closed"] = "Closed";
        RepeaterUse["Private"] = "Private";
        RepeaterUse["Other"] = "Other";
    })(RepeaterUse = exports.RepeaterUse || (exports.RepeaterUse = {}));
    var RepeaterStatus;
    (function (RepeaterStatus) {
        RepeaterStatus["OnAir"] = "On-Air";
        RepeaterStatus["OffAir"] = "Off-Air";
        RepeaterStatus["Testing"] = "Testing";
        RepeaterStatus["Unknown"] = "Unknown";
        RepeaterStatus["Other"] = "Other";
    })(RepeaterStatus = exports.RepeaterStatus || (exports.RepeaterStatus = {}));
    var EchoLinkNodeStatus;
    (function (EchoLinkNodeStatus) {
        EchoLinkNodeStatus["OnIdle"] = "ON - IDLE";
        EchoLinkNodeStatus["NodeOffline"] = "Node Offline";
    })(EchoLinkNodeStatus = exports.EchoLinkNodeStatus || (exports.EchoLinkNodeStatus = {}));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaS1yZXBlYXRlci1zdHJ1Y3R1cmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ludGVyZmFjZXMvaS1yZXBlYXRlci1zdHJ1Y3R1cmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBZ0JBLElBQVksV0FLWDtJQUxELFdBQVksV0FBVztRQUNyQiw0QkFBYSxDQUFBO1FBQ2IsZ0NBQWlCLENBQUE7UUFDakIsa0NBQW1CLENBQUE7UUFDbkIsOEJBQWUsQ0FBQTtJQUNqQixDQUFDLEVBTFcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFLdEI7SUFFRCxJQUFZLGNBTVg7SUFORCxXQUFZLGNBQWM7UUFDeEIsa0NBQWdCLENBQUE7UUFDaEIsb0NBQWtCLENBQUE7UUFDbEIscUNBQW1CLENBQUE7UUFDbkIscUNBQW1CLENBQUE7UUFDbkIsaUNBQWUsQ0FBQTtJQUNqQixDQUFDLEVBTlcsY0FBYyxHQUFkLHNCQUFjLEtBQWQsc0JBQWMsUUFNekI7SUFFRCxJQUFZLGtCQUdYO0lBSEQsV0FBWSxrQkFBa0I7UUFDNUIsMENBQW9CLENBQUE7UUFDcEIsa0RBQTRCLENBQUE7SUFDOUIsQ0FBQyxFQUhXLGtCQUFrQixHQUFsQiwwQkFBa0IsS0FBbEIsMEJBQWtCLFFBRzdCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBJUmVwZWF0ZXJTdHJ1Y3R1cmVkIHtcclxuICBJRDogbnVtYmVyO1xyXG4gIFN0YXRlSUQ6IG51bWJlcjtcclxuICBDYWxsc2lnbjogc3RyaW5nO1xyXG4gIC8vIE5hbWU6IHN0cmluZztcclxuICBMb2NhdGlvbjogeyBMYXRpdHVkZTogbnVtYmVyOyBMb25naXR1ZGU6IG51bWJlcjsgQ291bnR5OiBzdHJpbmc7IFN0YXRlOiBzdHJpbmc7IExvY2FsOiBzdHJpbmcsIERpc3RhbmNlPzogbnVtYmVyIH07XHJcbiAgVXNlOiBSZXBlYXRlclVzZTtcclxuICBTdGF0dXM6IFJlcGVhdGVyU3RhdHVzO1xyXG4gIEZyZXF1ZW5jeTogeyBJbnB1dDogbnVtYmVyOyBPdXRwdXQ6IG51bWJlciB9O1xyXG4gIFNxdWVsY2hUb25lPzogeyBJbnB1dD86IG51bWJlcjsgT3V0cHV0PzogbnVtYmVyIH07XHJcbiAgRGlnaXRhbFRvbmU/OiB7IElucHV0PzogbnVtYmVyOyBPdXRwdXQ/OiBudW1iZXIgfTtcclxuICBEaWdpdGFsPzogSVJlcGVhdGVyRGlnaXRhbE1vZGVzO1xyXG4gIFZPSVA/OiBJUmVwZWF0ZXJWT0lQTW9kZXM7XHJcbiAgLy8gQ29tbWVudDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBSZXBlYXRlclVzZSB7XHJcbiAgT3BlbiA9ICdPcGVuJyxcclxuICBDbG9zZWQgPSAnQ2xvc2VkJyxcclxuICBQcml2YXRlID0gJ1ByaXZhdGUnLFxyXG4gIE90aGVyID0gJ090aGVyJyxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gUmVwZWF0ZXJTdGF0dXMge1xyXG4gIE9uQWlyID0gJ09uLUFpcicsXHJcbiAgT2ZmQWlyID0gJ09mZi1BaXInLFxyXG4gIFRlc3RpbmcgPSAnVGVzdGluZycsXHJcbiAgVW5rbm93biA9ICdVbmtub3duJyxcclxuICBPdGhlciA9ICdPdGhlcicsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEVjaG9MaW5rTm9kZVN0YXR1cyB7XHJcbiAgT25JZGxlID0gJ09OIC0gSURMRScsXHJcbiAgTm9kZU9mZmxpbmUgPSAnTm9kZSBPZmZsaW5lJyxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVwZWF0ZXJEaWdpdGFsTW9kZXMge1xyXG4gIEFUVj86IGJvb2xlYW47XHJcbiAgRE1SPzogeyBDb2xvckNvZGU/OiBudW1iZXI7IElEPzogbnVtYmVyIH07XHJcbiAgUDI1PzogeyBOQUM/OiBudW1iZXI7IH07XHJcbiAgRFN0YXI/OiB7IE5vZGU/OiBzdHJpbmc7IH07XHJcbiAgWVNGPzogeyBHcm91cElEPzogeyBJbnB1dD86IHN0cmluZzsgT3V0cHV0Pzogc3RyaW5nIH07IH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlcGVhdGVyVk9JUE1vZGVzIHtcclxuICBBbGxTdGFyPzogeyBOb2RlSUQ/OiBudW1iZXI7IH07XHJcbiAgRWNob0xpbms/OiB7IE5vZGVJRD86IG51bWJlcjsgQ2FsbD86IHN0cmluZzsgU3RhdHVzPzogRWNob0xpbmtOb2RlU3RhdHVzIH07XHJcbiAgSVJMUD86IHsgTm9kZUlEPzogbnVtYmVyOyB9O1xyXG4gIFdpcmVzPzogeyBJRD86IG51bWJlcjsgfTtcclxufVxyXG4iXX0=