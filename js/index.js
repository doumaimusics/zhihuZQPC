$(function() {
	var news;
	var ifrequest = true;
	var nowtime = moment();
	$.ajax({
		url: 'http://zzqzhihu.duapp.com/getnews',
		dataType: 'jsonp',
	}).done(function(data) {
		news = JSON.parse(data);
		var news1 = news.stories;
		renderRedian(news.top_stories.slice(0, -1), 'http://zzqzhihu.duapp.com/getnewsbyshare');
		renderToday(news1, 'http://zzqzhihu.duapp.com/getnewsbyshare');
		scroll('http://zzqzhihu.duapp.com/getnewsbydate');
	})

	function renderRedian(arr, urls) {
		$('.content .todayredian').empty();
		$.each(arr, function(i, v) {
			$.ajax({
				url: urls,
				dataType: 'jsonp',
				data: {
					id: v.id
				}
			}).done(function(daa) {
				//				var strss = daa.replace(/<[^>]+>/g, "")
				var strss = daa.replace(/[^\u4e00-\u9fa5]/g, "");
				$('<div class = "col-md-3 col-xs-3 redianl" data-id="' + v.id + '"> <div class = "thumbnail" ><img src = "' + v.image + '"alt = "" ><div class = "caption" ><h3>' + v.title + ' </h3>  <p>' + strss.slice(0, 100) + '</p>  </div> </div > </div>').appendTo('.todayredian');
			})
		})
	}

	function renderRedian2(arr, urls) {
		var arrs = arr.stories.slice(0,4);
		$('.content .todayredian').empty();
		$.each(arrs, function(i, v) {
			$.ajax({
				url: urls,
				dataType: 'jsonp',
				data: {
					id: v.id
				}
			}).done(function(daa) {
				if (!v.image) {
					aaimg = arr.background;
				}else{
					aaimg=v.image[0];
				}
				//				strss = daa.replace(/<[^>]+>/g, "")
				var strss = daa.replace(/[^\u4e00-\u9fa5]/g, "");
				$('<div class = "col-md-3 col-xs-3 redianl" data-id="' + v.id + '"> <img src="' + aaimg + '"><div class = "thumbnail" ><div class = "caption" ><h3>' + v.title + ' </h3>  <p>' + strss.slice(0, 20) + '</p>  </div> </div > </div>').appendTo('.todayredian');

			})
		})
	}

	function renderToday(arr, urls) {
		$('.content .todayxinwen').empty();
		$.each(arr, function(i, v) {
			$.ajax({
				url: urls,
				dataType: 'jsonp',
				data: {
					id: v.id
				}
			}).done(function(daa) {
				//去除数字中的标签
				//				var strss = daa.replace(/<[^>]+>/g, "");

				var strss = daa.replace(/[^\u4e00-\u9fa5]/g, "");
				$('<div class="list-group"  data-id="' + v.id + '"><img src="' + v.images[0] + '">	<a href="javascript:" class="list-group-item"><h4 class="list-group-item-heading">' + v.title + '</h4><p class="list-group-item-text">' + strss.slice(0, 300) + '</p></a></div>').appendTo('.todayxinwen')
			})
		})
	}

	function renderToday2(arr, urls) {
		$('.content .todayxinwen').empty();
		var arrs = arr.stories;
		$.each(arrs, function(i, v) {
			$.ajax({
				url: urls,
				dataType: 'jsonp',
				data: {
					id: v.id
				}
			}).done(function(daa) {
				if (!v.images) {
					aaimg = arr.background;
				}else{
					aaimg=v.images[0];
				}
				//去除数字中的标签
				//				var strss = daa.replace(/<[^>]+>/g, "");

				var strss = daa.replace(/[^\u4e00-\u9fa5]/g, "");
				$('<div class="list-group"  data-id="' + v.id + '"><img src="'+aaimg+'"><a href="javascript:" class="list-group-item"><h4 class="list-group-item-heading">' + v.title + '</h4><p class="list-group-item-text">' + strss.slice(0, 300) + '</p></a></div>').appendTo('.todayxinwen')
			})
		})
	}

	function scroll(urls) {
		$(window).on('scroll', function() {
			var wintop = $(window).scrollTop();
			var conhei = $('#content').height();
			//5512 4469
			var winhei = $(window).height();
			if (wintop == conhei - winhei) {
				if (ifrequest == true) {
					ifrequest = false;
					$.ajax({
						url: urls,
						dataType: 'jsonp',
						data: {
							date: nowtime.format('YYYYMMDD')
						}
					}).done(function(data1) {
						nowtime.subtract(1, 'day')
						ifrequest = true;
						data = JSON.parse(data1);
						$('<h3 class="kongguo"></h3>').text(nowtime.format('YYYYMMDD')).appendTo('.todayxinwen');
						$.each(data.stories, function(i, v) {
							$.ajax({
								url: 'http://zzqzhihu.duapp.com/getnewsbyshare',
								dataType: 'jsonp',
								data: {
									id: v.id
								}
							}).done(function(data2) {
								var strss = data2.replace(/[^\u4e00-\u9fa5]/g, "");

								//								var strss = strs.replace(/<[^>]+>/g, "")
								$('<div class="list-group" data-id="' + v.id + '"><img src="' + v.images[0] + '">	<a href="javascript:;"  class="list-group-item"><h4 class="list-group-item-heading">' + v.title + '</h4><p class="list-group-item-text">' + strss.slice(0, 300) + '</p></a></div>').appendTo('.todayxinwen')
							})

						})
					})
				}
			}
		})
	}

	$('.article .close').on('click', function() {
		$('#content').css({
			height: 'auto'
		})
		$('#mask').css({
			opacity: 0
		});
		$('#mask').css({
			transform: 'translateX(-100%)'
		});
		$('.article').css({
			opacity: 0
		});
		$('.article').css({
			transform: 'translateX(100%)'
		});
	})
	//
	$('#content').on('click', '.redianl,.list-group', function() {
		$('*').removeClass('actme');
		$(this).addClass('actme');
		$('.article').show();
		var actme = $('.actme');
		$.ajax({
			url: 'http://zzqzhihu.duapp.com/getarticle',
			dataType: 'jsonp',
			data: {
				id: $(this).attr('data-id')
			}
		}).done(function(data) {
			var datas = JSON.parse(data);
			$('#mask').css({
				opacity: 1
			});
			$('#mask').css({
				transform: 'translateX(0)'
			});
			$('.article').css({
				opacity: 1
			});
			$('.article').css({
				transform: 'translateX(0)'
			});
			$('#content').css({
				height: $(window).height()
			})
			$('#content').css({
				overflow: 'hidden'
			})
			$('.article .texts').html(datas.body);
			$('.article .leftarow').on('click', function() {
				var prev = actme.prev();
				if (prev.length == 0) {
					return
				} else {
					$('*').removeClass('actme');
					prev.addClass('actme');
					actme = $('.actme');
					//					console.log(actme.offset().top)
					$(window).scrollTop('actme.offset().top');
					$.ajax({
						url: 'http://zzqzhihu.duapp.com/getarticle',
						dataType: 'jsonp',
						data: {
							id: actme.attr('data-id')
						}
					}).done(function(data) {
						data = JSON.parse(data);
						$('.article .texts').html(data.body);
					})
				}
			})

			$('.article .rightarow').on('click', function() {
				var next = actme.next();
				if (next.length == 0 || next.hasClass('kongguo')) {
					return;
				} else {
					$('*').removeClass('actme');
					next.addClass('actme');
					actme = $('.actme');
					$.ajax({
						url: 'http://zzqzhihu.duapp.com/getarticle',
						dataType: 'jsonp',
						data: {
							id: actme.attr('data-id')
						}
					}).done(function(data) {
						data = JSON.parse(data);
						$('.article .texts').html(data.body);
					})
				}
			})

		})

	})

	$('.side-bar').on('mousemove', function(e) {
		$('#content').css({
			left: '268px'
		});
		$('#content').css({
			transition: 'all 0.5s ease'
		});
		$('i.mulu').css({
			display: 'none'
		});
		$('.first').css({
			display: 'block'
		})
		$('.container').css({
			width: '1006.800px'
		});
		$('.left-list').css({
			display: 'block'
		})
	})
	$('#content').on('mousemove', function(e) {
		$(this).css({
			left: '53px'
		})
		$('#content').css({
			transition: 'all 0.5s ease'
		});
		$('i.mulu').css({
			display: 'block'
		});
		$('.first').css({
			display: 'none'
		})

		$('.container').css({
			width: '1006.800px'
		});
		$('.left-list').css({
			display: 'none'
		})
	})

	$('.side-bar .pin').on('click', function() {
		if (!$(this).hasClass('uppin')) {
			$(this).addClass('uppin');
			$(this).text('uppin');
			$('.side-bar').off('mousemove');
			$('#content').off('mousemove');
		} else {
			$(this).removeClass('uppin');
			$(this).text('pin');
			$('.side-bar').on('mousemove', function(e) {
				$('#content').css({
					left: '268px'
				});
				$('#content').css({
					transition: 'all 0.5s ease'
				});
				$('i.mulu').css({
					display: 'none'
				});
				$('.container').css({
					width: '1006.800px'
				});
			})
			$('#content').on('mousemove', function(e) {
				$(this).css({
					left: '53px'
				})
				$('#content').css({
					transition: 'all 0.5s ease'
				});
				$('i.mulu').css({
					display: 'block'
				});
				$('.container').css({
					width: '1006.800px'
				});
			})
		}

	})

	$('.first').on('click', function() {
		$('*').removeClass('actt');
		$(this).addClass('actt');
		$('#content').empty();
		$.ajax({
			url: 'http://zzqzhihu.duapp.com/getnews',
			dataType: 'jsonp',
		}).done(function(data) {
			news = JSON.parse(data);
			var news1 = news.stories;
			$('<div class="container"> <div class = "header" ><h2> 知乎日报 </h2> </div> <div class = "today" ><h3> 今日热点 </h3> <div class = "row todayredian" > </div> <h3> 今日新闻 </h3> <div class = "todayxinwen" > </div> </div> <div class = "otherday" ></div> </div>').appendTo('#content');
			renderRedian(news.top_stories.slice(0, -1), 'http://zzqzhihu.duapp.com/getnewsbyshare');
			renderToday(news1, 'http://zzqzhihu.duapp.com/getarticle');
			scroll('http://zzqzhihu.duapp.com/getnewsbydate');
		})
	})

	$.ajax({
		url: 'http://zzqzhihu.duapp.com/getnewlist',
		dataType: 'jsonp',
	}).done(function(data) {
		data = JSON.parse(data);
		datas = data.others;
		$.each(datas, function(i, v) {
			$('<li data-id="' + v.id + '">' + v.name + '<span class="con">&#xe61d;</span></li>').appendTo('.left-list');
		})
		$('.left-list li').on('click', function() {
			$('*').removeClass('actt');
			$(this).addClass('actt');
			$('#content').empty();
			$.ajax({
				url: 'http://zzqzhihu.duapp.com/getclassify',
				data: {
					id: $(this).attr('data-id')
				},
				dataType: 'jsonp',
			}).done(function(data) {
				news = JSON.parse(data);
				var news1 = news;
				$('<div class="container"> <div class = "header" ><h2> 知乎日报 </h2> </div> <div class = "today" ><h3> 今日热点 </h3> <div class = "row todayredian" > </div> <h3> 今日新闻 </h3> <div class = "todayxinwen" > </div> </div> <div class = "otherday" ></div> </div>').appendTo('#content');
				renderRedian2(news, 'http://zzqzhihu.duapp.com/getnewsbyshare');
				renderToday2(news1, 'http://zzqzhihu.duapp.com/getnewsbyshare');
			})
		})
	})
})