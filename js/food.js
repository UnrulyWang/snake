/**
 * Created by Administrator on 2017/8/22.
 */
;(function(){
    var position='absolute';
    var elements=[];
    var colors=['red','yellow','blue','pink','gray','purple','white','orange','green']
    function Food(x,y,width,height){
        this.x=x||0;
        this.y=y||0;
        this.width=width||40;
        this.height=height||40;
        //this.color=color||'red';
    }
    //刷新方法
    Food.prototype.render=function(map){
        remove();
        this.color =colors[Math.floor(Math.random()*9)];
//            console.log(map);
        this.x=parseInt((Math.random() * map.offsetWidth-this.width)/this.width)*this.width;
        this.y=parseInt((Math.random() * map.offsetHeight-this.height)/this.height)*this.height;
        var div=document.createElement('div');
        map.appendChild(div);
        div.style.position=position;
        div.style.left=this.x+'px';
        div.style.top=this.y+'px';
        div.style.height=this.height+'px';
        div.style.width=this.width+'px';
        div.style.backgroundColor=this.color;
        div.style.borderRadius='50%';
        //把创建好的食物放入数组中；
        elements.push(div);
    }
    function remove(){
        for(var i=0;i<elements.length;i++){
            var element=elements[i];
            //清除元素存在的痕迹
            element.parentNode.removeChild(element);
            elements.splice(i,1);
        }
    }
    //全局中Food 等于现在这个Food
    window.Food=Food;
}());