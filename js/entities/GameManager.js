game.GameTimerManager = Object.extend({
    init: function(x, y, settings) {
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
    },
    
    update: function() {
        this.now = new Date().getTime();
        this.goldTimerCheck();
        this.creepTimerCheck();

        return true;
    },
    
    goldTimerCheck: function(){
        if (Math.round(this.now / 1000) % 20 === 0 && (this.now - this.lastCreep >= 1000)) {
           game.data.gold += 1;
           console.log("Current gold: " + game.data.gold);
        }
    },
    
    creepTimerCheck: function(){
             if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
            me.game.world.addChild(creepe, 5);
        }
    }   
});

game.HeroDeathManager = Object.extend({
    init: function(x, y, settings){
        
    },
    
    update: function(){
        if(game.data.player.dead){
            me.game.world.removeChild(game.data.player);
            me.state.current().resetPlayer(10, 0);
        }
        
        return true;
    }
});

game.ExperienceManager = Object.extend({
    init: function(x, y, settings){
        this.alwaysUpdate = true;
        this.gameover = false;
    },
    
    update:function(){
        if(game.data.win === true && !this.gameover){
            this.gameOver(true);
        }else if(game.data.win === false && !this.gameover){
            this.gameOver(false);
        }
      
        return true;
    },
    
    gameOver: function(win){
        if(win){
            game.data.exp += 10;
        }else{
            game.data.exp += 1;
        }
        
        this.gameover = true;
        me.save.exp = game.data.exp;
    }
    
});

game.SpendGold = Object.extend({
   init:function(x, y, settings){
        this.now = new Date().getTime();
        this.lastBuy = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;  
        this.updateWhenPaused = true;
        this.buying = false;
   }, 
   
   update: function(){
       this.now = new Date().getTime();
       
       if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >=1000){
           this.lastBuy = this.now;
           if(!this.buying){
               this.startBuying();
           }else{
               this.stopBuying();
           }
           
       }
       
       return true;
   },
   
   startBuying: function(){
       this.buying = true;
       me.state.pause(me.state.PLAY);
       game.data.pausePos = me.game.viewport.localToWorld(0, 0);
       game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
       game.data.buyscreen.updateWhenPaused = true;
       game.data.buyscreen.setOpacity(0.8);
       me.game.world.addChild(game.data.buyscreen, 34);
       game.data.player.body.setVelocity(0, 0);
       me.input.bindKey(me.input.KEY.F1, "F1", true);
       me.input.bindKey(me.input.KEY.F2, "F2", true);
       me.input.bindKey(me.input.KEY.F3, "F3", true);
       me.input.bindKey(me.input.KEY.F4, "F4", true);
       me.input.bindKey(me.input.KEY.F5, "F5", true);
       me.input.bindKey(me.input.KEY.F6, "F6", true); 
       this.setBuyText();
   },
   
   setBuyText: function(){
    game.data.buytext = new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");
                this.guide = new me.Font("Lucida Calligraphy", 35, "gold");
                this.updateWhenPaused = true;
                this.alwaysUpdate = true;
            },
            draw: function(renderer) {
                this.guide.draw(renderer.getContext(), "PRESS F1-F6 TO BUY,  PRESS E TO Exit. Current Gold: " + game.data.gold, this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "F1; Skill 1: Increase damage", this.pos.x + 20, this.pos.y + 70);
                this.font.draw(renderer.getContext(), "F2; Skill 2: Run Faster", this.pos.x + 20, this.pos.y + 110);
                this.font.draw(renderer.getContext(), "F3; Skill 3: Increase Health", this.pos.x + 20, this.pos.y + 150);
                this.font.draw(renderer.getContext(), "F4; Z Ability", this.pos.x + 20, this.pos.y + 190);
                this.font.draw(renderer.getContext(), "F5; X Ability", this.pos.x + 20, this.pos.y + 230);
                this.font.draw(renderer.getContext(), "F6; C Ability", this.pos.x + 20, this.pos.y + 270);
                
            }, 
            update: function(){
                return true;
            }

        })); 
        me.game.world.addChild(game.data.buytext, 35);
   },
   
   stopBuying: function(){
       this.buying = false;
       me.state.resume(me.state.PLAY);
       game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
       me.game.world.removeChild(game.data.buyscreen);
       me.input.unbindKey(me.input.KEY.F1, "F1", true);
       me.input.unbindKey(me.input.KEY.F2, "F2", true);
       me.input.unbindKey(me.input.KEY.F3, "F3", true);
       me.input.unbindKey(me.input.KEY.F4, "F4", true);
       me.input.unbindKey(me.input.KEY.F5, "F5", true);
       me.input.unbindKey(me.input.KEY.F6, "F6", true);
       me.game.world.removeChild(game.data.buytext);
   }
   
   
   
});

