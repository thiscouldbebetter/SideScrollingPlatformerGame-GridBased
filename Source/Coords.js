
class Coords
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	static create()
	{
		return new Coords(0, 0);
	}

	static ones()
	{
		return new Coords(1, 1);
	}

	static zeroes()
	{
		return new Coords(0, 0);
	}

	add(other)
	{
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	addXY(x, y)
	{
		this.x += x;
		this.y += y;
		return this;
	}

	clear()
	{
		this.x = 0;
		this.y = 0;
		return this;
	}

	clone()
	{
		return new Coords(this.x, this.y);
	}

	divide(other)
	{
		this.x /= other.x;
		this.y /= other.y;
		return this;
	}

	divideScalar(scalar)
	{
		this.x /= scalar;
		this.y /= scalar;
		return this;
	}

	floor()
	{
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	}

	fractionalPart()
	{
		this.x -= Math.floor(this.x);
		this.y -= Math.floor(this.y);
		return this;
	}

	half()
	{
		return this.divideScalar(2);
	}

	isInRangeMax(max)
	{
		var isInRange =
		(
			this.x >= 0
			&& this.x <= max.x
			&& this.y >= 0
			&& this.y <= max.y
		);

		return this;
	}

	magnitude()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	multiply(other)
	{
		this.x *= other.x;
		this.y *= other.y;
		return this;
	}

	multiplyScalar(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	overwriteWith(other)
	{
		this.x = other.x;
		this.y = other.y;
		return this;
	}

	overwriteWithXY(x, y)
	{
		this.x = x;
		this.y = y;
		return this;
	}

	subtract(other)
	{
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}

	trimToMagnitudeMax(max)
	{
		var magnitude = this.magnitude();
		if (magnitude > max)
		{
			this.divideScalar(magnitude);
			this.multiplyScalar(max);
		}
	}

	trimToRangeMinMax(min, max)
	{
		if (this.x < min.x)
		{
			this.x = min.x;
		}
		else if (this.x > max.x)
		{
			this.x = max.x;
		}

		if (this.y < min.y)
		{
			this.y = min.y;
		}
		else if (this.y > max.y)
		{
			this.y = max.y;
		}

		return this;
	}

	trimToRangeMax(max)
	{
		if (this.x < 0)
		{
			this.x = 0;
		}
		else if (this.x > max.x)
		{
			this.x = max.x;
		}

		if (this.y < 0)
		{
			this.y = 0;
		}
		else if (this.y > max.y)
		{
			this.y = max.y;
		}

		return this;
	}
}
