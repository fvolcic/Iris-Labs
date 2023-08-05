import React from 'react';
import { Component } from 'react';
import './iris-editor.css';

import { IrisEditorMainView } from './iris-editor-main-view';
import { LEDActionSolid, RGBColor } from './led-tools';

class IrisEditorProps {
}

enum IrisEditorPages {
    Main = "main"
}

class IrisEditorState {
    page: IrisEditorPages = IrisEditorPages.Main;
}



class IrisEditor extends Component<IrisEditorProps, IrisEditorState>  {

    state: IrisEditorState = {
        page: IrisEditorPages.Main
    }

    constructor(props: any) {
        super(props);
    }

    changePage(page: IrisEditorPages) {
        this.setState({ page: page });
    }

    render() {

        const page = this.state.page? this.state.page : IrisEditorPages.Main;

        return <div className="iris-app-chip">
            {
                (page == IrisEditorPages.Main) &&
                <IrisEditorMainView ledActions={[new LEDActionSolid([new RGBColor(255, 0, 0)], 60)]} />
            }
        </div>
    }

}

export { IrisEditor };