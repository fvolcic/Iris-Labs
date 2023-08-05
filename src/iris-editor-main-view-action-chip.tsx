import { Component } from 'react';
import './iris-editor-main-view-action-chip.css'
import { LEDActionBase, LEDActionType } from './led-tools'; 

class ActionChipProps {
    action: LEDActionBase;
    constructor(action: LEDActionBase) {
        this.action = action;
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
                <div className="iris-circle-preview"
                    style={{backgroundColor: this.props.action.colors[0].toHex()}}
                ></div>
                </div>
                <div className="grid-element-2">
                    <p>{this.props.action.type == LEDActionType.SOLID && <p>Solid LED Action</p>}</p>
                </div>
            </div>
        )
    }

}

export { ActionChip };