import React from "react";
import "./index.css";
import Item from "./Component/Item";
// import _ from "lodash";
import { connect } from "react-redux";

import { addNode, updateTree } from "./action/action";
import { generateUniqueId } from "./utils/helper";

// import Node from "./Component/Node";

const treeStructre = [
    {
        id: "101",
        title: "ABC",
        isExpanded: false,
        children: [
            {
                id: "102",
                title: "XYZ",
                isExpanded: false,
                children: [
                    {
                        id: "103",
                        title: "123",
                        isExpanded: false,
                        children: [
                            {
                                id: "104",
                                title: "456",
                                isExpanded: false,
                                children: []
                            },
                            {
                                id: "105",
                                title: "456",
                                isExpanded: false,
                                children: []
                            }
                        ]
                    },
                    {
                        id: "106",
                        title: "456",
                        isExpanded: false,
                        children: []
                    }
                ]
            },
            {
                id: "107",
                title: "EFG",
                isExpanded: false,
                children: []
            }
        ]
    },
    {
        id: "108",
        title: "DEF",
        isExpanded: false,
        children: []
    }
];

class App extends React.Component {
    state = {
        node: ""
    };

    componentDidMount = () => {};

    handleChange = e => {
        this.setState({
            node: e.target.value
        });
    };

    addParent = e => {
        e.preventDefault();
        const { node } = this.state;
        const { appendNode } = this.props;
        const newNode = {
            id: generateUniqueId(),
            title: node,
            isExpanded: false,
            children: []
        };
        appendNode(newNode);
        this.setState({
            node:''
        })
    };

    render() {
        const { node } = this.state;
        const { tree, update } = this.props;
        return (
            <div className="container">
                <h3>Your Custom Storage</h3>
                <p>You can max use 4 characters/number for each level's name</p>
                <form className="form-inline my-2 my-lg-0">
                    <div className="d-flex align-items-flex-start">
                        <div>
                            <input
                                className="form-control mr-sm-1"
                                type="search"
                                maxLength={4}
                                placeholder="RM1"
                                aria-label="Search"
                                onChange={this.handleChange}
                            />
                            <small id="inputHelp" className="form-text text-muted">
                                Add top level (example: R1,RM1)
                            </small>
                        </div>
                        <button
                            className="btn btn-success my-2 my-sm-0"
                            type="submit"
                            onClick={this.addParent}
                            disabled={node.length === 0}
                        >
                            ADD
                        </button>
                    </div>
                </form>
                <Item tree={tree} updateTree={update} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { tree: state.tree };
};

const mapDispatchToProps = dispatch => ({
    appendNode: node => dispatch(addNode(node)),
    update: tree => dispatch(updateTree(tree))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
