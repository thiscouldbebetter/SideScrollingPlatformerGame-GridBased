
class Level
{
	constructor
	(
		name,
		size,
		map,
		movers
	)
	{
		this.name = name;
		this.size = size;
		this.map = map;
		this.movers = movers;

		this.ticksSoFar = 0;
	}

	static demo()
	{
		var map = MapOfCells.demo();

		var mapCellDimensionInPixels = 20;
		var size = map.sizeInCells.clone().multiplyScalar(mapCellDimensionInPixels);

		var moverDefns = MoverDefn.Instances();

		var mapCellSizeInPixels = map.cellSizeInPixels;

		var moverPlayer = new Mover
		(
			moverDefns.Player.name,
			Disposition.fromPos(new Coords(2, 1).multiply(mapCellSizeInPixels) )
		);

		var moverEnemy = new Mover
		(
			moverDefns.Enemy.name,
			Disposition.fromPos(new Coords(4, 1).multiply(mapCellSizeInPixels) )
		); 

		var movers =
		[
			moverEnemy,
			moverPlayer
		];

		var level = new Level
		(
			"LevelDemo",
			size,
			map,
			movers
		);

		return level;
	}

	draw(universe, world, place)
	{
		universe.display.clear();
		this.map.draw(universe, world, place);
		this.movers.forEach(x => x.draw(universe, world, place) );
	}

	initialize(universe, world)
	{
		// todo
	}

	updateForTimerTick(universe, world, place)
	{
		if (this.ticksSoFar % 2 == 0)
		{
			this.draw(universe, world, place);
		}

		this.movers.forEach(x => x.updateForTimerTick(universe, world, place) );

		this.ticksSoFar++;
	}

}
