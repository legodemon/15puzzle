import {BACKWARD, LOCALSTORAGE_PREFIX, MOVE, SHUFFLE} from "../const/const";

const initialState = {
    step: 0,
    fields: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, false],
    ]
};

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getUnique = (usedItems, random) => {
    let value = random(1, 15);

    if (usedItems.length === 15) {
        value = false
    } else {
        while (usedItems.indexOf(value) !== -1)
            value = random(1, 15);
    }
    return value
};
const shuffle = (getUnique, random) => {
    const state = [],
        usedItems = [];

    for (let i = 0; i <= 3; i++) {
        const row = [];
        for (let j = 0; j <= 3; j++) {
            const item = getUnique(usedItems, random);
            row.push(item);
            usedItems.push(item);
        }
        state.push(row)
    }

    return state;
};

const getPosition = (state, item) => {
    let pointerI, pointerJ;
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            if (state[i][j] === item) {
                pointerI = i;
                pointerJ = j;
                break;
            }
        }
        if (pointerI) break;
    }
    return [pointerI, pointerJ]
};
const move = (getPosition, state, item) => {
    const oldPosition = getPosition(state, item),
        newPosition = getPosition(state, false);

    if (Math.abs(oldPosition[0] - newPosition[0]) === 1 && Math.abs(oldPosition[1] - newPosition[1]) === 0) {
        let swap = state[oldPosition[0]][oldPosition[1]];
        state[oldPosition[0]][oldPosition[1]] = state[newPosition[0]][newPosition[1]];
        state[newPosition[0]][newPosition[1]] = swap;
        return state.slice()
    }

    if (Math.abs(oldPosition[0] - newPosition[0]) === 0 && Math.abs(oldPosition[1] - newPosition[1]) === 1) {

        let swap = state[oldPosition[0]][oldPosition[1]];
        state[oldPosition[0]][oldPosition[1]] = state[newPosition[0]][newPosition[1]];
        state[newPosition[0]][newPosition[1]] = swap;

        return state.slice()
    }

    return state
};

export default function state(state = initialState, action) {
    switch (action.type) {
        case MOVE:
            return { ...state, step: ++state.step, fields: move(getPosition, state.fields, action.payload)};
        case SHUFFLE:
            return { ...state, step: 0, fields: shuffle(getUnique, random)};
        case BACKWARD:
            let step = state.step, prevStep = step - 1;
            if(step){
                localStorage.removeItem(`${LOCALSTORAGE_PREFIX}${step}`);
                return { ...state, step: prevStep, fields: JSON.parse(localStorage.getItem(`${LOCALSTORAGE_PREFIX}${prevStep}`))};
            }
            return state;

        default:
            return state;
    }

}