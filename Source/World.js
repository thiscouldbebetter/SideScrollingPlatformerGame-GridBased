
class World
{
	constructor(name, places)
	{
		this.name = name;
		this.places = places;

		this.placeCurrentIndex = null;
		this.placeNextIndex = 0;
	}

	static demo()
	{
		var levelDemo = Level.demo();
		var placeLevelDemo = new PlaceLevel(levelDemo);
		var places = [ placeLevelDemo ];
		var returnWorld = new World("WorldDemo", places);
		return returnWorld;
	}

	placeCurrent()
	{
		return (this.placeCurrentIndex == null ? null : this.places[this.placeCurrentIndex] );
	}

	initialize(universe)
	{
		// todo
	}

	updateForTimerTick(universe)
	{
		if (this.placeNextIndex != null)
		{
			var placeCurrent = this.placeCurrent();
			if (placeCurrent != null)
			{
				placeCurrent.finalize(universe, this);
			}

			this.placeCurrentIndex = this.placeNextIndex;
			this.placeNextIndex = null;

			placeCurrent = this.placeCurrent();
			placeCurrent.initialize(universe, this);

		}

		var placeCurrent = this.placeCurrent();
		placeCurrent.updateForTimerTick(universe, this);
	}
}
