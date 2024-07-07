
class Display
{
	constructor(sizeInPixels)
	{
		this.sizeInPixels = sizeInPixels;

		this._drawPos = Coords.create();
		this._sizeHalf = Coords.create();
	}

	initialize(universe)
	{
		var d = document;
		this.canvas = d.createElement("canvas");
		this.canvas.width = this.sizeInPixels.x;
		this.canvas.height = this.sizeInPixels.y;

		var divDisplay = d.getElementById("divDisplay");
		divDisplay.appendChild(this.canvas);

		this.graphics = this.canvas.getContext("2d");
	}

	// Draw.

	clear()
	{
		this.drawRectangleOfSizeAtPosWithColor
		(
			this.sizeInPixels, Coords.zeroes(), Color.Instances().Black
		);
	}

	drawRectangleOfSizeAtPosWithColor(size, pos, color)
	{
		var g = this.graphics;
		g.fillStyle = color.systemColor;
		g.fillRect(pos.x, pos.y, size.x, size.y);
	}

	drawRectangleOfSizeWithCenterAndColor(size, center, color)
	{
		var sizeHalf = this._sizeHalf.overwriteWith(size).half();
		var pos = this._drawPos.overwriteWith(center).subtract(sizeHalf);
		this.drawRectangleOfSizeAtPosWithColor(size, center, color);
	}

}
