import { Component } from 'react';
import './iris-editor-main-view.css'
import { LEDActionBase } from './led-tools';
import { ActionChip } from './iris-editor-main-view-action-chip';

class IrisEditorMainViewProps {
    ledActions: LEDActionBase[];
    constructor(ledActions: LEDActionBase[]) {
        this.ledActions = ledActions;
    }
}

class IrisEditorMainViewState {

}

class IrisEditorMainView extends Component<IrisEditorMainViewProps, IrisEditorMainViewState> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="iris-app-split-view" >
                <div className="iris-app-split-view-item-1">
                </div>
                <div className="iris-app-split-view-item-2">
                    {
                        this.props.ledActions.map((action, index) => {
                            console.log("action", action);
                            return <ActionChip action={action} key={index} />
                        })
                    }
                </div>
            </div>
        )
    }

}

export { IrisEditorMainView };