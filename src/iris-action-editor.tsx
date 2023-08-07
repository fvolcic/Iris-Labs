import { Component } from 'react';
import { LEDActionBase } from './led-tools';
import './iris-action-editor.css';

class IrisActionEditorProps {
    action: LEDActionBase
    onBack: () => void;

    constructor(action: LEDActionBase, onBack: () => void) {
        this.action = action;
        this.onBack = onBack;
    }
}

class IrisActionEditorState {

}

class IrisActionEditor extends Component<IrisActionEditorProps, IrisActionEditorState>{

    render() {
        return (
            <div>
                <button className="edit-button" onClick={this.props.onBack}>Back</button>
                {this.props.action.colors.map(
                    (col, idx) => {
                        return (
                            <div key={idx} className="color-div">
                                <label
                                style={{marginRight: "10px"}}
                                >Color {idx + 1}</label>
                                <input
                                    type={"color"}
                                    defaultValue={col.toHex()}
                                    onChange={
                                        (e) => {
                                            const val = e.target.value
                                            col.fromHex(val)
                                        }
                                    }
                                >

                                </input>
                            </div>)
                    }
                )}
            </div>
        )
    }

}

export { IrisActionEditor }