// TODO remove the active class from all but the first project (stacked!)
// TODO add a li in the ol for each slide so that we have the bubble nav
// TODO remove the template from showing in the carousel

var projects = [];

function Project (projectIndex) {
    this.title = projectIndex.title;
    this.category = projectIndex.category;
    this.client = projectIndex.client;
    this.clientUrl = projectIndex.clientUrl;
    this.imageSrc = projectIndex.imageSrc;
    this.description = projectIndex.description;
    this.publishedOn = projectIndex.publishedOn;
}

Project.prototype.toHtml = function() {

    // clones the template for each new Project item
    var $newProject = $("div.template").clone();

    // sets the title of each new Project item
    $newProject.find("h3").html(this.title);

    // sets the category of each new Project item
    $newProject.attr("data-category", this.category);

    // sets the URL (if available) for each new Project item
    $newProject.find("a").attr("href", this.clientUrl);

    // sets the image source and alt for each new Project item
    $newProject.find("img").attr("src", this.imageSrc);
    $newProject.find("img").attr("alt", this.title);

    // sets the description of each new Project item
    $newProject.find("a").after(this.description);

    $newProject.find("time[pubdate]").attr("title", this.publishedOn);

    $newProject.find("time").html("about" + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + " days ago");

    $newProject.removeClass("template");

    $newProject.addClass("active");

    return $newProject;
};

// sorts the data in order of published on, most recent at top
rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// pushes each completed project to the project array
rawData.forEach(function(ele) {
    projects.push(new Project(ele));
});

//
$(".carousel-inner").find(function() {
    $(".active:gt(1)").removeClass("active");
});

// pushes each project to the carousel
projects.forEach(function(a){
    $(".carousel-inner").append(a.toHtml());
});
