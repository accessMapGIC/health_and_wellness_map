export const serviceInitialState = {
    status: "",
    error: "",
    primary_category: [],
    subcategory: [],
    insurance: [],
    service: {},
    listing: {}
}

export const authInitialState = {
    loggedin: false,
    authMessage: '',
    authError: '',
    loggedInUser: {},
    loadingSignIn: false,
    loadingSignUp: false,
    loadingSignOut: false,
};
