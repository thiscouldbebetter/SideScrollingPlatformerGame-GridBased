
class Disposition
{
	constructor(headingInTurns, pos)
	{
		this.headingInTurns = headingInTurns;
		this.pos = pos;

		this.accel = Coords.zeroes();
		this.vel = Coords.zeroes();

		this.posPrev = this.pos.clone();
		this._headingAsCoords = Coords.create();
	}

	static fromPos(pos)
	{
		return new Disposition(0, pos);
	}

	headingAsCoords()
	{
		var headingInRadians =
			this.headingInTurns * 2 * Math.PI;

		this.headingAsCoords.overwriteWithXY
		(
			Math.cos(headingInRadians),
			Math.sin(headingInRadians)
		);
	}
}
