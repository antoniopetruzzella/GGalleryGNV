
var distance=5;
var ang=0
var geoObjs=[];

function start(){
var factor=10;
var radarCircle = new AR.Circle(0.03, {
    horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.CENTER,
    opacity: 0.8,
    style: {
        fillColor: "#ffffff"
    }
}); 
var radardrawables = [];
radardrawables.push(radarCircle);	
var directionIndicatorDrawable = new AR.ImageDrawable(new AR.ImageResource("assets/indi.png"), 0.2, {
    enabled: true
});
var viewfinder = new AR.ImageDrawable(new AR.ImageResource("assets/viewfinder.png"),2,{

    enabled:true
});
var camera = new AR.ImageDrawable(new AR.ImageResource("assets/camera.png"),2,{
	
	enabled:true
});
var video = new AR.VideoDrawable("assets/GNV.mp4", 2, {
   translate: {
       x: 2,
       y: 0
   },
   enabled:false,
   onClick:function(){
       sala_bambini.enabled=false;
   	   video.play();
   	}
   });
var sala_bambini = new AR.ImageDrawable(new AR.ImageResource("assets/sala_bambini.png"),2,{

	enabled:true,
	onClick:function(){
	   video.enabled=true;
	   video.play();
	}
});
var shopping = new AR.ImageDrawable(new AR.ImageResource("assets/shopping.png"),2,{

	enabled:true,
});

viewfinder_geo=new AR.GeoObject(new AR.RelativeLocation(null,distance,0,0),{

    drawables:{
        cam:[viewfinder],
        indicator:directionIndicatorDrawable,
        radar:radardrawables
    },
   enabled:true,
   onClick:function(){

        camera_geo.enabled=true;
        sala_bambini_geo.enabled=true;
        shopping_geo.enabled=true;
   }
});
geoObjs.push(viewfinder_geo);
var camera_geo =new AR.GeoObject(new AR.RelativeLocation(null,0,distance,distance),{
    drawables:{
        cam:[camera],
		indicator: directionIndicatorDrawable,
        radar: radardrawables
    },
	enabled:false
});
geoObjs.push(camera_geo);
var sala_bambini_geo =new AR.GeoObject(new AR.RelativeLocation(null,0,distance*-1,0),{
    drawables:{
        cam:[sala_bambini,video],
		indicator: directionIndicatorDrawable,
        radar: radardrawables
    },
	enabled:false
});
geoObjs.push(sala_bambini_geo)
var shopping_geo =new AR.GeoObject(new AR.RelativeLocation(null,0,distance,0),{
    drawables:{
        cam:[shopping],
		indicator: directionIndicatorDrawable,
        radar: radardrawables
    },
	enabled:false
});
geoObjs.push(shopping_geo)
PoiRadar.show();
return null;
}	//QUI FINISCE START


function changeVFpos(direction){

    switch (direction){

        case "right":
            ang=-10;
            break;

        case "left":
            ang=10;
            break;
    }
    rad=ang*Math.PI/180;

    for (var i = 0; i<geoObjs.length;i++){
        var neweasting=Number(((geoObjs[i].locations[0].easting*Math.cos(rad))-(geoObjs[i].locations[0].northing*Math.sin(rad))).toFixed(2));
        var newnorthing=Number(((geoObjs[i].locations[0].easting*Math.sin(rad).toFixed(2))+(geoObjs[i].locations[0].northing*Math.cos(rad).toFixed(2))).toFixed(2));
        geoObjs[i].locations[0].easting=neweasting;
        geoObjs[i].locations[0].northing=newnorthing;
    }
    console.log(ang.toString()+"°  E: "+geoObjs[0].locations[0].easting+"  N: "+geoObjs[0].locations[0].northing)

}




//AR.context.onLocationChanged = start;
//AR.context.scene.minScalingDistance=1;