//Set global array proxy links to solve CORS errors
var proxy = {
    0: 'https://cors.luckydesigner.workers.dev/?',
};
//Set global pagenum and random
var pnum = 1;
var rand = Math.floor(Math.random() * Object.keys(proxy).length);
$(document).ready(function() {
    //Variable zone
    var initlink = $('#selectapi').val();
    //Toggle menu and adjust size
    $(".toggle").css({ 'left': $('#left').width() - 50 });
    $('.toggle').click(function() {
        $('#left').toggle();
        if ($('#left').is(':visible')) {
            $('.toggle').css({ 'left': $('#left').width() - 50 });
        } else {
            $('.toggle').css({ 'left': '5px' });
        }
    });
    //Initial homepage menu and episod lists
    iniMenu(initlink);
    //Select Different Source Website
    $('#selectapi').on('change', function() {
        var key = $(this).val();
        $('.itemContainer').empty();
        iniMenu(key);
        pnum = 1;
    });
    // //Reinitial page num
    $("#menu").click(function() {
        pnum = 1;
    });
    //Scroll down to load more
    $(window).scroll(function(e) {
        $('#left').hide();
        $('.toggle').css({ 'left': '5px' });
        var ks = $('.hiddens');
        var kt = $('#search');
        var str = ks[0].children[0].innerHTML;
        var sts = kt[0].value;
        var scrollTop = $(this).scrollTop(),
            scrollHeight = $(document).height(),
            windowHeight = $(this).height();
        var positionValue = (scrollTop + windowHeight) - scrollHeight;
        var link = $('#selectapi').val();
        var globallink;
        if (positionValue <= 0 && positionValue >= -5) {
            $('#root').append(`<div class="loadingimg"><img src="../images/loading.gif" tag="Easy Web TV"></div>`);
            pnum++;
            if (sts.length > 0) {
                globallink = proxy[rand] + '/statics/search.aspx?key=' + sts + `&page=${pnum}`;
            } else {
                str = str == "0" ? link + `/rexue/${pnum}.html` : str + pnum + '.html';
                globallink = proxy[rand] + str;
                console.log(globallink);
            }
            $.ajax({
                url: globallink,
                type: "GET",
                dataType: "html",
                success: function(data) {
                    var html = $.parseHTML(data);
                    var title = $(html).find('#dmList ul li dl dt a').map((x, y) => y.lastChild.data);
                    var code = $(html).find('#dmList ul li dl dt a').map((x, y) => y.attributes[0].value);
                    var pic = $(html).find('#dmList ul li p.fl.cover a img').map((x, y) => y.attributes.src.value);
                    var author = $(html).find('#dmList ul li dl dd span.red').map((x, y) => y.innerText);
                    var lastpage = $(html).find('.last').text();
                    if (pnum <= 1000) {
                        $('.loadingimg').remove();
                        if ($(window).width() > 1024) {
                            for (let i = 0; i < pic.length; i++) {
                                if (i % 5 == 0) {
                                    $(`.itemContainer:eq(0)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                } else if (i % 5 == 1) {
                                    $(`.itemContainer:eq(1)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                } else if (i % 5 == 2) {
                                    $(`.itemContainer:eq(2)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                } else if (i % 5 == 3) {
                                    $(`.itemContainer:eq(3)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                } else if (i % 5 == 4) {
                                    $(`.itemContainer:eq(4)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                }
                            };
                        } else if ($(window).width() <= 1024 && $(window).width() > 640) {
                            $(`.itemContainer:eq(3)`).hide();
                            $(`.itemContainer:eq(4)`).hide();
                            for (let i = 0; i < pic.length; i++) {
                                if (i % 3 == 0) {
                                    $(`.itemContainer:eq(0)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                } else if (i % 3 == 1) {
                                    $(`.itemContainer:eq(1)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                } else if (i % 3 == 2) {
                                    $(`.itemContainer:eq(2)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                }
                            };
                        } else if ($(window).width() <= 640) {
                            $(`.itemContainer:eq(2)`).hide();
                            $(`.itemContainer:eq(3)`).hide();
                            $(`.itemContainer:eq(4)`).hide();
                            for (let i = 0; i < pic.length; i++) {
                                if (i % 2 == 0) {
                                    $(`.itemContainer:eq(0)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                } else if (i % 2 == 1) {
                                    $(`.itemContainer:eq(1)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                }
                            }
                        }
                    } else {
                        $('.loadingimg').remove();
                        alert(`There is nothing to load`);
                    }
                },
                error: function() {
                    alert('Can\'t load more...');
                }
            });

        }
    });
});

//Initial homepage menu
function iniMenu(link) {
    $('#root').append(`<div class="loadingimg"><img src="../images/loading.gif" tag="Easy Web TV"></div>`);
    $("#menu").empty();
    if (link == 'http://www.manhuapu.com') {
        $.ajax({
            url: proxy[rand] + `${link + '/rexue/'}`,
            data: {},
            type: "GET",
            dataType: "html",
            success: function(data) {
                var html = $.parseHTML(data);
                var title = $(html).find('.nav_menu li a').slice(1).map((x, y) => y.lastChild.data);
                var target = $(html).find('.nav_menu li a').slice(1).map((x, y) => y.attributes[0].value);
                $("#menu").append('<li style="background-color:#fff"><input id="search" type="text" placeholder="Search..." /></li>');
                for (let i = 0; i < title.length; i++) {
                    $("#menu").append(`<li><p><span class="${link + target[i]}">${title[i]}</span></p></li>`);
                }
            },
            error: function(xhr, status) {
                alert("Sorry, there was a problem!");
            },
            complete: function(xhr, status) {
                $.ajax({
                    url: proxy[rand] + `${$('#menu li p span:eq(0)').attr('class')}`,
                    data: {},
                    type: "GET",
                    dataType: "html",
                    success: function(data) {
                        var html = $.parseHTML(data);
                        var title = $(html).find('#dmList ul li dl dt a').map((x, y) => y.lastChild.data);
                        var code = $(html).find('#dmList ul li dl dt a').map((x, y) => y.attributes[0].value);
                        var pic = $(html).find('#dmList ul li p.fl.cover a img').map((x, y) => y.attributes.src.value);
                        var author = $(html).find('#dmList ul li dl dd span.red').map((x, y) => y.innerText);
                        $('.loadingimg').remove();
                        if ($(window).width() > 1024) {
                            for (let i = 0; i < pic.length; i++) {
                                if (i % 5 == 0) {
                                    $(`.itemContainer:eq(0)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                } else if (i % 5 == 1) {
                                    $(`.itemContainer:eq(1)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                } else if (i % 5 == 2) {
                                    $(`.itemContainer:eq(2)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                } else if (i % 5 == 3) {
                                    $(`.itemContainer:eq(3)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                } else if (i % 5 == 4) {
                                    $(`.itemContainer:eq(4)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                }
                            };
                        } else if ($(window).width() <= 1024 && $(window).width() > 640) {
                            $(`.itemContainer:eq(3)`).hide();
                            $(`.itemContainer:eq(4)`).hide();
                            for (let i = 0; i < pic.length; i++) {
                                if (i % 3 == 0) {
                                    $(`.itemContainer:eq(0)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                } else if (i % 3 == 1) {
                                    $(`.itemContainer:eq(1)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                } else if (i % 3 == 2) {
                                    $(`.itemContainer:eq(2)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                }
                            };
                        } else if ($(window).width() <= 640) {
                            $(`.itemContainer:eq(2)`).hide();
                            $(`.itemContainer:eq(3)`).hide();
                            $(`.itemContainer:eq(4)`).hide();
                            for (let i = 0; i < pic.length; i++) {
                                if (i % 2 == 0) {
                                    $(`.itemContainer:eq(0)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                } else if (i % 2 == 1) {
                                    $(`.itemContainer:eq(1)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                }
                            }
                        }
                    },
                    error: function(xhr, status) {
                        alert("Sorry, there was a problem!");
                    },
                    complete: function(xhr, status) {
                        var searchlink = '';
                        $("#search").on('keyup', function(e) {
                            if (e.which == 13) {
                                $('.itemContainer').empty();
                                var valThis = $(this).val().toLowerCase();
                                searchlink = proxy[rand] + `${link + '/statics/search.aspx?key=' + valThis}`;
                                $.ajax({
                                    url: searchlink,
                                    data: {},
                                    type: "GET",
                                    dataType: "html",
                                    success: function(data) {
                                        var html = $.parseHTML(data);
                                        var title = $(html).find('#dmList ul li dl dt a').map((x, y) => y.lastChild.data);
                                        var code = $(html).find('#dmList ul li dl dt a').map((x, y) => y.attributes[0].value);
                                        var pic = $(html).find('#dmList ul li p.fl.cover a img').map((x, y) => y.attributes.src.value);
                                        var author = $(html).find('#dmList ul li dl dd span.red').map((x, y) => y.innerText);
                                        if ($(window).width() > 1024) {
                                            for (let i = 0; i < title.length; i++) {
                                                if (i % 5 == 0) {
                                                    $(`.itemContainer:eq(0)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                                } else if (i % 5 == 1) {
                                                    $(`.itemContainer:eq(1)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                                } else if (i % 5 == 2) {
                                                    $(`.itemContainer:eq(2)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                                } else if (i % 5 == 3) {
                                                    $(`.itemContainer:eq(3)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                                } else if (i % 5 == 4) {
                                                    $(`.itemContainer:eq(4)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                                }
                                            };
                                        } else if ($(window).width() <= 1024 && $(window).width() > 640) {
                                            $(`.itemContainer:eq(3)`).hide();
                                            $(`.itemContainer:eq(4)`).hide();
                                            for (let i = 0; i < title.length; i++) {
                                                if (i % 3 == 0) {
                                                    $(`.itemContainer:eq(0)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                                } else if (i % 3 == 1) {
                                                    $(`.itemContainer:eq(1)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                                } else if (i % 3 == 2) {
                                                    $(`.itemContainer:eq(2)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                                }
                                            };
                                        } else if ($(window).width() <= 640) {
                                            $(`.itemContainer:eq(2)`).hide();
                                            $(`.itemContainer:eq(3)`).hide();
                                            $(`.itemContainer:eq(4)`).hide();
                                            for (let i = 0; i < title.length; i++) {
                                                if (i % 2 == 0) {
                                                    $(`.itemContainer:eq(0)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                                } else if (i % 2 == 1) {
                                                    $(`.itemContainer:eq(1)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                                                }
                                            }
                                        }
                                    },
                                    error: function(xhr, status) {
                                        alert("Sorry, there was a problem!");
                                    },
                                    complete: function(xhr, status) {

                                    }
                                });
                            }
                        })
                    }
                });
            }
        });
    }
    //Click to choose category
    $('#menu').on("click", "span", function(e) {
        var className;
        if (link == 'http://www.manhuapu.com') {
            className = e.originalEvent.target.className;
        }
        $('.hiddens').empty();
        $('.hiddens').append(`<p>${className}</p>`);
        $('#search').val('');
        $('#root').append(`<div class="loadingimg"><img src="../images/loading.gif" tag="Easy Web TV"></div>`);
        $.ajax({
            url: proxy[rand] + className,
            type: "GET",
            dataType: "html",
            success: function(data) {
                var html = $.parseHTML(data);
                var title = $(html).find('#dmList ul li dl dt a').map((x, y) => y.lastChild.data);
                var code = $(html).find('#dmList ul li dl dt a').map((x, y) => y.attributes[0].value);
                var pic = $(html).find('#dmList ul li p.fl.cover a img').map((x, y) => y.attributes.src.value);
                var author = $(html).find('#dmList ul li dl dd span.red').map((x, y) => y.innerText);
                $('.loadingimg').remove();
                $('.itemContainer').empty();
                if ($(window).width() > 1024) {
                    for (let i = 0; i < title.length; i++) {
                        if (i % 5 == 0) {
                            $(`.itemContainer:eq(0)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                        } else if (i % 5 == 1) {
                            $(`.itemContainer:eq(1)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                        } else if (i % 5 == 2) {
                            $(`.itemContainer:eq(2)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                        } else if (i % 5 == 3) {
                            $(`.itemContainer:eq(3)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                        } else if (i % 5 == 4) {
                            $(`.itemContainer:eq(4)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                        }
                    };
                } else if ($(window).width() <= 1024 && $(window).width() > 640) {
                    $(`.itemContainer:eq(3)`).hide();
                    $(`.itemContainer:eq(4)`).hide();
                    for (let i = 0; i < title.length; i++) {
                        if (i % 3 == 0) {
                            $(`.itemContainer:eq(0)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                        } else if (i % 3 == 1) {
                            $(`.itemContainer:eq(1)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                        } else if (i % 3 == 2) {
                            $(`.itemContainer:eq(2)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                        }
                    };
                } else if ($(window).width() <= 640) {
                    $(`.itemContainer:eq(2)`).hide();
                    $(`.itemContainer:eq(3)`).hide();
                    $(`.itemContainer:eq(4)`).hide();
                    for (let i = 0; i < title.length; i++) {
                        if (i % 2 == 0) {
                            $(`.itemContainer:eq(0)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                        } else if (i % 2 == 1) {
                            $(`.itemContainer:eq(1)`).append(`<a href="../catalogues/mangaplay.html?web=${link + code[i]}"><div class="item"><img class="itemImg" src="${pic[i]}" alt="${title[i]}" /><div class="userInfo"><img class="avatar" src="../images/clickread.svg" alt="" /><span class="username">[${author[i]}]${title[i]}</span></div></div></a>`)
                        }
                    }
                }
            },
            error: function() {

            }
        });
    });
};