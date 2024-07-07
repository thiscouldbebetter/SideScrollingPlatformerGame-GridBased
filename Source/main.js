
function main()
{
	var displaySizeInPixels = new Coords(400, 300);
	var display = new Display(displaySizeInPixels);
	var inputTracker = new InputTracker();
	var timerHelper = new TimerHelper(50);
	var world = World.demo();
	var universe = new Universe
	(
		display,
		inputTracker,
		timerHelper,
		world
	);
	universe.initialize();
}
