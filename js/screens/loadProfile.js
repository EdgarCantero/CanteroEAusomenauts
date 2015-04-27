game.LoadProfile = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('load-screen')), -10); // TODO

        me.input.unbindKey(me.input.KEY.E);
        me.input.unbindKey(me.input.KEY.R);
        me.input.unbindKey(me.input.KEY.T);
        me.input.unbindKey(me.input.KEY.Y);
        me.input.unbindKey(me.input.KEY.SPACE);
        var exp1cost = ((game.data.exp1 + 1) * 10);
        var exp2cost = ((game.data.exp2 + 1) * 10);
        var exp3cost = ((game.data.exp3 + 1) * 10);
        var exp4cost = ((game.data.exp4 + 1) * 10);

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "ENTER YOUR USERNAME AND PASSWORD ", this.pos.x, this.pos.y);
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
       }
});


