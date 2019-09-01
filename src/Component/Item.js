import React, { Component } from "react";

import "./index.css";
import NodeItem from "./NodeItem";
import { generateUniqueId } from "../utils/helper";
import { cloneDeep } from "lodash";

export default class Node extends Component {
    state = {
        isExpanded: false,
        tree: this.props.tree,
        clickedNode: false
    };

    splitId = combinedId => combinedId.match(/.{3}/g);

    toggleExpansion = combinedId => {
        const { tree } = this.props;
        const nodeIds = combinedId.match(/.{3}/g);
        const searchNodeIndex = (children, id) => {
            return children.findIndex(item => item.id === id);
        };

        const modifyNode = (root, level) => {
            let si = searchNodeIndex(root, nodeIds[level]);
            if (level === nodeIds.length - 1) {
                root[si].isExpanded = !root[si].isExpanded;
                return root;
            }
            return modifyNode(root[si].children, level + 1);
        };

        modifyNode(tree, 0);
        this.setState({ tree });
    };

    searchNodeIndex = (children, id) => {
        return children.findIndex(item => item.id === id);
    };

    addChild = combinedId => title => {
        const { tree, updateTree } = this.props;
        const temptree = cloneDeep(tree);
        const nodeIds = combinedId.match(/.{3}/g);

        const modifyNode = (root, level) => {
            let si = this.searchNodeIndex(root, nodeIds[level]);
            if (level === nodeIds.length - 1) {
                const newNode = {
                    id: generateUniqueId(),
                    title,
                    isExpanded: false,
                    children: []
                };
                root[si].children.push(newNode);
                return root;
            }
            return modifyNode(root[si].children, level + 1);
        };
        modifyNode(temptree, 0);
        updateTree(temptree);
    };

    renderTree = (root, combinedId) => {
        const ids = this.splitId(combinedId) || [];
        return root.map(node => (
            <div key={node.id} style={{ marginLeft: 30 }}>
                <NodeItem
                    level={ids.length - 1}
                    node={node}
                    marginLeft={ids.length ? 30 : 0}
                    toggleExpansion={() => this.toggleExpansion(combinedId + node.id)}
                    addChild={this.addChild(combinedId + node.id)}
                />
                {node.isExpanded && this.renderTree(node.children, combinedId + node.id)}
            </div>
        ));
    };

    render() {
        const { tree } = this.props;
        return <div>{tree.length > 0 && <div>{this.renderTree(tree, "")}</div>}</div>;
    }
}
