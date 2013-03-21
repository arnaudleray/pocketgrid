# PocketGrid

## About

PocketGrid is the smallest responsive grid system having so many features:
- **Lightweight**: about 0.5kB!
- **Pure CSS-only** (no CSS preprocessor needed)
- **Fluid** (by default, but you could change the width or max-width if you want)
- **Responsive**
- **Unlimited number of breakpoints** (you can define your own Media Queries)
- **Mobile-first compatible** (but not mandatory)
- **Semantic** (as much as a pure CSS grid could be ;) )
- **Very simple** (just have to define blocks and groups of blocks)
- **Unlimited number of columns** (no 12 or 16 columns restrictions: blocks just require a width in percentage)
- Supports unlimited **nested grids**
- Manage consistent **gutters** (gutters can be defined pixels or ems, which is better than percentage-based solutions because it allows consistent gutters even in nested grids)
- No dependencies
- Compatible with CSS frameworks such as Twitter Bootstrap or Zurb Foundation (you can use the Bootstrap or Foundation components and the Pocket grid)
- IE6 compatible with some polyfills (for border box-sizing and media queries compatibility)

## QuickStart

You just have to include the `pocketgrid.css` file in your page!

## Example
See the `/examples` directory for complete examples.

Here is a quick nested grid example:
**Preview**
![Nested grid](http://i.imgur.com/DYFRDP2.png)

**HTML file**
    <div class="block-group">
        <div class="block header">Header</div>
        <div class="block sidebar">Sidebar</div>
        <div class="block-group content"><!-- nested grid -->
            <div class="block nheader">Nested header</div>
            <div class="block item">Block 1</div>
            <div class="block item">Block 2</div>
            <div class="block item">Block 3</div>
            <div class="block item">Block 4</div>
            <div class="block item">Block 5</div>
            <div class="block item">Block 6</div>
        </div>
        <div class="block footer">Footer</div>
    </div>

**CSS file**
    /* blocks have a default size of 100%. */
    .sidebar { width: 25%; }
    .content { width: 75%; }
    .item { width: 20%; }

## Compatibility
By default, the Pocket Grid is compatible with **IE8+, Firefox, Google Chrome, Safari, Opera, and mobile browsers (iPhone, iPad, Android...)**
For **IE6+ compatibility**, you can use these 2 polyfills:
- Media Queries: https://github.com/scottjehl/Respond
- Box-sizing: https://github.com/Schepp/box-sizing-polyfill

## Author

**Arnaud Leray**

## Copyright and license

Copyright 2013 Arnaud Leray.

Licensed under the MIT License:
[http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT)
Basically, you can do whatever you want as long as you include the original copyright.
