
class InputTracker
{
	constructor()
	{
		this.keysPressed = [];
	}

	initialize(universe)
	{
		var d = document;
		var body = d.body;
		body.onkeydown = this.handleEventKeyDown.bind(this);
		body.onkeyup = this.handleEventKeyUp.bind(this);
	}

	// Handlers.

	handleEventKeyDown(event)
	{
		var key = event.key;
		if (this.keysPressed.indexOf(key) == -1)
		{
			this.keysPressed.push(key);
		}
	}

	handleEventKeyUp(event)
	{
		var key = event.key;
		var indexOfKey = this.keysPressed.indexOf(key);
		if (indexOfKey >= 0)
		{
			this.keysPressed.splice(indexOfKey, 1);
		}
	}

}
