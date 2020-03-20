"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const fs_helpers_1 = require("@helpers/fs-helpers");
const numbers_1 = require("@helpers/numbers");
const range2m = [
    // Channels
    { start: 146.4, end: 146.595, steps: [0.015], name: `FM Voice` },
    { start: 147.42, end: 147.585, steps: [0.015], name: `FM Voice` },
    // Range
    { start: 144.9, end: 145.1, steps: [0.015], name: `Weak Signal, FM, Digital/Packet` },
    { start: 145.5, end: 145.8, steps: [0.015], name: `Miscellaneous and Experimental Modes` },
];
const range125m = [
    // Channels
    { start: 223.4, end: 223.52, steps: [0.020], name: `FM Voice` },
    { start: 222.16, end: 222.24, steps: [0.020], name: `Mixed Mode` },
    { start: 223.72, end: 223.84, steps: [0.020], name: `Mixed Mode` },
    // Range
    { start: 223.53, end: 223.63, steps: [0.020], name: `Digital/Packet` },
];
const range70cm = [
    // Channels
    { start: 440.7, end: 441.3, steps: [0.025], name: `Mixed Mode` },
    { start: 445.7, end: 446.275, steps: [0.025], name: `FM Voice` },
    { start: 446.2, end: 446.3, steps: [0.0125], name: `Digital Voice Narrowband` },
    // Range
    { start: 434.5, end: 435, steps: [0.025], name: `Mixed Mode Digital and Voice` },
    { start: 439.5, end: 440, steps: [0.025], name: `Mixed Mode Digital and Voice` },
];
let frequencies = [];
const existingFrequencies = {};
const points = 5;
[...range2m, ...range125m, ...range70cm].forEach((range) => {
    range.steps.forEach((s) => {
        const step = numbers_1.powAndFix(s, points);
        const start = numbers_1.powAndFix(range.start, points);
        const end = numbers_1.powAndFix(range.end, points) + step;
        for (let i = start; i < end; i += step) {
            const frequency = numbers_1.powAndFix(i, -points, points);
            const definition = { Frequency: frequency, Name: range.name };
            if (!existingFrequencies[frequency]) {
                frequencies.push(definition);
                existingFrequencies[frequency] = true;
                console.log("step", step, "start", start, "end", end, "i", i, "frequency", frequency);
            }
        }
    });
});
frequencies = frequencies.sort((a, b) => (a.Frequency || 0) - (b.Frequency || 0));
fs_helpers_1.writeFileAsync(`../data/frequencies.json`, JSON.stringify(frequencies, null, 2))
    // tslint:disable-next-line:no-empty
    .then((r) => {
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtZnJlcXVlbmNpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZ2VuZXJhdGUtZnJlcXVlbmNpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBK0I7QUFFL0Isb0RBQXFEO0FBQ3JELDhDQUE2QztBQUc3QyxNQUFNLE9BQU8sR0FBc0I7SUFDakMsV0FBVztJQUNYLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7SUFDaEUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtJQUVqRSxRQUFRO0lBQ1IsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLGlDQUFpQyxFQUFFO0lBQ3JGLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxzQ0FBc0MsRUFBRTtDQUMzRixDQUFDO0FBRUYsTUFBTSxTQUFTLEdBQXNCO0lBQ25DLFdBQVc7SUFDWCxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0lBQy9ELEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUU7SUFDbEUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTtJQUVsRSxRQUFRO0lBQ1IsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFO0NBQ3ZFLENBQUM7QUFFRixNQUFNLFNBQVMsR0FBc0I7SUFDbkMsV0FBVztJQUNYLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUU7SUFDaEUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtJQUNoRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUU7SUFFL0UsUUFBUTtJQUNSLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSw4QkFBOEIsRUFBRTtJQUNoRixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsOEJBQThCLEVBQUU7Q0FDakYsQ0FBQztBQU9GLElBQUksV0FBVyxHQUF1QixFQUFFLENBQUM7QUFDekMsTUFBTSxtQkFBbUIsR0FBK0IsRUFBRSxDQUFDO0FBRTNELE1BQU0sTUFBTSxHQUFXLENBQUMsQ0FBQztBQUV6QixDQUFDLEdBQUcsT0FBTyxFQUFFLEdBQUcsU0FBUyxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBc0IsRUFBRSxFQUFFO0lBQzFFLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUU7UUFDaEMsTUFBTSxJQUFJLEdBQVcsbUJBQVMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUMsTUFBTSxLQUFLLEdBQVcsbUJBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELE1BQU0sR0FBRyxHQUFXLG1CQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDeEQsS0FBSyxJQUFJLENBQUMsR0FBVyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQzlDLE1BQU0sU0FBUyxHQUFXLG1CQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3hELE1BQU0sVUFBVSxHQUFxQixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoRixJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzdCLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN2RjtTQUNGO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUNILFdBQVcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUM1QixDQUFDLENBQW1CLEVBQUUsQ0FBbUIsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pGLDJCQUFjLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlFLG9DQUFvQztLQUNuQyxJQUFJLENBQUMsQ0FBQyxDQUFVLEVBQUUsRUFBRTtBQUNyQixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIm1vZHVsZS1hbGlhcy9yZWdpc3RlclwiO1xuXG5pbXBvcnQgeyB3cml0ZUZpbGVBc3luYyB9IGZyb20gXCJAaGVscGVycy9mcy1oZWxwZXJzXCI7XG5pbXBvcnQgeyBwb3dBbmRGaXggfSBmcm9tIFwiQGhlbHBlcnMvbnVtYmVyc1wiO1xuaW1wb3J0IHsgSUlucHV0RnJlcXVlbmN5IH0gZnJvbSBcIkBpbnRlcmZhY2VzL2ktaW5wdXQtZnJlcXVlbmN5XCI7XG5cbmNvbnN0IHJhbmdlMm06IElJbnB1dEZyZXF1ZW5jeVtdID0gW1xuICAvLyBDaGFubmVsc1xuICB7IHN0YXJ0OiAxNDYuNCwgZW5kOiAxNDYuNTk1LCBzdGVwczogWzAuMDE1XSwgbmFtZTogYEZNIFZvaWNlYCB9LFxuICB7IHN0YXJ0OiAxNDcuNDIsIGVuZDogMTQ3LjU4NSwgc3RlcHM6IFswLjAxNV0sIG5hbWU6IGBGTSBWb2ljZWAgfSxcblxuICAvLyBSYW5nZVxuICB7IHN0YXJ0OiAxNDQuOSwgZW5kOiAxNDUuMSwgc3RlcHM6IFswLjAxNV0sIG5hbWU6IGBXZWFrIFNpZ25hbCwgRk0sIERpZ2l0YWwvUGFja2V0YCB9LFxuICB7IHN0YXJ0OiAxNDUuNSwgZW5kOiAxNDUuOCwgc3RlcHM6IFswLjAxNV0sIG5hbWU6IGBNaXNjZWxsYW5lb3VzIGFuZCBFeHBlcmltZW50YWwgTW9kZXNgIH0sXG5dO1xuXG5jb25zdCByYW5nZTEyNW06IElJbnB1dEZyZXF1ZW5jeVtdID0gW1xuICAvLyBDaGFubmVsc1xuICB7IHN0YXJ0OiAyMjMuNCwgZW5kOiAyMjMuNTIsIHN0ZXBzOiBbMC4wMjBdLCBuYW1lOiBgRk0gVm9pY2VgIH0sXG4gIHsgc3RhcnQ6IDIyMi4xNiwgZW5kOiAyMjIuMjQsIHN0ZXBzOiBbMC4wMjBdLCBuYW1lOiBgTWl4ZWQgTW9kZWAgfSxcbiAgeyBzdGFydDogMjIzLjcyLCBlbmQ6IDIyMy44NCwgc3RlcHM6IFswLjAyMF0sIG5hbWU6IGBNaXhlZCBNb2RlYCB9LFxuXG4gIC8vIFJhbmdlXG4gIHsgc3RhcnQ6IDIyMy41MywgZW5kOiAyMjMuNjMsIHN0ZXBzOiBbMC4wMjBdLCBuYW1lOiBgRGlnaXRhbC9QYWNrZXRgIH0sXG5dO1xuXG5jb25zdCByYW5nZTcwY206IElJbnB1dEZyZXF1ZW5jeVtdID0gW1xuICAvLyBDaGFubmVsc1xuICB7IHN0YXJ0OiA0NDAuNywgZW5kOiA0NDEuMywgc3RlcHM6IFswLjAyNV0sIG5hbWU6IGBNaXhlZCBNb2RlYCB9LFxuICB7IHN0YXJ0OiA0NDUuNywgZW5kOiA0NDYuMjc1LCBzdGVwczogWzAuMDI1XSwgbmFtZTogYEZNIFZvaWNlYCB9LFxuICB7IHN0YXJ0OiA0NDYuMiwgZW5kOiA0NDYuMywgc3RlcHM6IFswLjAxMjVdLCBuYW1lOiBgRGlnaXRhbCBWb2ljZSBOYXJyb3diYW5kYCB9LFxuXG4gIC8vIFJhbmdlXG4gIHsgc3RhcnQ6IDQzNC41LCBlbmQ6IDQzNSwgc3RlcHM6IFswLjAyNV0sIG5hbWU6IGBNaXhlZCBNb2RlIERpZ2l0YWwgYW5kIFZvaWNlYCB9LFxuICB7IHN0YXJ0OiA0MzkuNSwgZW5kOiA0NDAsIHN0ZXBzOiBbMC4wMjVdLCBuYW1lOiBgTWl4ZWQgTW9kZSBEaWdpdGFsIGFuZCBWb2ljZWAgfSxcbl07XG5cbmludGVyZmFjZSBJT3V0cHV0RnJlcXVlbmN5IHtcbiAgRnJlcXVlbmN5OiBudW1iZXI7XG4gIE5hbWU6IHN0cmluZztcbn1cblxubGV0IGZyZXF1ZW5jaWVzOiBJT3V0cHV0RnJlcXVlbmN5W10gPSBbXTtcbmNvbnN0IGV4aXN0aW5nRnJlcXVlbmNpZXM6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG5cbmNvbnN0IHBvaW50czogbnVtYmVyID0gNTtcblxuWy4uLnJhbmdlMm0sIC4uLnJhbmdlMTI1bSwgLi4ucmFuZ2U3MGNtXS5mb3JFYWNoKChyYW5nZTogSUlucHV0RnJlcXVlbmN5KSA9PiB7XG4gIHJhbmdlLnN0ZXBzLmZvckVhY2goKHM6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IHN0ZXA6IG51bWJlciA9IHBvd0FuZEZpeChzLCBwb2ludHMpO1xuICAgIGNvbnN0IHN0YXJ0OiBudW1iZXIgPSBwb3dBbmRGaXgocmFuZ2Uuc3RhcnQsIHBvaW50cyk7XG4gICAgY29uc3QgZW5kOiBudW1iZXIgPSBwb3dBbmRGaXgocmFuZ2UuZW5kLCBwb2ludHMpICsgc3RlcDtcbiAgICBmb3IgKGxldCBpOiBudW1iZXIgPSBzdGFydDsgaSA8IGVuZDsgaSArPSBzdGVwKSB7XG4gICAgICBjb25zdCBmcmVxdWVuY3k6IG51bWJlciA9IHBvd0FuZEZpeChpLCAtcG9pbnRzLCBwb2ludHMpO1xuICAgICAgY29uc3QgZGVmaW5pdGlvbjogSU91dHB1dEZyZXF1ZW5jeSA9IHsgRnJlcXVlbmN5OiBmcmVxdWVuY3ksIE5hbWU6IHJhbmdlLm5hbWUgfTtcbiAgICAgIGlmICghZXhpc3RpbmdGcmVxdWVuY2llc1tmcmVxdWVuY3ldKSB7XG4gICAgICAgIGZyZXF1ZW5jaWVzLnB1c2goZGVmaW5pdGlvbik7XG4gICAgICAgIGV4aXN0aW5nRnJlcXVlbmNpZXNbZnJlcXVlbmN5XSA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RlcFwiLCBzdGVwLCBcInN0YXJ0XCIsIHN0YXJ0LCBcImVuZFwiLCBlbmQsIFwiaVwiLCBpLCBcImZyZXF1ZW5jeVwiLCBmcmVxdWVuY3kpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KTtcbmZyZXF1ZW5jaWVzID0gZnJlcXVlbmNpZXMuc29ydChcbiAgKGE6IElPdXRwdXRGcmVxdWVuY3ksIGI6IElPdXRwdXRGcmVxdWVuY3kpID0+IChhLkZyZXF1ZW5jeSB8fCAwKSAtIChiLkZyZXF1ZW5jeSB8fCAwKSk7XG53cml0ZUZpbGVBc3luYyhgLi4vZGF0YS9mcmVxdWVuY2llcy5qc29uYCwgSlNPTi5zdHJpbmdpZnkoZnJlcXVlbmNpZXMsIG51bGwsIDIpKVxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcbiAgLnRoZW4oKHI6IHVua25vd24pID0+IHtcbiAgfSk7XG4iXX0=