$(document).ready(function() {
    $("#toPortfolio").click(function() {
        $("#about").hide();
        $("#contact").hide();
        $("#myCarousel").show();
    });
    $("#toAbout").click(function() {
        $("#myCarousel").hide();
        $("#contact").hide();
        $("#about").show();
    });
    $("#toContact").click(function() {
        $("#myCarousel").hide();
        $("#about").hide();
        $("#contact").show();
    });
});
