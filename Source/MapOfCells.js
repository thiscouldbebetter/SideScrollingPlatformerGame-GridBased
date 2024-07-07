
class MapOfCells
{
	constructor(sizeInCells, cellSizeInPixels, cells)
	{
		this.sizeInCells = sizeInCells;
		this.cellSizeInPixels = cellSizeInPixels;
		this.cells = cells;

		this._cellPosInCells = Coords.create();
		this._drawPos = Coords.create();
	}

	static demo()
	{
		var cellsAsStrings =
		[
			"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
			"x..............................x",
			"x..............................x",
			"x..............................x",
			"x..............................x",
			"x..............................x",
			"x..............................x",
			"x..............................x",
			"x..............................x",
			"x..............................x",
			"x..............................x",
			"x..............................x",
			"x..............................x",
			"x..............................x",
			"xxxxxxxxxxxxxxx..xxxxxxxxxxxxxxx",
		];

		var cellSizeInPixels = Coords.ones().multiplyScalar(20);

		var returnMap = MapOfCells.fromCellSizeInPixelsAndCellsAsStrings
		(
			cellSizeInPixels,
			cellsAsStrings
		);

		return returnMap;
	}

	static fromCellSizeInPixelsAndCellsAsStrings
	(
		cellSizeInPixels, cellsAsStrings
	)
	{
		var sizeInCells = new Coords
		(
			cellsAsStrings[0].length, cellsAsStrings.length
		);

		var cellPosInCells = Coords.create();

		var cells = [];

		for (var y = 0; y < sizeInCells.y; y++)
		{
			cellPosInCells.y = y;

			for (var x = 0; x < sizeInCells.x; x++)
			{
				cellPosInCells.x = x;

				var charForCell = cellsAsStrings[y][x];
				var cell = MapOfCellsCell.fromChar(charForCell);
				cells.push(cell);
			}
		}

		var returnMap = new MapOfCells
		(
			sizeInCells, cellSizeInPixels, cells
		);

		return returnMap;
	}

	cellAtPosInCells(cellPosInCells)
	{
		var cellIndex =
			cellPosInCells.y * this.sizeInCells.x + cellPosInCells.x;
		var cell = this.cells[cellIndex];
		return cell;
	}

	cellAtPosInPixels(cellPosInPixels)
	{
		return this.cellAtPosInCells
		(
			this._cellPosInCells.overwriteWith
			(
				cellPosInPixels
			).divide
			(
				this.cellSizeInPixels
			).floor()
		);
	}

	draw(universe, world, place)
	{
		var display = universe.display;

		var drawPos = this._drawPos;

		var cellPosInCells = Coords.create();

		for (var y = 0; y < this.sizeInCells.y; y++)
		{
			cellPosInCells.y = y;

			for (var x = 0; x < this.sizeInCells.x; x++)
			{
				cellPosInCells.x = x;

				var cell = this.cellAtPosInCells(cellPosInCells);
				var cellColor = cell.color();

				drawPos.overwriteWith
				(
					cellPosInCells
				).multiply
				(
					this.cellSizeInPixels
				);

				display.drawRectangleOfSizeAtPosWithColor
				(
					this.cellSizeInPixels,
					drawPos,
					cellColor
				);
			}
		}
	}
}

class MapOfCellsCell
{
	constructor(isBlocking)
	{
		this.isBlocking = isBlocking;
	}

	static fromChar(cellAsChar)
	{
		var isBlocking = (cellAsChar == "x");
		var cell = new MapOfCellsCell(isBlocking);
		return cell;
	}

	color()
	{
		var colors = Color.Instances();

		var returnColor =
			(this.isBlocking ? colors.Gray : colors.Transparent);

		return returnColor;
	}
}
