
class PlaceLevel
{
	constructor(level)
	{
		this.level = level;
	}

	initialize(universe, world)
	{
		this.level.initialize(universe, world);

		var cameraViewSize = universe.display.sizeInPixels;
		var cameraViewSizeHalf = cameraViewSize.clone().half();
		this.camera = new Camera(cameraViewSize);
		var levelSize = this.level.size;
		var cameraBoxMax = levelSize.clone().subtract(cameraViewSizeHalf);
		var cameraBox = Box.fromMinAndMax
		(
			cameraViewSizeHalf,
			cameraBoxMax
		);
		this.cameraConstraint = new Constraint_TrimToBox(cameraBox);
	}

	size()
	{
		return this.level.size;
	}

	updateForTimerTick(universe, world)
	{
		this.level.updateForTimerTick(universe, world, this);
		this.cameraConstraint.constrain(universe, world, this, this.camera);
	}
}
