class Box
{
	constructor(size, center)
	{
		this.size = size;
		this.center = center;

		this._max = Coords.create();
		this._min = Coords.create();
		this._sizeHalf = this.size.clone().half();
	}

	static fromMinAndMax(min, max)
	{
		var size = max.clone().subtract(min);
		var center = size.clone().half().add(min);
		var box = new Box(size, center);
		return box;
	}

	max()
	{
		return this._max.overwriteWith(this.center).add(this._sizeHalf);
	}

	min()
	{
		return this._min.overwriteWith(this.center).subtract(this._sizeHalf);
	}

	overlapsWith(other)
	{
		var thisMin = this.min();
		var thisMax = this.max();
		var otherMin = other.min();
		var otherMax = other.max();

		for (var d = 0; d < 2; d++)
		{
			var thisMinDimension = thisMin.dimensionByIndex(d);
			var thisMaxDimension = thisMax.dimensionByIndex(d);
			var otherMinDimension = otherMin.dimensionByIndex(d);
			var otherMaxDimension = otherMax.dimensionByIndex(d);

			var doThisAndOtherOverlapInDimension =
			(
				(
					thisMinDimension > otherMinDimension
					&& thisMinDimension < otherMaxDimension
				)
				||
				(
					thisMaxDimension > otherMinDimension
					&& thisMaxDimension < otherMaxDimension
				)
				||
				(
					otherMinDimension > thisMinDimension
					&& otherMinDimension < thisMaxDimension
				)
				||
				(
					otherMaxDimension > thisMinDimension
					&& otherMaxDimension < thisMaxDimension
				)
			);

			if (doThisAndOtherOverlapInDimension == false)
			{
				doAllDimensionOverlapSoFar = false;
				break;
			}
		}

		return doAllDimensionsOverlapSoFar;
	}

	// Clonable.

	clone()
	{
		return new Box
		(
			this.size.clone(),
			this.center.clone()
		);
	}

	overwriteWith(other)
	{
		this.size.overwriteWith(other.size);
		this.center.overwriteWith(other.center);
		return this;
	}
}
