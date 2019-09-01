import { UPDATE_TREE, ADD_NODE } from "./constant";

export const updateTree = tree => {
    return {
        type: UPDATE_TREE,
        payload: tree
    };
};

export const addNode = node => {
    return {
        type: ADD_NODE,
        payload: node
    };
};
