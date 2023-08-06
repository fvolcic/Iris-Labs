import React from 'react';
import { Component } from 'react';
import './iris-editor.css';

import { IrisEditorMainView } from './iris-editor-main-view';
import { LEDActionBase, LEDActionSolid, LEDActionGradient, RGBColor, LEDActionShift } from './led-tools';

class IrisEditorProps {
}

enum IrisEditorPages {
    Main = "main"
}

class IrisEditorState {
    page: IrisEditorPages = IrisEditorPages.Main;
    ledActions: LEDActionBase[];

    constructor() {
        this.ledActions = [];
    }
}



class IrisEditor extends Component<IrisEditorProps, IrisEditorState>  {

    state: IrisEditorState = {
        page: IrisEditorPages.Main,
        ledActions: []
    }

    constructor(props: any) {
        super(props);
    }

    changePage(page: IrisEditorPages) {
        this.setState({ page: page });
    }

    onChangeLedActions(ledActions: LEDActionBase[]) {
        this.setState({ ledActions: ledActions });
    }

    componentDidMount() {
        this.setState({
            ledActions: [
                new LEDActionSolid([new RGBColor(255, 0, 0)], 60),
                new LEDActionGradient([new RGBColor(255, 0, 0), new RGBColor(0, 255, 0)], 60),
                new LEDActionShift([], 60)
            ]});
    }

    render() {

        const page = this.state.page ? this.state.page : IrisEditorPages.Main;

        return <div className="iris-app-chip">
            {
                (page == IrisEditorPages.Main) &&
                <IrisEditorMainView
                    updateLedActions={
                        (ledActions: LEDActionBase[]) => {
                            this.onChangeLedActions(ledActions);
                        }
                    }
                    ledActions={
                        this.state.ledActions
                    } />
            }
        </div>
    }

}

export { IrisEditor };