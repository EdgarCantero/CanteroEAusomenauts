game.NewProfile = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10); // TODO

        document.getElementById("input").style.visibility = "visible";
        document.getElementById("register").style.visibility = "visible";

        me.input.unbindKey(me.input.KEY.E);
        me.input.unbindKey(me.input.KEY.R);
        me.input.unbindKey(me.input.KEY.T);
        me.input.unbindKey(me.input.KEY.Y);
        me.input.unbindKey(me.input.KEY.SPACE);

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "PICK A USERNAME AND PASSWORD ", this.pos.x, this.pos.y);
            }, 
            update: function(){
                return true;
            }

        })));
 
        
   },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
       document.getElementById("input").style.visibility = "hidden";
       document.getElementById("register").style.visibility = "hidden";
    }
});



