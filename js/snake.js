/**
 * Created by Administrator on 2017/8/22.
 */
(function(){
    var position='absolute';
    //用于帮助选中后清理的
    var elements=[];
    //用来存储方向的
    var direlements=[];
    function Snake(width,height,direction){
        //设置每一个蛇节的宽度
        this.i=0;
        this.width=width||40;
        this.height=height||40;
        //蛇的每一部分 ，第一部分是蛇头
        this.body=[
            {x:3,y:2,color:'red',innerHTML:'蛇'},
            {x:2,y:2,color:'blue'},
            {x:1,y:2,color:'green'}
        ];
        this.direction=direction||'right'
    }
    Snake.prototype.render=function(map){
        //每次执行刷新就把之前的蛇都删除掉
        remove();

        for(var i=0;i<this.body.length;i++){
            var obj=this.body[i];
            var div=document.createElement('div');
            map.appendChild(div);
            div.style.width=this.width+'px';
            div.style.height=this.height+'px';
            div.style.position=position;
//                    console.log(obj.color);
            div.style.backgroundColor = obj.color;
            div.style.left=obj.x*this.width+'px';
            div.style.top=obj.y*this.height+'px';
            div.style.borderRadius='50%';
            if(i==0){
                div.innerHTML=obj.innerHTML;
                div.style.textAlign='center';
                div.style.lineHeight=this.height+'px';
            }
            else{
                div.style.boxSizing='border-box';
                if(this.body[i].y==this.body[i-1].y){
                    div.style.padding='5px 0px';
                }
                else if(this.body[i].x==this.body[i-1].x){
                    div.style.padding='0px 5px';
                }

                div.style.backgroundClip='content-box';
            }
            elements.push(div);
        }

    }

    //让蛇自己动起来
    Snake.prototype.move=function(food,map){
        var secondX=this.body[1].x*this.width;
        var secondY=this.body[1].y*this.height;
        //让蛇身体的每一部分都往前一个的移动一下 this.body里面 值大在上面
        var i=this.body.length-1;
        for(;i>0;i--){
            this.body[i].x=this.body[i-1].x;
            this.body[i].y=this.body[i-1].y;
        }
        //根据移动的方向来决定蛇头 如何处理；
        switch (this.direction){
            case 'left':
                this.body[0].x-=1;
                break;
            case 'right':
                this.body[0].x+=1;
                break;
            case 'top':
                this.body[0].y-=1;
                break;
            case 'bottom':
                this.body[0].y+=1;
                break;
        }
        direlements.push(this.direction);
        //在移动过程中
        var headX=this.body[0].x*this.width;
        var headY=this.body[0].y*this.height;
        //这是触碰事件
        for(var i=3;i<this.body.length;i++){
            if(headX===this.body[i].x*this.width&&headY===this.body[i].y*this.height) {
                alert('玩蛇不用撞到自己哦');
                location.href='04snake.html';
                break;
            }
            //return false;

        }
        if(headX===food.x&&headY===food.y){
            //代表蛇头和食物重合了 下回合要移动的最后一个位置现在变成舌身子了
            var last=this.body[this.body.length-1];
            this.body.push({
                x:last.x,
                y:last.y,
                color:food.color
            });
            // 把现在的食物对象删除，并重新随机渲染一个食物对象
            food.render(map);
            this.i++;
            console.log(this.i);
            document.querySelector('.score').innerHTML=this.i;

        }
    };
    //蛇的删除方法
    function remove(){
        for(var i=elements.length-1;i>=0;i--){
            //清除页面中的div
            elements[i].parentNode.removeChild(elements[i]);
            //把数组中的也清除
            elements.splice(i,1);
        }
    }
    window.Snake=Snake;
}());