
class Color
{
	constructor(name, systemColor)
	{
		this.name = name;
		this.systemColor = systemColor;
	}

	static Instances()
	{
		if (Color._instances == null)
		{
			Color._instances = new Color_Instances();
		}
		return Color._instances;
	}

	static byName(name)
	{
		return Color.Instances().byName(name);
	}
}

class Color_Instances
{
	constructor()
	{
		this.Black = new Color("Black", "Black");
		this.Blue = new Color("Blue", "Blue");
		this.Gray = new Color("Gray", "Gray");
		this.Red = new Color("Red", "Red");
		this.Transparent = new Color("Transparent", "rgba(0, 0, 0, 0)");

		this._All =
		[
			this.Black,
			this.Blue,
			this.Gray,
			this.Red,
			this.Transparent
		];

		this._AllByName = new Map(this._All.map(x => [x.name, x]) );
	}

	byName(name)
	{
		return this._AllByName.get(name);
	}
}
