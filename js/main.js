//listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//save bookmark
function saveBookmark(e){

	//get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	var bookmark = {
		name:siteName,
		url:siteUrl
	}

/*
// local storage test
localStorage.setItem('test','Hello World');
console.log(localStorage.getItem('test'));
localStorage.removeItem('test');
console.log(localStorage.getItem('test'));
//	console.log(bookmark);
	
	*/

//test if bookmarks is null
if(localStorage.getItem('bookmarks') === null){
	//init array
	var bookmarks = [];
	//add to array
	bookmarks.push(bookmark);
	//set to localstorage
	//convert json array into string
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}
else
{
	//fetch from localstorage all bookmarks
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	//add bookmark to array 
	bookmarks.push(bookmark);
	//re-set back to local storage
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

}

fetchBookmarks();

	//prevent form submit

	e.preventDefault();
};


function deleteBookmark(url){
	//console.log(url);

	//get bookmarks form localstorage

	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	for(var i=0;i<bookmarks.length;i++)
	{
		if(bookmarks[i].url==url){
			bookmarks.splice(i,1);

		}
	}
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

//re-fetch bookmarks
fetchBookmarks();

}

//fetch bookmarks
function fetchBookmarks(){
	//get bookmarks from localstorage
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//get output id
var bookmarksResults = document.getElementById('bookMarkResults');
//build output
//bookmarksResults.innerHTML ='HELLO';

bookmarksResults.innerHTML='';

for(var i =0;i<bookmarks.length;i++){
var name=bookmarks[i].name;
var url = bookmarks[i].url;
bookMarkResults.innerHTML+= '<div class="well">'+
							'<h3>'+name+
							'<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
							'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a>'+
							'</h3>'+
							'</div>';
}

}