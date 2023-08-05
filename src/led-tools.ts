class RGBColor {
        
    constructor(public r: number, public g: number, public b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    public toHex(): string {
        return "#" + this.componentToHex(this.r) + this.componentToHex(this.g) + this.componentToHex(this.b);
    }

    private componentToHex(c: number): string {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

}

enum LEDActionType {
    GRADIENT,
    SOLID
}

class LEDStrip {

    public LEDs: RGBColor[];

    constructor(public numLEDs: number = 60) {
        this.numLEDs = numLEDs;
        this.LEDs = new Array<RGBColor>(numLEDs);

        for (let i = 0; i < numLEDs; i++) {
            this.LEDs[i] = new RGBColor(0, 0, 0);
        }
    }
}

class LEDActionBase {
    constructor(public type: LEDActionType, public colors: RGBColor[], public numLEDs: number = 60) {
        this.type = type;
        this.colors = colors;
        
    }
}

class LEDActionSolid extends LEDActionBase {
    constructor(public colors: RGBColor[], public numLEDs: number = 60) {
        super(LEDActionType.SOLID, colors, numLEDs);
    }

    public update(LEDStrip: LEDStrip) {
        for (let i = 0; i < this.numLEDs; i++) {
            LEDStrip.LEDs[i] = this.colors[0];
        }
    }

}

export { LEDStrip, RGBColor, LEDActionBase, LEDActionType, LEDActionSolid }