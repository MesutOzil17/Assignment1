import React, { Component } from "react";
import Popover from "react-bootstrap/Popover";


class CustomPopover extends Component {

    state={
        addInput : false,
        node:'',
        editInput: false,
    }
    handleChange = e => {
        this.setState({
            node: e.target.value
        });
    };

    takeInput = ()=>{
        this.setState({
            addInput : true,
            editInput: false
        })
    }
    takeEditInput = ()=>{
        this.setState({
            addInput : false,
            editInput: true
        })
    }


    render (){
    const { title, addChild, edit } = this.props;
    const {addInput, node, editInput} = this.state;
        return(
            <Popover id="popover-basic">
                <Popover.Content>
                    <div>{title}</div>
                        <button
                            onClick={this.takeInput}
                            type="button"
                            className="btn btn-outline-success"
                            style={{ marginBottom: "10px" }}
                        >
                            Add child
                        </button>
                    {addInput && (
                        <div>
                            <input
                                className="form-control mr-sm-2"
                                style={{ marginBottom: "10px" }}
                                type="search"
                                maxLength={4}
                                placeholder="RM1"
                                aria-label="Search"
                                onChange={this.handleChange}
                            />
                            <button
                            className="btn btn-success my-2 my-sm-0"
                            type="submit"
                            style={{ marginBottom: "10px" }}
                            onClick={() => addChild(node)}
                            disabled={node.length === 0}
                        >
                            ADD
                        </button>
                        </div>
                    )}
                    <div>
                        <button onClick={this.takeEditInput} type="button" className="btn btn-outline-primary">
                            Edit
                        </button>
                        {editInput && (
                        <div>
                            <input
                                className="form-control mr-sm-2"
                                style={{ marginBottom: "10px" }}
                                type="search"
                                maxLength={4}
                                placeholder="RM1"
                                aria-label="Search"
                                onChange={this.handleChange}
                            />
                            <button
                            className="btn btn-success my-2 my-sm-0"
                            type="submit"
                            style={{ marginBottom: "10px" }}
                            onClick={() => addChild(node)}
                            disabled={node.length === 0}
                        >
                            Update
                        </button>
                        </div>
                    )}
                    </div>
                 
                </Popover.Content>
            </Popover>
        )
    }
}

export default CustomPopover;


// () => addChild("ABC")