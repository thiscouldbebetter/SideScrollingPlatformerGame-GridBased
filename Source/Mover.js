
class Mover
{
	constructor(defnName, disp)
	{
		this.defnName = defnName;
		this.disp = disp;

		this.constraintGravity = new Constraint_Gravity(new Coords(0, 0.1) );
		this.constraintSolid = new Constraint_Solid();
	}

	defn()
	{
		return MoverDefn.byName(this.defnName);
	}

	draw(universe, world, place)
	{
		var defn = this.defn();
		defn.visual.draw(universe, world, place, this);
	}

	grounded(universe, world, place)
	{
		var level = place.level;
		var map = level.map;
		var disp = this.disp;
		var pos = disp.pos;
		var cellOccupied = map.cellAtPosInPixels(pos);
		var isGrounded =
			(cellOccupied != null && cellOccupied.isBlocking);
		return isGrounded;
	}

	updateForTimerTick(universe, world, place)
	{
		var defn = this.defn();

		var actor = defn.actor;
		actor.activity.perform(universe, world, place, this);

		var physics = defn.physics;

		var disp = this.disp;
		var accel = disp.accel;
		var vel = disp.vel;
		var pos = disp.pos;
		var posPrev = disp.posPrev;

		var moverIsGrounded =
			this.grounded(universe, world, place);

		if (moverIsGrounded == false)
		{
			this.constraintGravity
				.constrain(universe, world, place, this);
		}

		vel.add(accel).trimToMagnitudeMax(physics.speedMax);
		accel.clear();
		posPrev.overwriteWith(pos);

		var isThereACollision = false;
		do
		{
			pos.overwriteWith(posPrev).add(vel);
			isThereACollision =
				this.constraintSolid.constrain(universe, world, place, this);
			if (isThereACollision)
			{
				vel.half();
			}
		} while (isThereACollision)

		var levelSize = place.level.size;
		if (pos.isInRangeMax(levelSize) == false)
		{
			if (pos.y > levelSize.y)
			{
				document.write("You lose!");
			}
			else if (pos.x > levelSize.x)
			{
				document.write("You win!");
			}
		}

	}
}

class MoverDefn
{
	constructor(name, actor, constraints, physics, visual)
	{
		this.name = name;
		this.actor = actor;
		this.constraints = constraints;
		this.physics = physics;
		this.visual = visual;
	}

	static Instances()
	{
		if (MoverDefn._instances == null)
		{
			MoverDefn._instances = new MoverDefn_Instances();
		}
		return MoverDefn._instances;
	}

	static byName(name)
	{
		return MoverDefn.Instances().byName(name);
	}
}

class MoverDefn_Instances
{
	constructor()
	{
		var physics = MoverDefnPhysics.default();

		var moverSize = new Coords(10, 20);

		var colors = Color.Instances();

		var constraintsStandard = 
		[
			new Constraint_Gravity(new Coords(0, 0.3) ),
			new Constraint_Solid()
		];

		var v = (color) =>
		{
			var visual = VisualRectangle.fromColorNameAndSize(color.name, moverSize);
			var offset = new Coords(0, 0 - moverSize.y);
			visual = new VisualOffset(offset, visual);
			return visual;
		}

		this.Enemy = new MoverDefn
		(
			"Enemy",
			new Actor
			(
				new Activity
				(
					"Enemy",
					() => {} // perform
				)
			),
			constraintsStandard,
			physics,
			v(colors.Red),
		);

		this.Player = new MoverDefn
		(
			"Player",
			new Actor
			(
				new Activity
				(
					"Player",
					(u, w, p, e) =>
					{
						var inputTracker = u.inputTracker;
						var keysPressed = inputTracker.keysPressed;
						for (var k = 0; k < keysPressed.length; k++)
						{
							var pos = e.disp.pos;

							var keyPressed = keysPressed[k];
							if (keyPressed.startsWith("Arrow") )
							{
								if (keyPressed.endsWith("Right") )
								{
									pos.addXY(1, 0);
								}
								else if (keyPressed.endsWith("Left") )
								{
									pos.addXY(-1, 0);
								}
								else if (keyPressed.endsWith("Up") )
								{
									var grounded = e.grounded(u, w, p, e);
									if (grounded)
									{
										e.disp.vel.addXY(0, -3);
									}
								}

							}
						}
					}
				)
			),
			constraintsStandard,
			physics,
			v(colors.Blue)
		);

		this._All =
		[
			this.Enemy,
			this.Player
		];

		this._AllByName = new Map(this._All.map(x => [x.name, x] ) );
	}

	byName(name)
	{
		return this._AllByName.get(name);
	}
}

class MoverDefnPhysics
{
	constructor
	(
		accelWalk,
		accelJump,
		speedMaxWalk,
		speedMaxFly,
		collider
	)
	{
		this.accelWalk = accelWalk;
		this.accelJump = accelJump;
		this.speedMaxWalk = speedMaxWalk;
		this.speedMaxFly = speedMaxFly;
		this.collider = collider;
	}

	static default()
	{
		var size = new Coords(10, 20);

		var collider = new Box
		(
			size, Coords.create()
		);

		var returnValue = new MoverDefnPhysics
		(
			0.1, // accelWalk
			0.5, // accelJump
			1, // speedMaxWalk
			3, // speedMaxFly
			collider
		);

		return returnValue;
	}
}
