 game.HeroDeathManager = Object.extend({
    init: function(x, y, settings) {

    },
    // this allows the Hero to respawn in the case of his death
    update: function() {
        if (game.data.player.dead) {
            me.game.world.removeChild(game.data.player);
            me.state.current().resetPlayer(10, 0);
        }

        return true;
    }
});



