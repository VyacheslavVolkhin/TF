$(document).ready(function(){

	//phone masked
	$('input[type="tel"]').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
	$('input[type="tel"]').on('click', function() {
		$(this).setCursorPosition(4);
	})
	$.fn.setCursorPosition = function(pos) {
	  this.each(function(index, elem) {
	    if (elem.setSelectionRange) {
	      elem.setSelectionRange(pos, pos);
	    } else if (elem.createTextRange) {
	      var range = elem.createTextRange();
	      range.collapse(true);
	      range.moveEnd('character', pos);
	      range.moveStart('character', pos);
	      range.select();
	    }
	  });
	  return this;
	};


    //btn tgl
    $('.js-btn-tgl').on('click', function () {
        $(this).toggleClass('active');
        return false;
    })
    
    //action close
    $('.js-action-close').on('click', function() {
        $(this).parents('.main-top-action').slideUp(200);
        return false;
    })

	//popup block
	$('.js-popup-wrap .js-btn-toggle').on('click', function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('body').removeClass('popup-show');
			$('body').removeClass('menu-catalog-show');
		} else {
			$('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
			$(this).addClass('active');
			if ($(this).parent().hasClass('main-catalog-wrap')) {
				$('body').addClass('menu-catalog-show');
			}
			if ($(this).parent().hasClass('main-search-wrap')) {
				$('body').addClass('popup-show');
			}
		}
		return false;
	})
	$('.js-popup-wrap .js-btn-close').on('click', function() {
		$(this).parents('.js-popup-wrap').children('.js-btn-toggle').removeClass('active');
		$('body').removeClass('menu-catalog-show');
		$('body').removeClass('popup-show');
		return false;
	})
	$(document).click(function(event) {
	    if ($(event.target).closest(".js-popup-block").length) return;
	    $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
	    $('body').removeClass('popup-show');
	    event.stopPropagation();
	});
	$('.js-popup-wrap').each(function() {
		if ($(this).hasClass('js-popup-select')) {
			// alert(1)
			if ($(this).find('.js-popup-block').find('.active').length>0) {} else {
				$(this).find('.js-popup-block').find('li').eq(0).children('a').addClass('active');
			}
			var currentSelect = $(this).find('.js-popup-block').find('.active').html();
			$(this).find('.js-btn-toggle').html(currentSelect);
		}
	})
	$('.js-popup-wrap.js-popup-select .js-popup-block a').on('click', function() {
		if ($(this).hasClass('active')) {} else {
			$(this).parents('.js-popup-wrap').find('.js-popup-block').find('.active').removeClass('active');
			$(this).addClass('active');
		}
		$('.js-popup-wrap').each(function() {
			if ($(this).hasClass('js-popup-select')) {
				if ($(this).find('.js-popup-block').find('.active').length>0) {} else {
					$(this).find('.js-popup-block').find('li').eq(0).children('a').addClass('active');
				}
				var currentSelect = $(this).find('.js-popup-block').find('.active').html();
				$(this).find('.js-btn-toggle').html(currentSelect);
			}
		})
		$(this).parents('.js-popup-wrap').find('.js-btn-toggle').removeClass('active');
		return false;
	})

	//tabs
	$('.js-tabs-nav').each(function() {
		$('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
	})
	$('.js-tab-title').each(function() {
		if ($(this).hasClass('active')) {
			$(this).next('.js-tab-content').show(0);
		}
	})
	$('.js-tabs-nav li a').on('click', function() {
		if ($(this).hasClass('active')) {} else {
			$('.js-tab-block').removeClass('active');
			$(this).parents('.js-tabs-nav').find('.active').removeClass('active');
			$(this).addClass('active');
			$('.js-tabs-nav').each(function() {
				$('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
			})
		}
		return false;
	})
	$('.js-tab-title').on('click' , function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active').next('.js-tab-content').slideUp(200);
		} else {
			$(this).addClass('active').next('.js-tab-content').slideDown(200);
		}
	})
    
    
    //select content toggle
    $('input[data-select]').each(function() {
        if ($(this).is (':checked')) {
            let selectContent = $(this).attr('data-select');
            $('.frm-select-content[data-select="'+selectContent+'"]').addClass('active');
        }
    })
    $('input[type="radio"], input[type="checkbox"]').on('click', function() {
        $('.frm-select-content.active').removeClass('active');
        $('input[data-select]').each(function() {
            if ($(this).is (':checked')) {
                let selectContent = $(this).attr('data-select');
                $('.frm-select-content[data-select="'+selectContent+'"]').addClass('active');
            }
        })
    })
    
    
    //more
    $('.js-more-link a').on('click', function() {
        let maxMoreHeight = $(this).parents('.js-more-wrap').find('.js-more-content').height();
        if ($(this).parents('.js-more-wrap').hasClass('opened')) {
            $(this).parents('.js-more-wrap').removeClass('opened');
        } else {
            $(this).parents('.js-more-wrap').addClass('opened').find('.js-more-content-wrap').css('max-height', maxMoreHeight);
        }
        return false;
    })
	
    
    //main catalog wrap
    $('.main-catalog-wrap .menu-catalog-wrap li ul').each(function () {
        $(this).parent().addClass('submenu');
    })
    $('.main-catalog-wrap li a').on('click', function () {
        if ($(this).next('ul').length > 0) {
            if ($(window).innerWidth() < 1024) {
                if ($(this).parent().attr('data-level')) {
                    if ($(this).parent().hasClass('open')) {
                        $(this).parent().removeClass('open');
                        $('body').removeClass('menu-inner-show');
                    } else {
                        $(this).parent().addClass('open');
                        $('body').addClass('menu-inner-show');
                    }
                } else {
                    $('body').removeClass('menu-inner-show');
                    if ($(this).parent().hasClass('open')) {
                        $(this).parent().removeClass('open');
                        $('body').removeClass('submenu-inner-show');
                        $('body').addClass('menu-inner-show');
                    } else {
                        $(this).parent().addClass('open');
                        $('body').addClass('submenu-inner-show');
                    }
                }
                return false;
            }
        }
    })
    $('.main-catalog-wrap .btn-action-back').on('click', function() {
        if ($('body').hasClass('menu-inner-show')) {
            $('body').removeClass('menu-inner-show');
            $('.main-catalog-wrap li.open').removeClass('open');
        }
        if ($('body').hasClass('submenu-inner-show')) {
            $('body').removeClass('submenu-inner-show');
            $('body').addClass('menu-inner-show');
            $('.main-catalog-wrap li.open li.open').removeClass('open');
        }
        return false;
    })

    //page-catalog-slider-box
    $('.page-catalog-slider-box .slider').slick({
        dots: false,
        slidesToShow: 3,
        variableWidth: false,
        infinite: true,
        prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-second ico-arrow-prev"></span>',
        nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-second ico-arrow-next"></span>',
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 2,
                }
            },
        ]
    });

    //main-slider-box
    $('.main-slider-box .slider').slick({
        dots: true,
        slidesToShow: 1,
        variableWidth: false,
        prevArrow: false,
        nextArrow: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: false,
                    variableWidth: true
                }
            },
        ]
    });

    //catalog-slider-box
    $('.catalog-slider-box .slider').slick({
        dots: false,
        slidesToShow: 5,
        infinite: false,
        initialSlide: 1,
        variableWidth: false,
        prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
        nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                }
            },
        ],
    });

    //brands-slider-box
    $('.brands-slider-box .slider').slick({
        dots: false,
        slidesToShow: 5,
        variableWidth: false,
        infinite: true,
        prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
        nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    variableWidth: true
                }
            },
        ]
    });
    
    $('.slider-outer-box .slider-title-box .ico-arrow-prev').on('click', function() {
        $(this).parents('.slider-outer-box').find('.slider-wrap').find('.ico-arrow-prev').click();
        return false;
    })
    $('.slider-outer-box .slider-title-box .ico-arrow-next').on('click', function() {
        $(this).parents('.slider-outer-box').find('.slider-wrap').find('.ico-arrow-next').click();
        return false;
    })
    $('.slider-outer-box .slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        if ($(this).parents('.slider-outer-box').find('.slider-wrap').find('.ico-arrow-prev').hasClass('slick-disabled')) {
            $(this).parents('.slider-outer-box').find('.slider-title-box').find('.ico-arrow-prev').addClass('slick-disabled');
        } else {
            $(this).parents('.slider-outer-box').find('.slider-title-box').find('.ico-arrow-prev').removeClass('slick-disabled');
        }
        if ($(this).parents('.slider-outer-box').find('.slider-wrap').find('.ico-arrow-next').hasClass('slick-disabled')) {
            $(this).parents('.slider-outer-box').find('.slider-title-box').find('.ico-arrow-next').addClass('slick-disabled');
        } else {
            $(this).parents('.slider-outer-box').find('.slider-title-box').find('.ico-arrow-next').removeClass('slick-disabled');
        }
    })


    //item-shop
    $('.item-shop .slider').slick({
        dots: false,
        slidesToShow: 1,
        variableWidth: false,
        prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-att ico-arrow-prev"></span>',
        nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-att ico-arrow-next"></span>',
    });


    //photos slider
    $('.photos-slider-box .slider-wrap .slider').slick({
        dots: false,
        slidesToShow: 1,
        infinite: true,
        prevArrow: false,
        nextArrow: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: true
                }
            },
        ]
    });
    $('.photos-slider-box .slider-wrap .slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        $('.photos-slider-box .slider-preview-wrap .sl-wrap.active').removeClass('active');
        $('.photos-slider-box .slider-preview-wrap .item-photo[data-slide="' + currentSlide + '"]').parent().addClass('active');
    });
    $('.photos-slider-box .slider-preview-wrap .slider').slick({
        dots: false,
        slidesToShow: 5,
        vertical: true,
        infinite: false,
        variableWidth: false,
        prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
        nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
    });
    $('.photos-slider-box .slider-preview-wrap .slider .item-photo').click(function () {
        let newSlide = $(this).attr('data-slide');
        $('.photos-slider-box .slider-preview-wrap .sl-wrap.active').removeClass('active');
        $(this).parent().addClass('active');
        $('.photos-slider-box .slider-wrap .slider').slick('slickGoTo', newSlide);
        return false;
    })


    // filter
    $('.js-filter-close').on('click', function() {
        $('body').removeClass('filter-open');
        return false;
    })
    $('.js-filter-open').on('click', function() {
        $('body').addClass('filter-open');
        return false;
    })
    $('.section-more-wrap a').on('click', function() {
        $(this).parents('.section-content').toggleClass('section-open');
        return false;
    })
    $('#range-slider').slider({
        range: true,
        min: 10,
        max: 80,
        values: [10, 50],
        slide: function (event, ui) {
            $('#range-min').val(ui.values[0]);
            $('#range-max').val(ui.values[1]);
        }
    })
    $('#range-min').val($('#range-slider').slider('values', 0));
    $('#range-max').val($('#range-slider').slider('values', 1));
    $('#range-min').bind('focusout', function () {
        if ($(this).val() > $('#range-slider').slider('values', 1)) {
            $(this).val($('#range-slider').slider('values', 0));
        }
        $('#range-slider').slider('values', 0, $(this).val());
    })
    $('#range-max').bind('focusout', function () {
        if ($(this).val() < $('#range-slider').slider('values', 0)) {
            $(this).val($('#range-slider').slider('values', 1));
        }
        $('#range-slider').slider('values', 1, $(this).val());
    })
    $('#range-min').bind('keypress', function (e) {
        if (e.keyCode == 13) {
            if ($(this).val() > $('#range-slider').slider('values', 1)) {
                $(this).val($('#range-slider').slider('values', 0));
            }
            $('#range-slider').slider('values', 0, $(this).val());
        }
    })
    $('#range-max').bind('keypress', function (e) {
        if (e.keyCode == 13) {
            if ($(this).val() < $('#range-slider').slider('values', 0)) {
                $(this).val($('#range-slider').slider('values', 1));
            }
            $('#range-slider').slider('values', 1, $(this).val());
        }
    })
    $('#widget').draggable();
    
});


