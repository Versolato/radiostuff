"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const fs_helpers_1 = require("@helpers/fs-helpers");
const log_helpers_1 = require("@helpers/log-helpers");
const i_repeater_structured_1 = require("@interfaces/i-repeater-structured");
const log = log_helpers_1.createLog("Convert Repeaters");
exports.default = (async () => {
    const raw = await fs_helpers_1.getAllFilesFromDirectory("../data/repeaters/results/CO");
    log("Got", raw.length, "files");
    const ids = [];
    const converted = raw
        .reduce((output, input, index) => {
        log("Got", input.length, "repeaters from file", index + 1);
        return [...output, ...input.map(convertRepeater)];
    }, [])
        .filter((repeater) => {
        if (ids.includes(repeater.ID)) {
            return false;
        }
        else {
            ids.push(repeater.ID);
            return true;
        }
    });
    log("Converted", converted.length, "repeaters");
    await fs_helpers_1.writeToJsonAndCsv("../data/repeaters/converted/CO", converted);
})();
function convertRepeater(raw) {
    return {
        ID: convertNumber(raw.ID),
        StateID: convertNumber(raw.state_id),
        Callsign: raw.Call,
        Location: {
            Latitude: raw.Latitude,
            Longitude: raw.Longitude,
            County: raw.County,
            State: raw["ST/PR"],
            Local: raw.Location,
        },
        Use: convertRepeaterUse(raw.Use),
        Status: convertRepeaterStatus(raw["Op Status"]),
        Frequency: { Input: convertNumber(raw.Uplink) || (raw.Downlink + raw.Offset), Output: raw.Downlink },
        SquelchTone: convertRepeaterSquelchTone(raw["Uplink Tone"] || raw.Tone, raw["Downlink Tone"]),
        DigitalTone: convertRepeaterDigitalTone(raw["Uplink Tone"] || raw.Tone, raw["Downlink Tone"]),
        Digital: convertRepeaterDigitalData(raw),
        VOIP: convertRepeaterVOIP(raw),
    };
}
function convertRepeaterUse(raw) {
    switch (raw.toLowerCase()) {
        case "open":
            return i_repeater_structured_1.RepeaterUse.Open;
        case "closed":
            return i_repeater_structured_1.RepeaterUse.Closed;
        case "private":
            return i_repeater_structured_1.RepeaterUse.Private;
        default:
            return i_repeater_structured_1.RepeaterUse.Other;
    }
}
function convertRepeaterStatus(raw) {
    if (!raw) {
        return i_repeater_structured_1.RepeaterStatus.Other;
    }
    switch (raw.toLowerCase()) {
        case "on-air":
            return i_repeater_structured_1.RepeaterStatus.OnAir;
        case "off-air":
            return i_repeater_structured_1.RepeaterStatus.OffAir;
        case "testing":
            return i_repeater_structured_1.RepeaterStatus.Testing;
        case "unknown":
            return i_repeater_structured_1.RepeaterStatus.Unknown;
        default:
            return i_repeater_structured_1.RepeaterStatus.Other;
    }
}
function convertRepeaterSquelchTone(rawInput, rawOutput) {
    if (!rawInput && !rawOutput) {
        return undefined;
    }
    const converted = {
        Input: convertNumber(rawInput),
        Output: convertNumber(rawOutput),
    };
    if (converted.Input || converted.Output) {
        return converted;
    }
    return undefined;
}
function convertRepeaterDigitalTone(rawInput, rawOutput) {
    if (!rawInput && !rawOutput) {
        return undefined;
    }
    const digitalFilter = /^D(\d+)$/;
    const converted = {
        Input: typeof rawInput === "string" ? convertNumber(rawInput, digitalFilter) : undefined,
        Output: typeof rawOutput === "string" ? convertNumber(rawOutput, digitalFilter) : undefined,
    };
    if (converted.Input || converted.Output) {
        return converted;
    }
    return undefined;
}
function convertNumber(input, numberFilter = /^([+-]?\d+\.?\d*)$/) {
    if (typeof input === "number" && !isNaN(input)) {
        return input;
    }
    else if (typeof input === "number" && isNaN(input)) {
        return undefined;
    }
    else if (typeof input === "string" && numberFilter.test(input)) {
        const match = input.match(numberFilter);
        if (match && match[1]) {
            const converted = parseFloat(match[1]);
            return !isNaN(converted) ? converted : undefined;
        }
    }
}
function convertRepeaterDigitalData(raw) {
    const converted = {
        // TODO: ATV?: boolean;
        DMR: (raw.DGTL.includes("D") || raw["DMR Enabled"]) ? {
            ColorCode: convertNumber(raw["Color Code"]),
            ID: convertNumber(raw["DMR ID"]),
        } : undefined,
        P25: (raw.DGTL.includes("P") || raw["P-25 Digital Enabled"]) ? { NAC: convertNumber(raw.NAC) } : undefined,
        DStar: (raw.DGTL.includes("S") || raw["D-STAR Enabled"]) ? { Node: raw.Node } : undefined,
        YSF: (raw.DGTL.includes("Y") || raw["YSF Digital Enabled"]) ? {
            GroupID: {
                Input: typeof raw["DG-ID"] === "number" ? raw["DG-ID"] : typeof raw["DG-ID"] === "string" ? raw["DG-ID"].split("/")[0].trim() : undefined,
                Output: typeof raw["DG-ID"] === "number" ? raw["DG-ID"] : typeof raw["DG-ID"] === "string" ? raw["DG-ID"].split("/")[1].trim() : undefined,
            },
        } : undefined,
    };
    if (converted.DMR || converted.P25 || converted.DStar || converted.YSF) {
        return converted;
    }
}
function convertRepeaterVOIP(raw) {
    const converted = {
        AllStar: (raw.VOIP.includes("A") || raw.AllStar) ? { NodeID: convertNumber(raw.AllStar) } : undefined,
        EchoLink: (raw.VOIP.includes("E") || raw.EchoLink) ? {
            NodeID: raw.EchoLink,
        } : undefined,
        IRLP: (raw.VOIP.includes("I") || raw.IRLP) ? { NodeID: convertNumber(raw.IRLP) } : undefined,
        Wires: (raw.VOIP.includes("W") || raw["WIRES-X"]) ? { ID: convertNumber(raw["WIRES-X"]) } : undefined,
    };
    if (converted.AllStar || converted.EchoLink || converted.IRLP || converted.Wires) {
        return converted;
    }
}
