from helpers import numbers

frequencies = []
range2m = [
    {'start': 146.4, 'end': 146.595, 'steps': [0.015], 'name': 'FM Voice'},
    {'start': 147.42, 'end': 147.585, 'steps': [0.015], 'name': 'FM Voice'},
    {'start': 144.9, 'end': 145.1, 'steps': [0.015], 'name': 'Weak Signal, FM, Digital/Packet'},
    {'start': 145.5, 'end': 145.8, 'steps': [0.015], 'name': 'Miscellaneous and Experimental Modes'},
]
range125m = [
    # Channels
    {'start': 223.4, 'end': 223.52, 'steps': [0.020], 'name': 'FM Voice'},
    {'start': 222.16, 'end': 222.24, 'steps': [0.020], 'name': 'Mixed Mode'},
    {'start': 223.72, 'end': 223.84, 'steps': [0.020], 'name': 'Mixed Mode'},

    # Range
    {'start': 223.53, 'end': 223.63, 'steps': [0.020], 'name': 'Digital / Packet'},
]
range70cm = [
    # Channels
    {'start': 440.7, 'end': 441.3, 'steps': [0.025], 'name': 'Mixed Mode'},
    {'start': 445.7, 'end': 446.275, 'steps': [0.025], 'name': 'FM Voice'},
    {'start': 446.2, 'end': 446.3, 'steps': [0.0125], 'name': 'Digital Voice Narrowband'},

    # Range
    {'start': 434.5, 'end': 435, 'steps': [0.025], 'name': 'Mixed Mode Digital and Voice'},
    {'start': 439.5, 'end': 440, 'steps': [0.025], 'name': 'Mixed Mode Digital and Voice'},
]
points = 4

for rng in (range2m+range125m+range70cm):
    steps = rng.get('steps')
    for s in steps:
        step = int(numbers.pow_and_fix(s, points))
        start = int(numbers.pow_and_fix(rng.get('start'), points))
        end = int(numbers.pow_and_fix(rng.get('end'), points) + step)
        # print('step', s, step, rng.get('start'), start, rng.get('end'), end)
        for i in range(start, end, step):
            frequency = numbers.pow_and_fix(i, -4, 4)
            print('result', i, frequency)
