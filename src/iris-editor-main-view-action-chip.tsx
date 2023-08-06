import { Component } from 'react';
import './iris-editor-main-view-action-chip.css'
import { LEDActionBase, LEDActionType } from './led-tools'; 

class ActionChipProps {
    action: LEDActionBase;
    onUpdateAction: (action: LEDActionBase) => void;
    onDeleteAction: () => void;
    constructor(action: LEDActionBase, onUpdateAction: () => void, onDeleteAction: () => void) {
        this.action = action;
        this.onUpdateAction = onUpdateAction;
        this.onDeleteAction = onDeleteAction;
    }
}

class ActionChipState {

}

class ActionChip extends Component<ActionChipProps, ActionChipState> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="iris-app-action-chip">
                <div className="grid-element-1">
                {this.props.action.type == LEDActionType.GRADIENT &&
                    <div className="iris-circle-preview"
                    style={{backgroundImage: `linear-gradient(to right, ${this.props.action.colors[0].toHex()}, ${this.props.action.colors[1].toHex()})`}}
                ></div>}
                {this.props.action.type == LEDActionType.SOLID &&
                    <div className="iris-circle-preview"
                    style={{backgroundColor: this.props.action.colors[0].toHex()}}
                ></div>}
                {this.props.action.type == LEDActionType.SHIFT &&
                    <div className="iris-circle-preview"
                    style={{backgroundColor: "#000000"}}
                ></div>}
                </div>
                <div className="grid-element-2">
                    {this.props.action.type == LEDActionType.SOLID && <p>Solid LED Action</p>}
                    {this.props.action.type == LEDActionType.GRADIENT && <p>Gradient LED Action</p>}
                    {this.props.action.type == LEDActionType.SHIFT && <p>Shift LED Action</p>}
                </div>
                <div className="grid-element-3">
                <button className='edit-button' onClick={this.props.onDeleteAction}>Delete</button>
                    <button className='edit-button'>Edit</button>
                </div>
            </div>
        )
    }

}

export { ActionChip };