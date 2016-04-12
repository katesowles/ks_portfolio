$(document).ready(function() {
    $("#toPortfolio").click(function() {
        $("#about").hide();
        $("#contact").hide();
    });
    $("#toAbout").click(function() {
        $("#myCarousel").hide();
        $("#contact").hide();
    });
    $("#toContact").click(function() {
        $("#myCarousel").hide();
        $("#about").hide();
    });
});
