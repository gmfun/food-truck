foodApp.run(function(){
    $(function(){
        $(".angular-google-map-container").height(window.innerHeight);
        $(window).resize(function(){
            $(".angular-google-map-container").height(window.innerHeight);
        });
    });

})