# PocketGrid

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
- Compatible with CSS frameworks such as Twitter Bootstrap or Zurb Foundation (you can use the Bootstrap or Foundation components such as buttons, tabs, etc. with the Pocket grid for other layout)
- IE6 compatible with some polyfills (for border box-sizing and media queries compatibility)

**Note** : soon, a PocketGrid *Plus* version will be added to provide many useful features like centering, push/pull, offsets, swaping, gutter improvements...  
**Keep an eye on this project!** ;)

## QuickStart

You just have to include the `pocketgrid.css` file in your page!

## Example
The `/examples` directory will soon contain many complete examples.

### Nested grid example
Here is a quick nested grid example:

**Preview**  
![Nested grid](http://i.imgur.com/DYFRDP2.png)

**HTML file**  
```HTML
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
        </div>
        <div class="block footer">Footer</div>
    </div>
```

**CSS file**  
```CSS
    /* Blocks have a default size of 100%,
       so elements with a 100% size do not need to be redefined in the CSS. */
    .sidebar { width: 25%; }
    .content { width: 75%; }
    .item { width: 20%; } /* 20% => items on 5 columns */
```

### Responsive example
To make a responsive version of this example, we could just change the CSS file like that:

**CSS file**  
```CSS
/* Smartphone version:
   Nothing to write: blocks are 100% width by default, so all blocks will be put below each other. */

/* Tablet version:
   sidebar and content are side by side, with respectively 25% and 75% of the grid width,
   and there are 2 items per "row". */
@media (min-width: 768px) and (max-width: 959px) {
    .sidebar { width: 25%; }
    .content { width: 75%; }
    .item { width: 50%; } /* 50% => items on 2 columns */
}
/* Desktop version:
   sidebar and content are side by side, with respectively 20% and 80% of the grid width,
   and there are 5 items per "row". */
@media (min-width: 960px) {
    .sidebar { width: 20%; }
    .content { width: 80%; }
    .item { width: 20%; } /* 20% => items on 5 columns */
}
```

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
