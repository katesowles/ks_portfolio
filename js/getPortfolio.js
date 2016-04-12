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
    var $newProject = $("article.template").clone();

    // sets the title of each new Project item
    $newProject.find("h1").html(this.title);

    // sets the category of each new Project item
    $newProject.attr("data-category", this.category);

    // sets the URL (if available) for each new Project item
    $newProject.find(".caption").attr("href", this.clientUrl);

    // sets the image source and alt for each new Project item
    $newProject.find("img").attr("src", this.imageSrc);
    $newProject.find("img").attr("alt", this.title);

    // sets the description of each new Project item
    $newProject.find(".description").html(this.description);

    $newProject.find("time[pubdate]").attr("title", this.publishedOn);

    $newProject.find("time").html("about" + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + " days ago");

    $newProject.append("<hr>");
    $newProject.find("hr").css("clear", "both");

    $newProject.removeClass("template");

    return $newProject;
};

rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
    projects.push(new Project(ele));
});

projects.forEach(function(a){
    $("#projects").append(a.toHtml());
});
