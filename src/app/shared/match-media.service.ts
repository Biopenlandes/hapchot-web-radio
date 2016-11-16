import { Injectable } from '@angular/core';

@Injectable()
export class MatchMediaService 
{
    constructor()
    {

    }

    rules =
    {
        print: "print",
        screen: "screen",
        phone: '(max-width: 600px)',
        tablet: '(min-width: 600px) and (max-width: 1000px)',
        desktop: '(min-width: 1001px)',
        playerAside : '(min-width: 850px)',
        largeDesktop : '(min-width: 1300px)',
        portrait: '(orientation: portrait)',
        landscape: '(orientation: landscape)'
    };

    Check = function (mq)
    {
        if (!mq)
        {
            return;
        }

        return window.matchMedia(mq).matches;
    };

/**********************************************
    METHODS FOR CHECKING TYPE   
 **********************************************/
    isPhone()
    {
        return window.matchMedia(this.rules.phone).matches;
    };

    isTablet()
    {
        return window.matchMedia(this.rules.tablet).matches;
    };

    isPlayerAside()
    {
        return window.matchMedia(this.rules.playerAside).matches;
    }

    isDesktop()
    {
        return window.matchMedia(this.rules.desktop).matches;
    };

    isLargeDesktop()
    {
        return window.matchMedia(this.rules.largeDesktop).matches;
    };

    isPortrait()
    {
        return window.matchMedia(this.rules.portrait).matches;
    };

    isLandscape ()
    {
        return window.matchMedia(this.rules.landscape).matches;
    };


/**********************************************
    EVENT LISTENERS BY TYPE
 **********************************************/    
    OnPhone(callBack)
    {
        if (typeof callBack === 'function')
        {
            var mql: MediaQueryList = window.matchMedia(this.rules.phone);

            mql.addListener((mql: MediaQueryList) =>
            {
                if (mql.matches)
                {
                    callBack(mql);
                }
            });
        }
    };

    OnTablet(callBack)
    {
        if (typeof callBack === 'function')
        {
            var mql: MediaQueryList = window.matchMedia(this.rules.tablet);

            mql.addListener((mql: MediaQueryList) =>
            {
                if (mql.matches)
                {
                    callBack(mql);
                }
            });
        }
    };

    OnDesktop(callBack)
    {
        if (typeof callBack === 'function')
        {
            var mql: MediaQueryList = window.matchMedia(this.rules.desktop);

            mql.addListener((mql: MediaQueryList) =>
            {
                if (mql.matches)
                {
                    callBack(mql);
                }
            });
        }
    };  

    OnPortrait(callBack)
    {
        if (typeof callBack === 'function')
        {
            var mql: MediaQueryList = window.matchMedia(this.rules.portrait);

            mql.addListener((mql: MediaQueryList) =>
            {
                if (mql.matches)
                {
                    callBack(mql);
                }
            });
        }
    };  

    OnLandscape(callBack)
    {
        if (typeof callBack === 'function')
        {
            var mql: MediaQueryList = window.matchMedia(this.rules.landscape);

            mql.addListener((mql: MediaQueryList) =>
            {
                if (mql.matches)
                {
                    callBack(mql);
                }
            });
        }
    };
}