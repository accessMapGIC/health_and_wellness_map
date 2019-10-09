import { testInitialState } from "./initialState";

export default function test(state=testInitialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}