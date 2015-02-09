Physics(function(world) {

  // bounds of the window
  var width = window.innerWidth,
    height = window.innerHeight/2;

  var viewportBounds = Physics.aabb(0, 0, width, height);

  console.log(height);

  // create a renderer
  var renderer = Physics.renderer('pixi', {
    el: 'physics', // The DOM element to append the stage to
    width: width,
    height: height,
    meta: true // Turns debug info on/off
  });

  // add the renderer
  world.add(renderer);
  // render on each step
  world.on('step', function() {
    world.render();
  });

  // add the interaction
  world.add(Physics.behavior('interactive', { el: renderer.container }));

  // some fun colors
  var colors = {
    darkGrey: '0x212121',
    white: '0xffffff',
    green: '0x8BC34A'
  };

  // scale relative to window width
  function S(n) {
    return n * window.innerWidth / 600;
  }

  // THE ZAC
  // the Z
  var z = Physics.body('compound', {
    x: width / 2 + -S(75),
    y: height / 2 - S(0),
    treatment: 'static',
    styles: {
      fillStyle: colors.white,
      lineWidth: 1,
      strokeStyle: colors.darkGrey,
      alpha: 0.0001 //pixi bug 0.0001 for transparent
    },
    children: [
      Physics.body('rectangle', {
        x: S(0),
        y: S(0),
        width: S(52),
        height: S(18)
      }), Physics.body('rectangle', {
        x: S(0),
        y: S(40),
        width: S(52),
        height: S(18)
      }), Physics.body('rectangle', {
        x: S(0),
        y: S(20),
        angle: -45 * Math.PI / 180,
        width: S(53),
        height: S(18)
      })
    ]
  });

  // the A
  var a = Physics.body('compound', {
    x: width / 2 + -S(15),
    y: height / 2 - S(-2),
    treatment: 'static',
    styles: {
      fillStyle: colors.white,
      lineWidth: 1,
      strokeStyle: colors.darkGrey,
      alpha: 0.0001 //pixi bug 0.0001 for transparent
    },
    children: [
      Physics.body('rectangle', {
        x: S(0),
        y: S(2),
        angle: -67 * Math.PI / 180,
        width: S(56),
        height: S(18)
      }), Physics.body('rectangle', {
        x: S(23),
        y: S(5),
        angle: -120 * Math.PI / 180,
        width: S(48),
        height: S(18)
      })
    ]
  });

  // the C
  var c = Physics.body('compound', {
    x: width / 2 + S(40),
    y: height / 2 - S(0),
    treatment: 'static',
    styles: {
      fillStyle: colors.white,
      lineWidth: 1,
      strokeStyle: colors.darkGrey,
      alpha: 0.0001 //pixi bug 0.0001 for transparent
    },
    children: [
      Physics.body('rectangle', {
        x: S(0),
        y: S(38),
        width: S(52),
        height: S(18)
      }), Physics.body('rectangle', {
        x: S(-17),
        y: S(20),
        angle: -90 * Math.PI / 180,
        width: S(53),
        height: S(18)
      }), Physics.body('rectangle', {
        x: S(0),
        y: S(0),
        width: S(52),
        height: S(18)
      })
    ]
  });

  // THE HI!
  // the H
  var h = Physics.body('compound', {
    x: width / 2 + S(-30),
    y: height / 2 - S(0),
    treatment: 'static',
    styles: {
      fillStyle: colors.white,
      lineWidth: 1,
      strokeStyle: colors.darkGrey,
      alpha: 1 //pixi bug 0.0001 for transparent
    },
    children: [
    Physics.body('rectangle', {
      x: S(-17),
      y: S(20),
      angle: -90 * Math.PI / 180,
      width: S(53),
      height: S(18)
    }), Physics.body('rectangle', {
      x: S(17),
      y: S(20),
      angle: -90 * Math.PI / 180,
      width: S(53),
      height: S(18)
    }), Physics.body('rectangle', {
      x: S(0),
      y: S(20),
      width: S(52),
      height: S(18)
    })
    ]
  });

  // the i
  var i = Physics.body('compound', {
    x: width / 2 + S(15),
    y: height / 2 - S(0),
    treatment: 'static',
    styles: {
      fillStyle: colors.white,
      lineWidth: 1,
      strokeStyle: colors.darkGrey,
      alpha: 1 //pixi bug 0.0001 for transparent
    },
    children: [
    Physics.body('rectangle', {
      x: S(-17),
      y: S(-22),
      width: S(18),
      height: S(18)
    }), Physics.body('rectangle', {
      x: S(-17),
      y: S(0),
      width: S(18),
      height: S(32)
    })
    ]
  });

  // the !
  var xcla = Physics.body('compound', {
    x: width / 2 + S(45),
    y: height / 2 - S(0),
    treatment: 'static',
    styles: {
      fillStyle: colors.white,
      lineWidth: 1,
      strokeStyle: colors.darkGrey,
      alpha: 1 //pixi bug 0.0001 for transparent
    },
    children: [
    Physics.body('rectangle', {
      x: S(-17),
      y: S(0),
      width: S(18),
      height: S(35)
    }), Physics.body('circle', {
      x: S(-17),
      y: S(35),
      radius: S(9)
    })
    ]
  });



  // create 300 circles placed randomly
  var l = 150;
  var circles = [];
  while (l--) {
    circles.push(Physics.body('circle', {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: S(4),
      mass: 1,
      restitution: 0.5,
      styles: {
        strokeStyle: colors.darkGrey,
        fillStyle: colors.green,
        lineWidth: 1
      }
    }));
  }

  world.add(circles);

  world.add([
    z, a, c
    // h,i, xcla
  ]);

  // when circles fall past the bottom. reset them
  function wrapY() {
    var b, i, l,
      h = height + 100,
      w = width / 2,
      x = w;

    for (i = 0, l = circles.length; i < l; i++) {
      b = circles[i];
      if (b.state.pos.y > height) {
        b.state.pos.y -= h;
        b.state.pos.x = x + w * (2 * Math.random() - 1);
        b.state.vel.zero();
      }
    }
  }

  world.on('step', wrapY);

  // slowly fade in zac
  function fadeIn() {
    z.view.alpha = 0;
    a.view.alpha = 0;
    c.view.alpha = 0;

    new TWEEN.Tween({
        alpha: 0
      })
      .to({
        alpha: 1
      }, 1000) // 1 sec fade
      .onUpdate(function() {
        z.view.alpha = this.alpha;
        a.view.alpha = this.alpha;
        c.view.alpha = this.alpha;
      })
      .start();
  }

  world.one('render', function() {
    // set the alpha on children to 1
    function setAlpha(c) {
      c.alpha = 1;
    }
    z.view.children.forEach(setAlpha);
    a.view.children.forEach(setAlpha);
    c.view.children.forEach(setAlpha);
    z.view.alpha = 0;
    a.view.alpha = 0;
    c.view.alpha = 0;

    // fade in after 4 seconds (3sec + 1sec fade)
    setTimeout(fadeIn, 3000);
  });

  // after 7 seconds do some more fun
  setTimeout(function() {
    // constrain objects to these bounds
    var edgeBounce = Physics.behavior('edge-collision-detection', {
      aabb: viewportBounds,
      restitution: 0,
      cof: 0.8
    });

    world.add(edgeBounce);

    // "detach" the zac
    z.treatment = a.treatment = c.treatment = 'dynamic';
    // wake up sleeping bodies
    world.wakeUpAll();
    world.off('step', wrapY);
  }, 7000);

  // add behaviors
  world.add([
    Physics.behavior('constant-acceleration'),
    Physics.behavior('body-impulse-response'),
    Physics.behavior('body-collision-detection'),
    Physics.behavior('sweep-prune')
  ]);

  // subscribe to ticker to advance the simulation
  Physics.util.ticker.on(function(time) {
    TWEEN.update();
    world.step(time);
  });
});
