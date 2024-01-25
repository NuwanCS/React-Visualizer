export class Column {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D) {
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
