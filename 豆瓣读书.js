
var bookName;
var page = 0;
$('button').on('click',function () {
	bookName = $('input').val;
	$('.own1').css({'display':'none'});
	$('.book')[0].innerHTML = '';
	$('.right .right-content')[0].innerHTML = '';

	getData();
})


function getData() {
	if($('input').val){
		bookName = $('input')[0].value;
		$.ajax({
			url: 'https://api.douban.com/v2/book/search',
			type: 'GET',
			dataType: 'jsonp',
			data: {
				q: bookName,
				start: page,
			    count: 5
			},
			success: callBacks
		})
    }
}




function callBacks(data){
	console.log(data);
	var html = '';

	for(var i = 0; i < data.count; i++){
		html += '<li class="item"><a href="'+ data.books[i].alt +'"><img src="'+ data.books[i].images.medium +'"></a><div class="info"><h2><a href="'+ data.books[i].alt + '">'+ data.books[i].title + '</a></h2><div class="pub">'+ data.books[i].author[0] + '/' + data.books[i].translator + '/' + data.books[i].pubdate + '/' + data.books[i].price + '</div><div class="star"><span class="star1 allstar'+ parseInt(data.books[i].rating.average) +'"></span><span class="num">'+ data.books[i].rating.average +'</span><span class="p1">(' + data.books[i].id + '评价)</span></div></div><div class="content1">'+ data.books[i].summary.slice(0,100) + '....... '+ ' </div></li>'
	    $('.book')[0].innerHTML += html;

	}
	$('.right-content')[0].innerHTML += '<span class="1">' + "搜索" + '"' + $('input')[0].value + '"' +"的电影" + '</span><span class="2">' + "搜索" + '"' + $('input')[0].value + '"' +"的音乐" + '</span><span class="3">' + "搜索" + '"' + $('input')[0].value + '"' +"的舞台剧" + '</span>';
 
	if(data.books.length < 5){
		console.log(data.books.length);
		$('.content')[0].innerHTML += '<div class="loaded">没有更多了....</div>';

	}
	else{
		$('.loaded').css({'display':'none'});
		$('.content')[0].innerHTML += '<div class="onload">加载更多.....</div>';
	}
	
	$('.onload').on('click',function () {
		page++;
		getData();
	})
	
}


																																																																																											
