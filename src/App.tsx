import './App.css';
import { Component, useEffect } from 'react';

// rgb color struct
class RGBColor {
  r: number;
  g: number;
  b: number;
  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  toHex(): string {
    return "#" + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
  }

  toHexNumber(): number {
    return parseInt(this.toHex().replace("#", ""), 16);
  }

}

class LightActionTileBaseProps {
  colors: RGBColor[];
  name: string;

  constructor(colors: RGBColor[], name: string) {
    this.colors = colors;
    this.name = name;
  }
}

class LightActionTileBaseState {


}

class LightActionTile extends Component<LightActionTileBaseProps, LightActionTileBaseState> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="light-action-tile">
        <div className="light-action-tile-name">{this.props.name}</div>
      </div>
    );
  }

}

function App() {
  return (
    <div className="App">
      <header>
      </header>
      <div className="iris-app">
        <div className="iris-app-chip" >
          <div className="iris-app-split-view">
            <div className="iris-app-split-view-item-1">
            </div>
            <div className="iris-app-split-view-item-2">
              <div className="iris-app-action-tile">
                <p>Light action 1</p>
              </div>
              <div className="iris-app-action-tile"> <p>Light action 1</p></div>
              <div className="iris-app-action-tile"> <p>Light action 1</p></div>
              <div className="iris-app-action-tile"> <p>Light action 1</p></div>
              <div className="iris-app-action-tile"> <p>Light action 1</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
