var lgUi = lgUi || {};

lgUi.view = lgUi.view || {};
lgUi.view.global = function () {
    this.init();
};

lgUi.view.global.prototype = {
    //variables
    oSliderUseDataCoupon: null,
    oSliderRing: null,
    init: function () {
        this._assignElement();
        this._attachEventHandlers();
        this._onFocusInputText();
        this._onKeyUpInputText();
        this._onBlurInputText();
        this._radioDisableLabel();
        this.sliderNotification();
        this.sliderRing();
        this.sliderDataMethod();
        this.textPlaceholder();
        this.methodSelect();
        this.methodOtherSelect();
        this.ticketSendMethodSelect();
        this.selectActive();
        this.mainAnimation();
        this.accordion();
        this.familyListCheck();
        this.confirmNumBtn();
        this.snsListCheck();
        this._ready();
    },
    _assignElement: function () {
        this.welDoc = $(document.body);
    },
    _attachEventHandlers: function () {
        this.welDoc.on('click', 'a[href="#"]', $.proxy(this._onClickEventPrevent, this));

        //iOS press 효과
        this.welDoc.on('click', '._press', $.proxy(this._onClickPressEffect, this));

        //input 텍스트 삭제버튼 기능
        this.welDoc.on('click', '.btn_input_delete', $.proxy(this._onClickInputDelete, this));

        //gnb
        this.welDoc.on('click', '._btnGnbOpen', $.proxy(this._onClickGnbToggle, this));
        this.welDoc.on('click', '._btnGnbClose', $.proxy(this._onClickGnbClose, this));

        //tab
        this.welDoc.on('click', '._tabs li', $.proxy(this._onClickTabs, this));

    },
    _onClickEventPrevent: function (event) {
        event.preventDefault();
    },
    _onFocusInputText: function () {
        //input 텍스트 포커스 시 삭제버튼 show
        this.welDoc.find('input[type="text"], input[type="email"], input[type="password"], input[type="tel"]').on('focus', function (e) {
            var target = $(e.currentTarget);
            if (target.val().length > 0) {
                target.siblings('.btn_input_delete').show();
            }
        });
    },
    _onKeyUpInputText: function () {
        //input 텍스트 포커스 시 삭제버튼 hide
        this.welDoc.find('input[type="text"], input[type="email"], input[type="password"], input[type="tel"]').on('keyup', function (e) {
            var target = $(e.currentTarget);
            if (target.val().length > 0) {
                target.siblings('.btn_input_delete').show();
            }
        });
    },
    _onBlurInputText: function () {
        //input 텍스트 키 입력 시 삭제버튼
        this.welDoc.find('input[type="text"], input[type="email"], input[type="password"], input[type="tel"]').on('blur', function (e) {
            var target = $(e.currentTarget);
            setTimeout(function () {
                target.siblings('.btn_input_delete').hide();
            }, 100);
        });
    },
    _onClickInputDelete: function (event) {
        //input 텍스트 삭제버튼 기능
        var target = $(event.currentTarget);
        target.siblings('input').val('');
    },
    _radioDisableLabel: function () {
        //라디오 버튼 비활성 시 label 텍스트 컬러
        var $radio = this.welDoc.find('.radio_btn');
        var $radioDisabled = this.welDoc.find('.radio_btn:disabled');

        if ($radio.length > 0) {
            $radioDisabled.siblings('label').css('color', '#eaeaea');
        }
    },
    _onClickPressEffect: function (event) {
        //iOS press 효과
        var target = $(event.currentTarget);
        if (
            target.hasClass('disabled') ||
            target.prop('disabled') === true
        ) {
            target.removeClass('press');
            return false;
        } else {
            target.addClass("press");
        }
        setTimeout(function () {
            target.removeClass('press');
        }, 100);
    },
    _onClickGnbToggle: function () {
        this.gnbOpen();
    },
    _onClickGnbClose: function () {
        this.gnbClose();
    },
    _setWrapOpen: function () {
        var welGnbDim = $('._gnbDim');
        var welGnb = $('._gnb');

        welGnbDim.css({
            'display': 'block',
            'opacity': '1',
            'transition': '3s'
        });
        welGnb.find('header_icon').show();

        welGnb.velocity('stop');
        welGnb.velocity({
            'translateX': '-260px'
        }, 400);
    },
    _setAsideHeight: function () {
        //gnb 메뉴영역 높이계산

        var welGnb = $('._gnb');
        var nWindowHeight = $(window).height(); //뷰포트 높이
        var nGnbTopHeight = welGnb.find('.popup_header').outerHeight(true); //gnb 헤더 높이
        var nGnbBottomHeight = welGnb.find('.popup_footer').outerHeight(true); //gnb 푸터 높이

        setTimeout(function () {
            welGnb.find('.popup_body').css({
                'height': nWindowHeight - (nGnbTopHeight + nGnbBottomHeight) + 'px'
            });
        }, 100);

        //gnb 열릴 때 부모창 스크롤 막기
        $('html, body').css({'overflow': 'hidden'});
    },
    _onClickTabs: function (event) {
        // 탭 액티브
        var target = $(event.currentTarget);

        // 탭이 비활성 상태가 아닐 시
        if (!target.parents('.tabs').hasClass('disabled')) {
            target.addClass('active').siblings().removeClass('active')
        }
    },
    gnbOpen: function () {
        //gnb 열기용 외부함수

        var welGnbDim = $('._gnbDim');
        var welGnb = $('._gnb');

        this._setAsideHeight();
        this._setWrapOpen();

        welGnbDim.css({
            'display': 'block',
            'opacity': '1'
        });
        welGnb.find('.header_icon').show();
    },
    gnbClose: function () {
        //gnb 닫기용 외부함수

        var welGnbDim = $('._gnbDim');
        var welGnb = $('._gnb');

        welGnb.velocity({
            'translateX': '260px'
        }, 400);
        welGnbDim.velocity({
            'opacity': '0'
        }, 300).velocity({
            complete: function () {
                $('.popup_dim').css({
                    'display': 'none'
                });
                welGnb.find('.header_icon').hide();
            }
        });

        //gnb 열릴 때 부모창 스크롤 막기
        $('html, body').css({'overflow': 'auto'});
    },
    sliderNotification: function () {
        //Home > 데이터 사용량 메시지 롤링
        var oSlider = this.welDoc.find('._siderNotification');

        if (oSlider.length > 0) {
            oSlider.bxSlider({
                mode: "vertical",
                pager: false,
                controls: false,
                auto: true,
                touchEnabled: false
            });
        }
    },
    textPlaceholder: function () {
        //법정 대리인 동의하기 placeholder 기능
        var $input = this.welDoc.find('._textPlaceholder input');

        //페이지 첫 진입시 input에 value가 있을 경우 placeholder hide
        if ($input.length > 0) {
            if ($input.val().length > 0) {
                $input.siblings('.place_holder').hide();
            }
        }

        this.welDoc.on('focus', '._textPlaceholder input', function (e) {
            var target = $(e.currentTarget);
            target.siblings('.place_holder').hide()
        });

        this.welDoc.on('blur', '._textPlaceholder input', function (e) {
            var target = $(e.currentTarget);
            var nInput = target.val().length;

            if (nInput === 0) {
                target.siblings('.place_holder').show();
            } else {
                target.siblings('.place_holder').hide();
            }
        });
    },
    sliderDataMethod: function () {
        // 데이터 상품권 구매하기 선택 슬라이드
        var oSlider = this.welDoc.find('._dataListSlide');
        var $current = this.welDoc.find('._currentTxt');
        var $total = this.welDoc.find('._totalTxt');

        if (oSlider.length > 0) {
            oSlider.bxSlider({
                mode: "horizontal",
                controls: false,
                hideControlOnEnd: true,
                pagerCustom: '.data_slide_pager',
                infiniteLoop: false,
                onSliderLoad: function (currentIndex) {
                    oSlider.find('li').eq(currentIndex).addClass('active');
                    oSlider.find('li').eq(currentIndex + 1).addClass('next');

                    // 전체 슬라이드 갯수 표시
                    $total.html(oSlider.find('>li').length);

                    // 현재 슬라이드 표시
                    $current.html(currentIndex + 1);
                },
                onSlideBefore: function ($slideElement, oldIndex, newIndex) {
                    $slideElement.addClass('active').siblings().removeClass('active');

                    $slideElement.next().find('.mask').css({
                        'transition': '.5s'
                    });
                    $slideElement.prev().find('.mask').css({
                        'transition': '.5s'
                    });
                    if ($slideElement.prev().length > 0) {
                        // 이전 슬라이드가 있을 때
                        $slideElement.prev().addClass('prev').siblings().removeClass('prev');
                    } else {
                        // 이전 슬라이드가 없을 때
                        $slideElement.removeClass('prev');
                    }

                    if ($slideElement.next().length > 0) {
                        // 다음 슬라이드가 있을 때
                        $slideElement.next().addClass('next').siblings().removeClass('next');
                    } else {
                        // 다음 슬라이드가 없을 때
                        $slideElement.removeClass('next');
                    }

                    // 현재 슬라이드 표시
                    $current.html(newIndex + 1);
                }
            });
        }
    },
    methodSelect: function () {
        // 결제방법 선택
        this.welDoc.on('click', '._methodList .radio_box', function (e) {
            var target = $(e.currentTarget);

            // 선택 활성화
            if (!target.hasClass('_active')) {
                target.addClass('_active').siblings().removeClass('_active');
            }
        });
    },
    accordion: function () {
        this.welDoc.on('click', '._accordion a', function (e) {
            var target = $(e.currentTarget);

            if (target.hasClass('open') === false) {
                target.addClass('open').parent().siblings().children('a').removeClass('open');
            } else {
                target.removeClass('open').parent().siblings().children('a').removeClass('open');
            }
        });
    },
    /**
     * 특정 accordion이 열려야 할 경우 외부함수
     * @param index
     */
    accordionOpen: function (index) {
        var welAccordion = this.welDoc.find('._accordion');
        var welOpen = welAccordion.find('a');
        welOpen.eq(index).addClass('open').parent().siblings().children('a').removeClass('open')
    },
    selectActive: function () {
        this.welDoc.on('click', '._tabs a', function (e) {
            var target = $(e.currentTarget);
            // 선택 활성화

            if (!target.parent().hasClass('active')) {
                target.parent().parent().parent().next('.select').hide();
            }
            else {
                target.parent().parent().parent().next('.select').show();
            }
        });
        // 셀렉트 박스 활성화
        this.welDoc.on('click', '._selectActive a', function (e) {
            var target = $(e.currentTarget);
            // 선택 활성화

            if (!target.parent().hasClass('active')) {
                target.parent().parent().parent().next('.select').show();
            }
            else {
                target.parent().parent().parent().next('.select').show();
            }
        });

    },
    methodOtherSelect: function () {
        var self = this;
        var $method = this.welDoc.find('._methodList');
        var $radio = $method.find('.radio_box');

        // 데이터 상품권 구매 > 다른 결제 수단 선택
        this.welDoc.find('._methodList .radio_box').on('click', function () {

            // U+ 청구서 결제일 때 다른 결제 수단 클릭 방지
            if ($radio.eq(0).hasClass('_active')) {
                $method.find('ul li a').off('click').removeClass('_press selected');
            } else if ($radio.eq(1).hasClass('_active')) {
                //다른 결제 수단일 때
                $method.find('ul li a').addClass('_press').on('click', function (event) {
                    var target = $(event.currentTarget);

                    if (target.hasClass('empty') || target.hasClass('disabled')) {
                        return false;
                    } else {
                        target.addClass('selected').parent().siblings().children().removeClass('selected');
                    }
                });
            }
        });
    },
    ticketSendMethodSelect: function () {
        // 상품권 전달방법 선택
        this.welDoc.on('click', '._methodList li a', function (e) {
            var target = $(e.currentTarget);

            // 선택 활성화
            target.addClass('selected').parent('li').siblings().find('a').removeClass('selected');
        });
    },
    sliderRing: function () {
        var self = this;
        //Home > 데이터 링 차트 플리킹
        var oPager = this.welDoc.find('.slide_pager a');
        this.oSliderRing = this.welDoc.find('._sliderRing');

        if (this.oSliderRing.length > 0) {
            this.oSliderRing.bxSlider({
                mode: "horizontal",
                pager: false,
                controls: false,
                auto: false,
                adaptiveHeight: true,
                infiniteLoop: false,
                onSliderLoad: function (currentIndex) {
                    //다음 슬라이드의 위치 조정
                    self.welDoc.find('.slide_ring').children().eq(currentIndex + 1).children('.area_line_chart').css({
                        'transform': 'translate(-152px,0)',
                        'opacity': '0.4'
                    }).parent().addClass('active');

                    //페이징 active 처리
                    oPager.removeClass('active').eq(currentIndex).addClass('active');

                    //페이징 click 처리
                    oPager.eq(0).on('click', function (event) {
                        var target = $(event.currentTarget);
                        target.addClass('active').siblings().removeClass('active');
                        self.oSliderRing.goToPrevSlide();
                    });
                    oPager.eq(1).on('click', function (event) {
                        var target = $(event.currentTarget);
                        target.addClass('active').siblings().removeClass('active');
                        self.oSliderRing.goToNextSlide();
                    });

                },
                onSlideNext: function ($slideElement, oldIndex, newIndex) {
                    //다음 슬라이드의 위치 조정
                    $slideElement.children('.area_line_chart').css({
                        'transform': 'translate(0,0)',
                        'opacity': '1',
                        'transition': '0.5s'
                    }).parent().removeClass('active');

                    //이전 슬라이드의 위치 조정
                    $slideElement.prev().children('.area_line_chart').css({
                        'transform': 'translate(133px,0)',
                        'transition': '0.5s',
                        'opacity': '0.4'
                    }).parent().addClass('active');

                    //페이징 active 처리
                    oPager.removeClass('active').eq(newIndex).addClass('active');
                },
                onSlidePrev: function ($slideElement, oldIndex, newIndex) {
                    //이전 슬라이드의 위치 조정
                    $slideElement.children('.area_line_chart').css({
                        'transform': 'translate(0,0)',
                        'transition': '0.5s',
                        'opacity': '1'
                    }).parent().removeClass('active');

                    //다음 슬라이드의 위치 조정
                    $slideElement.next().children('.area_line_chart').css({
                        'transform': 'translate(-152px,0)',
                        'transition': '0.5s',
                        'opacity': '0.4'
                    }).parent().addClass('active');

                    //페이징 active 처리
                    oPager.removeClass('active').eq(newIndex).addClass('active');
                }
            });
        }
    },
    familyListCheck: function () {
        this.welDoc.on('click', '.section_gift .wrap_family_list a', function (e) {
            var target = $(e.currentTarget);
            if (!target.hasClass('checked')) {
                target.addClass('checked')
            } else {
                $(target).removeClass('checked')
            }
        })
    },

    snsListCheck: function () {
        this.welDoc.on('click', '.area_sns_list a', function (e) {
            var target = $(e.currentTarget);
            if (!target.hasClass('checked')) {
                target.addClass('checked')
            } else {
                $(target).removeClass('checked')
            }
        })
    },

    confirmNumBtn: function () {
        //인증하기 버튼  show/hide 기능
        var $input = this.welDoc.find('._confirmBtn input');

        //페이지 첫 진입시 input에 value가 있을 경우 placeholder hide
        if ($input.length > 0) {
            if ($input.val().length > 0) {
                $input.parent().siblings('.btn').show();
            }
        }

        this.welDoc.on('focus', '._confirmBtn input', function (e) {
            var target = $(e.currentTarget);
            target.parent().siblings('.btn').show()
        });

        this.welDoc.on('blur', '._confirmBtn input', function (e) {
            var target = $(e.currentTarget);
            var nInput = target.val().length;

            if (nInput === 0) {
                target.parent().siblings('.btn').hide();
            } else {
                target.parent().siblings('.btn').show();
            }
        });
    },

    /**
     * Home 애니메이션 영역
     * @param number : 데이터 사용량 parameter(매개변수)
     */
    mainAnimation: function (number) {
        var welAnimation = this.welDoc.find('._mainAnimation');
        var welWhole = welAnimation.find('.whole'); //데이터 총 량
        var welWholeInner = welWhole.find('.whole_inner'); //데이터 총 량 - 사용량
        var welUsage = welWhole.find('.usage'); //데이터 사용량
        var nHeight = number;

        welWholeInner.find('i').hide();
        welUsage.find('i').hide();

        //상하 반복 애니메이션 시퀀스
        var animationSequence = [
            {
                e: welWholeInner,
                p: {translateY: '-6px'},
                o: {duration: 200, easing: 'easeIn'}
            }, {
                e: welWholeInner,
                p: {scaleX: '1.02', translateY: '-3px'},
                o: {duration: 200, easing: 'easeOutBounce'}
            }, {
                e: welWholeInner,
                p: {scaleX: '1', translateY: '0'},
                o: {duration: 60, easing: 'easeIn'}
            }, {
                e: welUsage,
                p: {translateY: '6px', scaleX: '1.1'},
                o: {duration: 100, easing: 'easeOut'}
            }, {
                e: welUsage,
                p: {translateY: '0', scaleX: '1'},
                o: {duration: 200, easing: 'easeOutBounce'}
            }
        ];

        //애니메이션 시작
        if (welAnimation.length > 0) {
            welUsage.velocity({
                height: (nHeight / 2) + '%',
                scaleX: '1.1'
            }, 330, 'easeOut').velocity({
                height: (nHeight / 2) - 5 + '%',
                scaleX: '1.2'
            }, 50, 'easeInBounce').velocity({
                height: (nHeight / 2) + '%',
                scaleX: '1.1',
                complete: function () {
                    //캐릭터 눈 보이기
                    setTimeout(function () {
                        welWholeInner.find('i').show();
                        welUsage.find('i').show();
                    }, 100)
                }
            }, 10, 'easeInBounce').velocity({
                height: nHeight + '%',
                scaleX: '1'
            }, 30, 'easeInBounce').velocity({
                height: (nHeight + 2) + '%',
                scaleX: '0.95'
            }, 30, 'easeInBounce').velocity({
                height: (nHeight + 3) + '%',
                scaleX: '0.9'
            }, 80, 'easeOutBounce').velocity({
                height: (nHeight) + '%',
                scaleX: '1'
            }, 80, 'easeInBounce').velocity({
                complete: function () {
                    //상하 반복 애니메이션 시퀀스 반복
                    setInterval(function () {
                        $.Velocity.RunSequence(animationSequence);
                    }, 5000)
                }
            });

            //데이터 총 량 height 설정
            setTimeout(function () {
                var nHeight = welWhole.outerHeight(true);
                var nUserHeight = welUsage.outerHeight(true);
                welWholeInner.css('height', (nHeight - nUserHeight) + 'px');
            }, 2000);
        }
    },
    _ready: function () {
        //document ready
    }
};
var oLgUi = new lgUi.view.global();

$('.header_btn_left').click(function(){
    //history back

    history.back()
}); //씬 연결 확인시 어려움이 있어 추가해두었습니다. 실 개발시 제거 부탁 드립니다. - 박주현
