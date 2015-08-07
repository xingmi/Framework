//star
$(document).ready(function(){
    var stepW = 24;
    var description = new Array("1","2","3","4","5");
    var stars = $("#star-1 > li");
    var descriptionTemp;
    $("#showa").css("width",0);
    stars.each(function(i){
        $(stars[i]).click(function(e){
            var n = i+1;
            $("#showa").css({"width":stepW*n});
            descriptionTemp = description[i];
            $(this).find('a').blur();
            return stopDefault(e);
            return descriptionTemp;
        });
    });
    stars.each(function(i){
        $(stars[i]).hover(
            function(){
                $(".description-1").text(description[i]);
            },
            function(){
                if(descriptionTemp != null)
                    $(".description-1").text(descriptionTemp);
                else 
                    $(".description-1").text(" ");
            }
        );
    });
});

//star
$(document).ready(function(){
    var stepW = 24;
    var description = new Array("1","2","3","4","5");
    var stars = $("#star-2 > li");
    var descriptionTemp;
    $("#showb").css("width",0);
    stars.each(function(i){
        $(stars[i]).click(function(e){
            var n = i+1;
            $("#showb").css({"width":stepW*n});
            descriptionTemp = description[i];
            $(this).find('a').blur();
            return stopDefault(e);
            return descriptionTemp;
        });
    });
    stars.each(function(i){
        $(stars[i]).hover(
            function(){
                $(".description-2").text(description[i]);
            },
            function(){
                if(descriptionTemp != null)
                    $(".description-2").text(descriptionTemp);
                else 
                    $(".description-2").text(" ");
            }
        );
    });
});
//star
$(document).ready(function(){
    var stepW = 24;
    var description = new Array("1","2","3","4","5");
    var stars = $("#star-3 > li");
    var descriptionTemp;
    $("#showc").css("width",0);
    stars.each(function(i){
        $(stars[i]).click(function(e){
            var n = i+1;
            $("#showc").css({"width":stepW*n});
            descriptionTemp = description[i];
            $(this).find('a').blur();
            return stopDefault(e);
            return descriptionTemp;
        });
    });
    stars.each(function(i){
        $(stars[i]).hover(
            function(){
                $(".description-3").text(description[i]);
            },
            function(){
                if(descriptionTemp != null)
                    $(".description-3").text(descriptionTemp);
                else 
                    $(".description-3").text(" ");
            }
        );
    });
});

function stopDefault(e){
    if(e && e.preventDefault)
           e.preventDefault();
    else
           window.event.returnValue = false;
    return false;
};