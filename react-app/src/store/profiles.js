const GET_ALL_PROFILES = 'profiles/GET_ALL_PROFILES';
const GET_CURR_USERS_PROFILE = 'profiles/GET_CURR_USERS_PROFILE';
const CREATE_PROFILE = 'profiles/CREATE_PROFILE';

const getAllProfilesAction = (profiles) => ({
    type: GET_ALL_PROFILES,
    profiles
});

const getCurrProfAction = (profile) => ({
    type: GET_CURR_USERS_PROFILE,
    profile
});

const createProfAction = (profile) => ({
    type: CREATE_PROFILE,
    profile
})

export const getAllProfilesThunk = () => async (dispatch) => {
    const res = await fetch("/api/profiles");
    console.log('inside allpof thunk : ', res)

    if(res.ok) {
        const { profiles } = await res.json();
        dispatch(getAllProfilesAction(profiles))
        return profiles
    } else {
        return "==========> getAllProfilesThunk res is not ok <=========="
    }
};

export const getCurrProfThunk = () => async (dispatch) => {
    const res = await fetch('/api/profiles/current')

    if(res.ok) {
        const profile  = await res.json()
        console.log('getcurrprofthunk profile is right here ==>', profile)
        dispatch(getCurrProfAction(profile))
        return profile
    } else {
        return "==========> getCurrProfThunk res is not ok <=========="
    }
}

export const createProfThunk = (profile) => async (dispatch) => {
    const res = await fetch('/api/profiles/new', {
        method: "POST",
        body: profile
    });

    if(res.ok) {
        const profile = await res.json();
        dispatch(createProfAction(profile));
        return profile
    } else {
        return "==========> createProfileThunk res is not ok <=========="
    }
}

const initState = {};
function profileReducer(state = initState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_PROFILES:
            newState = {...state};
            action.profiles.forEach((prof) => {
                newState[prof.id] = prof
            })
            return newState
        case GET_CURR_USERS_PROFILE:
            newState = {...state}
            newState[action.profile.id] = action.profile
            return newState;
        case CREATE_PROFILE:
            newState = {...state}
            newState[action.profile.id] = action.profile
            return newState
        default:
            return state
    };
};

export default profileReducer;
