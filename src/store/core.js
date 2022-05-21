/**
 * @param {any} initialValue
 * */
export function Observer(initialValue) {
    this.value = initialValue;
    this.subscriptions = [];
}

Observer.prototype = {
    subscribe(fn) {
        this.subscriptions.push(fn);
    },
    next(newValue) {
        this.value = newValue;
        this.subscriptions.forEach((fn) => {
            fn(newValue);
        })
    },
    unsubscribe(fn) {
        if (typeof fn !== 'function') return;

        const index = this.subscriptions.indexOf(fn);

        if (index < 0) return;

        this.subscriptions.splice(index, 1);
    }
}

export function Store(reducer) {
    if (typeof reducer !== "function") throw new Error('Reducer MUST be a function!');

    this.value = undefined;
    this.reducer = reducer;
    this.subscriptions = [];
    this.init()
}

Store.prototype = Object.create(Observer.prototype)

Store.prototype.defaultActions = {
    init: {type: 'INIT'}
}

Store.prototype.init = function () {
    this.dispatch(this.defaultActions.init)
}

Store.prototype.dispatch = function (action) {
    if (typeof action === 'function') {
        action(this.dispatch.bind(this))
        return;
    }
    const nextState = this.reducer(this.value, action);
    this.next(nextState);
}

Store.prototype.getState = function () {
    return this.value;
}

Store.prototype.clear = function () {
    this.value = undefined
    this.dispatch(this.defaultActions.init)
}

/**
 * {
    <reducerName>: Reducer
 * }
 * */
export function combineReducer(reducerMap) {
    const entries = Object.entries(reducerMap)

    return function (state = {}, action) {
        return entries.reduce((acc, [reducerName, reducer]) => {
            acc[reducerName] = reducer(state[reducerName], action)
            return acc
        }, {})
    }
}
