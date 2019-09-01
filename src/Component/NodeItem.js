import React, { Component } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import CustomPopover from './CustomPopover';
import "./index.css";
import caretRight from "../assets/images/caret-right.jpg";
import caretDown from "../assets/images/caret-down.png";

class NodeItem extends Component {
    state = {
        clickedNode: false
    };

    popUp = () => {
        this.setState({
            clickedNode: true
        });
    };

    render() {
        const { node, toggleExpansion, level, addChild, edit } = this.props;
        const icon = node.isExpanded ? caretDown : caretRight;
        const style = node.isExpanded ? { marginRight: 13 } : null;
        const textStyle = node.children.length > 0 ? null : { marginLeft: "28px" };
        return (
            <div className="node">
                {level > 0 && <span>|</span>}
                {node.children.length > 0 && (
                    <img
                        hand
                        onClick={toggleExpansion}
                        style={style}
                        className="caret"
                        src={icon}
                        alt="caret"
                        height={14}
                    ></img>
                )}
                <OverlayTrigger trigger="click" placement="right" overlay={<CustomPopover node ={node} addChild={addChild} edit={edit}/>}>
                    <span style={textStyle} className="mx-10">
                        {node.title}
                    </span>
                </OverlayTrigger>
            </div>
        );
    }
}

export default NodeItem;

// const CustomPopover = props => {
//     const { title, addChild, edit } = props;
//     return (
//         <Popover id="popover-basic">
//             <Popover.Content>
//                 <div>{title}</div>
//                 <button
//                     onClick={() => addChild("ABC")}
//                     type="button"
//                     className="btn btn-outline-success"
//                     style={{ marginBottom: "10px" }}
//                 >
//                     Add child
//                 </button>
//                 <div>
//                     <button onClick={edit} type="button" className="btn btn-outline-primary">
//                         Edit
//                     </button>
//                 </div>
//                  
//             </Popover.Content>
//         </Popover>
//     );
// };

