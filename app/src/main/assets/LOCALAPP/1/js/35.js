
var dimensione=0.7;
var dimensione_scritta=0.5;
var dimensione_finder=2;
var ang=0
var geoObjs=[];

function start(){
/*
    $("#skipintrodiv").click(function () {

        $("#introdiv").hide();
        $("#skipintrodiv").hide();
        $("#console").show();
    });
*/
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


    var directionIndicatorDrawable = new AR.ImageDrawable(new AR.ImageResource("assets/indi.png"), 0.1, {
        enabled: true

    });
    var viewfinder = new AR.ImageDrawable(new AR.ImageResource("assets/bar.jpg"),dimensione_finder,{
        opacity:0.5,
        enabled:true
    });

    var cabina_dove=new AR.Label("la tua cabina è al ponte 5, adesso sei al 4",dimensione_scritta,{

        style:{textColor:"#ff0000",fontStyle:AR.CONST.FONT_STYLE.BOLD},
        opacity:0,
        translate:{y:-1}
    });

    var cabina_come=new AR.Label("per arrivarci prendi l'ascensore",dimensione_scritta,{

        style:{textColor:"#ff0000",fontStyle:AR.CONST.FONT_STYLE.BOLD},
        opacity:0,
        translate:{y:-1.5}
    });
    var cabina_come_2=new AR.Label("10 mt a destra seguendo questa freccia",dimensione_scritta,{

        style:{textColor:"#ff0000",fontStyle:AR.CONST.FONT_STYLE.BOLD},
        opacity:0,
        translate:{y:-2}
    });

    var an_cabina_dove=new AR.PropertyAnimation(cabina_dove,"opacity",0,1,2000);
    var an_cabina_come=new AR.PropertyAnimation(cabina_come,"opacity",0,1,2000);
    var an_cabina_come_2=new AR.PropertyAnimation(cabina_come_2,"opacity",0,1,2000);

    var cabina = new AR.ImageDrawable(new AR.ImageResource("assets/cabina.png"),dimensione,{

        enabled:true
    });

    var info = new AR.ImageDrawable(new AR.ImageResource("assets/info.png"),dimensione,{

            enabled:true
        });

    var video = new AR.VideoDrawable("assets/GNV.mp4", dimensione, {
       translate: {
           x: 2,
           y: 0
       },
       state:0,
       enabled:false,

       });
    var bar = new AR.ImageDrawable(new AR.ImageResource("assets/bar.png"),dimensione,{

        enabled:true

    });
    var garage = new AR.ImageDrawable(new AR.ImageResource("assets/garage.png"),dimensione,{

        enabled:true
    });

    var ascensore=new AR.ImageDrawable(new AR.ImageResource("assets/elevator.png"),dimensione,{

        enabled:true
    });

    var bar_apertura=new AR.Label(this.apertura(),dimensione_scritta,{

       style:{textColor:"#ff0000",fontStyle:AR.CONST.FONT_STYLE.BOLD},
       translate:{y:-1}
    });

    //////////////////////////////
    /// INIZIO DEI GEOOBJECT /////
    //////////////////////////////

    var viewfinder_geo=new AR.GeoObject(new AR.RelativeLocation(null,10,0,0),{

        drawables:{
            cam:[viewfinder],
            indicator:directionIndicatorDrawable,
            radar:radardrawables
        },
        onClick:function(){


                    jQuery("#main_bar").css("opacity","1");
                    jQuery("#main_bar").css("pointer-events","all");
                    jQuery("#centra_finder").css("visibility","hidden");
                    jQuery("#rightButton").css("visibility","hidden");
                    jQuery("#leftButton").css("visibility","hidden");
                    this.enabled=false;

                },
       enabled:true

    });
    geoObjs.push(viewfinder_geo);

    var cabina_geo =new AR.GeoObject(new AR.RelativeLocation(null,10,10,5),{
        drawables:{
            cam:[cabina,cabina_come,cabina_come_2,cabina_dove],
            indicator: directionIndicatorDrawable,
            radar: radardrawables
        },
        enabled:false,
        onEnterFieldOfVision:function(){
            animazione.start();
        }
    });

    geoObjs.push(cabina_geo);

    var bar_geo =new AR.GeoObject(new AR.RelativeLocation(null,-5,0,0),{
        drawables:{
            cam:[bar,bar_apertura],
            indicator: directionIndicatorDrawable,
            radar: radardrawables
        },
        enabled:false
    });
    geoObjs.push(bar_geo);

    var garage_geo =new AR.GeoObject(new AR.RelativeLocation(null,5,20,-20),{
        drawables:{
            cam:[garage],
            indicator: directionIndicatorDrawable,
            radar: radardrawables
        },
        enabled:false
    });
    geoObjs.push(garage_geo);

    var info_geo =new AR.GeoObject(new AR.RelativeLocation(null,0,10,0),{
            drawables:{
                cam:[info,video],
                indicator: directionIndicatorDrawable,
                radar: radardrawables
            },
            onEnterFieldOfVision:function(){

                video.enabled=true;
                video.play();
            },

            enabled:false
        });

  var ascensore_geo =new AR.GeoObject(new AR.RelativeLocation(null,-2,2,0),{
        drawables:{
            cam:[ascensore],
            indicator: directionIndicatorDrawable,
            radar: radardrawables
        },
        enabled:false,
        onEnterFieldOfVision:function(){
            direzione_ascensore.enabled=true;
        }
    });


    //// FINE GEOOBLECT////

     //// ANIMAZIONE /////

        var animazione=new AR.AnimationGroup(AR.CONST.ANIMATION_GROUP_TYPE.SEQUENTIAL,[an_cabina_dove,an_cabina_come,an_cabina_come_2],{

            onFinish:function(){
                ascensore_geo.enabled=true;
             }
        });

        //////////////////

    jQuery("img").click(function (event) {



        if (jQuery("#"+event.target.id.toString()).attr("src")=='../assets/'+event.target.id.toString()+'.png'){
            jQuery("#"+event.target.id.toString()).attr("src","../assets/"+event.target.id.toString()+"_clicked.png");
        }else{
            jQuery("#"+event.target.id.toString()).attr("src","../assets/"+event.target.id.toString()+".png");
        }

       switch (event.target.id){

            case "dove":

                jQuery("#location").toggle();
                jQuery("#mapdiv").toggle();
                break;

            case "info":
                if(info_geo.enabled==false) {

                    info_geo.enabled = true;
                }else{
                    info_geo.enabled = false;

                }

                break;

           case "bar":
               if(bar_geo.enabled==false) {
                   bar_geo.enabled = true;
               }else{
                   bar_geo.enabled = false;
               }

               break;

           case "cabina":
               if(cabina_geo.enabled==false) {
                   cabina_geo.enabled = true;
               }else{
                   cabina_geo.enabled = false;
                   ascensore_geo.enabled=false;
               }

               break;

           case "garage":
               if(garage_geo.enabled==false) {
                   garage_geo.enabled = true;
               }else{
                   garage_geo.enabled = false;
               }

               break;
           case "sicurezza":

               jQuery("#emergenzadiv").toggle();
               break;
        }

    });
PoiRadar.show();
return null;
};	//QUI FINISCE START

function intro() {

};

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

};

function apertura(){

scritta="spiacenti, in questo momento il bar è chiuso, riaprirà domani alle 8.00!"

var d=new Date();
if (d.getHours()>8 && d.getHours()<23){

scritta="in questo momento il bar è aperto!"
    }

return scritta;
}




//AR.context.onLocationChanged = start;
//AR.context.scene.minScalingDistance=1;