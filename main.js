function OpenPopup(e) {
    return newwindow = window.open(e, "name", "height=600,width=550"),
    window.focus && newwindow.focus(),
    !1
}
function trackUser() {
    var e = window.location.pathname
      , t = new Date
      , a = new Date;
    a.setTime(a.getTime() + 864e5);
    var o = "expires=" + a.toGMTString()
      , n = []
      , i = {}
      , r = "Accessed: " + (t.getMonth() + 1) + "/" + t.getDate() + "/" + t.getFullYear() + " at " + t.getHours() + ":" + t.getMinutes();
    i.pageURL = e,
    i.access = r,
    n.push({
        page: i
    });
    var s = read_cookie("userPath");
    s ? (n = s,
    n.push({
        page: i
    })) : n.push({
        page: i
    });
    var l = JSON.stringify(n);
    return document.cookie = "userPath=" + l + "; " + o + "; path=/;",
    !1
}
function read_cookie(e) {
    var t = document.cookie.match(new RegExp(e + "=([^;]+)"));
    return t && (t = JSON.parse(t[1])),
    t
}
function toolTip(e, t) {
    var a = ""
      , o = "";
    switch (e) {
    case "jenna":
        a = "Jenna will contact you soon to learn about your health needs.",
        o = "info";
        break;
    case "carl":
        a = "Carl will contact you soon to learn about your health needs.",
        o = "info";
        break;
    case "clinical":
        a = "Our Patient Advocate team will contact you to connect you to clinical trials that match your needs.",
        o = "info";
        break;
    case "legal":
        a = "Our Patient Advocate team will contact you to connect you with a lawyer.",
        o = "info";
        break;
    case "asbestos":
        a = "Our Patient Advocate team will contact you to help you get access to trust fund money.",
        o = "info";
        break;
    case "legalservices":
        a = "Our Patient Advocate team will contact you to address your legal needs.",
        o = "info";
        break;
    case "lawsuits":
        a = "Our Patient Advocate team will contact you to address your legal needs.",
        o = "info";
        break;
    case "phone":
        a = "Our Patient Advocate team will contact you to learn about your health needs.",
        o = "info";
        break;
    case "compensation":
        a = "Our Patient Advocate team will contact you to learn about your legal needs.",
        o = "info";
        break;
    case "privacy":
        a = "Your information is used to send you free products and provide free services at your request. We do not rent, share, or sell your personal information."
    }
    "undefined" != typeof t && (a = t);
    var n = new Array(a,o);
    return n
}
function validateEmail(e) {
    var t = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return t.test(e)
}
$(window).scrollTop() > 70 && window.innerWidth < 750 && ($("#Navigation").addClass("fixed"),
$("#Navigation .icon.HomePage, #TopBar .phoneNumber").fadeIn(250),
$("body").css("padding-top", 93)),
$(window).on("scroll", function() {
    var e = $(window).scrollTop();
    $(window).innerWidth() > 768 && (e > 70 ? ($(".search-container").fadeOut(250),
    $("#Navigation").addClass("fixed"),
    $("#Navigation .icon.HomePage").fadeIn(250)) : ($("#Navigation").removeClass("fixed"),
    $("#Navigation .icon.HomePage").fadeOut(250),
    $(".search-container").fadeIn(250)))
});
var is_firefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
$(document).ready(function(e) {
    if (is_firefox && $("body").addClass("firefox"),
    $(".accordion-btn-next, .accordion-btn-back").unbind("click"),
    $(".accordion-btn-back").on("click", function(e) {
        var t = $(this).data("step");
        $(".accordion-open").children(".accordion-content").slideUp("400"),
        $(".accordion-open").removeClass("accordion-open"),
        $("#" + t).addClass("accordion-open"),
        $("#" + t).children(".accordion-content").slideDown("400")
    }),
    $(".accordion-btn-next").on("click", function(e) {
        e.stopPropagation(),
        e.preventDefault();
        var t = $(this).data("step")
          , a = "#" + $(this).data("step")
          , o = $(this).data("current")
          , n = {}
          , i = !0;
        $("#" + o + " [required]").each(function(e) {
            var t = $(this).attr("name")
              , a = $(this).val()
              , o = a.substring(0, 3);
            if ("" != $(this).val())
                if ("phone_number" == t) {
                    var i = $(this).val();
                    isValidNumber(i, "US") && "888" != o ? ($(this).removeClass("empty-field"),
                    n[t] = !0) : ($(this).addClass("empty-field"),
                    n[t] = !1)
                } else if ("email_address" == t) {
                    var r = $(this).val()
                      , s = validateEmail(r);
                    1 == s ? ($(this).removeClass("empty-field"),
                    n[t] = !0) : ($(this).addClass("empty-field"),
                    n[t] = !1)
                } else
                    $(this).removeClass("empty-field"),
                    n[t] = !0;
            else
                n[t] = !1,
                $(this).addClass("empty-field")
        });
        for (var r in n)
            if (n.hasOwnProperty(r)) {
                if (n[r] === !1) {
                    i = !1,
                    $('[name="' + r + '"]').addClass("empty-field");
                    break
                }
                $('[name="' + r + '"]').removeClass("empty-field")
            }
        if (i)
            if ("submit" != $(this).attr("type"))
                $("#" + o + " .empty-field").removeClass("empty-field"),
                $("#" + o).removeClass("accordion-open"),
                $("#" + o).children(".accordion-content").slideUp("400"),
                $("#" + o).addClass("accordion-success"),
                $("#" + t).addClass("accordion-open"),
                $("#" + t).children(".accordion-content").slideDown("400", function() {
                    if (window.innerWidth < 640) {
                        var e = $(a).offset().top - 60;
                        $("html, body").animate({
                            scrollTop: e
                        }, 1e3)
                    }
                });
            else {
                $(this).attr("disabled", "disabled"),
                $(this).text("Submitting...");
                var s = $("#LandingPageForm")
                  , l = s.attr("action")
                  , c = $('[name="httpReferrer"]').val();
                $.ajax({
                    type: "POST",
                    url: l + "/?refer=" + c,
                    data: s.serialize(),
                    dataType: "json",
                    success: function(e) {
                        if ("sent" == e.mail) {
                            __gaTracker("send", "event", "All Forms", "Form Submission", e.FormType, 1),
                            _paq.push(["trackEvent", "Form", e.FormType]),
                            "special" == e.thankyou && __gaTracker("send", "event", "Forms", "Form Submission", e.FormType, 1);
                            var n;
                            s.find('[name="user_address"]').length ? "Wristbands" == s.find('[name="FormName"]').val() ? (n = "Your wristbands will be sent shortly.",
                            $(".accordion-success .accordion-content").html("<p>" + n + "</p>")) : (n = "Your free guide will be sent shortly.",
                            $(".accordion-success .accordion-content").html("<p>" + n + "</p>")) : (n = "A patient advocate will be in contact shortly.",
                            $(".accordion-success .accordion-content").html("<p>" + n + "</p>")),
                            $("#" + o).removeClass("accordion-open"),
                            $("#" + o).addClass("accordion-success"),
                            $("#" + t).addClass("accordion-open"),
                            $("#" + t).children(".accordion-content").slideDown("400", function() {
                                if (window.innerWidth < 640) {
                                    var e = $(a).offset().top - 60;
                                    $("html, body").animate({
                                        scrollTop: e
                                    }, 1e3)
                                }
                            })
                        }
                    }
                })
            }
        return !1
    }),
    trackUser(),
    "ontouchstart"in document.documentElement && (document.documentElement.className += " touch",
    $("#MainNavigation .menu-link").on("click", function(e) {})),
    $(".search-container .icon").on("click", function() {
        var e = $(this).next();
        e.is(":visible") ? e.slideUp(250) : e.slideDown(250)
    }),
    $(document).on("mouseup", function(e) {
        var t = $(".search-container .GoogleSearch *");
        return !(t.is(e.target) || $(".search-container .icon").is(e.target) || !t.is(":visible")) && void $(".search-container .GoogleSearch").slideUp(250)
    }),
    window.innerWidth < 769) {
        $(".openAccordion").on("click", function(e) {
            e.preventDefault(),
            $(this).parent().parent().find(".collapsed").removeClass("collapsed")
        });
        var t = 0;
        $("#clearOverlay").bind("touchstart", function(e) {
            e.preventDefault()
        }),
        $("#clearOverlay").bind("touchmove", function(e) {
            e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            t = e.originalEvent.touches[0].pageX,
            $("#main.open, #CollapsableHeader").css("-webkit-transition", "0ms"),
            t < 260 && $("#main.open, #CollapsableHeader").css("-webkit-transform", "translateX(" + t + "px)"),
            $(this).css("left", t),
            e.preventDefault()
        }),
        $("#clearOverlay").bind("touchend", function(e) {
            e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            t = $(this).position().left,
            t < 150 ? ($("#main.open, #CollapsableHeader, #Navigation").removeClass("open"),
            $("#main, #CollapsableHeader").removeAttr("style"),
            $(this).hide()) : ($("#main.open, #CollapsableHeader").removeAttr("style"),
            $(this).css("left", 260))
        }),
        $("#MobileMenu a").on("click", function(e) {
            e.preventDefault(),
            $("#main, #CollapsableHeader, #Navigation").toggleClass("open")
        }),
        $("#main").on("click", function() {
            $("#main").hasClass("open") && console.log("boink"),
            "" != $("#main").attr("class") && ($("#main, #CollapsableHeader, #Navigation").removeClass("open"),
            console.log("woohoo!"))
        }),
        "open" === $("#main").attr("class") && console.log("Yo mama")
    }
    $(".clinicalTrial .openForm, .survivor .openForm").on("click", function(e) {
        e.preventDefault(),
        $(this).parent().parent().siblings(".attachedForm").slideToggle(500)
    }),
    $(".treatmentPlan .openForm").on("click", function(e) {
        e.preventDefault(),
        $(this).parent().siblings(".attachedForm").slideToggle(500)
    }),
    $(".showHideSources").on("click", function() {
        var e = $(this);
        e.next(".sourcesAndAuthor").slideToggle(250, function() {
            "Show Sources & Author" == e.text() ? (e.text("Hide Sources & Author"),
            e.addClass("show")) : "Show Author" == e.text() ? (e.text("Hide Author"),
            e.addClass("show")) : "Hide Author" == e.text() ? e.text("Show Author") : (e.text("Show Sources & Author"),
            e.removeClass("show"))
        })
    });
    var a = window.location.href;
    $("[data-tooltip]").on({
        mouseenter: function() {
            var e = $(this)
              , t = e.data("tooltip-content")
              , a = e.data("tooltip");
            console.log(t);
            var o = toolTip(a, t);
            e.parent().append('<div class="tooltip ' + o[1] + '">' + o[0] + "</div>"),
            $(".tooltip." + o[1]).fadeIn(250)
        },
        mouseleave: function() {
            var e = toolTip($(this).data("tooltip"));
            $(".tooltip." + e[1]).fadeOut(250, function() {
                $(this).remove()
            })
        },
        click: function() {
            return !1
        }
    }),
    $(".step-bottom a.back[data-step]").on("click", function(e) {
        e.preventDefault();
        var t = $(this).data("step");
        $(".step.active").removeClass("active"),
        $("#" + t).addClass("active"),
        $(".tooltip.error").remove()
    }),
    $('.step-bottom a.primary[data-step="Step2"]').on("click", function(e) {
        e.preventDefault(),
        $(".tooltip.error").remove();
        var t = $(this).data("step");
        $("#Step1").is(":visible") && ("" == $("#Step1 .step-bottom select").val() ? ($("#Step1 .step-bottom .field").append('<div class="tooltip error">This field is required</div>'),
        $(".tooltip.error").fadeIn(250),
        $(".tooltip.error").on("mouseleave", function() {
            $(this).fadeOut(250)
        })) : ($(".step.active").removeClass("active"),
        $("#" + t).addClass("active"),
        $(".tooltip.error").remove()))
    }),
    $('.step-bottom a.primary[data-step="Step3"]').on("click", function(e) {
        e.preventDefault();
        var t = $(this).data("step");
        if ($("#Step2").is(":visible")) {
            var a = !0;
            $(".tooltip.error").remove(),
            $("#Step2 .step-bottom [required]").each(function(e) {
                if ("" != $(this).val())
                    if ($(this).parent().hasClass("phone") && "" != $(this).val()) {
                        var t = $(this).val();
                        isValidNumber(t, "US") ? $(".tooltip.phoneNum").fadeOut(250) : ($(this).parent().append('<div class="tooltip error phoneNum">Please enter a valid US number</div>'),
                        $(".tooltip").fadeIn(250),
                        a = !1)
                    } else
                        a = !0;
                else
                    $(this).parent().append('<div class="tooltip error">This field is required</div>'),
                    $(".tooltip").fadeIn(250),
                    a = !1
            }),
            $(".tooltip.error").on("mouseleave", function() {
                $(this).fadeOut(250)
            }),
            a && ($(".step.active").removeClass("active"),
            $("#" + t).addClass("active"))
        }
    }),
    $.validator.setDefaults({
        debug: !0,
        success: "valid"
    }),
    $.validator.addMethod("checkPhoneNum", function(e, t) {
        return this.optional(t) || isValidNumber(e, "US")
    }, "Please enter a valid US Phone Number"),
    $(".noExtraPage").validate({
        errorClass: "not-valid",
        rules: {
            phone_number: {
                checkPhoneNum: !0
            }
        },
        submitHandler: function(e) {
            var e = $(e)
              , t = e.attr("action");
            e.find('input[type="submit"]').attr("disabled", "disabled").fadeTo(150, .1),
            e.find(".field.submit").append('<div class="loading"><p>Loading...</p></div>'),
            $(".field.submit .loading").fadeIn(250),
            $.ajax({
                type: "POST",
                url: t + "/?refer=" + a,
                data: $(e).serialize(),
                dataType: "json",
                success: function(t) {
                    if ("sent" == t.mail) {
                        __gaTracker("send", "event", "All Forms", "Form Submission", t.FormType, 1),
                        _paq.push(["trackEvent", "Form", t.FormType]),
                        "special" == t.thankyou && __gaTracker("send", "event", "Forms", "Form Submission", t.FormType, 1);
                        var a;
                        a = e.find('[name="user_address"]').length ? "Wristbands" == e.find('[name="FormName"]').val() ? "Your wristbands will be sent shortly." : "Your free guide will be sent shortly." : "AskANurse" == e.find('[name="FormName"]').val() ? "Jenna will be in contact with you shortly." : "AskAVeteran" == e.find('[name="FormName"]').val() ? "Carl will be in contact with you shortly." : "A patient advocate will be in contact shortly.",
                        e.parent().append('<div class="success" style="display: none;"><h4>Success! Your request has been sent.</h4><h5>' + a + "</h5></div>"),
                        e.fadeOut(250, function() {
                            $(".success").fadeIn(250)
                        })
                    }
                }
            })
        }
    }),
    $("#OpenMatchForm").on("click", function(e) {
        e.preventDefault(),
        $("body, html").animate({
            scrollTop: $(".section07").offset().top
        }, 1200)
    }),
    $(".intro .button").on("click", function(e) {
        e.preventDefault(),
        $(".intro").fadeOut(250)
    }),
    $(".guide-flyout").length > 0 && (read_cookie("guideflyout") || setTimeout(function() {
        $(".guide-flyout").animate({
            left: "0"
        }, 5e3),
        $(".close-flyout").click(function(e) {
            e.stopImmediatePropagation(),
            $(this).parent().animate({
                left: "-100%"
            }, 1e3),
            $("#guide-flyout-small").animate({
                left: "0"
            }, 1e3)
        });
        var e = new Date;
        e.setTime(e.getTime() + 864e5);
        var t = "expires=" + e.toGMTString();
        document.cookie = "guideflyout=true; " + t + "; path=/;"
    }, 3e4),
    read_cookie("guideflyout") && $("#guide-flyout-small").css("left", "0"))
});
var daralytics = function(e) {
    var t = !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0
      , a = "undefined" != typeof InstallTrigger
      , o = /constructor/i.test(window.HTMLElement) || function(e) {
        return "[object SafariRemoteNotification]" === e.toString()
    }(!window.safari || safari.pushNotification)
      , n = !!document.documentMode
      , i = !n && !!window.StyleMedia
      , r = !!window.chrome && !!window.chrome.webstore;
    switch (!0) {
    case t:
        var s = "Opera";
        break;
    case r:
        var s = "Chrome";
        break;
    case i:
        var s = "Edge";
        break;
    case n:
        var s = "IE";
        break;
    case o:
        var s = "Safari";
        break;
    case a:
        var s = "Firefox";
        break;
    default:
        var s = "unable to pull user browser info"
    }
    var l = window.screen.availHeight
      , c = window.screen.availWidth
      , d = c + " x " + l
      , u = "User IP: " + e + "\nUserBrowser: " + s + "\nUser Resolution: " + d
      , p = localStorage.getItem("userMetrics");
    null === p && localStorage.setItem("userMetrics", u);
    var m = new Date
      , f = window.location.href
      , v = m + " : " + f
      , h = localStorage.getItem("userPage");
    if (null === h)
        localStorage.setItem("userPage", v);
    else
        var $ = localStorage.getItem("userPage");
    var g = Math.floor(new Date)
      , w = localStorage.getItem("userUnix");
    if (null === w)
        if (localStorage.setItem("userUnix", g),
        v = "Session 1: \n" + v,
        localStorage.setItem("userPage", v),
        localStorage.setItem("userSession", "1"),
        f.indexOf("scvn") > -1) {
            f.split("?");
            localStorage.setItem("userAdwords", "The first visit came from an Adwords Campaign")
        } else
            localStorage.setItem("userAdwords", "This is an organic visitor");
    else {
        var b = g - w;
        if (b > 18e5) {
            var y = localStorage.getItem("userSession")
              , y = parseInt(y) + 1;
            localStorage.setItem("userSession", y),
            localStorage.setItem("userUnix", g);
            var k = $ + "\nSession " + y + ": \n" + v;
            localStorage.setItem("userPage", k),
            localStorage.setItem("userPage", k)
        } else
            localStorage.setItem("userUnix", g),
            k = $ + "\n" + v,
            localStorage.setItem("userPage", k)
    }
};
