var OriginalURL = window.parent.location.href;

var ChangedURL = "https://" + window.location.host + "URL you want to monitor"; //"window.location.host" retrives the instance name 

if (!url.startURL(ChangedURL)) //check if URL doesn't starts as Original URL
{
    window.location = OriginalURL; //Redirect to Original URL
}
