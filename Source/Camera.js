
class Camera
{
	constructor(viewSizeInPixels)
	{
		this.viewSizeInPixels = viewSizeInPixels;

		this.viewSizeInPixelsHalf = this.viewSizeInPixels.clone().half();

		this.pos = Coords.create();
		this.disp = Disposition.fromPos(this.pos);
	}

	coordsTransformWorldToView(coordsToTransform)
	{
		return coordsToTransform.subtract
		(
			this.pos
		).add
		(
			this.viewSizeInPixelsHalf
		);
	}
}
