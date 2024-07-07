
class VisualOffset
{
	constructor(offset, child)
	{
		this.offset = offset;
		this.child = child;
	}

	draw(universe, world, place, entity)
	{
		var entityPos = entity.disp.pos;
		entityPos.add(this.offset);
		this.child.draw(universe, world, place, entity);
		entityPos.subtract(this.offset);
	}
}

class VisualRectangle
{
	constructor(colorName, size)
	{
		this.colorName = colorName;
		this.size = size;

		this._drawPos = new Coords();
	}

	static fromColorNameAndSize(colorName, size)
	{
		return new VisualRectangle(colorName, size);
	}

	color()
	{
		return Color.byName(this.colorName);
	}

	draw(universe, world, place, entity)
	{
		var camera = place.camera;

		var drawPos = camera.coordsTransformWorldToView
		(
			this._drawPos.overwriteWith
			(
				entity.disp.pos
			)
		);

		var color = this.color();

		var display = universe.display;

		display.drawRectangleOfSizeWithCenterAndColor
		(
			this.size, drawPos, color
		);
	}
}
