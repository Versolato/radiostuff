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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaS1yZXBlYXRlci1zdHJ1Y3R1cmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ludGVyZmFjZXMvaS1yZXBlYXRlci1zdHJ1Y3R1cmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBcUJBLElBQVksV0FLWDtBQUxELFdBQVksV0FBVztJQUNyQiw0QkFBYSxDQUFBO0lBQ2IsZ0NBQWlCLENBQUE7SUFDakIsa0NBQW1CLENBQUE7SUFDbkIsOEJBQWUsQ0FBQTtBQUNqQixDQUFDLEVBTFcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFLdEI7QUFFRCxJQUFZLGNBTVg7QUFORCxXQUFZLGNBQWM7SUFDeEIsa0NBQWdCLENBQUE7SUFDaEIsb0NBQWtCLENBQUE7SUFDbEIscUNBQW1CLENBQUE7SUFDbkIscUNBQW1CLENBQUE7SUFDbkIsaUNBQWUsQ0FBQTtBQUNqQixDQUFDLEVBTlcsY0FBYyxHQUFkLHNCQUFjLEtBQWQsc0JBQWMsUUFNekI7QUFFRCxJQUFZLGtCQUdYO0FBSEQsV0FBWSxrQkFBa0I7SUFDNUIsMENBQW9CLENBQUE7SUFDcEIsa0RBQTRCLENBQUE7QUFDOUIsQ0FBQyxFQUhXLGtCQUFrQixHQUFsQiwwQkFBa0IsS0FBbEIsMEJBQWtCLFFBRzdCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBJU2ltcGxleFJlcGVhdGVySW50ZXJtZWRpYXRlIHtcbiAgQ2FsbHNpZ246IHN0cmluZztcbiAgRnJlcXVlbmN5OiB7IElucHV0OiBudW1iZXI7IE91dHB1dDogbnVtYmVyIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlcGVhdGVyU3RydWN0dXJlZCB7XG4gIElEOiBudW1iZXI7XG4gIFN0YXRlSUQ6IG51bWJlcjtcbiAgQ2FsbHNpZ246IHN0cmluZztcbiAgLy8gTmFtZTogc3RyaW5nO1xuICBMb2NhdGlvbjogeyBMYXRpdHVkZTogbnVtYmVyOyBMb25naXR1ZGU6IG51bWJlcjsgQ291bnR5OiBzdHJpbmc7IFN0YXRlOiBzdHJpbmc7IExvY2FsOiBzdHJpbmcsIERpc3RhbmNlPzogbnVtYmVyIH07XG4gIFVzZTogUmVwZWF0ZXJVc2U7XG4gIFN0YXR1czogUmVwZWF0ZXJTdGF0dXM7XG4gIEZyZXF1ZW5jeTogeyBJbnB1dDogbnVtYmVyOyBPdXRwdXQ6IG51bWJlciB9O1xuICBTcXVlbGNoVG9uZT86IHsgSW5wdXQ/OiBudW1iZXI7IE91dHB1dD86IG51bWJlciB9O1xuICBEaWdpdGFsVG9uZT86IHsgSW5wdXQ/OiBudW1iZXI7IE91dHB1dD86IG51bWJlciB9O1xuICBEaWdpdGFsPzogSVJlcGVhdGVyRGlnaXRhbE1vZGVzO1xuICBWT0lQPzogSVJlcGVhdGVyVk9JUE1vZGVzO1xuICAvLyBDb21tZW50OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBlbnVtIFJlcGVhdGVyVXNlIHtcbiAgT3BlbiA9IFwiT3BlblwiLFxuICBDbG9zZWQgPSBcIkNsb3NlZFwiLFxuICBQcml2YXRlID0gXCJQcml2YXRlXCIsXG4gIE90aGVyID0gXCJPdGhlclwiLFxufVxuXG5leHBvcnQgZW51bSBSZXBlYXRlclN0YXR1cyB7XG4gIE9uQWlyID0gXCJPbi1BaXJcIixcbiAgT2ZmQWlyID0gXCJPZmYtQWlyXCIsXG4gIFRlc3RpbmcgPSBcIlRlc3RpbmdcIixcbiAgVW5rbm93biA9IFwiVW5rbm93blwiLFxuICBPdGhlciA9IFwiT3RoZXJcIixcbn1cblxuZXhwb3J0IGVudW0gRWNob0xpbmtOb2RlU3RhdHVzIHtcbiAgT25JZGxlID0gXCJPTiAtIElETEVcIixcbiAgTm9kZU9mZmxpbmUgPSBcIk5vZGUgT2ZmbGluZVwiLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElSZXBlYXRlckRpZ2l0YWxNb2RlcyB7XG4gIEFUVj86IGJvb2xlYW47XG4gIERNUj86IHsgQ29sb3JDb2RlPzogbnVtYmVyOyBJRD86IG51bWJlciB9O1xuICBQMjU/OiB7IE5BQz86IG51bWJlcjsgfTtcbiAgRFN0YXI/OiB7IE5vZGU/OiBzdHJpbmc7IH07XG4gIFlTRj86IHsgR3JvdXBJRD86IHsgSW5wdXQ/OiBzdHJpbmc7IE91dHB1dD86IHN0cmluZyB9OyB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElSZXBlYXRlclZPSVBNb2RlcyB7XG4gIEFsbFN0YXI/OiB7IE5vZGVJRD86IG51bWJlcjsgfTtcbiAgRWNob0xpbms/OiB7IE5vZGVJRD86IG51bWJlcjsgQ2FsbD86IHN0cmluZzsgU3RhdHVzPzogRWNob0xpbmtOb2RlU3RhdHVzIH07XG4gIElSTFA/OiB7IE5vZGVJRD86IG51bWJlcjsgfTtcbiAgV2lyZXM/OiB7IElEPzogbnVtYmVyOyB9O1xufVxuIl19