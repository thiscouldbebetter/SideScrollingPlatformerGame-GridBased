
class Constraint_Gravity
{
	constructor(accel)
	{
		this.accel = accel;
	}

	constrain(universe, world, place, entity)
	{
		var accel = entity.disp.accel;
		accel.add(this.accel);
	}
}

class Constraint_Solid
{
	constrain(universe, world, place, entity)
	{
		var level = place.level;
		var map = level.map;
		var disp = entity.disp;
		var pos = disp.pos;
		var cellOccupied = map.cellAtPosInPixels(pos);
		var doesConstraintApply =
			(cellOccupied != null && cellOccupied.isBlocking);

		return doesConstraintApply;
	}
}

class Constraint_SpeedMax
{
	constructor(speedMax)
	{
		this.speedMax = speedMax;
	}

	constrain(universe, world, place, entity)
	{
		var vel = entity.disp.vel;
		vel.trimToMagnitudeMax(this.speedMax);
	}
}

class Constraint_TrimToBox
{
	constructor(boxToTrimTo)
	{
		this.boxToTrimTo = boxToTrimTo;
	}

	constrain(universe, world, place, entity)
	{
		var pos = entity.disp.pos;
		var boxMin = this.boxToTrimTo.min();
		var boxMax = this.boxToTrimTo.max();
		pos.trimToRangeMinMax
		(
			boxMin, boxMax
		);
	}
}
