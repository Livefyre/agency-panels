# Agency Panels
A display that's meant to transition between panels of content and will autofit itself to the screen size.

## The HTML
The general structure of the panels looks like the following:

    <div id="panels">
        <div class="panel">
            <div class="panel-content">
                YOUR CONTENT GOES HERE
            </div>
        </div>
        <div class="panel">
            <div class="panel-content">
                How about an image? <br />
                <img src="http://path.to.your/image.png" />
            </div>
        </div>
    </div>

* `panels` wrapper: There should be an outer wrapper container with an id such that you can target it later with Javascript. In this example, we're calling it `panels` and will reference it later in other examples. This outer wrapper is the container in which all of the panels should live in.
* `panel`: This is the container for a single panel and is identified by the **class** `panel`. You can (and are encouraged) to have many panels as these are the individual elements which are displayed on screen. A panel will be autosized to fit the height and width of the browser window (and will resize accordingly). However, if content extends beyond the height or width of the panel, it will clip the content to preserve the look and feel.
* `panel-content` container: This is where your content should go and is identified by the **class** `panel-content`. By placing content in this section, your browser will automatically attempt to center it; both horizontally and vertically.

### Options HTML via data attributes
You can control the following aspects of the panel with the specified data attributes:
* Interval: The interval is how long a given panel is displayed on screen for and is specified by adding the `data-interval` data attribute to the `panel` element. If no interval is specified, then the default value is applied. The intervals must be specified in milliseconds (milliseconds = # of seconds x 1000) and whole, positive numbers. It should also be noted that this is strictly for how long the content will remain visible on screen and *does not* include the transition effect times.

    Ex: Panel A displays for 5 seconds while Panel B displays for 10 seconds
    
    ```
    <div id="panels">
        <div class="panel" data-interval="5000">
            <div class="panel-content">
                Panel A
            </div>
        </div>
        <div class="panel" data-interval="10000">
            <div class="panel-content">
                Panel B
            </div>
        </div>
    </div>
    ```

    EX: Panel A displays for the default time while Panel B displays for 5.5 seconds

    ```
    <div id="panels">
        <div class="panel">
            <div class="panel-content">
                Panel A
            </div>
        </div>
        <div class="panel" data-interval="5500">
            <div class="panel-content">
                Panel B
            </div>
        </div>
    </div>
    ```

## Javascript
The basic JS you'll need to get the panels slider to work:

The code:

    window.panels = new Panels({
        el: document.getElementById("panels")
    });

* `el`: The element (either a JQuery object or plain JS reference object) where you've defined the `panels` container element and is the only **required** parameter passed to the constructor. It doesn't necessarily need to be called `panels`, as you can just change the ID that you're targeting.. but for our purposes, it makes sense to do so.    
* `window.panels`: You don't need to set a global variable, but it's nice in case you want to reference the methods that are available (helpful when deving).

### Constructor options:
These are the configuration options you can pass into the constructor that will modify the default behavior of Panels.

* `autoAdvance`: Whether or not the panels automatically advance after a set amount of time. Options are `true` or `false`, with the default as `true`.
* `advanceInterval`: The default timing for how long a panel will be on-screen before it is transitioned out. The values must be in milliseconds and whole, round numbers greater than 2000 (the amount of time required to transition in and out). The default is 10000 milliseconds (10 seconds);
* `refreshCycle`: How many full cycles must pass before the browser refreshes the experience. A full cycle is considered running through all of the defined panels once, but is technically only ever counted upon after transition out of the last panel. This is a helpful option if you plan on displaying content on large, passive screens for extended periods of time (> 1 hour). To disable it, set it to 0 or exclude the option;
* `visualTimer`: Whether or not to display the visual timer bar along the bottom. This bar is a visual indication of how much time is left until the panel transitions out. Possible values are `true` or `false, with the default being `true`.

Ex: Default interval for panels set at 10 seconds with a refresh cycle every 20 rotations

    window.panels = new Panels({
        el: document.getElementById("panels"),
        advanceInterval: 10000,
        refreshCycle: 20
    });

### API
These methods are available to use with a reference to the Panels instance. For the below examples, assume we have a global reference of a `panels` instance via something like `window.panels`.

* `panels.next()`: Go to the next panel. If you're at the beginning, it'll wrap to the last panel.
* `panels.prev()`: Go to the previous panel. If you're at the end, it'll wrap to the first panel.
* `panels.goTo(panel #)`: Go to a specified panel, designated by the `panel #` passed into the method. The `panel #` must be a positive, whole number. Additionaly, this uses a 11based index (as opposed to a 0-based index) and clamps you only valid panels (i.e. you can't go to panel 10 if there are only 9 panels)
* `panels.stop`: Stops the panels from advance by canceling the timer.
* `panels.resume`: Starts the panel advancement again.

### Events
The following are events that Panels fires. All events fired will pass the typical Event Object as the *first* parameter, and if applicable, any additional information as subsequent paraemeters. You can attach listeners to react to them in the following manner:

    panels.$el.on("[event name]", function (evt) { /* Do Cool Stuff */});

* `transitionEnter.panels`: This event fires when the panel's "enter" animation begins.

    Parameters:
    * `evt`: Event Object
    * `panelIdx`: The index of the panel that the enter transition is being applied to. This is a 0-based index.
    

* `transitionExit.panels`: This event fires when the panel's "exit" animation begins.

    Parameters:
    * `evt`: Event Object
    * `panelIdx`: The index of the panel that the exit transition is being applied to. This is a 0-based index.
    

## Hotkeys
Convenience options for manually playing with Panels.

* Left Arrow Key: Move to the *previous* panel. If you're at the beginning, it'll wrap to the last panel.
* Right Arrow Key: Move to the *next* panel. If you're at the last, it'll wrap to the first panel.
* "s" Key: A key to toggle the advancement. If stopped, it'll resume. If running, it'll stop it.

## Development
To do any development on it, you'll need to grab (a.k.a. clone) the code and install...
* Node (and if for some reason it's not packaged with Node, NPM)
* Bower
* Ruby
* SASS

Once you've got those installed, go to the cloned directory and do the following:

    npm install

You should see lots of stuff get installed. If you want to start up the server, do the following:

    npm start

Should you need to just do a build for some reason, do this:

    npm run build

