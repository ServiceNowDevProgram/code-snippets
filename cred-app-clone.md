Article Title: Cred App clone
Author Name: Ved Prakash Bhaskar
Author Profile: github.com/iamvpbhaskar
Date: 27th october 2021

# CRED APP CLONE

<!DOCTYPE html>
<html lang="en">

<head>
    <script>
        (function(w, d, s, l, i) 
{
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-K39WXPP');
    </script>
    <script>
        window._vwo_code = window._vwo_code || (function() {
            var account_id = 574249,
                settings_tolerance = 2000,
                library_tolerance = 2500,
                use_existing_jquery = false,
                is_spa = 1,
                hide_element = 'body',

                /* DO NOT EDIT BELOW THIS LINE */
                f = false,
                d = document,
                code = {
                    use_existing_jquery: function() {
                        return use_existing_jquery;
                    },
                    library_tolerance: function() {
                        return library_tolerance;
                    },
                    finish: function() {
                        if (!f) {
                            f = true;
                            var a = d.getElementById('_vis_opt_path_hides');
                            if (a) a.parentNode.removeChild(a);
                        }
                    },
                    finished: function() {
                        return f;
                    },
                    load: function(a) {
                        var b = d.createElement('script');
                        b.src = a;
                        b.type = 'text/javascript';
                        b.innerText;
                        b.onerror = function() {
                            _vwo_code.finish();
                        };
                        d.getElementsByTagName('head')[0].appendChild(b);
                    },
                    init: function() {
                        window.settings_timer = setTimeout(function() {
                            _vwo_code.finish()
                        }, settings_tolerance);
                        var a = d.createElement('style'),
                            b = hide_element ? hide_element + '{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}' : '',
                            h = d.getElementsByTagName('head')[0];
                        a.setAttribute('id', '_vis_opt_path_hides');
                        a.setAttribute('type', 'text/css');
                        if (a.styleSheet) a.styleSheet.cssText = b;
                        else a.appendChild(d.createTextNode(b));
                        h.appendChild(a);
                        this.load('https://dev.visualwebsiteoptimizer.com/j.php?a=' + account_id + '&u=' + encodeURIComponent(d.URL) + '&f=' + (+is_spa) + '&r=' + Math.random());
                        return settings_timer;
                    }
                };
            window._vwo_settings_timer = code.init();
            return code;
        }());
    </script>
    <script>
        (function(c, a) {
            if (!a.__SV) {
                var b = window;
                try {
                    var d, m, j, k = b.location,
                        f = k.hash;
                    d = function(a, b) {
                        return (m = a.match(RegExp(b + "=([^&]*)"))) ? m[1] : null
                    };
                    f && d(f, "state") && (j = JSON.parse(decodeURIComponent(d(f, "state"))), "mpeditor" === j.action && (b.sessionStorage.setItem("_mpcehash", f), history.replaceState(j.desiredHash || "", c.title, k.pathname + k.search)))
                } catch (n) {}
                var l, h;
                window.mixpanel = a;
                a._i = [];
                a.init = function(b, d, g) {
                    function c(b, i) {
                        var a = i.split(".");
                        2 == a.length && (b = b[a[0]], i = a[1]);
                        b[i] = function() {
                            b.push([i].concat(Array.prototype.slice.call(arguments,
                                0)))
                        }
                    }
                    var e = a;
                    "undefined" !== typeof g ? e = a[g] = [] : g = "mixpanel";
                    e.people = e.people || [];
                    e.toString = function(b) {
                        var a = "mixpanel";
                        "mixpanel" !== g && (a += "." + g);
                        b || (a += " (stub)");
                        return a
                    };
                    e.people.toString = function() {
                        return e.toString(1) + ".people (stub)"
                    };
                    l = "disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
                    for (h = 0; h < l.length; h++) c(e, l[h]);
                    var f = "set set_once union unset remove delete".split(" ");
                    e.get_group = function() {
                        function a(c) {
                            b[c] = function() {
                                call2_args = arguments;
                                call2 = [c].concat(Array.prototype.slice.call(call2_args, 0));
                                e.push([d, call2])
                            }
                        }
                        for (var b = {}, d = ["get_group"].concat(Array.prototype.slice.call(arguments, 0)), c = 0; c < f.length; c++) a(f[c]);
                        return b
                    };
                    a._i.push([b, d, g])
                };
                a.__SV = 1.2;
                b = c.createElement("script");
                b.type = "text/javascript";
                b.async = !0;
                b.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ?
                    MIXPANEL_CUSTOM_LIB_URL : "file:" === c.location.protocol && "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match('/^///') ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
                d = c.getElementsByTagName("script")[0];
                d.parentNode.insertBefore(b, d)
            }
        })(document, window.mixpanel || []);
        mixpanel.init("7f21b0f2fb608279feacb54986fd1354");
        mixpanel.track("page_view", {
            "path": window.location.pathname
        });

        window.addEventListener("load", function() {
            var totalFolds = Math.floor(document.body.clientHeight / window.innerHeight);
            var maxFold = 1;
            // console.log("content height",document.body.clientHeight,"total Folds", totalFolds);
            var scrollHandler = function() {
                var fold = Math.floor(window.scrollY / window.innerHeight) + 1;
                if (fold > maxFold) {
                    // console.log(fold);
                    mixpanel.track("page_scrolled", {
                        "path": window.location.pathname,
                        "fold": fold,
                        "total_folds": totalFolds
                    })
                    maxFold = fold
                }
                if (fold == totalFolds) {
                    document.removeEventListener("scroll", scrollHandler)
                }
            }
            document.addEventListener("scroll", scrollHandler)
        }, false)
    </script>
    <script>
        (function(sa, fbc) {
            function load(f, c) {
                var a = document.createElement('script');
                a.async = 1;
                a.src = f;
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(a, s);
            }
            load(sa);
            window.addEventListener('load', function() {
                firebase.initializeApp(fbc).performance()
            });
        })('https://www.gstatic.com/firebasejs/8.9.1/firebase-performance-standalone.js', {
            "apiKey": "AIzaSyDQUnXd3rKMz52M6Pkc_4Ak83HNYRlnOXU",
            "authDomain": "webserverprod.firebaseapp.com",
            "databaseURL": "https://webserverprod.firebaseio.com",
            "projectId": "webserverprod",
            "storageBucket": "webserverprod.appspot.com",
            "messagingSenderId": "254853244347",
            "appId": "1:254853244347:web:9f52689aaa9579ed81909e",
            "measurementId": "G-QL7LBVGZF3"
        });
    </script>
    <script async="" src="https://www.google.com/recaptcha/api.js?render=6LcwXdAZAAAAABZIq76C7aC8s3IZ7pX_9hwEBse4"></script>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
    <meta name="theme-color" content="#1a1b1d" />
    <title>CRED - pay your credit card bills &amp; earn rewards</title>
    <meta name="description" content="Join 7.5M+ CRED members to earn rewards on your credit card bill payments." />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="CRED - pay your credit card bills &amp; earn rewards" />
    <meta property="og:description" content="Join 7.5M+ CRED members to earn rewards on your credit card bill payments." />
    <meta property="og:image" content="https://cred.club/assets/icons/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@CRED_club" />
    <meta name="twitter:title" content="CRED - pay your credit card bills &amp; earn rewards" />
    <meta name="twitter:description" content="Join 7.5M+ CRED members to earn rewards on your credit card bill payments." />
    <meta name="twitter:image" content="https://cred.club/assets/icons/og-image.png" />
    <link rel="shortcut icon" type="image/png" href="https://cred.club/assets/icons/logo.png" />
    <link rel="canonical" href="https://cred.club" />
    <script type="application/ld+json">
        {
            "@context": "http://schema.org",
            "@type": "Organization",
            "name": "CRED",
            "url": "https://cred.club/",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "",
                "addressLocality": "Bangalore",
                "postalCode": "",
                "addressCountry": "INDIA"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "telephone": "",
                "email": ""
            },
            "logo": "https://cred.club/assets/icons/logo.png",
            "sameAs": ["https://www.facebook.com/CRED.club.official", "https://twitter.com/CRED_club", "https://www.instagram.com/cred_club", "https://www.linkedin.com/company/credapp/", "https://www.youtube.com/channel/UCxccMFkBeBi0oaQW6WVeo4g"]
        }
    </script><noscript data-n-css="true"></noscript>
    <link rel="preload" href="https://web-assets.cred.club/_next/static/chunks/main-70aecfbcacfe15b77a9c.js" as="script" />
    <link rel="preload" href="https://web-assets.cred.club/_next/static/chunks/webpack-e067438c4cf4ef2ef178.js" as="script" />
    <link rel="preload" href="https://web-assets.cred.club/_next/static/chunks/framework.baa41d4dbf5d52db897c.js" as="script" />
    <link rel="preload" href="https://web-assets.cred.club/_next/static/chunks/f5e09dcdbbe52e6d51a90b4e069486727791b8e2.0a836e232ed405b93873.js" as="script" />
    <link rel="preload" href="https://web-assets.cred.club/_next/static/chunks/1ff1742ee40ffc4a27057360ca41303a81f93e2c.1add377ba8371a79a420.js" as="script" />
    <link rel="preload" href="https://web-assets.cred.club/_next/static/chunks/9425d2def8d53213ce785dd77705a26ee399d281.e0753659488fa48ecfba.js" as="script" />
    <link rel="preload" href="https://web-assets.cred.club/_next/static/chunks/pages/_app-95d05f5aeac0ba6afa9f.js" as="script" />
    <link rel="preload" href="https://web-assets.cred.club/_next/static/chunks/60dda3c3556f28342119ad3f21dc986d3f96e37d.bccf6b7901d26407774d.js" as="script" />
    <link rel="preload" href="https://web-assets.cred.club/_next/static/chunks/09996155175480500f7422509e4a6e96f04f9f20.2f22d2c191b559ae5d74.js" as="script" />
    <link rel="preload" href="https://web-assets.cred.club/_next/static/chunks/203dbc6330bd38bbea535bcec3cf8a017b59718e.e657d0d8e24dd8e8d890.js" as="script" />
    <link rel="preload" href="https://web-assets.cred.club/_next/static/chunks/pages/index-d840fe396ac9b1231c97.js" as="script" />
    <style data-styled="" data-styled-version="5.1.1">
        .Ia-Dfh {
            display: -webkit-inline-box;
            display: -webkit-inline-flex;
            display: -ms-inline-flexbox;
            display: inline-flex;
            white-space: nowrap;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            position: relative;
            pointer-events: auto;
            text-align: center;
            padding: 20px 65px;
            background-color: #ffffff;
            color: #000000;
            font-size: 24px;
            font-family: 'gilroy-bold';
            -webkit-letter-spacing: 0.4px;
            -moz-letter-spacing: 0.4px;
            -ms-letter-spacing: 0.4px;
            letter-spacing: 0.4px;
            line-height: 30px;
            border-radius: 40px;
            cursor: pointer;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .Ia-Dfh {
                font-size: 18px;
                -webkit-letter-spacing: 0.3px;
                -moz-letter-spacing: 0.3px;
                -ms-letter-spacing: 0.3px;
                letter-spacing: 0.3px;
                line-height: 18px;
                padding: 16px 24px;
                cursor: none;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .Ia-Dfh {
                font-size: 18px;
                -webkit-letter-spacing: 0.3px;
                -moz-letter-spacing: 0.3px;
                -ms-letter-spacing: 0.3px;
                letter-spacing: 0.3px;
                line-height: 18px;
                padding: 16px 28px;
                cursor: none;
            }
        }

        /*!sc*/

        data-styled.g1[id="sc-5e3ivb-0"] {
            content: "Ia-Dfh,"
        }

        /*!sc*/

        .fpGwhb {
            padding: 4px 0;
            position: relative;
        }

        /*!sc*/

        .fpGwhb>a {
            color: #ffffff;
            opacity: 80%;
            font-family: 'Gilroy-Semibold';
            font-size: 18px;
            line-height: 36px;
            white-space: nowrap;
            margin-right: 20px;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .fpGwhb>a {
                font-size: 13px;
                line-height: 26px;
            }
        }

        /*!sc*/

        data-styled.g25[id="sc-1fujqi8-0"] {
            content: "fpGwhb,"
        }

        /*!sc*/

        .frKdJG {
            display: inline-block;
            position: absolute;
            top: -12px;
            right: 20px;
            padding: 4px 10px 2.5px 10px;
            text-transform: uppercase;
            background-color: #4a7d3a;
            border-radius: 10px;
            font-family: 'gilroy-semibold';
            font-size: 10px;
            color: #efebec;
            -webkit-letter-spacing: 1.7px;
            -moz-letter-spacing: 1.7px;
            -ms-letter-spacing: 1.7px;
            letter-spacing: 1.7px;
            line-height: 12px;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .frKdJG {
                top: 7px;
                right: 5px;
                font-size: 8px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:768px) {
            .frKdJG {
                top: 12px;
                right: 5px;
                font-size: 8px;
            }
        }

        /*!sc*/

        data-styled.g26[id="sc-1fujqi8-1"] {
            content: "frKdJG,"
        }

        /*!sc*/

        .gScKBO {
            position: fixed;
            background-color: #0f0f0f;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-transform: translateX(100%);
            -ms-transform: translateX(100%);
            transform: translateX(100%);
            height: 100vh;
            text-align: left;
            padding: 2rem;
            top: 0;
            left: 0;
            -webkit-transition: -webkit-transform 0.3s ease-in-out;
            -webkit-transition: transform 0.3s ease-in-out;
            transition: transform 0.3s ease-in-out;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .gScKBO {
                width: 100%;
                z-index: 1;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:768px) {
            .gScKBO {
                width: 100%;
                z-index: 1;
            }
        }

        /*!sc*/

        .gScKBO a {
            color: #efebec;
            -webkit-text-decoration: none;
            text-decoration: none;
            -webkit-transition: color 0.3s linear;
            transition: color 0.3s linear;
            font-family: Gilroy-Semibold;
            -webkit-tap-highlight-color: transparent;
        }

        /*!sc*/

        @media (max-width:576px) {
            .gScKBO a {
                font-size: 14px;
            }
        }

        /*!sc*/

        .gScKBO a:active {
            color: #efebec;
        }

        /*!sc*/

        data-styled.g27[id="sc-50n7ru-0"] {
            content: "gScKBO,"
        }

        /*!sc*/

        .dJUcrR {
            margin-top: 120px;
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .dJUcrR {
                margin-top: 95px;
                overflow-y: scroll;
            }
        }

        /*!sc*/

        data-styled.g28[id="sc-50n7ru-1"] {
            content: "dJUcrR,"
        }

        /*!sc*/

        .ewCAWC {
            width: 100%;
            display: block;
            margin-left: 36px;
            font-family: 'gilroy-semibold';
            font-size: 18px;
            -webkit-letter-spacing: 0;
            -moz-letter-spacing: 0;
            -ms-letter-spacing: 0;
            letter-spacing: 0;
            line-height: 18px;
            -webkit-text-decoration: none;
            text-decoration: none;
            -webkit-tap-highlight-color: transparent;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .ewCAWC {
                margin-left: 0px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .ewCAWC {
                margin-left: 0px;
            }
        }

        /*!sc*/

        data-styled.g29[id="sc-50n7ru-2"] {
            content: "ewCAWC,"
        }

        /*!sc*/

        .jXDZRr {
            padding: 15px 15px;
            position: relative;
            background-color: rgb(39 43 45 / 43%);
            margin-bottom: 20px;
            border: 1px solid transparent;
            border-radius: 15px;
            -webkit-tap-highlight-color: transparent;
        }

        /*!sc*/

        .jXDZRr>a {
            color: #ffffff;
            opacity: 80%;
            font-family: 'Gilroy-Bold';
            font-size: 19px;
            line-height: 36px;
            white-space: nowrap;
            margin-right: 20px;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .jXDZRr>a {
                font-size: 13px;
                line-height: 26px;
            }
        }

        /*!sc*/

        data-styled.g30[id="sc-50n7ru-3"] {
            content: "jXDZRr,"
        }

        /*!sc*/

        .gyGGjM {
            display: none;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .gyGGjM {
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:768px) {
            .gyGGjM {
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
            }
        }

        /*!sc*/

        data-styled.g31[id="sc-50n7ru-4"] {
            content: "gyGGjM,"
        }

        /*!sc*/

        .KmvFF {
            margin-right: 0px;
            background: none;
            border: none;
            display: block;
            position: relative;
            cursor: pointer;
        }

        /*!sc*/

        .KmvFF input {
            display: none;
        }

        /*!sc*/

        .KmvFF input~div {
            position: absolute;
            height: 3px;
            border-radius: 2px;
            background: #fff;
            opacity: 0.7;
            -webkit-transition: -webkit-transform 0.45s cubic-bezier(0.9, -0.6, 0.3, 1.6), width 0.2s ease 0.2s;
            -webkit-transition: transform 0.45s cubic-bezier(0.9, -0.6, 0.3, 1.6), width 0.2s ease 0.2s;
            transition: transform 0.45s cubic-bezier(0.9, -0.6, 0.3, 1.6), width 0.2s ease 0.2s;
        }

        /*!sc*/

        data-styled.g32[id="sc-50n7ru-5"] {
            content: "KmvFF,"
        }

        /*!sc*/

        .hcIRQt {
            z-index: 2;
            background: none;
            border: none;
            -webkit-tap-highlight-color: transparent;
        }

        /*!sc*/

        .hcIRQt div {
            margin-right: 0px;
            background: none;
            border: none;
            display: block;
            width: 33px;
            height: 32px;
            position: relative;
            cursor: pointer;
        }

        /*!sc*/

        .hcIRQt div:nth-child(4) {
            -webkit-transform: translateX(0px) rotate(0);
            -ms-transform: translateX(0px) rotate(0);
            transform: translateX(0px) rotate(0);
            -webkit-transition: -webkit-transform 0.45s cubic-bezier(0.9, -0.6, 0.3, 1.6), width 0.2s ease 0.2s;
            -webkit-transition: transform 0.45s cubic-bezier(0.9, -0.6, 0.3, 1.6), width 0.2s ease 0.2s;
            transition: transform 0.45s cubic-bezier(0.9, -0.6, 0.3, 1.6), width 0.2s ease 0.2s;
            width: 33px;
            bottom: 5px;
            right: 0;
        }

        /*!sc*/

        .hcIRQt div:nth-child(2) {
            width: 28px;
            -webkit-transform: translate(5px, 0px) rotate(0);
            -ms-transform: translate(5px, 0px) rotate(0);
            transform: translate(5px, 0px) rotate(0);
            -webkit-transition: -webkit-transform 0.45s cubic-bezier(0.9, -0.6, 0.3, 1.6) 0.1s;
            -webkit-transition: transform 0.45s cubic-bezier(0.9, -0.6, 0.3, 1.6) 0.1s;
            transition: transform 0.45s cubic-bezier(0.9, -0.6, 0.3, 1.6) 0.1s;
            top: 14px;
            left: 0;
        }

        /*!sc*/

        .hcIRQt div:nth-child(3) {
            -webkit-transform: translate(0px, 0px) rotate(0);
            -ms-transform: translate(0px, 0px) rotate(0);
            transform: translate(0px, 0px) rotate(0);
            width: 33px;
            top: 4px;
            left: 0;
        }

        /*!sc*/

        .hcIRQt:focus {
            outline: none;
            border: none;
            background-color: transparent;
            box-shadow: none;
        }

        /*!sc*/

        data-styled.g33[id="sc-50n7ru-6"] {
            content: "hcIRQt,"
        }

        /*!sc*/

        .fEwefL {
            background-color: #0f0f0f;
            color: #f8f8f8;
            width: 100vw;
            min-height: 100vh;
            position: relative;
            padding: 60px 200px 200px 200px;
            overflow: hidden;
            background-image: url(https://web-images.credcdn.in/_next/assets/images/home-page/hero-bg.png);
            background-size: cover;
            background-position: bottom right;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            -ms-flex-pack: justify;
            justify-content: space-between;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .fEwefL {
                padding: 60px 40px 70px 40px;
                background-image: url(https://web-images.credcdn.in/_next/assets/images/home-page/hero-bg-mobile.png);
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .fEwefL {
                padding: 60px;
                background-image: url(https://web-images.credcdn.in/_next/assets/images/home-page/hero-bg-mobile.png);
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .fEwefL {
                padding: 60px 50px 100px 50px;
            }
        }

        /*!sc*/

        data-styled.g34[id="cv46ji-0"] {
            content: "fEwefL,"
        }

        /*!sc*/

        .gpQrbj {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
        }

        /*!sc*/

        data-styled.g35[id="cv46ji-1"] {
            content: "gpQrbj,"
        }

        /*!sc*/

        .hpVOts {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
        }

        /*!sc*/

        data-styled.g36[id="cv46ji-2"] {
            content: "hpVOts,"
        }

        /*!sc*/

        .ehQGVd {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
        }

        /*!sc*/

        data-styled.g37[id="cv46ji-3"] {
            content: "ehQGVd,"
        }

        /*!sc*/

        .ddPhLv {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .ddPhLv {
                -webkit-align-items: flex-start;
                -webkit-box-align: flex-start;
                -ms-flex-align: flex-start;
                align-items: flex-start;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .ddPhLv {
                -webkit-align-items: flex-start;
                -webkit-box-align: flex-start;
                -ms-flex-align: flex-start;
                align-items: flex-start;
            }
        }

        /*!sc*/

        data-styled.g39[id="cv46ji-5"] {
            content: "ddPhLv,"
        }

        /*!sc*/

        .edUFdE {
            font-family: 'gilroy-bold';
            font-size: 150px;
            -webkit-letter-spacing: -4.5px;
            -moz-letter-spacing: -4.5px;
            -ms-letter-spacing: -4.5px;
            letter-spacing: -4.5px;
            line-height: 150px;
            text-align: center;
            white-space: pre-line;
            margin-top: 100px;
        }

        /*!sc*/

        @media screen and (max-width:1630px) {
            .edUFdE {
                font-size: 106px;
                line-height: 125px;
                -webkit-letter-spacing: -3px;
                -moz-letter-spacing: -3px;
                -ms-letter-spacing: -3px;
                letter-spacing: -3px;
            }
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .edUFdE {
                font-size: 55px;
                font-family: 'gilroy-bold';
                -webkit-letter-spacing: -1.65px;
                -moz-letter-spacing: -1.65px;
                -ms-letter-spacing: -1.65px;
                letter-spacing: -1.65px;
                line-height: 47.5px;
                text-align: left;
                white-space: inherit;
                width: 270px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .edUFdE {
                font-size: 65px;
                font-family: 'gilroy-bold';
                -webkit-letter-spacing: -1.65px;
                -moz-letter-spacing: -1.65px;
                -ms-letter-spacing: -1.65px;
                letter-spacing: -1.65px;
                line-height: 55px;
                text-align: left;
                white-space: inherit;
                width: 340px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:901px) and (max-width:1279px) {
            .edUFdE {
                font-size: 97px;
                line-height: 107px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:900px) {
            .edUFdE {
                font-size: 82px;
                line-height: 92px;
            }
        }

        /*!sc*/

        data-styled.g40[id="cv46ji-6"] {
            content: "edUFdE,"
        }

        /*!sc*/

        .VPxFp {
            font-family: 'gilroy-bold';
            font-size: 30px;
            -webkit-letter-spacing: -0.2px;
            -moz-letter-spacing: -0.2px;
            -ms-letter-spacing: -0.2px;
            letter-spacing: -0.2px;
            line-height: 38px;
            margin-top: 35px;
            text-align: center;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .VPxFp {
                font-size: 16px;
                font-family: 'gilroy-semibold';
                -webkit-letter-spacing: 0px;
                -moz-letter-spacing: 0px;
                -ms-letter-spacing: 0px;
                letter-spacing: 0px;
                line-height: 22px;
                white-space: pre-line;
                width: 270px;
                text-align: left;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .VPxFp {
                font-size: 19px;
                font-family: 'gilroy-semibold';
                -webkit-letter-spacing: 0px;
                -moz-letter-spacing: 0px;
                -ms-letter-spacing: 0px;
                letter-spacing: 0px;
                line-height: 24px;
                white-space: pre-line;
                width: 320px;
                text-align: left;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .VPxFp {
                font-size: 25px;
            }
        }

        /*!sc*/

        data-styled.g41[id="cv46ji-7"] {
            content: "VPxFp,"
        }

        /*!sc*/

        .glAAqe {
            margin-left: 78px;
            width: 132px;
            height: 65px;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .glAAqe {
                margin-left: 30px;
                width: auto;
                height: 43px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .glAAqe {
                margin-left: 45px;
                width: auto;
                height: 53px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .glAAqe {
                margin-left: 60px;
                width: 87px;
                height: 43px;
            }
        }

        /*!sc*/

        data-styled.g42[id="cv46ji-8"] {
            content: "glAAqe,"
        }

        /*!sc*/

        .cstQZH {
            width: 49px;
            height: 66px;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .cstQZH {
                width: 40px;
                height: 53px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .cstQZH {
                width: 40px;
                height: 53px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .cstQZH {
                width: 40px;
                height: 53px;
            }
        }

        /*!sc*/

        data-styled.g44[id="cv46ji-10"] {
            content: "cstQZH,"
        }

        /*!sc*/

        .fFHWQu {
            display: -webkit-inline-box;
            display: -webkit-inline-flex;
            display: -ms-inline-flexbox;
            display: inline-flex;
            white-space: nowrap;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            position: relative;
            pointer-events: auto;
            text-align: center;
            padding: 20px 65px;
            background-color: #ffffff;
            color: #000000;
            font-size: 24px;
            font-family: 'gilroy-bold';
            -webkit-letter-spacing: 0.4px;
            -moz-letter-spacing: 0.4px;
            -ms-letter-spacing: 0.4px;
            letter-spacing: 0.4px;
            line-height: 30px;
            border-radius: 40px;
            cursor: pointer;
            margin-top: 58px;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .fFHWQu {
                font-size: 18px;
                -webkit-letter-spacing: 0.3px;
                -moz-letter-spacing: 0.3px;
                -ms-letter-spacing: 0.3px;
                letter-spacing: 0.3px;
                line-height: 18px;
                padding: 16px 24px;
                cursor: none;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .fFHWQu {
                font-size: 18px;
                -webkit-letter-spacing: 0.3px;
                -moz-letter-spacing: 0.3px;
                -ms-letter-spacing: 0.3px;
                letter-spacing: 0.3px;
                line-height: 18px;
                padding: 16px 28px;
                cursor: none;
            }
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .fFHWQu {
                margin-top: 35px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .fFHWQu {
                margin-top: 35px;
            }
        }

        /*!sc*/

        data-styled.g45[id="cv46ji-11"] {
            content: "fFHWQu,"
        }

        /*!sc*/

        .dkFXGp {
            -webkit-text-decoration: none;
            text-decoration: none;
            outline: none;
            cursor: pointer;
        }

        /*!sc*/

        data-styled.g46[id="cv46ji-12"] {
            content: "dkFXGp,"
        }

        /*!sc*/

        .jQyYQZ {
            margin-left: 36px;
            font-family: 'gilroy-semibold';
            font-size: 18px;
            -webkit-letter-spacing: 0;
            -moz-letter-spacing: 0;
            -ms-letter-spacing: 0;
            letter-spacing: 0;
            line-height: 18px;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .jQyYQZ {
                display: none;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:768px) {
            .jQyYQZ {
                display: none;
            }
        }

        /*!sc*/

        data-styled.g50[id="cv46ji-16"] {
            content: "jQyYQZ,"
        }

        /*!sc*/

        .GbLeF {
            background-color: #ee2f4c;
            color: #f8f8f8;
            width: 100vw;
            min-height: 100vh;
            position: relative;
            padding: 240px 200px 180px 200px;
            background-image: url(https://web-images.credcdn.in/_next/assets/images/home-page/deserve-more-bg.jpg);
            background-size: cover;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            -ms-flex-pack: justify;
            justify-content: space-between;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .GbLeF {
                background-image: url(https://web-images.credcdn.in/_next/assets/images/home-page/deserve-more-bg-mobile.jpg);
                padding: 195px 40px 90px 40px;
                min-height: 1150px;
                background-position: right;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .GbLeF {
                background-position: center;
                padding: 195px 60px 90px 60px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .GbLeF {
                padding: 100px;
                background-position: bottom;
            }
        }

        /*!sc*/

        .ilaKtF {
            background-color: #1a61e9;
            color: #f8f8f8;
            width: 100vw;
            min-height: 100vh;
            position: relative;
            padding: 240px 200px 180px 200px;
            background-image: url(https://web-images.credcdn.in/_next/assets/images/home-page/money-matters-bg.jpg);
            background-size: cover;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            -ms-flex-pack: justify;
            justify-content: space-between;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .ilaKtF {
                background-image: url(https://web-images.credcdn.in/_next/assets/images/home-page/money-matters-bg-mobile.jpg);
                padding: 195px 40px 90px 40px;
                min-height: 1150px;
                background-position: right;
                min-height: 1350px;
                -webkit-box-pack: end;
                -webkit-justify-content: flex-end;
                -ms-flex-pack: end;
                justify-content: flex-end;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .ilaKtF {
                background-position: center;
                padding: 195px 60px 90px 60px;
                min-height: 1280px;
                -webkit-box-pack: end;
                -webkit-justify-content: flex-end;
                -ms-flex-pack: end;
                justify-content: flex-end;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .ilaKtF {
                padding: 100px;
                background-position: bottom;
            }
        }

        /*!sc*/

        .cppHQL {
            background-color: #5a1ecb;
            color: #f8f8f8;
            width: 100vw;
            min-height: 100vh;
            position: relative;
            padding: 240px 200px 180px 200px;
            background-image: url(https://web-images.credcdn.in/_next/assets/images/home-page/security-bg.jpg);
            background-size: cover;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            -ms-flex-pack: justify;
            justify-content: space-between;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .cppHQL {
                background-image: url(https://web-images.credcdn.in/_next/assets/images/home-page/security-bg-mobile.jpg);
                padding: 195px 40px 90px 40px;
                min-height: 1150px;
                background-position: right;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .cppHQL {
                background-position: center;
                padding: 195px 60px 90px 60px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .cppHQL {
                padding: 100px;
                background-position: bottom;
            }
        }

        /*!sc*/

        data-styled.g51[id="sc-1m4af1p-0"] {
            content: "GbLeF,ilaKtF,cppHQL,"
        }

        /*!sc*/

        .iAgSwY {
            font-size: 100px;
            font-family: 'gilroy-bold';
            -webkit-letter-spacing: -3.15px;
            -moz-letter-spacing: -3.15px;
            -ms-letter-spacing: -3.15px;
            letter-spacing: -3.15px;
            line-height: 96px;
            white-space: pre-line;
            opacity: 0.9;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .iAgSwY {
                font-size: 65px;
                font-family: 'gilroy-bold';
                -webkit-letter-spacing: -1.95px;
                -moz-letter-spacing: -1.95px;
                -ms-letter-spacing: -1.95px;
                letter-spacing: -1.95px;
                line-height: 58px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .iAgSwY {
                font-size: 85px;
                line-height: 75px;
                max-width: 80%;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .iAgSwY {
                white-space: initial;
                max-width: 670px;
            }
        }

        /*!sc*/

        data-styled.g52[id="sc-1m4af1p-1"] {
            content: "iAgSwY,"
        }

        /*!sc*/

        .htbqsH {
            font-size: 32px;
            font-family: 'gilroy-bold';
            -webkit-letter-spacing: -0.2px;
            -moz-letter-spacing: -0.2px;
            -ms-letter-spacing: -0.2px;
            letter-spacing: -0.2px;
            line-height: 38px;
            white-space: pre-line;
            max-width: 630px;
            margin-top: 16px;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .htbqsH {
                font-size: 18px;
                -webkit-letter-spacing: 0px;
                -moz-letter-spacing: 0px;
                -ms-letter-spacing: 0px;
                letter-spacing: 0px;
                line-height: 24px;
                margin-top: 26px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .htbqsH {
                font-size: 24px;
                line-height: 34px;
            }
        }

        /*!sc*/

        data-styled.g53[id="sc-1m4af1p-2"] {
            content: "htbqsH,"
        }

        /*!sc*/

        .gOJvBn {
            font-size: 18px;
            font-family: 'gilroy-semibold';
            -webkit-letter-spacing: 0px;
            -moz-letter-spacing: 0px;
            -ms-letter-spacing: 0px;
            letter-spacing: 0px;
            line-height: 28px;
            white-space: pre-line;
            max-width: 630px;
            margin-bottom: 40px;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .gOJvBn {
                font-family: 'gilroy-regular';
                font-size: 14px;
                -webkit-letter-spacing: 0.2px;
                -moz-letter-spacing: 0.2px;
                -ms-letter-spacing: 0.2px;
                letter-spacing: 0.2px;
                line-height: 20px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .gOJvBn {
                font-size: 16px;
                line-height: 22px;
            }
        }

        /*!sc*/

        .gBIUJo {
            font-size: 18px;
            font-family: 'gilroy-semibold';
            -webkit-letter-spacing: 0px;
            -moz-letter-spacing: 0px;
            -ms-letter-spacing: 0px;
            letter-spacing: 0px;
            line-height: 28px;
            white-space: pre-line;
            max-width: 630px;
            margin-bottom: 40px;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .gBIUJo {
                font-family: 'gilroy-regular';
                font-size: 14px;
                -webkit-letter-spacing: 0.2px;
                -moz-letter-spacing: 0.2px;
                -ms-letter-spacing: 0.2px;
                letter-spacing: 0.2px;
                line-height: 20px;
                margin-top: 75px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .gBIUJo {
                font-size: 16px;
                line-height: 22px;
            }
        }

        /*!sc*/

        data-styled.g54[id="sc-1m4af1p-3"] {
            content: "gOJvBn,gBIUJo,"
        }

        /*!sc*/

        .djjPLz {
            background-color: #f8f8f8;
            color: #212426;
            width: 100vw;
            position: relative;
            padding: 60px 200px;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .djjPLz {
                padding: 60px 40px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:480px) and (max-width:767px) {
            .djjPLz {
                padding: 60px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .djjPLz {
                padding: 60px 100px;
            }
        }

        /*!sc*/

        data-styled.g55[id="sc-1pzzl0u-0"] {
            content: "djjPLz,"
        }

        /*!sc*/

        .loOZda {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-align-items: flex-end;
            -webkit-box-align: flex-end;
            -ms-flex-align: flex-end;
            align-items: flex-end;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .loOZda {
                -webkit-align-items: flex-start;
                -webkit-box-align: flex-start;
                -ms-flex-align: flex-start;
                align-items: flex-start;
                -webkit-flex-direction: column;
                -ms-flex-direction: column;
                flex-direction: column;
            }
        }

        /*!sc*/

        data-styled.g56[id="sc-1pzzl0u-1"] {
            content: "loOZda,"
        }

        /*!sc*/

        .kMylDB {
            font-size: 24px;
            font-family: 'gilroy-semibold';
            -webkit-letter-spacing: 0;
            -moz-letter-spacing: 0;
            -ms-letter-spacing: 0;
            letter-spacing: 0;
            line-height: 38px;
            white-space: pre-line;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .kMylDB {
                font-size: 18px;
                font-family: 'gilroy-bold';
                -webkit-letter-spacing: -0.11px;
                -moz-letter-spacing: -0.11px;
                -ms-letter-spacing: -0.11px;
                letter-spacing: -0.11px;
                line-height: 18px;
                opacity: 0.9;
            }
        }

        /*!sc*/

        @media only screen and (min-width:480px) and (max-width:767px) {
            .kMylDB {
                font-size: 22px;
            }
        }

        /*!sc*/

        data-styled.g57[id="sc-1pzzl0u-2"] {
            content: "kMylDB,"
        }

        /*!sc*/

        .lGSkr {
            background-image: url(https://web-images.credcdn.in/_next/assets/images/home-page/brands-desktop.png);
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100%;
            height: 50px;
            width: 100%;
            margin-top: 50px;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .lGSkr {
                background-image: url(https://web-images.credcdn.in/_next/assets/images/home-page/brands-mobile.png);
                background-size: contain;
                height: 240px;
                margin-top: 35px;
                background-position: left;
            }
        }

        /*!sc*/

        data-styled.g59[id="sc-1pzzl0u-4"] {
            content: "lGSkr,"
        }

        /*!sc*/

        .DdrQy {
            background-color: #027757;
            color: #f8f8f8;
            width: 100vw;
            min-height: 100vh;
            position: relative;
            padding: 240px 200px 250px 200px;
            background-image: url(https://web-images.credcdn.in/_next/assets/images/home-page/trust-bg.jpg);
            background-size: cover;
            background-position: bottom right;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            -ms-flex-pack: justify;
            justify-content: space-between;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .DdrQy {
                -webkit-flex-direction: column;
                -ms-flex-direction: column;
                flex-direction: column;
                padding: 70px 40px;
                background-image: url(https://web-images.credcdn.in/_next/assets/images/home-page/trust-bg-mobile.jpg);
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .DdrQy {
                padding: 60px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .DdrQy {
                padding: 200px 100px;
            }
        }

        /*!sc*/

        data-styled.g60[id="ct2shy-0"] {
            content: "DdrQy,"
        }

        /*!sc*/

        .eHKzYg {
            font-size: 60px;
            font-family: 'gilroy-bold';
            -webkit-letter-spacing: -1.15px;
            -moz-letter-spacing: -1.15px;
            -ms-letter-spacing: -1.15px;
            letter-spacing: -1.15px;
            line-height: 64px;
            white-space: pre-line;
            opacity: 0.9;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .eHKzYg {
                font-size: 55px;
                font-family: 'gilroy-bold';
                -webkit-letter-spacing: -1.65px;
                -moz-letter-spacing: -1.65px;
                -ms-letter-spacing: -1.65px;
                letter-spacing: -1.65px;
                line-height: 47.5px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .eHKzYg {
                font-size: 65px;
                line-height: 55px;
            }
        }

        /*!sc*/

        data-styled.g61[id="ct2shy-1"] {
            content: "eHKzYg,"
        }

        /*!sc*/

        .eEvLrx {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-pack: end;
            -webkit-justify-content: flex-end;
            -ms-flex-pack: end;
            justify-content: flex-end;
            width: 50%;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .eEvLrx {
                width: 100%;
                padding-bottom: 80px;
            }
        }

        /*!sc*/

        data-styled.g64[id="ct2shy-4"] {
            content: "eEvLrx,"
        }

        /*!sc*/

        .bvLpNE {
            width: 50%;
            margin-left: 30px;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-pack: end;
            -webkit-justify-content: flex-end;
            -ms-flex-pack: end;
            justify-content: flex-end;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .bvLpNE {
                margin-left: 0;
                width: 100%;
            }
        }

        /*!sc*/

        data-styled.g65[id="ct2shy-5"] {
            content: "bvLpNE,"
        }

        /*!sc*/

        .cxbMYr {
            font-size: 18px;
            font-family: 'gilroy-regular';
            -webkit-letter-spacing: 0px;
            -moz-letter-spacing: 0px;
            -ms-letter-spacing: 0px;
            letter-spacing: 0px;
            line-height: 28px;
            margin-top: 20px;
            max-width: 550px;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .cxbMYr {
                font-size: 15px;
                font-family: 'gilroy-medium';
                line-height: 24px;
            }
        }

        /*!sc*/

        @media screen and (max-width:360px) {
            .cxbMYr {
                font-size: 13px;
                line-height: 24px;
            }
        }

        /*!sc*/

        data-styled.g66[id="ct2shy-6"] {
            content: "cxbMYr,"
        }

        /*!sc*/

        .dPsZaY {
            background-color: #212426;
            color: #f8f8f8;
            width: 100vw;
            min-height: 100vh;
            position: relative;
            padding: 240px 200px 250px 200px;
            background-image: url(https://web-images.credcdn.in/_next/assets/images/home-page/hero-bg.png);
            background-size: cover;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            -ms-flex-pack: justify;
            justify-content: space-between;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .dPsZaY {
                display: none;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .dPsZaY {
                padding: 60px 100px;
                padding-bottom: 100px;
            }
        }

        /*!sc*/

        data-styled.g67[id="sc-16ozocz-0"] {
            content: "dPsZaY,"
        }

        /*!sc*/

        .kisZXk {
            display: none;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .kisZXk {
                background-color: #212426;
                color: #f8f8f8;
                width: 100vw;
                min-height: 100vh;
                position: relative;
                padding: 70px 40px;
                background-image: url(https://web-images.credcdn.in/_next/assets/images/home-page/hero-bg-mobile.png);
                background-size: contain;
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                -webkit-flex-direction: column;
                -ms-flex-direction: column;
                flex-direction: column;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .kisZXk {
                padding: 60px;
            }
        }

        /*!sc*/

        data-styled.g68[id="sc-16ozocz-1"] {
            content: "kisZXk,"
        }

        /*!sc*/

        .cKSIpx {
            font-size: 105px;
            font-family: 'gilroy-bold';
            -webkit-letter-spacing: -3.15px;
            -moz-letter-spacing: -3.15px;
            -ms-letter-spacing: -3.15px;
            letter-spacing: -3.15px;
            line-height: 105px;
            white-space: pre-line;
            opacity: 0.9;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .cKSIpx {
                font-size: 50px;
                font-family: 'gilroy-bold';
                -webkit-letter-spacing: -1.5px;
                -moz-letter-spacing: -1.5px;
                -ms-letter-spacing: -1.5px;
                letter-spacing: -1.5px;
                line-height: 50px;
                margin-bottom: 60px;
                margin-top: 85px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .cKSIpx {
                font-size: 56px;
                line-height: 54px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .cKSIpx {
                font-size: 70px;
                line-height: 70px;
            }
        }

        /*!sc*/

        data-styled.g69[id="sc-16ozocz-2"] {
            content: "cKSIpx,"
        }

        /*!sc*/

        .cAPXpg {
            font-size: 18px;
            font-family: 'gilroy-semibold';
            -webkit-letter-spacing: 0px;
            -moz-letter-spacing: 0px;
            -ms-letter-spacing: 0px;
            letter-spacing: 0px;
            line-height: 28px;
            white-space: pre-line;
            max-width: 600px;
            margin-top: 52px;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .cAPXpg {
                font-size: 14px;
                font-family: 'gilroy-regular';
                -webkit-letter-spacing: 0.2px;
                -moz-letter-spacing: 0.2px;
                -ms-letter-spacing: 0.2px;
                letter-spacing: 0.2px;
                line-height: 20px;
                margin-top: 55px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .cAPXpg {
                font-size: 16px;
                line-height: 22px;
                max-width: 80%;
            }
        }

        /*!sc*/

        data-styled.g70[id="sc-16ozocz-3"] {
            content: "cAPXpg,"
        }

        /*!sc*/

        .fpFnAT {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-pack: end;
            -webkit-justify-content: flex-end;
            -ms-flex-pack: end;
            justify-content: flex-end;
            width: 50%;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .fpFnAT {
                height: 100vh;
                position: absolute;
                top: 0;
                left: 0;
                -webkit-box-pack: end;
                -webkit-justify-content: flex-end;
                -ms-flex-pack: end;
                justify-content: flex-end;
                padding: 40px;
                padding-bottom: 120px;
            }
        }

        /*!sc*/

        data-styled.g71[id="sc-16ozocz-4"] {
            content: "fpFnAT,"
        }

        /*!sc*/

        .ffCCAC {
            width: 50%;
            margin-left: 30px;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            -ms-flex-pack: center;
            justify-content: center;
            position: relative;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .ffCCAC {
                padding: 0 40px;
                width: 100%;
                height: 100%;
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                -webkit-flex-direction: column;
                -ms-flex-direction: column;
                flex-direction: column;
                -webkit-box-pack: center;
                -webkit-justify-content: center;
                -ms-flex-pack: center;
                justify-content: center;
            }
        }

        /*!sc*/

        data-styled.g72[id="sc-16ozocz-5"] {
            content: "ffCCAC,"
        }

        /*!sc*/

        .dLWWCx {
            position: -webkit-sticky;
            position: sticky;
            top: 180px;
            width: 350px;
            height: 600px;
            box-shadow: inset 0 -5px 6px 0 rgba(176, 176, 178, 0.16), inset 4px 6px 11px 1px rgba(0, 0, 0, 0.24);
            border-radius: 46px;
            padding: 16px 14px;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .dLWWCx {
                width: 300px;
                height: 510px;
                position: relative;
                top: 0;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .dLWWCx {
                width: 272px;
                height: 480px;
            }
        }

        /*!sc*/

        data-styled.g73[id="sc-16ozocz-6"] {
            content: "dLWWCx,"
        }

        /*!sc*/

        .dBUlCg {
            background-color: #272b2d;
            border-radius: 36px;
            height: 100%;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            -ms-flex-pack: center;
            justify-content: center;
            overflow: hidden;
        }

        /*!sc*/

        data-styled.g74[id="sc-16ozocz-7"] {
            content: "dBUlCg,"
        }

        /*!sc*/

        .ijZHsr {
            margin-bottom: 100px;
            margin-top: 250px;
        }

        /*!sc*/

        .ijZHsr:last-child {
            margin-bottom: 0px;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .ijZHsr {
                margin: 0;
            }
        }

        /*!sc*/

        data-styled.g75[id="sc-16ozocz-8"] {
            content: "ijZHsr,"
        }

        /*!sc*/

        .jrsZaJ {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            background-image: url(https://web-images.credcdn.in/_next/assets/images/home-page/hero-bg.png);
            background-position: top right;
            background-size: cover;
            position: relative;
            z-index: 20;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .jrsZaJ {
                padding: 70px 40px;
                background-image: url(https://web-images.credcdn.in/_next/assets/images/home-page/hero-bg-mobile.png);
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .jrsZaJ {
                padding: 100px 60px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .jrsZaJ {
                padding: 100px 60px;
            }
        }

        /*!sc*/

        data-styled.g77[id="rdp2d4-0"] {
            content: "jrsZaJ,"
        }

        /*!sc*/

        .bxjuPP {
            color: #ffffff;
            padding: 200px;
            font-family: 'gilroy-bold';
            white-space: pre-line;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            width: 100vw;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .bxjuPP {
                overflow-y: hidden;
                padding: 0;
                margin: 0;
                position: relative;
                width: 100%;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .bxjuPP {
                padding: 0;
            }
        }

        /*!sc*/

        data-styled.g78[id="rdp2d4-1"] {
            content: "bxjuPP,"
        }

        /*!sc*/

        .lofBEw {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            -ms-flex-pack: center;
            justify-content: center;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .lofBEw {
                -webkit-flex-direction: column;
                -ms-flex-direction: column;
                flex-direction: column;
                width: 100%;
                -webkit-align-items: flex-start;
                -webkit-box-align: flex-start;
                -ms-flex-align: flex-start;
                align-items: flex-start;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .lofBEw {
                -webkit-box-pack: space-evenly;
                -webkit-justify-content: space-evenly;
                -ms-flex-pack: space-evenly;
                justify-content: space-evenly;
            }
        }

        /*!sc*/

        data-styled.g79[id="rdp2d4-2"] {
            content: "lofBEw,"
        }

        /*!sc*/

        .kFkeIx {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding-bottom: 48px;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .kFkeIx {
                -webkit-box-pack: center;
                -webkit-justify-content: center;
                -ms-flex-pack: center;
                justify-content: center;
                padding-bottom: 24px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .kFkeIx {
                padding-bottom: 0px;
            }
        }

        /*!sc*/

        data-styled.g80[id="rdp2d4-3"] {
            content: "kFkeIx,"
        }

        /*!sc*/

        .juaixS {
            font-size: 160px;
            line-height: 120px;
            padding-right: 16px;
            opacity: 90%;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .juaixS {
                font-size: 90px;
                line-height: 70px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .juaixS {
                font-size: 120px;
                line-height: 90px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .juaixS {
                font-size: 100px;
            }
        }

        /*!sc*/

        data-styled.g81[id="rdp2d4-4"] {
            content: "juaixS,"
        }

        /*!sc*/

        .iLeLBT {
            font-size: 60px;
            line-height: 55px;
            padding-left: 16px;
            color: #ece9ea;
            opacity: 90%;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .iLeLBT {
                font-size: 31px;
                line-height: 32px;
                text-align: left;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .iLeLBT {
                font-size: 42px;
                line-height: 40px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .iLeLBT {
                font-size: 45px;
                line-height: 45px;
            }
        }

        /*!sc*/

        data-styled.g82[id="rdp2d4-5"] {
            content: "iLeLBT,"
        }

        /*!sc*/

        .hmFiRE {
            padding-right: 75px;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .hmFiRE {
                padding-right: 0;
                text-align: center;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .hmFiRE {
                padding-right: 35px;
            }
        }

        /*!sc*/

        data-styled.g83[id="rdp2d4-6"] {
            content: "hmFiRE,"
        }

        /*!sc*/

        .gDJLVF {
            padding-left: 75px;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .gDJLVF {
                padding-left: 0;
                text-align: center;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .gDJLVF {
                padding-left: 35px;
            }
        }

        /*!sc*/

        data-styled.g84[id="rdp2d4-7"] {
            content: "gDJLVF,"
        }

        /*!sc*/

        .iEdlWK {
            padding-bottom: 48px;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .iEdlWK {
                padding-bottom: 70px;
                text-align: left;
            }
        }

        /*!sc*/

        data-styled.g85[id="rdp2d4-8"] {
            content: "iEdlWK,"
        }

        /*!sc*/

        .hVhPaL {
            background-color: #ffffff;
            color: #000000;
            font-family: 'gilroy-bold';
            padding: 15px 0px;
            width: 310px;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            border-radius: 48px;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            -ms-flex-pack: center;
            justify-content: center;
            cursor: pointer;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .hVhPaL {
                display: none;
            }
        }

        /*!sc*/

        .hVhPaL p {
            padding-left: 8px;
            font-size: 20px;
            line-height: 18px;
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .hVhPaL {
                width: 285px;
            }
        }

        /*!sc*/

        data-styled.g86[id="rdp2d4-9"] {
            content: "hVhPaL,"
        }

        /*!sc*/

        .OLEqn {
            background-color: #ffffff;
            color: #000000;
            font-family: 'gilroy-bold';
            padding: 15px 0px;
            width: 310px;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            border-radius: 48px;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            -ms-flex-pack: center;
            justify-content: center;
            cursor: pointer;
            display: none;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .OLEqn {
                display: none;
            }
        }

        /*!sc*/

        .OLEqn p {
            padding-left: 8px;
            font-size: 20px;
            line-height: 18px;
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .OLEqn {
                width: 285px;
            }
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .OLEqn {
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                width: 200px;
                margin-top: 55px;
                cursor: none;
            }
        }

        /*!sc*/

        data-styled.g87[id="rdp2d4-10"] {
            content: "OLEqn,"
        }

        /*!sc*/

        .gFfwdT {
            height: 200px;
            width: 900px;
            margin: 0 auto;
            overflow: hidden;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            margin-top: 60px;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .gFfwdT {
                line-height: 26px;
                width: 100%;
                height: 270px;
                margin-top: 20px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .gFfwdT {
                height: 200px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .gFfwdT {
                width: initial;
            }
        }

        /*!sc*/

        data-styled.g91[id="rdp2d4-14"] {
            content: "gFfwdT,"
        }

        /*!sc*/

        .jmUpMa {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            -ms-flex-pack: center;
            justify-content: center;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .jmUpMa {
                -webkit-box-pack: start;
                -webkit-justify-content: flex-start;
                -ms-flex-pack: start;
                justify-content: flex-start;
            }
        }

        /*!sc*/

        data-styled.g92[id="rdp2d4-15"] {
            content: "jmUpMa,"
        }

        /*!sc*/

        .gzsfgr {
            height: 10px;
            width: 10px;
            background-color: #dedede;
            margin-right: 10px;
            cursor: pointer;
            border-radius: 50%;
            opacity: 60%;
        }

        /*!sc*/

        .gzsfgu {
            height: 10px;
            width: 10px;
            background-color: #dedede;
            margin-right: 10px;
            cursor: pointer;
            border-radius: 50%;
            opacity: 30%;
        }

        /*!sc*/

        data-styled.g93[id="rdp2d4-16"] {
            content: "gzsfgr,gzsfgu,"
        }

        /*!sc*/

        .imbIbw {
            width: 179px;
            height: 28px;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .imbIbw {
                width: 115px;
                height: 18px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .imbIbw {
                width: 150px;
                height: 23px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .imbIbw {
                width: 120px;
                height: 18px;
            }
        }

        /*!sc*/

        data-styled.g94[id="rdp2d4-17"] {
            content: "imbIbw,"
        }

        /*!sc*/

        .khMWyf {
            width: 44px;
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .khMWyf {
                width: 30px;
            }
        }

        /*!sc*/

        data-styled.g95[id="rdp2d4-18"] {
            content: "khMWyf,"
        }

        /*!sc*/

        .cpIZMa {
            background-color: #0f0f0f;
            width: 100vw;
            height: 800px;
            position: relative;
            overflow: hidden;
            background-image: url(https://web-images.credcdn.in/_next/assets/images/home-page/video-bg.png);
            background-size: cover;
            background-position: top right;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .cpIZMa {
                height: 450px;
                background-image: url(https://web-images.credcdn.in/_next/assets/images/home-page/video-bg-mobile.png);
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .cpIZMa {
                height: 580px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .cpIZMa {
                height: 620px;
            }
        }

        /*!sc*/

        data-styled.g96[id="sc-1ij3rhy-0"] {
            content: "cpIZMa,"
        }

        /*!sc*/

        .LBnXc {
            min-height: 70%;
        }

        /*!sc*/

        data-styled.g97[id="sc-1ij3rhy-1"] {
            content: "LBnXc,"
        }

        /*!sc*/

        .fzpEsD {
            position: absolute;
            bottom: 0;
            left: 50%;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .fzpEsD {
                width: 170px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .fzpEsD {
                width: 270px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .fzpEsD {
                width: 300px;
            }
        }

        /*!sc*/

        data-styled.g98[id="sc-1ij3rhy-2"] {
            content: "fzpEsD,"
        }

        /*!sc*/

        .jtaodl {
            position: fixed;
            top: 0;
            left: 0;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            -ms-flex-pack: justify;
            justify-content: space-between;
            width: 100%;
            height: 110px;
            background-color: rgba(0, 0, 0, 0.8);
            color: #f8f8f8;
            -webkit-transform: translateY(-110%);
            -ms-transform: translateY(-110%);
            transform: translateY(-110%);
            -webkit-transition: -webkit-transform 0.3s ease;
            -webkit-transition: transform 0.3s ease;
            transition: transform 0.3s ease;
            z-index: 200;
            padding: 0 200px;
            -webkit-transform: translateY(-110%);
            -ms-transform: translateY(-110%);
            transform: translateY(-110%);
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .jtaodl {
                padding: 0 40px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .jtaodl {
                padding: 0 60px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .jtaodl {
                padding: 0 50px;
            }
        }

        /*!sc*/

        data-styled.g99[id="sc-1ilp5lv-0"] {
            content: "jtaodl,"
        }

        /*!sc*/

        .ikiJrR {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            width: 100%;
        }

        /*!sc*/

        data-styled.g100[id="sc-1ilp5lv-1"] {
            content: "ikiJrR,"
        }

        /*!sc*/

        .kylyqS {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
        }

        /*!sc*/

        data-styled.g101[id="sc-1ilp5lv-2"] {
            content: "kylyqS,"
        }

        /*!sc*/

        .dheGtX {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
        }

        /*!sc*/

        data-styled.g102[id="sc-1ilp5lv-3"] {
            content: "dheGtX,"
        }

        /*!sc*/

        .legVAY {
            width: 49px;
            height: 66px;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .legVAY {
                width: 33px;
                height: 44px;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .legVAY {
                width: 33px;
                height: 44px;
            }
        }

        /*!sc*/

        data-styled.g103[id="sc-1ilp5lv-4"] {
            content: "legVAY,"
        }

        /*!sc*/

        .dNa-dEd {
            margin-left: 78px;
            width: 132px;
            height: 65px;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .dNa-dEd {
                display: none;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:767px) {
            .dNa-dEd {
                display: none;
            }
        }

        /*!sc*/

        @media only screen and (min-width:768px) and (max-width:1279px) {
            .dNa-dEd {
                margin-left: 40px;
                width: 87px;
                height: 43px;
            }
        }

        /*!sc*/

        data-styled.g104[id="sc-1ilp5lv-5"] {
            content: "dNa-dEd,"
        }

        /*!sc*/

        .gbcSDe {
            margin-left: 36px;
            font-family: 'gilroy-semibold';
            font-size: 18px;
            -webkit-letter-spacing: 0;
            -moz-letter-spacing: 0;
            -ms-letter-spacing: 0;
            letter-spacing: 0;
            line-height: 18px;
        }

        /*!sc*/

        @media screen and (max-width:768px) {
            .gbcSDe {
                display: none;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:768px) {
            .gbcSDe {
                display: none;
            }
        }

        /*!sc*/

        data-styled.g105[id="sc-1ilp5lv-6"] {
            content: "gbcSDe,"
        }

        /*!sc*/

        .hZRljI {
            -webkit-text-decoration: none;
            text-decoration: none;
            outline: none;
            cursor: pointer;
        }

        /*!sc*/

        data-styled.g107[id="sc-1ilp5lv-8"] {
            content: "hZRljI,"
        }

        /*!sc*/

        .hzajN {
            background-color: #242424;
            color: #fff;
            padding: 100px 200px;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .hzajN {
                padding: 30px;
            }
        }

        /*!sc*/

        @media screen and (min-width:481px) and (max-width:1279px) {
            .hzajN {
                padding: 30px 60px;
            }
        }

        /*!sc*/

        data-styled.g115[id="sc-132u5v8-0"] {
            content: "hzajN,"
        }

        /*!sc*/

        .jmQOBE .wrappercontent h2 {
            font-family: 'gilroy-bold';
            font-size: 18px;
            -webkit-letter-spacing: 0.75px;
            -moz-letter-spacing: 0.75px;
            -ms-letter-spacing: 0.75px;
            letter-spacing: 0.75px;
            line-height: 22px;
            margin-bottom: 24px;
            color: #fff;
            opacity: 0.9;
        }

        /*!sc*/

        @media screen and (max-width:1279px) {
            .jmQOBE .wrappercontent h2 {
                font-size: 12px;
                line-height: 22px;
                -webkit-letter-spacing: 0.5px;
                -moz-letter-spacing: 0.5px;
                -ms-letter-spacing: 0.5px;
                letter-spacing: 0.5px;
                margin-bottom: 16px;
            }
        }

        /*!sc*/

        @media screen and (max-width:1279px) {
            .jmQOBE .wrappercontent h2 {
                font-size: 12px;
                line-height: 22px;
                -webkit-letter-spacing: 0.5px;
                -moz-letter-spacing: 0.5px;
                -ms-letter-spacing: 0.5px;
                letter-spacing: 0.5px;
            }
        }

        /*!sc*/

        .jmQOBE .wrappercontent p {
            font-family: 'gilroy-regular';
            font-size: 18px;
            -webkit-letter-spacing: 0.75px;
            -moz-letter-spacing: 0.75px;
            -ms-letter-spacing: 0.75px;
            letter-spacing: 0.75px;
            line-height: 33px;
            margin-bottom: 0px !important;
            color: #fff;
            opacity: 0.7;
        }

        /*!sc*/

        @media screen and (max-width:1279px) {
            .jmQOBE .wrappercontent p {
                font-size: 12px;
                line-height: 22px;
                -webkit-letter-spacing: 0.5px;
                -moz-letter-spacing: 0.5px;
                -ms-letter-spacing: 0.5px;
                letter-spacing: 0.5px;
            }
        }

        /*!sc*/

        @media screen and (max-width:1279px) {
            .jmQOBE .wrappercontent p {
                font-size: 12px;
                line-height: 22px;
                -webkit-letter-spacing: 0.5px;
                -moz-letter-spacing: 0.5px;
                -ms-letter-spacing: 0.5px;
                letter-spacing: 0.5px;
            }
        }

        /*!sc*/

        .jmQOBE .wrappercontent a {
            -webkit-text-decoration: underline !important;
            text-decoration: underline !important;
            color: #fff !important;
        }

        /*!sc*/

        data-styled.g116[id="sc-132u5v8-1"] {
            content: "jmQOBE,"
        }

        /*!sc*/

        .jWfVxD span {
            font-family: 'gilroy-bold';
            font-size: 12px;
            opacity: 0.6;
        }

        /*!sc*/

        data-styled.g117[id="sc-132u5v8-2"] {
            content: "jWfVxD,"
        }

        /*!sc*/

        .hMcaqy {
            font-family: 'gilroy-regular';
            font-size: 18px;
            -webkit-letter-spacing: 0.75px;
            -moz-letter-spacing: 0.75px;
            -ms-letter-spacing: 0.75px;
            letter-spacing: 0.75px;
            line-height: 34px;
            color: #fff;
            margin-bottom: 20px;
            opacity: 0.7;
            padding: 0 15px;
            border-right: 1px solid #f6f6f6;
        }

        /*!sc*/

        .hMcaqy:first-child {
            font-family: 'gilroy-bold';
            padding: 0;
            border-right: none;
        }

        /*!sc*/

        .hMcaqy:last-child {
            border-right: none;
        }

        /*!sc*/

        @media screen and (max-width:1280px) {
            .hMcaqy {
                font-size: 12px;
                -webkit-letter-spacing: 0.5px;
                -moz-letter-spacing: 0.5px;
                -ms-letter-spacing: 0.5px;
                letter-spacing: 0.5px;
                line-height: 23px;
            }
        }

        /*!sc*/

        data-styled.g118[id="sc-132u5v8-3"] {
            content: "hMcaqy,"
        }

        /*!sc*/

        .gZuyhr {
            border: 1px solid #bbbbbb;
            opacity: 0.4;
            margin-bottom: 50px;
        }

        /*!sc*/

        data-styled.g121[id="sc-132u5v8-6"] {
            content: "gZuyhr,"
        }

        /*!sc*/

        .ePqDam {
            background-color: #161517;
            color: #fff;
            z-index: 20;
            overflow: hidden;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .ePqDam {
                display: block;
            }
        }

        /*!sc*/

        data-styled.g122[id="sc-132u5v8-7"] {
            content: "ePqDam,"
        }

        /*!sc*/

        .fkhzFx {
            padding: 100px 200px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-row-gap: 70px;
        }

        /*!sc*/

        @media screen and (max-width:767px) {
            .fkhzFx {
                padding: 70px 30px;
                display: block;
            }
        }

        /*!sc*/

        @media only screen and (min-width:481px) and (max-width:1279px) {
            .fkhzFx {
                padding: 100px 60px;
            }
        }

        /*!sc*/

        data-styled.g123[id="sc-132u5v8-8"] {
            content: "fkhzFx,"
        }

        /*!sc*/

        .da-dEys {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
        }

        /*!sc*/

        @media screen and (max-width:1919px) {
            .da-dEys {
                margin-right: 50px;
            }
        }

        /*!sc*/

        data-styled.g124[id="sc-132u5v8-9"] {
            content: "da-dEys,"
        }

        /*!sc*/

        .kPzdSQ {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 150px;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .kPzdSQ {
                grid-template-columns: 1fr;
            }
        }

        /*!sc*/

        data-styled.g125[id="sc-132u5v8-10"] {
            content: "kPzdSQ,"
        }

        /*!sc*/

        .ipeTxp {
            margin-bottom: 30px;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .ipeTxp {
                margin-bottom: 5px;
                border-top: 0.5px solid #ffffff;
                padding-top: 15px;
            }
            .ipeTxp:last-child {
                border-bottom: 0.5px solid #ffffff;
                padding-bottom: 5px;
            }
        }

        /*!sc*/

        data-styled.g126[id="sc-132u5v8-11"] {
            content: "ipeTxp,"
        }

        /*!sc*/

        .iWNnFS {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            -ms-flex-pack: justify;
            justify-content: space-between;
            opacity: 0.4;
        }

        /*!sc*/

        @media screen and (max-width:1279px) {
            .iWNnFS {
                font-size: 12px;
                margin-top: 30px;
                margin-bottom: 30px;
                -webkit-flex-direction: column;
                -ms-flex-direction: column;
                flex-direction: column;
                -webkit-box-pack: unset;
                -webkit-justify-content: unset;
                -ms-flex-pack: unset;
                justify-content: unset;
            }
            .iWNnFS>p {
                padding-bottom: 16px;
            }
        }

        /*!sc*/

        data-styled.g127[id="sc-132u5v8-12"] {
            content: "iWNnFS,"
        }

        /*!sc*/

        .gwtdkr {
            font-family: 'gilroy-bold';
            font-size: 18px;
            -webkit-letter-spacing: 0.75px;
            -moz-letter-spacing: 0.75px;
            -ms-letter-spacing: 0.75px;
            letter-spacing: 0.75px;
            line-height: 22px;
            margin-bottom: 24px;
            opacity: 0.9;
            font-size: 21px;
        }

        /*!sc*/

        @media screen and (max-width:1279px) {
            .gwtdkr {
                font-size: 12px;
                line-height: 22px;
                -webkit-letter-spacing: 0.5px;
                -moz-letter-spacing: 0.5px;
                -ms-letter-spacing: 0.5px;
                letter-spacing: 0.5px;
                margin-bottom: 16px;
            }
        }

        /*!sc*/

        data-styled.g128[id="sc-132u5v8-13"] {
            content: "gwtdkr,"
        }

        /*!sc*/

        .czCFdc {
            font-family: 'gilroy-regular';
            font-size: 18px;
            -webkit-letter-spacing: 0.75px;
            -moz-letter-spacing: 0.75px;
            -ms-letter-spacing: 0.75px;
            letter-spacing: 0.75px;
            line-height: 33px;
            margin-bottom: 75px;
            opacity: 0.7;
            max-width: 500px;
        }

        /*!sc*/

        @media screen and (max-width:1279px) {
            .czCFdc {
                font-size: 12px;
                line-height: 22px;
                -webkit-letter-spacing: 0.5px;
                -moz-letter-spacing: 0.5px;
                -ms-letter-spacing: 0.5px;
                letter-spacing: 0.5px;
                margin-bottom: 50px;
            }
        }

        /*!sc*/

        data-styled.g129[id="sc-132u5v8-14"] {
            content: "czCFdc,"
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .fycJux {
                display: block;
            }
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .fpGyza {
                display: none;
            }
        }

        /*!sc*/

        data-styled.g130[id="sc-132u5v8-15"] {
            content: "fycJux,fpGyza,"
        }

        /*!sc*/

        .GQOQe {
            font-family: 'gilroy-bold';
            font-size: 18px;
            -webkit-letter-spacing: 0.75px;
            -moz-letter-spacing: 0.75px;
            -ms-letter-spacing: 0.75px;
            letter-spacing: 0.75px;
            line-height: 22px;
            margin-bottom: 24px;
            opacity: 0.9;
            line-height: 32px;
            margin-bottom: 20px;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            -ms-flex-pack: justify;
            justify-content: space-between;
        }

        /*!sc*/

        @media screen and (max-width:1279px) {
            .GQOQe {
                font-size: 12px;
                line-height: 22px;
                -webkit-letter-spacing: 0.5px;
                -moz-letter-spacing: 0.5px;
                -ms-letter-spacing: 0.5px;
                letter-spacing: 0.5px;
                margin-bottom: 16px;
            }
        }

        /*!sc*/

        data-styled.g131[id="sc-132u5v8-16"] {
            content: "GQOQe,"
        }

        /*!sc*/

        .jvSnTz {
            color: inherit;
            font-family: 'gilroy-regular';
            font-size: 18px;
            -webkit-letter-spacing: 0.75px;
            -moz-letter-spacing: 0.75px;
            -ms-letter-spacing: 0.75px;
            letter-spacing: 0.75px;
            line-height: 33px;
            margin-bottom: 10px;
            display: block;
            opacity: 0.7;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .jvSnTz {
                padding-left: 15px;
            }
        }

        /*!sc*/

        @media screen and (max-width:1279px) {
            .jvSnTz {
                font-size: 12px;
                line-height: 22px;
                -webkit-letter-spacing: 0.5px;
                -moz-letter-spacing: 0.5px;
                -ms-letter-spacing: 0.5px;
                letter-spacing: 0.5px;
                margin-bottom: 10px;
            }
        }

        /*!sc*/

        data-styled.g132[id="sc-132u5v8-17"] {
            content: "jvSnTz,"
        }

        /*!sc*/

        .dZMnpM {
            margin-top: 100px;
            margin-bottom: 40px;
            width: 405px;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .dZMnpM {
                margin-top: 50px;
                margin-bottom: 20px;
                width: 250px;
            }
        }

        /*!sc*/

        @media screen and (min-width:481px) and (max-width:1279px) {
            .dZMnpM {
                margin-top: 70px;
                margin-bottom: 25px;
                width: 290px;
            }
        }

        /*!sc*/

        data-styled.g133[id="sc-132u5v8-18"] {
            content: "dZMnpM,"
        }

        /*!sc*/

        .bzscUl {
            width: 168px;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .bzscUl {
                width: 70px;
            }
        }

        /*!sc*/

        data-styled.g134[id="sc-132u5v8-19"] {
            content: "bzscUl,"
        }

        /*!sc*/

        .jsBpT {
            font-family: 'gilroy-regular';
            font-size: 18px;
            -webkit-letter-spacing: 0.75px;
            -moz-letter-spacing: 0.75px;
            -ms-letter-spacing: 0.75px;
            letter-spacing: 0.75px;
            line-height: 34px;
            color: #fff;
            margin-bottom: 20px;
            opacity: 0.7;
            padding: 0 15px;
            border-right: 1px solid #f6f6f6;
        }

        /*!sc*/

        .jsBpT:first-child {
            padding: 0;
            padding-right: 15px;
        }

        /*!sc*/

        .jsBpT:last-child {
            border-right: none;
        }

        /*!sc*/

        @media screen and (max-width:1279px) {
            .jsBpT {
                font-size: 12px;
                -webkit-letter-spacing: 0.5px;
                -moz-letter-spacing: 0.5px;
                -ms-letter-spacing: 0.5px;
                letter-spacing: 0.5px;
                line-height: 23px;
            }
        }

        /*!sc*/

        data-styled.g135[id="sc-132u5v8-20"] {
            content: "jsBpT,"
        }

        /*!sc*/

        .blBZlA {
            width: 12px;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
            -webkit-transition: 0.3s ease-in-out;
            transition: 0.3s ease-in-out;
        }

        /*!sc*/

        @media screen and (min-width:481px) {
            .blBZlA {
                display: none;
            }
        }

        /*!sc*/

        .fUfBgp {
            width: 12px;
            -webkit-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
            -webkit-transition: 0.3s ease-in-out;
            transition: 0.3s ease-in-out;
        }

        /*!sc*/

        @media screen and (min-width:481px) {
            .fUfBgp {
                display: none;
            }
        }

        /*!sc*/

        data-styled.g136[id="sc-132u5v8-21"] {
            content: "blBZlA,fUfBgp,"
        }

        /*!sc*/

        .hvppVV {
            -webkit-align-self: baseline;
            -ms-flex-item-align: baseline;
            align-self: baseline;
        }

        /*!sc*/

        data-styled.g137[id="sc-132u5v8-22"] {
            content: "hvppVV,"
        }

        /*!sc*/

        .enGkUY {
            -webkit-align-self: baseline;
            -ms-flex-item-align: baseline;
            align-self: baseline;
        }

        /*!sc*/

        data-styled.g138[id="sc-132u5v8-23"] {
            content: "enGkUY,"
        }

        /*!sc*/

        .diRLZb span {
            font-family: 'gilroy-bold';
            font-size: 12px;
            opacity: 0.6;
        }

        /*!sc*/

        data-styled.g139[id="sc-132u5v8-24"] {
            content: "diRLZb,"
        }

        /*!sc*/

        .feujWG {
            margin-bottom: 70px;
            font-family: gilroy-regular;
            font-size: 17px;
            line-height: 26px;
            -webkit-letter-spacing: 0.65px;
            -moz-letter-spacing: 0.65px;
            -ms-letter-spacing: 0.65px;
            letter-spacing: 0.65px;
            color: #000;
            opacity: 1;
        }

        /*!sc*/

        .feujWG ul {
            list-style: disc;
            margin: 16px 0px;
            padding-left: 40px;
        }

        /*!sc*/

        .feujWG li {
            margin-bottom: 10px;
        }

        /*!sc*/

        .feujWG ol {
            list-style: decimal;
            margin: 16px 0px;
            padding-left: 40px;
        }

        /*!sc*/

        .feujWG h2 {
            font-family: gilroy-bold;
            font-size: 26px;
            -webkit-letter-spacing: 0.5px;
            -moz-letter-spacing: 0.5px;
            -ms-letter-spacing: 0.5px;
            letter-spacing: 0.5px;
            margin-bottom: 35px;
            font-weight: normal;
            line-height: 33px;
        }

        /*!sc*/

        .feujWG h3 {
            font-family: gilroy-semibold;
            font-size: 20px;
            -webkit-letter-spacing: 0.5px;
            -moz-letter-spacing: 0.5px;
            -ms-letter-spacing: 0.5px;
            letter-spacing: 0.5px;
            margin-bottom: 15px;
            font-weight: normal;
            margin-top: 35px;
        }

        /*!sc*/

        .feujWG h4 {
            font-family: gilroy-semibold;
            font-size: 18px;
            -webkit-letter-spacing: 0.5px;
            -moz-letter-spacing: 0.5px;
            -ms-letter-spacing: 0.5px;
            letter-spacing: 0.5px;
            margin-bottom: 10px;
            font-weight: normal;
            margin-top: 25px;
        }

        /*!sc*/

        .feujWG p {
            margin-bottom: 25px;
        }

        /*!sc*/

        .feujWG p strong {
            font-family: gilroy-semibold;
        }

        /*!sc*/

        .feujWG a {
            color: #5b56f3;
            font-weight: 400;
            -webkit-text-decoration: none;
            text-decoration: none;
            outline: 0;
            word-break: break-all;
        }

        /*!sc*/

        .feujWG a:active,
        .feujWG a:focus {
            outline: 0;
            border: none;
            outline-style: none;
            -moz-outline-style: none;
        }

        /*!sc*/

        data-styled.g146[id="sc-2zguln-0"] {
            content: "feujWG,"
        }

        /*!sc*/

        .hnhaVB {
            background-image: url(https://web-images.credcdn.in/_next/assets/images/home-page/image-mock.jpg);
            min-height: 500px;
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        /*!sc*/

        @media screen and (max-width:480px) {
            .hnhaVB {
                display: none;
            }
        }

        /*!sc*/

        data-styled.g148[id="olp3s3-0"] {
            content: "hnhaVB,"
        }

        /*!sc*/

        * {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            -ms-box-sizing: border-box;
            -o-box-sizing: border-box;
            box-sizing: border-box;
        }

        /*!sc*/

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        hr,
        p,
        blockquote,
        dl,
        dt,
        dd,
        ul,
        ol,
        li,
        pre,
        fieldset,
        legend,
        button,
        input,
        textarea,
        th,
        td {
            margin: 0;
            padding: 0;
        }

        /*!sc*/

        body {
            font-family: 'gilroy-regular';
            font-variant-ligatures: none;
            min-height: 100vh;
            color: #000;
            margin: 0;
            padding: 0;
            padding-top: constant(safe-area-inset-top);
            padding-top: env(safe-area-inset-top);
            overflow-x: hidden;
        }

        /*!sc*/

        #app {
            position: relative;
        }

        /*!sc*/

        ul,
        ol {
            list-style: none;
        }

        /*!sc*/

        a {
            -webkit-text-decoration: none;
            text-decoration: none;
            outline: 0;
        }

        /*!sc*/

        a:active,
        a:focus {
            outline: 0;
            outline-style: none;
            -moz-outline-style: none;
        }

        /*!sc*/

        input {
            -webkit-appearance: none;
            border: 0;
            outline: 0;
            background: transparent;
            color: inherit;
        }

        /*!sc*/

        ::-webkit-input-placeholder {
            color: inherit;
            opacity: 0.4;
        }

        /*!sc*/

        ::-webkit-input-placeholder {
            color: inherit;
            opacity: 0.4;
        }

        /*!sc*/

        ::-moz-placeholder {
            color: inherit;
            opacity: 0.4;
        }

        /*!sc*/

        :-ms-input-placeholder {
            color: inherit;
            opacity: 0.4;
        }

        /*!sc*/

        ::placeholder {
            color: inherit;
            opacity: 0.4;
        }

        /*!sc*/

        ::-webkit-media-controls-panel {
            display: none !important;
            -webkit-appearance: none;
        }

        /*!sc*/

        ::--webkit-media-controls-play-button {
            display: none !important;
            -webkit-appearance: none;
        }

        /*!sc*/

        ::-webkit-media-controls-start-playback-button {
            display: none !important;
            -webkit-appearance: none;
        }

        /*!sc*/

        .grecaptcha-badge {
            visibility: hidden;
        }

        /*!sc*/

        data-styled.g216[id="sc-global-gliCTP1"] {
            content: "sc-global-gliCTP1,"
        }

        /*!sc*/

        @font-face {
            font-family: 'gilroy-blackitalic';
            src: url('https://web-assets.cred.club/_next/assets/fonts/Gilroy-BlackItalic.woff') format('woff'), url('https://web-assets.cred.club/_next/assets/fonts/Gilroy-BlackItalic.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
        }

        /*!sc*/

        @font-face {
            font-family: 'gilroy-extrabold';
            src: url('https://web-assets.cred.club/_next/assets/fonts/Gilroy-ExtraBold.woff') format('woff'), url('https://web-assets.cred.club/_next/assets/fonts/Gilroy-ExtraBold.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
        }

        /*!sc*/

        @font-face {
            font-family: 'gilroy-bold';
            src: url('https://web-assets.cred.club/_next/assets/fonts/Gilroy-Bold.woff') format('woff'), url('https://web-assets.cred.club/_next/assets/fonts/Gilroy-Bold.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
        }

        /*!sc*/

        @font-face {
            font-family: 'gilroy-semibold';
            src: url('https://web-assets.cred.club/_next/assets/fonts/Gilroy-SemiBold.woff') format('woff'), url('https://web-assets.cred.club/_next/assets/fonts/Gilroy-SemiBold.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
        }

        /*!sc*/

        @font-face {
            font-family: 'gilroy-medium';
            src: url('https://web-assets.cred.club/_next/assets/fonts/Gilroy-Medium.woff') format('woff'), url('https://web-assets.cred.club/_next/assets/fonts/Gilroy-Medium.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
        }

        /*!sc*/

        @font-face {
            font-family: 'gilroy-regular';
            src: url('https://web-assets.cred.club/_next/assets/fonts/Gilroy-Regular.woff') format('woff'), url('https://web-assets.cred.club/_next/assets/fonts/Gilroy-Regular.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
        }

        /*!sc*/

        @font-face {
            font-family: 'gilroy-thin';
            src: url('https://web-assets.cred.club/_next/assets/fonts/Gilroy-Thin.woff') format('woff'), url('https://web-assets.cred.club/_next/assets/fonts/Gilroy-Thin.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
        }

        /*!sc*/

        @font-face {
            font-family: 'cirka-light';
            src: url('https://web-assets.cred.club/_next/assets/fonts/PPCirka-Light.woff') format('woff'), url('https://web-assets.cred.club/_next/assets/fonts/PPCirka-Light.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
        }

        /*!sc*/

        @font-face {
            font-family: 'cirka-regular';
            src: url('https://web-assets.cred.club/_next/assets/fonts/PPCirka-Regular.woff') format('woff'), url('https://web-assets.cred.club/_next/assets/fonts/PPCirka-Regular.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
        }

        /*!sc*/

        @font-face {
            font-family: 'cirka-medium';
            src: url('https://web-assets.cred.club/_next/assets/fonts/PPCirka-Medium.woff') format('woff'), url('https://web-assets.cred.club/_next/assets/fonts/PPCirka-Medium.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
        }

        /*!sc*/

        @font-face {
            font-family: 'cirka-semibold';
            src: url('https://web-assets.cred.club/_next/assets/fonts/PPCirka-Semibold.woff') format('woff'), url('https://web-assets.cred.club/_next/assets/fonts/PPCirka-Semibold.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
        }

        /*!sc*/

        @font-face {
            font-family: 'cirka-bold';
            src: url('https://web-assets.cred.club/_next/assets/fonts/PPCirka-Bold.woff') format('woff'), url('https://web-assets.cred.club/_next/assets/fonts/PPCirka-Bold.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
        }

        /*!sc*/

        data-styled.g217[id="sc-global-dhOfOs1"] {
            content: "sc-global-dhOfOs1,"
        }

        /*!sc*/

        body {
            background-color: #0f0f0f;
        }

        /*!sc*/

        data-styled.g380[id="sc-global-kqhitJ1"] {
            content: "sc-global-kqhitJ1,"
        }

        /*!sc*/
    </style>
</head>

<body><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K39WXPP" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <div id="__next">
        <div class="sc-1ilp5lv-0 jtaodl">
            <div class="sc-1ilp5lv-1 ikiJrR">
                <div class="sc-1ilp5lv-2 kylyqS"><img src="https://web-images.credcdn.in/_next/assets/images/home-page/cred-logo.png" alt="cred logo" class="sc-1ilp5lv-4 legVAY" /><a href="/ipl" target="_blank" rel="noopener" class="sc-1ilp5lv-8 hZRljI"><img src="https://web-images.credcdn.in/_next/assets/images/home-page/ipl-composite-logo-2021.png" alt="ipl logo" class="sc-1ilp5lv-5 dNa-dEd"/></a></div>
                <div
                    class="sc-1ilp5lv-3 dheGtX">
                    <div class="sc-1fujqi8-0 fpGwhb"><a href="/ipl" target="_blank" rel="noopener" class="sc-1ilp5lv-6 gbcSDe">CRED X IPL<div class="sc-1fujqi8-1 frKdJG">new</div></a></div>
                    <div class="sc-1fujqi8-0 fpGwhb"><a href="/check-your-credit-score" target="_blank" rel="noopener" class="sc-1ilp5lv-6 gbcSDe">credit score check</a></div>
                    <div class="sc-1fujqi8-0 fpGwhb"><a href="/credit-card-bill-payment-online?source=homepage_header" target="_blank" rel="noopener" class="sc-1ilp5lv-6 gbcSDe">credit card bill payment</a></div>
            </div>
            <div class="sc-50n7ru-4 gyGGjM"><button class="sc-50n7ru-6 hcIRQt"><div class="sc-50n7ru-5 KmvFF"><input/><div></div><div></div><div></div></div></button>
                <nav class="sc-50n7ru-0 gScKBO">
                    <div class="sc-50n7ru-1 dJUcrR">
                        <div class="sc-50n7ru-3 jXDZRr">
                            <div class="sc-1fujqi8-0 fpGwhb"><a href="/ipl" target="_blank" rel="noopener" class="sc-50n7ru-2 ewCAWC">CRED X IPL<div class="sc-1fujqi8-1 frKdJG">new</div></a></div>
                        </div>
                        <div class="sc-50n7ru-3 jXDZRr">
                            <div class="sc-1fujqi8-0 fpGwhb"><a href="/check-your-credit-score" target="_blank" rel="noopener" class="sc-50n7ru-2 ewCAWC">credit score check</a></div>
                        </div>
                        <div class="sc-50n7ru-3 jXDZRr">
                            <div class="sc-1fujqi8-0 fpGwhb"><a href="/credit-card-bill-payment-online?source=hamburger" target="_blank" rel="noopener" class="sc-50n7ru-2 ewCAWC">credit card bill payment</a></div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    <section class="cv46ji-0 fEwefL">
        <div class="cv46ji-1 gpQrbj">
            <div class="cv46ji-2 hpVOts"><img src="https://web-images.credcdn.in/_next/assets/images/home-page/cred-logo.png" alt="cred logo" class="cv46ji-10 cstQZH" /><a href="/ipl" target="_blank" rel="noopener" class="cv46ji-12 dkFXGp"><img src="https://web-images.credcdn.in/_next/assets/images/home-page/ipl-composite-logo-2021.png" alt="ipl logo" class="cv46ji-8 glAAqe"/></a></div>
            <div
                class="cv46ji-3 ehQGVd">
                <div class="sc-1fujqi8-0 fpGwhb"><a href="/ipl" target="_blank" rel="noopener" class="cv46ji-16 jQyYQZ">CRED X IPL<div class="sc-1fujqi8-1 frKdJG">new</div></a></div>
                <div class="sc-1fujqi8-0 fpGwhb"><a href="/check-your-credit-score" target="_blank" rel="noopener" class="cv46ji-16 jQyYQZ">credit score check</a></div>
                <div class="sc-1fujqi8-0 fpGwhb"><a href="/credit-card-bill-payment-online?source=homepage_header" target="_blank" rel="noopener" class="cv46ji-16 jQyYQZ">credit card bill payment</a></div>
        </div>
        <div class="sc-50n7ru-4 gyGGjM"><button class="sc-50n7ru-6 hcIRQt"><div class="sc-50n7ru-5 KmvFF"><input/><div></div><div></div><div></div></div></button>
            <nav class="sc-50n7ru-0 gScKBO">
                <div class="sc-50n7ru-1 dJUcrR">
                    <div class="sc-50n7ru-3 jXDZRr">
                        <div class="sc-1fujqi8-0 fpGwhb"><a href="/ipl" target="_blank" rel="noopener" class="sc-50n7ru-2 ewCAWC">CRED X IPL<div class="sc-1fujqi8-1 frKdJG">new</div></a></div>
                    </div>
                    <div class="sc-50n7ru-3 jXDZRr">
                        <div class="sc-1fujqi8-0 fpGwhb"><a href="/check-your-credit-score" target="_blank" rel="noopener" class="sc-50n7ru-2 ewCAWC">credit score check</a></div>
                    </div>
                    <div class="sc-50n7ru-3 jXDZRr">
                        <div class="sc-1fujqi8-0 fpGwhb"><a href="/credit-card-bill-payment-online?source=hamburger" target="_blank" rel="noopener" class="sc-50n7ru-2 ewCAWC">credit card bill payment</a></div>
                    </div>
                </div>
            </nav>
        </div>
        </div>
        <div class="cv46ji-5 ddPhLv">
            <div class="cv46ji-6 edUFdE">rewards for paying credit card bills.</div>
            <div class="cv46ji-7 VPxFp">join 7.5M+ members and win rewards worth over ₹5 crores this IPL.</div>
            <div class="sc-5e3ivb-0 cv46ji-11 fFHWQu">Download CRED</div>
        </div>
    </section>
    <section class="sc-1ij3rhy-0 cpIZMa">
        <div class="sc-1ij3rhy-1 LBnXc"><img src="https://web-images.credcdn.in/_next/assets/images/home-page/phone/left-2.png" style="opacity:0.9;transform:translate(-50%, 100%);z-index:98" alt="" class="sc-1ij3rhy-2 fzpEsD" /><img src="https://web-images.credcdn.in/_next/assets/images/home-page/phone/left-1.png"
                style="opacity:0.9;transform:translate(-50%, 100%);z-index:99" alt="" class="sc-1ij3rhy-2 fzpEsD" /><img src="https://web-images.credcdn.in/_next/assets/images/home-page/phone/center.png" style="opacity:0.9;transform:translate(-50%, 100%);z-index:100"
                alt="" class="sc-1ij3rhy-2 fzpEsD" /><img src="https://web-images.credcdn.in/_next/assets/images/home-page/phone/right-1.png" style="opacity:0.9;transform:translate(-50%, 100%);z-index:99" alt="" class="sc-1ij3rhy-2 fzpEsD" /><img src="https://web-images.credcdn.in/_next/assets/images/home-page/phone/right-2.png"
                style="opacity:0.9;transform:translate(-50%, 100%);z-index:98" alt="" class="sc-1ij3rhy-2 fzpEsD" /></div>
    </section>
    <section class="sc-1m4af1p-0 GbLeF">
        <div>
            <div class="sc-1m4af1p-1 iAgSwY">feel special more often.</div>
            <div class="sc-1m4af1p-2 htbqsH">exclusive rewards for paying your bills</div>
        </div>
        <div>
            <div class="sc-1m4af1p-3 gOJvBn">every time you pay your credit card bills on CRED, you receive CRED coins. you can use these to win exclusive rewards or get special access to curated products and experiences. on CRED, good begets good.</div>
            <div class="sc-5e3ivb-0 Ia-Dfh">Explore rewards</div>
        </div>
    </section>
    <section class="sc-1pzzl0u-0 djjPLz">
        <div class="sc-1pzzl0u-1 loOZda">
            <div class="sc-1pzzl0u-2 kMylDB">rewards from brands you love. </div>
        </div>
        <div class="sc-1pzzl0u-4 lGSkr"></div>
    </section>
    <section class="sc-1m4af1p-0 ilaKtF">
        <div>
            <div class="sc-1m4af1p-1 iAgSwY">we take your money matters seriously.</div>
            <div class="sc-1m4af1p-2 htbqsH">so that you don’t have to.</div>
        </div>
        <div>
            <div class="sc-1m4af1p-3 gBIUJo">never miss a due date with reminders to help you pay your bills on time, instant settlements mean you never wait for your payments to go through and statement analysis lets you know where your money goes, always.</div>
            <div class="sc-5e3ivb-0 Ia-Dfh">Experience the upgrade</div>
        </div>
    </section>
    <section class="sc-16ozocz-0 dPsZaY">
        <div class="sc-16ozocz-4 fpFnAT">
            <div style="opacity:0" class="sc-16ozocz-8 ijZHsr">
                <div class="sc-16ozocz-2 cKSIpx">we’ve got your back.</div>
                <div class="sc-16ozocz-3 cAPXpg">gain complete control over your credit card with CRED Protect. receive category-based analysis of your spends, detect hidden charges, and track your credit limit in real-time.</div>
            </div>
            <div style="opacity:0" class="sc-16ozocz-8 ijZHsr">
                <div class="sc-16ozocz-2 cKSIpx">begin your winning streak.</div>
                <div class="sc-16ozocz-3 cAPXpg">use your CRED coins to participate in games and raffles to win the most exclusive rewards and cashbacks on CRED. good luck.</div>
            </div>
            <div style="opacity:0" class="sc-16ozocz-8 ijZHsr">
                <div class="sc-16ozocz-2 cKSIpx">for your eclectic taste.</div>
                <div class="sc-16ozocz-3 cAPXpg">get access to the CRED Store, a member-exclusive selection of products and experiences at special prices that complement your taste. this is the good life they speak of.</div>
            </div>
            <div style="opacity:0" class="sc-16ozocz-8 ijZHsr">
                <div class="sc-16ozocz-2 cKSIpx">more cash in your pockets.</div>
                <div class="sc-16ozocz-3 cAPXpg">switch to CRED RentPay and start paying rent with your credit card. this way you get up to 45 days of credit free period, more reward points and a happy landlord.</div>
            </div>
        </div>
        <div class="sc-16ozocz-5 ffCCAC">
            <div class="sc-16ozocz-6 dLWWCx">
                <div class="sc-16ozocz-7 dBUlCg"></div>
            </div>
        </div>
    </section>
    <section class="sc-16ozocz-1 kisZXk">
        <div class="sc-16ozocz-8 ijZHsr">
            <div class="sc-16ozocz-2 cKSIpx">we’ve got your back.</div>
            <div class="sc-16ozocz-6 dLWWCx">
                <div class="sc-16ozocz-7 dBUlCg"><img src="https://web-images.credcdn.in/_next/assets/images/home-page/features/fold1.png" alt="" width="260px" /></div>
            </div>
            <div class="sc-16ozocz-3 cAPXpg">gain complete control over your credit card with CRED Protect. receive category-based analysis of your spends, detect hidden charges, and track your credit limit in real-time.</div>
        </div>
        <div class="sc-16ozocz-8 ijZHsr">
            <div class="sc-16ozocz-2 cKSIpx">begin your winning streak.</div>
            <div class="sc-16ozocz-6 dLWWCx">
                <div class="sc-16ozocz-7 dBUlCg"><img src="https://web-images.credcdn.in/_next/assets/images/home-page/features/fold2.png" alt="" width="260px" /></div>
            </div>
            <div class="sc-16ozocz-3 cAPXpg">use your CRED coins to participate in games and raffles to win the most exclusive rewards and cashbacks on CRED. good luck.</div>
        </div>
        <div class="sc-16ozocz-8 ijZHsr">
            <div class="sc-16ozocz-2 cKSIpx">for your eclectic taste.</div>
            <div class="sc-16ozocz-6 dLWWCx">
                <div class="sc-16ozocz-7 dBUlCg"><img src="https://web-images.credcdn.in/_next/assets/images/home-page/features/fold3.png" alt="" width="275px" /></div>
            </div>
            <div class="sc-16ozocz-3 cAPXpg">get access to the CRED Store, a member-exclusive selection of products and experiences at special prices that complement your taste. this is the good life they speak of.</div>
        </div>
        <div class="sc-16ozocz-8 ijZHsr">
            <div class="sc-16ozocz-2 cKSIpx">more cash in your pockets.</div>
            <div class="sc-16ozocz-6 dLWWCx">
                <div class="sc-16ozocz-7 dBUlCg"><img src="https://web-images.credcdn.in/_next/assets/images/home-page/features/fold4.png" alt="" width="260px" /></div>
            </div>
            <div class="sc-16ozocz-3 cAPXpg">switch to CRED RentPay and start paying rent with your credit card. this way you get up to 45 days of credit free period, more reward points and a happy landlord.</div>
        </div>
    </section>
    <div class="olp3s3-0 hnhaVB"></div>
    <section class="sc-1m4af1p-0 cppHQL">
        <div>
            <div class="sc-1m4af1p-1 iAgSwY">security first. and second.</div>
            <div class="sc-1m4af1p-2 htbqsH">what’s yours remains only yours.</div>
        </div>
        <div>
            <div class="sc-1m4af1p-3 gOJvBn">CRED ensures that all your personal data and transactions are encrypted, and secured so what’s yours remains only yours. there’s no room for mistakes because we didn’t leave any.</div>
            <div class="sc-5e3ivb-0 Ia-Dfh">Become a member</div>
        </div>
    </section>
    <section class="ct2shy-0 DdrQy">
        <div class="ct2shy-4 eEvLrx">
            <div class="ct2shy-1 eHKzYg">the story of CRED begins with trust.</div>
        </div>
        <div class="ct2shy-5 bvLpNE">
            <div class="ct2shy-6 cxbMYr">trust as a virtue has consistently played an essential role in every great human achievement. and consistently, its importance has been overlooked. not just by individuals, but by entire societies. we felt it was time someone gave it the spotlight
                it deserves. especially for the ones who live by this virtue: the trustworthy.</div>
            <div class="ct2shy-6 cxbMYr">so we thought of creating a system that rewards its members for doing good and being trustworthy. this way, trust as a virtue becomes something to aspire to, just the way it should be. then we went one step ahead: we built it. we know we are
                on the right track because here you are.</div>
            <div class="ct2shy-6 cxbMYr">if you make it to CRED, congratulations and welcome. we have a lot of things planned for you.</div>
        </div>
    </section>
    <section class="rdp2d4-0 jrsZaJ">
        <div class="rdp2d4-1 bxjuPP">
            <div class="rdp2d4-2 lofBEw">
                <div class="rdp2d4-6 hmFiRE">
                    <div class="rdp2d4-3 kFkeIx">
                        <p class="rdp2d4-4 juaixS">4.8</p>
                        <p class="rdp2d4-5 iLeLBT">app store
                        </p>
                    </div>
                    <div class="rdp2d4-8 iEdlWK"><img src="https://web-images.credcdn.in/_next/assets/images/home-page/rating-ios.png" alt="rating ios" class="rdp2d4-17 imbIbw" /></div>
                    <div class="rdp2d4-9 hVhPaL"><img src="https://web-images.credcdn.in/_next/assets/images/home-page/apple-store-logo.png" alt="" class="rdp2d4-18 khMWyf" />
                        <p>Download the app</p>
                    </div>
                </div>
                <div class="rdp2d4-7 gDJLVF">
                    <div class="rdp2d4-3 kFkeIx">
                        <p class="rdp2d4-4 juaixS">4.7</p>
                        <p class="rdp2d4-5 iLeLBT">play store
                        </p>
                    </div>
                    <div class="rdp2d4-8 iEdlWK"><img src="https://web-images.credcdn.in/_next/assets/images/home-page/rating-android.png" alt="rating android" class="rdp2d4-17 imbIbw" /></div>
                    <div class="rdp2d4-9 hVhPaL"><img src="https://web-images.credcdn.in/_next/assets/images/home-page/play-store-logo.png" alt="play store" class="rdp2d4-18 khMWyf" />
                        <p>Download the app</p>
                    </div>
                </div>
            </div>
            <div class="rdp2d4-14 gFfwdT"></div>
            <div class="rdp2d4-15 jmUpMa">
                <div selected="" class="rdp2d4-16 gzsfgr"></div>
                <div class="rdp2d4-16 gzsfgu"></div>
                <div class="rdp2d4-16 gzsfgu"></div>
                <div class="rdp2d4-16 gzsfgu"></div>
                <div class="rdp2d4-16 gzsfgu"></div>
            </div>
            <div class="rdp2d4-9 rdp2d4-10 OLEqn">Download the app</div>
        </div>
    </section>
    <footer class="sc-132u5v8-7 ePqDam">
        <div class="sc-132u5v8-0 hzajN">
            <div class="sc-132u5v8-1 jmQOBE">
                <div class="wrappercontent">
                    <div class="sc-2zguln-0 feujWG">
                        <h2>about CRED</h2>
                        <p>CRED is a members only credit card bill payment platform that rewards its members for clearing their credit card bills on time. CRED members get access to exclusive rewards and experiences from premier brands upon clearing their
                            credit card bills on CRED.</p>
                    </div>
                </div>
            </div>
            <div class="sc-132u5v8-1 jmQOBE">
                <div class="wrappercontent">
                    <div class="sc-2zguln-0 feujWG">
                        <h2>how does CRED reward their users?</h2>
                        <p>CRED partners with the best premier and luxury brands to bring you an unmatched experience at the end of every credit card bill payment cycle.</p>
                    </div>
                </div>
            </div>
            <div class="sc-132u5v8-1 jmQOBE">
                <div class="wrappercontent">
                    <div class="sc-2zguln-0 feujWG">
                        <h2>how to earn rewards on CRED?</h2>
                        <p>members can earn rewards in two different ways. CRED coins &amp; gems.</p>
                        <p>CRED Coin Rewards:</p>
                        <p>- when you pay your credit card bill on CRED, for every rupee cleared on your bill you earn a CRED coin.</p>
                        <p>- you can then use earned CRED coins to claim exclusive rewards from different brands.</p>
                        <p>CRED Gem Rewards:</p>
                        <p>- for every person that you refer to CRED who makes a bill payment, you earn 10 gems.</p>
                    </div>
                </div>
            </div>
            <div class="sc-132u5v8-1 jmQOBE">
                <div class="wrappercontent">
                    <div class="sc-2zguln-0 feujWG">
                        <h2>what do you get as a CRED Member?</h2>
                        <p>as a CRED member, you instantly make your credit card payment experience hassle-free by unlocking several perks only available to CRED members.</p>
                        <p></p>
                        <p>- seamless bill payment experience through modes like upi, net banking and debit cards</p>
                        <p>- timely credit card bill payment reminders</p>
                        <p>- automate your credit card bill payments</p>
                        <p>- expose hidden charges on your credit card with cred protect</p>
                        <p>- get real-time alerts on duplicate transactions on your credit card</p>
                        <p>- manage multiple credit cards on a single portal</p>
                        <p>- keep a realtime check on your credit score</p>
                    </div>
                </div>
            </div>
            <div class="sc-132u5v8-1 jmQOBE">
                <div class="wrappercontent">
                    <div class="sc-2zguln-0 feujWG">
                        <h2>how does one become a member of CRED?</h2>
                        <p>you can apply to be a member by signing up on CRED with your name and valid mobile number(issued within India). CRED is India’s most trustworthy and creditworthy community. This means we are selective about the members we take.
                            For membership an Experian credit score of 750 or above is mandatory.</p>
                    </div>
                </div>
            </div>
            <div class="sc-132u5v8-1 jmQOBE">
                <div class="wrappercontent">
                    <div class="sc-2zguln-0 feujWG">
                        <h2>how to know your credit score?</h2>
                        <p>upon becoming a member, you can check and refresh your <a href="https://cred.club/check-your-credit-score">credit score</a> with a single click. CRED then proceeds to acquire your updated credit score through a CIBIL score soft
                            inquiry. on CRED, you can access your credit score data anytime without any extra charges. as a member, this helps you keep regular checks on your credit score and re-evaluate your spending patterns to maintain a healthy credit
                            status.</p>
                    </div>
                </div>
            </div>
            <div class="sc-132u5v8-1 jmQOBE">
                <div class="wrappercontent">
                    <div class="sc-2zguln-0 feujWG">
                        <h2>banks supported on CRED</h2>
                        <p>CRED supports<a href="https://cred.club/credit-card-bill-payment-online"> credit card bill payment</a> for American Express, Standard Chartered, Citibank, HSBC, HDFC, ICICI, SBI, AXIS, Kotak, RBL, PNB and other top Indian banks.
                            We support VISA, MasterCard, American express &amp; RuPay cards.</p>
                    </div>
                </div>
            </div>
            <hr class="sc-132u5v8-6 gZuyhr" />
            <div class="sc-132u5v8-2 jWfVxD"><a href="/calculators" class="sc-132u5v8-3 hMcaqy">calculators:</a><a href="/calculators/sip-calculator" class="sc-132u5v8-3 hMcaqy">SIP calculator</a><a href="/calculators/emi-calculator" class="sc-132u5v8-3 hMcaqy">EMI calculator</a><a href="/calculators/ppf-calculator"
                    class="sc-132u5v8-3 hMcaqy">PPF calculator</a><a href="/calculators/home-loan-calculator" class="sc-132u5v8-3 hMcaqy">home loan calculator</a><a href="/calculators/car-loan-calculator" class="sc-132u5v8-3 hMcaqy">car loan calculator</a>
                <a
                    href="/calculators/fixed-deposit-calculator" class="sc-132u5v8-3 hMcaqy">fixed deposit calculator</a><a href="/calculators/rd-calculator" class="sc-132u5v8-3 hMcaqy">recurring deposit calculator</a><a href="/calculators/simple-loan-calculator" class="sc-132u5v8-3 hMcaqy">simple loan calculator</a><a href="/calculators/compound-interest-calculator"
                        class="sc-132u5v8-3 hMcaqy">compound interest calculator</a></div>
        </div>
        <div class="sc-132u5v8-8 fkhzFx">
            <div class="sc-132u5v8-9 da-dEys"><img src="https://web-images.credcdn.in/_next/assets/images/home-page/cred-logo-horizontal.png" alt="cred logo" class="sc-132u5v8-19 bzscUl" /><img src="https://web-images.credcdn.in/_next/assets/images/home-page/security-logos.png" alt="security logo"
                    class="sc-132u5v8-18 dZMnpM" />
                <div class="sc-132u5v8-4 sc-132u5v8-13 gwtdkr">complete security. no asterisks.</div>
                <div class="sc-132u5v8-5 sc-132u5v8-14 czCFdc">CRED encrypts all data and transactions to ensure a completely secure experience for our members.</div>
            </div>
            <div class="sc-132u5v8-10 kPzdSQ">
                <div class="sc-132u5v8-11 ipeTxp">
                    <div class="sc-132u5v8-4 sc-132u5v8-16 GQOQe">
                        <div>products</div>
                        <div><img src="https://web-images.credcdn.in/_next/assets/images/home-page/plus-icon.png" class="sc-132u5v8-21 blBZlA" /></div>
                    </div>
                    <div class="sc-132u5v8-15 fycJux"><a href="/credit-card-bill-payment-online?source=footer" target="_blank" class="sc-132u5v8-17 jvSnTz">credit card bill payments</a><a href="/check-your-credit-score" target="_blank" class="sc-132u5v8-17 jvSnTz">credit score check</a></div>
                </div>
                <div class="sc-132u5v8-11 ipeTxp">
                    <div class="sc-132u5v8-4 sc-132u5v8-16 GQOQe">
                        <div>CRED</div>
                        <div><img src="https://web-images.credcdn.in/_next/assets/images/home-page/plus-icon.png" class="sc-132u5v8-21 fUfBgp" /></div>
                    </div>
                    <div class="sc-132u5v8-15 fpGyza"><a href="/about" target="_blank" class="sc-132u5v8-17 jvSnTz">about</a><a href="https://careers.cred.club" target="_blank" class="sc-132u5v8-17 jvSnTz">careers</a><a href="/ipl" target="_blank" class="sc-132u5v8-17 jvSnTz">IPL</a>
                        <a
                            href="/customer-care" target="_blank" class="sc-132u5v8-17 jvSnTz">customer care</a>
                    </div>
                </div>
                <div class="sc-132u5v8-11 ipeTxp">
                    <div class="sc-132u5v8-4 sc-132u5v8-16 GQOQe">
                        <div>resources</div>
                        <div><img src="https://web-images.credcdn.in/_next/assets/images/home-page/plus-icon.png" class="sc-132u5v8-21 fUfBgp" /></div>
                    </div>
                    <div class="sc-132u5v8-15 fpGyza"><a href="/articles" target="_blank" class="sc-132u5v8-17 jvSnTz">articles</a><a href="https://blog.cred.club" target="_blank" class="sc-132u5v8-17 jvSnTz">blogs</a><a href="/calculators" target="_blank" class="sc-132u5v8-17 jvSnTz">calculators</a></div>
                </div>
                <div class="sc-132u5v8-11 ipeTxp">
                    <div class="sc-132u5v8-4 sc-132u5v8-16 GQOQe">
                        <div>policy</div>
                        <div><img src="https://web-images.credcdn.in/_next/assets/images/home-page/plus-icon.png" class="sc-132u5v8-21 fUfBgp" /></div>
                    </div>
                    <div class="sc-132u5v8-15 fpGyza"><a href="/security" target="_blank" class="sc-132u5v8-17 jvSnTz">security</a><a href="/transaction-and-user-verification-policy" target="_blank" class="sc-132u5v8-17 jvSnTz">transaction &amp; user verification</a><a href="/privacy#compliance-with-google-oauth-api-scopes"
                            target="_blank" class="sc-132u5v8-17 jvSnTz">google API disclosure</a><a href="/upi-faqs" target="_blank" class="sc-132u5v8-17 jvSnTz">UPI faq &amp; grievances</a></div>
                </div>
            </div>
            <div class="sc-132u5v8-23 enGkUY">
                <div class="sc-132u5v8-12 iWNnFS">copyright © 2020-21 Dreamplug Technologies Pvt Ltd.</div>
            </div>
            <div class="sc-132u5v8-22 hvppVV">
                <div class="sc-132u5v8-2 sc-132u5v8-24 diRLZb"><a href="/privacy" target="_blank" class="sc-132u5v8-20 jsBpT">privacy policy</a><a href="/terms" target="_blank" class="sc-132u5v8-20 jsBpT">terms and conditions</a><a href="/return-policy" target="_blank" class="sc-132u5v8-20 jsBpT">returns and refund</a></div>
            </div>
        </div>
    </footer>
    </div>
    <script id="__NEXT_DATA__" type="application/json">
        {
            "props": {
                "pageProps": {
                    "data": {
                        "body": [{
                            "slice_type": "text_content",
                            "slice_label": null,
                            "items": [{}],
                            "primary": {
                                "header": [{
                                    "type": "heading2",
                                    "text": "about CRED",
                                    "spans": []
                                }],
                                "content": [{
                                    "type": "paragraph",
                                    "text": "CRED is a members only credit card bill payment platform that rewards its members for clearing their credit card bills on time. CRED members get access to exclusive rewards and experiences from premier brands upon clearing their credit card bills on CRED.",
                                    "spans": []
                                }]
                            }
                        }, {
                            "slice_type": "text_content",
                            "slice_label": null,
                            "items": [{}],
                            "primary": {
                                "header": [{
                                    "type": "heading2",
                                    "text": "how does CRED reward their users?",
                                    "spans": []
                                }],
                                "content": [{
                                    "type": "paragraph",
                                    "text": "CRED partners with the best premier and luxury brands to bring you an unmatched experience at the end of every credit card bill payment cycle.",
                                    "spans": []
                                }]
                            }
                        }, {
                            "slice_type": "text_content",
                            "slice_label": null,
                            "items": [{}],
                            "primary": {
                                "header": [{
                                    "type": "heading2",
                                    "text": "how to earn rewards on CRED?",
                                    "spans": []
                                }],
                                "content": [{
                                    "type": "paragraph",
                                    "text": "members can earn rewards in two different ways. CRED coins \u0026 gems.",
                                    "spans": []
                                }, {
                                    "type": "paragraph",
                                    "text": "CRED Coin Rewards:",
                                    "spans": []
                                }, {
                                    "type": "paragraph",
                                    "text": "- when you pay your credit card bill on CRED, for every rupee cleared on your bill you earn a CRED coin.",
                                    "spans": []
                                }, {
                                    "type": "paragraph",
                                    "text": "- you can then use earned CRED coins to claim exclusive rewards from different brands.",
                                    "spans": []
                                }, {
                                    "type": "paragraph",
                                    "text": "CRED Gem Rewards:",
                                    "spans": []
                                }, {
                                    "type": "paragraph",
                                    "text": "- for every person that you refer to CRED who makes a bill payment, you earn 10 gems.",
                                    "spans": []
                                }]
                            }
                        }, {
                            "slice_type": "text_content",
                            "slice_label": null,
                            "items": [{}],
                            "primary": {
                                "header": [{
                                    "type": "heading2",
                                    "text": "what do you get as a CRED Member?",
                                    "spans": []
                                }],
                                "content": [{
                                    "type": "paragraph",
                                    "text": "as a CRED member, you instantly make your credit card payment experience hassle-free by unlocking several perks only available to CRED members.",
                                    "spans": []
                                }, {
                                    "type": "paragraph",
                                    "text": "",
                                    "spans": []
                                }, {
                                    "type": "paragraph",
                                    "text": "- seamless bill payment experience through modes like upi, net banking and debit cards",
                                    "spans": []
                                }, {
                                    "type": "paragraph",
                                    "text": "- timely credit card bill payment reminders",
                                    "spans": []
                                }, {
                                    "type": "paragraph",
                                    "text": "- automate your credit card bill payments",
                                    "spans": []
                                }, {
                                    "type": "paragraph",
                                    "text": "- expose hidden charges on your credit card with cred protect",
                                    "spans": []
                                }, {
                                    "type": "paragraph",
                                    "text": "- get real-time alerts on duplicate transactions on your credit card",
                                    "spans": []
                                }, {
                                    "type": "paragraph",
                                    "text": "- manage multiple credit cards on a single portal",
                                    "spans": []
                                }, {
                                    "type": "paragraph",
                                    "text": "- keep a realtime check on your credit score",
                                    "spans": []
                                }]
                            }
                        }, {
                            "slice_type": "text_content",
                            "slice_label": null,
                            "items": [{}],
                            "primary": {
                                "header": [{
                                    "type": "heading2",
                                    "text": "how does one become a member of CRED?",
                                    "spans": []
                                }],
                                "content": [{
                                    "type": "paragraph",
                                    "text": "you can apply to be a member by signing up on CRED with your name and valid mobile number(issued within India). CRED is India’s most trustworthy and creditworthy community. This means we are selective about the members we take. For membership an Experian credit score of 750 or above is mandatory.",
                                    "spans": []
                                }]
                            }
                        }, {
                            "slice_type": "text_content",
                            "slice_label": null,
                            "items": [{}],
                            "primary": {
                                "header": [{
                                    "type": "heading2",
                                    "text": "how to know your credit score?",
                                    "spans": []
                                }],
                                "content": [{
                                    "type": "paragraph",
                                    "text": "upon becoming a member, you can check and refresh your credit score with a single click. CRED then proceeds to acquire your updated credit score through a CIBIL score soft inquiry. on CRED, you can access your credit score data anytime without any extra charges. as a member, this helps you keep regular checks on your credit score and re-evaluate your spending patterns to maintain a healthy credit status.",
                                    "spans": [{
                                        "start": 55,
                                        "end": 67,
                                        "type": "hyperlink",
                                        "data": {
                                            "link_type": "Web",
                                            "url": "https://cred.club/check-your-credit-score"
                                        }
                                    }]
                                }]
                            }
                        }, {
                            "slice_type": "text_content",
                            "slice_label": null,
                            "items": [{}],
                            "primary": {
                                "header": [{
                                    "type": "heading2",
                                    "text": "banks supported on CRED",
                                    "spans": []
                                }],
                                "content": [{
                                    "type": "paragraph",
                                    "text": "CRED supports credit card bill payment for American Express, Standard Chartered, Citibank, HSBC, HDFC, ICICI, SBI, AXIS, Kotak, RBL, PNB and other top Indian banks. We support VISA, MasterCard, American express \u0026 RuPay cards.",
                                    "spans": [{
                                        "start": 13,
                                        "end": 38,
                                        "type": "hyperlink",
                                        "data": {
                                            "link_type": "Web",
                                            "url": "https://cred.club/credit-card-bill-payment-online"
                                        }
                                    }]
                                }]
                            }
                        }]
                    }
                },
                "__N_SSG": true
            },
            "page": "/",
            "query": {},
            "buildId": "sG-LwPZmw4AK9B30FTr1W",
            "assetPrefix": "https://web-assets.cred.club",
            "nextExport": false,
            "isFallback": false,
            "gsp": true,
            "customServer": true,
            "head": [
                ["meta", {
                    "charSet": "utf-8"
                }],
                ["meta", {
                    "name": "viewport",
                    "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
                }],
                ["meta", {
                    "name": "theme-color",
                    "content": "#1a1b1d"
                }],
                ["title", {
                    "children": "CRED - pay your credit card bills \u0026 earn rewards"
                }],
                ["meta", {
                    "name": "description",
                    "content": "Join 7.5M+ CRED members to earn rewards on your credit card bill payments."
                }],
                ["meta", {
                    "property": "og:type",
                    "content": "website"
                }],
                ["meta", {
                    "property": "og:title",
                    "content": "CRED - pay your credit card bills \u0026 earn rewards"
                }],
                ["meta", {
                    "property": "og:description",
                    "content": "Join 7.5M+ CRED members to earn rewards on your credit card bill payments."
                }],
                ["meta", {
                    "property": "og:image",
                    "content": "https://cred.club/assets/icons/og-image.png"
                }],
                ["meta", {
                    "name": "twitter:card",
                    "content": "summary_large_image"
                }],
                ["meta", {
                    "name": "twitter:site",
                    "content": "@CRED_club"
                }],
                ["meta", {
                    "name": "twitter:title",
                    "content": "CRED - pay your credit card bills \u0026 earn rewards"
                }],
                ["meta", {
                    "name": "twitter:description",
                    "content": "Join 7.5M+ CRED members to earn rewards on your credit card bill payments."
                }],
                ["meta", {
                    "name": "twitter:image",
                    "content": "https://cred.club/assets/icons/og-image.png"
                }],
                ["link", {
                    "rel": "shortcut icon",
                    "type": "image/png",
                    "href": "https://cred.club/assets/icons/logo.png"
                }],
                ["link", {
                    "rel": "canonical",
                    "href": "https://cred.club"
                }],
                ["script", {
                    "type": "application/ld+json",
                    "dangerouslySetInnerHTML": {
                        "__html": "{\"@context\":\"http://schema.org\",\"@type\":\"Organization\",\"name\":\"CRED\",\"url\":\"https://cred.club/\",\"address\":{\"@type\":\"PostalAddress\",\"streetAddress\":\"\",\"addressLocality\":\"Bangalore\",\"postalCode\":\"\",\"addressCountry\":\"INDIA\"},\"contactPoint\":{\"@type\":\"ContactPoint\",\"contactType\":\"customer support\",\"telephone\":\"\",\"email\":\"\"},\"logo\":\"https://cred.club/assets/icons/logo.png\",\"sameAs\":[\"https://www.facebook.com/CRED.club.official\",\"https://twitter.com/CRED_club\",\"https://www.instagram.com/cred_club\",\"https://www.linkedin.com/company/credapp/\",\"https://www.youtube.com/channel/UCxccMFkBeBi0oaQW6WVeo4g\"]}"
                    }
                }]
            ]
        }
    </script>
    <script nomodule="" src="https://web-assets.cred.club/_next/static/chunks/polyfills-7f695e6ce81a08bb2054.js"></script>
    <script src="https://web-assets.cred.club/_next/static/chunks/main-70aecfbcacfe15b77a9c.js" async=""></script>
    <script src="https://web-assets.cred.club/_next/static/chunks/webpack-e067438c4cf4ef2ef178.js" async=""></script>
    <script src="https://web-assets.cred.club/_next/static/chunks/framework.baa41d4dbf5d52db897c.js" async=""></script>
    <script src="https://web-assets.cred.club/_next/static/chunks/f5e09dcdbbe52e6d51a90b4e069486727791b8e2.0a836e232ed405b93873.js" async=""></script>
    <script src="https://web-assets.cred.club/_next/static/chunks/1ff1742ee40ffc4a27057360ca41303a81f93e2c.1add377ba8371a79a420.js" async=""></script>
    <script src="https://web-assets.cred.club/_next/static/chunks/9425d2def8d53213ce785dd77705a26ee399d281.e0753659488fa48ecfba.js" async=""></script>
    <script src="https://web-assets.cred.club/_next/static/chunks/pages/_app-95d05f5aeac0ba6afa9f.js" async=""></script>
    <script src="https://web-assets.cred.club/_next/static/chunks/60dda3c3556f28342119ad3f21dc986d3f96e37d.bccf6b7901d26407774d.js" async=""></script>
    <script src="https://web-assets.cred.club/_next/static/chunks/09996155175480500f7422509e4a6e96f04f9f20.2f22d2c191b559ae5d74.js" async=""></script>
    <script src="https://web-assets.cred.club/_next/static/chunks/203dbc6330bd38bbea535bcec3cf8a017b59718e.e657d0d8e24dd8e8d890.js" async=""></script>
    <script src="https://web-assets.cred.club/_next/static/chunks/pages/index-d840fe396ac9b1231c97.js" async=""></script>
    <script src="https://web-assets.cred.club/_next/static/sG-LwPZmw4AK9B30FTr1W/_buildManifest.js" async=""></script>
    <script src="https://web-assets.cred.club/_next/static/sG-LwPZmw4AK9B30FTr1W/_ssgManifest.js" async=""></script>
</body>

</html>
