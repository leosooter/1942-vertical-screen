
$(document).ready(function() {
  console.log("JQuery has loaded");

  //Hide smoke trails on all planes
  $(".smoke-trail").hide();
  //
  var enemyCount = 1;

  function generateEnemy(){
    rand1 = Math.floor(Math.random()*10)*50 + 50;
    console.log(rand1);
    var enemyId = "#enemy" + enemyCount;
    var enemy = '<div id="enemy' + enemyCount + '" class="enemy jet"><div id="enemy' + enemyCount + '-top" class="jet-top"></div><div id="enemy' + enemyCount + '-side" class="jet-side"></div></div>';
    $("#game-screen").prepend(enemy);
    $(enemyId).css("margin-top", rand1 + "px");
    setTimeout(function(){
      $(enemyId).css("margin-left", "-100px");
    }, 100);
    enemyCount ++;
    setTimeout(function(){
      $(enemyId).remove();
      enemyCount --;
    }, 6000);
    setTimeout(function(){
      generateEnemy();
    },7000);
  }

  generateEnemy();

  var enemy = '<div id="enemy' + enemyCount + '" class="enemy jet"><div id="enemy' + enemyCount + '-top" class="jet-top"></div><div id="enemy' + enemyCount + '-side" class="jet-side"></div></div>';
  $("#game-screen").prepend(enemy);
  setTimeout(function(){
    $("#enemy1").css("margin-top", "850px");
  }, 100);

  function moveGround(){
    $("#ground").addClass('move-down');
    setTimeout(function(){
      $("#ground").removeClass('speed-on');
      $("#ground").removeClass('move-down');
      setTimeout(function(){
        $("#ground").addClass('speed-on');
        moveGround();
      },30);
    }, 9970);
  }
  moveGround();
  //var missile = "<div class='missile'></div>";
  var missileCount = 0;
  var wing = 1;

  var player = {
    id : $("#player"),
    topId : $("#player-top"),
    sideId : $("#player-side"),
    life : 1,
    yAxis : 300,
    xAxis : 50,
    topDeg : 0,
    sideDeg : 90,
    moveRight : function(){
      wing = -20;
      this.topDeg -= 50;
      this.sideDeg -= 50;
      player.topId.css("transform", "rotateX(" + this.topDeg + "deg)");
      player.sideId.css("transform", "rotateX(" + this.sideDeg + "deg)");
      this.yAxis += 50;
      this.xAxis += 50;
      this.id.css("transform", "rotate(15deg)");
      this.id.css("margin-top", this.yAxis + "px");
      this.id.css("margin-left", this.xAxis + "px");
      
      setTimeout(function(){
        player.topDeg += 50;
        player.sideDeg += 50;
        player.xAxis -= 50;
        player.id.css("transform", "rotate(0deg)");
        player.topIdid.css("transform", "rotateX(" + player.topDeg + "deg)");
        player.sideId.css("transform", "rotateX(" + player.sideDeg + "deg)");
        player.id.css("margin-left", player.xAxis + "px");
        wing = -10;
      }, 400);

    },
    moveLeft : function(){
      wing = 20;
      this.topDeg += 50;
      this.sideDeg += 50;
      player.topId.css("transform", "rotateX(" + this.topDeg + "deg)");
      player.sideId.css("transform", "rotateX(" + this.sideDeg + "deg)");
      this.yAxis -= 50;
      this.id.css("transform", "rotate(-15deg)");
      this.id.css("margin-top", this.yAxis + "px");
      setTimeout(function(){
        player.topDeg -= 50;
        player.sideDeg -= 50;
        player.id.css("transform", "rotate(0deg)");
        player.topId.css("transform", "rotateX(" + player.topDeg + "deg)");
        player.sideId.css("transform", "rotateX(" + player.sideDeg + "deg)");
        wing = +10;
      }, 400);
    },
    rollRight : function(){
      wing = -150;
      this.topDeg -= 360;
      this.sideDeg -= 360;
      this.topId.css("transform", "rotateX(" + this.topDeg + "deg)");
      this.sideId.css("transform", "rotateX(" + this.sideDeg + "deg)");
      this.yAxis += 250;
      this.id.css("transform", "rotate(20deg)");
      this.id.css("margin-top", this.yAxis + "px");
      setTimeout(function(){
        player.id.css("transform", "rotate(0deg)");
        wing = -10;
      }, 400);
    },
    rollLeft : function(){
      wing = 150;
      this.topDeg += 360;
      this.sideDeg += 360;
      this.topId.css("transform", "rotateX(" + this.topDeg + "deg)");
      this.sideId.css("transform", "rotateX(" + this.sideDeg + "deg)");
      this.yAxis -= 250;
      this.id.css("transform", "rotate(-20deg)");
      this.id.css("margin-top", this.yAxis + "px");
      setTimeout(function(){
        player.id.css("transform", "rotate(0deg)");
        wing = 10;
      }, 400);
    },
    roll90Right : function(){

    }
  };

  player.id.click(function(){
    if(player.life < 4){
      $("#player-smoke-" + player.life).show();
      player.life += 1;
    }
    else{
      endGame();
    }
  });
  function endGame(){
    console.log("endGame");
    player.id.empty();
    player.id.addClass('explode-player');
    player.id.css("margin-top", (player.yAxis - 70) + "px");
  }

  $(document).keydown(function(event){
    console.log(event.which);
    if(event.which === 37 && event.shiftKey){
      if(player.yAxis - 250 > -50){
        player.rollLeft();
      }
      else if(player.yAxis - 50 > -50){
        player.moveLeft();
      }
    }
    else if(event.which === 39 && event.shiftKey){
      if(player.yAxis + 250 < 750){
        player.rollRight();
      }
      else if(player.yAxis + 50 < 750){
        player.moveRight();
      }
    }
    else if(event.which === 37){
      if(player.yAxis - 50 > -50){
        player.moveLeft();
      }
    }
    else if(event.which === 38){
      player.roll90Left();
    }
    else if(event.which === 39){
      if(player.yAxis + 50 < 750){
        player.moveRight();
      }
    }
    else if(event.which === 40){
      player.roll90Right();
    }
    else if(event.which === 32){
      //debugger;
      //console.log("space");
      missileCount ++;
      var missile = "<div id='missile"+ missileCount +"' class='missile'></div>";
      var missileId = "#missile" + missileCount;
      $("#game-screen").prepend(missile);
      $(missileId).css("margin-top", ((player.yAxis + 30) + wing) + "px");
      console.log("plane " + (player.yAxis + 30) + " missile start " + ((player.yAxis + 30) + wing) + "");
      setTimeout(function(){
        $(missileId).css("margin-top", "0");
        $(missileId).css("margin-top", (player.yAxis + 30) + "px");
        console.log("offet = " + ($("#enemy1").offset().top + 100));
        //Calculates time missile will need to fly to reach target from enemy offset from top
        var dist = 1.5 * (750 - ($("#enemy1").offset().top + 100));
        console.log(dist);
        var target = "#enemy" + 1;
        missileStrike(missileId, dist, target);
      },30);
      return false;
    }
  });
  function missileStrike(id, dist, target){
    setTimeout(function(){
      console.log(id);
      console.log(target);
      $(id).remove();
      $(target).empty();
      $(target).css("margin-top", (player.yAxis - 70) + "px");
      $(target).addClass('explode-enemy');
      $(target).css("opacity", "0");
    }, dist);
  }
});
