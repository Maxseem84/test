$(function() {	

	$('.menu__item').each(function(){		
		if ($(this).hasClass('active')) {
			$(this).find('.submenu').slideDown(0)			
		}		
	})

	$('.menu__link').click(function(){	
		event.preventDefault();	
		if (!$(this).closest('.menu__item').hasClass('active')) {
			$('.menu__item').removeClass('active').find('.submenu').slideUp().find('.submenu__item').removeClass('active')
			$(this).closest('.menu__item').addClass('active').find('.submenu').slideDown().find('.submenu__item').eq(0).addClass('active')
			postTitleChange()
			showCats()		
		}
	})

	$('.submenu > .submenu__item > .submenu__link').click(function(){	
		event.preventDefault();
		$('.submenu > .submenu__item').removeClass('active')
		$('.submenu-2 > .submenu__item').removeClass('active')
		$(this).closest('.submenu__item').addClass('active')
		postTitleChange()	
		showCats()	
	})

	$('.submenu-2 > .submenu__item > .submenu__link').click(function(){	
		event.preventDefault();	
		if (!$(this).closest('.submenu__item').hasClass('active')) {
			$('.submenu-2  > .submenu__item').removeClass('active')
			$('.submenu  > .submenu__item').removeClass('active')
			$(this).closest('.submenu__item').addClass('active').closest('.submenu-2').closest('.submenu__item').addClass('active')
			postTitleChange()
			$('.categories').addClass('no-visible')
		}	
	})

	function postTitleChange() {
		var postTitle
		if ($('.submenu-2 > .submenu__item').hasClass('active')) {
			postTitle = $('.submenu-2 > .submenu__item.active > .submenu__link').text()
		} else {
			postTitle = $('.submenu > .submenu__item.active > .submenu__link').text()
		}
		$('.post__title').html(postTitle)
	}
	postTitleChange()	

	const menuTop = $('.nav').offset().top
	$(window).scroll(function() {		
		if ( $(this).scrollTop() > menuTop ) {
			$('.nav').addClass('is-fixed')
		} else {
			$('.nav').removeClass('is-fixed')
		}
	}) 

	const arrH2 = Array.from(document.querySelectorAll('.article h2'))
	const contentMenuHTML = arrH2.map((obj) => {
		return `<li class="content-menu__item"><a href="#${obj.id}" class="content-menu__link">${obj.outerText}</a></li>`	
	})
	$('.content-menu__list').append(contentMenuHTML)

	$(".content-menu__link").on("click", function(event) {
		event.preventDefault();
		var id = $(this).attr('href'),
		top = $(id).offset().top - 40;
		$('body,html').animate({scrollTop:top}, 1000);
	})

	const arrLinks = Array.from(document.querySelectorAll('.submenu-2 .submenu__link'))
	const catHTML = arrLinks.map((obj, index) => {
		obj.setAttribute('data-id', index)		
		return `<a href="javascript:void(0);" class="category" data-id="${index}">
					<img src="img/check.svg" alt="Alt">
					<span class="category__title">${obj.innerText}</span>								
				</a>`	
	})
	$('.categories').append(catHTML)
	const arrCats = Array.from(document.querySelectorAll('.category'))

	function showCats() {
		const arrActiveLinks = Array.from(document.querySelectorAll('.submenu__item.active .submenu-2 .submenu__link'))
		const catIds = arrActiveLinks.map((obj) => {
			return (
				obj.getAttribute('data-id')	
			)				
		})		

		const arrActiveCats = arrCats.filter((obj) => catIds.includes(obj.getAttribute("data-id")) )

		$('.category').removeClass('is-visible')

		arrActiveCats.map(obj => obj.classList.add('is-visible'))

		if(catIds.length < 1) {
			$('.categories').addClass('no-visible')
		} else {
			$('.categories').removeClass('no-visible')
		}
	}
	showCats()

	$('.category').click(function() {
		event.preventDefault()
		const dataId = $(this).data("id")
		console.log(dataId)
		$(`.submenu-2 .submenu__link[data-id="${dataId}"]`)[0].click()
	})

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

});