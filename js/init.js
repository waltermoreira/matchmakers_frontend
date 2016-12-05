(function($){
    $(function(){

        var dogs = [
            {
                "Updated": "12/1/2016",
                "Name": "Adina",
                "ShelterLuv data": false,
                "Scores": {
                    "Dog": 1,
                    "Child": 1,
                    "Cat": 1,
                    "Home": 1
                },
                "Notes": "foo bar"
            },
            {
                "Updated": "12/1/2016",
                "Name": "Babyface",
                "ShelterLuv data": false,
                "Scores": {
                    "Dog": 1,
                    "Child": 1,
                    "Cat": 1,
                    "Home": 1
                },
                "Notes": "groovy"
            },
            {
                "Updated": "12/1/2016",
                "Name": "Bandit",
                "ShelterLuv data": false,
                "Scores": {
                    "Dog": 1,
                    "Child": 1,
                    "Cat": 1,
                    "Home": 1
                },
                "Notes": "nene"
            }
        ];

        var options = {
            include: ["score"],
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            keys: [
                "Name",
                "Notes"
            ]
        };
        var fuse = new Fuse(dogs, options); 

        $('#search').keydown(function() {
            var result = fuse.search(this.value);
            if (!result[0]) {
                $('#info').hide();
                return;
            };
            display_info(result[0]["item"]);
        });
        
        $('#search_form').submit(
            function(event) {
                event.preventDefault();
            }
        );

        $("#name, #email").keyup(function (e) {
            if (e.keyCode == 13) {
                $(this).blur();
            }
        });
        
        $('.carousel').carousel({time_constant: 500});
        
        // var timer = setInterval(function() { $('.carousel').carousel('next') }, 4000);
        var resume;
        
        function stop_resume() {
            clearInterval(timer);
            clearTimeout(resume);
            resume = setTimeout(function() {
                timer = setInterval(function() {
                    $('.carousel').carousel('next')
                }, 4000);
            }, 8000);
        };
        
        
    }); // end of document ready
})(jQuery); // end of jQuery name space


function display_info(dog) {
    $('#info').show();
    $('#dog_name').text(dog["Name"]);
    $('#dog_score').text(dog["Scores"]["Dog"] || "--");
    $('#child_score').text(dog["Scores"]["Child"] || "--");
    $('#cat_score').text(dog["Scores"]["Cat"] || "--");
    $('#home_score').text(dog["Scores"]["Home"] || "--");
    $('#notes').text(dog["Notes"]);
    $('#updated').text(dog["Updated"]);
};
