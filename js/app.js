// hides or shows content based on nav clicks
$(document).ready(function() {
    $("#toPortfolio").click(function() {
        $("#about").hide();
        $("#myCarousel").show();
    });
    $("#toAbout").click(function() {
        $("#myCarousel").hide();
        $("#about").show();
    });
    $("#toContact").click(function() {
        $("#myCarousel").hide();
        $("#about").hide();
    });
});
