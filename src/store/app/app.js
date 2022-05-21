export const appActionTypes = {
    APP_CHANGE_OFFSET: "APP_CHANGE_OFFSET"
}

export const appActions = {
    changeOffset: (offset) => ({
        type: appActionTypes.APP_CHANGE_OFFSET,
        payload: offset
    })
}

const defaultAppState = {
    OFFSET: 0,
}

export const appReducer = (state = defaultAppState, action) => {
    const {type, payload} = action;
    switch (type) {
        case appActionTypes.APP_CHANGE_OFFSET: {
            return {
                ...state,
                OFFSET: payload
            }
        }
        default: return state;
    }

}
