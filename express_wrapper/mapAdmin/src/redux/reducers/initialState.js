export const serviceInitialState = {
    status: "",
    error: "",
    primary_category: [],
    subcategory: [],
    insurance: [],
    service: {},
    listing: {},
    newEdit: []
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

export const categoryInitialState = {
    status: "",
    error: "",
    primary_category: [],
    subcategory: []
}

export const insuranceInitialState = {
    status: "",
    error: "",
    insurance: []
}

export const feedbackInitialState = {
    status: "",
    error: "",
}

export const searchTermInitialState = {
    status: "",
    error: "",
}