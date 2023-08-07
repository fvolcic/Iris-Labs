import { Component } from 'react';
import './iris-editor-main-view.css'
import { LEDActionBase } from './led-tools';
import { ActionChip } from './iris-editor-main-view-action-chip';
import { IrisLightViewer } from './iris-light-viewer';
import { IrisActionEditor } from './iris-action-editor';

class IrisEditorMainViewProps {
    ledActions: LEDActionBase[];
    updateLedActions: (ledActions: LEDActionBase[]) => void;
    constructor(ledActions: LEDActionBase[], updateLedActions: (ledActions: LEDActionBase[]) => void) {
        this.ledActions = ledActions;
        this.updateLedActions = updateLedActions;
    }
}

enum IrisEditorPage {
    DISPLAY_ACTIONS,
    EDIT_ACTION
}

class IrisEditorMainViewState {
    editorPage: IrisEditorPage
    editingAction: LEDActionBase | undefined = undefined;

    constructor(editorPage: IrisEditorPage) {
        this.editorPage = editorPage;
    }
}

class IrisEditorMainView extends Component<IrisEditorMainViewProps, IrisEditorMainViewState> {

    state: IrisEditorMainViewState = {
        editorPage: IrisEditorPage.DISPLAY_ACTIONS,
        editingAction: undefined
    }

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
                    {this.state.editorPage === IrisEditorPage.DISPLAY_ACTIONS &&
                        this.props.ledActions.map((action, index) => {
                            return <ActionChip
                                action={action}
                                key={index}
                                onDeleteAction={() => {
                                    const ledActions = this.props.ledActions;
                                    ledActions.splice(index, 1);
                                    this.props.updateLedActions(ledActions);
                                }}
                                onEditAction={() => {
                                    this.setState({ editorPage: IrisEditorPage.EDIT_ACTION, editingAction: action });
                                }}
                            />
                        })
                    }
                    {
                        this.state.editorPage === IrisEditorPage.EDIT_ACTION &&
                        <IrisActionEditor 
                            action={this.state.editingAction!}
                            onBack={() => {this.setState({editorPage: IrisEditorPage.DISPLAY_ACTIONS})}}    
                        ></IrisActionEditor>
                    }
                </div>
            </div>
        )
    }

}

export { IrisEditorMainView };