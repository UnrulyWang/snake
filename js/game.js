/**
 * Created by Administrator on 2017/8/22.
 */
(function(){
    function Game(map){
        this.food=new Food();
        this.snake=new Snake();
        this.map=map;
        that=this;
    }
    Game.prototype.start=function(time){
        this.food.render(this.map);
        this.snake.render(this.map);
        //私有方法属于Game的
        runSnake(time);
        bindKey();

    };
    function runSnake(time){
        time=time||150;
        //注释一下 本来setinterval里面的this指向的是window 我们希望他指向game 所以用bind可以解决这个问题
        var timer=setInterval(function(){
            this.snake.move(this.food,this.map);
            //在渲染前先删除之前的蛇 移动了之后更新到地图上
            this.snake.render(this.map);
            //判断是否撞墙
            var maxX=(this.map.offsetWidth-this.snake.width)/this.snake.width;
            var maxY=(this.map.offsetHeight-this.snake.height)/this.snake.height;
            var headX=this.snake.body[0].x;
            var headY=this.snake.body[0].y;
            if(headX<0||headX>maxX){
                clearInterval(timer);
                alert('玩蛇不要碰到墙壁哟');
                location.href='04snake.html';
            }
            if(headY<0||headY>maxY){
                clearInterval(timer);
                alert('玩蛇不要碰到墙壁哟');
                location.href='04snake.html';
            }
        }.bind(that),time)
    }
    function bindKey(){
        //这里也是Game的私有方法 也用了bind来解决this的问题
        document.addEventListener('keydown',function(e){
            switch (e.keyCode){
                case 37:
                    // left
                    if(this.snake.direction==='right')return false;
                    this.snake.direction = 'left';
                    break;
                case 38:
                    // top
                    if(this.snake.direction==='bottom')return false;
                    this.snake.direction = 'top';
                    break;
                case 39:
                    // right
                    if(this.snake.direction==='left')return false;
                    this.snake.direction = 'right';
                    break;
                case 40:
                    // bottom
                    if(this.snake.direction==='top')return false;
                    this.snake.direction = 'bottom';
                    break;
                case 32:
                    //空格
                    alert('暂停一会');
                    break;
            }
        }.bind(that),false)
    }
    window.Game=Game;
}());