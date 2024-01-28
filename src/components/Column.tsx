export class Column {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public queue: {
      x: number;
      y: number;
      r: number;
      g: number;
      b: number;
    }[] = [],
    public color: {
      r: number;
      g: number;
      b: number;
    } = {
      r: 197,
      g: 197,
      b: 197,
    }
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.queue = [];
    this.color = {
      r: 197,
      g: 197,
      b: 197,
    };
  }

  lerp(a: number, b: number, c: number) {
    return a + (b - a) * c;
  }
  moveToLocation(
    location: { x: number; y: number },
    yOffest = 1,
    frameCount = 30
  ) {
    //getting all the inbetween values using linear interpolation
    for (let i = 1; i < frameCount; i++) {
      const t = i / frameCount;
      const circularPath = Math.sin(t * Math.PI);

      this.queue.push({
        x: this.lerp(this.x, location.x, t),
        y:
          this.lerp(this.y, location.y, t) +
          ((circularPath * this.width) / 4) * yOffest,
        r: this.lerp(150, 255, circularPath),
        g: this.lerp(150, 0, circularPath),
        b: this.lerp(150, 0, circularPath),
      });
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    let changed = false;
    if (this.queue.length > 0) {
      const dequeuedItem = this.queue.shift();
      if (dequeuedItem !== undefined) {
        const { x, y, r, g, b } = dequeuedItem;
        this.x = x;
        this.y = y;
        this.color = { r, g, b };
        changed = true;
      }
    }
    const left = this.x - this.width / 2;
    const top = this.y - this.height;
    const right = this.x + this.width / 2;
    const { r, g, b } = this.color;
    ctx.beginPath();
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.moveTo(left, top);
    ctx.lineTo(left, this.y);
    ctx.ellipse(
      this.x,
      this.y,
      this.width / 2,
      this.width / 4,
      0,
      Math.PI,
      Math.PI * 2,
      true
    );
    ctx.lineTo(right, top);
    ctx.ellipse(
      this.x,
      top,
      this.width / 2,
      this.width / 4,
      0,
      0,
      Math.PI * 2,
      true
    );
    ctx.fill();
    ctx.stroke();
    // ctx.rect(left, top, this.width, this.height);
    return changed;
  }
}
