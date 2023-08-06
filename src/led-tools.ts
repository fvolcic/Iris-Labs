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
    SOLID,
    SHIFT
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

abstract class LEDActionBase {
    constructor(public type: LEDActionType, public colors: RGBColor[], public numLEDs: number = 60) {
        this.type = type;
        this.colors = colors;
    }

    public abstract update(LEDStrip: LEDStrip): void;
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

class LEDActionGradient extends LEDActionBase {
    
    leds: RGBColor[];
    
    constructor(public colors: RGBColor[], public numLEDs: number = 60) {
        super(LEDActionType.GRADIENT, colors, numLEDs);
        this.leds = new Array<RGBColor>(numLEDs);

        if (colors.length < 2) {
            colors.push(colors[0]);
        }

        const color1 = colors[0];
        const color2 = colors[1];

        const rStep = (color2.r - color1.r) / (numLEDs / 2);
        const gStep = (color2.g - color1.g) / (numLEDs / 2);
        const bStep = (color2.b - color1.b) / (numLEDs / 2);

        for (let i = 0; i < numLEDs / 2; i++) {
            this.leds[i] = new RGBColor(
                Math.round(color1.r + (rStep * i)),
                Math.round(color1.g + (gStep * i)),
                Math.round(color1.b + (bStep * i))
            );
            this.leds[numLEDs - i - 1] = new RGBColor(
                Math.round(color1.r + (rStep * i)),
                Math.round(color1.g + (gStep * i)),
                Math.round(color1.b + (bStep * i))
            );
        }

    }

    public update(LEDStrip: LEDStrip) {
       for(let i = 0; i < this.numLEDs; i++) {
           LEDStrip.LEDs[i] = this.leds[i];
       }
    }

}

class LEDActionShift extends LEDActionBase {
    
    shiftAmount: number;
    
    constructor(public colors: RGBColor[], public numLEDs: number = 60) {
        super(LEDActionType.SHIFT, colors, numLEDs);
        this.shiftAmount = 0;
    }

    public update(LEDStrip: LEDStrip) {
        
        // make copy of LEDStrip
        const leds = LEDStrip.LEDs.slice(0);
        
        for (let i = 0; i < this.numLEDs; i++) {
            LEDStrip.LEDs[i] = leds[(i + this.shiftAmount) % this.numLEDs];
        }
        
        this.shiftAmount++;
    }

}

export { LEDStrip, RGBColor, LEDActionBase, LEDActionType, LEDActionSolid, LEDActionGradient, LEDActionShift }