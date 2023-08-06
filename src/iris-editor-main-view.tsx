import { Component } from 'react';
import './iris-editor-main-view.css'
import { LEDActionBase } from './led-tools';
import { ActionChip } from './iris-editor-main-view-action-chip';
import { IrisLightViewer } from './iris-light-viewer';

class IrisEditorMainViewProps {
    ledActions: LEDActionBase[];
    updateLedActions: (ledActions: LEDActionBase[]) => void;
    constructor(ledActions: LEDActionBase[], updateLedActions: (ledActions: LEDActionBase[]) => void) {
        this.ledActions = ledActions;
        this.updateLedActions = updateLedActions;
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
                    <IrisLightViewer ledActions={this.props.ledActions} />
                </div>
                <div className="iris-app-split-view-item-2">
                    {
                        this.props.ledActions.map((action, index) => {
                            console.log("action", action);
                            return <ActionChip 
                                action={action}
                                key={index}
                                onDeleteAction={() => {
                                    const ledActions = this.props.ledActions;
                                    ledActions.splice(index, 1);
                                    this.props.updateLedActions(ledActions);
                                }}
                                onUpdateAction={(action: LEDActionBase) => {}}  
                                />
                        })
                    }
                </div>
            </div>
        )
    }

}

export { IrisEditorMainView };