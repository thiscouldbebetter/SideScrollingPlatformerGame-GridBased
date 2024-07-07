
class Universe
{
	constructor
	(
		display,
		inputTracker,
		timerHelper,
		world
	)
	{
		this.display = display;
		this.inputTracker = inputTracker;
		this.timerHelper = timerHelper;
		this.world = world;
	}

	initialize()
	{
		this.display.initialize(this);
		this.inputTracker.initialize(this);
		this.timerHelper.initialize(this);
		this.world.initialize(this);
	}

	updateForTimerTick()
	{
		this.world.updateForTimerTick(this);
	}
}
