function  splitScroll(){
    const controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
        duration: '400%',
        triggerElement: '.year-title',
        triggerHook:0
    })
    .setPin('.year-title')

    .addTo(controller);
}

splitScroll();

function  splitScroll2(){
    const controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
        duration: '70%',
        triggerElement: '.year-title2',
        triggerHook:0
    })
    .setPin('.year-title2')

    .addTo(controller);
}

splitScroll2();


function  splitScroll3(){
    const controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
        duration: '200%',
        triggerElement: '.year-title3',
        triggerHook:0
    })
    .setPin('.year-title3')

    .addTo(controller);
}

splitScroll3();

function  splitScroll4(){
    const controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
        duration: '200%',
        triggerElement: '.year-title4',
        triggerHook:0
    })
    .setPin('.year-title4')

    .addTo(controller);
}

splitScroll4();