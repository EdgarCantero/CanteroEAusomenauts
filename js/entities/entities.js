game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }

            }]);
        this.body.setVelocity(5, 20);
        
         this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk"[195, 196, 197, 198, 199, 200], 80);

         this.renderable.setCurrentAnimation("idle");
    },
    update: function(delta) {
               if (me.input.isKeyPressed("right")) {
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.flipX(false);

        } else if (me.input.isKeyPressed('left')) {
            this.flipX(true);
            this.body.vel.x -= this.body.accel.x * me.timer.tick;

        } else {
            this.body.vel.x = 0;
        }
        
                
          if(!this.renderable.isCurrentAnimation("walk")){
            this.renderable.setCurrentAnimation("walk");
            }

        if (me.input.isKeyPressed('jump')) {
            if (!this.body.jumping && !this.body.falling) {
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                this.body.jumping = true;
            }
        }
        
        this.body.update(delta);
        
       this._super(me.Entity, "update", [delta]); 
       return true;
    }
});