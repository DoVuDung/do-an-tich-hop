export const authReducer = (state, action) => {
    const {
        type,
        payload: { isAuthenticated, user}
    } = action 

    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                loading: false,
                isAuthenticated,
                user,
            }
        default:
            return state
    }
}