/**
 * demo1.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */

/**
 * Equation of a line.
 */
const lineEq = (y2, y1, x2, x1, currentVal) => {
    var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
    return m * currentVal + b;
};

const gridItems = Array.from(document.querySelectorAll('.itemAnimate'));
const distanceThreshold = {min: 0, max: 250};
const grayscaleInterval = {from: 1, to: 0};

gridItems.forEach((item) => {
    const img = item.querySelector('.hoverAnimate');

    new Nearby(img, {
        onProgress: (distance) => {
            const bw = lineEq(grayscaleInterval.from, grayscaleInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
            
            TweenMax.to(img, 1, {
                ease: Power2.easeOut,
                filter: `grayscale(${Math.min(bw,grayscaleInterval.from)})`
            });

        }
    });
});

