import { UPDATE_TREE, ADD_NODE } from "../action/constant";
import { cloneDeep } from "lodash";

const INITIAL_STATE = { tree: [] };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_TREE:
            return { ...state, tree: cloneDeep(action.payload) };
        case ADD_NODE:
            const newTree = cloneDeep(state.tree);
            newTree.push(action.payload);
            return { ...state, tree: newTree };
        default:
            return state;
    }
};
