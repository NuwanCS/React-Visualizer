export class Column {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public queue: { x: number; y: number }[] = []
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.queue = [];
  }

  lerp(a: number, b: number, c: number) {
    return a + (b - a) * c;
  }
  moveToLocation(location: { x: number; y: number }, frameCount = 100) {
    //getting the all the inbetween values using linear interpolation
    for (let i = 0; i < frameCount; i++) {
      const t = i / frameCount;
      this.queue.push({
        x: this.lerp(this.x, location.x, t),
        y: this.lerp(this.y, location.y, t),
      });
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.queue.length > 0) {
      const dequeuedItem = this.queue.shift();
      if (dequeuedItem !== undefined) {
        const { x, y } = dequeuedItem;
        this.x = x;
        this.y = y;
      }
    }
    const left = this.x - this.width / 2;
    const top = this.y - this.height;
    const right = this.x + this.width / 2;
    ctx.beginPath();
    ctx.fillStyle = '#c5c5c5';
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
  }
}
