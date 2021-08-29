window.onload = () => {
    var hime_container = document.querySelector("#hime_container");
    var hime = document.querySelector("#hime");
    var hime_pop = document.querySelector("#hime_pop");
    var pop_count = 0;
    var counter = document.querySelector("#counter");
    // var sound_effect = new Audio('./source/A~.mp3');

    function pop() {
        // playSound();
        hime.setAttribute("style","visibility: hidden;");
        hime_pop.setAttribute("style","visibility: unset;");
    }

    function unpop() {
        hime_pop.setAttribute("style","visibility: hidden;");
        hime.setAttribute("style","visibility: unset;");
    }

    var storage = {};
    storage.load = function () {
        var count = localStorage.getItem("pop_count");
        if (count !== null) {
            pop_count = parseInt(count);
            counter.innerHTML = pop_count;
        }
    };
    storage.save = function () {
        localStorage.setItem("pop_count", pop_count);
    }

    function isMobile() {
        try{ document.createEvent("TouchEvent"); return true; }
        catch(e){ return false;}
    }

    function playSound(){
        sound_effect.currentTime = 0;
        sound_effect.play();
    }

    function count_up() {
        pop_count++;
        counter.innerHTML = pop_count;
        storage.save();
    }

    storage.load();

    if (isMobile()) {
        window.addEventListener("touchmove",function(e) {
            e.preventDefault();
        }, { passive: false });
        hime.setAttribute("src","./source/uh_n.png");
        hime_container.addEventListener('touchstart', function (e) {
            count_up();
            pop();
        });
        hime_container.addEventListener('touchend', function (e) {
            unpop();
        });
    } else {
        hime_container.addEventListener('mouseover', function (e) {
            hime.setAttribute("src","./source/uh_n.png");
        });
        hime_container.addEventListener('mouseout', function (e) {
            hime.setAttribute("src","./source/uh_n.png");
        });

        //  點擊事件
        hime_container.addEventListener('mousedown', function (e) {
            count_up();
            pop();
        });
        hime_container.addEventListener('mouseup', function (e) {
            unpop();
        });

        //  鍵盤事件
        document.addEventListener('keydown', function (e) {
            pop();
        });
        document.addEventListener('keyup', function (e) {
            count_up();
            hime.setAttribute("src","./source/uh_n.png");
            unpop();
        });
    }
}